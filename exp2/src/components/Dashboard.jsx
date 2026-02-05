import { Box, Typography, Grid, Paper, Container } from '@mui/material';

function Dashboard() {
  return (
    <Box style={{ padding: '50px 20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginBottom: '30px' }}>
          Overview of statistics
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="body1" color="textSecondary">Users</Typography>
              <Typography variant="h4">1,245</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="body1" color="textSecondary">Revenue</Typography>
              <Typography variant="h4">₹32,450</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="body1" color="textSecondary">Active Sessions</Typography>
              <Typography variant="h4">87</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
