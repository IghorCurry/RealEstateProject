import { useEffect, useState } from "react";
import { subscribeToHealthCheck, performHealthCheck } from "../utils/apiHealthCheck";

type ApiHealthReport = {
  overall: {
    isOnline: boolean;
    responseTime: number;
    lastChecked: Date;
    endpoint: string;
    error?: string;
  };
  endpoints: Record<string, unknown>;
  timestamp: Date;
};

export const useApiHealth = () => {
  const [healthReport, setHealthReport] = useState<ApiHealthReport | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = subscribeToHealthCheck(setHealthReport);
    performHealthCheck();
    return unsubscribe;
  }, []);

  return {
    healthReport,
    isOnline: healthReport?.overall.isOnline ?? false,
    responseTime: healthReport?.overall.responseTime ?? 0,
    lastChecked: healthReport?.overall.lastChecked,
    error: healthReport?.overall.error,
    refresh: performHealthCheck,
  };
};
