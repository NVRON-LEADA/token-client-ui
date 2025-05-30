import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid,          // Make sure this is imported from @mui/material
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import axios from 'axios';
import io, { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://token-api-0z44.onrender.com';

interface Token {
  _id: string;
  tokenNumber: number;
  patientName: string;
  phoneNumber: string;
  isVIP?: boolean;
}

interface SnackbarState {
  open: boolean;
  message: string;
}

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentToken, setCurrentToken] = useState<Token | null>(null);
  const [nextTokens, setNextTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const socket: Socket = io(API_URL, {
      auth: {
        token
      }
    });

    socket.on('queueUpdate', (data: any) => {
      fetchQueueStatus();
      if (data.action === 'next') {
        setSnackbar({
          open: true,
          message: `Now serving token #${data.currentToken.tokenNumber}`
        });
      }
    });

    fetchQueueStatus();

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  const fetchQueueStatus = async () => {
    try {
      const response = await axios.get<{ currentToken: Token | null; waitingTokens: Token[] }>(
        `${API_URL}/api/queue/status`
      );
      setCurrentToken(response.data.currentToken);
      setNextTokens(response.data.waitingTokens);
    } catch (error: any) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Error fetching queue status');
      }
    }
  };

  const handleNextPatient = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put<{ message: string }>(`${API_URL}/api/queue/next`);
      if (response.data.message === 'No more tokens in queue') {
        setSnackbar({ open: true, message: 'No more patients in queue' });
      }
      await fetchQueueStatus();
    } catch (error: any) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Error moving to next patient');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSkipToken = async (tokenId: string) => {
    try {
      await axios.put(`${API_URL}/api/queue/skip/${tokenId}`);
      await fetchQueueStatus();
      setSnackbar({ open: true, message: 'Patient skipped' });
    } catch (error: any) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Error skipping token');
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4, px: isMobile ? 2 : 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>
        Doctor Dashboard
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={isMobile ? 2 : 4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: isMobile ? 2 : 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
              Current Patient
            </Typography>
            {currentToken ? (
              <Card>
                <CardContent>
                  <Typography 
                    variant="h3" 
                    color="primary" 
                    gutterBottom
                    sx={{ fontSize: isMobile ? '2rem' : '3rem' }}
                  >
                    Token #{currentToken.tokenNumber}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Patient: {currentToken.patientName}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Phone: {currentToken.phoneNumber}
                  </Typography>
                  {currentToken.isVIP && (
                    <Typography color="secondary" variant="body1">
                      VIP Patient
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No patient currently being served
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: isMobile ? 2 : 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
              Next Patients
            </Typography>
            <Grid container spacing={2}>
              {nextTokens.map((token) => (
                <Grid item xs={12} sm={6} key={token._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
                        Token #{token.tokenNumber}
                      </Typography>
                      <Typography variant="body2">
                        {token.patientName}
                      </Typography>
                      {token.isVIP && (
                        <Typography color="secondary" variant="caption">
                          VIP
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              {nextTokens.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    No patients waiting
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleNextPatient}
              disabled={loading || nextTokens.length === 0}
              fullWidth={isMobile}
            >
              {loading ? <CircularProgress size={24} /> : 'Next Patient'}
            </Button>
            {currentToken && (
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => handleSkipToken(currentToken._id)}
                fullWidth={isMobile}
              >
                Skip Current Patient
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default DoctorDashboard;
