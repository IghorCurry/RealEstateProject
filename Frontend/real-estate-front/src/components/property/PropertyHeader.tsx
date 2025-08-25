import React from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocationOn as LocationIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  getPropertyStatusLabel,
  getPropertyStatusColor,
  getPropertyTypeLabel,
  formatPrice,
} from "../../utils/helpers";
import type { PropertyDetailed } from "../../types/property";

interface PropertyHeaderProps {
  property: PropertyDetailed;
  isAuthenticated: boolean;
  canModify: boolean;
  onShare: () => void;
  onFavoriteToggle: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  property,
  isAuthenticated,
  canModify,
  onShare,
  onFavoriteToggle,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            {property.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocationIcon sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body1" color="text.secondary">
              {property.address}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Share Button */}
          <IconButton onClick={onShare} color="primary">
            <ShareIcon />
          </IconButton>

          {/* Favorite Button */}
          {isAuthenticated && (
            <IconButton onClick={onFavoriteToggle} color="primary">
              {property.isFavoritedByCurrentUser ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          )}

          {/* Edit/Delete Buttons */}
          {canModify && isAuthenticated && (
            <>
              <IconButton onClick={onEditClick} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={onDeleteClick} color="error">
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      {/* Status and Type Chips */}
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <Chip
          label={getPropertyStatusLabel(property.status)}
          sx={{
            backgroundColor: getPropertyStatusColor(property.status),
            color: "white",
            fontWeight: 600,
          }}
        />
        <Chip
          label={getPropertyTypeLabel(property.propertyType)}
          variant="outlined"
        />
      </Box>

      {/* Price */}
      <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
        {formatPrice(property.price)}
      </Typography>
    </Box>
  );
};
