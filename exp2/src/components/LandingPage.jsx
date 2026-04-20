import { Container, Grid, Typography, Paper, Box, Button } from '@mui/material';

function LandingPage() {
  return (
    <Box style={{ padding: '50px 20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="md">
        <Box style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Typography variant="h3" gutterBottom>Build Faster with Our Platform</Typography>
          <Typography variant="body1" color="textSecondary" style={{ marginBottom: '20px' }}>
            All-in-one solution for developers and teams.
          </Typography>
          <Button variant="contained" color="primary">Get Started</Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Fast Performance</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Secure Access</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Analytics</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default LandingPage;
