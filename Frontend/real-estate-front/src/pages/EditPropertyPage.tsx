import React, { useState, useEffect } from "react";
import { Box, Alert, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { EditPropertyForm } from "../components/property/EditPropertyForm";
import { useAuth } from "../contexts/AuthContext"; // Замінюємо authService на useAuth
import { propertyService } from "../services/propertyService";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { ROUTES } from "../utils/constants";
import { toast } from "react-hot-toast";
import { useLanguage } from "../contexts/LanguageContext";
import type { Property } from "../types/property";

export const EditPropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const breadcrumbItems = useBreadcrumbs();

  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.role === "Admin";

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) {
        setError(t("editProperty.errors.idRequired"));
        setLoading(false);
        return;
      }

      try {
        const propertyData = await propertyService.getById(id);
        setProperty(propertyData);

        const isOwner = currentUser?.id === propertyData.user?.id;

        if (!isOwner && !isAdmin) {
          setError(t("editProperty.errors.permission"));
          toast.error(t("editProperty.toasts.accessDenied"));
        }
      } catch (error) {
        console.error("Error loading property:", error);
        setError(t("editProperty.errors.loadFailed"));
        toast.error(t("editProperty.toasts.loadFailed"));
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id, currentUser, isAdmin, t]);

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
            {t("editProperty.back")}
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
          {t("editProperty.errors.notFound")}
          <br />
          <a
            href={ROUTES.PROPERTIES}
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            {t("editProperty.back")}
          </a>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3, overflow: "hidden" }}>
      <Breadcrumbs items={breadcrumbItems} />
      <EditPropertyForm property={property} />
    </Box>
  );
};
