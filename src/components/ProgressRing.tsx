import React from 'react';
import { motion } from 'motion/react';

interface ProgressRingProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  subLabel?: string;
}

export function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 10, 
  color = "#a3e635",
  label,
  subLabel 
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center font-display" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
      </svg>
      
      {(label || subLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {label && <span className="text-xl font-display font-bold leading-none">{label}</span>}
          {subLabel && <span className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{subLabel}</span>}
        </div>
      )}
    </div>
  );
}
