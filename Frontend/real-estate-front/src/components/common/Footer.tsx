import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Instagram as InstagramIcon,
  Language as LanguageIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Telegram as TelegramIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { ROUTES } from "../../utils/constants";

export const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = () => {
    setLanguage(language === "en" ? "uk" : "en");
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/", "_blank");
  };

  const handleTelegramClick = () => {
    window.open("https://t.me/SunOnYee", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/igor-yushkov-77b73b262/",
      "_blank"
    );
  };

  const footerLinks = [
    { key: "footer.about", route: ROUTES.ABOUT },
    { key: "footer.faq", route: ROUTES.FAQ },
    { key: "footer.developer", route: ROUTES.DEVELOPER },
  ];

  const contactInfo = [
    {
      icon: <EmailIcon />,
      text: "info@realestate.com",
      action: () => window.open("mailto:info@realestate.com"),
    },
    {
      icon: <PhoneIcon />,
      text: "(+380) 98 029 00 59",
      action: () => window.open("tel:(+380) 98 029 00 59"),
    },
    {
      icon: <LocationIcon />,
      text: "Kyiv, Ukraine",
      action: () => window.open("https://maps.google.com/?q=Kyiv,Ukraine"),
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#FAFAFA",
        color: "text.primary",
        mt: "auto",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(0, 0, 0, 0.08)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(26, 54, 93, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 21, 56, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(26, 54, 93, 0.02) 0%, transparent 50%)
          `,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        <Grid container spacing={3}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "primary.main",
                fontFamily: '"Playfair Display", serif',
              }}
            >
              {t("footer.brand")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                lineHeight: 1.6,
                color: "text.secondary",
              }}
            >
              {t("footer.tagline")}
            </Typography>

            {/* Language Switcher */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LanguageIcon sx={{ mr: 1, color: "text.secondary" }} />
              <Typography
                variant="body2"
                sx={{ mr: 1, color: "text.secondary" }}
              >
                {t("footer.language")}:
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleLanguageChange}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  borderColor: "primary.main",
                  color: "primary.main",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    borderColor: "primary.dark",
                    bgcolor: "primary.main",
                    color: "white",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {language === "en" ? t("lang.en") : t("lang.uk")}
              </Button>
            </Box>

            {/* Social Media */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                onClick={handleInstagramClick}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                onClick={handleTelegramClick}
                sx={{
                  bgcolor: "#0088cc",
                  color: "white",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor: "#006699",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <TelegramIcon />
              </IconButton>

              <IconButton
                onClick={handleLinkedInClick}
                sx={{
                  bgcolor: "#0077b5",
                  color: "white",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor: "#005885",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "primary.main",
                fontFamily: '"Playfair Display", serif',
                textAlign: "center",
              }}
            >
              {t("footer.quickLinks")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
              }}
            >
              {footerLinks.map((link) => (
                <Button
                  key={link.key}
                  onClick={() => navigate(link.route)}
                  sx={{
                    justifyContent: "center",
                    textTransform: "none",
                    color: "text.secondary",
                    fontWeight: 500,
                    p: 0,
                    minWidth: "auto",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      color: "primary.main",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {t(link.key)}
                </Button>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "primary.main",
                fontFamily: '"Playfair Display", serif',
              }}
            >
              {t("footer.contact")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {contactInfo.map((contact, index) => (
                <Button
                  key={index}
                  onClick={contact.action}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    color: "text.secondary",
                    fontWeight: 500,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: "rgba(26, 54, 93, 0.05)",
                    border: "1px solid rgba(26, 54, 93, 0.1)",
                    minWidth: "auto",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      bgcolor: "rgba(26, 54, 93, 0.1)",
                      color: "primary.main",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      mr: 1,
                    }}
                  >
                    {contact.icon}
                  </Box>
                  {contact.text}
                </Button>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(0, 0, 0, 0.08)" }} />

        {/* Copyright */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.875rem",
              color: "text.secondary",
            }}
          >
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </Typography>

          {!isMobile && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                color: "text.secondary",
              }}
            >
              {t("footer.builtWith")}{" "}
              <Button
                onClick={() => navigate(ROUTES.DEVELOPER)}
                sx={{
                  color: "inherit",
                  textDecoration: "underline",
                  textTransform: "none",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  p: 0,
                  minWidth: "auto",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                Igor Yushkov
              </Button>
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};
