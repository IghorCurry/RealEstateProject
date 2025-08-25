import { useReducer, useCallback } from "react";
import type { PropertyImage } from "../types/property";

// Розширений тип для PropertyImage з файлом
type PropertyImageWithFile = PropertyImage & { file?: File };

// Типи для стану форми
interface PropertyFormState {
  isSubmitting: boolean;
  images: PropertyImageWithFile[];
  features: string[];
  newFeature: string;
  errors: Record<string, string>;
}

// Типи для дій
type PropertyFormAction =
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_IMAGES"; payload: PropertyImageWithFile[] }
  | { type: "ADD_IMAGE"; payload: PropertyImageWithFile }
  | { type: "REMOVE_IMAGE"; payload: string }
  | { type: "SET_FEATURES"; payload: string[] }
  | { type: "ADD_FEATURE"; payload: string }
  | { type: "REMOVE_FEATURE"; payload: string }
  | { type: "SET_NEW_FEATURE"; payload: string }
  | { type: "SET_ERRORS"; payload: Record<string, string> }
  | { type: "CLEAR_ERRORS" }
  | { type: "RESET_STATE" };

// Початковий стан
const initialState: PropertyFormState = {
  isSubmitting: false,
  images: [],
  features: [],
  newFeature: "",
  errors: {},
};

// Reducer для управління станом
function propertyFormReducer(
  state: PropertyFormState,
  action: PropertyFormAction
): PropertyFormState {
  switch (action.type) {
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };

    case "SET_IMAGES":
      return { ...state, images: action.payload };

    case "ADD_IMAGE":
      return {
        ...state,
        images: [...state.images, action.payload],
      };

    case "REMOVE_IMAGE":
      return {
        ...state,
        images: state.images.filter((img) => img.id !== action.payload),
      };

    case "SET_FEATURES":
      return { ...state, features: action.payload };

    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload],
        newFeature: "",
      };

    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter((feature) => feature !== action.payload),
      };

    case "SET_NEW_FEATURE":
      return { ...state, newFeature: action.payload };

    case "SET_ERRORS":
      return { ...state, errors: action.payload };

    case "CLEAR_ERRORS":
      return { ...state, errors: {} };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
}

/**
 * Хук для управління складним станом форми property
 */
export const usePropertyFormState = (initialFeatures: string[] = []) => {
  const [state, dispatch] = useReducer(propertyFormReducer, {
    ...initialState,
    features: initialFeatures,
  });

  // Дії для зображень
  const setImages = useCallback((images: PropertyImageWithFile[]) => {
    dispatch({ type: "SET_IMAGES", payload: images });
  }, []);

  const addImage = useCallback((image: PropertyImageWithFile) => {
    dispatch({ type: "ADD_IMAGE", payload: image });
  }, []);

  const removeImage = useCallback((imageId: string) => {
    dispatch({ type: "REMOVE_IMAGE", payload: imageId });
  }, []);

  // Дії для features
  const setFeatures = useCallback((features: string[]) => {
    dispatch({ type: "SET_FEATURES", payload: features });
  }, []);

  const addFeature = useCallback((feature: string) => {
    if (feature.trim() && !state.features.includes(feature.trim())) {
      dispatch({ type: "ADD_FEATURE", payload: feature.trim() });
    }
  }, [state.features]);

  const removeFeature = useCallback((feature: string) => {
    dispatch({ type: "REMOVE_FEATURE", payload: feature });
  }, []);

  const setNewFeature = useCallback((value: string) => {
    dispatch({ type: "SET_NEW_FEATURE", payload: value });
  }, []);

  // Дії для стану завантаження
  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: "SET_SUBMITTING", payload: isSubmitting });
  }, []);

  // Дії для помилок
  const setErrors = useCallback((errors: Record<string, string>) => {
    dispatch({ type: "SET_ERRORS", payload: errors });
  }, []);

  const clearErrors = useCallback(() => {
    dispatch({ type: "CLEAR_ERRORS" });
  }, []);

  // Скидання стану
  const resetState = useCallback(() => {
    dispatch({ type: "RESET_STATE" });
  }, []);

  return {
    // Стан
    ...state,
    
    // Дії для зображень
    setImages,
    addImage,
    removeImage,
    
    // Дії для features
    setFeatures,
    addFeature,
    removeFeature,
    setNewFeature,
    
    // Дії для стану
    setSubmitting,
    
    // Дії для помилок
    setErrors,
    clearErrors,
    
    // Скидання
    resetState,
  };
};
