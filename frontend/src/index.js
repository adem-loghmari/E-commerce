import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from './theme';
import { ColorModeContext } from './context/ColorModeContext';

const Root = () => {
  const [mode, setMode] = useState(() => localStorage.getItem('colorMode') || 'light');

  const colorMode = useMemo(() => ({
    mode,
    toggle: () => setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('colorMode', next);
      return next;
    }),
  }), [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

reportWebVitals();
