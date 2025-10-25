'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CircularProgress, Box } from '@mui/material';
import ClientOnly from '@/components/ClientOnly';
import LoginPage from '@/components/auth/LoginPage';
import DashboardPage from '@/components/dashboard/DashboardPage';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
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
  }

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
      {!user ? <LoginPage /> : <DashboardPage />}
    </ClientOnly>
  );
}
