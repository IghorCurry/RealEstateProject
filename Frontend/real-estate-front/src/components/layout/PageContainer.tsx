import React from 'react';
import { Box, Container } from '@mui/material';
import type { ContainerProps } from '@mui/material/Container';

interface PageContainerProps extends ContainerProps {
  children: React.ReactNode;
  fullHeight?: boolean;
  background?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  fullHeight = false,
  background = 'background.default',
  ...containerProps
}) => {
  return (
    <Box
      sx={{
        minHeight: fullHeight ? '100vh' : 'auto',
        backgroundColor: background,
        py: 4,
      }}
    >
      <Container maxWidth="lg" {...containerProps}>
        {children}
      </Container>
    </Box>
  );
}; 