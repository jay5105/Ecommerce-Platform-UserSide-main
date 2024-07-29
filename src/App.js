import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AboutUs from './components/About';
import { Routes, Route, useLocation } from "react-router-dom";
import Products from './components/Products';
import Cart from './components/Cart';
import Order from './components/Order';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Verify from './components/Verify';
import OneProduct from './components/OneProduct';

function App() {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === '/login' || location.pathname === '/signup'  || location.pathname === '/verify';

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        {/* About Us */}
        <Route path="/about" element={<AboutUs />} />
        {/* Product Page */}
        <Route path="/product" element={<Products />} />
        {/* Cart Page */}
        <Route path="/cart" element={<Cart />} />
        {/* Order Page */}
        <Route path="/order" element={<Order />} />
        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />
        {/* Signup Form */}
        <Route path="/signup" element={<Signup />} />
        {/* Verify OTP  */}
        <Route path="/verify" element={<Verify />} />
        {/* Login User */}
        <Route path="/login" element={<Login />} />
        {/* Separates Product */}
        <Route path="/Products/:id" element={<OneProduct/>}/>
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
