import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
import BookDetails from "./pages/BookDetails/BookDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Success from "./pages/Success/Success";
import Cancel from "./pages/Cancel/Cancel";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Sell from "./pages/Sell/Sell";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminBuybacks from "./pages/AdminBuybacks/AdminBuybacks";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import AdminBooks from "./pages/AdminBooks/AdminBooks";
import AdminStock from "./pages/AdminStock/AdminStock";


function App() {
  return (
    <>
      <Header />
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Home />} />

      {/* Catalogue */}
      <Route path="/books" element={<Books />} />

      {/* Book details */}
      <Route path="/books/:id" element={<BookDetails />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} /> 

      {/* Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Sell */}
      <Route path="/sell" element={<Sell />} />
      
      {/* Cart */}
      <Route path="/cart" element={<Cart />} />

      {/* Checkout */}
      <Route path="/checkout" element={<Checkout />} />
    
      {/* Success and cancel pages */}
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="buybacks" element={<AdminBuybacks />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="books" element={<AdminBooks />} />
        <Route path="stock" element={<AdminStock />} />
      </Route>


    
    </Routes>
      <Footer />
    </>
  );
}

export default App;
