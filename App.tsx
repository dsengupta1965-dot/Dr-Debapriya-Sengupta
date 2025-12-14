import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ModuleView } from './components/ModuleView';
import { AISimulation } from './components/AISimulation';
import { COURSE_MODULES } from './data/courseContent';
import { CourseState } from './types';

function App() {
  const [state, setState] = useState<CourseState>({
    currentModuleId: null,
    completedModules: [],
    currentView: 'dashboard'
  });

  const handleSelectModule = (id: string) => {
    setState(prev => ({
      ...prev,
      currentModuleId: id,
      currentView: 'module'
    }));
  };

  const handleDashboardClick = () => {
    setState(prev => ({
      ...prev,
      currentModuleId: null,
      currentView: 'dashboard'
    }));
  };

  const handleSimulationClick = () => {
    setState(prev => ({
      ...prev,
      currentModuleId: null,
      currentView: 'simulation'
    }));
  };

  const handleModuleComplete = () => {
    if (state.currentModuleId && !state.completedModules.includes(state.currentModuleId)) {
      setState(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, prev.currentModuleId!]
      }));
    }
    // Return to dashboard after completion
    handleDashboardClick();
  };

  const currentModule = COURSE_MODULES.find(m => m.id === state.currentModuleId);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        modules={COURSE_MODULES}
        currentModuleId={state.currentModuleId}
        onSelectModule={handleSelectModule}
        completedModules={state.completedModules}
        onDashboardClick={handleDashboardClick}
        onSimulationClick={handleSimulationClick}
      />
      
      <main className="ml-64 flex-1">
        {state.currentView === 'dashboard' && (
          <Dashboard 
            modules={COURSE_MODULES}
            completedModules={state.completedModules}
            onStartModule={handleSelectModule}
          />
        )}

        {state.currentView === 'module' && currentModule && (
          <ModuleView 
            module={currentModule}
            onComplete={handleModuleComplete}
          />
        )}

        {state.currentView === 'simulation' && (
          <AISimulation />
        )}
      </main>
    </div>
  );
}

export default App;