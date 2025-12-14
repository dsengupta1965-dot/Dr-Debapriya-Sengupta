import React from 'react';
import { Module } from '../types';
import { Award, BookOpen, Activity, AlertCircle } from 'lucide-react';

interface DashboardProps {
  modules: Module[];
  completedModules: string[];
  onStartModule: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ modules, completedModules, onStartModule }) => {
  const progress = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, Probationer.</h1>
        <p className="text-slate-500 text-lg">
          IRHS Stores Management Foundation Course
        </p>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Course Progress</p>
            <p className="text-2xl font-bold text-slate-900">{progress}%</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Modules Completed</p>
            <p className="text-2xl font-bold text-slate-900">{completedModules.length} / {modules.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="bg-amber-100 p-3 rounded-full text-amber-600">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Current Status</p>
            <p className="text-2xl font-bold text-slate-900">
              {progress === 100 ? 'Certified' : 'In Training'}
            </p>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <h2 className="text-xl font-bold text-slate-800 mb-6">Course Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const isCompleted = completedModules.includes(module.id);
          return (
            <div 
              key={module.id} 
              className={`group bg-white rounded-xl border transition-all hover:shadow-md flex flex-col ${
                isCompleted ? 'border-green-200 bg-green-50/30' : 'border-slate-200'
              }`}
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {module.id.toUpperCase()}
                  </span>
                  {isCompleted && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                      Completed
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {module.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-3">
                  {module.description}
                </p>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <button
                  onClick={() => onStartModule(module.id)}
                  className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    isCompleted 
                      ? 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50' 
                      : 'bg-blue-900 text-white hover:bg-blue-800'
                  }`}
                >
                  {isCompleted ? 'Review Module' : 'Start Module'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-4">
        <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-amber-900">Note for Probationers</h4>
          <p className="text-amber-800 text-sm mt-1">
            Completion of all modules and passing the assessment is mandatory for the Foundation Course certificate. Ensure you review the "Audit & Vigilance" module carefully as it carries high weightage in the final exam.
          </p>
        </div>
      </div>
    </div>
  );
};