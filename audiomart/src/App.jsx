import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // 👈 Import router
import AdminDashboard from "./pages/Admin/adminDashboard.jsx";
import HomePage from "./pages/Home/homePage.jsx";

function App() {
  return (
    <BrowserRouter>
     <Routes path="/*">
     <Route path="/admin/*" element={<AdminDashboard />} />
     <Route path="/*" element= {<HomePage/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
