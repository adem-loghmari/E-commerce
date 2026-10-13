  import React, { useEffect, useState, useRef } from 'react';
  import Chart from 'chart.js/auto';
  import adminFetch from '../../utils/adminFetch';
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
      color: '#ea580c',
      bgColor: 'rgba(234,88,12,0.08)',
    },
    {
      label: 'Total Sold',
      value: totalSold,
      icon: ShoppingBagOutlinedIcon,
      color: '#ea580c',
      bgColor: 'rgba(234,88,12,0.08)',
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: AttachMoneyOutlinedIcon,
      color: '#ea580c',
      bgColor: 'rgba(234,88,12,0.08)',
    },
    {
      label: 'Best Seller',
      value: bestSeller?.name || '—',
      sub: bestSeller ? `${bestSeller.sold || 0} sold` : '',
      icon: EmojiEventsOutlinedIcon,
      color: '#ea580c',
      bgColor: 'rgba(234,88,12,0.08)',
    },
  ];

  const Dashboard = () => {
    const [allproducts, setAllProducts] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
      const load = async () => {
        try {
          const [productsResp, statsResp] = await Promise.all([fetch('/api/allproducts'), adminFetch('/api/stats')]);
          const data = await productsResp.json();
          setAllProducts(Array.isArray(data) ? data : []);
          if (statsResp.ok) setStats(await statsResp.json());
        } catch (err) {
          console.error('Failed to load dashboard data:', err);
        } finally {
          setLoading(false);
        }
      };
      load();
    }, []);

    const totalProducts = allproducts.length;
    // Sales figures come from orders: units from each order's items, revenue from order totals.
    const totalSold = stats?.unitsSold ?? 0;
    const totalRevenue = stats?.revenue ?? 0;
    const bestSeller = allproducts.reduce((max, p) => (p.sold > (max?.sold || 0) ? p : max), null);

    const categories = {};
    allproducts.forEach((p) => {
      if (!categories[p.category]) categories[p.category] = { count: 0, sold: 0 };
      categories[p.category].count++;
      categories[p.category].sold += p.sold || 0;
    });
    // Serialized so the chart effect only re-runs when the numbers actually change.
    const chartKey = JSON.stringify(categories);

    useEffect(() => {
      const byCategory = JSON.parse(chartKey);
      const categoryLabels = Object.keys(byCategory);
      const soldData = Object.values(byCategory).map((v) => v.sold);
      if (chartRef.current && categoryLabels.length > 0) {
        if (chartInstanceRef.current) chartInstanceRef.current.destroy();
        chartInstanceRef.current = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: categoryLabels.map((l) => l.charAt(0).toUpperCase() + l.slice(1)),
            datasets: [{
              label: 'Products Sold',
              data: soldData,
              backgroundColor: '#ea580c',
              borderWidth: 0,
              borderRadius: 4,
              borderSkipped: false,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#292524',
                borderColor: 'rgba(234,88,12,0.3)',
                borderWidth: 1,
                titleColor: '#f5f5f4',
                bodyColor: '#a8a29e',
                padding: 12,
                cornerRadius: 8,
              },
            },
            scales: {
              x: {
                ticks: { color: '#78716c', font: { family: 'Inter', size: 12 } },
                grid: { color: 'rgba(28,25,23,0.1)' },
                border: { color: 'rgba(28,25,23,0.1)' },
              },
              y: {
                ticks: { color: '#78716c', font: { family: 'Inter', size: 12 } },
                grid: { color: 'rgba(28,25,23,0.1)' },
                border: { color: 'rgba(28,25,23,0.1)' },
                beginAtZero: true,
              },
            },
          },
        });
      }
      return () => { if (chartInstanceRef.current) { chartInstanceRef.current.destroy(); chartInstanceRef.current = null; } };
    // loading is a dependency because the canvas only exists once the spinner is gone.
    }, [chartKey, loading]);

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
              Welcome back. Here is what is happening with your store today.
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
                  sx={{ bgcolor: 'rgba(234,88,12,0.08)', color: 'primary.dark', fontWeight: 600, borderRadius: '6px' }}
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
                              sx={{ width: 36, height: 36, bgcolor: 'background.default', border: '1px solid rgba(28,25,23,0.1)' }}
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
                              bgcolor: 'rgba(234,88,12,0.08)',
                              color: 'primary.dark',
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
