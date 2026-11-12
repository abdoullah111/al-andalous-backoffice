import { getCurrentPrices } from "./api.js";
import { renderPrices } from "./ui.js";
// const data = await getCurrentPrices();
// console.log(data)
const currencySelect = document.getElementById("currency-select");
async function loadPrices() {
    const currency = currencySelect.value;
    const data = await getCurrentPrices(currency);
    const silverPrice = (data.silver_usd_oz / 31.1035)*data.fx_rate;
    const metals = [
  { name: "Or", code: "gold", price: data.xau.price, currency: data.xau.currency, updatedAt: data.updated_at },
  { name: "Argent", code: "silver", price: silverPrice, currency: data.xau.currency, updatedAt: data.updated_at }
];
renderPrices(metals);
}
const refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", loadPrices);

loadPrices();
