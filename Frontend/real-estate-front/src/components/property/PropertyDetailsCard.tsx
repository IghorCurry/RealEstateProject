import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import {
  Bed as BedIcon,
  Bathtub as BathIcon,
  SquareFoot as AreaIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { formatDate, getLocationLabel } from "../../utils/helpers";
import type { PropertyDetailed } from "../../types/property";

interface PropertyDetailsCardProps {
  property: PropertyDetailed;
}

export const PropertyDetailsCard: React.FC<PropertyDetailsCardProps> = ({
  property,
}) => {
  return (
    <>
      {/* Property Details */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Property Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: "center" }}>
                <BedIcon sx={{ fontSize: 32, color: "primary.main", mb: 1 }} />
                <Typography variant="h6">{property.bedrooms}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Bedrooms
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: "center" }}>
                <BathIcon sx={{ fontSize: 32, color: "primary.main", mb: 1 }} />
                <Typography variant="h6">{property.bathrooms}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Bathrooms
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: "center" }}>
                <AreaIcon sx={{ fontSize: 32, color: "primary.main", mb: 1 }} />
                <Typography variant="h6">{property.squareMeters} m²</Typography>
                <Typography variant="body2" color="text.secondary">
                  Area
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: "center" }}>
                <CalendarIcon
                  sx={{ fontSize: 32, color: "primary.main", mb: 1 }}
                />
                <Typography variant="h6">
                  {formatDate(property.createdAt)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Listed Date
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Description */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Description
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            {property.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Features */}
      {property.features && property.features.length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Features & Amenities
            </Typography>
            <Grid container spacing={2}>
              {property.features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1.5,
                      borderRadius: 1,
                      backgroundColor: "primary.light",
                      color: "primary.contrastText",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {feature}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Location */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Location
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocationIcon sx={{ mr: 2, color: "primary.main" }} />
            <Box>
              <Typography variant="h6">
                {getLocationLabel(property.location)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {property.address}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
