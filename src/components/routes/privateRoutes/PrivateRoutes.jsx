import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = ({children}) => {
  const { token } = useSelector((state) => state.auth);

  console.log(token);
  

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ logged in
  return <>
  {children}</>;
};

export default PrivateRoutes;
