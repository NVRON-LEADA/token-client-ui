import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
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
      navigate('/clinic/doctor/login');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const socket: Socket = io(API_URL, {
      auth: { token },
    });

    socket.on('queueUpdate', (data: any) => {
      fetchQueueStatus();
      if (data.action === 'next' && data.currentToken) {
        setSnackbar({
          open: true,
          message: `Now serving token #${data.currentToken.tokenNumber}`,
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
      setNextTokens(Array.isArray(response.data.waitingTokens) ? response.data.waitingTokens : []);
      setError(null);
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate('/clinic/doctor/login');
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
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate('/clinic/doctor/login');
      } else {
        setError(err.response?.data?.message || 'Error moving to next patient');
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
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate('/clinic/doctor/login');
      } else {
        setError(err.response?.data?.message || 'Error skipping token');
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4, px: isMobile ? 2 : 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>
        Doctor Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Main Layout Box replacing outer Grid container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 4,
        }}
      >
        {/* Current Patient Panel */}
        <Paper sx={{ flex: 1, p: isMobile ? 2 : 3 }}>
          <Typography variant="h5" gutterBottom>
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

        {/* Next Patients Panel */}
        <Paper sx={{ flex: 1, p: isMobile ? 2 : 3 }}>
          <Typography variant="h5" gutterBottom>
            Next Patients
          </Typography>

          {Array.isArray(nextTokens) && nextTokens.length > 0 ? (
            // Replace nested Grid container with Box flex wrap
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {nextTokens.map((token) => (
                <Box
                  key={token._id}
                  sx={{
                    flexBasis: isMobile ? '100%' : 'calc(50% - 16px)',
                    border: '1px solid #ddd',
                    borderRadius: 1,
                  }}
                >
                  <Card elevation={0} sx={{ boxShadow: 'none' }}>
                    <CardContent>
                      <Typography variant="h6">Token #{token.tokenNumber}</Typography>
                      <Typography variant="body2">{token.patientName}</Typography>
                      {token.isVIP && (
                        <Typography color="secondary" variant="caption">
                          VIP
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No patients waiting
            </Typography>
          )}
        </Paper>
      </Box>

      {/* Buttons Section */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          mt: 4,
        }}
      >
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
