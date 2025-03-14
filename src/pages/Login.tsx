import { LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useState } from "react";
import { loginUser } from "../services/apiService";
import { cn } from "../utils/cn";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.config";
import toast from "react-hot-toast";

const Login = () => {
  const { isLoading, setIsLoading, login } = useAuthStore();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
      const token = await userCredential?.user?.getIdToken();
      await loginUser({
        token,
      }).then((res) => {
        login({ user: res?.data?.user, token });
        navigate("/problems");
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error("Something went wrong while logging in");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <LogIn className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Welcome Back</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formState.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium cursor-pointer",
              isLoading && "opacity-50"
            )}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
