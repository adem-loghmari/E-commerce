import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const NAVBAR_HEIGHT = 64;
export const SIDEBAR_WIDTH = 260;

const Navbar = ({ onMobileToggle }) => {
  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    window.location.href = '/admin/login';
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ minHeight: `${NAVBAR_HEIGHT}px !important`, px: { xs: 2, md: 3 } }}>
        {/* Logo + brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 3 }}>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(99,102,241,0.35)',
            }}
          >
            <AdminPanelSettingsIcon sx={{ fontSize: 20, color: '#fff' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1, color: 'text.primary', letterSpacing: '-0.01em' }}>
              Shopper
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.65rem' }}>
              Admin Panel
            </Typography>
          </Box>
        </Box>

        {/* Accent bar */}
        <Box sx={{ flex: 1 }} />

        <Chip
          label="Live"
          size="small"
          sx={{
            mr: 2,
            bgcolor: 'rgba(16,185,129,0.15)',
            color: '#34d399',
            border: '1px solid rgba(16,185,129,0.25)',
            fontWeight: 700,
            fontSize: '0.7rem',
            height: 22,
            '& .MuiChip-label': { px: 1 },
          }}
        />

        {/* User area */}
        <Tooltip title="Logout">
          <Button
            onClick={handleLogout}
            startIcon={<LogoutIcon sx={{ fontSize: '18px !important' }} />}
            size="small"
            sx={{
              color: 'text.secondary',
              background: 'transparent',
              boxShadow: 'none',
              fontWeight: 500,
              fontSize: '0.8125rem',
              px: 1.5,
              '&:hover': {
                color: 'error.light',
                background: 'rgba(239,68,68,0.1)',
                transform: 'none',
                boxShadow: 'none',
              },
            }}
          >
            Logout
          </Button>
        </Tooltip>

        <Avatar
          sx={{
            ml: 1, width: 34, height: 34,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            fontSize: '0.875rem', fontWeight: 800,
          }}
        >
          A
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
