import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

const reviews = [
  { name: 'Sarah M.', rating: 5, text: 'Absolutely love this piece! The quality is outstanding and it fits perfectly. I get compliments every time I wear it. Will definitely order again!', date: '2 days ago', verified: true },
  { name: 'James T.', rating: 4, text: 'Great quality and fast shipping. The material feels premium and the sizing is accurate. Would recommend to anyone looking for stylish basics.', date: '1 week ago', verified: true },
  { name: 'Emma L.', rating: 5, text: 'Perfect in every way. The colors are vibrant and it holds up well after multiple washes. This is my new favorite item in my wardrobe.', date: '2 weeks ago', verified: false },
];

const DescriptionBox = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)}
            sx={{ borderBottom: '1px solid', borderBottomColor: 'divider', px: 3, '& .MuiTab-root': { py: 2.5 } }}>
            <Tab label="Description" />
            <Tab label="Reviews (122)" />
          </Tabs>

          <Box sx={{ p: { xs: 2.5, md: 4 } }}>
            {tab === 0 && (
              <Box>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.85, mb: 3 }}>
                  Experience the perfect blend of style and comfort with this premium piece. Crafted from high-quality materials sourced responsibly, every detail has been thoughtfully designed to ensure both longevity and everyday wearability.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.85, mb: 3 }}>
                  Whether you're dressing for a casual day out or a special occasion, this versatile piece adapts effortlessly. The timeless design ensures it pairs beautifully with everything in your wardrobe.
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 3 }}>
                  {[
                    ['Material', '95% Cotton, 5% Elastane'],
                    ['Fit', 'Regular fit'],
                    ['Care', 'Machine wash cold'],
                    ['Origin', 'Ethically made'],
                  ].map(([label, value]) => (
                    <Box key={label} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.25, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {tab === 1 && (
              <Box>
                <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 }, alignItems: 'center', mb: 4, p: 3, bgcolor: 'background.default', borderRadius: 2.5, border: '1px solid', borderColor: 'divider', flexWrap: 'wrap' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, lineHeight: 1 }}>4.8</Typography>
                    <Rating value={4.8} precision={0.1} readOnly size="small" sx={{ color: '#f59e0b', mt: 0.75 }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>122 reviews</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                  <Box sx={{ flex: 1, minWidth: 180 }}>
                    {[5, 4, 3, 2, 1].map((star) => (
                      <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
                        <Typography variant="caption" sx={{ width: 8, fontWeight: 600, color: 'text.secondary' }}>{star}</Typography>
                        <Box sx={{ flex: 1, height: 6, bgcolor: 'action.hover', borderRadius: 3, overflow: 'hidden' }}>
                          <Box sx={{ height: '100%', width: `${star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : 3}%`, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', borderRadius: 3 }} />
                        </Box>
                        <Typography variant="caption" sx={{ width: 28, color: 'text.disabled', textAlign: 'right' }}>
                          {star === 5 ? '88' : star === 4 ? '22' : star === 3 ? '7' : star === 2 ? '3' : '2'}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Stack spacing={3}>
                  {reviews.map((review, i) => (
                    <Box key={i}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                        <Avatar sx={{ width: 42, height: 42, background: `linear-gradient(135deg, hsl(${i * 80 + 220}, 70%, 55%) 0%, hsl(${i * 80 + 260}, 70%, 55%) 100%)`, fontWeight: 700, fontSize: '0.9375rem' }}>
                          {review.name[0]}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 0.5, flexWrap: 'wrap' }}>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>{review.name}</Typography>
                            {review.verified && (
                              <Chip label="Verified Purchase" size="small"
                                sx={{ height: 20, fontSize: '0.7rem', fontWeight: 600, bgcolor: 'rgba(16,185,129,0.1)', color: '#10b981', borderRadius: '6px', '& .MuiChip-label': { px: 0.875 } }}
                              />
                            )}
                            <Typography variant="caption" sx={{ color: 'text.disabled', ml: 'auto' }}>{review.date}</Typography>
                          </Box>
                          <Rating value={review.rating} size="small" readOnly sx={{ color: '#f59e0b', mb: 1 }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{review.text}</Typography>
                        </Box>
                      </Box>
                      {i < reviews.length - 1 && <Divider sx={{ mt: 3 }} />}
                    </Box>
                  ))}
                </Stack>

                <Button variant="outlined" sx={{ mt: 4, borderRadius: 2.5, px: 4 }}>Load More Reviews</Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DescriptionBox;
