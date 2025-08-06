import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: "Easy Search",
      description:
        "Find your perfect property with our advanced search filters",
    },
    {
      icon: <HomeIcon sx={{ fontSize: 40 }} />,
      title: "Quality Properties",
      description:
        "Browse through carefully curated listings of premium properties",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: "Secure Platform",
      description:
        "Your data and transactions are protected with industry-standard security",
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40 }} />,
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our round-the-clock support",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ width: "100%" }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Find Your Dream Home
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.5,
                }}
              >
                Discover the perfect property in Ukraine's most desirable
                locations. From cozy apartments to luxury villas, we have
                something for everyone.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={() => navigate(ROUTES.PROPERTIES)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  Browse Properties
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate(ROUTES.REGISTER)}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderColor: "white",
                    color: "white",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 4,
                  p: 4,
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                  Quick Search
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  Start your property search right here
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => navigate(ROUTES.PROPERTIES)}
                  sx={{
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  Search Properties
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 3,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Box sx={{ color: "primary.main", mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.grey[100],
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  500+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Properties Listed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  1000+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Happy Clients
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  50+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Cities Covered
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  24/7
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Customer Support
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
            color: "white",
            p: 6,
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{ mb: 3, fontWeight: 600 }}
          >
            Ready to Find Your Dream Home?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of satisfied customers who found their perfect
            property with us
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(ROUTES.PROPERTIES)}
            sx={{
              px: 6,
              py: 2,
              fontSize: "1.2rem",
              fontWeight: 600,
              backgroundColor: "white",
              color: theme.palette.secondary.main,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            Start Searching Now
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
