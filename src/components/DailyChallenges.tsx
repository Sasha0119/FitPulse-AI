import React from 'react';
import { Trophy, CheckCircle2, Circle } from 'lucide-react';
import { Challenge } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface DailyChallengesProps {
  challenges: Challenge[];
  toggleChallenge: (id: string) => void;
}

export function DailyChallenges({ challenges, toggleChallenge }: DailyChallengesProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/20 text-accent rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.3)]">
          <Trophy size={20} />
        </div>
        <h2 className="text-xl font-display font-bold text-white tracking-tight">Daily Conquests</h2>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "p-4 rounded-2xl border flex items-center justify-between group cursor-pointer transition-all",
              challenge.completed 
                ? "bg-accent/10 border-accent/30" 
                : "bg-white/5 border-white/5 hover:border-white/20"
            )}
            onClick={() => toggleChallenge(challenge.id)}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "transition-colors",
                challenge.completed ? "text-accent drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]" : "text-white/20"
              )}>
                {challenge.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
              </div>
              <div>
                <h4 className={cn("text-sm font-semibold tracking-tight", challenge.completed && "line-through text-white/40")}>
                  {challenge.title}
                </h4>
                <p className="text-[11px] text-white/30 mt-0.5 font-medium">{challenge.description}</p>
              </div>
            </div>
            <div className={cn(
              "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
              challenge.completed ? "bg-accent text-white" : "bg-white/10 text-white/40"
            )}>
              +{challenge.xp} XP
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 bg-accent text-white rounded-2xl font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(244,63,94,0.2)]">
        Start Mega Training
      </button>
    </div>
  );
}
