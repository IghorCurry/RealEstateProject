import React from "react";
import { Box, Alert } from "@mui/material";
import { CreatePropertyForm } from "../components/property/CreatePropertyForm";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

export const CreatePropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <Alert severity="warning">
          You must be logged in to create a property.{" "}
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

  return <CreatePropertyForm />;
};
