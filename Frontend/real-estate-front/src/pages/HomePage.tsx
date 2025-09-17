import React from "react";
import { Box } from "@mui/material";
import { ModernHero } from "../components/common/ModernHero";
const ModernFeatures = React.lazy(() =>
  import("../components/common/ModernFeatures").then((m) => ({
    default: m.ModernFeatures,
  }))
);

export const HomePage: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Modern Hero Section */}
      <ModernHero />

      {/* Modern Features Section */}
      <React.Suspense fallback={null}>
        <ModernFeatures />
      </React.Suspense>
    </Box>
  );
};
