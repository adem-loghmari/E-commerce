import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const DeleteConfirmDialog = ({ open, onClose, onConfirm, title, subtitle, fields = [], error, deleting }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ pb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <WarningAmberIcon sx={{ color: 'error.light', fontSize: 20 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>{title}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>
        </Box>
      </Box>
    </DialogTitle>

    <DialogContent>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
        {fields.length > 1
          ? 'Enter the details below to confirm deletion:'
          : 'Enter the ID to confirm deletion:'}
      </Typography>
      <Stack spacing={1.5}>
        {fields.map((field) => (
          <TextField
            key={field.label}
            fullWidth
            size="small"
            label={field.label}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
        ))}
      </Stack>
      {error && <Alert severity="error" sx={{ mt: 1.5, borderRadius: 2 }}>{error}</Alert>}
    </DialogContent>

    <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
      <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        color="error"
        disabled={deleting}
        startIcon={deleting ? <CircularProgress size={16} sx={{ color: 'rgba(255,255,255,0.8)' }} /> : null}
        sx={{ borderRadius: 2 }}
      >
        {deleting ? 'Deleting…' : 'Confirm Delete'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteConfirmDialog;
