import React from 'react';
import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Rocket, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '90vh', pt: 8, pb: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 12 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ animation: 'fadeIn 1s ease-in-out' }}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mb: 2, background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Next-Gen Experience
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.2rem', mb: 4 }}>
                Build lightning-fast, ultra-responsive user interfaces with Material UI and React. Discover the power of premium layouts today.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" size="large" onClick={() => navigate('/dashboard')} sx={{ py: 1.5, px: 4 }}>
                  Go to Dashboard
                </Button>
                <Button variant="outlined" size="large" onClick={() => navigate('/admin')} sx={{ py: 1.5, px: 4 }}>
                  Admin Panel
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                height: { xs: '300px', md: '500px' }, 
                background: `linear-gradient(135deg, ${theme.palette.primary.main}20, #8b5cf620)`, 
                borderRadius: 8,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.palette.mode === 'dark' ? '0 0 40px rgba(59, 130, 246, 0.1)' : '0 20px 40px rgba(0,0,0,0.05)'
              }}
            >
              <Box sx={{ textAlign: 'center', p: 4 }}>
                 <Typography variant="h4" color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <Rocket size={40} /> Lift Off!
                 </Typography>
                 <Typography color="text.secondary">Your stunning UI illustration here</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>Powerful Features</Typography>
          <Typography color="text.secondary">Everything you need to manage your application</Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 4, borderRadius: 4, bgcolor: 'background.paper', height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <Zap size={32} color={theme.palette.primary.main} />
              <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Lightning Fast</Typography>
              <Typography color="text.secondary">Optimized for extreme performance and smooth animations across devices.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 4, borderRadius: 4, bgcolor: 'background.paper', height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <Shield size={32} color="#10b981" />
              <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Secure Design</Typography>
              <Typography color="text.secondary">Enterprise grade layouts that enforce strict layout grids.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 4, borderRadius: 4, bgcolor: 'background.paper', height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <Rocket size={32} color="#8b5cf6" />
              <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Ready to Launch</Typography>
              <Typography color="text.secondary">Everything stacks perfectly on mobile and aligns on desktop.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
