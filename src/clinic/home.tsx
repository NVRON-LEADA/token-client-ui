import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Alert
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QueueIcon from '@mui/icons-material/Queue';

const Home = () => {
  const [clinic, setClinic] = useState(null);
  const [error, setError] = useState('');

  // Extract subdomain from current host
  const host = window.location.hostname;
  const subdomain = host.split('.')[0];

  // Use the subdomain in your API call
  const apiUrl = `https://token-api-0z44.onrender.com/api/clinic/${subdomain}`;

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Clinic not found');
        }
        const data = await res.json();
        setClinic(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching clinic data:', err);
      }
    };

    fetchClinic();
  }, [apiUrl]);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 6,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Clinic Info or Error */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            {clinic ? (
              <>
                <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 600 }}>
                  Welcome to {clinic.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Plan: {clinic.plan} | Last Active:{' '}
                  {new Date(clinic.last_active_date).toLocaleDateString()}
                </Typography>
              </>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Typography variant="body1" color="text.secondary">
                Loading clinic data...
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Main Content */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <LocalHospitalIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#1976d2' }}
            >
              Leada Clinic Queue
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Streamline your clinic visits with our digital token system
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 4,
              flexWrap: 'wrap'
            }}
          >
            <Box sx={{ textAlign: 'center', maxWidth: 300 }}>
              <QueueIcon sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Get Your Token
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Skip the line and get your token online
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="/token"
                fullWidth
              >
                Get Token
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', maxWidth: 300 }}>
              <AccessTimeIcon sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Track Your Queue
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Monitor your position and estimated wait time
              </Typography>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/token"
                fullWidth
              >
                View Queue
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
