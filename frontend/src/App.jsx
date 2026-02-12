import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
import BookDetails from "./pages/BookDetails/BookDetails";
import Header from "./components/Header/Header";


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
    </Routes>
    </>
  );
}

export default App;
