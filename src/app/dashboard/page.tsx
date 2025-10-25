'use client';

import { CircularProgress, Box } from '@mui/material';
import ClientOnly from '@/components/ClientOnly';
import DashboardPage from '@/components/dashboard/DashboardPage';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function Dashboard() {
  return (
    <ClientOnly
      fallback={
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
      }
    >
      <DashboardPage />
    </ClientOnly>
  );
}
