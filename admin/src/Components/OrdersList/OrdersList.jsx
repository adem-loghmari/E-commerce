import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const statusConfig = {
  pending: { color: '#fbbf24', bgcolor: 'rgba(251,191,36,0.12)' },
  processing: { color: '#60a5fa', bgcolor: 'rgba(96,165,250,0.12)' },
  shipped: { color: '#818cf8', bgcolor: 'rgba(129,140,248,0.12)' },
  delivered: { color: '#34d399', bgcolor: 'rgba(52,211,153,0.12)' },
  cancelled: { color: '#f87171', bgcolor: 'rgba(248,113,113,0.12)' },
};

const AdminOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);
  const [confirmId, setConfirmId] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const resp = await fetch('/api/allorders');
      const data = await resp.json();
      setAllOrders(Array.isArray(data) ? data.sort((a, b) => b.id - a.id) : []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setAllOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    await fetch('/api/updateOrderStatus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, status: newStatus }),
    });
    fetchOrders();
  };

  const handleDeleteConfirm = async () => {
    if (String(confirmId).trim() !== String(modalOrder.id).trim()) {
      setDeleteError('Order ID must match exactly.');
      return;
    }
    setDeleting(true);
    const data = await fetch('/api/removeOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: modalOrder.id }),
    }).then((r) => r.json());
    if (data.success) { setShowModal(false); fetchOrders(); }
    else setDeleteError(data.message || 'Deletion failed.');
    setDeleting(false);
  };

  const filteredOrders = statusFilter === 'all' ? allOrders : allOrders.filter((o) => o.status === statusFilter);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Order Management</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
            {statusFilter !== 'all' ? ` · ${statusFilter}` : ''}
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Filter Status</InputLabel>
          <Select value={statusFilter} label="Filter Status" onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="all">All Orders</MenuItem>
            {Object.keys(statusConfig).map((s) => (
              <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : filteredOrders.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography color="text.secondary">No orders found.</Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="center">Items</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const sc = statusConfig[order.status] || statusConfig.pending;
                    return (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontWeight: 600 }}>
                            #{order.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{order.user_name}</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{order.user_phone}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ maxWidth: 160 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                            {order.shippingAddress?.city}, {order.shippingAddress?.state}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            size="small"
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            sx={{
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              color: sc.color,
                              bgcolor: sc.bgcolor,
                              border: 'none',
                              minWidth: 110,
                              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                              '& .MuiSelect-icon': { color: sc.color },
                              textTransform: 'capitalize',
                            }}
                          >
                            {Object.keys(statusConfig).map((s) => (
                              <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize', fontSize: '0.8125rem' }}>{s}</MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {order.paymentMethod}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.light' }}>
                            ${order.total.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={Object.keys(order.cartSnapshot || {}).length}
                            size="small"
                            sx={{ bgcolor: 'rgba(99,102,241,0.1)', color: 'primary.light', fontWeight: 700, height: 20, borderRadius: '5px', fontSize: '0.7rem' }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <IconButton
                              component={Link}
                              to={`/modifyorder/${order.id}`}
                              size="small"
                              sx={{ color: 'primary.light', bgcolor: 'rgba(99,102,241,0.1)', borderRadius: 1.5, '&:hover': { bgcolor: 'rgba(99,102,241,0.2)' } }}
                            >
                              <EditOutlinedIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => { setModalOrder(order); setConfirmId(''); setDeleteError(''); setShowModal(true); }}
                              sx={{ color: 'error.light', bgcolor: 'rgba(239,68,68,0.1)', borderRadius: 1.5, '&:hover': { bgcolor: 'rgba(239,68,68,0.2)' } }}
                            >
                              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Delete dialog */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <WarningAmberIcon sx={{ color: 'error.light', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>Delete Order</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Order #{modalOrder?.id}</Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Enter the order ID to confirm deletion:
          </Typography>
          <TextField
            fullWidth label="Order ID" size="small"
            placeholder={String(modalOrder?.id)}
            value={confirmId}
            onChange={(e) => { setConfirmId(e.target.value); setDeleteError(''); }}
          />
          {deleteError && <Alert severity="error" sx={{ mt: 1.5, borderRadius: 2 }}>{deleteError}</Alert>}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setShowModal(false)} variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm} variant="contained" color="error"
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={16} sx={{ color: 'rgba(255,255,255,0.8)' }} /> : null}
            sx={{ borderRadius: 2 }}
          >
            {deleting ? 'Deleting...' : 'Confirm Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminOrders;
