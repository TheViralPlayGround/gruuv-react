import { Layout } from '@/components/layout/Layout';
import { Container, Typography, Box } from '@mui/material';

export default function Graph() {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Progress Overview
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track your effort levels over time
          </Typography>
        </Box>

        <Box textAlign="center" sx={{ py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Charts coming soon!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Progress visualization will be available here.
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
}
