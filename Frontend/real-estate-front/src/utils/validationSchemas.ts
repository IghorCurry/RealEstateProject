import * as yup from "yup";
import { API_CONFIG } from "./constants";

export const propertyFormSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title cannot exceed 100 characters")
    .matches(
      /^[\p{L}\p{M}\p{N}\s'’‘ʼ\-.,()!?:;#№]+$/u,
      "Use letters (incl. Ukrainian), numbers and basic punctuation"
    )
    .trim(),

  description: yup
    .string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters")
    .max(1000, "Description cannot exceed 1000 characters")
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
    .min(1, "Address must be at least 1 character")
    .max(500, "Address cannot exceed 500 characters")
    .matches(
      /^[\p{L}\p{M}\p{N}\s'’‘ʼ\-.,/\\#№]+$/u,
      "Use letters (incl. Ukrainian), numbers and basic punctuation"
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
    .max(50, "Bedrooms cannot exceed 50")
    .integer("Bedrooms must be a whole number"),

  bathrooms: yup
    .number()
    .required("Number of bathrooms is required")
    .min(0, "Bathrooms cannot be negative")
    .max(10, "Bathrooms cannot exceed 10")
    .integer("Bathrooms must be a whole number"),

  squareMeters: yup
    .number()
    .required("Square meters is required")
    .positive("Square meters must be positive")
    .min(1, "Square meters must be at least 1")
    .max(10000, "Square meters cannot exceed 10,000")
    .integer("Square meters must be a whole number"),

  features: yup
    .array()
    .of(
      yup
        .string()
        .min(1, "Feature cannot be empty")
        .max(100, "Feature cannot exceed 100 characters")
        .matches(
          /^[\p{L}\p{M}\p{N}\s-]+$/u,
          "Use letters (incl. Ukrainian), numbers and hyphen"
        )
        .trim()
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
      /^[\p{L}\p{M}\p{N}\s-]+$/u,
      "Use letters (incl. Ukrainian), numbers and hyphen"
    )
    .trim(),
});

export type FeatureValidationData = yup.InferType<
  typeof featureValidationSchema
>;
