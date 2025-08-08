import React from "react";
import { Box, Typography, Button, Grid, Card, Paper } from "@mui/material";
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { HeroSection, FeatureCard, SectionHeader } from "../components";

export const HomePage: React.FC = () => {
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

  const heroActions = (
    <>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={() => navigate(ROUTES.PROPERTIES)}
        sx={{ minWidth: 200 }}
      >
        Browse Properties
      </Button>
      <Button
        variant="outlined"
        size="large"
        sx={{ minWidth: 200, color: "white", borderColor: "white" }}
        onClick={() => navigate(ROUTES.REGISTER)}
      >
        Get Started
      </Button>
    </>
  );

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection
        title="Find Your Dream Home"
        subtitle="Discover the perfect property in Ukraine's most desirable locations. From cozy apartments to luxury villas, we have something for everyone."
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
        actions={heroActions}
      />

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <SectionHeader
          title="Why Choose Us"
          subtitle="We provide the best real estate experience with our comprehensive platform"
          align="center"
        />
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, backgroundColor: "grey.50" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, height: "100%" }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 600, mb: 3 }}
              >
                Trusted by Thousands
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Join thousands of satisfied customers who have found their
                perfect home through our platform. Our commitment to quality and
                customer satisfaction sets us apart.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate(ROUTES.PROPERTIES)}
              >
                Start Your Search
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                height: "100%",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 600, mb: 3 }}
              >
                Ready to Get Started?
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Create your account today and start exploring our extensive
                collection of properties. Get personalized recommendations and
                save your favorites.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  "&:hover": { backgroundColor: "grey.100" },
                }}
                onClick={() => navigate(ROUTES.REGISTER)}
              >
                Create Account
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
