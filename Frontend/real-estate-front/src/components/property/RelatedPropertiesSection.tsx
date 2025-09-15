import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { PropertyCard } from "./PropertyCard";
import type { Property } from "../../types/property";

interface RelatedPropertiesSectionProps {
  properties: Property[];
  onFavoriteToggle: (propertyId: string) => void;
}

export const RelatedPropertiesSection: React.FC<
  RelatedPropertiesSectionProps
> = ({ properties, onFavoriteToggle }) => {
  if (properties.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Similar Properties
      </Typography>
      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={3} key={property.id}>
            <Box sx={{ height: "100%" }}>
              <PropertyCard
                property={property}
                onFavoriteToggle={() => onFavoriteToggle(property.id)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
