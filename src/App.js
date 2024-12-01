// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Profile from "./components/Profile";
import JDEMain from "./components/JDEMain";
import Reserve from "./components/Reserve";
import PrivateRoute from "./components/PrivateRoute";
import Viajes from "./components/Viajes"; // Asegúrate de que Viajes esté importado
import Horario from "./components/Horario"; // Asegúrate de que Horario esté importado
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Ruta para Login */}
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Ruta para el Registro de Usuario */}
        <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />

        {/* Ruta principal protegida */}
        <Route 
          path="/main"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <JDEMain setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          }
        />

        {/* Ruta para Viajes */}
        <Route 
          path="/viajes"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Viajes />
            </PrivateRoute>
          }
        />

        {/* Ruta para Horarios */}
        <Route 
          path="/schedule"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Horario />
            </PrivateRoute>
          }
        />

        {/* Ruta para Profile */}
        <Route 
          path="/profile"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Ruta para Reserva */}
        <Route 
          path="/reserve"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Reserve />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
