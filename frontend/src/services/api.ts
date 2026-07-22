import { HealthCheckResponse } from '../types/health';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export async function fetchBackendHealth(): Promise<{ data: HealthCheckResponse; latencyMs: number }> {
  const startTime = performance.now();
  
  // Clean endpoint path construction
  const url = `${BASE_URL.replace(/\/$/, '')}/health`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const endTime = performance.now();
  const latencyMs = Math.round(endTime - startTime);

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
  }

  const data: HealthCheckResponse = await response.json();
  return { data, latencyMs };
}
