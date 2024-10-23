import { useState, useEffect } from 'react';
import { fetchPropertyData } from '@/lib/api';

interface PropertyData {
  estimatedValue: number;
  isCondoProperty: boolean;
  taxAssessment: number;
  recentSales: Array<{
    price: number;
    date: string;
  }>;
}

export function usePropertyData(address: string) {
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!address) return;

    const loadPropertyData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPropertyData(address);
        setPropertyData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch property data'));
        setPropertyData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadPropertyData();
  }, [address]);

  return { propertyData, isLoading, error };
}