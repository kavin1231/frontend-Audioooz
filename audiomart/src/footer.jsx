import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full bg-black text-white">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-white/30 pb-6">
        {/* Logo & Description */}
        <div className="md:max-w-96">
          <img
            className="h-16 w-auto mb-6"
            src="/logo-audiomart.png"
            alt="Company Logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg";
            }}
          />
          <p className="mt-1 text-sm text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Navigation & Contact */}
        <div className="flex-1 flex items-start md:justify-end gap-20">
          {/* Company Links */}
          <div>
            <h2 className="font-semibold mb-5 text-white">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/home" className="hover:text-gray-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300 transition">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300 transition">
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-gray-300 transition"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-semibold mb-5 text-white">Get in touch</h2>
            <div className="text-sm space-y-2 text-white">
              <p>+1-212-456-7890</p>
              <p>contact@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="pt-4 text-center text-xs md:text-sm text-white pb-5">
        Copyright 2024 © Company name. All Rights Reserved.
      </p>
    </footer>
  );
}
