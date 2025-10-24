'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
  Box,
  Fab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Layout } from '@/components/layout/Layout';

interface Achievement {
  id: string;
  title: string;
  description: string;
  effort: number;
}

export const SimpleDashboard: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Morning Exercise',
      description: 'Complete 30 minutes of cardio',
      effort: 7,
    },
    {
      id: '2',
      title: 'Read 10 Pages',
      description: 'Read from current book',
      effort: 5,
    },
  ]);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
    effort: 5,
  });

  const handleAddAchievement = () => {
    const achievement: Achievement = {
      id: Date.now().toString(),
      ...newAchievement,
    };
    setAchievements([...achievements, achievement]);
    setNewAchievement({ title: '', description: '', effort: 5 });
    setOpenDialog(false);
  };

  const handleEffortChange = (id: string, effort: number) => {
    setAchievements(achievements.map(a => 
      a.id === id ? { ...a, effort } : a
    ));
  };

  const handleDeleteAchievement = (id: string) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      setAchievements(achievements.filter(a => a.id !== id));
    }
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track your daily progress and achievements
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {achievements.map((achievement) => (
            <Grid item xs={12} sm={6} md={4} key={achievement.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {achievement.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {achievement.description}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Today's Effort: {achievement.effort}/10
                    </Typography>
                    <Slider
                      value={achievement.effort}
                      onChange={(_, value) => handleEffortChange(achievement.id, value as number)}
                      min={0}
                      max={10}
                      step={1}
                      marks
                      valueLabelDisplay="auto"
                      color="primary"
                    />
                  </Box>
                </CardContent>
                
                <CardActions>
                  <IconButton
                    size="small"
                    onClick={() => {/* Edit functionality */}}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteAchievement(achievement.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {achievements.length === 0 && (
          <Box textAlign="center" sx={{ mt: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No achievements yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add your first achievement to start tracking your progress!
            </Typography>
          </Box>
        )}

        {/* Add Achievement Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Achievement</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              variant="outlined"
              value={newAchievement.title}
              onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={newAchievement.description}
              onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Initial Effort Level: {newAchievement.effort}/10
              </Typography>
              <Slider
                value={newAchievement.effort}
                onChange={(_, value) => setNewAchievement({ ...newAchievement, effort: value as number })}
                min={0}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
                color="primary"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleAddAchievement}
              variant="contained"
              disabled={!newAchievement.title.trim()}
            >
              Add Achievement
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 100, // Above bottom navigation
            right: 16,
          }}
          onClick={() => setOpenDialog(true)}
        >
          <AddIcon />
        </Fab>
      </Container>
    </Layout>
  );
};
