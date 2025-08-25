import React from "react";
import { Box, Typography, Fade, useTheme, useMediaQuery } from "@mui/material";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  variant?: "default" | "hero" | "page";
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = "center",
  variant = "default",
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getVariantStyles = () => {
    switch (variant) {
      case "hero":
        return {
          title: {
            fontSize: isMobile ? "2.5rem" : "3.5rem",
            fontWeight: 700,
            lineHeight: 1.2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          },
          subtitle: {
            fontSize: isMobile ? "1.1rem" : "1.25rem",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "text.secondary",
            mb: 4,
          },
          container: {
            py: isMobile ? 6 : 8,
            textAlign: align,
          },
        };
      case "page":
        return {
          title: {
            fontSize: isMobile ? "2rem" : "2.5rem",
            fontWeight: 600,
            lineHeight: 1.3,
            color: "text.primary",
            mb: 2,
          },
          subtitle: {
            fontSize: "1.1rem",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "text.secondary",
            mb: 3,
          },
          container: {
            py: isMobile ? 4 : 6,
            textAlign: align,
          },
        };
      default:
        return {
          title: {
            fontSize: isMobile ? "1.75rem" : "2rem",
            fontWeight: 600,
            lineHeight: 1.3,
            color: "text.primary",
            mb: 1.5,
          },
          subtitle: {
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "text.secondary",
            mb: 2,
          },
          container: {
            py: isMobile ? 3 : 4,
            textAlign: align,
          },
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Fade in={true} timeout={600}>
      <Box sx={styles.container}>
        <Box
          sx={{
            maxWidth: variant === "hero" ? 800 : 600,
            mx: "auto",
            px: 2,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              ...styles.title,
              textAlign: align,
              "&::after":
                variant === "hero"
                  ? {
                      content: '""',
                      display: "block",
                      width: 80,
                      height: 4,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                      borderRadius: 2,
                      mx:
                        align === "center"
                          ? "auto"
                          : align === "right"
                          ? "left"
                          : "right",
                      mt: 2,
                    }
                  : {},
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                ...styles.subtitle,
                textAlign: align,
                maxWidth: variant === "hero" ? 600 : 500,
                mx:
                  align === "center"
                    ? "auto"
                    : align === "right"
                    ? "left"
                    : "right",
              }}
            >
              {subtitle}
            </Typography>
          )}

          {children && (
            <Box
              sx={{
                mt: variant === "hero" ? 4 : 2,
                display: "flex",
                justifyContent:
                  align === "center"
                    ? "center"
                    : align === "right"
                    ? "flex-end"
                    : "flex-start",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {children}
            </Box>
          )}
        </Box>
      </Box>
    </Fade>
  );
};
