import React, { useEffect, useState } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const UsersList = () => {
  const [allusers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const [confirmName, setConfirmName] = useState('');
  const [confirmId, setConfirmId] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const resp = await fetch('/api/allusers');
      const data = await resp.json();
      setAllUsers(Array.isArray(data) ? data.sort((a, b) => a.id - b.id) : []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInfo(); }, []);

  const handleDeleteConfirm = async () => {
    if (confirmName.trim() !== modalUser.name.trim() || String(confirmId).trim() !== String(modalUser.id).trim()) {
      setDeleteError('Name and ID must match exactly.');
      return;
    }
    setDeleting(true);
    const data = await fetch('/api/removeUser', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: modalUser.id }),
    }).then((r) => r.json());
    if (data.success) { setShowModal(false); fetchInfo(); }
    else setDeleteError('Deletion failed.');
    setDeleting(false);
  };

  const getInitials = (name = '') => name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  const avatarColor = (name = '') => {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>All Users</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Manage your customer accounts — {allusers.length} users
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : allusers.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography color="text.secondary">No users found.</Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell align="right">Total Spent</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allusers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontWeight: 600 }}>
                          #{user.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            sx={{
                              width: 36, height: 36,
                              bgcolor: avatarColor(user.name),
                              fontSize: '0.8rem', fontWeight: 700,
                            }}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{user.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{user.phone || '—'}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.light' }}>
                          ${(user.spent ?? 0).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => { setModalUser(user); setConfirmName(''); setConfirmId(''); setDeleteError(''); setShowModal(true); }}
                          sx={{ color: 'error.light', bgcolor: 'rgba(239,68,68,0.1)', borderRadius: 1.5, '&:hover': { bgcolor: 'rgba(239,68,68,0.2)' } }}
                        >
                          <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
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
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>Delete User</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>This cannot be undone</Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
            To confirm deletion of <strong style={{ color: '#f1f5f9' }}>{modalUser?.name}</strong>, enter their name and ID:
          </Typography>
          <Stack spacing={1.5}>
            <TextField fullWidth label="User Name" size="small" placeholder={modalUser?.name} value={confirmName} onChange={(e) => { setConfirmName(e.target.value); setDeleteError(''); }} />
            <TextField fullWidth label="User ID" size="small" placeholder={String(modalUser?.id)} value={confirmId} onChange={(e) => { setConfirmId(e.target.value); setDeleteError(''); }} />
          </Stack>
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

export default UsersList;
