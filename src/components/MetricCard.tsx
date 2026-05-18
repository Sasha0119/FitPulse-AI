import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  trend?: string;
  trendColor?: string;
  className?: string;
}

export function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  unit, 
  trend, 
  trendColor = "text-brand",
  className 
}: MetricCardProps) {
  return (
    <div className={cn("bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-3 group hover:border-brand/30 transition-all hover:bg-white/[0.08]", className)}>
      <div className="flex items-center justify-between">
        <div className="p-2.5 bg-white/5 rounded-2xl text-white/70 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
          <Icon size={20} />
        </div>
        {trend && (
          <span className={cn("text-xs font-semibold py-1 px-2.5 rounded-xl bg-white/5", trendColor)}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">{label}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-display font-bold text-white tracking-tight">{value}</span>
          {unit && <span className="text-white/30 text-xs font-medium">{unit}</span>}
        </div>
      </div>
    </div>
  );
}
