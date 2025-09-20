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
        backdropFilter: "blur(15px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 3 },
          py: { xs: 1.5, md: 2 },
          minHeight: { xs: 56, md: 64 }, // Зменшена висота
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: { xs: 1, md: 0 },
        }}
      >
        {/* RealEstate Logo - positioned at the very left */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 0,
            fontWeight: 700,
            color: "primary.main",
            cursor: "pointer",
            fontSize: { xs: "1.1rem", md: "1.5rem" },
            "&:hover": {
              color: "primary.dark",
            },
            transition: "color 0.2s ease",
            minWidth: "fit-content",
          }}
          onClick={() => navigate(ROUTES.HOME)}
        >
          RealEstate
        </Typography>

        {/* Home Button */}
        <Fade in={true} timeout={800}>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={handleHomeClick}
            sx={{
              display: { xs: "none", md: "flex" },
              color: isActiveRoute(ROUTES.HOME)
                ? "primary.main"
                : "text.primary",
              fontWeight: isActiveRoute(ROUTES.HOME) ? 600 : 500,
              ml: 3,
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            {t("nav.home")}
          </Button>
        </Fade>

        {/* Properties Button */}
        <Fade in={!isActiveRoute(ROUTES.PROPERTIES)} timeout={800}>
          <Button
            color="inherit"
            startIcon={<BusinessIcon />}
            onClick={handlePropertiesClick}
            sx={{
              display: isActiveRoute(ROUTES.PROPERTIES)
                ? "none"
                : { xs: "none", md: "flex" },
              textTransform: "none",
              fontWeight: 500,
              color: isActiveRoute(ROUTES.PROPERTIES)
                ? "primary.main"
                : "text.primary",
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            {t("nav.properties")}
          </Button>
        </Fade>

        {/* Developer Button */}
        <Fade in={true} timeout={800}>
          <Button
            color="inherit"
            startIcon={<PersonIcon />}
            onClick={() => navigate(ROUTES.DEVELOPER)}
            sx={{
              display: { xs: "none", md: "flex" },
              textTransform: "none",
              fontWeight: 500,
              color: isActiveRoute(ROUTES.DEVELOPER)
                ? "primary.main"
                : "text.primary",
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            {t("nav.developer")}
          </Button>
        </Fade>

        {/* Spacer to push user menu to the right */}
        <Box
          sx={{
            flexGrow: 1,
          }}
        />

        {/* Mobile Navigation - only show on mobile */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 0.5,
            flexGrow: 0,
            ml: 2,
          }}
        >
          <IconButton
            color="inherit"
            onClick={handleHomeClick}
            sx={{
              color: isActiveRoute(ROUTES.HOME)
                ? "primary.main"
                : "text.primary",
              p: 0.5,
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
              },
            }}
          >
            <HomeIcon fontSize="small" />
          </IconButton>
          {!isActiveRoute(ROUTES.PROPERTIES) && (
            <IconButton
              color="inherit"
              onClick={handlePropertiesClick}
              sx={{
                color: isActiveRoute(ROUTES.PROPERTIES)
                  ? "primary.main"
                  : "text.primary",
                p: 0.5,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                },
              }}
            >
              <BusinessIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            onClick={() => navigate(ROUTES.DEVELOPER)}
            sx={{
              color: isActiveRoute(ROUTES.DEVELOPER)
                ? "primary.main"
                : "text.primary",
              p: 0.5,
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
              },
            }}
          >
            <PersonIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Right side: User Menu */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, md: 2 },
            flexGrow: 0,
          }}
        >
          {isAuthenticated ? (
            <>
              {/* Admin Badge */}
              {isAdmin && (
                <Chip
                  label={t("nav.admin")}
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
                {user && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "text.secondary",
                      display: { xs: "none", sm: "block" },
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
                        width: 40,
                        height: 40,
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
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 0.5, md: 1 },
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleLoginClick}
                  sx={{
                    borderRadius: 2,
                    px: { xs: 1.5, md: 3 },
                    fontSize: { xs: "0.7rem", md: "0.875rem" },
                    minWidth: { xs: "auto", md: "auto" },
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {t("nav.login")}
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate(ROUTES.REGISTER)}
                  sx={{
                    borderRadius: 2,
                    px: { xs: 1.5, md: 3 },
                    fontSize: { xs: "0.7rem", md: "0.875rem" },
                    minWidth: { xs: "auto", md: "auto" },
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {t("nav.register")}
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
          {t("nav.profile")}
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
            {t("nav.admin")}
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: "error.main" }}>
          <Logout sx={{ mr: 2 }} />
          {t("nav.logout")}
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
          {t("nav.home")}
        </MenuItem>
        {!isActiveRoute(ROUTES.PROPERTIES) && (
          <MenuItem onClick={handlePropertiesClick}>
            <SearchIcon sx={{ mr: 2, color: "text.secondary" }} />
            {t("nav.properties")}
          </MenuItem>
        )}
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
              {t("nav.profile")}
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
                {t("nav.admin")}
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <Logout sx={{ mr: 2 }} />
              {t("nav.logout")}
            </MenuItem>
          </>
        )}
      </Menu>
    </AppBar>
  );
});
