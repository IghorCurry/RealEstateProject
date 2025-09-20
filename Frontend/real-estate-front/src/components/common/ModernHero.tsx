import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  Logout as LogoutIcon,
  AccountCircle,
  Message as MessageIcon,
  Dashboard,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { getUserFullName, getInitials } from "../../utils/helpers";
import { FavoriteCount } from "./FavoriteCount";

export const ModernHero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const isAdmin = user?.role === "Admin";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [readyToAnimate] = useState(true);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate(ROUTES.HOME);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate(ROUTES.PROFILE);
  };

  const handleAdminClick = () => {
    handleMenuClose();
    navigate(ROUTES.ADMIN);
  };

  const handleFavoritesClick = () => {
    handleMenuClose();
    navigate(ROUTES.FAVORITES);
  };

  const handleInquiriesClick = () => {
    handleMenuClose();
    navigate(ROUTES.INQUIRIES);
  };

  const getNavButtonStyles = () => ({
    color: "white",
    textTransform: "none",
    fontWeight: 500,
    fontSize: "1rem",
    px: 3,
    py: 1.5,
    borderRadius: 2,
    transition: "all 0.3s ease",
    textShadow: "0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 4px rgba(0, 0, 0, 0.6)",
    "&:hover": {
      color: "rgba(255, 255, 255, 0.9)",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      textShadow: "0 3px 12px rgba(0, 0, 0, 0.9), 0 1px 6px rgba(0, 0, 0, 0.7)",
      transform: "translateY(-1px)",
    },
  });

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "100vw",
        backgroundColor: "#0e0f13",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `image-set(
            url('/hero-bg.avif') type('image/avif'),
            url('/hero-bg.webp') type('image/webp'),
            url('/hero-bg.jpg') type('image/jpeg')
          )`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
          willChange: "transform",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(26, 54, 93, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 75% 25%, rgba(139, 21, 56, 0.08) 0%, transparent 45%)
          `,
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          p: { xs: 3, md: 4 },
          pt: { xs: 4, md: 6 },
          pb: { xs: 3, md: 4 },
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)",
          ...(isMobile ? {} : { backdropFilter: "blur(6px)" }),
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <motion.div
              key={`logo-${String(readyToAnimate)}`}
              initial={
                prefersReducedMotion || !readyToAnimate
                  ? false
                  : { opacity: 0, x: -30 }
              }
              animate={
                prefersReducedMotion || !readyToAnimate
                  ? undefined
                  : { opacity: 1, x: 0 }
              }
              transition={
                prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }
              }
              style={{ willChange: "opacity, transform" }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "white",
                  fontFamily: '"Playfair Display", serif',
                  letterSpacing: "0.1em",
                  textShadow:
                    "0 3px 15px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.7), 0 1px 3px rgba(0, 0, 0, 0.5)",
                }}
              >
                REAL ESTATE
              </Typography>
            </motion.div>

            {!isMobile && (
              <motion.div
                key={`nav-${String(readyToAnimate)}`}
                initial={
                  prefersReducedMotion || !readyToAnimate
                    ? false
                    : { opacity: 0, y: -20 }
                }
                animate={
                  prefersReducedMotion || !readyToAnimate
                    ? undefined
                    : { opacity: 1, y: 0 }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.6, delay: 0.15 }
                }
                style={{ willChange: "opacity, transform" }}
              >
                <Box sx={{ display: "flex", gap: 4 }}>
                  <Button
                    onClick={() => navigate(ROUTES.PROPERTIES)}
                    sx={getNavButtonStyles()}
                  >
                    {t("home.hero.properties")}
                  </Button>
                  <Button
                    onClick={() => navigate(ROUTES.ABOUT)}
                    sx={getNavButtonStyles()}
                  >
                    {t("home.hero.about")}
                  </Button>
                  <Button
                    onClick={() => navigate(ROUTES.DEVELOPER)}
                    sx={getNavButtonStyles()}
                  >
                    {t("nav.developer")}
                  </Button>
                </Box>
              </motion.div>
            )}

            <motion.div
              key={`actions-${String(readyToAnimate)}`}
              initial={
                prefersReducedMotion || !readyToAnimate
                  ? false
                  : { opacity: 0, x: 30 }
              }
              animate={
                prefersReducedMotion || !readyToAnimate
                  ? undefined
                  : { opacity: 1, x: 0 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.3 }
              }
              style={{ willChange: "opacity, transform" }}
            >
              {isAuthenticated ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {isAdmin && (
                    <Chip
                      label={t("Admin")}
                      size="small"
                      sx={{
                        bgcolor: "rgba(139, 21, 56, 0.9)",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        display: { xs: "none", sm: "flex" },
                      }}
                    />
                  )}

                  <FavoriteCount />

                  {user && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "rgba(255, 255, 255, 0.95)",
                        display: { xs: "none", sm: "block" },
                        mr: 1,
                        textShadow:
                          "0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 4px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {getUserFullName(user)}
                    </Typography>
                  )}

                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{
                      p: 1,
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    {user && (
                      <Avatar
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.2)",
                          color: "white",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          width: 40,
                          height: 40,
                          border: "2px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        {getInitials(user)}
                      </Avatar>
                    )}
                  </IconButton>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => navigate(ROUTES.LOGIN)}
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.7)",
                      color: "white",
                      textTransform: "none",
                      fontWeight: 600,
                      px: { xs: 3, md: 4 },
                      py: { xs: 1.2, md: 1.5 },
                      borderRadius: 2,
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      transition: "all 0.3s ease",
                      textShadow:
                        "0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 4px rgba(0, 0, 0, 0.6)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                      width: { xs: "100%", sm: "auto" },
                      "&:hover": {
                        borderColor: "white",
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)",
                        textShadow:
                          "0 3px 12px rgba(0, 0, 0, 0.9), 0 1px 6px rgba(0, 0, 0, 0.7)",
                        boxShadow:
                          "0 4px 12px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {t("nav.login")}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate(ROUTES.REGISTER)}
                    sx={{
                      bgcolor: "white",
                      color: "primary.main",
                      textTransform: "none",
                      fontWeight: 700,
                      px: { xs: 3, md: 4 },
                      py: { xs: 1.2, md: 1.5 },
                      borderRadius: 2,
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      width: { xs: "100%", sm: "auto" },
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%)",
                        transform: "translateY(-2px)",
                        boxShadow:
                          "0 6px 16px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)",
                      },
                    }}
                  >
                    {t("nav.register")}
                  </Button>
                </Box>
              )}
            </motion.div>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "100vh",
            py: { xs: 6, md: 10 },
            pt: { xs: 8, md: 12 },
          }}
        >
          <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
            <Grid item xs={12} md={8}>
              <motion.div
                key={`headline-${String(readyToAnimate)}`}
                initial={
                  prefersReducedMotion || !readyToAnimate
                    ? false
                    : { opacity: 0, x: -50 }
                }
                animate={
                  prefersReducedMotion || !readyToAnimate
                    ? undefined
                    : { opacity: 1, x: 0 }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.6, delay: 0.3 }
                }
                style={{ willChange: "opacity, transform" }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "rgba(255, 255, 255, 0.95)",
                    fontSize: { xs: "0.9rem", md: "1.1rem" },
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    mb: { xs: 1.5, md: 2 },
                    display: "block",
                    textShadow:
                      "0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 4px rgba(0, 0, 0, 0.6)",
                  }}
                ></Typography>

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      xs: "2.5rem",
                      sm: "3.5rem",
                      md: "5rem",
                      lg: "6rem",
                    },
                    fontWeight: 700,
                    color: "white",
                    fontFamily: '"Playfair Display", serif',
                    lineHeight: 0.9,
                    mb: { xs: 2, md: 3 },
                    letterSpacing: "-0.02em",
                    textShadow:
                      "0 5px 25px rgba(0, 0, 0, 0.9), 0 3px 15px rgba(0, 0, 0, 0.7), 0 1px 5px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {t("home.hero.title")}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    color: "rgba(255, 255, 255, 0.95)",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    mb: { xs: 4, md: 4 },
                    maxWidth: { xs: 350, md: 500 },
                    fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                    textShadow:
                      "0 3px 15px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {t("home.hero.subtitle")}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    flexWrap: "wrap",
                    mt: { xs: 1, md: 0 },
                  }}
                >
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                    style={{ willChange: "transform" }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<SearchIcon />}
                      onClick={() => navigate(ROUTES.PROPERTIES)}
                      sx={{
                        bgcolor: "white",
                        color: "primary.main",
                        px: { xs: 2.5, md: 4 },
                        py: { xs: 0.8, md: 1.5 },
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 700,
                        borderRadius: 2,
                        textTransform: "none",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%)",
                          transform: "translateY(-2px)",
                          boxShadow:
                            "0 12px 40px rgba(0, 0, 0, 0.35), 0 0 40px rgba(255, 255, 255, 0.3)",
                        },
                      }}
                    >
                      {t("home.hero.browse")}
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                    style={{ willChange: "transform" }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => {
                        if (isAuthenticated) {
                          navigate(ROUTES.CREATE_PROPERTY);
                        } else {
                          navigate(ROUTES.LOGIN);
                        }
                      }}
                      sx={{
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        color: "white",
                        px: { xs: 2.5, md: 4 },
                        py: { xs: 0.8, md: 1.5 },
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 500,
                        borderRadius: 2,
                        textTransform: "none",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "white",
                          bgcolor: "rgba(255, 255, 255, 0.1)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {isAuthenticated
                        ? t("home.hero.list")
                        : t("home.hero.getStarted")}
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <motion.div
        key={`side-${String(readyToAnimate)}`}
        initial={
          prefersReducedMotion || !readyToAnimate
            ? false
            : { opacity: 0, x: 50 }
        }
        animate={
          prefersReducedMotion || !readyToAnimate
            ? undefined
            : { opacity: 1, x: 0 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.6, delay: 0.45 }
        }
        style={{
          position: "absolute",
          right: 30,
          top: "50%",
          transform: "translateY(-50%)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          willChange: "opacity, transform",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "0.9rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textShadow:
              "0 2px 8px rgba(0, 0, 0, 0.8), 0 1px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          {t("home.hero.sideText")}
        </Typography>
      </motion.div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            boxShadow: theme.shadows[8],
            minWidth: 200,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfileClick} sx={{ py: 1.5 }}>
          <AccountCircle sx={{ mr: 2, color: "text.secondary" }} />
          {t("nav.profile")}
        </MenuItem>
        <MenuItem onClick={handleFavoritesClick} sx={{ py: 1.5 }}>
          <FavoriteIcon sx={{ mr: 2, color: "text.secondary" }} />
          {t("favorites.title")}
        </MenuItem>
        <MenuItem onClick={handleInquiriesClick} sx={{ py: 1.5 }}>
          <MessageIcon sx={{ mr: 2, color: "text.secondary" }} />
          {t("inquiries.title")}
        </MenuItem>
        {isAdmin && (
          <MenuItem onClick={handleAdminClick} sx={{ py: 1.5 }}>
            <Dashboard sx={{ mr: 2, color: "text.secondary" }} />
            {t("nav.adminPanel")}
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: "error.main" }}>
          <LogoutIcon sx={{ mr: 2 }} />
          {t("nav.logout")}
        </MenuItem>
      </Menu>
    </Box>
  );
};
