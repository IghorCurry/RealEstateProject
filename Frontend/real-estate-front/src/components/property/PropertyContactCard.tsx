import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import type { PropertyDetailed } from "../../types/property";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";

interface PropertyContactCardProps {
  property: PropertyDetailed;
  isAuthenticated: boolean;
  onSendInquiry: () => void;
  onScheduleViewing: () => void;
  onAuthRequired: () => void;
}

export const PropertyContactCard: React.FC<PropertyContactCardProps> = ({
  property,
  isAuthenticated,
  onSendInquiry,
  onScheduleViewing,
  onAuthRequired,
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const isOwner = user?.id === (property?.userId || property?.user?.id);
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          {t("property.details.contact")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <PersonIcon sx={{ mr: 2, color: "primary.main" }} />
          <Typography variant="body1">{property.userName}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <PhoneIcon sx={{ mr: 2, color: "primary.main" }} />
          <Typography variant="body1">+380 99 123 4567</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <EmailIcon sx={{ mr: 2, color: "primary.main" }} />
          <Typography variant="body1">agent@realestate.com</Typography>
        </Box>

        {/* Hide actions for owner */}
        {!isOwner && (
          <>
            {/* Send Inquiry Button */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={isAuthenticated ? onSendInquiry : onAuthRequired}
              sx={{ mb: 2 }}
            >
              {t("inquiries.send")}
            </Button>

            {/* Schedule Viewing Button */}
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={isAuthenticated ? onScheduleViewing : onAuthRequired}
            >
              {t("propertyDetail.toasts.scheduleSoon")}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
