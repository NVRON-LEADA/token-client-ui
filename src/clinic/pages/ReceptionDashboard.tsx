import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Alert
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';
import axios from 'axios';
import io from 'socket.io-client';

const API_URL = 'https://token-api-0z44.onrender.com';

interface Token {
  _id: string;
  tokenNumber: number;
  patientName: string;
  phoneNumber: string;
  status: string;
  isVIP: boolean;
  notes?: string;
}

interface EditDialogState {
  open: boolean;
  token: Token | null;
}

interface EditFormState {
  patientName: string;
  phoneNumber: string;
  isVIP: boolean;
  notes: string;
}

const ReceptionDashboard: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editDialog, setEditDialog] = useState<EditDialogState>({
    open: false,
    token: null
  });
  const [editForm, setEditForm] = useState<EditFormState>({
    patientName: '',
    phoneNumber: '',
    isVIP: false,
    notes: ''
  });

  useEffect(() => {
    const socket = io(API_URL);

    socket.on('tokenUpdate', () => {
      fetchTokens();
    });

    socket.on('tokenDelete', () => {
      fetchTokens();
    });

    socket.on('newToken', () => {
      fetchTokens();
    });

    fetchTokens();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Token[]>(`${API_URL}/api/tokens`);
      setTokens(response.data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching tokens:', err);
      setError('Error fetching tokens');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (token: Token) => {
    setEditForm({
      patientName: token.patientName,
      phoneNumber: token.phoneNumber,
      isVIP: token.isVIP,
      notes: token.notes || ''
    });
    setEditDialog({
      open: true,
      token
    });
  };

  const handleEditClose = () => {
    setEditDialog({
      open: false,
      token: null
    });
  };

  const handleEditSubmit = async () => {
    if (!editDialog.token) return;
    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/tokens/${editDialog.token._id}`, editForm);
      handleEditClose();
      fetchTokens();
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error updating token');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteToken = async (tokenId: string) => {
    if (window.confirm('Are you sure you want to delete this token?')) {
      setLoading(true);
      try {
        await axios.delete(`${API_URL}/api/tokens/${tokenId}`);
        fetchTokens();
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error deleting token');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleVIP = async (token: Token) => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/tokens/${token._id}`, {
        ...token,
        isVIP: !token.isVIP
      });
      fetchTokens();
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error updating VIP status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reception Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token #</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>VIP</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token._id}>
                <TableCell>{token.tokenNumber}</TableCell>
                <TableCell>{token.patientName}</TableCell>
                <TableCell>{token.phoneNumber}</TableCell>
                <TableCell>{token.status}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleToggleVIP(token)}
                    color={token.isVIP ? 'secondary' : 'default'}
                    disabled={loading}
                  >
                    {token.isVIP ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>{token.notes}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEditClick(token)}
                    color="primary"
                    disabled={loading}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteToken(token._id)}
                    color="error"
                    disabled={loading}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {loading && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={handleEditClose}>
        <DialogTitle>Edit Token</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Patient Name"
              value={editForm.patientName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditForm({ ...editForm, patientName: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Phone Number"
              value={editForm.phoneNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditForm({ ...editForm, phoneNumber: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Notes"
              value={editForm.notes}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditForm({ ...editForm, notes: e.target.value })
              }
              fullWidth
              multiline
              rows={3}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={editForm.isVIP}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditForm({ ...editForm, isVIP: e.target.checked })
                  }
                />
              }
              label="VIP Patient"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} disabled={loading}>Cancel</Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReceptionDashboard;
