import React, { useEffect } from "react";
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
import developerPhoto from "../assets/developer-photo.jpg";
import {
  LinkedIn as LinkedInIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  Build as BuildIcon,
  Psychology as PsychologyIcon,
  SmartToy as SmartToyIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { SectionHeader } from "../components/common/SectionHeader";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/developer.css";
const Silk = React.lazy(() => import("../components/backgrounds/Silk"));

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
      "SEO & OpenGraph",
      "Routing: Lazy+Boundaries",
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
      "IMemoryCache + Worker",
      "SignalR Notifications",
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
      "MongoDB (local)",
      "Azure DB",
      "Supabase",
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
      "App Insights + Serilog",
      "Cloudflare CDN & Analytics",
    ],
    color: "info",
  },
  {
    titleKey: "developer.ai.title",
    icon: <SmartToyIcon />,
    skills: [
      "Cursor",
      "MCP Servers",
      "OpenAI GPT",
      "Google Gemini",
      "NotebookLM",
      "Claude",
      "Perplexity",
      "LangChain",
      "OpenAI API",
      "Agents",
      "Prompt Engineering",
    ],
    color: "error",
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
      "System Design",
    ],
    color: "warning",
  },
];

export const DeveloperPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    document.body.classList.add("route-developer");
    return () => document.body.classList.remove("route-developer");
  }, []);

  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/igor-yushkov-77b73b262/",
      "_blank"
    );
  };

  return (
    <div className="developer-page">
      <div className="developer-bg">
        <React.Suspense fallback={null}>
          <Silk
            speed={5}
            scale={1}
            color="#3B82F6"
            noiseIntensity={1.5}
            rotation={0}
          />
        </React.Suspense>
      </div>

      <div className="developer-content">
        <Box sx={{ minHeight: "100vh", py: 2, overflow: "hidden" }}>
          <Container maxWidth="lg" sx={{ overflow: "hidden" }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <SectionHeader
                title={t("developer.title")}
                subtitle={t("developer.subtitle")}
                variant="page"
              />
            </Box>

            {/* Developer Info */}
            <Grid container spacing={4} sx={{ mb: 4 }} alignItems="stretch">
              <Grid item xs={12} md={4} sx={{ display: "flex" }}>
                <Fade in={true} timeout={800}>
                  <Card
                    className="developer-card"
                    sx={{
                      p: 4,
                      textAlign: "center",
                      borderRadius: 3,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&::before": { content: "none" },
                      height: "100%",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    <Avatar
                      className="developer-avatar developer-avatar-ring"
                      src={developerPhoto}
                      alt={t("developer.name")}
                      sx={{
                        width: { xs: 180, md: 220 },
                        height: { xs: 180, md: 220 },
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
                      className="developer-title"
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
                      className="developer-text"
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

              <Grid item xs={12} md={8} sx={{ display: "flex" }}>
                <Fade in={true} timeout={1000}>
                  <Card
                    className="developer-card"
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      height: "100%",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&::before": { content: "none" },
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      className="developer-title"
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
                              className="developer-title"
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
                                className="developer-chip"
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
                                    bgcolor: `${category.color}.main`,
                                    color: "#ffffff",
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
                  className="developer-card developer-card-accent"
                  sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: 4,
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": { content: "none" },
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
                      {t("developer.project.title")}
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
                      {t("developer.project.description")}
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                      <Grid item>
                        <Chip
                          label={t("developer.project.stack.reactTs")}
                          sx={{
                            bgcolor: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Chip
                          label={t("developer.project.stack.dotnet")}
                          sx={{
                            bgcolor: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Chip
                          label={t("developer.project.stack.postgres")}
                          sx={{
                            bgcolor: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Chip
                          label={t("developer.project.stack.mui")}
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
      </div>
    </div>
  );
};
