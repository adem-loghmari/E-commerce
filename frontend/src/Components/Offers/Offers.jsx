import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import exclusive_image from '../Assets/exclusive_image.png';

const perks = ['Free shipping on all orders', 'Exclusive member prices', '30-day easy returns'];

const Offers = () => {
  return (
    <Box component="section" sx={{ width: '100%', py: { xs: 6, md: 10 }, bgcolor: '#f8fafc' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #2e1065 100%)',
            position: 'relative',
            boxShadow: '0 24px 80px rgba(99,102,241,0.2)',
          }}
        >
          {/* Background decorations */}
          <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <Box sx={{
              position: 'absolute', top: '-20%', left: '20%',
              width: 400, height: 400, borderRadius: '50%',
              background: 'rgba(99,102,241,0.15)', filter: 'blur(80px)',
            }} />
            <Box sx={{
              position: 'absolute', bottom: '-20%', right: '15%',
              width: 300, height: 300, borderRadius: '50%',
              background: 'rgba(236,72,153,0.1)', filter: 'blur(60px)',
            }} />
            <Box sx={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }} />
          </Box>

          <Grid container alignItems="stretch">
            <Grid item xs={12} md={6} sx={{ p: { xs: 4, md: 6, lg: 8 }, position: 'relative', zIndex: 1 }}>
              <Chip
                icon={<LocalOfferIcon sx={{ fontSize: '15px !important', color: '#fbbf24 !important' }} />}
                label="Best Sellers · Limited Time"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(251,191,36,0.1)',
                  color: '#fbbf24',
                  border: '1px solid rgba(251,191,36,0.25)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  height: 30,
                }}
              />
              <Typography
                variant="h2"
                sx={{ color: '#f8fafc', fontWeight: 900, lineHeight: 1.1, mb: 0.5 }}
              >
                Exclusive
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  lineHeight: 1.1,
                  mb: 3,
                  background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                Offer For You
              </Typography>
              <Typography sx={{ color: 'rgba(248,250,252,0.6)', mb: 3.5, lineHeight: 1.7, fontSize: '0.9375rem' }}>
                Only on our best-selling products. Unbeatable prices on the styles everyone loves.
              </Typography>

              <Stack spacing={1.25} sx={{ mb: 4 }}>
                {perks.map((perk) => (
                  <Box key={perk} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 18, color: '#a5b4fc' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(248,250,252,0.7)', fontWeight: 500 }}>
                      {perk}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4, py: 1.625, borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  boxShadow: '0 8px 28px rgba(99,102,241,0.45)',
                  fontSize: '0.9375rem',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    boxShadow: '0 12px 36px rgba(99,102,241,0.55)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Check Now
              </Button>
            </Grid>

            <Grid
              item xs={12} md={6}
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
                pt: { xs: 0, md: 4 },
              }}
            >
              <Box
                component="img"
                src={exclusive_image}
                alt="exclusive offer"
                sx={{
                  maxWidth: { xs: 240, md: 360 },
                  maxHeight: { xs: 240, md: 380 },
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 24px 60px rgba(139,92,246,0.5))',
                  transform: { xs: 'none', md: 'translateY(-16px)' },
                  display: 'block',
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Offers;
