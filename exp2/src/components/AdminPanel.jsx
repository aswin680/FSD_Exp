import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';

function AdminPanel() {
  return (
    <Box style={{ padding: '50px 20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container>
        <Typography variant="h4" gutterBottom>Admin Panel</Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginBottom: '20px' }}>
          User Management
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#e0e0e0' }}>
                <TableCell><strong>User</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Palisetty Sanjay Kumar</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rahul</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Blocked</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default AdminPanel;
