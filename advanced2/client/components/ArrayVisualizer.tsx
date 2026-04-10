'use client';
import { motion } from 'framer-motion';
import { AlgorithmStep } from '@/lib/types';

interface Props {
  step: AlgorithmStep;
  maxValue?: number;
}

export default function ArrayVisualizer({ step, maxValue = 100 }: Props) {
  const { array, highlights, sorted, found, mid, low, high, pivot } = step;
  const max = maxValue || Math.max(...array, 1);

  const getBarColor = (index: number): string => {
    if (found !== undefined && found === index) return 'bg-green-400 shadow-green-400/50';
    if (pivot !== undefined && pivot === index) return 'bg-orange-400 shadow-orange-400/50';
    if (mid !== undefined && mid === index) return 'bg-yellow-400 shadow-yellow-400/50';
    if (sorted && sorted.includes(index)) return 'bg-green-500/70';
    if (highlights.includes(index)) return 'bg-indigo-400 shadow-indigo-400/50';
    if (low !== undefined && high !== undefined && (index === low || index === high)) return 'bg-purple-400';
    return 'bg-slate-600';
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-center gap-1 h-48 px-4">
        {array.map((value, index) => {
          const heightPercent = (value / max) * 100;
          const color = getBarColor(index);
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-1 flex-1 min-w-0"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: 'bottom' }}
            >
              <motion.div
                className={`w-full rounded-t-sm shadow-lg ${color}`}
                style={{ height: `${Math.max(heightPercent, 4)}%` }}
                animate={{ height: `${Math.max(heightPercent, 4)}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <span className="text-xs text-slate-400 truncate">{value}</span>
            </motion.div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center text-xs text-slate-400">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-indigo-400" /><span>Active</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-400" /><span>Mid</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-400" /><span>Found/Sorted</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-orange-400" /><span>Pivot</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-purple-400" /><span>Low/High</span></div>
      </div>
    </div>
  );
}
