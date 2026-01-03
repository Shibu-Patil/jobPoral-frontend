import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);


  if (!token || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // ✅ logged in
  return <Outlet />;
};

export default PrivateRoutes;
