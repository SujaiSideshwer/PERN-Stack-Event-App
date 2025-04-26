import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home/HomePage";
import EventPage from "./pages/EventPage";
import Footer from "./components/Footer";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import BookingCard from "./pages/BookingCard";
import MyBookings from "./pages/MyBookings";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log("user is: ", user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  // shows loader when redirecting to homepage when user is already logged in and tries to click login/signup:
  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/event/:id"
          element={user ? <EventPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/bookings"
          element={user ? <MyBookings /> : <Navigate to={"/"} />}
        />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
