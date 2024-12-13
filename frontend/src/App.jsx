import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import LogIn from "./pages/LogIn";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import SignUp from "./pages/SignUp";
import WishList from "./pages/WishList";
import Product from "./pages/Product";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Contact" element={<Contact />} />
            <Route path="About" element={<About />} />
            <Route path="Account" element={<Account />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="CheckOut" element={<CheckOut />} />
            <Route path="LogIn" element={<LogIn />} />
            <Route path="ProductDetailsPage" element={<ProductDetailsPage />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="WishList" element={<WishList />} />
            <Route path="Product" element={<Product />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
