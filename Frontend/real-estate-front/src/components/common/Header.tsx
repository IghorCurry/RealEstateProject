import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { authService } from '../../services/authService';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isAuthenticated = authService.isAuthenticated();
  const isAdmin = authService.isAdmin();
  const user = authService.getStoredUser();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
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

  const handlePropertiesClick = () => {
    navigate(ROUTES.PROPERTIES);
  };

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleRegisterClick = () => {
    navigate(ROUTES.REGISTER);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            cursor: 'pointer',
          }}
          onClick={() => navigate(ROUTES.HOME)}
        >
          <Box
            component="img"
            src="/favicon.svg"
            alt="Real Estate"
            sx={{
              width: 32,
              height: 32,
              mr: 1,
            }}
          />
          <Typography variant="h6" component="div">
            Real Estate
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={() => navigate(ROUTES.HOME)}
            >
              Home
            </Button>
            <Button
              color="inherit"
              startIcon={<SearchIcon />}
              onClick={handlePropertiesClick}
            >
              Properties
            </Button>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Button
                    color="inherit"
                    startIcon={<AdminIcon />}
                    onClick={handleAdminClick}
                  >
                    Admin
                  </Button>
                )}
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{ ml: 1 }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                    {user?.fullName?.charAt(0) || <PersonIcon />}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleProfileClick}>
                    <PersonIcon sx={{ mr: 1 }} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={handleLoginClick}>
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRegisterClick}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        )}

        {isMobile && isAuthenticated && (
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
              {user?.fullName?.charAt(0) || <PersonIcon />}
            </Avatar>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}; 