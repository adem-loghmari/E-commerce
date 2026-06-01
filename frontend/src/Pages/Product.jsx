import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, CircularProgress, Alert } from '@mui/material';
import { ShopContext } from '../Context/ShopContext';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_products } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_products.find((item) => Number(productId) === item.id);

  if (!all_products || all_products.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', pt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ pt: 8, pb: 4 }}>
        <Container maxWidth="lg">
          <Alert severity="warning">Product not found. Please check the URL or go back to shop.</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 8, pb: 4 }}>
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </Box>
  );
};

export default Product;