import React from "react";
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  Box,
  useTheme,
  Fade,
} from "@mui/material";
import {
  Search as SearchIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../components/common/SectionHeader";
import { ROUTES } from "../utils/constants";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const features = [
  {
    icon: <SearchIcon sx={{ fontSize: 40 }} />,
    titleKey: "home.features.search.title",
    descriptionKey: "home.features.search.desc",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    titleKey: "home.features.security.title",
    descriptionKey: "home.features.security.desc",
  },
  {
    icon: <SupportIcon sx={{ fontSize: 40 }} />,
    titleKey: "home.features.support.title",
    descriptionKey: "home.features.support.desc",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    titleKey: "home.features.insights.title",
    descriptionKey: "home.features.insights.desc",
  },
];

const stats = [
  { labelKey: "home.stats.properties", value: "500+", color: "primary" },
  { labelKey: "home.stats.clients", value: "1000+", color: "secondary" },
  { labelKey: "home.stats.cities", value: "25+", color: "success" },
  { labelKey: "home.stats.experience", value: "10+", color: "info" },
];

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('/placeholder-house.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              py: { xs: 8, md: 12 },
              textAlign: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 700,
                mb: 3,
                lineHeight: 1.2,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {t("home.hero.title")}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              {t("home.hero.subtitle")}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                onClick={() => navigate(ROUTES.PROPERTIES)}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor: "grey.100",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {t("home.hero.browse")}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => {
                  if (isAuthenticated) {
                    navigate(ROUTES.CREATE_PROPERTY);
                  } else {
                    navigate(ROUTES.LOGIN);
                  }
                }}
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {isAuthenticated ? t("home.hero.list") : t("home.hero.login")}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Fade in={true} timeout={600 + index * 200}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    boxShadow: theme.shadows[2],
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: `${stat.color}.main`,
                      mb: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    {t(stat.labelKey)}
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: "grey.50" }}>
        <Container maxWidth="lg">
          <SectionHeader
            title={t("home.features.title")}
            subtitle={t("home.features.subtitle")}
            variant="page"
          />

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Fade in={true} timeout={600 + index * 200}>
                  <Card
                    sx={{
                      height: "100%",
                      textAlign: "center",
                      p: 3,
                      borderRadius: 3,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2,
                        color: "primary.main",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: "text.primary",
                      }}
                    >
                      {t(feature.titleKey)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {t(feature.descriptionKey)}
                    </Typography>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Fade in={true} timeout={800}>
            <Card
              sx={{
                textAlign: "center",
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                color: "white",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "url('/placeholder-house.svg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.1,
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: "1.75rem", md: "2.5rem" },
                  }}
                >
                  {t("home.cta.title")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  {t("home.cta.subtitle")}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                  onClick={() => navigate(ROUTES.PROPERTIES)}
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      bgcolor: "grey.100",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {t("home.cta.button")}
                </Button>
              </Box>
            </Card>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};
