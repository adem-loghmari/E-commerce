import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import upload_area from '../../assets/upload_area.svg';
import adminFetch from '../../utils/adminFetch';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
    stock: '',
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    setStatus({ type: '', msg: '' });
  };

  const Add_Product = async () => {
    if (!productDetails.name || !productDetails.new_price || !productDetails.old_price) {
      setStatus({ type: 'error', msg: 'Please fill in all required fields.' });
      return;
    }
    setLoading(true);
    setStatus({ type: '', msg: '' });
    try {
      let product = { ...productDetails };
      if (image) {
        const formData = new FormData();
        formData.append('product', image);
        const uploadResp = await adminFetch('/api/upload', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });
        const uploadData = await uploadResp.json();
        if (!uploadData.success) throw new Error('Image upload failed');
        product.image = uploadData.image_url;
      }
      const resp = await adminFetch('/api/addproduct', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const data = await resp.json();
      if (data.success) {
        setStatus({ type: 'success', msg: 'Product added successfully!' });
        setProductDetails({ name: '', image: '', category: 'women', new_price: '', old_price: '', stock: '' });
        setImage(null);
      } else {
        throw new Error('Failed to add product');
      }
    } catch (err) {
      setStatus({ type: 'error', msg: err.message || 'An error occurred.' });
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Add Product</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Fill in the details below to add a new product to your store.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: { xs: '100%', lg: 720 }, mx: 'auto' }}>
      <Card>
        <CardContent sx={{ p: 3 }}>
          {status.msg && (
            <Alert severity={status.type} sx={{ mb: 2.5, borderRadius: 2 }}>
              {status.msg}
            </Alert>
          )}

          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Product Title *"
              name="name"
              value={productDetails.name}
              onChange={changeHandler}
              placeholder="e.g. Summer Floral Dress"
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Original Price *"
                  name="old_price"
                  type="number"
                  value={productDetails.old_price}
                  onChange={changeHandler}
                  placeholder="0.00"
                  InputProps={{ startAdornment: <Typography sx={{ mr: 0.5, color: 'text.secondary', fontSize: '0.9rem' }}>$</Typography> }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Sale Price *"
                  name="new_price"
                  type="number"
                  value={productDetails.new_price}
                  onChange={changeHandler}
                  placeholder="0.00"
                  InputProps={{ startAdornment: <Typography sx={{ mr: 0.5, color: 'text.secondary', fontSize: '0.9rem' }}>$</Typography> }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={productDetails.category}
                  onChange={changeHandler}
                >
                  <MenuItem value="women">Women</MenuItem>
                  <MenuItem value="men">Men</MenuItem>
                  <MenuItem value="kid">Kids</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  name="stock"
                  type="number"
                  value={productDetails.stock}
                  onChange={changeHandler}
                  placeholder="0"
                />
              </Grid>
            </Grid>

            {/* Image upload */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.25, color: 'text.secondary' }}>
                Product Image
              </Typography>
              <Box
                component="label"
                htmlFor="file-input"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5,
                  height: 180,
                  border: '2px dashed',
                  borderColor: image ? 'primary.main' : 'rgba(248,250,252,0.15)',
                  borderRadius: 2.5,
                  cursor: 'pointer',
                  bgcolor: 'rgba(15,23,42,0.4)',
                  transition: 'all 0.2s',
                  overflow: 'hidden',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'rgba(99,102,241,0.06)',
                  },
                }}
              >
                {image ? (
                  <Box
                    component="img"
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', p: 1 }}
                  />
                ) : (
                  <>
                    <CloudUploadOutlinedIcon sx={{ fontSize: 36, color: 'text.disabled' }} />
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.light' }}>
                        Click to upload
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        PNG, JPG or WEBP (max 5MB)
                      </Typography>
                    </Box>
                  </>
                )}
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                />
              </Box>
              {image && (
                <Typography variant="caption" sx={{ color: 'success.light', mt: 0.75, display: 'block' }}>
                  ✓ {image.name}
                </Typography>
              )}
            </Box>

            <Button
              onClick={Add_Product}
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} sx={{ color: 'rgba(255,255,255,0.8)' }} /> : <AddBoxOutlinedIcon />}
              sx={{ borderRadius: 2.5, py: 1.5 }}
              fullWidth
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
      </Box>
    </Box>
  );
};

export default AddProduct;
