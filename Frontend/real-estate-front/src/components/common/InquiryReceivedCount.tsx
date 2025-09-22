import React from "react";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { Message as MessageIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { inquiryService } from "../../services/inquiryService";
import { ROUTES } from "../../utils/constants";
import type { Inquiry } from "../../types/inquiry";

export const InquiryReceivedCount: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();

  const { data } = useQuery<{ sent: Inquiry[]; received: Inquiry[] }>({
    queryKey: ["inquiries", "my", user?.id],
    queryFn: () => inquiryService.getMyInquiries(),
    enabled: isAuthenticated && !!user?.id,
    staleTime: 60 * 1000,
  });

  const receivedCount = data?.received?.length || 0;

  const handleClick = () => {
    navigate(isAuthenticated ? ROUTES.INQUIRIES : ROUTES.LOGIN);
  };

  return (
    <Tooltip title={t("inquiries.badge.tooltip", { count: receivedCount })}>
      <IconButton
        onClick={handleClick}
        color="inherit"
        sx={{
          position: "relative",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Badge
          badgeContent={receivedCount}
          color="primary"
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
          <MessageIcon
            sx={{
              color: receivedCount > 0 ? "primary.main" : "text.secondary",
              transition: "color 0.3s ease",
            }}
          />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};
