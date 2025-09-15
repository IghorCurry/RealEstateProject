import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  IconButton,
  Button,
  Fade,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocationOn as LocationIcon,
  Bed as BedIcon,
  Bathtub as BathIcon,
  SquareFoot as AreaIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useFavorites } from "../../hooks/useFavorites";
import {
  formatPrice,
  getPropertyTypeLabel,
  getPropertyStatusLabel,
  getLocationLabel,
  getPropertyStatusColor,
} from "../../utils/helpers";
import { formatImageUrl } from "../../utils/imageHelpers";
import type { Property } from "../../types/property";

interface PropertyCardProps {
  property: Property;
  onFavoriteToggle?: () => void;
  onDelete?: () => void;
  showOwnerActions?: boolean;
  isFavorited?: boolean;
}

export const PropertyCard = React.memo<PropertyCardProps>(
  ({
    property,
    onFavoriteToggle,
    onDelete,
    showOwnerActions = false,
    isFavorited = false,
  }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const { user: currentUser, isAuthenticated } = useAuth();
    const [isHovered, setIsHovered] = useState(false);

    const {
      toggleFavorite,
      isFavorite,
      isAddingToFavorites,
      isRemovingFromFavorites,
    } = useFavorites();
    const isFavoriteLoading = isAddingToFavorites || isRemovingFromFavorites;
    const favoriteState = isFavorite(property.id) || isFavorited;

    // Мемоізована функція для отримання першого валідного зображення (з урахуванням порядку)
    const firstValidImageUrl = useMemo(() => {
      if (property.images && property.images.length > 0) {
        // Сортуємо зображення за порядком (order) і шукаємо перше валідне
        const sortedImages = [...property.images].sort(
          (a, b) => a.order - b.order
        );
        const validImage = sortedImages.find(
          (img) =>
            img.imageUrl && img.imageUrl !== "null" && img.imageUrl !== ""
        );

        if (validImage) {
          return formatImageUrl(validImage.imageUrl);
        }
      }

      return "/placeholder-house.svg";
    }, [property.images]);

    // Перевірка власника через userId
    const isOwner = currentUser?.id === property.userId;
    const canEdit = isOwner || currentUser?.role === "Admin";
    const canAddToFavorites = isAuthenticated && !isOwner; // Користувач не може додавати свої проперті в улюблені

    const handleCardClick = () => {
      navigate(`/properties/${property.id}`);
    };

    const handleEditClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      navigate(`/properties/${property.id}/edit`);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onDelete) {
        onDelete();
      }
    };

    const handleFavoriteClick = async (e: React.MouseEvent) => {
      e.stopPropagation();

      if (!isAuthenticated) {
        // Використовуємо toast з useFavorites хука
        return;
      }

      if (isOwner) {
        // Використовуємо toast з useFavorites хука
        return;
      }

      if (isFavoriteLoading) return;

      try {
        await toggleFavorite(property.id);

        // Call parent callback if provided
        if (onFavoriteToggle) {
          onFavoriteToggle();
        }
      } catch (error) {
        console.error("Favorite operation failed:", error);
      }
    };

    return (
      <Fade in={true} timeout={300}>
        <Card
          sx={{
            height: "100%", // Використовуємо всю доступну висоту
            minHeight: isMobile ? 380 : 420, // Адаптивна мінімальна висота
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            borderRadius: 3,
            overflow: "visible",
            boxShadow: isHovered ? theme.shadows[6] : theme.shadows[2],
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            "&:hover": {
              boxShadow: theme.shadows[8],
            },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleCardClick}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height={isMobile ? 180 : 200}
              image={firstValidImageUrl}
              alt={property.title}
              sx={{
                objectFit: "cover",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isHovered ? "scale(1.02)" : "scale(1)",
                backgroundColor: "grey.100", // Placeholder background
                width: "100%",
                minHeight: isMobile ? 180 : 200,
                maxHeight: isMobile ? 180 : 200,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-house.svg";
                target.style.backgroundColor = "transparent";
              }}
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.backgroundColor = "transparent";
              }}
            />

            {/* Status Chip */}
            <Box
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                zIndex: 1,
              }}
            >
              <Chip
                label={getPropertyStatusLabel(property.status)}
                size="small"
                sx={{
                  backgroundColor: getPropertyStatusColor(property.status),
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  boxShadow: theme.shadows[2],
                }}
              />
            </Box>

            {/* Favorite Indicator */}
            {favoriteState && (
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              >
                <Chip
                  label="❤️ In Favorites"
                  size="small"
                  sx={{
                    backgroundColor: "error.main",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    boxShadow: theme.shadows[2],
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": {
                        boxShadow: "0 0 0 0 rgba(244, 67, 54, 0.7)",
                      },
                      "70%": {
                        boxShadow: "0 0 0 10px rgba(244, 67, 54, 0)",
                      },
                      "100%": {
                        boxShadow: "0 0 0 0 rgba(244, 67, 54, 0)",
                      },
                    },
                  }}
                />
              </Box>
            )}

            {/* Favorite Button - показуємо тільки якщо користувач може додавати в улюблені */}
            {canAddToFavorites && (
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  zIndex: 1,
                }}
              >
                <IconButton
                  onClick={handleFavoriteClick}
                  disabled={isFavoriteLoading}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    opacity: isFavoriteLoading ? 0.7 : 1,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 1)",
                      transform: isFavoriteLoading ? "none" : "scale(1.1)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                    "&:disabled": {
                      bgcolor: "rgba(255, 255, 255, 0.7)",
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  }}
                >
                  {isFavoriteLoading ? (
                    <CircularProgress size={20} color="primary" />
                  ) : favoriteState ? (
                    <FavoriteIcon
                      sx={{
                        color: "error.main",
                        animation: favoriteState
                          ? "heartBeat 0.5s ease-in-out"
                          : "none",
                        "@keyframes heartBeat": {
                          "0%": { transform: "scale(1)" },
                          "50%": { transform: "scale(1.2)" },
                          "100%": { transform: "scale(1)" },
                        },
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "text.primary" }} />
                  )}
                </IconButton>
              </Box>
            )}

            {/* Owner Actions */}
            {showOwnerActions && canEdit && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                  zIndex: 1,
                  display: "flex",
                  gap: 1,
                }}
              >
                <IconButton
                  onClick={handleEditClick}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "white",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={handleDeleteClick}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      bgcolor: "error.main",
                      color: "white",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>

          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              p: { xs: 2, md: 2.5 },
              borderBottomLeftRadius: 24, // Заокруглення знизу зліва
              borderBottomRightRadius: 24, // Заокруглення знизу справа
            }}
          >
            {/* Property Type */}
            <Chip
              label={getPropertyTypeLabel(property.propertyType)}
              size="small"
              variant="outlined"
              sx={{
                alignSelf: "flex-start",
                mb: { xs: 1, md: 1.5 },
                fontWeight: 500,
                fontSize: "0.75rem",
              }}
            />

            {/* Title */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                mb: { xs: 0.8, md: 1 },
                lineHeight: 1.3,
                fontSize: isMobile ? "1rem" : "1.1rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                wordBreak: "break-word",
                hyphens: "auto",
              }}
            >
              {property.title}
            </Typography>

            {/* Location */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: { xs: 1, md: 1.5 },
              }}
            >
              <LocationIcon
                sx={{
                  fontSize: 16,
                  color: "text.secondary",
                  mr: 0.5,
                }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                {getLocationLabel(property.location)}
              </Typography>
            </Box>

            {/* Property Details */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1.5, md: 2 },
                mb: { xs: 1.5, md: 2 },
                flexWrap: "wrap",
              }}
            >
              {property.bedrooms > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <BedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {property.bedrooms}
                  </Typography>
                </Box>
              )}
              {property.bathrooms > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <BathIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {property.bathrooms}
                  </Typography>
                </Box>
              )}
              {property.squareMeters > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <AreaIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {property.squareMeters}m²
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Price and Action */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "auto",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: isMobile ? "1.1rem" : "1.25rem",
                }}
              >
                {formatPrice(property.price)}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                startIcon={<ViewIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  px: { xs: 1.5, md: 2 },
                  py: { xs: 0.8, md: 1 },
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: theme.shadows[3],
                  },
                }}
              >
                View
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    );
  }
);
