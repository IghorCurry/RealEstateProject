import React from "react";
import { Box } from "@mui/material";
import { ModernHero } from "../components/common/ModernHero";
import { ModernFeatures } from "../components/common/ModernFeatures";

export const HomePage: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Modern Hero Section */}
      <ModernHero />

      {/* Modern Features Section */}
      <ModernFeatures />
    </Box>
  );
};
