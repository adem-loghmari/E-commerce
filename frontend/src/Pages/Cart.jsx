import React from 'react';
import { Container } from '@mui/material';
import CartItems from '../Components/CartItems/CartItems';

const Cart = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      <CartItems />
    </Container>
  );
};

export default Cart;