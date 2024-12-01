// src/components/JDEMain.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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
      position: [19.4340, -99.1350], // Coordenadas de otra ruta
    },
  };

  return (
    <div className="main-container relative h-screen w-full bg-cover bg-center background-transparent">
      {/* Rutas de navegación */}
      <div className="routes-container p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Rutas Disponibles</h2>
        {Object.keys(routesData).map((routeName) => (
          <div key={routeName} className="route-card bg-white p-4 rounded-md mb-4 shadow-md">
            <h3 className="font-semibold">{routeName}</h3>
            <p>Conductor: {routesData[routeName].conductor}</p>
            <p>Matrícula: {routesData[routeName].matricula}</p>
            <p>Hora de salida: {routesData[routeName].horaSalida}</p>
            <p>Hora de llegada: {routesData[routeName].horaLlegada}</p>
            <p>Detalles: {routesData[routeName].detalles}</p>
          </div>
        ))}
      </div>

      {/* Mapa */}
      {location.lat && location.lng && (
        <MapContainer center={[location.lat, location.lng]} zoom={13} className="map-container">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              <span>You are here!</span>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default JDEMain;
