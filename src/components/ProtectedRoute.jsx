import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(GeneralContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
