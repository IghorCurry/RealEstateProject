import * as yup from "yup";

/**
 * Спільна схема валідації для форм property (створення та редагування)
 */
export const propertyFormSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  address: yup.string().required("Address is required"),
  location: yup.number().required("Location is required"),
  propertyType: yup.number().required("Property type is required"),
  status: yup.number().required("Property status is required"),
  bedrooms: yup
    .number()
    .required("Number of bedrooms is required")
    .min(0, "Bedrooms cannot be negative"),
  bathrooms: yup
    .number()
    .required("Number of bathrooms is required")
    .min(0, "Bathrooms cannot be negative"),
  squareMeters: yup
    .number()
    .required("Square meters is required")
    .positive("Square meters must be positive"),
  features: yup.array().of(yup.string()),
});

export type PropertyFormData = yup.InferType<typeof propertyFormSchema>;
