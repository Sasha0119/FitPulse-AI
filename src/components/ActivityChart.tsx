import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { PROGRESS_CHART_DATA } from '../constants';

export function ActivityChart() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-display font-semibold">Weekly Intensity</h2>
          <p className="text-white/40 text-xs mt-1">Calorie Expenditure vs Intake</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand" />
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Burned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Goal</span>
          </div>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PROGRESS_CHART_DATA}>
            <defs>
              <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#121214', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#a3e635' }}
            />
            <Area 
              type="monotone" 
              dataKey="burned" 
              stroke="#a3e635" 
              fillOpacity={1} 
              fill="url(#colorBurned)" 
              strokeWidth={4}
              dot={{ fill: '#a3e635', strokeWidth: 2, r: 4, stroke: '#09090b' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#a3e635' }}
            />
            <Area 
              type="monotone" 
              dataKey="consumed" 
              stroke="#22d3ee" 
              fill="transparent" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
