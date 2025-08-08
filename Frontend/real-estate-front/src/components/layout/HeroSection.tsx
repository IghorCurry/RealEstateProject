import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  actions?: React.ReactNode;
  fullHeight?: boolean;
  overlay?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  actions,
  fullHeight = true,
  overlay = true,
}) => {
  return (
    <Box
      sx={{
        background: backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${backgroundImage}')`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'white',
        minHeight: fullHeight ? '100vh' : '60vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.5,
                }}
              >
                {subtitle}
              </Typography>
            )}
            {actions && (
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {actions}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 