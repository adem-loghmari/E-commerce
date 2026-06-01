import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: '72vh', md: '88vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #2e1065 100%)',
      }}
    >
      {/* Ambient blobs */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <Box sx={{
          position: 'absolute', top: '15%', left: '8%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'rgba(99,102,241,0.12)', filter: 'blur(90px)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: '5%', right: '5%',
          width: 380, height: 380, borderRadius: '50%',
          background: 'rgba(139,92,246,0.18)', filter: 'blur(70px)',
        }} />
        <Box sx={{
          position: 'absolute', top: '55%', left: '45%',
          width: 250, height: 250, borderRadius: '50%',
          background: 'rgba(236,72,153,0.08)', filter: 'blur(60px)',
        }} />
        {/* Grid overlay */}
        <Box sx={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </Box>

      <Box sx={{ maxWidth: 780, px: 3, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Chip
          icon={<LocalFireDepartmentIcon sx={{ color: '#fbbf24 !important', fontSize: '16px !important' }} />}
          label="New Season — 2024 Collections"
          sx={{
            mb: 3.5,
            bgcolor: 'rgba(251,191,36,0.1)',
            color: '#fbbf24',
            border: '1px solid rgba(251,191,36,0.25)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            px: 0.5,
            height: 32,
          }}
        />

        <Typography
          variant="h1"
          sx={{
            color: '#f8fafc',
            fontWeight: 900,
            fontSize: { xs: '2.6rem', sm: '3.75rem', md: '5rem' },
            lineHeight: 1.06,
            mb: 1.5,
          }}
        >
          Discover Your{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            Perfect Style
          </Box>
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: 'rgba(248,250,252,0.55)',
            fontWeight: 400,
            fontSize: { xs: '1rem', md: '1.2rem' },
            mb: 5,
            lineHeight: 1.65,
            maxWidth: 540,
            mx: 'auto',
          }}
        >
          Shop the latest collections for everyone. Premium quality, curated with care — delivered to your door.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
          <Button
            href="#new-collection"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4.5, py: 1.75, fontSize: '1rem', borderRadius: 3,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 8px 32px rgba(99,102,241,0.45)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                boxShadow: '0 12px 40px rgba(99,102,241,0.6)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Shop Now
          </Button>
          <Button
            component="a"
            href="/womens"
            variant="outlined"
            size="large"
            sx={{
              px: 4.5, py: 1.625, fontSize: '1rem', borderRadius: 3,
              color: 'rgba(248,250,252,0.8)',
              borderColor: 'rgba(248,250,252,0.2)',
              borderWidth: '1.5px',
              background: 'transparent',
              boxShadow: 'none',
              '&:hover': {
                borderColor: 'rgba(248,250,252,0.5)',
                bgcolor: 'rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.06)',
                transform: 'translateY(-2px)',
                boxShadow: 'none',
              },
            }}
          >
            Explore Women's
          </Button>
        </Stack>

        {/* Stats row */}
        <Stack
          direction="row"
          spacing={{ xs: 3, sm: 6 }}
          justifyContent="center"
          sx={{ mt: 7, pt: 5, borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          {[
            { value: '10K+', label: 'Products' },
            { value: '50K+', label: 'Happy Customers' },
            { value: '4.9★', label: 'Average Rating' },
          ].map(({ value, label }) => (
            <Box key={label} sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  color: '#f8fafc',
                  fontWeight: 800,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {value}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(248,250,252,0.4)', fontWeight: 500, mt: 0.25, display: 'block' }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Hero;
