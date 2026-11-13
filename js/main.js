import { getCurrentPrices } from "./api.js";
import { renderPrices } from "./ui.js";
// const data = await getCurrentPrices();
// console.log(data)
const requestStatus = document.getElementById("request-status");
const currencySelect = document.getElementById("currency-select");
async function loadPrices() {
    try{
    const currency = currencySelect.value;
    const data = await getCurrentPrices(currency);
    requestStatus.classList.add('work')
    const silverPrice = (data.silver_usd_oz / 31.1035)*data.fx_rate;
    const metals = [
  { name: "Or", code: "gold", price: data.xau.price, currency: data.xau.currency, updatedAt: data.updated_at },
  { name: "Argent", code: "silver", price: silverPrice, currency: data.xau.currency, updatedAt: data.updated_at }
];
renderPrices(metals);
    }catch(error){
      requestStatus.textContent = "Impossible de charger les prix. Réessayez.";
      requestStatus.classList.add('error')
    }
}
const refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", loadPrices);
currencySelect.addEventListener("change", loadPrices)

loadPrices();
