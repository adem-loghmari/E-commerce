import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import GridViewIcon from '@mui/icons-material/GridView';

const MAX_RELATED = 4;

const RelatedProducts = ({ product }) => {
  const { all_products } = useContext(ShopContext);
  // Other products from the same category as the one being viewed.
  const related = all_products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, MAX_RELATED);

  if (related.length === 0) return null;

  return (
    <Box component="section" sx={{ width: '100%', py: { xs: 6, md: 9 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Chip
            icon={<GridViewIcon sx={{ fontSize: '15px !important' }} />}
            label="You May Also Like"
            sx={{
              mb: 2.5,
              bgcolor: 'rgba(234,88,12,0.08)',
              color: 'primary.main',
              border: '1px solid rgba(234,88,12,0.2)',
              fontWeight: 600,
              fontSize: '0.8rem',
              height: 30,
            }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary' }}>
            Related Products
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {related.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
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

export default RelatedProducts;
