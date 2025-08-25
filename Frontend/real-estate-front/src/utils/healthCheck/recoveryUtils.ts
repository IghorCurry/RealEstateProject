import { performHealthCheck } from "../apiHealthCheck";
import { onNetworkChange } from "./networkUtils";

/**
 * Automatic recovery utilities
 */
export const recoveryUtils = {
  /**
   * Attempts to recover connection by retrying requests
   */
  attemptRecovery: async (maxAttempts: number = 3): Promise<boolean> => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.info(`Recovery attempt ${attempt}/${maxAttempts}`);

      const report = await performHealthCheck();

      if (report.overall.isOnline) {
        console.info("API connection recovered successfully");
        return true;
      }

      // Wait before next attempt (exponential backoff)
      if (attempt < maxAttempts) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    console.warn("Failed to recover API connection");
    return false;
  },

  /**
   * Sets up automatic recovery on network reconnection
   */
  setupAutoRecovery: (): (() => void) => {
    return onNetworkChange(async (isOnline) => {
      if (isOnline) {
        console.info("Network reconnected, attempting API recovery...");
        await recoveryUtils.attemptRecovery();
      }
    });
  },
};
