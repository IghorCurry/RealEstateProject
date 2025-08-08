import React from "react";
import { Box, Typography, Button } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";

interface SectionHeaderProps extends BoxProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  align?: "left" | "center" | "right";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
  align = "left",
  ...boxProps
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: align === "center" ? "center" : "space-between",
        alignItems: "center",
        mb: 4,
        flexDirection: align === "center" ? "column" : "row",
        gap: 2,
      }}
      {...boxProps}
    >
      <Box sx={{ textAlign: align }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 600, mb: subtitle ? 1 : 0 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction} size="large">
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};
