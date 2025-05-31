import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import axios from 'axios';
import io from 'socket.io-client';

const API_URL = 'https://token-api-0z44.onrender.com';

// Define TypeScript interfaces for token and queue status
interface Token {
  _id: string;
  tokenNumber: number | string;
  isVIP?: boolean;
  // add other fields if needed
}

interface QueueStatus {
  currentToken: Token | null;
  waitingTokens: Token[];
}

interface TokenResponse {
  tokenNumber: number | string;
  // add other fields if needed
}

const PatientToken: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Form data state
  const [formData, setFormData] = useState<{ patientName: string; phoneNumber: string }>({
    patientName: '',
    phoneNumber: ''
  });

  // Token generated from API
  const [token, setToken] = useState<TokenResponse | null>(null);

  // Queue status and wait time
  const [queueStatus, setQueueStatus] = useState<QueueStatus | null>(null);
  const [waitTime, setWaitTime] = useState<number | null>(null);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = io(API_URL);

    socket.on('queueUpdate', () => {
      fetchQueueStatus();
    });

    // Initial fetches
    fetchQueueStatus();
    fetchWaitTime();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchQueueStatus = async () => {
    try {
      const response = await axios.get<QueueStatus>(`${API_URL}/api/queue/status`);
      setQueueStatus(response.data);
    } catch (error) {
      console.error('Error fetching queue status:', error);
    }
  };

  const fetchWaitTime = async () => {
    try {
      const response = await axios.get<{ averageWaitTime: number }>(`${API_URL}/api/queue/wait-time`);
      setWaitTime(response.data.averageWaitTime);
    } catch (error) {
      console.error('Error fetching wait time:', error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<TokenResponse>(`${API_URL}/api/tokens`, formData);
      setToken(response.data);
      fetchQueueStatus();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error generating token');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4, px: isMobile ? 2 : 3 }}>
      <Grid container spacing={isMobile ? 2 : 4}>
        {/* Token Generation Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: isMobile ? 2 : 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}
            >
              Get Your Token
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Patient Name"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                margin="normal"
                required
                size={isMobile ? 'small' : 'medium'}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                margin="normal"
                required
                size={isMobile ? 'small' : 'medium'}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loading}
                size={isMobile ? 'large' : 'large'}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate Token'}
              </Button>
            </form>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {token && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Your token number is: {token.tokenNumber}
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Queue Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: isMobile ? 2 : 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}
            >
              Current Queue Status
            </Typography>
            {queueStatus && (
              <>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
                    >
                      Currently Serving
                    </Typography>
                    <Typography
                      variant="h3"
                      color="primary"
                      sx={{ fontSize: isMobile ? '2.5rem' : '3.5rem' }}
                    >
                      {queueStatus.currentToken ? queueStatus.currentToken.tokenNumber : 'None'}
                    </Typography>
                  </CardContent>
                </Card>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
                >
                  Next in Queue
                </Typography>
                <Grid container spacing={2}>
                  {queueStatus.waitingTokens.map((token) => (
                    <Grid item xs={6} sm={4} key={token._id}>
                      <Card>
                        <CardContent sx={{ p: isMobile ? 1 : 2 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}
                          >
                            {token.tokenNumber}
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
                </Grid>

                {waitTime && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">
                      Estimated wait time: {waitTime} minutes
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientToken;
