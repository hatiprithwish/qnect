import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/oauth" replace />;
  }

  return children;
}

export default ProtectedRoute;
