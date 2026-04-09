import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../api/taskApi";

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;