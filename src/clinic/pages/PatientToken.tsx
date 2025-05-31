import React, { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import io from 'socket.io-client';

const API_URL = 'https://token-api-0z44.onrender.com';

interface Token {
  _id: string;
  tokenNumber: number | string;
  isVIP?: boolean;
}

interface QueueStatus {
  currentToken: Token | null;
  waitingTokens: Token[];
}

interface TokenResponse {
  tokenNumber: number | string;
}

const PatientToken: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({ patientName: '', phoneNumber: '' });
  const [token, setToken] = useState<TokenResponse | null>(null);
  const [queueStatus, setQueueStatus] = useState<QueueStatus | null>(null);
  const [waitTime, setWaitTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = io(API_URL);

    socket.on('queueUpdate', () => {
      fetchQueueStatus();
    });

    fetchQueueStatus();
    fetchWaitTime();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchQueueStatus = async () => {
    try {
      const res = await axios.get<QueueStatus>(`${API_URL}/api/queue/status`);
      setQueueStatus({
        currentToken: res.data.currentToken ?? null,
        waitingTokens: Array.isArray(res.data.waitingTokens) ? res.data.waitingTokens : [],
      });
    } catch (err) {
      console.error('Queue status error:', err);
    }
  };

  const fetchWaitTime = async () => {
    try {
      const res = await axios.get<{ averageWaitTime: number }>(`${API_URL}/api/queue/wait-time`);
      setWaitTime(res.data.averageWaitTime);
    } catch (err) {
      console.error('Wait time error:', err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<TokenResponse>(`${API_URL}/api/tokens`, formData);
      setToken(res.data);
      fetchQueueStatus();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error generating token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4, px: isMobile ? 2 : 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 4,
        }}
      >
        {/* Token Form */}
        <Paper sx={{ flex: 1, p: isMobile ? 2 : 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
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

        {/* Queue Info */}
        <Paper sx={{ flex: 1, p: isMobile ? 2 : 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
            Current Queue Status
          </Typography>

          {queueStatus ? (
            <>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
                    Currently Serving
                  </Typography>
                  <Typography
                    variant="h3"
                    color="primary"
                    sx={{ fontSize: isMobile ? '2.5rem' : '3.5rem' }}
                  >
                    {queueStatus.currentToken?.tokenNumber ?? 'None'}
                  </Typography>
                </CardContent>
              </Card>

              <Typography variant="h6" gutterBottom sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
                Next in Queue
              </Typography>

              {/* Replaced Grid with Box flex container */}
              {queueStatus.waitingTokens.length > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  {queueStatus.waitingTokens.map(token => (
                    <Box
                      key={token._id}
                      sx={{
                        flexBasis: 'calc(50% - 16px)',
                        '@media (min-width:600px)': {
                          flexBasis: 'calc(33.333% - 16px)',
                        },
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        p: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
                        {token.tokenNumber}
                      </Typography>
                      {token.isVIP && (
                        <Typography color="secondary" variant="caption">
                          VIP
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography>No tokens waiting in queue.</Typography>
              )}

              {waitTime !== null && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">Estimated wait time: {waitTime} minutes</Typography>
                </Box>
              )}
            </>
          ) : (
            <Typography>Loading queue status...</Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default PatientToken;
