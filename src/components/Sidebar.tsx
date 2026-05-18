import React from 'react';
import { LayoutDashboard, Flame, Target, BookOpen, Settings, User, Trophy, Beef } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const items = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'workout', icon: Flame, label: 'Training' },
    { id: 'nutrition', icon: Beef, label: 'Nutrition' },
    { id: 'challenges', icon: Trophy, label: 'Challenges' },
    { id: 'library', icon: BookOpen, label: 'Library' },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-bg border-r border-white/5 hidden lg:flex flex-col z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-linear-to-tr from-brand to-emerald-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.3)]">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight">Pulse<span className="text-brand">AI</span></h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5 mt-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-white/5 text-brand font-bold" 
                  : "text-white/40 hover:text-white hover:bg-white/[0.03]"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-brand rounded-r-full"
                />
              )}
              <Icon size={18} className={cn("transition-transform group-hover:scale-110", isActive && "text-brand")} />
              <span className="text-sm tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 space-y-2">
        <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-2">Pro Member</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-brand/50 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="avatar" />
              </div>
            </div>
            <span className="text-xs font-bold text-white">Alex Rivera</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
