import React from 'react';
import { BookOpen, CheckCircle, LayoutDashboard, BrainCircuit } from 'lucide-react';
import { Module } from '../types';

interface SidebarProps {
  modules: Module[];
  currentModuleId: string | null;
  onSelectModule: (id: string) => void;
  completedModules: string[];
  onDashboardClick: () => void;
  onSimulationClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  modules, 
  currentModuleId, 
  onSelectModule, 
  completedModules,
  onDashboardClick,
  onSimulationClick
}) => {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-slate-700 bg-nair-blue">
        <h1 className="text-xl font-bold text-white tracking-tight">IRHS NAIR</h1>
        <p className="text-xs text-slate-300 mt-1">Stores Management Course</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={onDashboardClick}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-left"
        >
          <LayoutDashboard size={20} className="text-blue-400" />
          <span className="font-medium">Dashboard</span>
        </button>

         <button
          onClick={onSimulationClick}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-left border border-amber-600/30 bg-amber-900/10"
        >
          <BrainCircuit size={20} className="text-amber-500" />
          <span className="font-medium text-amber-100">AI Vigilance Sim</span>
        </button>

        <div className="pt-4 pb-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Modules</p>
        </div>

        {modules.map((module) => {
          const isCompleted = completedModules.includes(module.id);
          const isActive = currentModuleId === module.id;

          return (
            <button
              key={module.id}
              onClick={() => onSelectModule(module.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                isActive 
                  ? 'bg-blue-900 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <BookOpen size={18} className={isActive ? 'text-blue-300' : 'text-slate-500'} />
                <span className="truncate text-sm">{module.title.split(':')[0]}</span>
              </div>
              {isCompleted && <CheckCircle size={16} className="text-green-400 flex-shrink-0" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="text-xs text-slate-500 text-center">
          © NAIR Vadodara | IRHS
        </div>
      </div>
    </div>
  );
};