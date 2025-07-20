import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-yellow-500 bg-black text-white relative transition-all z-50">
      {/* Logo */}
      <Link to="/home">
        <img className="h-9" src="/logo-audiomart.png" alt="Company Logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/home" className="hover:text-yellow-400 transition">
          Home
        </Link>
        <Link to="/product" className="hover:text-yellow-400 transition">
          Product
        </Link>
        <Link to="/contact" className="hover:text-yellow-400 transition">
          Contact
        </Link>

        {isLoggedIn && (
          <Link to="/orders" className="hover:text-yellow-400 transition">
            My Orders
          </Link>
        )}

        {/* Cart Icon */}
        <Link to="/cart" className="relative cursor-pointer">
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#FFD700"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute -top-2 -right-3 text-xs text-black bg-yellow-400 w-[18px] h-[18px] rounded-full flex items-center justify-center">
            3
          </span>
        </Link>

        {/* Profile Dropdown */}
        {isLoggedIn && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-yellow-500 rounded-full hover:bg-yellow-900/10 transition"
            >
              <img
                src="https://ui-avatars.com/api/?name=User&background=000000&color=FFD700"
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm hidden md:inline">My Account</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-black border border-yellow-500 rounded-md shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-white hover:bg-yellow-900/20"
                >
                  Profile
                </Link>
                <Link
                  to="/profile/edit"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-white hover:bg-yellow-900/20"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-yellow-900/20"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
        className="sm:hidden"
      >
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#FFD700" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#FFD700" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#FFD700" />
        </svg>
      </button>

      {/* Mobile Menu Content */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-black shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden text-white border-t border-yellow-500`}
      >
        <Link to="/home" className="block hover:text-yellow-400">
          Home
        </Link>
        <Link to="/product" className="block hover:text-yellow-400">
          Product
        </Link>
        <Link to="/contact" className="block hover:text-yellow-400">
          Contact
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/orders" className="block hover:text-yellow-400">
              My Orders
            </Link>
            <Link to="/profile" className="block hover:text-yellow-400">
              Edit Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-left text-red-500 px-0 hover:text-red-400"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
