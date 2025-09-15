import React from "react";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../utils/constants";
import type { Property } from "../../types/property";

interface FavoriteCountProps {
  showText?: boolean;
}

export const FavoriteCount: React.FC<FavoriteCountProps> = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { favorites } = useFavorites();
  const favoritesList = favorites as Property[];

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(ROUTES.FAVORITES);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  if (!isAuthenticated) {
    return (
      <Tooltip title="Sign in to view favorites">
        <IconButton 
          onClick={handleClick} 
          color="inherit"
          sx={{
            color: "text.primary",
            "&:hover": {
              backgroundColor: "primary.light",
              color: "white",
            },
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={`My Favorites (${favoritesList.length} items)`}>
      <IconButton
        onClick={handleClick}
        color="inherit"
        sx={{
          position: "relative",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
            "& .favorite-icon": {
              color: "error.main",
            },
          },
        }}
      >
        <Badge
          badgeContent={favoritesList.length}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.75rem",
              fontWeight: "bold",
              minWidth: "20px",
              height: "20px",
              borderRadius: "10px",
            },
          }}
        >
          <FavoriteIcon
            className="favorite-icon"
            sx={{
              color:
                favoritesList.length > 0 ? "error.light" : "text.secondary",
              transition: "color 0.3s ease",
            }}
          />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};
