import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const menuItems = [
  {
    to: '/orders',
    icon: ShoppingBagOutlinedIcon,
    primary: 'My Orders',
    secondary: 'View and track your orders',
    chip: null,
  },
  {
    to: '/account',
    icon: AccountCircleOutlinedIcon,
    primary: 'Account Settings',
    secondary: 'Manage your personal details',
    chip: null,
  },
];

const Profile = () => {
  const userName = localStorage.getItem('user-name') || 'User';
  const initial = userName[0]?.toUpperCase() || 'U';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 5 }}>
      <Container maxWidth="sm">
        {/* Profile header card */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              p: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 2.5,
            }}
          >
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'primary.main',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              {initial}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                {userName}
              </Typography>
              <Chip
                icon={<PersonOutlinedIcon sx={{ fontSize: '14px !important', color: 'inherit !important' }} />}
                label="Member"
                size="small"
                sx={{
                  bgcolor: 'transparent',
                  color: 'text.secondary',
                  border: '1px solid',
                  borderColor: 'divider',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 24,
                }}
              />
            </Box>
          </Box>

          <CardContent sx={{ p: 0 }}>
            <List disablePadding>
              {menuItems.map(({ to, icon: Icon, primary, secondary }, i) => (
                <ListItem
                  key={to}
                  component={RouterLink}
                  to={to}
                  sx={{
                    px: 3,
                    py: 2,
                    borderBottom: i < menuItems.length - 1 ? '1px solid' : 'none',
                    borderBottomColor: 'divider',
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': { bgcolor: 'rgba(234,88,12,0.04)' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 42 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        bgcolor: 'rgba(234,88,12,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: 19, color: 'primary.main' }} />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={primary}
                    secondary={secondary}
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9375rem' }}
                    secondaryTypographyProps={{ fontSize: '0.8125rem' }}
                  />
                  <ChevronRightIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
