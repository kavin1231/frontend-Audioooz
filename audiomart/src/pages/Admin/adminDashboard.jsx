import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AddItemPage from "./addItemsPage";
import ItemsPage from "./itemsPage";
import UpdateItemPage from "./updateItems";
import OrdersPage from "./ordersPage";
import AdminInquiryResponsePage from "./AdminInquiryResponsePage";
import UserPage from "./userPage";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // or remove specific keys if needed
    navigate("/login");
  };

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-yellow-400 flex flex-col shadow-md border-r border-yellow-500 justify-between">
        <div>
          <div className="text-2xl font-bold py-6 flex items-center justify-center border-b border-yellow-500">
            <BsGraphDown className="mr-2" />
            Dashboard
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            <Link
              to="/admin/bookings"
              className="flex items-center space-x-3 px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-md transition-all duration-200"
            >
              <FaRegBookmark className="text-lg" />
              <span className="text-base">Bookings</span>
            </Link>
            <Link
              to="/admin/items"
              className="flex items-center space-x-3 px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-md transition-all duration-200"
            >
              <MdOutlineSpeaker className="text-lg" />
              <span className="text-base">Items</span>
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center space-x-3 px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-md transition-all duration-200"
            >
              <FaRegUser className="text-lg" />
              <span className="text-base">Users</span>
            </Link>
            <Link
              to="/admin/inquiries"
              className="flex items-center space-x-3 px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-md transition-all duration-200"
            >
              <MdOutlineSpeaker className="text-lg" />
              <span className="text-base">Inquiries</span>
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-yellow-500">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-all duration-200"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-3xl font-semibold text-gray-800">
                Welcome to Admin Dashboard
              </h1>
            }
          />
          <Route path="/bookings" element={<OrdersPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/items/add" element={<AddItemPage />} />
          <Route path="/items/edit" element={<UpdateItemPage />} />
          <Route path="/inquiries" element={<AdminInquiryResponsePage />} />
          <Route path="/users" element={<UserPage />} />
        </Routes>
      </main>
    </div>
  );
}
