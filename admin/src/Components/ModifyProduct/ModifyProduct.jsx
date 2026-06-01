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
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import upload_area from '../../assets/upload_area.svg';

const ModifyProduct = () => {
  const { id: routeId } = useParams();
  const [productId, setProductId] = useState(routeId || '');
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  useEffect(() => {
    if (routeId) { setProductId(routeId); handleFetch(routeId); }
  }, [routeId]);

  const handleFetch = async (fetchId) => {
    setLoading(true);
    setStatus({ type: '', msg: '' });
    setProduct(null);
    setImage(null);
    try {
      const resp = await fetch(`/api/product/${fetchId || productId}`);
      if (!resp.ok) throw new Error('Product not found');
      setProduct(await resp.json());
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    }
    setLoading(false);
  };

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });
    let updatedProduct = { ...product };
    if (image) {
      const formData = new FormData();
      formData.append('product', image);
      const uploadData = await fetch('/api/upload', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      }).then((r) => r.json());
      if (uploadData.success) updatedProduct.image = uploadData.image_url;
      else { setStatus({ type: 'error', msg: 'Image upload failed' }); setLoading(false); return; }
    }
    const data = await fetch('/api/modifyProduct', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    }).then((r) => r.json()).catch(() => ({ success: false }));
    setStatus(data.success
      ? { type: 'success', msg: 'Product updated successfully!' }
      : { type: 'error', msg: 'Update failed. Please try again.' }
    );
    setLoading(false);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Modify Product</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Search for a product by ID and edit its details.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: { xs: '100%', lg: 720 }, mx: 'auto' }}>
      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* ID search */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
            <TextField
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter Product ID"
              size="small"
              fullWidth
              onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                if (productId && productId !== routeId) window.location.href = `/modifyproduct/${productId}`;
                else handleFetch();
              }}
              disabled={!productId || loading}
              sx={{ borderRadius: 2, px: 2.5, flexShrink: 0 }}
            >
              Fetch
            </Button>
          </Box>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={28} />
            </Box>
          )}

          {status.msg && !loading && (
            <Alert severity={status.type} sx={{ mb: 2.5, borderRadius: 2 }}>
              {status.msg}
            </Alert>
          )}

          {product && !loading && (
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField fullWidth label="Product Name" name="name" value={product.name || ''} onChange={handleChange} />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth label="Original Price" name="old_price" type="number"
                      value={product.old_price || ''} onChange={handleChange}
                      InputProps={{ startAdornment: <Typography sx={{ mr: 0.5, color: 'text.secondary', fontSize: '0.9rem' }}>$</Typography> }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth label="Sale Price" name="new_price" type="number"
                      value={product.new_price || ''} onChange={handleChange}
                      InputProps={{ startAdornment: <Typography sx={{ mr: 0.5, color: 'text.secondary', fontSize: '0.9rem' }}>$</Typography> }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField fullWidth select label="Category" name="category" value={product.category || ''} onChange={handleChange}>
                      <MenuItem value="women">Women</MenuItem>
                      <MenuItem value="men">Men</MenuItem>
                      <MenuItem value="kid">Kids</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField fullWidth label="Sold" name="sold" type="number" value={product.sold || ''} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField fullWidth label="Stock" name="stock" type="number" value={product.stock || ''} onChange={handleChange} />
                  </Grid>
                </Grid>

                {/* Image */}
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.25, color: 'text.secondary' }}>
                    Product Image
                  </Typography>
                  <Box
                    component="label"
                    htmlFor="file-input"
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 2.5, p: 2,
                      border: '2px dashed',
                      borderColor: image ? 'primary.main' : 'rgba(248,250,252,0.15)',
                      borderRadius: 2, cursor: 'pointer',
                      bgcolor: 'rgba(15,23,42,0.4)',
                      '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(99,102,241,0.06)' },
                      transition: 'all 0.2s',
                    }}
                  >
                    <Box
                      component="img"
                      src={image ? URL.createObjectURL(image) : product.image || upload_area}
                      sx={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 1.5, flexShrink: 0 }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.light', mb: 0.25 }}>
                        {image ? image.name : 'Click to replace image'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        PNG, JPG or WEBP
                      </Typography>
                    </Box>
                    <input id="file-input" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} hidden />
                  </Box>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={18} sx={{ color: 'rgba(255,255,255,0.8)' }} /> : <SaveOutlinedIcon />}
                  sx={{ borderRadius: 2.5, py: 1.5 }}
                  fullWidth
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>
      </Box>
    </Box>
  );
};

export default ModifyProduct;
