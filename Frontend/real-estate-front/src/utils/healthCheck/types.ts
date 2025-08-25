/**
 * API Health Check types
 */

export interface ApiHealthStatus {
  isOnline: boolean;
  responseTime: number;
  lastChecked: Date;
  endpoint: string;
  error?: string;
}

export interface ApiHealthReport {
  overall: ApiHealthStatus;
  endpoints: Record<string, ApiHealthStatus>;
  timestamp: Date;
}

export interface HealthCheckState {
  isChecking: boolean;
  lastReport: ApiHealthReport | null;
  checkInterval: number | null;
  listeners: ((report: ApiHealthReport) => void)[];
}
