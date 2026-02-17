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
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


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
      
      {/* Cart */}
      <Route path="/cart" element={<Cart />} />

      {/* Checkout */}
      <Route path="/checkout" element={<Checkout />} />
    
      {/* Success and cancel pages */}
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
    
    </Routes>
      <Footer />
    </>
  );
}

export default App;
