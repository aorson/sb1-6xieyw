import { motion } from 'framer-motion';
import { Tooltip } from '../ui/Tooltip';
import { cn } from '@/lib/utils';

type BadgeType = 'GREAT_BUY' | 'GOOD_BUY' | 'NO_BADGE';

interface PriceEvaluationBadgeProps {
  type: BadgeType;
  className?: string;
}

const badgeConfig = {
  GREAT_BUY: {
    text: 'Great Buy',
    color: 'bg-purple-600 text-white',
    description: '10%+ below estimated market value'
  },
  GOOD_BUY: {
    text: 'Good Buy',
    color: 'bg-blue-600 text-white',
    description: '5-10% below estimated market value'
  }
};

export function PriceEvaluationBadge({ type, className }: PriceEvaluationBadgeProps) {
  if (type === 'NO_BADGE') return null;

  const config = badgeConfig[type];

  return (
    <Tooltip content={config.description}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
          config.color,
          className
        )}
      >
        {config.text}
      </motion.div>
    </Tooltip>
  );
}