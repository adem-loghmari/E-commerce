import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Stack,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('Login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success === true) {
        localStorage.setItem('auth-token', data.token);
        if (data.name) localStorage.setItem('user-name', data.name);
        navigate('/');
      } else {
        setError(data.errors || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.success === true) {
        localStorage.setItem('auth-token', data.token);
        if (data.name) localStorage.setItem('user-name', data.name);
        navigate('/');
      } else {
        setError(data.errors || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === 'Sign Up') {
      if (!formData.username || !formData.email || !formData.phone || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }
    }
    state === 'Login' ? login() : signup();
  };

  const isSignUp = state === 'Sign Up';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #2e1065 100%)',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient blobs */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: '20%', left: '10%', width: 350, height: 350, borderRadius: '50%', background: 'rgba(99,102,241,0.12)', filter: 'blur(80px)' }} />
        <Box sx={{ position: 'absolute', bottom: '15%', right: '8%', width: 280, height: 280, borderRadius: '50%', background: 'rgba(139,92,246,0.15)', filter: 'blur(60px)' }} />
      </Box>

      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5,
            }}
          >
            SHOPPER
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </Typography>
        </Box>

        <Card
          sx={{
            boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(99,102,241,0.15)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.98)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {/* Tab toggle */}
            <Box
              sx={{
                display: 'flex',
                bgcolor: 'background.default',
                borderRadius: 2.5,
                p: 0.5,
                mb: 3.5,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {['Login', 'Sign Up'].map((tab) => (
                <Button
                  key={tab}
                  fullWidth
                  onClick={() => { setState(tab); setError(''); }}
                  sx={{
                    borderRadius: 2,
                    py: 0.875,
                    background: state === tab
                      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                      : 'transparent',
                    color: state === tab ? '#fff' : 'text.secondary',
                    boxShadow: state === tab ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
                    '&:hover': {
                      background: state === tab
                        ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
                        : 'rgba(99,102,241,0.06)',
                      transform: 'none',
                      boxShadow: state === tab ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
                    },
                    transition: 'all 0.2s ease',
                    fontSize: '0.9rem',
                    fontWeight: state === tab ? 700 : 500,
                  }}
                >
                  {tab}
                </Button>
              ))}
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {isSignUp && (
                  <TextField
                    fullWidth
                    name="username"
                    value={formData.username}
                    onChange={changeHandler}
                    label="Full Name"
                    placeholder="John Doe"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />
                )}
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={changeHandler}
                  label="Email Address"
                  placeholder="you@example.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
                {isSignUp && (
                  <TextField
                    fullWidth
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={changeHandler}
                    label="Phone Number"
                    placeholder="+1 (555) 000-0000"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />
                )}
                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={changeHandler}
                  label="Password"
                  placeholder={isSignUp ? 'Minimum 6 characters' : ''}
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
                  required
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.5, mt: 0.5, borderRadius: 2.5, fontSize: '0.9375rem' }}
                >
                  {loading ? (
                    <CircularProgress size={22} sx={{ color: 'rgba(255,255,255,0.8)' }} />
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </Button>
              </Stack>
            </Box>

            <FormControlLabel
              control={<Checkbox size="small" color="primary" defaultChecked sx={{ p: 0.75 }} />}
              label={
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  I agree to the{' '}
                  <Typography component="span" variant="caption" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>
                    Terms of Service
                  </Typography>
                  {' '}and{' '}
                  <Typography component="span" variant="caption" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>
                    Privacy Policy
                  </Typography>
                </Typography>
              }
              sx={{ mt: 2, alignItems: 'flex-start' }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginSignUp;
