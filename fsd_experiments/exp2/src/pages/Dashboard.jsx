import React from 'react';
import { Box, Card, CardContent, CardHeader, Grid, Typography, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import { Activity, Users, DollarSign, ArrowUpRight } from 'lucide-react';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StatIconBox = styled(Box)(({ theme, color }) => ({
  backgroundColor: `${color}20`,
  color: color,
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Dashboard = () => {
  const theme = useTheme();

  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', icon: <DollarSign />, color: theme.palette.primary.main, trend: '+20.1%' },
    { title: 'Active Users', value: '2,350', icon: <Users />, color: '#10b981', trend: '+15.2%' },
    { title: 'System Health', value: '98.9%', icon: <Activity />, color: '#8b5cf6', trend: '+2.4%' },
    { title: 'New Subscriptions', value: '1,200', icon: <ArrowUpRight />, color: '#f59e0b', trend: '+8.1%' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>Dashboard Overview</Typography>
      
      {/* Auto-adjusting Grid using Mui Grid for different breakpoints */}
      <Grid container spacing={3}>
        {stats.map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <StatIconBox color={stat.color}>
                    {stat.icon}
                  </StatIconBox>
                </Box>
                <Typography variant="body2" sx={{ color: 'success.main', display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
                  <ArrowUpRight size={16} /> {stat.trend} from last month
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={8}>
          <StyledCard>
             <CardHeader title="Revenue Overview" subheader="Monthly performance metric" />
             <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', bgcolor: 'background.default', borderRadius: 2, m: 2 }}>
                <Typography color="text.secondary">Chart Area (Integration pending)</Typography>
             </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <StyledCard>
            <CardHeader title="Recent Activity" subheader="Latest system events" />
            <CardContent>
              {[1, 2, 3, 4, 5].map((item) => (
                <Box key={item} sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>User login successful</Typography>
                    <Typography variant="caption" color="text.secondary">Just now</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
