import { Layout } from '@/components/layout/Layout';
import { Container, Typography, Box } from '@mui/material';

export default function Quest() {
  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Daily Quests
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Complete these daily challenges to stay motivated
          </Typography>
        </Box>

        <Box textAlign="center" sx={{ py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Quest system coming soon!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Daily challenges and rewards will be available here.
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
}
