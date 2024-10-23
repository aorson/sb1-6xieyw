interface PropertyData {
  estimatedValue: number;
  isCondoProperty: boolean;
  taxAssessment: number;
  recentSales: Array<{
    price: number;
    date: string;
  }>;
}

export async function fetchPropertyData(address: string): Promise<PropertyData> {
  const response = await fetch(`/api/property-data?address=${encodeURIComponent(address)}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch property data');
  }
  
  return response.json();
}