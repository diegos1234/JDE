import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Clock from "react-clock"; // Para el reloj
import "react-clock/dist/Clock.css"; // Importamos los estilos de react-clock

// Componente Login
function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre Login y Sign Up
  const [showForm, setShowForm] = useState(false); // Estado para controlar el deslizamiento
  const [currentTime, setCurrentTime] = useState(new Date()); // Hora actual
  const navigate = useNavigate();

  // Actualizar la hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Función para manejar login
  const handleLogin = (event) => {
    event.preventDefault();

    if (username === "admin" && password === "1234") {
      setIsAuthenticated(true);
      navigate("/main"); // Redirige a la página principal
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  };

  // Función para cambiar entre Login y SignUp
  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setShowForm(true); // Mostrar el formulario con deslizamiento
  };

  return (
    <motion.div
      className="flex min-h-screen bg-gradient-to-r from-black to-gray-400 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Contenedor izquierdo (Imagen, Botones y Reloj) */}
      <div className="w-1/3 bg-gray-800 flex flex-col items-center justify-center text-white p-6 relative">
        <div className="mb-6">
          <img
            src="/images/main-background.jpg" // Ruta de la imagen
            alt="Login Image"
            className="w-48 h-48 object-cover rounded-full"
          />
        </div>

        <div className="flex flex-col items-center mb-8">
          <button
            onClick={handleSwitch}
            className={`text-lg px-6 py-2 rounded mb-4 ${isLogin ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
          >
            Ingresar
          </button>
          <button
            onClick={handleSwitch}
            className={`text-lg px-6 py-2 rounded ${!isLogin ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
          >
            Registrar
          </button>
        </div>

        {/* Reloj */}
        <div className="mt-8">
          <h3 className="text-white text-lg mb-4">Hora Actual</h3>
          <div className="text-center">
            <Clock value={currentTime} size={150} renderSecondHand={true} />
            <p className="text-white text-xl mt-2">{currentTime.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Contenedor derecho (Formulario de Login o Registro) */}
      <div className="w-2/3 flex items-center justify-center">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full opacity-90"
          animate={{ x: showForm ? 0 : 1000 }} // Deslizar el formulario desde la derecha
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-6 text-black">
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </h1>

          {/* Formulario de Login o Registro */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg">Usuario:</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-lg">Contraseña:</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg mb-6 text-lg"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-all"
            >
              {isLogin ? "Ingresar" : "Registrar"}
            </button>
          </form>

          {/* Opción de cambiar entre Login y Registro */}
          <div className="text-center mt-4">
            <span
              className="text-blue-600 cursor-pointer"
              onClick={handleSwitch}
            >
              {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Login;
