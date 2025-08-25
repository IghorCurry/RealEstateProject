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
  CreditCard as CreditCardIcon,
  Payment as PaymentIcon,
  AccountBalance as BankIcon,
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

  const footerLinks = [
    { key: "footer.about", route: ROUTES.ABOUT },
    { key: "footer.faq", route: ROUTES.FAQ },
    { key: "footer.developer", route: ROUTES.DEVELOPER },
  ];

  const paymentMethods = [
    { icon: <CreditCardIcon />, name: "Credit Cards" },
    { icon: <PaymentIcon />, name: "PayPal" },
    { icon: <BankIcon />, name: "Bank Transfer" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "primary.main",
              }}
            >
              Real Estate Platform
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.6 }}
            >
              Your trusted partner in real estate. Find your dream property or
              list your own with confidence.
            </Typography>

            {/* Language Switcher */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LanguageIcon sx={{ mr: 1, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
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
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {language === "en" ? "EN" : "UK"}
              </Button>
            </Box>

            {/* Instagram */}
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
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.map((link) => (
                <Button
                  key={link.key}
                  onClick={() => navigate(link.route)}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    color: "text.secondary",
                    fontWeight: 500,
                    p: 0,
                    minWidth: "auto",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      color: "primary.main",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {t(link.key)}
                </Button>
              ))}
            </Box>
          </Grid>

          {/* Payment Methods */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              {t("footer.paymentMethods")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {paymentMethods.map((method, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    // Handle payment method click
                  }}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    color: "text.secondary",
                    fontWeight: 500,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: "grey.50",
                    minWidth: "auto",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      bgcolor: "grey.100",
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
                    {method.icon}
                  </Box>
                  {method.name}
                </Button>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

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
            color="text.secondary"
            sx={{ fontSize: "0.875rem" }}
          >
            © 2024 Real Estate Platform. All rights reserved.
          </Typography>

          {!isMobile && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.875rem" }}
            >
              Built with ❤️ by Igor Yushkov
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};
