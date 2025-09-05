import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />; // redirect to Home if not admin
  }

  return children;
};

export default ProtectedRoute;
