import React, { useState, useRef } from "react";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { ImageGrid } from "./ImageGrid";
import { validateImageFiles } from "../../utils/imageValidation";
import type { PropertyImage } from "../../types/property";

// Розширений тип для PropertyImage з файлом
type PropertyImageWithFile = PropertyImage & { file?: File };

interface ImageUploadProps {
  images: PropertyImageWithFile[];
  onImagesChange: (images: PropertyImageWithFile[]) => void;
  onImagesDelete?: (imageIds: string[]) => void;
  onImagesUpload?: (files: File[]) => Promise<void>; // Додано для миттєвого завантаження
  maxImages?: number;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  onImagesDelete,
  onImagesUpload,
  maxImages = 10,
  disabled = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const selectedFiles = Array.from(files);

    // Validate files with current image count
    const currentImageCount = images.length;
    const availableSlots = maxImages - currentImageCount;

    if (selectedFiles.length > availableSlots) {
      toast.error(
        `Too many files selected. You can add up to ${availableSlots} more images.`
      );
      return;
    }

    // Validate files
    const validation = validateImageFiles(selectedFiles, availableSlots);
    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(error));
      return;
    }

    setIsUploading(true);
    try {
      if (onImagesUpload) {
        // Миттєво завантажуємо зображення через API
        await onImagesUpload(selectedFiles);
      } else {
        // Fallback: створюємо preview URLs для тимчасового відображення
        const newImages: PropertyImageWithFile[] = await Promise.all(
          selectedFiles.map(async (file, index) => {
            const previewUrl = URL.createObjectURL(file);
            return {
              id: `temp-${Date.now()}-${Math.random()}`, // Temporary ID
              imageUrl: previewUrl,
              order: images.length + index, // Add order field
              file, // Store the file for later upload
            };
          })
        );

        onImagesChange([...images, ...newImages]);
        toast.success(`${selectedFiles.length} image(s) added successfully`);
      }
    } catch (error) {
      // Покращена обробка помилок
      if (error instanceof Error) {
        toast.error(`Failed to process images: ${error.message}`);
      } else {
        toast.error("Failed to process images");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = (imageId: string) => {
    const imageToDelete = images.find((img) => img.id === imageId);
    if (!imageToDelete) return;

    // If it's a temporary image (has file property), just remove from state
    if ("file" in imageToDelete) {
      const updatedImages = images.filter((img) => img.id !== imageId);
      onImagesChange(updatedImages);
      return;
    }

    // If it's an existing image, call the delete callback
    if (onImagesDelete) {
      onImagesDelete([imageId]);
    }

    // Also remove from local state immediately for better UX
    const updatedImages = images.filter((img) => img.id !== imageId);
    onImagesChange(updatedImages);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      // Create a synthetic event for file selection
      const syntheticEvent = {
        target: { files },
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(syntheticEvent);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Property Images
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        Upload up to {maxImages} images. Supported formats: JPG, PNG, GIF, WebP.
        Maximum size: 10MB per image.
      </Alert>

      <Box
        sx={{
          border: "2px dashed",
          borderColor: "grey.300",
          borderRadius: 2,
          p: 3,
          textAlign: "center",
          mb: 2,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          "&:hover": {
            borderColor: "primary.main",
            backgroundColor: "action.hover",
          },
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => {
          if (!disabled) {
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileSelect}
          disabled={disabled}
        />

        <CloudUploadIcon sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
        <Typography variant="body1" color="textSecondary">
          {isUploading
            ? "Uploading..."
            : "Click to upload or drag and drop images"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {images.length}/{maxImages} images uploaded
        </Typography>

        {isUploading && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>

      <ImageGrid
        images={images}
        onDeleteImage={handleDeleteImage}
        disabled={disabled}
      />
    </Box>
  );
};
