'use client';

import React from 'react';
import { Box } from '@mui/material';
import { AppBottomNavigation } from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showBottomNav = true 
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingBottom: showBottomNav ? '80px' : 0, // Space for bottom nav
          padding: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Box>
      
      {showBottomNav && <AppBottomNavigation />}
    </Box>
  );
};
