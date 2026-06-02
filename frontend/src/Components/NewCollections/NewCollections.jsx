import React from 'react';
import Item from '../Item/Item';
import useFetchProducts from '../../hooks/useFetchProducts';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const NewCollections = () => {
  const new_collections = useFetchProducts('/api/newcollections');

  return (
    <Box
      id="new-collection"
      component="section"
      sx={{ width: '100%', py: { xs: 7, md: 11 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: '15px !important' }} />}
            label="Just In"
            sx={{
              mb: 2.5,
              bgcolor: 'rgba(99,102,241,0.08)',
              color: 'primary.main',
              border: '1px solid rgba(99,102,241,0.2)',
              fontWeight: 600,
              fontSize: '0.8rem',
              height: 30,
            }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5, color: 'text.primary' }}>
            New Collections
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 460, mx: 'auto', lineHeight: 1.7 }}>
            Fresh arrivals straight from the runway — be the first to wear the latest styles.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {new_collections.map((item, i) => (
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

export default NewCollections;
