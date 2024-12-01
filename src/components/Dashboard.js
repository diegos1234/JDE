import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <motion.div
      className="mainInterface"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Bienvenido al Dashboard</h1>
      <p>Aquí puedes ver tus estadísticas y opciones.</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </motion.div>
  );
}

export default Dashboard;
