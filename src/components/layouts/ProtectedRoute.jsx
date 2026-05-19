import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import Loading from "../Loading";

/**
 * ProtectedRoute Component
 * Wraps a component to ensure only authenticated users can access it
 * @deprecated Use ProtectedLayout instead
 */
const ProtectedRoute = ({ children, role }) => {
  const { user, isChecking } = useAuthStore();

  if (isChecking) return <Loading />;

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
