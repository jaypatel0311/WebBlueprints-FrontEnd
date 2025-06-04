import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { CircularProgress } from "@mui/material";

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    // Save the attempted route for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
