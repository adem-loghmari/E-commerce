import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#ffffff',
    },
    success: { main: '#10b981' },
    error: { main: '#ef4444' },
    warning: { main: '#f59e0b' },
    info: { main: '#3b82f6' },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '3rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em' },
    h2: { fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.025em' },
    h3: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.02em' },
    h4: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.015em' },
    h5: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    h6: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '-0.01em' },
    overline: { letterSpacing: '0.1em', fontWeight: 700, fontSize: '0.75rem' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9375rem',
          transition: 'all 0.2s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
          },
          '&.Mui-disabled': {
            background: 'rgba(99,102,241,0.3)',
            color: 'rgba(255,255,255,0.6)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            transform: 'translateY(-1px)',
          },
        },
        containedSuccess: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.06)',
          border: '1px solid rgba(15, 23, 42, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.12), 0 2px 8px rgba(15, 23, 42, 0.08)',
            transform: 'translateY(-4px)',
            borderColor: 'rgba(99, 102, 241, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: '#f8fafc',
            transition: 'background-color 0.2s',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6366f1',
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6366f1',
              borderWidth: 2,
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(15, 23, 42, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 1px 0 rgba(15, 23, 42, 0.06)',
          color: '#0f172a',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.8125rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.06)',
        },
        elevation2: {
          boxShadow: '0 2px 8px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.08)',
        },
        elevation4: {
          boxShadow: '0 4px 16px rgba(15,23,42,0.08), 0 16px 40px rgba(15,23,42,0.1)',
        },
        elevation6: {
          boxShadow: '0 8px 24px rgba(15,23,42,0.1), 0 24px 56px rgba(15,23,42,0.12)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          fontWeight: 700,
          fontSize: '0.7rem',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px !important',
          border: '1.5px solid rgba(15,23,42,0.12) !important',
          fontWeight: 600,
          textTransform: 'none',
          transition: 'all 0.2s',
          '&.Mui-selected': {
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: '#ffffff',
            borderColor: 'transparent !important',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9375rem',
          letterSpacing: '-0.01em',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: 'all 0.15s',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
