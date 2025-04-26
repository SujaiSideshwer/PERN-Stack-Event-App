import React from "react";
import HomeScreen from "./HomeScreen.jsx";
import { useAuthStore } from "../../store/authUser.js";
import Login from "../LoginPage.jsx";

const HomePage = () => {
  const { user } = useAuthStore();

  return <>{user ? <HomeScreen /> : <Login />}</>;
};

export default HomePage;
