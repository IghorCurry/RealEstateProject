import React from "react";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
} from "@mui/material";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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

  const handleClick = (path: string) => {
    navigate(path);
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    ...(showHome ? [{ label: "Home", path: ROUTES.HOME }] : []),
    ...items,
  ];

  return (
    <Box sx={{ mb: { xs: 2, md: 3 }, py: { xs: 0.5, md: 1 } }}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          "& .MuiBreadcrumbs-separator": {
            mx: { xs: 0.5, md: 1 },
          },
        }}
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
