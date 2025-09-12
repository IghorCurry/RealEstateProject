import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  Grid,
  useTheme,
  Fade,
} from "@mui/material";
import {
  Home as HomeIcon,
  Flag as FlagIcon,
  Star as StarIcon,
  Code as CodeIcon,
} from "@mui/icons-material";
import { SectionHeader } from "../components/common/SectionHeader";
import { useLanguage } from "../contexts/LanguageContext";

const aboutSections = [
  {
    icon: <HomeIcon sx={{ fontSize: 40 }} />,
    titleKey: "about.what.title",
    descriptionKey: "about.what.desc",
    color: "primary",
  },
  {
    icon: <FlagIcon sx={{ fontSize: 40 }} />,
    titleKey: "about.purpose.title",
    descriptionKey: "about.purpose.desc",
    color: "secondary",
  },
  {
    icon: <StarIcon sx={{ fontSize: 40 }} />,
    titleKey: "about.benefits.title",
    descriptionKey: "about.benefits.desc",
    color: "success",
  },
  {
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    titleKey: "about.tech.title",
    descriptionKey: "about.tech.desc",
    color: "info",
  },
];

export const AboutPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <Box sx={{ minHeight: "100vh", py: 2 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <SectionHeader
            title={t("about.title")}
            subtitle={t("about.subtitle")}
            variant="page"
          />
        </Box>

        {/* About Sections */}
        <Grid container spacing={4}>
          {aboutSections.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Fade in={true} timeout={800 + index * 200}>
                <Card
                  sx={{
                    height: "100%",
                    p: 4,
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
                      alignItems: "center",
                      mb: 3,
                      color: `${section.color}.main`,
                    }}
                  >
                    {section.icon}
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: "text.primary",
                    }}
                  >
                    {t(section.titleKey)}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.7,
                      fontSize: "1rem",
                    }}
                  >
                    {t(section.descriptionKey)}
                  </Typography>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Mission Statement */}
        <Box sx={{ mt: 6 }}>
          <Fade in={true} timeout={1200}>
            <Card
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                color: "white",
                textAlign: "center",
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
                    mb: 3,
                    fontSize: { xs: "1.75rem", md: "2.5rem" },
                  }}
                >
                  {t("about.mission.title")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    lineHeight: 1.6,
                    maxWidth: 800,
                    mx: "auto",
                  }}
                >
                  {t("about.mission.description")}
                </Typography>
              </Box>
            </Card>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};
