import "./App.css";
import { BrowserRouter } from "react-router-dom"; // 👈 Import router
import AdminDashboard from "./components/Admin/adminDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <>
        <AdminDashboard />
        
      </>
    </BrowserRouter>
  );
}

export default App;
