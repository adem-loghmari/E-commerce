import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { clearAdminSession } from '../../utils/adminFetch';

export const NAVBAR_HEIGHT = 64;
export const SIDEBAR_WIDTH = 260;

const Navbar = () => {
  const handleLogout = () => {
    clearAdminSession();
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
              bgcolor: 'primary.main',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
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
            bgcolor: 'transparent',
            color: 'success.main',
            border: '1px solid',
            borderColor: 'divider',
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
              fontWeight: 500,
              fontSize: '0.8125rem',
              px: 1.5,
              '&:hover': {
                color: 'error.main',
                background: 'rgba(220,38,38,0.06)',
              },
            }}
          >
            Logout
          </Button>
        </Tooltip>

        <Avatar
          sx={{
            ml: 1, width: 34, height: 34,
            bgcolor: 'primary.main',
            fontSize: '0.875rem', fontWeight: 700,
          }}
        >
          A
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
