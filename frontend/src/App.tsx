import React from 'react';
import { HealthStatus } from './components/HealthStatus';
import { Cpu, Layers, Terminal, CheckCircle } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-enigma-bg flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Background ambient lighting effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wider text-white">PROJECT ENIGMA</h1>
              <p className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">AI Platform Architecture</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              PHASE 1: FOUNDATION
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full space-y-10">
        {/* Intro Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
            System Foundation Verified
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Phase 1 setup is complete. FastAPI backend, React + Vite frontend, TypeScript, Tailwind CSS, environment configs, CORS, and logging are fully configured and operational.
          </p>
        </div>

        {/* Live Health Status Component */}
        <HealthStatus />

        {/* Modular Architecture Specs */}
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Phase 1 Infrastructure Matrix</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
                <Terminal className="w-4 h-4" />
                Backend Engine
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> FastAPI Async Framework</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Pydantic v2 Settings Management</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Configurable CORS Middleware</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Structured Logger & Health Endpoint</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                <Cpu className="w-4 h-4" />
                Frontend Client
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> React 18 + Vite Bundler</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> TypeScript Strict Mode</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Tailwind CSS Dark Theme</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Modular Service & Type Layer</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 font-mono">
          Project Enigma &copy; 2026 &bull; Production Ready AI Foundation &bull; Phase 1 Complete
        </div>
      </footer>
    </div>
  );
};

export default App;
