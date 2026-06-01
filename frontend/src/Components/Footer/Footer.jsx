import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../Assets/logo.png';

const footerColumns = {
  Company: ['About Us', 'Careers', 'Press', 'Blog'],
  Support: ['FAQ', 'Shipping Info', 'Returns', 'Contact Us'],
  Legal: ['Privacy Policy', 'Terms of Use', 'Cookie Policy'],
};

const shopLinks = [
  { label: "Men's", to: '/mens' },
  { label: "Women's", to: '/womens' },
  { label: "Kids'", to: '/kids' },
  { label: 'New Arrivals', to: '/#new-collection' },
];

const socialIcons = [
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: TwitterIcon, label: 'Twitter' },
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: YouTubeIcon, label: 'YouTube' },
];

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#0f172a', color: 'rgba(255,255,255,0.65)', pt: { xs: 6, md: 9 }, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              <img src={logo} alt="logo" style={{ height: 38, borderRadius: 8 }} />
              <Typography variant="h6" sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                SHOPPER
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.8, opacity: 0.65, maxWidth: 280, mb: 3 }}>
              Your premier destination for fashion-forward clothing. Quality pieces for the whole family, delivered to your door.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialIcons.map(({ Icon, label }) => (
                <IconButton
                  key={label}
                  size="small"
                  aria-label={label}
                  sx={{
                    color: 'rgba(255,255,255,0.55)',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    width: 36,
                    height: 36,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'rgba(99,102,241,0.25)',
                      color: '#a5b4fc',
                      borderColor: 'rgba(99,102,241,0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 17 }} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Shop column */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="overline"
              sx={{ color: '#fff', fontWeight: 700, letterSpacing: '0.08em', display: 'block', mb: 2.5 }}
            >
              Shop
            </Typography>
            <Stack spacing={1.75}>
              {shopLinks.map(({ label, to }) => (
                <Typography
                  key={label}
                  component={Link}
                  to={to}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'all 0.2s',
                    '&:hover': { color: '#a5b4fc', transform: 'translateX(4px)' },
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Dynamic columns */}
          {Object.entries(footerColumns).map(([title, links]) => (
            <Grid item xs={6} md={2} key={title}>
              <Typography
                variant="overline"
                sx={{ color: '#fff', fontWeight: 700, letterSpacing: '0.08em', display: 'block', mb: 2.5 }}
              >
                {title}
              </Typography>
              <Stack spacing={1.75}>
                {links.map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.55)',
                      cursor: 'pointer',
                      display: 'block',
                      transition: 'all 0.2s',
                      '&:hover': { color: '#a5b4fc', transform: 'translateX(4px)' },
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.08)' }} />

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}>
          <Typography variant="caption" sx={{ opacity: 0.45 }}>
            © 2024 SHOPPER. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((item) => (
              <Typography
                key={item}
                variant="caption"
                sx={{ opacity: 0.45, cursor: 'pointer', transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 } }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
