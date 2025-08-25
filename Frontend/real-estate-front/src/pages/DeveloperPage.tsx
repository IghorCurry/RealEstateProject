import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  Grid,
  Avatar,
  Chip,
  Button,
  useTheme,
  Fade,
} from "@mui/material";
import {
  LinkedIn as LinkedInIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  Build as BuildIcon,
  Psychology as PsychologyIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { SectionHeader } from "../components/common/SectionHeader";
import { useLanguage } from "../contexts/LanguageContext";

const skillCategories = [
  {
    titleKey: "developer.frontend.title",
    icon: <CodeIcon />,
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Material-UI",
      "Redux",
      "React Query",
      "Vite",
      "ESLint",
      "Prettier",
    ],
    color: "primary",
  },
  {
    titleKey: "developer.backend.title",
    icon: <StorageIcon />,
    skills: [
      "C#",
      ".NET Core",
      "ASP.NET Core",
      "Entity Framework",
      "LINQ",
      "REST API",
      "JWT Authentication",
      "Dependency Injection",
    ],
    color: "secondary",
  },
  {
    titleKey: "developer.database.title",
    icon: <StorageIcon />,
    skills: [
      "PostgreSQL",
      "Entity Framework Core",
      "Database Design",
      "Migrations",
      "Seeding",
      "Relationships",
    ],
    color: "success",
  },
  {
    titleKey: "developer.tools.title",
    icon: <BuildIcon />,
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "Visual Studio",
      "VS Code",
      "Azure",
      "CI/CD",
    ],
    color: "info",
  },
  {
    titleKey: "developer.soft.title",
    icon: <PsychologyIcon />,
    skills: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Time Management",
      "Adaptability",
      "Continuous Learning",
    ],
    color: "warning",
  },
];

export const DeveloperPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/igor-yushkov-77b73b262/",
      "_blank"
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <SectionHeader
            title={t("developer.title")}
            subtitle={t("developer.subtitle")}
            variant="page"
          />
        </Box>

        {/* Developer Info */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={800}>
              <Card
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <Avatar
                  src="/developer-photo.jpg"
                  alt={t("developer.name")}
                  sx={{
                    width: 200,
                    height: 200,
                    mx: "auto",
                    mb: 3,
                    border: `4px solid ${theme.palette.primary.main}`,
                    fontSize: "4rem",
                  }}
                >
                  <PersonIcon sx={{ fontSize: "inherit" }} />
                </Avatar>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "text.primary",
                  }}
                >
                  {t("developer.name")}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.7,
                    mb: 3,
                    fontSize: "1.1rem",
                  }}
                >
                  {t("developer.description")}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<LinkedInIcon />}
                  onClick={handleLinkedInClick}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {t("developer.linkedin")}
                </Button>
              </Card>
            </Fade>
          </Grid>

          <Grid item xs={12} md={8}>
            <Fade in={true} timeout={1000}>
              <Card
                sx={{
                  p: 4,
                  borderRadius: 3,
                  height: "100%",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: "text.primary",
                  }}
                >
                  {t("developer.skills.title")}
                </Typography>

                <Grid container spacing={3}>
                  {skillCategories.map((category, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          color: `${category.color}.main`,
                        }}
                      >
                        {category.icon}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            ml: 1,
                            color: "text.primary",
                          }}
                        >
                          {t(category.titleKey)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        {category.skills.map((skill, skillIndex) => (
                          <Chip
                            key={skillIndex}
                            label={skill}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderRadius: 1,
                              fontWeight: 500,
                              borderColor: `${category.color}.main`,
                              color: `${category.color}.main`,
                              "&:hover": {
                                bgcolor: `${category.color}.light`,
                                color: `${category.color}.dark`,
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Fade>
          </Grid>
        </Grid>

        {/* Project Highlights */}
        <Box sx={{ mt: 6 }}>
          <Fade in={true} timeout={1200}>
            <Card
              sx={{
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
                    mb: 3,
                    textAlign: "center",
                    fontSize: { xs: "1.75rem", md: "2.5rem" },
                  }}
                >
                  Real Estate Platform
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    lineHeight: 1.6,
                    textAlign: "center",
                    mb: 4,
                  }}
                >
                  A full-stack real estate platform built with modern
                  technologies. Features include user authentication, property
                  management, search and filtering, image uploads, and
                  responsive design.
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Chip
                      label="React + TypeScript"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Chip
                      label=".NET Core + C#"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Chip
                      label="PostgreSQL"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Chip
                      label="Material-UI"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};
