'use client';

import { CircularProgress, Box } from '@mui/material';
import ClientOnly from '@/components/ClientOnly';
import QuestPage from '@/components/quest/QuestPage';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function Quest() {
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
      <QuestPage />
    </ClientOnly>
  );
}
