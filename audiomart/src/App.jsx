import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // 👈 Import router
import AdminDashboard from "./pages/Admin/adminDashboard.jsx";
import HomePage from "./pages/Home/homePage.jsx";
import ContactPage from "./pages/Home/contactPage.jsx";
import AboutPage from "./pages/Home/aboutPage.jsx";
import NotFoundPage from "./pages/Home/notFoundPage.jsx";
import Testing from "./components/testing.jsx";
import LoginPage from "./pages/Login & Registration/login.jsx";
function App() {
  return (
    <BrowserRouter>
     <Routes path="/*">
     <Route path="/admin/*" element={<AdminDashboard />} />
     <Route path="/Home" element= {<HomePage/>}/>
     <Route path="/product" element={<productPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/testing" element={<Testing />} />
      <Route path="/login" element={<LoginPage />} />
     
     </Routes>
     
    </BrowserRouter>
  );
}

export default App;
