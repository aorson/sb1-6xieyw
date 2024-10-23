import { useState } from 'react';
import { Input } from '../ui/Input';
import { PriceEvaluator } from '../PriceEvaluation/PriceEvaluator';
import { formatCurrency } from '@/lib/utils';

interface PricingStepProps {
  address: string;
  onNext: () => void;
  onBack: () => void;
}

export function PricingStep({ address, onNext, onBack }: PricingStepProps) {
  const [price, setPrice] = useState<string>('');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPrice(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Set Your Price</h2>
          <p className="mt-2 text-gray-600">We'll help you price competitively based on market data</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Listing Price
            </label>
            <div className="relative">
              <Input
                id="price"
                type="text"
                value={formatCurrency(price)}
                onChange={handlePriceChange}
                className="text-2xl h-14 font-medium"
                placeholder="Enter listing price"
              />
              <div className="absolute right-0 top-full mt-2">
                <PriceEvaluator 
                  address={address} 
                  price={Number(price)} 
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Back
            </button>
            
            <button
              type="submit"
              className="px-8 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                       text-sm font-medium"
              disabled={!price}
            >
              Continue
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>You can always adjust your price later in settings</p>
        </div>
      </div>
    </div>
  );
}