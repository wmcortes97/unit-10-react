import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, context }) {
  const location = useLocation();
  let isAuthenticated = context.authenticatedUser;
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
}

export default PrivateRoute;
