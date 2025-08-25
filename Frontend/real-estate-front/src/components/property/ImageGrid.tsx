import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  DragIndicator as DragIndicatorIcon,
} from "@mui/icons-material";
import type { PropertyImage } from "../../types/property";
import { formatImageUrl } from "../../utils/imageHelpers";

// Розширений тип для PropertyImage з файлом
type PropertyImageWithFile = PropertyImage & { file?: File };

interface ImageGridProps {
  images: PropertyImageWithFile[];
  onDeleteImage: (imageId: string) => void;
  disabled?: boolean;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onDeleteImage,
  disabled = false,
}) => {
  if (images.length === 0) return null;

  return (
    <Grid container spacing={2}>
      {images.map((image, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={formatImageUrl(image.imageUrl)}
              alt={`Property image ${index + 1}`}
              sx={{ objectFit: "cover" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-house.svg";
              }}
            />
            <CardActions sx={{ justifyContent: "space-between", p: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DragIndicatorIcon sx={{ color: "grey.400", mr: 1 }} />
                <Typography variant="caption" color="textSecondary">
                  {index + 1}
                </Typography>
              </Box>
              <IconButton
                size="small"
                color="error"
                onClick={() => {
                  onDeleteImage(image.id);
                }}
                disabled={disabled}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
