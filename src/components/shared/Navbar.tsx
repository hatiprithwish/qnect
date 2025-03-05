import { Link } from "react-router-dom";
import { LogOut, Box } from "lucide-react";
import useAuthStore from "../../store/authStore";

interface NavbarProps {
  pageTitle?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ pageTitle }) => {
  const { isAuthenticated, logout } = useAuthStore((state) => state);

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Box className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold capitalize">
              {pageTitle ? pageTitle : "Qnect"}
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/problems"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Problems
                </Link>
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
