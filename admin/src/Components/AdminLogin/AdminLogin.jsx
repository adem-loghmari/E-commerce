import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.errors || 'Invalid credentials');
        return;
      }
      localStorage.setItem('admin-token', data.token);
      navigate('/');
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #2e1065 100%)',
        position: 'relative',
        overflow: 'hidden',
        p: 3,
      }}
    >
      {/* Ambient blobs */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: '15%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', filter: 'blur(80px)' }} />
        <Box sx={{ position: 'absolute', bottom: '10%', right: '8%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(139,92,246,0.15)', filter: 'blur(60px)' }} />
      </Box>

      <Box sx={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3.5 }}>
          <Box
            sx={{
              width: 64, height: 64, mx: 'auto', mb: 2, borderRadius: 3,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
            }}
          >
            <AdminPanelSettingsIcon sx={{ fontSize: 32, color: '#fff' }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900, mb: 0.5,
              background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            Shopper
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
            Admin Dashboard — Sign in to continue
          </Typography>
        </Box>

        <Card
          sx={{
            bgcolor: 'rgba(30, 41, 59, 0.95)',
            border: '1px solid rgba(248,250,252,0.08)',
            borderRadius: 3,
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(99,102,241,0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Username"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  autoFocus
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          sx={{ color: 'text.disabled', mr: -0.5 }}
                        >
                          {showPassword
                            ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} />
                            : <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.5, mt: 0.5, borderRadius: 2.5, fontSize: '0.9375rem' }}
                >
                  {loading
                    ? <CircularProgress size={22} sx={{ color: 'rgba(255,255,255,0.8)' }} />
                    : 'Sign In'
                  }
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminLogin;
