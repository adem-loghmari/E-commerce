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
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              mb: 0.5,
            }}
          >
            SHOPPER
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </Typography>
        </Box>

        <Card>
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
                    bgcolor: state === tab ? 'primary.main' : 'transparent',
                    color: state === tab ? '#fff' : 'text.secondary',
                    '&:hover': {
                      bgcolor: state === tab ? 'primary.dark' : 'action.hover',
                    },
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
