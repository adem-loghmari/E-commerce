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
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff7ed'),
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ maxWidth: 780, px: 3, textAlign: 'center' }}>
        <Chip
          icon={<LocalFireDepartmentIcon sx={{ color: 'inherit !important', fontSize: '16px !important' }} />}
          label="New Season — 2024 Collections"
          sx={{
            mb: 3.5,
            bgcolor: 'background.paper',
            color: 'primary.dark',
            border: '1px solid',
            borderColor: 'divider',
            fontWeight: 600,
            fontSize: '0.8125rem',
            px: 0.5,
            height: 32,
          }}
        />

        <Typography
          variant="h1"
          sx={{
            color: 'text.primary',
            fontWeight: 800,
            fontSize: { xs: '2.4rem', sm: '3.25rem', md: '4rem' },
            lineHeight: 1.06,
            mb: 1.5,
          }}
        >
          Discover Your{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            Perfect Style
          </Box>
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: 'text.secondary',
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
              px: 4, py: 1.5, fontSize: '1rem',
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
              px: 4, py: 1.375, fontSize: '1rem',
              color: 'text.primary',
              borderColor: 'text.primary',
              '&:hover': { borderColor: 'text.primary', bgcolor: 'action.hover' },
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
          sx={{ mt: 7, pt: 5, borderTop: '1px solid', borderColor: 'divider' }}
        >
          {[
            { value: '10K+', label: 'Products' },
            { value: '50K+', label: 'Happy Customers' },
            { value: '4.9★', label: 'Average Rating' },
          ].map(({ value, label }) => (
            <Box key={label} sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  color: 'text.primary',
                  fontWeight: 800,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {value}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mt: 0.25, display: 'block' }}>
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
