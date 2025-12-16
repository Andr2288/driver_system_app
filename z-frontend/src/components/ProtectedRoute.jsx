import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { authUser } = useAuthStore();

  // Якщо не авторизований - на логін
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // Якщо вказані дозволені ролі і роль користувача не підходить
  if (allowedRoles.length > 0 && !allowedRoles.includes(authUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
