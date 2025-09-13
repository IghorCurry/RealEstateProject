import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { propertyService } from "../services/propertyService";
import { favoriteService } from "../services/favoriteService";
import { useAuth } from "../contexts/AuthContext";
import { InquiryForm } from "../components/inquiry/InquiryForm";
import { filterValidImages } from "../utils/imageHelpers";
import {
  PropertyBreadcrumbs,
  PropertyHeader,
  PropertyImageGallery,
  PropertyDetailsCard,
  PropertyContactCard,
  PropertyInfoCard,
  RelatedPropertiesSection,
} from "../components/property";
import type { PropertyDetailed } from "../types/property";
import { ROUTES } from "../utils/constants";

export const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user: currentUser, isAuthenticated, isAdmin } = useAuth();

  // State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Скидаємо індекс зображення при зміні property
  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [id]);

  // Fetch property details
  const {
    data: property,
    isLoading,
    error,
  } = useQuery<PropertyDetailed>({
    queryKey: ["property", id],
    queryFn: async () => {
      const propertyData = await propertyService.getById(id!);
      return propertyData;
    },
    enabled: !!id,
  });

  // Fetch related properties - оптимізовано
  const { data: relatedProperties = [] } = useQuery({
    queryKey: ["related-properties", id],
    queryFn: () => propertyService.getAll(),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 хвилин
    gcTime: 10 * 60 * 1000, // 10 хвилин
  });

  // Favorite mutation
  const favoriteMutation = useMutation({
    mutationFn: (propertyId: string) =>
      favoriteService.toggleFavorite(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["property", id] });
      toast.success("Favorite updated successfully");
    },
    onError: () => {
      toast.error("Failed to update favorite");
    },
  });

  // Handlers
  const showAuthRequiredMessage = () => {
    toast.error("Please sign in to perform this action.");
  };

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      showAuthRequiredMessage();
      return;
    }
    if (property) {
      favoriteMutation.mutate(property.id);
    }
  };

  const handleEditClick = () => {
    if (!isAuthenticated) {
      showAuthRequiredMessage();
      return;
    }
    if (property) {
      navigate(ROUTES.EDIT_PROPERTY.replace(":id", property.id));
    }
  };

  const handleDeleteClick = () => {
    if (!isAuthenticated) {
      showAuthRequiredMessage();
      return;
    }
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!property) return;

    setIsDeleting(true);
    try {
      await propertyService.delete(property.id);
      toast.success("Property deleted successfully!");
      navigate(ROUTES.PROPERTIES);
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title || "",
        text: property?.description || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleImageChange = (direction: "next" | "prev") => {
    if (validImages.length <= 1) return;

    if (direction === "next") {
      setCurrentImageIndex((prev) =>
        prev === validImages.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? validImages.length - 1 : prev - 1
      );
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (index >= 0 && index < validImages.length) {
      setCurrentImageIndex(index);
    }
  };

  const handleSendInquiry = () => {
    setInquiryDialogOpen(true);
  };

  const handleScheduleViewing = () => {
    toast.success("Schedule viewing feature coming soon!");
  };

  const handleRelatedPropertyFavorite = (propertyId: string) => {
    if (!isAuthenticated) {
      showAuthRequiredMessage();
      return;
    }
    favoriteMutation.mutate(propertyId);
  };

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error instanceof Error
            ? `Failed to load property details: ${error.message}`
            : "Failed to load property details. Please try again."}
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate(ROUTES.PROPERTIES)}
          startIcon={<ArrowBackIcon />}
        >
          Back to Properties
        </Button>
      </Container>
    );
  }

  // Check permissions
  const isOwner = currentUser?.id === property?.userId;
  const canModify = (isOwner || isAdmin) && !!property;

  // Фільтруємо тільки валідні зображення використовуючи уніфіковану функцію
  const validImages = filterValidImages(property.images || []);

  // Визначаємо поточне зображення - використовуємо currentImageIndex для навігації
  const currentImage =
    validImages.length > 0
      ? validImages[currentImageIndex % validImages.length]?.imageUrl ||
        "/placeholder-house.svg"
      : "/placeholder-house.svg";

  const filteredRelatedProperties = relatedProperties
    .filter((p) => p.id !== property.id)
    .slice(0, 4);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4, overflow: "hidden" }}>
        {/* Breadcrumbs */}
        <PropertyBreadcrumbs propertyTitle={property.title} />

        {/* Property Header */}
        <PropertyHeader
          property={property}
          isAuthenticated={isAuthenticated}
          canModify={canModify}
          onShare={handleShare}
          onFavoriteToggle={handleFavoriteToggle}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />

        {/* Image Gallery */}
        <PropertyImageGallery
          images={validImages}
          currentImageIndex={currentImageIndex}
          currentImage={currentImage}
          propertyTitle={property.title}
          onImageChange={handleImageChange}
          onThumbnailClick={handleThumbnailClick}
        />

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <PropertyDetailsCard property={property} />
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <PropertyContactCard
              property={property}
              isAuthenticated={isAuthenticated}
              onSendInquiry={handleSendInquiry}
              onScheduleViewing={handleScheduleViewing}
              onAuthRequired={showAuthRequiredMessage}
            />

            <PropertyInfoCard property={property} isAdmin={isAdmin} />
          </Grid>
        </Grid>

        {/* Related Properties */}
        <RelatedPropertiesSection
          properties={filteredRelatedProperties}
          onFavoriteToggle={handleRelatedPropertyFavorite}
        />
      </Container>

      {/* Inquiry Dialog */}
      <Dialog
        open={inquiryDialogOpen}
        onClose={() => setInquiryDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Contact Property Owner
          <IconButton
            aria-label="close"
            onClick={() => setInquiryDialogOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <InquiryForm
            propertyId={id!}
            propertyTitle={property?.title || ""}
            onSuccess={() => setInquiryDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this property? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Property"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
