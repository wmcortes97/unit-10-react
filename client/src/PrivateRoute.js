import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, context }) {
  let isAuthenticated = context.authenticatedUser;
  return isAuthenticated ? children : <Navigate to="/signin" />;
}

export default PrivateRoute;
