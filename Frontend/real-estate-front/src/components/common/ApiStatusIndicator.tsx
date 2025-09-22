import React from "react";
import { useApiHealth } from "../../hooks/useApiHealth";

/**
 * API Health Status Component
 */
export const ApiStatusIndicator: React.FC<{
  showDetails?: boolean;
  className?: string;
}> = ({ showDetails = false, className = "" }) => {
  const { isOnline, responseTime, lastChecked, error, refresh } =
    useApiHealth();

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
