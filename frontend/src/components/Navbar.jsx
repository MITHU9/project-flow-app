import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className="bg-gray-900 text-white py-4 flex justify-between items-center px-12">
      <Link to="/" className="text-2xl font-bold">
        ProjectFlow
      </Link>

      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        {!user && (
          <>
            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
          </>
        )}
        {user && (
          <Link to="/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
