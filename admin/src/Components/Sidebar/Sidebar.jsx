import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { NAVBAR_HEIGHT, SIDEBAR_WIDTH } from '../Navbar/Navbar';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', to: '/', icon: DashboardOutlinedIcon },
    ],
  },
  {
    label: 'Orders',
    items: [
      { label: 'All Orders', to: '/orders', icon: ListAltOutlinedIcon },
      { label: 'Modify Order', to: '/modifyorder', icon: EditNoteOutlinedIcon },
    ],
  },
  {
    label: 'Products',
    items: [
      { label: 'All Products', to: '/listproduct', icon: InventoryOutlinedIcon },
      { label: 'Add Product', to: '/addproduct', icon: AddBoxOutlinedIcon },
      { label: 'Modify Product', to: '/modifyproduct', icon: DriveFileRenameOutlineOutlinedIcon },
    ],
  },
  {
    label: 'Users',
    items: [
      { label: 'All Users', to: '/users', icon: PeopleOutlinedIcon },
    ],
  },
];

const SidebarContent = ({ onClose }) => {
  const location = useLocation();

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/' || location.pathname === '/admin/';
    return location.pathname.startsWith(to);
  };

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        pt: 1,
        pb: 2,
      }}
    >
      {navGroups.map((group, gi) => (
        <Box key={group.label}>
          {gi > 0 && <Divider sx={{ my: 1 }} />}
          <Typography
            variant="overline"
            sx={{
              color: 'text.disabled',
              px: 2.5,
              py: 1,
              display: 'block',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
            }}
          >
            {group.label}
          </Typography>
          <List disablePadding sx={{ px: 1.5 }}>
            {group.items.map(({ label, to, icon: Icon }) => {
              const active = isActive(to);
              return (
                <ListItem key={to} disablePadding sx={{ mb: 0.25 }}>
                  <ListItemButton
                    component={Link}
                    to={to}
                    onClick={onClose}
                    selected={active}
                    sx={{
                      borderRadius: 2,
                      py: 0.875,
                      px: 1.5,
                      '&.Mui-selected': {
                        background: 'rgba(99,102,241,0.15)',
                        '& .MuiListItemIcon-root': { color: '#818cf8' },
                        '& .MuiListItemText-primary': { color: '#818cf8', fontWeight: 700 },
                        '&:hover': { background: 'rgba(99,102,241,0.2)' },
                      },
                      '&:hover': {
                        background: 'rgba(99,102,241,0.08)',
                        '& .MuiListItemIcon-root': { color: '#a5b4fc' },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: active ? '#818cf8' : 'text.secondary',
                        transition: 'color 0.15s',
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: active ? 700 : 500,
                        color: active ? '#e0e7ff' : 'text.secondary',
                      }}
                    />
                    {active && (
                      <Box
                        sx={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          ml: 0.5,
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      ))}
    </Box>
  );
};

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  return (
    <>
      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            top: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            overflowX: 'hidden',
          },
        }}
      >
        <SidebarContent onClose={() => {}} />
      </Drawer>

      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            top: 0,
            pt: `${NAVBAR_HEIGHT}px`,
          },
        }}
      >
        <SidebarContent onClose={onMobileClose} />
      </Drawer>
    </>
  );
};

export default Sidebar;
