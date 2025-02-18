import { Navigate } from "react-router-dom";
import { JSX, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser, setUsers } from "../redux/slices/usersSlice";
import { getAllUsers } from "../api/usersApi";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  const checkAuthStatus = async () => {
    try {
      const response = await getAllUsers();
      if (response.data.success) {
        console.log("User Authenticated:", response.data);
        setIsAuthenticated(true);
        dispatch(
          setCurrentUser({
            _id: response.data.logedInUser.id,
            name: response.data.logedInUser.name,
            email: response.data.logedInUser.email,
          })
        );
        dispatch(setUsers(response.data.users));
      } else {
        throw new Error("Unauthorized");
      }
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

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
