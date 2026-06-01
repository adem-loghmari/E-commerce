import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import logo from '../Assets/logo.png';
import { ShopContext } from '../../Context/ShopContext';
import SearchBar from '../Search/SearchBar';

const Navbar = () => {
  const location = useLocation();
  const { getTotalCartItems } = useContext(ShopContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', to: '/' },
    { label: 'Men', to: '/mens' },
    { label: 'Women', to: '/womens' },
    { label: 'Kids', to: '/kids' },
  ];

  const username = localStorage.getItem('user-name');
  const isLoggedIn = Boolean(localStorage.getItem('auth-token'));

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-name');
    window.location.replace('/');
  };

  const drawer = (
    <Box sx={{ width: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2.5, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <img src={logo} alt="logo" style={{ height: 34, borderRadius: 8 }} />
          <Typography variant="h6" sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            SHOPPER
          </Typography>
        </Box>
        <IconButton onClick={() => setMobileOpen(false)} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ px: 2, py: 2 }}>
        <SearchBar />
      </Box>

      <Divider />

      <List sx={{ px: 1.5, py: 1.5, flex: 1 }}>
        {navLinks.map((item) => (
          <ListItem key={item.to} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                bgcolor: isActive(item.to) ? 'rgba(99,102,241,0.08)' : 'transparent',
                color: isActive(item.to) ? 'primary.main' : 'text.primary',
                '&:hover': { bgcolor: 'rgba(99,102,241,0.08)', color: 'primary.main' },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: isActive(item.to) ? 700 : 500, fontSize: '0.9375rem' }}
              />
              {isActive(item.to) && (
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Button
          component={Link}
          to="/cart"
          startIcon={<ShoppingCartIcon />}
          variant="contained"
          fullWidth
          onClick={() => setMobileOpen(false)}
          sx={{ borderRadius: 2.5 }}
        >
          Cart ({getTotalCartItems()})
        </Button>

        {isLoggedIn ? (
          <>
            <Button
              component={Link}
              to="/orders"
              startIcon={<ReceiptLongIcon />}
              variant="outlined"
              fullWidth
              onClick={() => setMobileOpen(false)}
              sx={{ borderRadius: 2.5 }}
            >
              My Orders
            </Button>
            <Button
              component={Link}
              to="/profile"
              startIcon={<PersonIcon />}
              variant="outlined"
              fullWidth
              onClick={() => setMobileOpen(false)}
              sx={{ borderRadius: 2.5 }}
            >
              {username?.split(' ')[0] || 'Profile'}
            </Button>
            <Button
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              variant="outlined"
              color="error"
              fullWidth
              sx={{ borderRadius: 2.5 }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            fullWidth
            onClick={() => setMobileOpen(false)}
            sx={{ borderRadius: 2.5 }}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
        borderBottom: `1px solid ${scrolled ? 'rgba(15,23,42,0.08)' : 'rgba(15,23,42,0.04)'}`,
        boxShadow: scrolled ? '0 4px 24px rgba(15,23,42,0.06)' : 'none',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, gap: 2, minHeight: '70px !important' }}>
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', gap: 1.25, textDecoration: 'none', flexShrink: 0 }}
        >
          <img src={logo} alt="logo" style={{ height: 36, borderRadius: 8 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            SHOPPER
          </Typography>
        </Box>

        {/* Desktop Nav Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
          {navLinks.map((link) => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              disableRipple={false}
              sx={{
                color: isActive(link.to) ? 'primary.main' : 'text.secondary',
                fontWeight: isActive(link.to) ? 700 : 500,
                px: 1.75,
                py: 0.75,
                fontSize: '0.9375rem',
                position: 'relative',
                bgcolor: 'transparent',
                background: 'transparent',
                boxShadow: 'none !important',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 2,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isActive(link.to) ? '55%' : '0%',
                  height: '2px',
                  borderRadius: 1,
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  transition: 'width 0.25s ease',
                },
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'transparent',
                  background: 'transparent',
                  '&::after': { width: '55%' },
                },
                '&:hover.MuiButton-root': { transform: 'none' },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Search — grows to fill space */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: 1, maxWidth: 420, mx: 'auto' }}>
          <SearchBar />
        </Box>

        {/* Right actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto', flexShrink: 0 }}>
          {isLoggedIn ? (
            <>
              <Tooltip title={username || 'Profile'}>
                <IconButton
                  component={Link}
                  to="/profile"
                  sx={{ display: { xs: 'none', md: 'flex' }, p: 0.5 }}
                >
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                    }}
                  >
                    {(username?.[0] || 'U').toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Button
                variant="text"
                size="small"
                onClick={handleLogout}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  color: 'text.secondary',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  px: 1.5,
                  background: 'transparent',
                  boxShadow: 'none',
                  '&:hover': {
                    color: 'error.main',
                    background: 'rgba(239,68,68,0.06)',
                    transform: 'none',
                    boxShadow: 'none',
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="small"
              sx={{ display: { xs: 'none', md: 'flex' }, px: 2.5, py: 0.875, borderRadius: 2.5 }}
            >
              Sign In
            </Button>
          )}

          <IconButton
            component={Link}
            to="/cart"
            sx={{
              color: 'text.primary',
              bgcolor: 'rgba(15,23,42,0.04)',
              borderRadius: '12px',
              width: 40,
              height: 40,
              '&:hover': { bgcolor: 'rgba(99,102,241,0.1)', color: 'primary.main' },
              transition: 'all 0.2s',
            }}
          >
            <Badge badgeContent={getTotalCartItems()} color="primary" max={99}>
              <ShoppingCartIcon sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>

          <IconButton
            edge="end"
            sx={{
              display: { md: 'none' },
              color: 'text.primary',
              bgcolor: 'rgba(15,23,42,0.04)',
              borderRadius: '12px',
              width: 40,
              height: 40,
              '&:hover': { bgcolor: 'rgba(99,102,241,0.1)', color: 'primary.main' },
            }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { borderRadius: '16px 0 0 16px' } }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
