import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

// Define a custom type that supports either navigation or an action
type MenuItem = {
  text: string;
  path?: string;
  action?: () => void;
};

const ClinicNav = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isAuthenticated = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setDrawerOpen(false);

    if (user.role === 'doctor') {
      navigate('/doctor/login');
    } else if (user.role === 'reception') {
      navigate('/reception/login');
    } else {
      navigate('/');
    }
  };

  // Menu items for the drawer and nav bar
  const menuItems: MenuItem[] = [
    { text: 'Home', path: '/' },
    { text: 'Get Token', path: '/token' },
  ];

  if (isAuthenticated) {
    if (user.role === 'doctor') {
      menuItems.push(
        { text: 'Doctor Dashboard', path: '/doctor' },
        { text: 'Logout', action: handleLogout }
      );
    } else if (user.role === 'receptionist') {
      menuItems.push(
        { text: 'Reception Dashboard', path: '/reception' },
        { text: 'Logout', action: handleLogout }
      );
    }
  } else {
    menuItems.push(
      { text: 'Doctor Login', path: '/doctor/login' },
      { text: 'Reception Login', path: '/reception/login' }
    );
  }

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.text}
          component={item.path ? RouterLink : 'div'}
          to={item.path || ''}
          onClick={item.action || (() => setDrawerOpen(false))}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Leada Clinic Token System
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) =>
              item.action ? (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={item.action}
                >
                  {item.text}
                </Button>
              ) : (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path!}
                >
                  {item.text}
                </Button>
              )
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ClinicNav;
