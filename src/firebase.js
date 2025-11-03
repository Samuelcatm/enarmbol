// src/firebase.js - v10 MODULAR + AUTH + FIRESTORE (COMPLETO)
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';

// TU CONFIG REAL COPIADA DE CONSOLE (REEMPLAZA SI CAMBIA)
const firebaseConfig = {
  apiKey: "AIzaSyD-yZL-KbZbDwt_SeZoGxK3opgGXGJvarw",
  authDomain: "enarmbol-seguridad.firebaseapp.com",
  projectId: "enarmbol-seguridad",
  storageBucket: "enarmbol-seguridad.appspot.com",  // CORREGIDO: .appspot.com
  messagingSenderId: "209062268401",
  appId: "1:209062268401:web:c46d6bb695fb8366900850"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { 
  signInWithPopup, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  doc, 
  setDoc, 
  getDoc,
  collection,
  getDocs,
  query,
  where
};
