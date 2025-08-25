import React from "react";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
} from "@mui/material";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHome = true,
}) => {
  const navigate = useNavigate();
  // const location = useLocation(); // Not used currently

  const handleClick = (path: string) => {
    navigate(path);
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    ...(showHome ? [{ label: "Home", path: ROUTES.HOME }] : []),
    ...items,
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isActive = item.isActive !== undefined ? item.isActive : isLast;

          if (isActive || !item.path) {
            return (
              <Typography
                key={index}
                color={isActive ? "text.primary" : "text.secondary"}
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.875rem",
                }}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={index}
              color="inherit"
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.path!);
              }}
              sx={{
                textDecoration: "none",
                fontSize: "0.875rem",
                "&:hover": {
                  textDecoration: "underline",
                  color: "primary.main",
                },
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

// Хук для створення breadcrumbs на основі поточного роуту
export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const location = useLocation();

  const getBreadcrumbsForPath = (pathname: string): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter(Boolean);

    switch (pathname) {
      case ROUTES.HOME:
        return [];

      case ROUTES.PROPERTIES:
        return [{ label: "Properties" }];

      case ROUTES.ABOUT:
        return [{ label: "About" }];

      case ROUTES.FAQ:
        return [{ label: "FAQ" }];

      case ROUTES.DEVELOPER:
        return [{ label: "Developer" }];

      case ROUTES.LOGIN:
        return [{ label: "Login" }];

      case ROUTES.REGISTER:
        return [{ label: "Register" }];

      case ROUTES.PROFILE:
        return [{ label: "Profile" }];

      case ROUTES.FAVORITES:
        return [{ label: "Favorites" }];

      case ROUTES.INQUIRIES:
        return [{ label: "Inquiries" }];

      case ROUTES.ADMIN:
        return [{ label: "Admin" }];

      case ROUTES.CREATE_PROPERTY:
        return [
          { label: "Properties", path: ROUTES.PROPERTIES },
          { label: "Create Property" },
        ];

      default:
        // Динамічні роути
        if (pathname.startsWith("/properties/") && pathSegments.length === 2) {
          const propertyId = pathSegments[1];
          if (pathname.endsWith("/edit")) {
            return [
              { label: "Properties", path: ROUTES.PROPERTIES },
              { label: "Property Details", path: `/properties/${propertyId}` },
              { label: "Edit Property" },
            ];
          } else {
            return [
              { label: "Properties", path: ROUTES.PROPERTIES },
              { label: "Property Details" },
            ];
          }
        }

        return [];
    }
  };

  return getBreadcrumbsForPath(location.pathname);
};
