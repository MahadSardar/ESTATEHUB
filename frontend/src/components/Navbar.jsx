import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, LogOut, Menu, X, User, LayoutDashboard } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <Building2 className="text-rose-500" size={26} />
          EstateHub
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-gray-600 transition hover:text-rose-500">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/create-listing" className="text-gray-600 transition hover:text-rose-500">
                Post Property
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="flex items-center gap-1 text-gray-600 transition hover:text-rose-500"
                >
                  <LayoutDashboard size={18} /> Admin
                </Link>
              )}
              <span className="flex items-center gap-1 text-gray-700">
                <User size={18} /> {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg bg-rose-500 px-4 py-2 text-white transition hover:bg-rose-600"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 transition hover:text-rose-500">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-rose-500 px-4 py-2 text-white transition hover:bg-rose-600"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* mobile menu button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="flex flex-col gap-4 border-t px-4 py-4 md:hidden">
          <Link to="/" onClick={() => setOpen(false)} className="text-gray-600">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/create-listing" onClick={() => setOpen(false)} className="text-gray-600">
                Post Property
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" onClick={() => setOpen(false)} className="text-gray-600">
                  Admin
                </Link>
              )}
              <span className="text-gray-700">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-1 rounded-lg bg-rose-500 px-4 py-2 text-white"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="text-gray-600">
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-rose-500 px-4 py-2 text-center text-white"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;