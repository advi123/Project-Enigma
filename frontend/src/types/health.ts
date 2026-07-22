export interface HealthCheckResponse {
  status: string;
  app_name: string;
  version: string;
  environment: string;
  timestamp: string;
  cors_allowed_origins: string[];
}

export interface ApiStatusState {
  data: HealthCheckResponse | null;
  loading: boolean;
  error: string | null;
  latencyMs: number | null;
  lastChecked: Date | null;
}
