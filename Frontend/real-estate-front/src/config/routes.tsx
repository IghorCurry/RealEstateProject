import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { ProtectedRoute } from "../components/common";

import { HomePage } from "../pages/HomePage";
const LoginPage = React.lazy(() =>
  import("../pages/LoginPage").then((module) => ({ default: module.LoginPage }))
);
const RegisterPage = React.lazy(() =>
  import("../pages/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  }))
);
const PropertiesPage = React.lazy(() =>
  import("../pages/PropertiesPage").then((module) => ({
    default: module.PropertiesPage,
  }))
);
const PropertyDetailPage = React.lazy(() =>
  import("../pages/PropertyDetailPage").then((module) => ({
    default: module.PropertyDetailPage,
  }))
);
const CreatePropertyPage = React.lazy(() =>
  import("../pages/CreatePropertyPage").then((module) => ({
    default: module.CreatePropertyPage,
  }))
);
const EditPropertyPage = React.lazy(() =>
  import("../pages/EditPropertyPage").then((module) => ({
    default: module.EditPropertyPage,
  }))
);
const ProfilePage = React.lazy(() =>
  import("../pages/ProfilePage").then((module) => ({
    default: module.ProfilePage,
  }))
);
const FavoritesPage = React.lazy(() =>
  import("../pages/FavoritesPage").then((module) => ({
    default: module.FavoritesPage,
  }))
);
const InquiriesPage = React.lazy(() =>
  import("../pages/InquiriesPage").then((module) => ({
    default: module.InquiriesPage,
  }))
);
const AdminPage = React.lazy(() =>
  import("../pages/AdminPage").then((module) => ({ default: module.AdminPage }))
);
const AboutPage = React.lazy(() =>
  import("../pages/AboutPage").then((module) => ({ default: module.AboutPage }))
);
const FAQPage = React.lazy(() =>
  import("../pages/FAQPage").then((module) => ({ default: module.FAQPage }))
);
const DeveloperPage = React.lazy(() =>
  import("../pages/DeveloperPage").then((module) => ({
    default: module.DeveloperPage,
  }))
);
const NotFoundPage = React.lazy(() =>
  import("../pages/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  }))
);

// Loading component для Suspense
const PageLoader: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

/**
 * Application routes configuration with code splitting
 * Centralized routing setup with protected routes and lazy loading
 */
export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/developer" element={<DeveloperPage />} />

        {/* Protected routes - require authentication */}
        <Route
          path="/properties/create"
          element={
            <ProtectedRoute>
              <CreatePropertyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties/:id/edit"
          element={
            <ProtectedRoute>
              <EditPropertyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inquiries"
          element={
            <ProtectedRoute>
              <InquiriesPage />
            </ProtectedRoute>
          }
        />

        {/* Admin routes - require admin role */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* 404 catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
