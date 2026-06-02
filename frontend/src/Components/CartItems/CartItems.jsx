import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const CartItems = () => {
  const { all_products, cartItems, addToCart, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const cartProducts = all_products.filter((p) => cartItems[p.id] > 0);

  const handleDelete = (id) => {
    const qty = cartItems[id];
    for (let i = 0; i < qty; i++) removeFromCart(id);
  };

  return (
    <Box component="section" sx={{ width: '100%', py: { xs: 4, md: 6 }, bgcolor: 'background.default', minHeight: '60vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: 'text.primary' }}>
          Shopping Cart
          {cartProducts.length > 0 && (
            <Chip label={`${cartProducts.length} item${cartProducts.length > 1 ? 's' : ''}`} size="small"
              sx={{ ml: 2, bgcolor: 'rgba(99,102,241,0.1)', color: 'primary.main', fontWeight: 700, borderRadius: '8px', verticalAlign: 'middle' }}
            />
          )}
        </Typography>

        {cartProducts.length === 0 ? (
          <Paper elevation={0} sx={{ p: { xs: 6, md: 10 }, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>Your cart is empty</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>Looks like you haven't added anything yet.</Typography>
            <Button component={Link} to="/" variant="contained" size="large" sx={{ borderRadius: 2.5, px: 4 }}>Continue Shopping</Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
            {/* Cart items */}
            <Box sx={{ flex: 1 }}>
              <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
                {/* Header */}
                <Box sx={{
                  display: { xs: 'none', sm: 'grid' },
                  gridTemplateColumns: '2fr 1fr 1.5fr 1fr 40px',
                  px: 2.5, py: 1.75,
                  bgcolor: 'background.default',
                  borderBottom: '1px solid',
                  borderBottomColor: 'divider',
                }}>
                  {['Product', 'Price', 'Quantity', 'Total', ''].map((h) => (
                    <Typography key={h} variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {h}
                    </Typography>
                  ))}
                </Box>

                {cartProducts.map((p, idx) => (
                  <Box key={p.id}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1.5fr 1fr 40px' }, alignItems: 'center', gap: { xs: 1.5, sm: 0 }, px: 2.5, py: 2.5 }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Box component={Link} to={`/product/${p.id}`} sx={{ textDecoration: 'none', flexShrink: 0 }}>
                          <Box component="img" src={p.image} alt={p.name}
                            sx={{ width: 72, height: 72, objectFit: 'contain', bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider', p: 0.75 }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5, lineHeight: 1.4 }}>{p.name}</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{p.category}</Typography>
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ fontWeight: 600 }}>${p.new_price}</Typography>

                      <Box sx={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid', borderColor: 'divider', borderRadius: '10px', overflow: 'hidden', width: 'fit-content' }}>
                        <IconButton size="small" onClick={() => removeFromCart(p.id)}
                          sx={{ borderRadius: 0, px: 1, py: 0.5, color: 'text.secondary', '&:hover': { bgcolor: 'rgba(99,102,241,0.08)', color: 'primary.main' } }}>
                          <RemoveIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                        <Typography sx={{ px: 2, py: 0.5, minWidth: 32, textAlign: 'center', fontWeight: 700, fontSize: '0.875rem', lineHeight: '28px', borderLeft: '1px solid', borderRight: '1px solid', borderColor: 'divider' }}>
                          {cartItems[p.id]}
                        </Typography>
                        <IconButton size="small" onClick={() => addToCart(p.id, 1)}
                          sx={{ borderRadius: 0, px: 1, py: 0.5, color: 'text.secondary', '&:hover': { bgcolor: 'rgba(99,102,241,0.08)', color: 'primary.main' } }}>
                          <AddIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>

                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        ${(p.new_price * cartItems[p.id]).toFixed(2)}
                      </Typography>

                      <IconButton size="small" onClick={() => handleDelete(p.id)}
                        sx={{ color: 'text.disabled', '&:hover': { color: 'error.main', bgcolor: 'rgba(239,68,68,0.08)' }, transition: 'all 0.15s' }}>
                        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                    {idx < cartProducts.length - 1 && <Divider />}
                  </Box>
                ))}
              </Paper>
            </Box>

            {/* Summary panel */}
            <Box sx={{ width: { xs: '100%', lg: 340 }, flexShrink: 0 }}>
              <Stack spacing={2}>
                <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>Order Summary</Typography>
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Subtotal ({cartProducts.length} item{cartProducts.length > 1 ? 's' : ''})
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>${getTotalCartAmount().toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <LocalShippingOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Shipping</Typography>
                      </Box>
                      <Chip label="Free" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.1)', color: '#10b981', fontWeight: 700, fontSize: '0.75rem', height: 22, borderRadius: '6px' }} />
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>Total</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>${getTotalCartAmount().toFixed(2)}</Typography>
                    </Box>
                  </Stack>
                  <Button component={Link} to="/checkout" variant="contained" fullWidth size="large" sx={{ mt: 3, borderRadius: 2.5, py: 1.5 }}>
                    Proceed to Checkout
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, mt: 2 }}>
                    <LockOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>Secure checkout</Typography>
                  </Box>
                </Paper>

                <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>Have a promo code?</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField placeholder="Enter code" variant="outlined" size="small" fullWidth />
                    <Button variant="outlined" sx={{ flexShrink: 0, borderRadius: 2, px: 2 }}>Apply</Button>
                  </Box>
                </Paper>
              </Stack>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CartItems;
