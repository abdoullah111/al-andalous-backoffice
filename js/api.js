const baseUrl = "https://xaus.com/api/v1/spotu";

export async function getCurrentPrices(currency) {
  const response = await fetch(`${baseUrl}?currency=${currency}&unit=gram`);
  if(!response.ok){
    throw new Error("http error")
  }
  return response.json();
}
