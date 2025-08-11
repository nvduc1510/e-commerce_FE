import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { useAuth } from "./authContext";

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute = ({ element }: PrivateRouteProps): ReactElement => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
