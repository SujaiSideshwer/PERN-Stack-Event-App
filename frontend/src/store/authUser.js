import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

// we are returning an object(dict) as a state from this useAuthStore hook: by enclosing the dict tag with normal braces - ({})
export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/auth/signup", credentials); //we've only given /api endpoint instead of the whole url because in vite config file we have coded for automatically getting prefixed with the localhost url when we give /api
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error.message || "Signup Failed"); //reat-hot-toast is used for errors
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
    } catch (error) {
      set({ isSigningUp: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },
  logout: async (credentials) => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
