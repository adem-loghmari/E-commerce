import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';

const ModifyOrder = () => {
  const { id: routeId } = useParams();
  const [orderId, setOrderId] = useState(routeId || '');
  const [order, setOrder] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [newProductId, setNewProductId] = useState('');

  useEffect(() => {
    fetch('/api/allproducts').then((r) => r.json()).then(setAllProducts);
    if (routeId) handleFetch(routeId);
  }, [routeId]);

  const handleFetch = async (fetchId) => {
    setLoading(true);
    setStatus({ type: '', msg: '' });
    setOrder(null);
    try {
      const resp = await fetch(`/api/order/${fetchId || orderId}`);
      if (!resp.ok) throw new Error('Order not found');
      const data = await resp.json();
      const cartItems = Object.entries(data.cartSnapshot).map(([id, quantity]) => ({ id: parseInt(id), quantity }));
      setOrder({ ...data, cartItems });
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('shippingAddress')) {
      const field = name.split('.')[1];
      setOrder({ ...order, shippingAddress: { ...order.shippingAddress, [field]: value } });
    } else {
      setOrder({ ...order, [name]: value });
    }
  };

  const calculateTotal = (items) =>
    items.reduce((t, item) => t + (allProducts.find((p) => p.id === item.id)?.new_price || 0) * item.quantity, 0);

  const handleProductChange = (index, field, value) => {
    const updated = [...order.cartItems];
    updated[index] = { ...updated[index], [field]: parseInt(value) };
    setOrder({ ...order, cartItems: updated, total: calculateTotal(updated) });
  };

  const addProduct = (productId) => {
    if (!productId) return;
    const existing = order.cartItems.findIndex((i) => i.id === parseInt(productId));
    let updated;
    if (existing >= 0) {
      updated = [...order.cartItems];
      updated[existing].quantity += 1;
    } else {
      updated = [...order.cartItems, { id: parseInt(productId), quantity: 1 }];
    }
    setOrder({ ...order, cartItems: updated, total: calculateTotal(updated) });
    setNewProductId('');
    setShowProductSelector(false);
  };

  const removeProduct = (index) => {
    const updated = order.cartItems.filter((_, i) => i !== index);
    setOrder({ ...order, cartItems: updated, total: calculateTotal(updated) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });
    try {
      const cartSnapshot = order.cartItems.reduce((acc, item) => { acc[item.id] = item.quantity; return acc; }, {});
      const data = await fetch('/api/modifyOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, cartSnapshot }),
      }).then((r) => r.json());
      setStatus(data.success ? { type: 'success', msg: 'Order updated successfully!' } : { type: 'error', msg: data.message || 'Update failed.' });
    } catch {
      setStatus({ type: 'error', msg: 'Network error. Please try again.' });
    }
    setLoading(false);
  };

  const getProduct = (id) => allProducts.find((p) => p.id === id) || {};

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Modify Order</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Look up an order by ID and edit its details.</Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* ID search */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
            <TextField
              value={orderId} onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID" size="small" fullWidth
              onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} /></InputAdornment> }}
            />
            <Button
              variant="contained"
              onClick={() => { if (orderId && orderId !== routeId) window.location.href = `/modifyorder/${orderId}`; else handleFetch(); }}
              disabled={!orderId || loading}
              sx={{ borderRadius: 2, px: 2.5, flexShrink: 0 }}
            >
              Fetch
            </Button>
          </Box>

          {loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={28} /></Box>}

          {status.msg && !loading && (
            <Alert severity={status.type} sx={{ mb: 2.5, borderRadius: 2 }}>{status.msg}</Alert>
          )}

          {order && !loading && (
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2.5}>
                {/* Order details */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ bgcolor: 'rgba(15,23,42,0.5)', borderRadius: 2, p: 2.5, border: '1px solid rgba(248,250,252,0.06)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.light', fontSize: '0.9375rem' }}>
                      Order Details
                    </Typography>
                    <Stack spacing={1.75}>
                      <TextField label="Order ID" value={order.id} InputProps={{ readOnly: true }} size="small" fullWidth />
                      <TextField label="Customer Name" name="user_name" value={order.user_name || ''} onChange={handleChange} size="small" fullWidth />
                      <TextField label="Order Date" value={new Date(order.createdAt).toLocaleString()} InputProps={{ readOnly: true }} size="small" fullWidth />
                    </Stack>
                  </Box>
                </Grid>

                {/* Shipping */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ bgcolor: 'rgba(15,23,42,0.5)', borderRadius: 2, p: 2.5, border: '1px solid rgba(248,250,252,0.06)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.light', fontSize: '0.9375rem' }}>
                      Shipping Information
                    </Typography>
                    <Stack spacing={1.75}>
                      <TextField label="Street Address" name="shippingAddress.street" value={order.shippingAddress?.street || ''} onChange={handleChange} size="small" fullWidth />
                      <Grid container spacing={1.5}>
                        <Grid item xs={7}>
                          <TextField label="City" name="shippingAddress.city" value={order.shippingAddress?.city || ''} onChange={handleChange} size="small" fullWidth />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField label="ZIP" name="shippingAddress.zipCode" value={order.shippingAddress?.zipCode || ''} onChange={handleChange} size="small" fullWidth />
                        </Grid>
                      </Grid>
                    </Stack>
                  </Box>
                </Grid>

                {/* Status & payment */}
                <Grid item xs={12}>
                  <Box sx={{ bgcolor: 'rgba(15,23,42,0.5)', borderRadius: 2, p: 2.5, border: '1px solid rgba(248,250,252,0.06)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.light', fontSize: '0.9375rem' }}>
                      Order Status
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Status</InputLabel>
                          <Select name="status" value={order.status || ''} label="Status" onChange={handleChange}>
                            {['pending','processing','shipped','delivered','cancelled'].map((s) => (
                              <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>{s}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Payment Method</InputLabel>
                          <Select name="paymentMethod" value={order.paymentMethod || ''} label="Payment Method" onChange={handleChange}>
                            <MenuItem value="cash">Cash on Delivery</MenuItem>
                            <MenuItem value="card">Credit / Debit Card</MenuItem>
                            <MenuItem value="paypal">PayPal</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                {/* Order items */}
                <Grid item xs={12}>
                  <Box sx={{ bgcolor: 'rgba(15,23,42,0.5)', borderRadius: 2, p: 2.5, border: '1px solid rgba(248,250,252,0.06)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.light', fontSize: '0.9375rem' }}>
                        Order Items
                      </Typography>
                      <Button
                        size="small"
                        variant={showProductSelector ? 'outlined' : 'contained'}
                        color={showProductSelector ? 'inherit' : 'primary'}
                        startIcon={<AddIcon />}
                        onClick={() => setShowProductSelector(!showProductSelector)}
                        sx={{ borderRadius: 2 }}
                      >
                        {showProductSelector ? 'Cancel' : 'Add Item'}
                      </Button>
                    </Box>

                    {showProductSelector && (
                      <Box sx={{ mb: 2.5, p: 2, bgcolor: 'rgba(99,102,241,0.06)', borderRadius: 2, border: '1px solid rgba(99,102,241,0.15)' }}>
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Select Product</InputLabel>
                            <Select value={newProductId} label="Select Product" onChange={(e) => setNewProductId(e.target.value)}>
                              <MenuItem value="">— Select —</MenuItem>
                              {allProducts.map((p) => (
                                <MenuItem key={p.id} value={p.id}>{p.name} (${p.new_price})</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <Button variant="contained" disabled={!newProductId} onClick={() => addProduct(newProductId)} sx={{ borderRadius: 2, flexShrink: 0 }}>
                            Add
                          </Button>
                        </Box>
                      </Box>
                    )}

                    <Stack spacing={1.5}>
                      {order.cartItems.map((item, index) => {
                        const product = getProduct(item.id);
                        return (
                          <Box
                            key={`${item.id}-${index}`}
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: '44px 1fr 120px 80px 36px',
                              gap: 1.5,
                              alignItems: 'center',
                              p: 1.5,
                              bgcolor: 'rgba(15,23,42,0.4)',
                              borderRadius: 2,
                              border: '1px solid rgba(248,250,252,0.06)',
                            }}
                          >
                            <Avatar
                              src={product.image}
                              variant="rounded"
                              sx={{ width: 40, height: 40, bgcolor: 'rgba(15,23,42,0.5)' }}
                            />
                            <FormControl size="small" fullWidth>
                              <Select value={item.id} onChange={(e) => handleProductChange(index, 'id', e.target.value)}>
                                {allProducts.map((p) => (
                                  <MenuItem key={p.id} value={p.id} sx={{ fontSize: '0.8125rem' }}>{p.name}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <TextField
                              type="number" size="small"
                              label="Qty" inputProps={{ min: 1 }}
                              value={item.quantity}
                              onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                            />
                            <Typography variant="body2" sx={{ fontWeight: 700, color: 'warning.light', textAlign: 'right' }}>
                              ${product.new_price ? (product.new_price * item.quantity).toFixed(2) : '0.00'}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => removeProduct(index)}
                              sx={{ color: 'error.light', bgcolor: 'rgba(239,68,68,0.1)', borderRadius: 1.5, '&:hover': { bgcolor: 'rgba(239,68,68,0.2)' } }}
                            >
                              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Box>
                        );
                      })}
                    </Stack>

                    <Divider sx={{ mt: 2, mb: 1.5 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>Order Total:</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: 'success.light' }}>
                        ${order.total.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 3 }}>
                <Button variant="outlined" onClick={() => window.location.reload()} sx={{ borderRadius: 2 }}>Cancel</Button>
                <Button
                  type="submit" variant="contained" color="success"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={16} sx={{ color: 'rgba(255,255,255,0.8)' }} /> : <SaveOutlinedIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ModifyOrder;
