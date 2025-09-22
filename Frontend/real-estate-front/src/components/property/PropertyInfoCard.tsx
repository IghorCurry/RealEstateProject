import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useLanguage } from "../../contexts/LanguageContext";
import { formatDate } from "../../utils/helpers";
import type { PropertyDetailed } from "../../types/property";

interface PropertyInfoCardProps {
  property: PropertyDetailed;
  isAdmin: boolean;
}

export const PropertyInfoCard: React.FC<PropertyInfoCardProps> = ({
  property,
  isAdmin,
}) => {
  const { t } = useLanguage();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          {t("property.details.title")}
        </Typography>

        {isAdmin && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t("property.details.id") || "Property ID"}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {property.id}
            </Typography>
          </Box>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t("property.details.listedDate") || "Listed Date"}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {formatDate(property.createdAt)}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t("property.details.lastUpdated") || "Last Updated"}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {property.updatedAt
              ? formatDate(property.updatedAt)
              : formatDate(property.createdAt)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
