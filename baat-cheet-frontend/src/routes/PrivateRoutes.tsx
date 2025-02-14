import { Navigate } from "react-router-dom";
import { JSX, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser, setUsers } from "../redux/slices/usersSlice";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:4005/api/auth/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Unauthorized");

      const data = await response.json();
      console.log("User Authenticated:", data);

      dispatch(setUsers(data.users));

      setIsAuthenticated(true);
      dispatch(
        setCurrentUser({
          _id: data.logedInUser.id,
          name: data.logedInUser.name,
          email: data.logedInUser.email,
        })
      );
    } catch (error) {
      console.error("Auth Error:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
