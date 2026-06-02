import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import { ShopContext } from '../../Context/ShopContext';
import Breadcrums from '../Breadcrums/Breadcrums';

const ProductDisplay = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const [selectedImg, setSelectedImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useContext(ShopContext);

  const discount = product?.old_price && product?.new_price
    ? Math.round((1 - product.new_price / product.old_price) * 100)
    : 0;

  const thumbnails = [product?.image, product?.image, product?.image, product?.image];

  return (
    <Box component="section" sx={{ width: '100%', bgcolor: 'background.default', py: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <Breadcrums product={product} />

        <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden', mt: 2 }}>
          <Grid container>
            {/* Left: Images */}
            <Grid item xs={12} md={5} sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'background.default', borderRight: { md: '1px solid' }, borderRightColor: { md: 'divider' } }}>
              <Box sx={{ display: 'flex', gap: 1.25, mb: 2.5, flexWrap: 'wrap' }}>
                {thumbnails.map((thumb, i) => (
                  <Box key={i} component="img" src={thumb} alt={`thumb-${i}`} onClick={() => setSelectedImg(i)}
                    sx={{
                      width: 60, height: 60, objectFit: 'contain', borderRadius: 2,
                      border: selectedImg === i ? '2px solid #6366f1' : '1.5px solid',
                      borderColor: selectedImg === i ? '#6366f1' : 'divider',
                      cursor: 'pointer', bgcolor: 'background.paper', p: 0.75,
                      transition: 'all 0.15s', '&:hover': { borderColor: '#8b5cf6' },
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ bgcolor: 'background.paper', borderRadius: 2.5, border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, aspectRatio: '1', overflow: 'hidden' }}>
                <Box component="img" src={product?.image} alt={product?.name}
                  sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.04)' } }}
                />
              </Box>
            </Grid>

            {/* Right: Product info */}
            <Grid item xs={12} md={7} sx={{ p: { xs: 2.5, md: 5 } }}>
              <Chip label={product?.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : 'Fashion'} size="small"
                sx={{ mb: 2, bgcolor: 'rgba(99,102,241,0.08)', color: 'primary.main', fontWeight: 600, borderRadius: '8px', fontSize: '0.8rem', border: '1px solid rgba(99,102,241,0.2)' }}
              />

              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, lineHeight: 1.25 }}>{product?.name}</Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}>
                <Rating value={4.5} precision={0.5} readOnly size="small" sx={{ color: '#f59e0b' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>4.5</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>(122 reviews)</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, p: 2.5, bgcolor: 'background.default', borderRadius: 2.5, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h4" sx={{ fontWeight: 900, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  ${product?.new_price}
                </Typography>
                {product?.old_price && (
                  <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'text.disabled', fontWeight: 500 }}>${product?.old_price}</Typography>
                )}
                {discount > 0 && (
                  <Chip label={`${discount}% OFF`} size="small"
                    sx={{ bgcolor: 'rgba(16,185,129,0.1)', color: '#10b981', fontWeight: 700, fontSize: '0.8rem', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}
                  />
                )}
              </Box>

              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.75 }}>
                Crafted with premium materials for everyday comfort and style. A versatile piece that effortlessly elevates any outfit — from casual outings to special occasions.
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Select Size</Typography>
                  <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>Size guide</Typography>
                </Box>
                <ToggleButtonGroup value={size} exclusive onChange={(e, val) => val && setSize(val)} aria-label="size" sx={{ gap: 1, flexWrap: 'wrap' }}>
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                    <ToggleButton key={s} value={s} sx={{ minWidth: 48, height: 40, px: 1.5, fontSize: '0.8125rem', fontWeight: 600 }}>{s}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid', borderColor: 'divider', borderRadius: '12px', overflow: 'hidden' }}>
                  <IconButton size="small" onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    sx={{ borderRadius: 0, px: 1.25, py: 0.875, '&:hover': { bgcolor: 'rgba(99,102,241,0.08)', color: 'primary.main' } }}>
                    <RemoveIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <Typography sx={{ px: 2.5, minWidth: 40, textAlign: 'center', fontWeight: 700, fontSize: '0.9375rem', borderLeft: '1px solid', borderRight: '1px solid', borderColor: 'divider', lineHeight: '36px' }}>
                    {quantity}
                  </Typography>
                  <IconButton size="small" onClick={() => setQuantity((q) => q + 1)}
                    sx={{ borderRadius: 0, px: 1.25, py: 0.875, '&:hover': { bgcolor: 'rgba(99,102,241,0.08)', color: 'primary.main' } }}>
                    <AddIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>

                <Button variant="contained" size="large" startIcon={<ShoppingCartIcon />} onClick={() => addToCart(product.id, quantity)} sx={{ flex: 1, minWidth: 180, borderRadius: 2.5, py: 1.375 }}>
                  Add to Cart
                </Button>

                <Tooltip title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}>
                  <IconButton onClick={() => setWishlisted(!wishlisted)}
                    sx={{ border: '1.5px solid', borderColor: 'divider', borderRadius: '12px', width: 46, height: 46, '&:hover': { borderColor: '#ef4444', bgcolor: 'rgba(239,68,68,0.06)' }, transition: 'all 0.2s' }}>
                    {wishlisted ? <FavoriteIcon sx={{ color: '#ef4444', fontSize: 20 }} /> : <FavoriteBorderIcon sx={{ fontSize: 20 }} />}
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, p: 2.5, bgcolor: 'background.default', borderRadius: 2.5, border: '1px solid', borderColor: 'divider', mb: 3 }}>
                {[
                  { icon: LocalShippingOutlinedIcon, text: 'Free Shipping' },
                  { icon: VerifiedOutlinedIcon,      text: '100% Authentic' },
                  { icon: CachedOutlinedIcon,        text: '30-Day Returns' },
                ].map(({ icon: Icon, text }) => (
                  <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                    <Icon sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>{text}</Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['Fashion', product?.category, 'New Arrival'].filter(Boolean).map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined"
                    sx={{ borderRadius: '8px', fontSize: '0.75rem', height: 26, textTransform: 'capitalize', borderColor: 'divider', color: 'text.secondary' }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDisplay;
