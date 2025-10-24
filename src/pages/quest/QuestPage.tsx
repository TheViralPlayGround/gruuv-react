'use client';

import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
} from '@mui/material';
import { Layout } from '@/components/layout/Layout';

export const QuestPage: React.FC = () => {
  // Placeholder quest data - you can expand this later
  const dailyQuests = [
    { id: 1, title: 'Complete 3 achievements', completed: false, progress: 1 },
    { id: 2, title: 'Track effort for all goals', completed: false, progress: 0 },
    { id: 3, title: 'Review your progress', completed: true, progress: 1 },
  ];

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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {dailyQuests.map((quest) => (
            <Card key={quest.id}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" component="h2">
                    {quest.title}
                  </Typography>
                  <Chip
                    label={quest.completed ? 'Completed' : 'In Progress'}
                    color={quest.completed ? 'success' : 'primary'}
                    variant={quest.completed ? 'filled' : 'outlined'}
                  />
                </Box>
                
                {!quest.completed && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Progress: {quest.progress}/1
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      disabled={quest.completed}
                    >
                      {quest.completed ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            More quest features coming soon! 🚀
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};
