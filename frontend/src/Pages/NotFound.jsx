import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const NotFound = () => (
  <Box component="section" sx={{ width: '100%', py: { xs: 6, md: 10 }, bgcolor: 'background.default', minHeight: '60vh' }}>
    <Container maxWidth="sm">
      <Paper elevation={0} sx={{ p: { xs: 5, md: 8 }, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
        <Typography sx={{ fontSize: { xs: '4.5rem', md: '6rem' }, fontWeight: 800, lineHeight: 1, color: 'primary.main', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 1.5 }}>
          Page not found
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
          <Button component={Link} to="/" variant="contained" size="large" sx={{ borderRadius: 2.5, px: 4 }}>
            Back to Shop
          </Button>
          <Button component={Link} to="/womens" variant="outlined" size="large" sx={{ borderRadius: 2.5, px: 4 }}>
            Browse Women&apos;s
          </Button>
        </Stack>
      </Paper>
    </Container>
  </Box>
);

export default NotFound;
