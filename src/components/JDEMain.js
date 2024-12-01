import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";

function JDEMain({ setIsAuthenticated }) {
  const navigate = useNavigate();

  // Estado para la geolocalización
  const [location, setLocation] = useState({ lat: null, lng: null });

  // Obtener la ubicación actual del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
        }
      );
    } else {
      console.log("Geolocalización no soportada en este navegador.");
    }
  }, []);

  // Datos simulados de las rutas
  const routesData = {
    "Ruta Cotidiana": {
      conductor: "Carlos Pérez",
      matricula: "AB123CD",
      horaSalida: "08:00 AM",
      horaLlegada: "10:00 AM",
      detalles: "Ruta habitual para el transporte de empleados hacia la ciudad.",
      position: [19.4326, -99.1332], // Coordenadas de la ruta
    },
    "Ruta Personalizada": {
      conductor: "Luis Gómez",
      matricula: "EF456GH",
      horaSalida: "09:00 AM",
      horaLlegada: "11:00 AM",
      detalles: "Ruta personalizada, espacio amplio y cómodo.",
      position: [19.4340, -99.1350], // Coordenadas de la ruta personalizada
    },
  };

  // Seleccionar una ruta
  const handleSelectRoute = (routeName) => {
    navigate("/reserve", { state: { route: routesData[routeName] } });
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-90"
        style={{
          backgroundImage: `url('/images/JAJAJA.jpg')`, // Ruta de la imagen de fondo
        }}
      ></div>

      {/* Barra de Navegación */}
      <nav className="bg-0000 text-white p-4 shadow-md z-10 relative">
        <ul className="flex justify-center space-x-8 text-lg">
          <motion.li
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/main")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Rutas
          </motion.li>
          <motion.li
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/viajes")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Viajes
          </motion.li>
          <motion.li
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/profile")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Perfil
          </motion.li>
          <motion.li
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/schedule")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Horarios
          </motion.li>
          <motion.li
            className="hover:underline cursor-pointer"
            onClick={() => setIsAuthenticated(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Cerrar Sesión
          </motion.li>
        </ul>
      </nav>

        {/* Encabezado con fondo negro y animación */}
        <motion.header
          className="text-center py-20 bg-black text-white relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
         <h1 className="text-5xl font-bold mb-4">Explora Nuestras Rutas</h1>
         <p className="text-lg mb-6 italic font-helvetica">Rutas que te llevan más lejos</p> {/* Cursiva con Helvetica */}
        </motion.header>


      {/* Sección de rutas con animación */}
      <motion.section
        className="py-16 bg-gray-100 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {Object.keys(routesData).map((routeName) => (
            <motion.div
              key={routeName}
              className="bg-black text-white rounded-lg shadow-lg p-6 text-center hover:scale-105 transform transition-all cursor-pointer"
              onClick={() => handleSelectRoute(routeName)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-bold mb-2">{routeName}</h3>
              <p className="text-gray-300">{routesData[routeName].detalles}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Mapa pequeño con ubicación actual */}
      <motion.section
        className="py-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-2xl font-bold text-center text-white">Tu Ubicación Actual</h3>
        <div className="map-container-wrapper bg-black rounded-lg shadow-lg p-4 mt-4 max-w-sm mx-auto">
          <div className="map-container">
            {location.lat && location.lng ? (
              <MapContainer
                center={[location.lat, location.lng]}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false} // Desactiva el zoom con scroll
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <Marker position={[location.lat, location.lng]}>
                  <Popup>¡Aquí estás!</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p className="text-center">Cargando ubicación...</p>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default JDEMain;
