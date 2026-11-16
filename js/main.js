
import { getCurrentPrices, getGoldHistory, getSilverHistory  } from "./api.js";
import { renderPrices } from "./ui.js";
import { calculateVariation } from "./calculator.js";
// const data = await getCurrentPrices();
const requestStatus = document.getElementById("request-status");
const currencySelect = document.getElementById("currency-select");

const weightInput = document.getElementById("gramme");
const metalSelect = document.getElementById("metal-select");
const estimateButton = document.querySelector(".estimer-button");
const estimateResult = document.getElementById("estimate-result");
const weightError = document.getElementById("weight-error");

let currentPrices = null;
async function loadPrices() {
  requestStatus.textContent = "Chargement des prix...";
  requestStatus.classList.add("work");
  requestStatus.classList.remove("error");
    try{
    const currency = currencySelect.value;
    const data = await getCurrentPrices(currency);
    currentPrices = data;
    // console.log(data)
    const silverPrice = (data.silver_usd_oz / 31.1035)*data.fx_rate;

    const history = await getGoldHistory()
    drawGoldChart(history.points);
    // console.log(history)
    const lastIndex = history.points.length - 1;
    const currentPoint = history.points[lastIndex];
    const previousPoint = history.points[lastIndex - 1];
    console.log(currentPoint, previousPoint); 
    const previousGoldPrice = (previousPoint.c / 31.1035) * data.fx_rate;
    const goldVariation = calculateVariation(data.xau.price, previousGoldPrice);

    const silverHistory = await getSilverHistory();
    // console.log(silverHistory);
    const silverLastIndex = silverHistory.points.length - 1;
    const currentSilverPoint = silverHistory.points[silverLastIndex];
    const previousSilverPoint = silverHistory.points[silverLastIndex - 1];
    const previousSilverPrice =(previousSilverPoint.c / 31.1035) * data.fx_rate;
    const silverVariation = calculateVariation(silverPrice, previousSilverPrice);

    
    const metals = [
  { name: "Or", code: "gold", price: data.xau.price, currency: data.xau.currency, updatedAt: data.updated_at, variation: goldVariation },
  { name: "Argent", code: "silver", price: silverPrice, currency: data.xau.currency, updatedAt: data.updated_at, variation: silverVariation}
];
renderPrices(metals);
requestStatus.textContent ="Choisissez une devise puis cliquez sur Actualiser.";
requestStatus.classList.add("work");
    }catch(error){
      requestStatus.textContent = "Impossible de charger les prix. Réessayez.";
      requestStatus.classList.add('error');
      requestStatus.classList.remove('work');
    }
}    
const refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", loadPrices);
// currencySelect.addEventListener("change", loadPrices)
loadPrices();

estimateButton.addEventListener("click", estimateJewelry);

              // ===================
              //  estimation
              // =====================
function estimateJewelry() {
  const weight = Number(weightInput.value);
  if(!weight || weight <= 0){
    weightError.textContent = "Veuillez entrer un poids valide."
    estimateResult.textContent = ""
    return;
  }
  weightError.textContent = ""
  const selectedMetal = metalSelect.value;
  let pricePerGram;
  if(selectedMetal === "XAU"){
    pricePerGram = currentPrices.xau.price;
  }else{
    pricePerGram = (currentPrices.silver_usd_oz / 31.1035) * currentPrices.fx_rate;
  }
  const result = weight * pricePerGram;
  estimateResult.textContent = `Valeur estimée: ${result.toFixed(2)}${currentPrices.xau.currency}`
  weightInput.value = ""
}


            //  ==========================
            //       graphique
            //  ===========================
const historyCanvas = document.getElementById("history-chart");
const chartContext = historyCanvas.getContext("2d");

function drawGoldChart(points) {
  const lastSevenPoints = points.slice(-7);
  const prices = lastSevenPoints.map(function(point){
    return point.c
  })
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  chartContext.clearRect(0, 0, historyCanvas.Width, historyCanvas.height);
  const padding = 40;
  const xStep = (historyCanvas.width - padding * 2) / (lastSevenPoints.length - 1);
  const chartHeight = historyCanvas.height - padding * 2;
  const priceRange = maxPrice - minPrice;
  chartContext.beginPath();
  lastSevenPoints.forEach(function (point, index) {
  const x = padding + index * xStep;

  const y = historyCanvas.height - padding -
    ((point.c - minPrice) / priceRange) * chartHeight;
    if (index === 0) {
  chartContext.moveTo(x, y);
} else {
  chartContext.lineTo(x, y);
}
});
chartContext.strokeStyle = "#d4af37";
chartContext.lineWidth = 3;
chartContext.stroke();
}