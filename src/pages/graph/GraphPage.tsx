'use client';

import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAchievements } from '@/context/AchievementContext';
import { Layout } from '@/components/layout/Layout';

const GraphPage: React.FC = () => {
  const { achievements, loading } = useAchievements();

  // Transform achievements data for the chart
  const chartData = React.useMemo(() => {
    const dataMap = new Map<string, Record<string, number>>();
    
    achievements.forEach(achievement => {
      Object.entries(achievement.effortHistory).forEach(([date, effort]) => {
        if (!dataMap.has(date)) {
          dataMap.set(date, { date });
        }
        dataMap.get(date)![achievement.title] = effort;
      });
    });

    return Array.from(dataMap.values())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30); // Last 30 days
  }, [achievements]);

  const colors = [
    '#9C27B0', '#FF4081', '#3F51B5', '#4CAF50', '#FF9800',
    '#F44336', '#00BCD4', '#8BC34A', '#E91E63', '#795548'
  ];

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Typography>Loading chart data...</Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

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

        <Card>
          <CardContent>
            {chartData.length > 0 ? (
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis domain={[0, 10]} />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Legend />
                    {achievements.map((achievement, index) => (
                      <Line
                        key={achievement.id}
                        type="monotone"
                        dataKey={achievement.title}
                        stroke={colors[index % colors.length]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        connectNulls={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Box textAlign="center" sx={{ py: 4 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No data to display
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start tracking your achievements to see your progress here!
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default GraphPage;
