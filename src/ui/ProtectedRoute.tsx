import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) <Spinner />;

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
