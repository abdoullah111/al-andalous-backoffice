const baseUrl = "https://xaus.com/api/v1/spot";

export async function getCurrentPrices(currency) {
  const response = await fetch(`${baseUrl}?currency=${currency}&unit=gram`);
  if(!response.ok){
    throw new Error("http error");
  }
  return response.json();
}

const historyUrl = "https://xaus.com/api/v1/history";
export async function getGoldHistory(){
  const response = await fetch(historyUrl);
  if(!response.ok){
    throw new Error("http error")
  }
  return response.json()
}

export async function getSilverHistory() {
  const response = await fetch("https://xaus.com/api/v1/chart?symbol=silver&range=5d");

  return response.json();
}
