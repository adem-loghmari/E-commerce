import React from 'react';
import { Box, Typography, Breadcrumbs, Container } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

const Breadcrums = ({ product }) => {
  if (!product) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.disabled', fontSize: 16 }} />}
        aria-label="breadcrumb"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            cursor: 'pointer',
            color: 'text.secondary',
            transition: 'color 0.15s',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <HomeIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.8125rem' }}>Home</Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            fontSize: '0.8125rem',
            color: 'text.secondary',
            cursor: 'pointer',
            '&:hover': { color: 'primary.main' },
            textTransform: 'capitalize',
          }}
        >
          {product?.category || 'Shop'}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            fontSize: '0.8125rem',
            color: 'primary.main',
            maxWidth: 240,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block',
          }}
        >
          {product?.name}
        </Typography>
      </Breadcrumbs>
    </Container>
  );
};

export default Breadcrums;
