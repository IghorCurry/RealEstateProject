import React, { useState, useEffect } from "react";
import {
  subscribeToHealthCheck,
  performHealthCheck,
  type ApiHealthReport,
} from "../../utils/apiHealthCheck";

/**
 * React hook for API health status
 */
export const useApiHealth = () => {
  const [healthReport, setHealthReport] = useState<ApiHealthReport | null>(null);

  useEffect(() => {
    // Subscribe to health updates
    const unsubscribe = subscribeToHealthCheck(setHealthReport);

    // Perform initial check if no report exists
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

/**
 * API Health Status Component
 */
export const ApiStatusIndicator: React.FC<{
  showDetails?: boolean;
  className?: string;
}> = ({ showDetails = false, className = "" }) => {
  const { isOnline, responseTime, lastChecked, error, refresh } = useApiHealth();

  const statusColor = isOnline ? "green" : "red";
  const statusText = isOnline ? "Online" : "Offline";

  return (
    <div className={`api-status-indicator ${className}`}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: statusColor,
          }}
        />
        <span style={{ fontSize: "12px", color: "#666" }}>
          API: {statusText}
        </span>
        {showDetails && (
          <button
            onClick={refresh}
            style={{
              background: "none",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "2px 6px",
              fontSize: "10px",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        )}
      </div>
      
      {showDetails && (
        <div style={{ fontSize: "10px", color: "#888", marginTop: "4px" }}>
          {isOnline ? (
            <>
              Response time: {responseTime}ms
              {lastChecked && (
                <> • Last checked: {lastChecked.toLocaleTimeString()}</>
              )}
            </>
          ) : (
            <>{error}</>
          )}
        </div>
      )}
    </div>
  );
};