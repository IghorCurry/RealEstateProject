import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocationOn as LocationIcon,
  Bed as BedIcon,
  Bathtub as BathIcon,
  SquareFoot as AreaIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Share as ShareIcon,
  NavigateNext as NavigateNextIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { propertyService } from "../services/propertyService";
import { inquiryService } from "../services/inquiryService";
import { favoriteService } from "../services/favoriteService";
import { authService } from "../services/authService";
import { PropertyCard } from "../components/property/PropertyCard";
import type { InquiryCreate } from "../types/inquiry";
import { ROUTES } from "../utils/constants";
import {
  formatPrice,
  getPropertyTypeLabel,
  getPropertyStatusLabel,
  getLocationLabel,
  getPropertyStatusColor,
  formatDate,
} from "../utils/helpers";

export const PropertyDetailPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isAdmin = authService.isAdmin();
  const currentUser = authService.getStoredUser();

  // State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Fetch property details
  const {
    data: property,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: () => propertyService.getById(id!),
    enabled: !!id,
  });

  // Fetch related properties
  const { data: relatedProperties = [] } = useQuery({
    queryKey: ["related-properties", property?.city, property?.propertyType],
    queryFn: () =>
      propertyService.search({
        city: property?.city,
        propertyType: property?.propertyType,
      }),
    enabled: !!property,
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

  // Inquiry mutation
  const inquiryMutation = useMutation({
    mutationFn: (inquiryData: InquiryCreate) =>
      inquiryService.createInquiry(inquiryData),
    onSuccess: () => {
      setInquiryDialogOpen(false);
      setInquiryForm({ name: "", email: "", phone: "", message: "" });
      toast.success("Inquiry sent successfully!");
    },
    onError: () => {
      toast.error("Failed to send inquiry");
    },
  });

  // Check if user can modify this property
  const isOwner = currentUser?.id === property?.userId;
  const canModify = isOwner || isAdmin;

  // Handlers
  const handleFavoriteToggle = () => {
    if (property) {
      favoriteMutation.mutate(property.id);
    }
  };

  const handleEditClick = () => {
    if (property) {
      navigate(ROUTES.EDIT_PROPERTY.replace(":id", property.id));
    }
  };

  const handleDeleteClick = () => {
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

  const handleImageChange = (direction: "next" | "prev") => {
    if (!property?.imageUrls) return;

    if (direction === "next") {
      setCurrentImageIndex((prev) =>
        prev === property.imageUrls.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.imageUrls.length - 1 : prev - 1
      );
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    const inquiryData: InquiryCreate = {
      propertyId: property.id,
      name: inquiryForm.name,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      message: inquiryForm.message,
    };

    inquiryMutation.mutate(inquiryData);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        text: property?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
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
          Failed to load property details. Please try again.
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

  const currentImage =
    property.imageUrls?.[currentImageIndex] || "/placeholder-property.jpg";
  const filteredRelatedProperties = relatedProperties
    .filter((p) => p.id !== property.id)
    .slice(0, 4);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link
            color="inherit"
            href={ROUTES.HOME}
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.HOME);
            }}
          >
            Home
          </Link>
          <Link
            color="inherit"
            href={ROUTES.PROPERTIES}
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES.PROPERTIES);
            }}
          >
            Properties
          </Link>
          <Typography color="text.primary">{property.title}</Typography>
        </Breadcrumbs>

        {/* Property Header */}
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
              <IconButton onClick={handleShare} color="primary">
                <ShareIcon />
              </IconButton>
              <IconButton onClick={handleFavoriteToggle} color="primary">
                {property.isFavoritedByCurrentUser ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              {canModify && (
                <>
                  <IconButton onClick={handleEditClick} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDeleteClick} color="error">
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>

          {/* Status and Type Chips */}
          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            <Chip
              label={getPropertyStatusLabel(property.propertyStatus)}
              sx={{
                backgroundColor: getPropertyStatusColor(
                  property.propertyStatus
                ),
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
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            {formatPrice(property.price)}
          </Typography>
        </Box>

        {/* Image Gallery */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}
          >
            <Box
              component="img"
              src={currentImage}
              alt={property.title}
              sx={{
                width: "100%",
                height: isMobile ? 300 : 500,
                objectFit: "cover",
              }}
            />

            {/* Image Navigation */}
            {property.imageUrls && property.imageUrls.length > 1 && (
              <>
                <IconButton
                  sx={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                  }}
                  onClick={() => handleImageChange("prev")}
                >
                  <ArrowBackIcon />
                </IconButton>
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                  }}
                  onClick={() => handleImageChange("next")}
                >
                  <ArrowForwardIcon />
                </IconButton>

                {/* Image Counter */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    fontSize: "0.875rem",
                  }}
                >
                  {currentImageIndex + 1} / {property.imageUrls.length}
                </Box>
              </>
            )}
          </Box>

          {/* Thumbnail Gallery */}
          {property.imageUrls && property.imageUrls.length > 1 && (
            <Box sx={{ display: "flex", gap: 1, mt: 2, overflowX: "auto" }}>
              {property.imageUrls.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  sx={{
                    width: 80,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                    border: index === currentImageIndex ? 2 : 1,
                    borderColor:
                      index === currentImageIndex ? "primary.main" : "divider",
                  }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </Box>
          )}
        </Box>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            {/* Property Details */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Property Details
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <BedIcon
                        sx={{ fontSize: 32, color: "primary.main", mb: 1 }}
                      />
                      <Typography variant="h6">{property.bedrooms}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Bedrooms
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <BathIcon
                        sx={{ fontSize: 32, color: "primary.main", mb: 1 }}
                      />
                      <Typography variant="h6">{property.bathrooms}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Bathrooms
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box sx={{ textAlign: "center" }}>
                      <AreaIcon
                        sx={{ fontSize: 32, color: "primary.main", mb: 1 }}
                      />
                      <Typography variant="h6">{property.area} m²</Typography>
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
                      <Typography variant="h6">{property.yearBuilt}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Year Built
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
                      {getLocationLabel(property.city)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {property.address}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            {/* Contact Agent */}
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Contact Agent
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PersonIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Typography variant="body1">{property.userName}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PhoneIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Typography variant="body1">+380 99 123 4567</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <EmailIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Typography variant="body1">agent@realestate.com</Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => setInquiryDialogOpen(true)}
                  sx={{ mb: 2 }}
                >
                  Send Inquiry
                </Button>

                <Button variant="outlined" fullWidth size="large">
                  Schedule Viewing
                </Button>
              </CardContent>
            </Card>

            {/* Property Info */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Property Information
                </Typography>

                {isAdmin && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Property ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {property.id}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Listed Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(property.createdAt)}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(property.updatedAt)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Related Properties */}
        {filteredRelatedProperties.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
              Similar Properties
            </Typography>
            <Grid container spacing={3}>
              {filteredRelatedProperties.map((relatedProperty) => (
                <Grid item xs={12} sm={6} md={3} key={relatedProperty.id}>
                  <PropertyCard
                    property={relatedProperty}
                    onFavoriteToggle={() => {}}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      {/* Inquiry Dialog */}
      <Dialog
        open={inquiryDialogOpen}
        onClose={() => setInquiryDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Send Inquiry
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
        <form onSubmit={handleInquirySubmit}>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Interested in this property? Send us a message and we'll get back
              to you soon.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={inquiryForm.name}
                  onChange={(e) =>
                    setInquiryForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={inquiryForm.email}
                  onChange={(e) =>
                    setInquiryForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={inquiryForm.phone}
                  onChange={(e) =>
                    setInquiryForm((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  value={inquiryForm.message}
                  onChange={(e) =>
                    setInquiryForm((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setInquiryDialogOpen(false)}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={inquiryMutation.isPending}
            >
              {inquiryMutation.isPending ? "Sending..." : "Send Inquiry"}
            </Button>
          </DialogActions>
        </form>
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
