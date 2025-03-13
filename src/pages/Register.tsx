import { UserPlus } from "lucide-react";
import { registerUser } from "../services/apiService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { cn } from "../utils/cn";
import { sendEmailVerification, signInWithCustomToken } from "firebase/auth";
import { auth } from "../config/firebase.config";
import toast from "react-hot-toast";

const Register = () => {
  const { isLoading, login } = useAuthStore();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await registerUser({
        name: formState.name,
        email: formState.email,
        password: formState.password,
      });
      const userCredential = await signInWithCustomToken(
        auth,
        response?.data?.data?.emailVerificationToken
      );
      await sendEmailVerification(userCredential?.user);
      login({
        user: response?.data?.user,
        token: userCredential?.user?.refreshToken,
      });
      navigate("/flow");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating an account");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <UserPlus className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Create an Account</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
              required
            />
          </div>
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
