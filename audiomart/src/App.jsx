import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // 👈 Import router
import AdminDashboard from "./pages/Admin/adminDashboard.jsx";
import HomePage from "./pages/Home/homePage.jsx";
import ContactPage from "./pages/Home/contactPage.jsx";
import AboutPage from "./pages/Home/aboutPage.jsx";
import NotFoundPage from "./pages/Home/notFoundPage.jsx";
import Testing from "./components/testing.jsx";
import LoginPage from "./pages/Login & Registration/login.jsx";

import { Toaster } from "react-hot-toast";
import ProductPage from "./pages/Home/productPage.jsx";
import RegisterPage from "./pages/Login & Registration/RegisterPage.jsx";
import ProductOverview from "./pages/Home/productOverview.jsx";
import CartPage from "./pages/Home/cartPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:key" element={<ProductOverview />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
