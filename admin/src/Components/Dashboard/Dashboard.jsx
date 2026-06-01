  import React, { useEffect, useState, useRef } from 'react';
  import Chart from 'chart.js/auto';
  import Box from '@mui/material/Box';
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';
  import Typography from '@mui/material/Typography';
  import CircularProgress from '@mui/material/CircularProgress';
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Chip from '@mui/material/Chip';
  import Paper from '@mui/material/Paper';
  import Avatar from '@mui/material/Avatar';
  import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
  import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
  import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
  import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

  const statCards = (totalProducts, totalSold, totalRevenue, bestSeller) => [
    {
      label: 'Total Products',
      value: totalProducts,
      icon: Inventory2OutlinedIcon,
      color: '#6366f1',
      bgColor: 'rgba(99,102,241,0.12)',
    },
    {
      label: 'Total Sold',
      value: totalSold,
      icon: ShoppingBagOutlinedIcon,
      color: '#10b981',
      bgColor: 'rgba(16,185,129,0.12)',
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: AttachMoneyOutlinedIcon,
      color: '#f59e0b',
      bgColor: 'rgba(245,158,11,0.12)',
    },
    {
      label: 'Best Seller',
      value: bestSeller?.name || '—',
      sub: bestSeller ? `${bestSeller.sold || 0} sold` : '',
      icon: EmojiEventsOutlinedIcon,
      color: '#8b5cf6',
      bgColor: 'rgba(139,92,246,0.12)',
    },
  ];

  const Dashboard = () => {
    const [allproducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
      const load = async () => {
        try {
          const resp = await fetch('/api/allproducts');
          const data = await resp.json();
          setAllProducts(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error('Failed to fetch products:', err);
        } finally {
          setLoading(false);
        }
      };
      load();
    }, []);

    const totalProducts = allproducts.length;
    const totalSold = allproducts.reduce((s, p) => s + (p.sold || 0), 0);
    const totalRevenue = allproducts.reduce((s, p) => s + (p.sold || 0) * (p.new_price || 0), 0);
    const bestSeller = allproducts.reduce((max, p) => (p.sold > (max?.sold || 0) ? p : max), null);

    const categories = {};
    allproducts.forEach((p) => {
      if (!categories[p.category]) categories[p.category] = { count: 0, sold: 0 };
      categories[p.category].count++;
      categories[p.category].sold += p.sold || 0;
    });
    const categoryLabels = Object.keys(categories);
    const soldData = Object.values(categories).map((v) => v.sold);

    useEffect(() => {
      if (chartRef.current && categoryLabels.length > 0) {
        if (chartInstanceRef.current) chartInstanceRef.current.destroy();
        chartInstanceRef.current = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: categoryLabels.map((l) => l.charAt(0).toUpperCase() + l.slice(1)),
            datasets: [{
              label: 'Products Sold',
              data: soldData,
              backgroundColor: ['rgba(99,102,241,0.7)', 'rgba(139,92,246,0.7)', 'rgba(236,72,153,0.7)'],
              borderColor: ['rgba(99,102,241,1)', 'rgba(139,92,246,1)', 'rgba(236,72,153,1)'],
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#1e293b',
                borderColor: 'rgba(99,102,241,0.3)',
                borderWidth: 1,
                titleColor: '#f1f5f9',
                bodyColor: '#94a3b8',
                padding: 12,
                cornerRadius: 8,
              },
            },
            scales: {
              x: {
                ticks: { color: '#64748b', font: { family: 'Inter', size: 12 } },
                grid: { color: 'rgba(248,250,252,0.05)' },
                border: { color: 'rgba(248,250,252,0.08)' },
              },
              y: {
                ticks: { color: '#64748b', font: { family: 'Inter', size: 12 } },
                grid: { color: 'rgba(248,250,252,0.05)' },
                border: { color: 'rgba(248,250,252,0.08)' },
                beginAtZero: true,
              },
            },
          },
        });
      }
      return () => { if (chartInstanceRef.current) { chartInstanceRef.current.destroy(); chartInstanceRef.current = null; } };
    }, [categoryLabels.join(','), soldData.join(',')]);

    if (loading) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography color="text.secondary">Loading dashboard...</Typography>
          </Box>
        </Box>
      );
    }

    return (
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Centered column, max readable width */}
        <Box sx={{ maxWidth: 960, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>

          {/* Header */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Dashboard</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Welcome back — here's what's happening with your store today.
            </Typography>
          </Box>

          {/* Stat cards — CSS grid so all columns are equal-width and flush with siblings */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
            {statCards(totalProducts, totalSold, totalRevenue, bestSeller).map(({ label, value, sub, icon: Icon, color, bgColor }) => (
              <Card key={label}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      width: 40, height: 40, borderRadius: 2,
                      bgcolor: bgColor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      mb: 1.75,
                    }}
                  >
                    <Icon sx={{ fontSize: 20, color }} />
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1.1,
                      mb: 0.25,
                      fontSize: typeof value === 'string' && value.length > 10 ? '0.95rem' : '1.4rem',
                      color: 'text.primary',
                    }}
                  >
                    {value}
                  </Typography>
                  {sub && (
                    <Typography variant="caption" sx={{ color, fontWeight: 600, display: 'block', mb: 0.25 }}>
                      {sub}
                    </Typography>
                  )}
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {label}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Chart */}
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
                Sales by Category
              </Typography>
              <Box sx={{ height: 280 }}>
                <canvas ref={chartRef} />
              </Box>
            </CardContent>
          </Card>

          {/* Recent products table */}
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Recent Products</Typography>
                <Chip
                  label={`${totalProducts} total`}
                  size="small"
                  sx={{ bgcolor: 'rgba(99,102,241,0.12)', color: 'primary.light', fontWeight: 600, borderRadius: '6px' }}
                />
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Sold</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...allproducts].slice(-6).reverse().map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                            <Avatar
                              src={p.image}
                              alt={p.name}
                              variant="rounded"
                              sx={{ width: 36, height: 36, bgcolor: 'rgba(15,23,42,0.5)', border: '1px solid rgba(248,250,252,0.08)' }}
                            />
                            <Typography variant="body2" sx={{ fontWeight: 600, maxWidth: 200 }} noWrap>
                              {p.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={p.category}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(99,102,241,0.1)',
                              color: 'primary.light',
                              fontSize: '0.7rem',
                              height: 20,
                              textTransform: 'capitalize',
                              borderRadius: '5px',
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>${p.new_price}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.light' }}>
                            {p.sold ?? 0}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

        </Box>
      </Box>
    );
  };

  export default Dashboard;
