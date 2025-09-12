import { apiClient } from "../services/api";
import { API_ENDPOINTS } from "./constants";
import type {
  ApiHealthStatus,
  ApiHealthReport,
  HealthCheckState,
} from "./healthCheck/types";

/**
 * API Health Check utilities for Real Estate application
 * Monitors API availability and provides status indicators
 */

// Health check state
const healthCheckState: HealthCheckState = {
  isChecking: false,
  lastReport: null,
  checkInterval: null,
  listeners: [],
};

/**
 * Performs a health check on a specific endpoint
 */
const checkEndpointHealth = async (
  endpoint: string,
  timeout: number = 5000
): Promise<ApiHealthStatus> => {
  const startTime = Date.now();

  try {
    // Create a controller to handle timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Make a simple GET request to the endpoint
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
 * Performs a comprehensive health check of all critical endpoints
 */
export const performHealthCheck = async (): Promise<ApiHealthReport> => {
  if (healthCheckState.isChecking) {
    // Return last report if already checking
    return healthCheckState.lastReport || createEmptyReport();
  }

  healthCheckState.isChecking = true;

  try {
    // Define critical endpoints to check
    const endpointsToCheck = [
      { name: "properties", url: API_ENDPOINTS.PROPERTY.ALL },
      { name: "user", url: API_ENDPOINTS.USER.CURRENT },
      // Removed auth endpoint as it requires POST method, not GET
    ];

    // Perform health checks in parallel
    const healthChecks = await Promise.allSettled(
      endpointsToCheck.map(async ({ name, url }) => ({
        name,
        status: await checkEndpointHealth(url, 3000),
      }))
    );

    // Process results
    const endpoints: Record<string, ApiHealthStatus> = {};
    let totalResponseTime = 0;
    let onlineCount = 0;
    let overallError: string | undefined;

    healthChecks.forEach((result, index) => {
      const { name } = endpointsToCheck[index];

      if (result.status === "fulfilled") {
        const { status } = result.value;
        endpoints[name] = status;
        totalResponseTime += status.responseTime;

        if (status.isOnline) {
          onlineCount++;
        }
      } else {
        // Handle rejected promises
        endpoints[name] = {
          isOnline: false,
          responseTime: 0,
          lastChecked: new Date(),
          endpoint: endpointsToCheck[index].url,
          error: result.reason?.message || "Health check failed",
        };
      }
    });

    // Determine overall health
    const isOverallOnline = onlineCount > 0; // At least one endpoint is online
    const avgResponseTime =
      onlineCount > 0 ? totalResponseTime / onlineCount : 0;

    if (!isOverallOnline) {
      overallError = "All API endpoints are unreachable";
    } else if (onlineCount < endpointsToCheck.length) {
      overallError = `${
        endpointsToCheck.length - onlineCount
      } endpoint(s) are offline`;
    }

    const report: ApiHealthReport = {
      overall: {
        isOnline: isOverallOnline,
        responseTime: avgResponseTime,
        lastChecked: new Date(),
        endpoint: "overall",
        error: overallError,
      },
      endpoints,
      timestamp: new Date(),
    };

    healthCheckState.lastReport = report;

    // Notify listeners
    healthCheckState.listeners.forEach((listener) => {
      try {
        listener(report);
      } catch (error) {
        console.error("Error in health check listener:", error);
      }
    });

    return report;
  } finally {
    healthCheckState.isChecking = false;
  }
};

/**
 * Creates an empty health report
 */
const createEmptyReport = (): ApiHealthReport => ({
  overall: {
    isOnline: false,
    responseTime: 0,
    lastChecked: new Date(),
    endpoint: "overall",
    error: "No health check performed yet",
  },
  endpoints: {},
  timestamp: new Date(),
});

/**
 * Starts periodic health checks
 */
export const startHealthCheck = (intervalMs: number = 30000): void => {
  if (healthCheckState.checkInterval) {
    stopHealthCheck();
  }

  // Perform initial check
  performHealthCheck();

  // Set up periodic checks
  healthCheckState.checkInterval = window.setInterval(() => {
    performHealthCheck();
  }, intervalMs);

  console.info(`API health check started with ${intervalMs}ms interval`);
};

/**
 * Stops periodic health checks
 */
export const stopHealthCheck = (): void => {
  if (healthCheckState.checkInterval) {
    clearInterval(healthCheckState.checkInterval);
    healthCheckState.checkInterval = null;
    console.info("API health check stopped");
  }
};

/**
 * Gets the last health check report
 */
export const getLastHealthReport = (): ApiHealthReport | null => {
  return healthCheckState.lastReport;
};

/**
 * Checks if API is currently online based on last health check
 */
export const isApiOnline = (): boolean => {
  return healthCheckState.lastReport?.overall.isOnline ?? false;
};

/**
 * Gets API response time from last health check
 */
export const getApiResponseTime = (): number => {
  return healthCheckState.lastReport?.overall.responseTime ?? 0;
};

/**
 * Subscribes to health check updates
 */
export const subscribeToHealthCheck = (
  listener: (report: ApiHealthReport) => void
): (() => void) => {
  healthCheckState.listeners.push(listener);

  // Return unsubscribe function
  return () => {
    const index = healthCheckState.listeners.indexOf(listener);
    if (index > -1) {
      healthCheckState.listeners.splice(index, 1);
    }
  };
};

/**
 * Simple API health status data for components to use
 */
export const getApiHealthData = () => {
  const report = healthCheckState.lastReport;
  return {
    isOnline: report?.overall.isOnline ?? false,
    responseTime: report?.overall.responseTime ?? 0,
    lastChecked: report?.overall.lastChecked,
    error: report?.overall.error,
  };
};

// Re-export utilities from separate modules
export {
  isBrowserOnline,
  onNetworkChange,
  estimateConnectionSpeed,
} from "./healthCheck/networkUtils";
export { recoveryUtils } from "./healthCheck/recoveryUtils";
