import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[200px] h-full bg-green-200">
        <button className="w-full h-[40px] text-[25px] font-bold  flex justify-center items-center ">
          <BsGraphDown />
          Dashboard
        </button>
        <Link
          to=""
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <FaRegBookmark />
          Orders
        </Link>
        <Link
          to=""
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <MdOutlineSpeaker />
          Items
        </Link>
        <Link
          to=""
          className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"
        >
          <FaRegUser />
          Users
        </Link>
      </div>
      <div className="w-[calc(100vw-200px)] "></div>
    </div>
  );
}
