import React from "react";
import { Box, Container, Typography, Grid, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

const getFeatures = (t: (key: string) => string) => [
  {
    number: "01",
    title: t("home.features.premium.title"),
    subtitle: t("home.features.premium.subtitle"),
    description: t("home.features.premium.desc"),
  },
  {
    number: "02",
    title: t("home.features.expert.title"),
    subtitle: t("home.features.expert.subtitle"),
    description: t("home.features.expert.desc"),
  },
  {
    number: "03",
    title: t("home.features.seamless.title"),
    subtitle: t("home.features.seamless.subtitle"),
    description: t("home.features.seamless.desc"),
  },
];

export const ModernFeatures: React.FC = () => {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const isMobile = useMediaQuery("(max-width:900px)");
  const { t } = useLanguage();
  const features = getFeatures(t);

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
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isMobile
            ? "none"
            : `
            radial-gradient(circle at 20% 50%, rgba(26, 54, 93, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 21, 56, 0.03) 0%, transparent 50%)
          `,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.8, delay: index * 0.2 }
                }
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

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      mb: 1,
                      fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                      fontFamily: '"Inter", sans-serif',
                      letterSpacing: "0.05em",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      mb: 2,
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.25rem" },
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    {feature.subtitle}
                  </Typography>

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

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.8, delay: 0.6 }
          }
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
              // Легший фон без дорогого blur на мобільних
              ...(isMobile ? {} : { backdropFilter: "blur(4px)" }),
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
              {t("home.features.cta.title")}
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
              {t("home.features.cta.desc")}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
