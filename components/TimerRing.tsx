'use client';

import { getTimerStatus } from '@/lib/utils';

interface TimerRingProps {
  remaining: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

export default function TimerRing({ 
  remaining, 
  total, 
  size = 120, 
  strokeWidth = 8 
}: TimerRingProps) {
  const status = getTimerStatus(remaining, total);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = remaining / total;
  const offset = circumference - progress * circumference;

  const getStatusColor = () => {
    switch (status) {
      case 'green':
        return '#10b981'; // emerald-500
      case 'yellow':
        return '#f59e0b'; // amber-500
      case 'red':
        return '#ef4444'; // red-500
    }
  };

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={getStatusColor()}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-1000 ease-linear"
      />
    </svg>
  );
}
