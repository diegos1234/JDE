import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

function Viajes() {
  const [origin, setOrigin] = useState(""); // Origen de la ruta
  const [destination, setDestination] = useState(""); // Destino
  const [destinationCoords, setDestinationCoords] = useState([51.505, -0.09]); // Coordenadas de destino inicial
  const [originCoords, setOriginCoords] = useState([51.505, -0.09]); // Coordenadas de origen
  const [duration, setDuration] = useState(""); // Duración estimada
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleOriginChange = (e) => {
    setOrigin(e.target.value); // Actualiza el origen
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value); // Actualiza el destino
  };

  // Función para obtener las coordenadas del destino y origen usando OpenStreetMap API
  const getCoordinates = async (place, type) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
      );
      if (response.data && response.data[0]) {
        const coords = [response.data[0].lat, response.data[0].lon];
        if (type === "origin") {
          setOriginCoords(coords); // Setea las coordenadas de origen
        } else {
          setDestinationCoords(coords); // Setea las coordenadas de destino
          calculateDuration(coords); // Calcula la duración del viaje
        }
      } else {
        alert("No se encontró el lugar.");
      }
    } catch (error) {
      console.error("Error obteniendo las coordenadas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para calcular la duración del viaje (distancia entre el origen y el destino)
  const calculateDuration = (coords) => {
    const R = 6371; // Radio de la tierra en km
    const lat1 = originCoords[0];
    const lon1 = originCoords[1];
    const lat2 = coords[0];
    const lon2 = coords[1];

    // Fórmula de Haversine para calcular la distancia entre dos puntos
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia en km

    // Estimación de la duración (en horas) dependiendo de la velocidad promedio (60 km/h)
    const speed = 60; // Velocidad promedio de 60 km/h
    const estimatedDurationInHours = (distance / speed).toFixed(2); // Duración en horas

    // Convertir horas en minutos
    const totalMinutes = Math.round(estimatedDurationInHours * 60); // Duración en minutos
    const hours = Math.floor(totalMinutes / 60); // Calcular horas
    const minutes = totalMinutes % 60; // Calcular minutos

    // Mostrar la duración en formato de horas y minutos
    setDuration(`${hours} horas, ${minutes} minutos`);
  };

  // Función para mostrar el destino y obtener las coordenadas
  const handleShowDestination = () => {
    getCoordinates(destination, "destination"); // Obtiene las coordenadas del destino
    getCoordinates(origin, "origin"); // Obtiene las coordenadas del origen
  };

  return (
    <div className="relative min-h-screen">
      {/* Fondo de imagen */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-90"
        style={{
          backgroundImage: `url('/images/background-3.png')`, // Ruta de la imagen de fondo
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="flex p-4 relative z-10">
        {/* Mapa a la izquierda */}
        <div className="w-2/3 pr-4">
          <MapContainer
            center={originCoords} // Coordenadas del origen
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Agregar un marcador en el origen */}
            <Marker position={originCoords}>
              <Popup>Tu ubicación inicial</Popup>
            </Marker>
            {/* Agregar un marcador en el destino */}
            <Marker position={destinationCoords}>
              <Popup>¡Aquí está tu destino!</Popup>
            </Marker>

            {/* Agregar una línea entre el origen y el destino */}
            <Polyline
              positions={[originCoords, destinationCoords]}
              color="blue"
              weight={4}
              opacity={0.7}
            />
          </MapContainer>
        </div>

        {/* Información de viaje a la derecha */}
        <div className="w-1/3 pl-4">
          {/* Título animado y con fuente personalizada */}
          <h1 className="text-4xl font-extrabold mb-4 text-white animate__animated animate__fadeIn animate__delay-1s">
            Conecta con tu destino
          </h1>
          <h1 className="text-2xl font-extrabold mb-4 text-white animate__animated animate__fadeIn animate__delay-1s">
            País, Estado, Municipio Cuida tu ortografía
          </h1>

          {/* Origen */}
          <div className="mb-4">
            <label className="block text-white">De dónde viajas</label>
            <input
              type="text"
              value={origin}
              onChange={handleOriginChange}
              placeholder="Ingresa tu ciudad de origen"
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>

          {/* Destino */}
          <div className="mb-4">
            <label className="block text-white">Tu destino</label>
            <input
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Ingresa tu destino"
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>

          {/* Botón para ver el destino */}
          <div className="mt-4">
            <button
              onClick={handleShowDestination}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ver Destino
            </button>
          </div>

          {/* Duración estimada */}
          {duration && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Duración estimada:</h2>
              <p>{duration}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Viajes;
