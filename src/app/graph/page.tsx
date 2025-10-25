'use client';

import { CircularProgress, Box } from '@mui/material';
import ClientOnly from '@/components/ClientOnly';
import GraphPage from '@/pages/graph/GraphPage';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function Graph() {
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
      <GraphPage />
    </ClientOnly>
  );
}
