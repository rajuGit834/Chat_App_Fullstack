import { Navigate } from "react-router-dom";
import { JSX } from "react";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = localStorage.getItem("baat-cheet-webToken") !== null;

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
