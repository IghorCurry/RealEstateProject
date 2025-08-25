import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  Logout,
  Dashboard,
  Home as HomeIcon,
  Search as SearchIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { ROUTES } from "../../utils/constants";
import { getUserFullName, getInitials } from "../../utils/helpers";
import { FavoriteCount } from "./FavoriteCount";

export const Header = React.memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.role === "Admin";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
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

  // Navigation functions
  const handleHomeClick = () => {
    navigate(ROUTES.HOME);
  };

  const handlePropertiesClick = () => {
    navigate(ROUTES.PROPERTIES);
  };

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
  };

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  const { t } = useLanguage();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
        {/* Logo */}
        <Fade in={true} timeout={600}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 0,
              fontWeight: 700,
              color: "primary.main",
              cursor: "pointer",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              "&:hover": {
                color: "primary.dark",
              },
              transition: "color 0.2s ease",
            }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            RealEstate
          </Typography>
        </Fade>

        {/* Desktop Navigation */}
        <Fade in={true} timeout={800}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              ml: 4,
              flexGrow: 1,
            }}
          >
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={handleHomeClick}
              sx={{
                color: isActiveRoute(ROUTES.HOME)
                  ? "primary.main"
                  : "text.primary",
                fontWeight: isActiveRoute(ROUTES.HOME) ? 600 : 500,
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                },
              }}
            >
              {t("nav.home")}
            </Button>
            <Button
              color="inherit"
              startIcon={<BusinessIcon />}
              onClick={handlePropertiesClick}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                color: isActiveRoute(ROUTES.PROPERTIES)
                  ? "primary.main"
                  : "text.primary",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                },
              }}
            >
              {t("nav.properties")}
            </Button>
            <Button
              color="inherit"
              startIcon={<PersonIcon />}
              onClick={() => navigate(ROUTES.DEVELOPER)}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                color: isActiveRoute(ROUTES.DEVELOPER)
                  ? "primary.main"
                  : "text.primary",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                },
              }}
            >
              {t("nav.developer")}
            </Button>
          </Box>
        </Fade>

        {/* User Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isAuthenticated ? (
            <>
              {/* Admin Badge */}
              {isAdmin && (
                <Chip
                  label={t("Admin")}
                  size="small"
                  color="secondary"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    display: { xs: "none", sm: "flex" },
                  }}
                />
              )}

              {/* Favorite Count */}
              <FavoriteCount />

              {/* Profile Menu */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "text.primary",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {user && (
                    <Typography variant="body2" color="text.secondary">
                      {getUserFullName(user)}
                    </Typography>
                  )}
                </Typography>
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{
                    p: 0.5,
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  {user && (
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      {getInitials(user)}
                    </Avatar>
                  )}
                </IconButton>
              </Box>

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  onClick={handleMobileMenuOpen}
                  sx={{
                    ml: 1,
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: "primary.light",
                      color: "white",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </>
          ) : (
            <Fade in={true} timeout={1000}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={handleLoginClick}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {t("Login")}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate(ROUTES.REGISTER)}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {t("Register")}
                </Button>
              </Box>
            </Fade>
          )}
        </Box>
      </Toolbar>

      {/* Profile Menu */}
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
          {t("Profile")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(ROUTES.FAVORITES);
            handleMenuClose();
          }}
          sx={{ py: 1.5 }}
        >
          <FavoriteIcon sx={{ mr: 2, color: "text.secondary" }} />
          {t("favorites.title")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(ROUTES.INQUIRIES);
            handleMenuClose();
          }}
          sx={{ py: 1.5 }}
        >
          <MessageIcon sx={{ mr: 2, color: "text.secondary" }} />
          {t("inquiries.title")}
        </MenuItem>
        {isAdmin && (
          <MenuItem onClick={handleAdminClick} sx={{ py: 1.5 }}>
            <Dashboard sx={{ mr: 2, color: "text.secondary" }} />
            {t("Admin Panel")}
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: "error.main" }}>
          <Logout sx={{ mr: 2 }} />
          {t("Logout")}
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
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
        <MenuItem onClick={handleHomeClick}>
          <HomeIcon sx={{ mr: 2, color: "text.secondary" }} />
          {t("Home")}
        </MenuItem>
        <MenuItem onClick={handlePropertiesClick}>
          <SearchIcon sx={{ mr: 2, color: "text.secondary" }} />
          {t("Properties")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(ROUTES.DEVELOPER);
            handleMenuClose();
          }}
        >
          <SearchIcon sx={{ mr: 2, color: "text.secondary" }} />
          {t("nav.developer")}
        </MenuItem>
        {isAuthenticated && (
          <>
            <MenuItem onClick={handleProfileClick}>
              <AccountCircle sx={{ mr: 2, color: "text.secondary" }} />
              {t("Profile")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(ROUTES.FAVORITES);
                handleMenuClose();
              }}
            >
              <FavoriteIcon sx={{ mr: 2, color: "text.secondary" }} />
              {t("favorites.title")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(ROUTES.INQUIRIES);
                handleMenuClose();
              }}
            >
              <MessageIcon sx={{ mr: 2, color: "text.secondary" }} />
              {t("inquiries.title")}
            </MenuItem>
            {isAdmin && (
              <MenuItem onClick={handleAdminClick}>
                <Dashboard sx={{ mr: 2, color: "text.secondary" }} />
                {t("Admin Panel")}
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <Logout sx={{ mr: 2 }} />
              {t("Logout")}
            </MenuItem>
          </>
        )}
      </Menu>
    </AppBar>
  );
});
