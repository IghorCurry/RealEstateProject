import React from "react";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import type { PropertyImage } from "../../types/property";
import { formatImageUrl } from "../../utils/imageHelpers";

interface PropertyImageGalleryProps {
  images: PropertyImage[];
  currentImageIndex: number;
  currentImage: string;
  propertyTitle: string;
  onImageChange: (direction: "next" | "prev") => void;
  onThumbnailClick: (index: number) => void;
}

export const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  images,
  currentImageIndex,
  currentImage,
  propertyTitle,
  onImageChange,
  onThumbnailClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const hasMultipleImages = images && images.length > 1;

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ position: "relative", borderRadius: 2, overflow: "hidden" }}>
        <Box
          component="img"
          src={formatImageUrl(currentImage)}
          alt={propertyTitle}
          sx={{
            width: "100%",
            height: isMobile ? 300 : 500,
            objectFit: "cover",
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder-house.svg";
          }}
        />

        {/* Image Navigation */}
        {hasMultipleImages && (
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
              onClick={() => onImageChange("prev")}
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
              onClick={() => onImageChange("next")}
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
              {currentImageIndex + 1} / {images.length}
            </Box>
          </>
        )}
      </Box>

      {/* Thumbnail Gallery */}
      {hasMultipleImages && (
        <Box sx={{ display: "flex", gap: 1, mt: 2, overflowX: "auto" }}>
          {images.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={formatImageUrl(image.imageUrl)}
              alt={`${propertyTitle} ${index + 1}`}
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
              onClick={() => onThumbnailClick(index)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-house.svg";
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
