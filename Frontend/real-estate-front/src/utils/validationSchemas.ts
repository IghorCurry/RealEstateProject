import * as yup from "yup";
import { API_CONFIG } from "./constants";

export type TranslateFn = (
  key: string,
  params?: Record<string, string | number>
) => string;

export interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  address: string;
  location: number;
  propertyType: number;
  status: number;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  features: string[];
}

export interface ImageValidationData {
  images: File[];
}

export interface FeatureValidationData {
  feature: string;
}

export const createPropertyFormSchema = (t: TranslateFn) =>
  yup.object({
    title: yup
      .string()
      .required(t("validation.title.required"))
      .min(2, t("validation.title.min"))
      .max(100, t("validation.title.max"))
      .matches(
        /^[\p{L}\p{M}\p{N}\s'’‘ʼ\-.,()!?:;#№]+$/u,
        t("validation.title.pattern")
      )
      .trim(),

    description: yup
      .string()
      .required(t("validation.description.required"))
      .min(3, t("validation.description.min"))
      .max(1000, t("validation.description.max"))
      .trim(),

    price: yup
      .number()
      .required(t("validation.price.required"))
      .positive(t("validation.price.positive"))
      .min(1, t("validation.price.min"))
      .max(100000000, t("validation.price.max"))
      .integer(t("validation.price.integer")),

    address: yup
      .string()
      .required(t("validation.address.required"))
      .min(1, t("validation.address.min"))
      .max(500, t("validation.address.max"))
      .matches(
        /^[\p{L}\p{M}\p{N}\s'’‘ʼ\-.,/\\#№]+$/u,
        t("validation.address.pattern")
      )
      .trim(),

    location: yup
      .number()
      .required(t("validation.location.required"))
      .min(1, t("validation.location.invalid"))
      .max(6, t("validation.location.invalid")),

    propertyType: yup
      .number()
      .required(t("validation.propertyType.required"))
      .min(1, t("validation.propertyType.invalid"))
      .max(7, t("validation.propertyType.invalid")),

    status: yup
      .number()
      .required(t("validation.status.required"))
      .min(1, t("validation.status.invalid"))
      .max(4, t("validation.status.invalid")),

    bedrooms: yup
      .number()
      .required(t("validation.bedrooms.required"))
      .min(0, t("validation.bedrooms.nonNegative"))
      .max(50, t("validation.bedrooms.max"))
      .integer(t("validation.bedrooms.integer")),

    bathrooms: yup
      .number()
      .required(t("validation.bathrooms.required"))
      .min(0, t("validation.bathrooms.nonNegative"))
      .max(10, t("validation.bathrooms.max"))
      .integer(t("validation.bathrooms.integer")),

    squareMeters: yup
      .number()
      .required(t("validation.squareMeters.required"))
      .positive(t("validation.squareMeters.positive"))
      .min(1, t("validation.squareMeters.min"))
      .max(10000, t("validation.squareMeters.max"))
      .integer(t("validation.squareMeters.integer")),

    features: yup
      .array()
      .of(
        yup
          .string()
          .min(1, t("validation.feature.empty"))
          .max(100, t("validation.feature.max"))
          .matches(/^[\p{L}\p{M}\p{N}\s-]+$/u, t("validation.feature.pattern"))
          .trim()
      )
      .max(20, t("validation.features.max"))
      .test("unique-features", t("validation.features.unique"), (features) => {
        if (!features) return true;
        const uniqueFeatures = new Set(
          features.map((f) => f?.toLowerCase().trim()).filter(Boolean)
        );
        return uniqueFeatures.size === features.length;
      }),
  });

export const createImageValidationSchema = (t: TranslateFn) =>
  yup.object({
    images: yup
      .array()
      .of(yup.mixed<File>())
      .test("file-size", t("validation.images.size"), (files) => {
        if (!files || files.length === 0) return true;
        for (const file of files) {
          if (file && file.size > API_CONFIG.MAX_FILE_SIZE) {
            return false;
          }
        }
        return true;
      })
      .test("file-type", t("validation.images.type"), (files) => {
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
        t("validation.images.max", {
          count: API_CONFIG.MAX_FILES_PER_PROPERTY,
        }),
        (files) => {
          if (!files) return true;
          return files.length <= API_CONFIG.MAX_FILES_PER_PROPERTY;
        }
      )
      .test("min-files", t("validation.images.min"), (files) => {
        if (!files) return false;
        return files.length > 0;
      }),
  });

export const createFeatureValidationSchema = (t: TranslateFn) =>
  yup.object({
    feature: yup
      .string()
      .required(t("validation.feature.required"))
      .min(1, t("validation.feature.empty"))
      .max(50, t("validation.feature.maxShort"))
      .matches(/^[\p{L}\p{M}\p{N}\s-]+$/u, t("validation.feature.pattern"))
      .trim(),
  });
