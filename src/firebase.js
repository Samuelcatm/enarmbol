// src/firebase.js - v10 MODULAR + AUTH + FIRESTORE (tu proyecto "enarmbol-seguridad")
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// TU CONFIG COPIADA EXACTO
const firebaseConfig = {
  apiKey: "AIzaSyD-yzL-kbZDwt_SeZoGxK3opoGXGJvarw",
  authDomain: "enarmbol-seguridad.firebaseapp.com",
  projectId: "enarmbol-seguridad",
  storageBucket: "enarmbol-seguridad.firebasestorage.app",
  messagingSenderId: "200062268401",
  appId: "1:200062268401:web:c46d6bb695fb8366900850"
};

// INICIALIZA
const app = initializeApp(firebaseConfig);

// AUTH
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, onAuthStateChanged };

// FIRESTORE (tu DB con users/videos)
export const db = getFirestore(app);
