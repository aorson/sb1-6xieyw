export type PriceEvaluation = 'GREAT_BUY' | 'GOOD_BUY' | 'NO_BADGE';

export function evaluatePrice(listingPrice: number, estimatedValue: number): PriceEvaluation {
  if (!listingPrice || !estimatedValue) return 'NO_BADGE';

  const percentage = ((estimatedValue - listingPrice) / estimatedValue) * 100;

  if (percentage >= 10) {
    return 'GREAT_BUY';
  } else if (percentage >= 5) {
    return 'GOOD_BUY';
  }
  
  return 'NO_BADGE';
}