import React, { useContext, useState } from 'react';
import {
  Box, Container, Typography, Button, Menu, MenuItem, Grid, Chip, Stack,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import TuneIcon from '@mui/icons-material/Tune';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

const sortOptions = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A–Z', value: 'alpha-asc' },
  { label: 'Name: Z–A', value: 'alpha-desc' },
];

const categoryLabels = {
  men: "Men's Collection",
  women: "Women's Collection",
  kid: "Kids' Collection",
};

const ShopCategory = ({ category, banner }) => {
  const { all_products } = useContext(ShopContext);
  const [sortAnchor, setSortAnchor] = useState(null);
  const [sort, setSort] = useState('price-asc');

  const filtered = all_products.filter((p) => p.category === category);
  let sorted = [...filtered];
  if (sort === 'price-asc')  sorted.sort((a, b) => a.new_price - b.new_price);
  if (sort === 'price-desc') sorted.sort((a, b) => b.new_price - a.new_price);
  if (sort === 'alpha-asc')  sorted.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'alpha-desc') sorted.sort((a, b) => b.name.localeCompare(a.name));

  const currentSort = sortOptions.find((o) => o.value === sort)?.label;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Category banner */}
      <Box sx={{ position: 'relative', height: { xs: 200, md: 280 }, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {banner && (
          <Box component="img" src={banner} alt={category}
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        )}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(30,27,75,0.65) 50%, rgba(46,16,101,0.7) 100%)' }} />
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 3 }}>
          <Typography variant="h2" sx={{ color: '#f8fafc', fontWeight: 900, textShadow: '0 2px 20px rgba(0,0,0,0.4)', mb: 1.5 }}>
            {categoryLabels[category] || 'Collection'}
          </Typography>
          <Chip
            label={`${filtered.length} products`}
            size="small"
            sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 600, border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)', fontSize: '0.8125rem' }}
          />
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Filter/sort bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <TuneIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              <Typography component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>{filtered.length}</Typography>
              {' '}products
            </Typography>
            <Chip
              label={`Sorted: ${currentSort}`}
              size="small"
              variant="outlined"
              sx={{ borderRadius: '8px', fontWeight: 500, fontSize: '0.75rem', height: 26, borderColor: 'divider' }}
            />
          </Stack>

          <Button
            variant="outlined"
            endIcon={<SortIcon />}
            onClick={(e) => setSortAnchor(e.currentTarget)}
            sx={{
              borderRadius: 2.5, borderColor: 'divider', color: 'text.primary',
              fontWeight: 600, fontSize: '0.875rem', background: 'transparent', boxShadow: 'none',
              '&:hover': { borderColor: 'primary.main', color: 'primary.main', background: 'rgba(99,102,241,0.04)', transform: 'none', boxShadow: 'none' },
            }}
          >
            Sort By
          </Button>

          <Menu
            anchorEl={sortAnchor}
            open={Boolean(sortAnchor)}
            onClose={() => setSortAnchor(null)}
            PaperProps={{ sx: { borderRadius: 2.5, mt: 1, minWidth: 200, border: '1px solid', borderColor: 'divider' } }}
          >
            {sortOptions.map((opt) => (
              <MenuItem
                key={opt.value}
                selected={sort === opt.value}
                onClick={() => { setSort(opt.value); setSortAnchor(null); }}
                sx={{
                  fontSize: '0.875rem', fontWeight: sort === opt.value ? 700 : 400,
                  color: sort === opt.value ? 'primary.main' : 'text.primary',
                  mx: 1, borderRadius: 1.5, mb: 0.25,
                  '&.Mui-selected': { bgcolor: 'rgba(99,102,241,0.08)', '&:hover': { bgcolor: 'rgba(99,102,241,0.12)' } },
                }}
              >
                {opt.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {sorted.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>No products found in this category.</Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {sorted.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ShopCategory;
