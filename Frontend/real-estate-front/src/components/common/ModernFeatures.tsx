import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "PREMIUM PROPERTIES",
    subtitle: "Luxury Real Estate",
    description:
      "Discover exclusive properties with stunning architecture, premium locations, and world-class amenities for the discerning buyer.",
  },
  {
    number: "02",
    title: "EXPERT CONSULTATION",
    subtitle: "Professional Guidance",
    description:
      "Get personalized advice from our experienced real estate professionals to find the perfect property that matches your lifestyle and investment goals.",
  },
  {
    number: "03",
    title: "SEAMLESS TRANSACTION",
    subtitle: "Complete Service",
    description:
      "From property search to closing, we handle every detail of your real estate transaction with transparency, efficiency, and peace of mind.",
  },
];

export const ModernFeatures: React.FC = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)",
        color: "text.primary",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(26, 54, 93, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 21, 56, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(26, 54, 93, 0.02) 0%, transparent 50%),
            linear-gradient(45deg, rgba(26, 54, 93, 0.01) 0%, transparent 50%, rgba(139, 21, 56, 0.01) 100%)
          `,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    p: { xs: 3, md: 4 },
                    borderLeft:
                      index > 0 ? "1px solid rgba(0, 0, 0, 0.08)" : "none",
                    pl: index > 0 ? 4 : 0,
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)",
                    },
                  }}
                >
                  {/* Number */}
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "4rem", md: "6rem" },
                      fontWeight: 300,
                      color: "rgba(26, 54, 93, 0.1)",
                      lineHeight: 0.8,
                      mb: 2,
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {feature.number}
                  </Typography>

                  {/* Title */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      mb: 1,
                      fontSize: { xs: "1.5rem", md: "2rem" },
                      fontFamily: '"Inter", sans-serif',
                      letterSpacing: "0.05em",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 2,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    {feature.subtitle}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.6,
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      maxWidth: 300,
                    }}
                  >
                    {feature.description}
                  </Typography>

                  {/* Hover Effect Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: 2,
                      background:
                        "linear-gradient(90deg, #1A365D 0%, #8B1538 100%)",
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Box
            sx={{
              textAlign: "center",
              mt: 8,
              p: 4,
              border: "1px solid rgba(0, 0, 0, 0.08)",
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(26, 54, 93, 0.05) 0%, rgba(139, 21, 56, 0.02) 100%)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
                background:
                  "linear-gradient(135deg, rgba(26, 54, 93, 0.08) 0%, rgba(139, 21, 56, 0.04) 100%)",
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "primary.main",
                mb: 2,
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Ready to Start Your Real Estate Journey?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Browse our exclusive collection of premium properties and let our
              experts guide you to your perfect investment or dream home.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
