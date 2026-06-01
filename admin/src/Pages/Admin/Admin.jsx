import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import Dashboard from '../../Components/Dashboard/Dashboard';
import { AdminLogin } from '../../Components/AdminLogin/AdminLogin';
import Navbar, { NAVBAR_HEIGHT, SIDEBAR_WIDTH } from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import ProtectedRoute from '../../Components/ProtectedRoute/ProtectedRoute';
import ModifyProduct from '../../Components/ModifyProduct/ModifyProduct';
import UsersList from '../../Components/UsersList/UsersList';
import OrdersList from '../../Components/OrdersList/OrdersList';
import ModifyOrder from '../../Components/ModifyOrder/ModifyOrder';

const Admin = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />

      <Route path="/*" element={
        <ProtectedRoute>
          <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
            <Navbar />
            <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                position: 'fixed',
                top: (NAVBAR_HEIGHT - 36) / 2,
                left: 16,
                zIndex: (theme) => theme.zIndex.drawer + 2,
                display: { md: 'none' },
                color: 'text.primary',
                bgcolor: 'background.paper',
                border: '1px solid rgba(248,250,252,0.08)',
                width: 36, height: 36,
                '&:hover': { bgcolor: 'rgba(99,102,241,0.1)' },
              }}
            >
              <MenuIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <Box
              component="main"
              sx={{
                flex: 1,
                minWidth: 0,
                mt: `${NAVBAR_HEIGHT}px`,
                minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
                bgcolor: 'background.default',
                overflow: 'auto',
              }}
            >
              <Routes>
                {/* index route = the dashboard, matched when path is exactly "/" */}
                <Route index element={<Dashboard />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/listproduct" element={<ListProduct />} />
                <Route path="/modifyproduct" element={<ModifyProduct />} />
                <Route path="/modifyproduct/:id" element={<ModifyProduct />} />
                <Route path="/users" element={<UsersList />} />
                <Route path="/orders" element={<OrdersList />} />
                <Route path="/modifyorder" element={<ModifyOrder />} />
                <Route path="/modifyorder/:id" element={<ModifyOrder />} />
              </Routes>
            </Box>
          </Box>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default Admin;
