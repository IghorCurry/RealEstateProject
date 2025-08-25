import { API_CONFIG } from "./constants";

/**
 * Image validation utility functions
 */

/**
 * Validates a single file for image upload
 * @param file - File to validate
 * @returns Validation result with error message if invalid
 */
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates a single image file
 * @param file - File to validate
 * @returns Validation result
 */
export const validateImageFile = (file: File): FileValidationResult => {
  // Check file size (max 10MB)
  if (file.size > API_CONFIG.MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File "${file.name}" is too large. Maximum size is ${
        API_CONFIG.MAX_FILE_SIZE / 1024 / 1024
      }MB`,
    };
  }

  // Check file type
  if (
    !API_CONFIG.SUPPORTED_IMAGE_TYPES.includes(
      file.type as (typeof API_CONFIG.SUPPORTED_IMAGE_TYPES)[number]
    )
  ) {
    return {
      isValid: false,
      error: `File "${
        file.name
      }" has unsupported type. Supported types: ${API_CONFIG.SUPPORTED_IMAGE_EXTENSIONS.join(
        ", "
      )}`,
    };
  }

  // Check file extension
  const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
  if (
    !API_CONFIG.SUPPORTED_IMAGE_EXTENSIONS.includes(
      fileExtension as (typeof API_CONFIG.SUPPORTED_IMAGE_EXTENSIONS)[number]
    )
  ) {
    return {
      isValid: false,
      error: `File "${
        file.name
      }" has unsupported extension. Supported extensions: ${API_CONFIG.SUPPORTED_IMAGE_EXTENSIONS.join(
        ", "
      )}`,
    };
  }

  return { isValid: true };
};

/**
 * Validates multiple image files
 * @param files - Array of files to validate
 * @returns Validation result with details about invalid files
 */
export interface FilesValidationResult {
  isValid: boolean;
  errors: string[];
  validFiles: File[];
  invalidFiles: File[];
}

/**
 * Validates multiple image files for upload
 * @param files - Array of files to validate
 * @param maxFiles - Maximum number of files allowed (default from API_CONFIG)
 * @returns Validation result
 */
export const validateImageFiles = (
  files: File[],
  maxFiles: number = API_CONFIG.MAX_FILES_PER_PROPERTY
): FilesValidationResult => {
  const errors: string[] = [];
  const validFiles: File[] = [];
  const invalidFiles: File[] = [];

  // Check total number of files
  if (files.length > maxFiles) {
    errors.push(`Too many files selected. Maximum allowed: ${maxFiles}`);
    return {
      isValid: false,
      errors,
      validFiles: [],
      invalidFiles: files,
    };
  }

  // Validate each file
  files.forEach((file) => {
    const validation = validateImageFile(file);
    if (validation.isValid) {
      validFiles.push(file);
    } else {
      invalidFiles.push(file);
      if (validation.error) {
        errors.push(validation.error);
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    validFiles,
    invalidFiles,
  };
};

/**
 * Formats file size for display
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Checks if a file is an image based on its type
 * @param file - File to check
 * @returns True if file is an image
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith("image/");
};

/**
 * Gets image dimensions (width and height) from a file
 * @param file - Image file
 * @returns Promise with image dimensions
 */
export const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    if (!isImageFile(file)) {
      reject(new Error("File is not an image"));
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
};

/**
 * Converts a file to base64 data URL
 * @param file - File to convert
 * @returns Promise with base64 data URL
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Creates a preview URL for an image file
 * @param file - Image file
 * @returns Object URL for preview (remember to revoke it when done)
 */
export const createImagePreview = (file: File): string => {
  if (!isImageFile(file)) {
    throw new Error("File is not an image");
  }
  return URL.createObjectURL(file);
};

/**
 * Revokes a preview URL created by createImagePreview
 * @param url - Object URL to revoke
 */
export const revokeImagePreview = (url: string): void => {
  URL.revokeObjectURL(url);
};
