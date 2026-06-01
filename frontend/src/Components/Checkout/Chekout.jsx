import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { countries } from '../Assets/countries';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Checkout = () => {
  const { cartItems, getTotalCartAmount, getTotalCartItems, all_products, resetCart } = useContext(ShopContext);

  const [shippingInfo, setShippingInfo] = useState({ street: '', city: '', state: '', zipCode: '', country: 'US' });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const cartProducts = all_products.filter((product) => cartItems[product.id] > 0);
  const cartSnapshot = {};
  cartProducts.forEach((product) => { cartSnapshot[product.id] = cartItems[product.id]; });

  const handlePlaceOrder = async () => {
    if (!shippingInfo.street || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zipCode) {
      setError('Please fill in all required shipping fields');
      return;
    }
    if (!paymentMethod) { setError('Please select a payment method'); return; }

    setIsProcessing(true); setError('');
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) throw new Error('User not authenticated');

      const orderData = { cartSnapshot, total: getTotalCartAmount(), shippingAddress: shippingInfo, paymentMethod };
      const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json', 'auth-token': token }, body: JSON.stringify(orderData) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to place order');

      const successCartProducts = [...cartProducts];
      const successCartItems = { ...cartItems };
      resetCart();
      setOrderDetails({ ...data.order, displayProducts: successCartProducts, displayItems: successCartItems });
      setOrderSuccess(true);
    } catch (err) {
      console.error('Order error:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally { setIsProcessing(false); }
  };

  if (orderSuccess && orderDetails) {
    return (
      <Box sx={{ width: '100%', py: 6, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h2" color="success.main">✓</Typography>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>Order Placed Successfully!</Typography>
            <Typography sx={{ mt: 1 }}>Order ID: #{orderDetails.id}</Typography>

            <Box sx={{ mt: 3, textAlign: 'left' }}>
              <Typography variant="h6">Order Summary</Typography>
              <Box sx={{ mt: 2 }}>
                {orderDetails.displayProducts.map((product) => (
                  <Box key={product.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box component="img" src={product.image} alt={product.name} sx={{ height: 40 }} />
                      <Typography>{product.name} × {orderDetails.displayItems[product.id]}</Typography>
                    </Box>
                    <Typography>${(product.new_price * orderDetails.displayItems[product.id]).toFixed(2)}</Typography>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <Typography>Total:</Typography>
                <Typography>${orderDetails.total.toFixed(2)}</Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button component={Link} to="/orders" variant="contained">View Your Orders</Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 700 }}>Checkout</Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>Shipping Information</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Street Address*" name="street" value={shippingInfo.street} onChange={handleInputChange} fullWidth />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField label="City*" name="city" value={shippingInfo.city} onChange={handleInputChange} fullWidth />
                  <TextField label="State*" name="state" value={shippingInfo.state} onChange={handleInputChange} fullWidth />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField label="ZIP Code*" name="zipCode" value={shippingInfo.zipCode} onChange={handleInputChange} fullWidth />
                  <TextField select label="Country" name="country" value={shippingInfo.country} onChange={handleInputChange} SelectProps={{ native: true }} fullWidth>
                    {countries.map(({ country, code }) => (
                      <option key={code} value={code}>{country}</option>
                    ))}
                  </TextField>
                </Box>
              </Box>

              <Typography variant="h6" sx={{ mt: 3 }}>Payment Method</Typography>
              <FormControl>
                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                  <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                  <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>Your Order</Typography>
              <Paper variant="outlined" sx={{ p: 1 }}>
                {cartProducts.map((product) => (
                  <Box key={product.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box component="img" src={product.image} alt={product.name} sx={{ height: 48 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>{product.name}</Typography>
                        <Typography variant="caption">Qty: {cartItems[product.id]}</Typography>
                      </Box>
                    </Box>
                    <Typography>${(product.new_price * cartItems[product.id]).toFixed(2)}</Typography>
                  </Box>
                ))}
              </Paper>

              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>${getTotalCartAmount().toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Shipping:</Typography>
                  <Typography sx={{ color: 'success.main' }}>Free</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, mt: 1 }}>
                  <Typography>Total:</Typography>
                  <Typography>${getTotalCartAmount().toFixed(2)}</Typography>
                </Box>
              </Box>

              {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}

              <Button onClick={handlePlaceOrder} disabled={isProcessing || getTotalCartItems() === 0} variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Checkout;

