import React, { useState } from 'react';
import { 
  Flame, 
  Droplets, 
  Beef, 
  Footprints, 
  Calendar,
  Search,
  Bell,
  Menu,
  X,
  Stars
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { ProgressRing } from './components/ProgressRing';
import { MetricCard } from './components/MetricCard';
import { WorkoutPlan } from './components/WorkoutPlan';
import { ActivityChart } from './components/ActivityChart';
import { AICoach } from './components/AICoach';
import { DailyChallenges } from './components/DailyChallenges';
import { EXERCISE_LIBRARY, INITIAL_CHALLENGES } from './constants';
import { DailyStats, Challenge } from './types';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>(['1']);
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  
  const stats: DailyStats = {
    caloriesBurned: 1240,
    caloriesGoal: 2000,
    proteinConsumed: 85,
    proteinGoal: 150,
    waterDrank: 1.8,
    waterGoal: 3.5,
    steps: 6420,
    stepsGoal: 10000
  };

  const toggleExercise = (id: string) => {
    setCompletedExercises(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleChallenge = (id: string) => {
    setChallenges(prev => prev.map(c => 
      c.id === id ? { ...c, completed: !c.completed } : c
    ));
  };

  return (
    <div className="min-h-screen bg-bg flex font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Mobile Top Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-border z-[70] px-4 flex items-center justify-between">
        <h1 className="text-xl font-display font-bold gradient-text">FitPulse</h1>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-white/70 hover:text-white"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            className="lg:hidden fixed inset-0 bg-surface z-[65] pt-20 p-6"
          >
            <div className="flex flex-col gap-4">
              {['dashboard', 'workout', 'challenges', 'library'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-xl text-lg font-medium capitalize",
                    activeTab === tab ? "bg-brand/10 text-brand" : "text-white/60"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8 bg-linear-to-b from-brand/10 via-transparent to-transparent">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="lg:hidden w-10 h-10 bg-linear-to-tr from-brand to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
               <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tight text-white">
                Fuel your potential, <span className="text-brand">Athlete</span>
              </h1>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mt-1 flex items-center gap-2">
                <Calendar size={12} className="text-brand" />
                Monday, May 18 • Week 24
              </p>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-8 bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md">
            {['Overview', 'Training', 'Nutrition', 'Insights'].map((item) => (
              <span key={item} className={cn(
                "text-sm font-bold cursor-pointer transition-all hover:scale-105",
                item === 'Overview' ? "text-brand" : "text-white/40 hover:text-white"
              )}>{item}</span>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Pro Member</p>
              <p className="text-sm font-bold text-white">Alex Rivera</p>
            </div>
            <div className="w-11 h-11 rounded-full border-2 border-brand/40 p-0.5 shadow-lg shadow-brand/10">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="avatar" />
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 gap-8 pb-20 lg:pb-0">
          {/* Main Dashboard Section */}
          <div className="xl:col-span-3 space-y-8">
            
            {/* Vital Progress Rings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-linear-to-b from-white/10 to-transparent border border-white/10 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-brand/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <ProgressRing 
                  progress={stats.caloriesBurned / stats.caloriesGoal} 
                  size={160}
                  label={`${Math.round(stats.caloriesBurned / stats.caloriesGoal * 100)}%`}
                  subLabel="Energy"
                  color="#a3e635"
                />
                <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Burned</p>
                    <p className="text-xl font-display font-bold text-brand mt-1">{stats.caloriesBurned}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Goal</p>
                    <p className="text-xl font-display font-bold text-white mt-1">{stats.caloriesGoal}</p>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-b from-white/10 to-transparent border border-white/10 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <ProgressRing 
                  progress={stats.waterDrank / stats.waterGoal} 
                  size={160}
                  label={`${Math.round(stats.waterDrank / stats.waterGoal * 100)}%`}
                  subLabel="Volume"
                  color="#22d3ee"
                />
                <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Hydrate</p>
                    <p className="text-xl font-display font-bold text-cyan-400 mt-1">{stats.waterDrank}L</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Goal</p>
                    <p className="text-xl font-display font-bold text-white mt-1">{stats.waterGoal}L</p>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-b from-white/10 to-transparent border border-white/10 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <ProgressRing 
                  progress={stats.steps / stats.stepsGoal} 
                  size={160}
                  label={`${Math.round(stats.steps / stats.stepsGoal * 100)}%`}
                  subLabel="Steps"
                  color="#f43f5e"
                />
                <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Distance</p>
                    <p className="text-xl font-display font-bold text-accent mt-1">{(stats.steps / 1000).toFixed(1)}km</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Daily</p>
                    <p className="text-xl font-display font-bold text-white mt-1">{stats.steps}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ActivityChart />
                <div className="grid grid-cols-2 gap-6">
                  <MetricCard 
                    icon={Flame} 
                    label="Active Time" 
                    value="124" 
                    unit="min" 
                    trend="+12%" 
                  />
                  <MetricCard 
                    icon={Beef} 
                    label="Protein Intake" 
                    value={stats.proteinConsumed} 
                    unit="g" 
                    trend="-5g" 
                    trendColor="text-white/40"
                  />
                </div>
              </div>
              
              <div className="space-y-8">
                <WorkoutPlan 
                  exercises={EXERCISE_LIBRARY.slice(0, 4)} 
                  completedIds={completedExercises} 
                  toggleExercise={toggleExercise} 
                />
                <div className="bg-brand/10 border border-brand/30 p-6 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-3xl -mr-16 -mt-16 group-hover:bg-brand/40 transition-all"></div>
                  <div className="flex items-center gap-2 text-brand mb-3 relative z-10">
                    <Stars size={18} fill="currentColor" />
                    <span className="text-xs font-black uppercase tracking-widest">Pulse Insight</span>
                  </div>
                  <p className="text-sm text-white leading-relaxed font-medium relative z-10 pr-4">
                    "Your heart rate intensity was 15% higher during Burpees today. Consider a recovery walk this evening."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Section */}
          <div className="space-y-8">
            <DailyChallenges challenges={challenges} toggleChallenge={toggleChallenge} />
            
            {/* Quick Actions */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-display font-bold text-white mb-6 tracking-tight">Quick Pulse</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Droplets, label: 'Water', color: 'hover:bg-cyan-400/20 hover:text-cyan-400' },
                  { icon: Flame, label: 'Meal', color: 'hover:bg-accent/20 hover:text-accent' },
                  { icon: Calendar, label: 'Plan', color: 'hover:bg-indigo-400/20 hover:text-indigo-400' },
                  { icon: Footprints, label: 'Weight', color: 'hover:bg-brand/20 hover:text-brand' }
                ].map((btn) => (
                  <button key={btn.label} className={cn(
                    "flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 transition-all border border-white/5 active:scale-95 hover:border-white/20",
                    btn.color
                  )}>
                    <btn.icon size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Library Mini */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="font-bold text-white mb-4 flex justify-between items-center tracking-tight">
                Library
                <Search size={16} className="text-white/30" />
              </h3>
              <div className="space-y-3">
                {EXERCISE_LIBRARY.slice(4).map(ex => (
                  <div key={ex.id} className="p-3 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg">🏋️</div>
                    <div>
                      <p className="text-xs font-bold text-white">{ex.name}</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{ex.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer Bar */}
        <footer className="lg:hidden fixed bottom-6 left-6 right-6 h-18 flex items-center justify-around bg-bg/60 backdrop-blur-2xl border border-white/10 rounded-3xl z-40 shadow-2xl">
          <div className="flex flex-col items-center gap-1 text-brand">
            <motion.div whileTap={{ scale: 0.8 }}><Bell size={24} /></motion.div>
            <span className="text-[8px] font-black uppercase tracking-widest">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <motion.div whileTap={{ scale: 0.8 }}><Flame size={24} /></motion.div>
            <span className="text-[8px] font-black uppercase tracking-widest">Stats</span>
          </div>
          <div className="-mt-12">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-linear-to-tr from-brand to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-brand/30 border-4 border-bg text-black"
            >
              <Search size={28} />
            </motion.button>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <motion.div whileTap={{ scale: 0.8 }}><Calendar size={24} /></motion.div>
            <span className="text-[8px] font-black uppercase tracking-widest">Plan</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <motion.div whileTap={{ scale: 0.8 }}><Menu size={24} /></motion.div>
            <span className="text-[8px] font-black uppercase tracking-widest">Menu</span>
          </div>
        </footer>

        <AICoach />
      </main>
    </div>
  );
}

