import { createTheme } from '@mui/material/styles';

const adminTheme = createTheme({
  palette: {
    mode: 'dark',
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
    success: { main: '#10b981', light: '#34d399' },
    error: { main: '#ef4444', light: '#f87171' },
    warning: { main: '#f59e0b', light: '#fbbf24' },
    info: { main: '#3b82f6', light: '#60a5fa' },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
      disabled: '#475569',
    },
    divider: 'rgba(248,250,252,0.08)',
    action: {
      hover: 'rgba(99,102,241,0.08)',
      selected: 'rgba(99,102,241,0.12)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.02em' },
    h3: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.015em' },
    h4: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.35 },
    h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
    h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '-0.01em' },
    caption: { fontSize: '0.8125rem' },
    overline: { letterSpacing: '0.1em', fontWeight: 700, fontSize: '0.75rem' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          transition: 'all 0.2s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            boxShadow: '0 6px 20px rgba(99,102,241,0.45)',
            transform: 'translateY(-1px)',
          },
          '&:active': { transform: 'translateY(0)' },
          '&.Mui-disabled': { background: 'rgba(99,102,241,0.2)', color: 'rgba(255,255,255,0.4)' },
        },
        containedError: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          boxShadow: '0 4px 14px rgba(239,68,68,0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            boxShadow: '0 6px 20px rgba(239,68,68,0.4)',
            transform: 'translateY(-1px)',
          },
        },
        containedSuccess: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': { borderWidth: '1.5px', bgcolor: 'rgba(99,102,241,0.08)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 12,
          border: '1px solid rgba(248,250,252,0.06)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.25s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        rounded: { borderRadius: 12 },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            bgcolor: 'rgba(15,23,42,0.5)',
            '& fieldset': { borderColor: 'rgba(248,250,252,0.1)' },
            '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.5)' },
            '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: 2 },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '& fieldset': { borderColor: 'rgba(248,250,252,0.1)' },
          '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.5)' },
          '&.Mui-focused fieldset': { borderColor: '#6366f1' },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#1e293b',
          borderBottom: '1px solid rgba(248,250,252,0.07)',
          boxShadow: '0 1px 0 rgba(0,0,0,0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#1e293b',
          border: 'none',
          borderRight: '1px solid rgba(248,250,252,0.06)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          mx: 1,
          transition: 'all 0.15s',
          '&.Mui-selected': {
            background: 'rgba(99,102,241,0.15)',
            color: '#818cf8',
            '&:hover': { background: 'rgba(99,102,241,0.2)' },
          },
          '&:hover': { background: 'rgba(99,102,241,0.08)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600, fontSize: '0.75rem' },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            bgcolor: 'rgba(15,23,42,0.6)',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#94a3b8',
            borderBottom: '1px solid rgba(248,250,252,0.08)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(248,250,252,0.06)',
          padding: '12px 16px',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background 0.15s',
          '&:hover': { background: 'rgba(99,102,241,0.05)' },
          '&:last-child td': { borderBottom: 'none' },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          border: '1px solid rgba(248,250,252,0.08)',
          backgroundImage: 'none',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 500 },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'rgba(248,250,252,0.07)' },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          fontWeight: 700,
        },
      },
    },
  },
});

export default adminTheme;
