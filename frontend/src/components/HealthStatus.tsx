import React, { useState, useEffect, useCallback } from 'react';
import { fetchBackendHealth } from '../services/api';
import { ApiStatusState } from '../types/health';
import { 
  Activity, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Clock, 
  ShieldCheck, 
  Server, 
  Globe,
  Radio
} from 'lucide-react';

export const HealthStatus: React.FC = () => {
  const [state, setState] = useState<ApiStatusState>({
    data: null,
    loading: true,
    error: null,
    latencyMs: null,
    lastChecked: null,
  });

  const checkHealth = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { data, latencyMs } = await fetchBackendHealth();
      setState({
        data,
        loading: false,
        error: null,
        latencyMs,
        lastChecked: new Date(),
      });
    } catch (err: any) {
      setState({
        data: null,
        loading: false,
        error: err.message || 'Failed to connect to backend server',
        latencyMs: null,
        lastChecked: new Date(),
      });
    }
  }, []);

  useEffect(() => {
    checkHealth();
    // Auto ping every 10 seconds
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  const isConnected = !!state.data && !state.error;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Main Status Banner */}
      <div className="glass-card glass-glow rounded-2xl p-6 relative overflow-hidden transition-all duration-300">
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-3.5 rounded-xl border ${
              isConnected 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : state.loading 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              {isConnected ? (
                <CheckCircle2 className="w-7 h-7" />
              ) : state.loading ? (
                <RefreshCw className="w-7 h-7 animate-spin" />
              ) : (
                <XCircle className="w-7 h-7" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-white tracking-tight">
                  Backend Link Status
                </h3>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  isConnected 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : state.loading 
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isConnected ? 'bg-emerald-400 animate-pulse' : state.loading ? 'bg-amber-400' : 'bg-rose-400'
                  }`} />
                  {isConnected ? 'ONLINE' : state.loading ? 'CONNECTING...' : 'OFFLINE'}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {isConnected 
                  ? `Connected to ${state.data?.app_name} (v${state.data?.version})` 
                  : state.error || 'Attempting to establish connection to FastAPI...'}
              </p>
            </div>
          </div>

          <button
            onClick={checkHealth}
            disabled={state.loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40"
          >
            <RefreshCw className={`w-4 h-4 ${state.loading ? 'animate-spin' : ''}`} />
            <span>{state.loading ? 'Ping...' : 'Check Connection'}</span>
          </button>
        </div>
      </div>

      {/* Grid of Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Latency Card */}
        <div className="glass-card rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Response Latency</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">
              {state.latencyMs !== null ? state.latencyMs : '--'}
            </span>
            <span className="text-sm font-medium text-slate-400">ms</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Round-trip HTTP request time</p>
        </div>

        {/* Environment Card */}
        <div className="glass-card rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Environment</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold font-mono text-white capitalize">
              {state.data?.environment || '--'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">FastAPI server configuration mode</p>
        </div>

        {/* Last Ping Card */}
        <div className="glass-card rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Last Sync</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <span className="text-lg font-bold font-mono text-white">
              {state.lastChecked ? state.lastChecked.toLocaleTimeString() : '--:--:--'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Auto-refreshes every 10 seconds</p>
        </div>
      </div>

      {/* Backend Specs & CORS info */}
      {state.data && (
        <div className="glass-card rounded-xl p-6 space-y-4">
          <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Backend Configuration Metadata
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-sm">
            <div>
              <span className="text-slate-400 block text-xs">API Endpoint</span>
              <code className="text-indigo-300 font-mono text-xs bg-slate-900/60 px-2 py-1 rounded border border-slate-800 mt-1 inline-block">
                GET /api/v1/health
              </code>
            </div>

            <div>
              <span className="text-slate-400 block text-xs">UTC Server Timestamp</span>
              <code className="text-emerald-300 font-mono text-xs bg-slate-900/60 px-2 py-1 rounded border border-slate-800 mt-1 inline-block">
                {state.data.timestamp}
              </code>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-slate-400 block text-xs mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Allowed CORS Origins
            </span>
            <div className="flex flex-wrap gap-2">
              {state.data.cors_allowed_origins.map((origin, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 rounded-md bg-slate-900/80 text-xs font-mono text-slate-300 border border-slate-800"
                >
                  {origin}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error detail banner if present */}
      {state.error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
          <Radio className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-rose-200 block">Connection Diagnostic Warning</span>
            Ensure the FastAPI server is running on <code className="font-mono bg-rose-950/60 px-1.5 py-0.5 rounded text-rose-300">http://127.0.0.1:8000</code>. Run <code className="font-mono bg-rose-950/60 px-1.5 py-0.5 rounded text-rose-300">uvicorn app.main:app --reload</code> inside the <code className="font-mono bg-rose-950/60 px-1.5 py-0.5 rounded text-rose-300">backend</code> directory.
          </div>
        </div>
      )}
    </div>
  );
};
