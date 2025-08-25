/**
 * Network utilities for health check
 */

/**
 * Checks if browser is online
 */
export const isBrowserOnline = (): boolean => {
  return navigator.onLine;
};

/**
 * Listens for online/offline events
 */
export const onNetworkChange = (
  callback: (isOnline: boolean) => void
): (() => void) => {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
};

/**
 * Estimates connection speed based on response times
 */
export const estimateConnectionSpeed = (responseTime: number): string => {
  if (responseTime < 100) return "Excellent";
  if (responseTime < 300) return "Good";
  if (responseTime < 1000) return "Fair";
  return "Poor";
};
