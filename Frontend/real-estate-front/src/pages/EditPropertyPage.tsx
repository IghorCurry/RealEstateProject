import React, { useState, useEffect } from "react";
import { Box, Alert, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { EditPropertyForm } from "../components/property/EditPropertyForm";
import { authService } from "../services/authService";
import { propertyService } from "../services/propertyService";
import { ROUTES } from "../utils/constants";
import { toast } from "react-hot-toast";
import type { Property } from "../types/property";

export const EditPropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) {
        setError("Property ID is required");
        setLoading(false);
        return;
      }

      try {
        const propertyData = await propertyService.getById(id);
        setProperty(propertyData);

        // Check if user has permission to edit this property
        const currentUser = authService.getStoredUser();
        const isOwner = currentUser?.id === propertyData.userId;
        const isAdmin = authService.isAdmin();

        if (!isOwner && !isAdmin) {
          setError("You don't have permission to edit this property");
          toast.error("Access denied. You can only edit your own properties.");
        }
      } catch (error) {
        console.error("Error loading property:", error);
        setError("Failed to load property");
        toast.error("Failed to load property. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadProperty();
    } else {
      setLoading(false);
    }
  }, [id, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <Alert severity="warning">
          You must be logged in to edit a property.{" "}
          <a
            href={ROUTES.LOGIN}
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Click here to login
          </a>
        </Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <Alert severity="error">
          {error}
          <br />
          <a
            href={ROUTES.PROPERTIES}
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Back to Properties
          </a>
        </Alert>
      </Box>
    );
  }

  if (!property) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <Alert severity="error">
          Property not found.
          <br />
          <a
            href={ROUTES.PROPERTIES}
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Back to Properties
          </a>
        </Alert>
      </Box>
    );
  }

  return <EditPropertyForm property={property} />;
};
