import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/authStore";

const OAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);

      // Get the user object
      const user = result.user;
      console.log(user);
      login({
        isAuthenticated: true,
        // @ts-ignore
        user: user,
        token: user.refreshToken,
      });

      // Success notification
      toast.success(`Welcome, ${user.displayName || "User"}!`);

      // Redirect to your app's main page
      navigate("/flow");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] p-4 bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Sign in to Qnect
        </h1>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-md transition duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
            <path fill="none" d="M1 1h22v22H1z" />
          </svg>
          {isLoading ? (
            <span>Signing in...</span>
          ) : (
            <span>Sign in with Google</span>
          )}
        </button>

        <div className="text-center text-sm text-gray-400 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
          (which is none).
        </div>
      </div>
    </div>
  );
};

export default OAuth;
