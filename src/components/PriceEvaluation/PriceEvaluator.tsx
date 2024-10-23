import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { PriceEvaluationBadge } from './PriceEvaluationBadge';
import { Skeleton } from '../ui/Skeleton';
import { usePropertyData } from '@/hooks/usePropertyData';
import { evaluatePrice } from '@/lib/priceEvaluation';

interface PriceEvaluatorProps {
  address: string;
  price: number;
  onEvaluationComplete?: (evaluation: any) => void;
}

export function PriceEvaluator({ address, price, onEvaluationComplete }: PriceEvaluatorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const { propertyData, isLoading: isLoadingProperty } = usePropertyData(address);

  const evaluatePropertyPrice = useDebouncedCallback(async () => {
    if (!propertyData || propertyData.isCondoProperty) return;

    setIsLoading(true);
    try {
      const result = evaluatePrice(price, propertyData.estimatedValue);
      setEvaluation(result);
      onEvaluationComplete?.(result);
    } catch (error) {
      console.error('Price evaluation failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, 500);

  useEffect(() => {
    if (price && propertyData) {
      evaluatePropertyPrice();
    }
  }, [price, propertyData]);

  if (isLoadingProperty || isLoading) {
    return <Skeleton className="h-8 w-24" />;
  }

  if (propertyData?.isCondoProperty) {
    return null;
  }

  return (
    <div className="mt-2">
      {evaluation && <PriceEvaluationBadge type={evaluation} />}
    </div>
  );
}