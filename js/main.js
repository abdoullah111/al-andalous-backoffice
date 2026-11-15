
import { getCurrentPrices, getGoldHistory, getSilverHistory  } from "./api.js";
import { renderPrices } from "./ui.js";
import { calculateVariation } from "./calculator.js";
// const data = await getCurrentPrices();
const requestStatus = document.getElementById("request-status");
const currencySelect = document.getElementById("currency-select");
async function loadPrices() {
    try{
    const currency = currencySelect.value;
    const data = await getCurrentPrices(currency);
    // console.log(data)
    requestStatus.classList.add('work');
    const silverPrice = (data.silver_usd_oz / 31.1035)*data.fx_rate;

    const history = await getGoldHistory()
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
