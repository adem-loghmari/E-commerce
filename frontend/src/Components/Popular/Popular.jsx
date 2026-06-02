import React from 'react';
import Item from '../Item/Item';
import useFetchProducts from '../../hooks/useFetchProducts';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const Popular = () => {
  const products = useFetchProducts('/api/popularinwomen');

  return (
    <Box component="section" sx={{ width: '100%', py: { xs: 7, md: 11 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Chip
            icon={<WhatshotIcon sx={{ color: '#f59e0b !important', fontSize: '16px !important' }} />}
            label="Trending Now"
            sx={{
              mb: 2.5,
              bgcolor: 'rgba(245,158,11,0.08)',
              color: '#d97706',
              border: '1px solid rgba(245,158,11,0.22)',
              fontWeight: 600,
              fontSize: '0.8rem',
              height: 30,
            }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5, color: 'text.primary' }}>
            Popular in Women
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 460, mx: 'auto', lineHeight: 1.7 }}>
            Discover our most-loved styles — the pieces everyone's reaching for this season.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {products.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Item
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Popular;
