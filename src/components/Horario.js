import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import DatePicker from "react-datepicker"; // Importamos un datepicker
import "react-datepicker/dist/react-datepicker.css"; // Importamos el estilo para el datepicker
import "react-clock/dist/Clock.css"; // Importamos el CSS del reloj
import Clock from 'react-clock'; // Importamos el reloj

// Lista simulada de horarios de reserva
const availableTimes = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

function Horario() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Fecha seleccionada por el usuario
  const [selectedTime, setSelectedTime] = useState(""); // Hora seleccionada
  const [reservation, setReservation] = useState(null); // Detalles de la reserva
  const [currentTime, setCurrentTime] = useState(new Date()); // Estado para la hora actual

  // Función para actualizar la hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Actualiza cada segundo
    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  // Función para manejar la selección de fecha
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Función para manejar la selección de la hora
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Función para hacer la reserva
  const handleReservation = () => {
    if (!selectedTime) {
      alert("Por favor, selecciona un horario.");
      return;
    }
    setReservation({ date: selectedDate, time: selectedTime });
    alert(`Reserva realizada para el ${selectedDate.toLocaleDateString()} a las ${selectedTime}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Título de la sección */}
        <motion.h1
          className="text-5xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Gestiona tus Horarios y Reservas
        </motion.h1>

        {/* Fila de widgets con animaciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Widget de Calendario */}
          <motion.div
            className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition-all cursor-pointer"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CalendarIcon className="w-14 h-14 text-blue-600 mb-4 transform transition-all hover:scale-125" />
            <h2 className="text-2xl font-semibold mb-2">Calendario de Horarios</h2>
            <p className="text-gray-600 mb-4">Consulta tu calendario de disponibilidad.</p>

            {/* DatePicker para seleccionar fecha */}
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              className="w-full p-3 border-2 border-blue-600 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />

            {/* Mostrar horarios disponibles */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Horarios Disponibles</h3>
              <ul className="list-none space-y-2">
                {availableTimes.map((time, index) => (
                  <li 
                    key={index} 
                    className="cursor-pointer hover:bg-blue-200 p-2 rounded-lg transition-all"
                    onClick={() => handleTimeSelect(time)}>
                    {time}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Widget de Reserva */}
          <motion.div
            className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition-all cursor-pointer"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ClockIcon className="w-14 h-14 text-blue-600 mb-4 transform transition-all hover:scale-125" />
            <h2 className="text-2xl font-semibold mb-2">Reserva tu Horario</h2>
            <p className="text-gray-600 mb-4">Selecciona un horario para hacer tu reserva.</p>

            {/* Botón para confirmar reserva */}
            <button
              onClick={handleReservation}
              className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Confirmar Reserva
            </button>
          </motion.div>

          {/* Widget del Reloj */}
          <motion.div
            className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition-all cursor-pointer"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ClockIcon className="w-14 h-14 text-blue-600 mb-4 transform transition-all hover:scale-125" />
            <h2 className="text-2xl font-semibold mb-2">Hora Actual</h2>
            <p className="text-gray-600 mb-4">Consulta la hora actual</p>

            {/* Reloj digital */}
            <div className="text-3xl font-bold text-blue-600">
              {currentTime.toLocaleTimeString()}
            </div>
            <Clock value={currentTime} size={150} renderSecondHand={true} />
          </motion.div>
          
        </div>

        {/* Información adicional sobre reservas */}
        <div className="mt-12">
          <motion.h2
            className="text-2xl font-semibold text-center text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ¿Cómo gestionar tus horarios?
          </motion.h2>

          <motion.p
            className="text-lg text-center text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Gestiona tus horarios fácilmente con nuestra herramienta. Selecciona el día y la hora disponibles para hacer tus reservas.
          </motion.p>
        </div>

        {/* Mostrar los detalles de la reserva si la hay */}
        {reservation && (
          <div className="mt-8 text-center p-4 bg-blue-100 rounded-lg">
            <h3 className="text-xl font-semibold">Reserva Confirmada</h3>
            <p className="text-gray-600">Tu reserva para el {reservation.date.toLocaleDateString()} a las {reservation.time} ha sido confirmada.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Horario;
