import { HandHeart } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuthStore } from "../store/authUser";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl flex gap-2 font-semibold text-indigo-600">
        <HandHeart />
        Eventify
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-gray-700 items-center">
        <li>
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/events" className="hover:text-indigo-600">
            Events
          </Link>
        </li>
        <li>
          <Link to="/bookings" className="hover:text-indigo-600">
            My Bookings
          </Link>
        </li>
        {user ? (
          <li>
            <button onClick={handleLogout} className="hover:text-red-500">
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" className="hover:text-indigo-600">
              Login
            </Link>
          </li>
        )}
      </ul>

      {/* Hamburger Menu Icon */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-4 p-4 z-50 md:hidden">
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-indigo-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              onClick={() => setIsOpen(false)}
              className="hover:text-indigo-600"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/bookings"
              onClick={() => setIsOpen(false)}
              className="hover:text-indigo-600"
            >
              My Bookings
            </Link>
          </li>
          {user ? (
            <li>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="hover:text-red-500"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="hover:text-indigo-600"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
