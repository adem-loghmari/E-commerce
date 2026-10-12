import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import EmailIcon from '@mui/icons-material/Email';
import CheckIcon from '@mui/icons-material/Check';

const NewsLetter = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) setSubscribed(true);
  };

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Chip
          icon={<EmailIcon sx={{ fontSize: '15px !important' }} />}
          label="Newsletter"
          sx={{
            mb: 3,
            bgcolor: 'rgba(234,88,12,0.08)',
            color: 'primary.main',
            border: '1px solid rgba(234,88,12,0.2)',
            fontWeight: 600,
            fontSize: '0.8rem',
            height: 30,
          }}
        />
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
          Stay in the{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            Loop
          </Box>
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4.5, lineHeight: 1.7, maxWidth: 400, mx: 'auto' }}>
          Subscribe for exclusive deals, new arrivals, and style inspiration — delivered straight to your inbox.
        </Typography>

        {subscribed ? (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              px: 3.5,
              py: 1.75,
            }}
          >
            <CheckIcon sx={{ color: 'success.main', fontSize: 20 }} />
            <Typography sx={{ color: 'success.main', fontWeight: 600 }}>
              You're subscribed! Thanks for joining.
            </Typography>
          </Box>
        ) : (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ maxWidth: 460, mx: 'auto' }}
          >
            <TextField
              placeholder="Enter your email address"
              variant="outlined"
              size="medium"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              sx={{}}
            />
            <Button
              variant="contained"
              size="medium"
              onClick={handleSubscribe}
              sx={{ whiteSpace: 'nowrap', px: 3.5, py: 1.75 }}
            >
              Subscribe
            </Button>
          </Stack>
        )}

        <Typography variant="caption" sx={{ color: 'text.disabled', mt: 2.5, display: 'block', lineHeight: 1.6 }}>
          No spam, ever. Unsubscribe at any time. We respect your privacy.
        </Typography>
      </Container>
    </Box>
  );
};

export default NewsLetter;
