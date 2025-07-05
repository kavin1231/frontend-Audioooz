import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import AddItemPage from "./addItemsPage";
import ItemsPage from "./itemsPage";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-green-600 text-white flex flex-col shadow-md">
        <div className="text-2xl font-bold py-6 flex items-center justify-center border-b border-green-500">
          <BsGraphDown className="mr-2" />
          Dashboard
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            to="/admin/bookings"
            className="flex items-center space-x-3 px-4 py-2 hover:bg-green-500 rounded-md transition-all duration-200"
          >
            <FaRegBookmark className="text-lg" />
            <span className="text-base">Bookings</span>
          </Link>
          <Link
            to="/admin/items"
            className="flex items-center space-x-3 px-4 py-2 hover:bg-green-500 rounded-md transition-all duration-200"
          >
            <MdOutlineSpeaker className="text-lg" />
            <span className="text-base">Items</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center space-x-3 px-4 py-2 hover:bg-green-500 rounded-md transition-all duration-200"
          >
            <FaRegUser className="text-lg" />
            <span className="text-base">Users</span>
          </Link>
        </nav>
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
          <Route
            path="/bookings"
            element={
              <h1 className="text-2xl font-medium text-gray-700">Orders Page</h1>
            }
          />
          <Route
            path="/items"
            element={
              <ItemsPage/>
            }
          />
          <Route
            path="/items/add"
            element={
              <AddItemPage/ >
            }
            />
          <Route
            path="/users"
            element={
              <h1 className="text-2xl font-medium text-gray-700">Users Page</h1>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
