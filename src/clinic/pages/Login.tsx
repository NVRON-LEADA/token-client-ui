import React, { useState} from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://token-api-0z44.onrender.com';

interface LoginFormData {
  username: string;
  password: string;
}

interface User {
  role: string;
  // add more user fields here if needed
}

interface LoginResponse {
  token: string;
  user: User;
}

const DoctorLogin: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/api/auth/login`, formData);

      if (response.data.user.role !== 'doctor') {
        setError('Access denied. Only doctors can log in.');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/clinic/doctor');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error logging in');
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        mt: isMobile ? 4 : 8,
        px: isMobile ? 2 : 3
      }}
    >
      <Paper 
        sx={{ 
          p: isMobile ? 3 : 4,
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontSize: isMobile ? '1.5rem' : '2rem',
            mb: isMobile ? 2 : 3
          }}
        >
          Doctor Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
            size={isMobile ? "small" : "medium"}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            size={isMobile ? "small" : "medium"}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ 
              mt: isMobile ? 2 : 3,
              py: isMobile ? 1 : 1.5
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default DoctorLogin;
