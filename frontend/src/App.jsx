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
import AdminLayout from "./pages/AdminLayout/AdminLayout";
import AdminBuybacks from "./pages/AdminBuybacks/AdminBuybacks";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import AdminBooks from "./pages/AdminBooks/AdminBooks";
import AdminStock from "./pages/AdminStock/AdminStock";
import LegalNotice from "./pages/LegalNotice/LegalNotice";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";
import TermsOfSale from "./pages/TermsOfSale/TermsOfSale";
import CookieBanner from "./components/CookieBanner/CookieBanner";

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

      {/* Legal */}
      <Route path="/legal" element={<LegalNotice />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cgv" element={<TermsOfSale />} />


    
    </Routes>
      <Footer />
      <CookieBanner />
    </>
  );
}

export default App;
