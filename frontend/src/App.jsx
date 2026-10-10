import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Heart } from "lucide-react";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CreateListing from "./pages/CreateListing";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex min-h-screen items-center justify-center gap-3 bg-gray-50">
              <Heart className="text-rose-500" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">EstateHub</h1>
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-listing" element={<ProtectedRoute><CreateListing/></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App;