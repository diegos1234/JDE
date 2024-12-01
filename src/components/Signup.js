// src/components/Signup.js

import React, { useState } from "react";
import { auth } from './firebase-config'; // Asegúrate de que la ruta es correcta
import { createUserWithEmailAndPassword } from "firebase/auth"; // Método de Firebase para crear usuarios

const Signup = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Función para manejar el registro de un nuevo usuario
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validación simple
    if (email === "" || password === "") {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Usamos el método de Firebase para registrar al usuario
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Si el registro es exitoso, redirigimos o mostramos un mensaje
      console.log("Usuario registrado:", user);

      // Cambiamos el estado de autenticación a 'true'
      setIsAuthenticated(true);

      // Puedes redirigir al usuario a otra página o mostrar un mensaje
    } catch (err) {
      setError(err.message); // Mostramos el error si ocurre
      console.error("Error al registrar usuario:", err.message);
    }
  };

  return (
    <div className="signup-form">
      <h2>Registro de Usuario</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar errores */}

      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <div>
          <button type="submit">Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
