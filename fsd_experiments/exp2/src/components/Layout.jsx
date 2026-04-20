import React, { useState } from 'react';
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Menu, Moon, Sun, LayoutDashboard, Settings, Home } from 'lucide-react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Layout = ({ toggleColorMode, mode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Landing', icon: <Home />, path: '/' },
    { text: 'Dashboard', icon: <LayoutDashboard />, path: '/dashboard' },
    { text: 'Admin Panel', icon: <Settings />, path: '/admin' },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          MUI App
        </Typography>
      </Toolbar>
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1, px: 2 }}>
            <ListItemButton 
              onClick={() => { navigate(item.path); if (isMobile) setMobileOpen(false); }}
              selected={location.pathname === item.path}
              sx={{ 
                borderRadius: 2,
                '&.Mui-selected': { bgcolor: `${theme.palette.primary.main}20` }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit', minWidth: 40 }}>
                {React.cloneElement(item.icon, { size: 20 })}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find(m => m.path === location.pathname)?.text || 'App'}
          </Typography>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === 'dark' ? <Sun /> : <Moon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: `1px solid ${theme.palette.divider}` },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, minHeight: '100vh', pt: 10 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
