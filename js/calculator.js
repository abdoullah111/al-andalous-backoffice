export function calculateVariation(currentPrice, previousPrice) {
  const value = currentPrice - previousPrice;
  const percentage = (value / previousPrice) * 100;
  return { value, percentage };
}