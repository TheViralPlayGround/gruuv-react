'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import {
  Home as HomeIcon,
  ShowChart as ChartIcon,
  Assignment as QuestIcon,
} from '@mui/icons-material';

const navigationItems = [
  { label: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
  { label: 'Graph', icon: <ChartIcon />, path: '/graph' },
  { label: 'Quest', icon: <QuestIcon />, path: '/quest' },
];

export const AppBottomNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
  };

  // Find current value based on pathname
  const currentValue = navigationItems.find(item => 
    pathname?.startsWith(item.path)
  )?.path || '/dashboard';

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000 
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={currentValue}
        onChange={handleChange}
        showLabels
      >
        {navigationItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            value={item.path}
            icon={item.icon}
            data-testid={item.path === '/graph' ? 'gr-dashboard-btn-charts' : undefined}
            sx={{
              color: 'white',
              '&.Mui-selected': {
                color: 'white',
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
