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
import { auth, googleProvider, db } from '@/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserPlan = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userPlan = userDoc.data().plan;
        console.log('Plan cargado desde Firestore:', userPlan);
        setPlan(userPlan || null);
      } else {
        console.log('Documento de usuario no existe aún para UID:', uid);
        setPlan(null);
      }
    } catch (err) {
      console.error('Error al cargar plan:', err);
      setPlan(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await loadUserPlan(currentUser.uid);
        // Retry después de 1 segundo por si el documento se creó justo ahora
        setTimeout(() => {
          loadUserPlan(currentUser.uid);
        }, 1000);
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
      console.error('ERROR GOOGLE:', error);
      toast.error('Error al iniciar con Google');
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

  const registerWithEmail = async (email, password, initialPlan = 'oro') => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      await setDoc(doc(db, 'users', uid), {
        email,
        plan: initialPlan,
        createdAt: new Date().toISOString()
      });

      // Forzar actualización inmediata
      setPlan(initialPlan);
      await loadUserPlan(uid);

      toast.success('¡Cuenta creada con éxito!');
      return true;
    } catch (error) {
      toast.error('Error al registrarse: ' + error.message);
      throw error;
    }
  };

  const assignPlan = async (newPlan) => {
    if (!user?.uid) {
      toast.error('Debes iniciar sesión primero');
      return;
    }
    try {
      await setDoc(doc(db, 'users', user.uid), { plan: newPlan }, { merge: true });
      setPlan(newPlan);
      toast.success(`Plan ${newPlan} activado correctamente`);
    } catch (error) {
      console.error('Error al asignar plan:', error);
      toast.error('No se pudo cambiar el plan');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Sesión cerrada');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      plan,
      loading,
      loginWithGoogle,
      loginWithEmail,
      registerWithEmail,
      assignPlan,
      logout
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
