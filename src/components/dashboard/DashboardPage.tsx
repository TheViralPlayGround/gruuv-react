'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
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
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import { useAchievements } from '@/context/AchievementContext';
import { Layout } from '@/components/layout/Layout';
import { CreateAchievement } from '@/types/achievement';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { achievements, loading, error, addAchievement, updateEffort, deleteAchievement, getTodayEffort } = useAchievements();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<string | null>(null);
  const [newAchievement, setNewAchievement] = useState<CreateAchievement>({
    title: '',
    description: '',
    effort: 5,
  });

  const handleAddAchievement = async () => {
    try {
      await addAchievement(newAchievement);
      setNewAchievement({ title: '', description: '', effort: 5 });
      setOpenDialog(false);
    } catch (err) {
      console.error('Error adding achievement:', err);
    }
  };

  const handleEffortChange = async (achievementId: string, effort: number) => {
    try {
      await updateEffort(achievementId, effort);
    } catch (err) {
      console.error('Error updating effort:', err);
    }
  };

  const handleDeleteAchievement = async (achievementId: string) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await deleteAchievement(achievementId);
      } catch (err) {
        console.error('Error deleting achievement:', err);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="md">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Typography>Loading achievements...</Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, {user?.displayName || user?.email}!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track your daily progress and achievements
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {achievement.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {achievement.description}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Today's Effort: {getTodayEffort(achievement)}/10
                    </Typography>
                    <Slider
                      value={getTodayEffort(achievement)}
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
                    onClick={() => setEditingAchievement(achievement.id)}
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
          ))}
        </Box>

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

export default DashboardPage;
