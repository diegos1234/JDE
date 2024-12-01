// src/components/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAezSWIpXJ8LY2Ab5FVNOn3wuawUPfnucs",
  authDomain: "jde000-84f96.firebaseapp.com",
  projectId: "jde000-84f96",
  storageBucket: "jde000-84f96.firebasestorage.app",
  messagingSenderId: "214631456894",
  appId: "1:214631456894:web:c3879fecb3d0f716f8f82f",
  measurementId: "G-H1TT979VGV",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtener las instancias de Auth y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { firebaseConfig, auth, db };
