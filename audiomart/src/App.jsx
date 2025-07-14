import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // 👈 Import router
import AdminDashboard from "./pages/Admin/adminDashboard.jsx";
import HomePage from "./pages/Home/homePage.jsx";
import AboutPage from "./pages/Home/aboutPage.jsx";
import NotFoundPage from "./pages/Home/notFoundPage.jsx";
import Testing from "./components/testing.jsx";
import LoginPage from "./pages/Login&Registration/login.jsx";

import { Toaster } from "react-hot-toast";
import ProductPage from "./pages/Home/productPage.jsx";

import ProductOverview from "./pages/Home/productOverview.jsx";
import CartPage from "./pages/Home/cartPage.jsx";
import PurchasePage from "./pages/Home/purchasePage.jsx";
import MyOrdersPage from "./pages/Home/myOrdersPage.jsx";
import HeroPage from "./pages/Home/heroPage.jsx";
import InquiriesPage from "./pages/Home/inquiriesPage.jsx";
import EditProfilePage from "./pages/Home/editprofilePage.jsx";
import ProfilePage from "./pages/Home/profilePage.jsx";
import RegisterPage from "./pages/Login&Registration/registerPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:key" element={<ProductOverview />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/booking/:key" element={<PurchasePage />} />

        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/contact" element={<InquiriesPage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
