import { Navigate } from "react-router-dom";
import { useRole } from "../context/roleContext";

export const RoleRoute = ({ children, requiredRole }) => {
  const { userRole } = useRole();

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
