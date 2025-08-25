import React from "react";
import {
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

interface PropertyBreadcrumbsProps {
  propertyTitle: string;
}

export const PropertyBreadcrumbs: React.FC<PropertyBreadcrumbsProps> = ({
  propertyTitle,
}) => {
  const navigate = useNavigate();

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ mb: 3 }}
    >
      <Link
        color="inherit"
        href={ROUTES.HOME}
        onClick={(e) => {
          e.preventDefault();
          navigate(ROUTES.HOME);
        }}
      >
        Home
      </Link>
      <Link
        color="inherit"
        href={ROUTES.PROPERTIES}
        onClick={(e) => {
          e.preventDefault();
          navigate(ROUTES.PROPERTIES);
        }}
      >
        Properties
      </Link>
      <Typography color="text.primary">{propertyTitle}</Typography>
    </Breadcrumbs>
  );
};
