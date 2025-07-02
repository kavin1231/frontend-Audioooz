import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[200px] h-full bg-green-200">
        <button className="w-full h-[40px] text-[25px] font-bold  flex justify-center items-center ">
          <BsGraphDown />
          Dashboard
        </button>
        <Link
          to="/admin/bookings"
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <FaRegBookmark />
          Bookings
        </Link>
        <Link
          to="/admin/items"
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <MdOutlineSpeaker />
          Items
        </Link>
        <Link
          to="/admin/users"
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <FaRegUser />
          Users
        </Link>
      </div>
      <div className="w-[calc(100vw-200px)] bg-yellow-200">
        <Routes path="/*">
          <Route path="#" element={<h1 className="text-2xl">Welcome to Admin Dashboard</h1>} />
          <Route path="/bookings" element={<h1 className="text-2xl">Orders Page</h1>} />
          <Route path="/items" element={<h1 className="text-2xl">Items Page</h1>} />
          <Route path="/users" element={<h1 className="text-2xl">Users Page</h1>} />
          
        </Routes>

      </div>
    </div>
  );
}
