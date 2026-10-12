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
    <Box component="section" sx={{ width: '100%', py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff7ed'),
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Grid container alignItems="stretch">
            <Grid item xs={12} md={6} sx={{ p: { xs: 4, md: 6, lg: 8 } }}>
              <Chip
                icon={<LocalOfferIcon sx={{ fontSize: '15px !important', color: 'inherit !important' }} />}
                label="Best Sellers · Limited Time"
                sx={{
                  mb: 3,
                  bgcolor: 'background.paper',
                  color: 'primary.dark',
                  border: '1px solid',
                  borderColor: 'divider',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  height: 30,
                }}
              />
              <Typography
                variant="h2"
                sx={{ color: 'text.primary', fontWeight: 800, lineHeight: 1.1, mb: 0.5 }}
              >
                Exclusive
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  color: 'primary.main',
                }}
              >
                Offer For You
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 3.5, lineHeight: 1.7, fontSize: '0.9375rem' }}>
                Only on our best-selling products. Unbeatable prices on the styles everyone loves.
              </Typography>

              <Stack spacing={1.25} sx={{ mb: 4 }}>
                {perks.map((perk) => (
                  <Box key={perk} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
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
                  px: 4, py: 1.5,
                  fontSize: '0.9375rem',
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
