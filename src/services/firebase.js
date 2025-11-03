// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TU CONFIGURACIÓN REAL
const firebaseConfig = {
  apiKey: "AIzaSyD-yZL-KbZbDwt_SeZoGxK3opgGXGJvarw",
  authDomain: "enarmbol-seguridad.firebaseapp.com",
  projectId: "enarmbol-seguridad",
  storageBucket: "enarmbol-seguridad.firebasestorage.app",
  messagingSenderId: "209062268401",
  appId: "1:209062268401:web:c46d6bb695fb8366900850"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// EXPORTA TODO LO NECESARIO
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

