import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary:   { main: '#ea580c', light: '#fb923c', dark: '#c2410c', contrastText: '#ffffff' },
    secondary: { main: '#c2410c', light: '#ea580c', dark: '#9a3412', contrastText: '#ffffff' },
    success: { main: '#15803d' },
    error:   { main: '#dc2626' },
    warning: { main: '#d97706' },
    info:    { main: '#57534e' },
    background: mode === 'dark'
      ? { default: '#1c1917', paper: '#292524' }
      : { default: '#fafaf9', paper: '#ffffff' },
    text: mode === 'dark'
      ? { primary: '#f5f5f4', secondary: '#a8a29e' }
      : { primary: '#1c1917', secondary: '#78716c' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '3rem',    fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em' },
    h2: { fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2,  letterSpacing: '-0.025em' },
    h3: { fontSize: '1.875rem',fontWeight: 700, lineHeight: 1.3,  letterSpacing: '-0.02em' },
    h4: { fontSize: '1.5rem',  fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.015em' },
    h5: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    h6: { fontSize: '1.125rem',fontWeight: 600, lineHeight: 1.5 },
    body1:   { fontSize: '1rem',    lineHeight: 1.6 },
    body2:   { fontSize: '0.875rem',lineHeight: 1.5 },
    button:  { textTransform: 'none', fontWeight: 600, letterSpacing: '-0.01em' },
    overline:{ letterSpacing: '0.1em', fontWeight: 700, fontSize: '0.75rem' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8, textTransform: 'none', fontWeight: 600,
          fontSize: '0.9375rem',
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': { borderWidth: '1.5px' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
          boxShadow: 'none',
          border: mode === 'dark'
            ? '1px solid rgba(250,250,249,0.1)'
            : '1px solid rgba(28,25,23,0.1)',
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: theme.palette.background.default,
            transition: 'background-color 0.2s',
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ea580c' },
            '&.Mui-focused': { backgroundColor: theme.palette.background.paper },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ea580c', borderWidth: 2 },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'dark' ? 'rgba(250,250,249,0.12)' : 'rgba(28,25,23,0.12)',
          },
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.background.paper,
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 600, fontSize: '0.8125rem' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        rounded: { borderRadius: 12 },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === 'dark' ? 'rgba(250,250,249,0.08)' : 'rgba(28,25,23,0.08)',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: '#ea580c', color: '#ffffff',
          fontWeight: 700, fontSize: '0.7rem',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px !important',
          border: mode === 'dark'
            ? '1.5px solid rgba(250,250,249,0.12) !important'
            : '1.5px solid rgba(28,25,23,0.12) !important',
          fontWeight: 600, textTransform: 'none',
          '&.Mui-selected': {
            backgroundColor: '#ea580c',
            color: '#ffffff', borderColor: 'transparent !important',
            '&:hover': { backgroundColor: '#c2410c' },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '-0.01em' },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#ea580c',
          height: 2,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 10, fontWeight: 500 },
      },
    },
  },
});

export default getTheme;
