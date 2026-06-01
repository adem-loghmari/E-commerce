import "./App.css";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import Chekout from "./Components/Checkout/Chekout";
import Orders from "./Components/Orders/Orders";
import Profile from "./Pages/Profile";
import Account from "./Components/Account/Account";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
              <Route path="/checkout" element={<Chekout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
