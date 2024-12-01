import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Reserve() {
  const location = useLocation(); // Obtiene los datos de la ruta seleccionada
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirm, setConfirm] = useState(false);

  // Información de la ruta seleccionada
  const route = location.state?.route; // Ruta pasada desde Main

  if (!route) {
    // Si no se pasa ninguna ruta, redirige a la página de rutas
    navigate("/main");
    return null;
  }

  const handleReserve = () => {
    // Lógica para realizar la reserva
    alert(`Reserva confirmada para ${name}`);
    setConfirm(true);
  };

  return (
    <motion.div
      className="min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Fondo de imagen sin opacidad */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url('/images/background-2.jpg')`, // Ruta de la imagen de fondo
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="flex justify-center items-center min-h-screen relative z-10 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full opacity-90">
          {/* Si se ha confirmado la reserva, mostrar mensaje */}
          {confirm && (
            <motion.div
              className="text-center text-green-600 mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold">¡Reserva Confirmada!</h2>
              <p>Gracias por tu reserva, {name}. Pronto nos pondremos en contacto contigo.</p>
            </motion.div>
          )}

          <motion.h1
            className="text-4xl font-bold text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Reservar Viaje
          </motion.h1>

          {/* Información de la ruta */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold">Ruta Seleccionada</h3>
            <p><strong>Conductor:</strong> {route.conductor}</p>
            <p><strong>Matricula:</strong> {route.matricula}</p>
            <p><strong>Hora de Salida:</strong> {route.horaSalida}</p>
            <p><strong>Hora de Llegada:</strong> {route.horaLlegada}</p>
            <p><strong>Detalles:</strong> {route.detalles}</p>
          </motion.div>

          {/* Formulario de reserva */}
          <motion.form
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {/* Nombre */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <label className="block text-gray-700 text-lg">Nombre Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg"
                placeholder="Ingresa tu nombre completo"
              />
            </motion.div>

            {/* Teléfono */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <label className="block text-gray-700 text-lg">Número de Teléfono</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg"
                placeholder="Ingresa tu número de teléfono"
              />
            </motion.div>

            {/* Botón para confirmar la reserva */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <button
                type="button"
                onClick={handleReserve}
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
              >
                Confirmar Reserva
              </button>
            </motion.div>
          </motion.form>

          {/* Opción de regresar */}
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <button
              onClick={() => navigate("/main")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Volver a Rutas
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Reserve;
