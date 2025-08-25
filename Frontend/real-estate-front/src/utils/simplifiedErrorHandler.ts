import { toast } from "react-hot-toast";

/**
 * Спрощений обробник помилок для API
 */
export const handleApiError = (error: unknown, context?: string) => {
  const message = error instanceof Error ? error.message : "An error occurred";
  toast.error(message);
  console.error(`Error in ${context || 'API'}:`, error);
};

/**
 * Обробник помилок з кастомним повідомленням
 */
export const handleApiErrorWithMessage = (error: unknown, customMessage: string) => {
  toast.error(customMessage);
  console.error(customMessage, error);
};

/**
 * Обробник помилок з fallback повідомленням
 */
export const handleApiErrorWithFallback = (
  error: unknown, 
  customMessage: string, 
  fallbackMessage: string = "An error occurred"
) => {
  const message = error instanceof Error && error.message ? customMessage : fallbackMessage;
  toast.error(message);
  console.error(customMessage, error);
};
