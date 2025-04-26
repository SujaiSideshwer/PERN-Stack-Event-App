import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ email, name, password, role });
  };

  const [role, setRole] = useState("audience");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
          Create an Account
        </h2>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex items-center space-x-4">
            {/* <label className="text-sm font-medium text-gray-700">I am a:</label> */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="audience">Audience</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
