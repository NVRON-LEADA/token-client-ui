import React, { useState } from 'react';
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

interface MenuItem {
  text: string;
  path?: string;
  action?: () => void;
}

interface User {
  role?: string;
  // add other user properties if needed
}

const ClinicNavbar: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);


  let user: User = {};
  try {
    user = JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    user = {};
  }

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setDrawerOpen(false);

    if (user.role === 'doctor') {
      navigate('/clinic/doctor/login');
    } else if (user.role === 'receptionist') {
      navigate('/clinic/reception/login');
    } else {
      navigate('/clinic');
    }
  };

  const menuItems: MenuItem[] = [
    { text: 'Home', path: '/clinic/' },
    { text: 'Get Token', path: '/clinic/token' },
  ];


    if (user.role === 'doctor') {
      menuItems.push(
        { text: 'Doctor Dashboard', path: '/clinic/doctor' },
        { text: 'Logout', action: handleLogout }
      );
    } else if (user.role === 'receptionist') {
      menuItems.push(
        { text: 'Reception Dashboard', path: '/clinic/reception' },
        { text: 'Logout', action: handleLogout }
      );
    }
    else {
    menuItems.push(
      { text: 'Doctor Login', path: '/clinic/doctor/login' },
      { text: 'Reception Login', path: '/clinic/reception/login' }
    );
    }

  const drawer = (
    <List>
  {menuItems.map((item) => (
    <ListItem
      key={item.text}
      component={item.action ? 'div' : RouterLink}
      to={item.path || ''}
      onClick={item.action || (() => setDrawerOpen(false))}
      {...(!item.action && { button: true })}
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
              aria-label="menu"
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
                <Button key={item.text} color="inherit" onClick={item.action}>
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

export default ClinicNavbar;
