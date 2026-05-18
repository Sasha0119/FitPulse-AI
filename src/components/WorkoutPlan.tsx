import React from 'react';
import { CheckCircle2, Circle, Clock, Flame, Dumbbell, Play } from 'lucide-react';
import { Exercise } from '../types';
import { cn } from '../lib/utils';

interface WorkoutPlanProps {
  exercises: Exercise[];
  completedIds: string[];
  toggleExercise: (id: string) => void;
}

export function WorkoutPlan({ exercises, completedIds, toggleExercise }: WorkoutPlanProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand/10 text-brand rounded-xl">
            <Dumbbell size={22} />
          </div>
          <div>
            <span className="px-2.5 py-0.5 bg-brand/20 text-brand text-[10px] font-bold rounded-full uppercase tracking-tighter">Recommended Session</span>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight mt-1">Push Power <span className="text-white/30 font-light">Phase II</span></h2>
          </div>
        </div>
        <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-right">
          <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest leading-none mb-1">Est. Burn</p>
          <p className="text-lg font-display font-bold text-white">540 <span className="text-xs font-medium text-white/30">kcal</span></p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-3">
          {exercises.map((ex) => {
            const isDone = completedIds.includes(ex.id);
            return (
              <button
                key={ex.id}
                onClick={() => toggleExercise(ex.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left",
                  isDone 
                    ? "bg-brand/5 border-brand/20 text-white/50" 
                    : "bg-white/5 border-white/5 hover:border-white/20 text-white"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "transition-colors",
                    isDone ? "text-brand drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]" : "text-white/20"
                  )}>
                    {isDone ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </div>
                  <div>
                    <h4 className={cn("font-bold tracking-tight text-sm", isDone && "line-through opacity-50")}>{ex.name}</h4>
                    <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider font-bold">{ex.target}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30">
                  {ex.sets && (
                    <div className="flex flex-col items-end">
                      <span>{ex.sets} Sets</span>
                    </div>
                  )}
                  {ex.reps && (
                    <div className="flex flex-col items-end">
                      <span>{ex.reps} Reps</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="md:w-32 lg:w-40 bg-brand rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer shadow-[0_15px_30px_rgba(163,230,53,0.2)] hover:scale-[1.02] transition-transform p-4">
           <div className="w-12 h-12 bg-bg rounded-full flex items-center justify-center">
             <Play className="text-brand ml-1" fill="currentColor" />
           </div>
           <span className="text-bg font-black uppercase text-[10px] tracking-widest text-center">Live Assist</span>
        </div>
      </div>
    </div>
  );
}
