import Box from '@mui/material/Box';
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import Checkout from "./Components/Checkout/Checkout";
import Orders from "./Components/Orders/Orders";
import Profile from "./Pages/Profile";
import Account from "./Components/Account/Account";

// Pages that need a logged-in customer send everyone else to the login page.
const RequireAuth = ({ children }) =>
  localStorage.getItem("auth-token") ? children : <Navigate to="/login" replace />;

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 72px)',
          }}
        >
          <Box component="main" sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route
                path="/mens"
                element={<ShopCategory banner={men_banner} category="men" />}
              />
              <Route
                path="/womens"
                element={<ShopCategory banner={women_banner} category="women" />}
              />
              <Route
                path="/kids"
                element={<ShopCategory banner={kid_banner} category="kid" />}
              />
              <Route path="/product" element={<Product />}>
                <Route path=":productId" element={<Product />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
              <Route path="/orders" element={<RequireAuth><Orders /></RequireAuth>} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
  );
}

export default App;
