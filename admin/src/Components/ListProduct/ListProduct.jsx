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
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import adminFetch from '../../utils/adminFetch';
import DeleteConfirmDialog from '../DeleteConfirmDialog/DeleteConfirmDialog';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [confirmName, setConfirmName] = useState('');
  const [confirmId, setConfirmId] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const resp = await fetch('/api/allproducts');
      const data = await resp.json();
      setAllProducts(Array.isArray(data) ? data.sort((a, b) => a.id - b.id) : []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInfo(); }, []);

  const openDeleteModal = (product) => {
    setModalProduct(product);
    setConfirmName('');
    setConfirmId('');
    setDeleteError('');
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (confirmName.trim() !== modalProduct.name.trim() || String(confirmId).trim() !== String(modalProduct.id).trim()) {
      setDeleteError('Name and ID must match exactly.');
      return;
    }
    setDeleting(true);
    const data = await adminFetch('/api/removeProduct', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: modalProduct.id }),
    }).then((r) => r.json());

    if (data.success) {
      setShowModal(false);
      setModalProduct(null);
      fetchInfo();
    } else {
      setDeleteError('Deletion failed. Please try again.');
    }
    setDeleting(false);
  };

  const categoryColor = (cat) => ({
    women: { bgcolor: 'rgba(236,72,153,0.12)', color: '#f472b6' },
    men: { bgcolor: 'rgba(59,130,246,0.12)', color: '#60a5fa' },
    kid: { bgcolor: 'rgba(16,185,129,0.12)', color: '#34d399' },
  }[cat] || { bgcolor: 'rgba(99,102,241,0.12)', color: '#818cf8' });

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>All Products</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Manage your product catalog — {allproducts.length} items
          </Typography>
        </Box>
        <Button component={Link} to="/addproduct" variant="contained" sx={{ borderRadius: 2.5 }}>
          + Add Product
        </Button>
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Old Price</TableCell>
                    <TableCell align="right">Sale Price</TableCell>
                    <TableCell align="center">Stock</TableCell>
                    <TableCell align="center">Sold</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allproducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontWeight: 600 }}>
                          #{product.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            src={product.image}
                            alt={product.name}
                            variant="rounded"
                            sx={{ width: 40, height: 40, bgcolor: 'rgba(15,23,42,0.5)', border: '1px solid rgba(248,250,252,0.08)' }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 600, maxWidth: 180 }} noWrap>
                            {product.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={product.category}
                          size="small"
                          sx={{ ...categoryColor(product.category), textTransform: 'capitalize', fontWeight: 600, fontSize: '0.7rem', height: 22, borderRadius: '6px' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                          ${product.old_price}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.light' }}>
                          ${product.new_price}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{product.stock ?? 0}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.light' }}>{product.sold ?? 0}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <IconButton
                            component={Link}
                            to={`/modifyproduct/${product.id}`}
                            size="small"
                            sx={{
                              color: 'primary.light',
                              bgcolor: 'rgba(99,102,241,0.1)',
                              borderRadius: 1.5,
                              '&:hover': { bgcolor: 'rgba(99,102,241,0.2)' },
                            }}
                          >
                            <EditOutlinedIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => openDeleteModal(product)}
                            sx={{
                              color: 'error.light',
                              bgcolor: 'rgba(239,68,68,0.1)',
                              borderRadius: 1.5,
                              '&:hover': { bgcolor: 'rgba(239,68,68,0.2)' },
                            }}
                          >
                            <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        subtitle="This action is irreversible"
        deleting={deleting}
        error={deleteError}
        fields={[
          { label: 'Product Name', placeholder: modalProduct?.name, value: confirmName, onChange: (v) => { setConfirmName(v); setDeleteError(''); } },
          { label: 'Product ID', placeholder: String(modalProduct?.id ?? ''), value: confirmId, onChange: (v) => { setConfirmId(v); setDeleteError(''); } },
        ]}
      />
    </Box>
  );
};

export default ListProduct;
