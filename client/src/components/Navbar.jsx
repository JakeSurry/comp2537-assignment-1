import { Link, useLocation } from "react-router-dom";
import { Home, Clock, LogIn, LogOut, ShieldUser } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition duration-200 hover:cursor-pointer ${
      location.pathname === path
        ? "text-primary font-bold"
        : "text-text hover:text-primary"
    }`;

  return (
    <nav className="w-full max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/" className={linkClass("/")}>
          <Home size={18} />
          Home
        </Link>
        {isAuthenticated && (
          <Link to="/activity" className={linkClass("/activity")}>
            <Clock size={18} />
            Activity
          </Link>
        )}
        {user?.role === "admin" && (
          <Link to="/admin" className={linkClass("/admin")}>
            <ShieldUser size={18} />
            Admin
          </Link>
        )}
      </div>

      <div>
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-text hover:text-primary transition duration-200 hover:cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        ) : (
          <Link to="/login" className={linkClass("/login")}>
            <LogIn size={18} />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
