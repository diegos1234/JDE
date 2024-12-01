import React, { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000); // Actualiza la hora cada segundo

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  return (
    <div className="text-white text-4xl font-mono">
      {time}
    </div>
  );
}

export default DigitalClock;
