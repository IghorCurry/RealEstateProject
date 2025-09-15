import * as yup from "yup";
import { API_CONFIG } from "./constants";

export const propertyFormSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .matches(
      /^[a-zA-Z0-9\s\-.,()]+$/,
      "Title can only contain letters, numbers, spaces, hyphens, commas, periods, and parentheses"
    )
    .trim(),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters")
    .trim(),

  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive")
    .min(1, "Price must be at least $1")
    .max(100000000, "Price cannot exceed $100,000,000")
    .integer("Price must be a whole number"),

  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot exceed 200 characters")
    .matches(
      /^[a-zA-Z0-9\s\-.,#]+$/,
      "Address can only contain letters, numbers, spaces, hyphens, commas, periods, and #"
    )
    .trim(),

  location: yup
    .number()
    .required("Location is required")
    .min(1, "Please select a valid location")
    .max(6, "Please select a valid location"),

  propertyType: yup
    .number()
    .required("Property type is required")
    .min(1, "Please select a valid property type")
    .max(7, "Please select a valid property type"),

  status: yup
    .number()
    .required("Property status is required")
    .min(1, "Please select a valid status")
    .max(4, "Please select a valid status"),

  bedrooms: yup
    .number()
    .required("Number of bedrooms is required")
    .min(0, "Bedrooms cannot be negative")
    .max(20, "Bedrooms cannot exceed 20")
    .integer("Bedrooms must be a whole number"),

  bathrooms: yup
    .number()
    .required("Number of bathrooms is required")
    .min(0, "Bathrooms cannot be negative")
    .max(15, "Bathrooms cannot exceed 15")
    .test(
      "decimal-bathrooms",
      "Bathrooms can have 0.5 increments (e.g., 1.5, 2.5)",
      (value) => {
        if (value === undefined || value === null) return true;
        // Allow whole numbers and half numbers (0.5, 1.5, etc.)
        return value % 0.5 === 0;
      }
    ),

  squareMeters: yup
    .number()
    .required("Square meters is required")
    .positive("Square meters must be positive")
    .min(1, "Square meters must be at least 1")
    .max(50000, "Square meters cannot exceed 50,000")
    .integer("Square meters must be a whole number"),

  features: yup
    .array()
    .of(
      yup
        .string()
        .min(1, "Feature cannot be empty")
        .max(50, "Feature cannot exceed 50 characters")
        .matches(
          /^[a-zA-Z0-9\s-]+$/,
          "Feature can only contain letters, numbers, spaces, and hyphens"
        )
    )
    .max(20, "Cannot have more than 20 features")
    .test("unique-features", "Features must be unique", (features) => {
      if (!features) return true;
      const uniqueFeatures = new Set(
        features.map((f) => f?.toLowerCase().trim()).filter(Boolean)
      );
      return uniqueFeatures.size === features.length;
    }),
});

export type PropertyFormData = yup.InferType<typeof propertyFormSchema>;

/**
 * Схема валідації для зображень property
 */
export const imageValidationSchema = yup.object({
  images: yup
    .array()
    .of(yup.mixed<File>())
    .test("file-size", "File size validation", (files) => {
      if (!files || files.length === 0) return true;

      for (const file of files) {
        if (file && file.size > API_CONFIG.MAX_FILE_SIZE) {
          return false;
        }
      }
      return true;
    })
    .test("file-type", "File type validation", (files) => {
      if (!files || files.length === 0) return true;

      for (const file of files) {
        if (
          file &&
          !API_CONFIG.SUPPORTED_IMAGE_TYPES.includes(
            file.type as (typeof API_CONFIG.SUPPORTED_IMAGE_TYPES)[number]
          )
        ) {
          return false;
        }
      }
      return true;
    })
    .test(
      "max-files",
      `Cannot upload more than ${API_CONFIG.MAX_FILES_PER_PROPERTY} images`,
      (files) => {
        if (!files) return true;
        return files.length <= API_CONFIG.MAX_FILES_PER_PROPERTY;
      }
    )
    .test("min-files", "At least one image is required", (files) => {
      if (!files) return false;
      return files.length > 0;
    }),
});

export type ImageValidationData = yup.InferType<typeof imageValidationSchema>;

export const featureValidationSchema = yup.object({
  feature: yup
    .string()
    .required("Feature is required")
    .min(1, "Feature cannot be empty")
    .max(50, "Feature cannot exceed 50 characters")
    .matches(
      /^[a-zA-Z0-9\s-]+$/,
      "Feature can only contain letters, numbers, spaces, and hyphens"
    )
    .trim(),
});

export type FeatureValidationData = yup.InferType<
  typeof featureValidationSchema
>;
