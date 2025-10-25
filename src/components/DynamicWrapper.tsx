'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

// Loading component
const LoadingSpinner = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

// Dynamic wrapper for components that use context providers
export const withDynamicImport = (importFn: () => Promise<any>) => {
  return dynamic(importFn, {
    loading: () => <LoadingSpinner />,
    ssr: false, // Disable server-side rendering
  });
};
