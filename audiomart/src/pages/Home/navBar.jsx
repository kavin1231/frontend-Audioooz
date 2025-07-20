import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function BasicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-yellow-400 border-b border-yellow-600 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left Logo */}
        <Link to="/">
          <img src="/logo-audiomart.png" alt="Website Logo" className="h-9" />
        </Link>

        {/* Right "Sign In" Button (Desktop) */}
        <div className="hidden md:flex items-center">
          <Link to="/login" aria-label="Sign in">
            <button
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-5 py-2 rounded-full flex items-center gap-2 
                         shadow-lg shadow-yellow-600/40 hover:from-yellow-500 hover:to-yellow-700 
                         transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Sign In
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-yellow-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black shadow-md border-t border-yellow-600 px-4 py-6 space-y-4 text-yellow-400">
          <Link to="/login" aria-label="Sign in mobile">
            <button
              className="w-full text-left bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2 px-4 rounded-full 
                         hover:from-yellow-500 hover:to-yellow-700 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Sign In
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
