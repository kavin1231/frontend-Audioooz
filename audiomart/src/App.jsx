import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // 👈 Import router
import AdminDashboard from "./components/Admin/adminDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
     <Routes path="/*">
     <Route path="/admin" element={<AdminDashboard />} />
     <Route path="/" element= {<h1>Home</h1>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
