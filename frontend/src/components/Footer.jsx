import React from "react";
import { FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
      <div className="flex space-x-4 items-center mb-2 md:mb-0">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-600"
        >
          <FaGithub className="w-5 h-5" />
        </a>
        <a
          href="mailto:youremail@example.com"
          className="hover:text-indigo-600"
        >
          <FaEnvelope className="w-5 h-5" />
        </a>
        <a href="tel:+1234567890" className="hover:text-indigo-600">
          <FaPhone className="w-5 h-5" />
        </a>
      </div>
      <div className="text-center md:text-right">
        © {new Date().getFullYear()} Eventify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
