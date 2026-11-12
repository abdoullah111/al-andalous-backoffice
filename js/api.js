const baseUrl = "https://xaus.com/api/v1/spot";

export async function getCurrentPrices(currency) {
  const response = await fetch(`${baseUrl}?currency=${currency}&unit=gram`);
  return response.json();
}
