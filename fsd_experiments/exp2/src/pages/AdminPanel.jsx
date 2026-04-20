import React from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemText, Typography, TextField, useTheme } from '@mui/material';

const AdminPanel = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Admin Configuration</Typography>
        <Button variant="contained" color="primary">Save Changes</Button>
      </Box>

      {/* Multi-Panel Layout collapsing into a single column on mobile */}
      <Grid container spacing={3}>
        
        {/* Left Column: Settings Navigation */}
        <Grid item xs={12} md={4} lg={3}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6">Settings Pages</Typography>
            </Box>
            <List>
              {['General', 'Security', 'Notifications', 'User Roles', 'Billing'].map((text, idx) => (
                <React.Fragment key={text}>
                  <ListItem button selected={idx === 0}>
                    <ListItemText primary={text} />
                  </ListItem>
                  {idx < 4 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Right Column: Setting Forms */}
        <Grid item xs={12} md={8} lg={9}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>General Settings</Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Site Name" 
                    defaultValue="MUI Application" 
                    variant="outlined" 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    label="Contact Email" 
                    defaultValue="admin@example.com" 
                    variant="outlined" 
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    multiline
                    rows={4}
                    label="Site Description" 
                    defaultValue="The most responsive UI ever built." 
                    variant="outlined" 
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                 <Button variant="contained">Update Configurations</Button>
                 <Button variant="outlined" color="error">Reset Defaults</Button>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Advanced Danger Zone</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Be careful, these changes are irreversible. 
              </Typography>
              <Button variant="contained" color="error">Purge Database</Button>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

export default AdminPanel;
