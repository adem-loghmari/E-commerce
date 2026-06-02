import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { ShopContext } from '../../Context/ShopContext';

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const discount =
    props.old_price && props.new_price
      ? Math.round((1 - props.new_price / props.old_price) * 100)
      : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(props.id);
  };

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 12px 40px rgba(99,102,241,0.14)',
          transform: 'translateY(-6px)',
          borderColor: 'rgba(99,102,241,0.18)',
        },
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      {/* Image area */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'background.default',
          aspectRatio: '4/3',
        }}
      >
        <Link
          to={`/product/${props.id}`}
          onClick={() => window.scrollTo(0, 0)}
          style={{ textDecoration: 'none', display: 'block', height: '100%' }}
        >
          <Box
            component="img"
            src={props.image}
            alt={props.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              p: 2,
              transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />
        </Link>

        {/* Discount badge */}
        {discount > 0 && (
          <Chip
            label={`-${discount}%`}
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: '#ef4444',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.7rem',
              height: 22,
              borderRadius: '6px',
              '& .MuiChip-label': { px: 1 },
            }}
          />
        )}

        {/* Hover action buttons */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.75,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(12px)',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Tooltip title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'} placement="left">
            <IconButton
              size="small"
              onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: '0 2px 10px rgba(15,23,42,0.12)',
                width: 32,
                height: 32,
                '&:hover': { bgcolor: 'background.paper', transform: 'scale(1.1)' },
                transition: 'transform 0.15s',
              }}
            >
              {wishlisted
                ? <FavoriteIcon sx={{ fontSize: 16, color: '#ef4444' }} />
                : <FavoriteBorderIcon sx={{ fontSize: 16, color: '#64748b' }} />
              }
            </IconButton>
          </Tooltip>
          <Tooltip title="Quick view" placement="left">
            <IconButton
              size="small"
              component={Link}
              to={`/product/${props.id}`}
              onClick={() => window.scrollTo(0, 0)}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: '0 2px 10px rgba(15,23,42,0.12)',
                width: 32,
                height: 32,
                '&:hover': { bgcolor: 'background.paper', transform: 'scale(1.1)' },
                transition: 'transform 0.15s',
              }}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: 16, color: '#64748b' }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Add to cart overlay */}
        <Box
          onClick={handleAddToCart}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: '#fff',
            py: 1.1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.75,
            cursor: 'pointer',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            letterSpacing: '-0.01em',
            userSelect: 'none',
            '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' },
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 16 }} />
          Add to Cart
        </Box>
      </Box>

      {/* Info area */}
      <CardContent sx={{ pt: 1.75, pb: '14px !important', px: 2, flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.4, mb: 0.75 }}
          noWrap
        >
          {props.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.875 }}>
          <Typography
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              fontSize: '1rem',
              lineHeight: 1,
            }}
          >
            ${props.new_price}
          </Typography>
          {props.old_price && (
            <Typography
              variant="caption"
              sx={{ color: 'text.disabled', textDecoration: 'line-through', fontWeight: 500, fontSize: '0.8rem' }}
            >
              ${props.old_price}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Item;
