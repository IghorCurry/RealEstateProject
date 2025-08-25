import { useState } from "react";

/**
 * Хук для управління features в property формах
 */
export const usePropertyFeatures = (initialFeatures: string[] = []) => {
  const [features, setFeatures] = useState<string[]>(initialFeatures);
  const [newFeature, setNewFeature] = useState("");

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFeatures(features.filter((feature) => feature !== featureToRemove));
  };

  const updateFeatures = (newFeatures: string[]) => {
    setFeatures(newFeatures);
  };

  return {
    features,
    newFeature,
    setNewFeature,
    addFeature,
    removeFeature,
    updateFeatures,
  };
};
