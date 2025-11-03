// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/services/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setPlan(userDoc.data().plan);
        } else {
          await setDoc(doc(db, 'users', currentUser.uid), { plan: 'oro' });
          setPlan('oro');
        }
      } else {
        setPlan(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('¡Bienvenido con Google!');
    } catch (error) {
      toast.error('Error con Google');
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('¡Login exitoso!');
    } catch (error) {
      toast.error('Correo o contraseña incorrectos');
      throw error;
    }
  };

  const registerWithEmail = async (email, password) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        email,
        plan: 'oro',
        createdAt: new Date().toISOString()
      });
      toast.success('¡Cuenta creada!');
    } catch (error) {
      toast.error('Error al registrarse');
      throw error;
    }
  };

  const assignPlan = async (newPlan) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid), { plan: newPlan }, { merge: true });
      setPlan(newPlan);
      toast.success(`Plan ${newPlan} activado`);
    } catch (error) {
      toast.error('Error al cambiar plan');
    }
  };

  const logout = async () => {
    await signOut(auth);
    toast.success('Sesión cerrada');
  };

  return (
    <AuthContext.Provider value={{
      user, plan, loading,
      loginWithGoogle, loginWithEmail, registerWithEmail,
      assignPlan, logout
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// ESTO ES LO QUE FALTABA
export const useAuth = () => useContext(AuthContext);
