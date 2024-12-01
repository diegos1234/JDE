// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Para manejar la autenticación
import { getFirestore } from "firebase/firestore"; // Para acceder a Firestore

// Configuración de Firebase - asegúrate de poner la información correcta
const firebaseConfig = {
  apiKey: "AIzaSyAezSWIpXJ8LY2Ab5FVNOn3wuawUPfnucs",
  authDomain: "jde000-84f96.firebaseapp.com",
  projectId: "jde000-84f96",
  storageBucket: "jde000-84f96.appspot.com",
  messagingSenderId: "214631456894",
  appId: "1:214631456894:web:c3879fecb3d0f716f8f82f",
  measurementId: "G-H1TT979VGV",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Instancias de Auth y Firestore
const auth = getAuth(app); // Instancia para la autenticación
const db = getFirestore(app); // Instancia para Firestore

export { auth, db }; // Exportar para usarlos en otros componentes
