// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, children }) => {
  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Si está autenticado, muestra los componentes hijos
  return children;
};

export default PrivateRoute;
