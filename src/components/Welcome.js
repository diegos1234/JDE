import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Welcome() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="welcome-window"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Bienvenido a JDE</h1>
      <p>Por favor, inicia sesión o regístrate para continuar.</p>
      <button onClick={() => navigate("/login")}>Iniciar sesión</button>
      <button onClick={() => navigate("/register")}>Registrarse</button>
    </motion.div>
  );
}

export default Welcome;
