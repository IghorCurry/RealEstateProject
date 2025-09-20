import React from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  ArrowBack as BackIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ROUTES } from "../utils/constants";

export const OopsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
          {t("oops.title")}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          {t("oops.subtitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("oops.description")}
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate(ROUTES.HOME)}
          >
            {t("oops.actions.home")}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={() => navigate(ROUTES.PROPERTIES)}
          >
            {t("oops.actions.browse")}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            startIcon={<BackIcon />}
            onClick={() => navigate(-1)}
          >
            {t("oops.actions.back")}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
