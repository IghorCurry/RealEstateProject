import { apiClient } from "../services/api";
import { API_ENDPOINTS } from "./constants";

/**
 * Спрощений API Health Check
 */
export interface HealthStatus {
  isOnline: boolean;
  responseTime: number;
  lastChecked: Date;
  endpoint: string;
  error?: string;
}

export interface HealthReport {
  overall: {
    isOnline: boolean;
    responseTime: number;
    lastChecked: Date;
  };
  endpoints: Record<string, HealthStatus>;
}

/**
 * Перевіряє стан конкретного endpoint
 */
export const checkEndpointHealth = async (
  endpoint: string,
  timeout: number = 5000
): Promise<HealthStatus> => {
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    await apiClient.get(endpoint, {
      signal: controller.signal,
      timeout,
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    return {
      isOnline: true,
      responseTime,
      lastChecked: new Date(),
      endpoint,
    };
  } catch (error: unknown) {
    const responseTime = Date.now() - startTime;
    return {
      isOnline: false,
      responseTime,
      lastChecked: new Date(),
      endpoint,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Виконує перевірку всіх критичних endpoints
 */
export const performHealthCheck = async (): Promise<HealthReport> => {
  const endpointsToCheck = [
    { name: "properties", url: API_ENDPOINTS.PROPERTY.ALL },
    { name: "auth", url: API_ENDPOINTS.AUTH.VALIDATE_TOKEN },
  ];

  const healthChecks = await Promise.allSettled(
    endpointsToCheck.map(async ({ name, url }) => ({
      name,
      status: await checkEndpointHealth(url, 3000),
    }))
  );

  const endpoints: Record<string, HealthStatus> = {};
  let totalResponseTime = 0;
  let onlineCount = 0;

  healthChecks.forEach((result, index) => {
    const { name } = endpointsToCheck[index];
    
    if (result.status === "fulfilled") {
      endpoints[name] = result.value.status;
      totalResponseTime += result.value.status.responseTime;
      if (result.value.status.isOnline) onlineCount++;
    } else {
      endpoints[name] = {
        isOnline: false,
        responseTime: 0,
        lastChecked: new Date(),
        endpoint: name,
        error: "Check failed",
      };
    }
  });

  const isAllOnline = onlineCount === endpointsToCheck.length;
  const avgResponseTime = endpointsToCheck.length > 0 ? totalResponseTime / endpointsToCheck.length : 0;

  return {
    overall: {
      isOnline: isAllOnline,
      responseTime: avgResponseTime,
      lastChecked: new Date(),
    },
    endpoints,
  };
};
