import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';
import { auth, googleProvider, db } from '@/firebase';  // IMPORTA DIRECTO, NO signInWithPopup AQUÍ
import { signInWithPopup } from 'firebase/auth';  // Solo función
import { doc, setDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { user, plan, loginWithEmail, registerWithEmail, assignPlan, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && plan && !loading) {
      if (plan === 'oro') navigate('/plan-oro');
      if (plan === 'diamante') navigate('/plan-diamante');
    }
  }, [user, plan, navigate, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
        if (email.includes('oro')) await assignPlan('oro');
        if (email.includes('diamante')) await assignPlan('diamante');
      }
    } catch (error) {
      toast.error(error.message || 'Error en autenticación');
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('LOGIN GOOGLE OK:', user.uid, user.email);

      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        plan: 'oro',
        createdAt: new Date()
      }, { merge: true });

      toast.success('¡Login con Google exitoso!');
    } catch (error) {
      console.error('ERROR GOOGLE:', error.code, error.message);
      if (error.code === 'auth/popup-blocked') {
        toast.error('Popup bloqueado: Permite popups para localhost');
      } else {
        toast.error(error.message || 'Error con Google');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">ENARMBOL</h1>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-md mb-6 disabled:opacity-50"
        >
          <FcGoogle className="text-2xl" />
          Continuar con Google
        </button>

        <div className="text-center text-sm text-gray-500 mb-4">o</div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 pt-8 text-gray-600 hover:text-indigo-700"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : (isRegister ? 'Registrarse' : 'Iniciar Sesión')}
          </button>
        </form>

        {/* Registro text borrado */}
      </div>
    </div>
  );
}
