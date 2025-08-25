import React, { useState, useEffect } from "react";
import { Box, Alert, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { EditPropertyForm } from "../components/property/EditPropertyForm";
import { useAuth } from "../contexts/AuthContext"; // Замінюємо authService на useAuth
import { propertyService } from "../services/propertyService";
import { Breadcrumbs, useBreadcrumbs } from "../components/common/Breadcrumbs";
import { ROUTES } from "../utils/constants";
import { toast } from "react-hot-toast";
import type { Property } from "../types/property";

export const EditPropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const breadcrumbItems = useBreadcrumbs();

  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.role === "Admin";

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

        const isOwner = currentUser?.id === propertyData.userId;

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

    loadProperty();
  }, [id, currentUser, isAdmin]);

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
        <Breadcrumbs items={breadcrumbItems} />
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
        <Breadcrumbs items={breadcrumbItems} />
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

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Breadcrumbs items={breadcrumbItems} />
      <EditPropertyForm property={property} />
    </Box>
  );
};
