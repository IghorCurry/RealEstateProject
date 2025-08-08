import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocationOn as LocationIcon,
  Bed as BedIcon,
  Bathtub as BathIcon,
  SquareFoot as AreaIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { Property } from "../../types/property";
import { ROUTES } from "../../utils/constants";
import { propertyService } from "../../services/propertyService";
import { authService } from "../../services/authService";
import {
  formatPrice,
  getPropertyTypeLabel,
  getPropertyStatusLabel,
  getLocationLabel,
  getPropertyStatusColor,
  truncateText,
} from "../../utils/helpers";

interface PropertyCardProps {
  property: Property;
  onFavoriteToggle?: (propertyId: string) => void;
  onDelete?: (propertyId: string) => void;
  showActions?: boolean;
  showOwnerActions?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onFavoriteToggle,
  onDelete,
  showActions = true,
  showOwnerActions = false,
}) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentUser = authService.getStoredUser();
  const isOwner = currentUser?.id === property.userId;
  const isAdmin = authService.isAdmin();
  const canModify = isOwner || isAdmin;

  const handleCardClick = () => {
    navigate(ROUTES.PROPERTY_DETAIL.replace(":id", property.id));
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(property.id);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(ROUTES.EDIT_PROPERTY.replace(":id", property.id));
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(ROUTES.PROPERTY_DETAIL.replace(":id", property.id));
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await propertyService.delete(property.id);
      toast.success("Property deleted successfully!");
      onDelete?.(property.id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const imageUrl = property.imageUrls?.[0] || "/placeholder-property.jpg";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={property.title}
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            display: "flex",
            gap: 1,
          }}
        >
          <Chip
            label={getPropertyStatusLabel(property.propertyStatus)}
            size="small"
            sx={{
              backgroundColor: getPropertyStatusColor(property.propertyStatus),
              color: "white",
              fontWeight: 600,
            }}
          />
          <Chip
            label={getPropertyTypeLabel(property.propertyType)}
            size="small"
            variant="outlined"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
          }}
        >
          {showActions && (
            <IconButton
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
              onClick={handleFavoriteClick}
            >
              {property.isFavoritedByCurrentUser ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          )}

          {canModify && showOwnerActions && (
            <>
              <IconButton
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                }}
                onClick={handleEditClick}
              >
                <EditIcon color="primary" />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            mb: 1,
            fontWeight: 600,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {truncateText(property.title, 50)}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationIcon
            sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
          />
          <Typography variant="body2" color="text.secondary">
            {getLocationLabel(property.city)}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          color="primary"
          sx={{ fontWeight: 700, mb: 2 }}
        >
          {formatPrice(property.price)}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BedIcon sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {property.bedrooms}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BathIcon sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {property.bathrooms}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AreaIcon sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {property.area} m²
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {truncateText(property.description, 100)}
        </Typography>
      </CardContent>

      {showActions && (
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button variant="contained" fullWidth onClick={handleContactClick}>
            View Details
          </Button>
        </CardActions>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Property</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{property.title}"? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
