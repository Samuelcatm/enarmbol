// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';  // OJITO IMPORT

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // TOGGLE OJITO
  const [isRegister, setIsRegister] = useState(false);
  const { user, plan, loginWithEmail, registerWithEmail, assignPlan, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Redirige automáticamente
  useEffect(() => {
    if (user && plan) {
      if (plan === 'oro') navigate('/plan-oro');
      if (plan === 'diamante') navigate('/plan-diamante');
    }
  }, [user, plan, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
        toast.success('¡Cuenta creada!');
      } else {
        await loginWithEmail(email, password);
        // Testing: asignar plan por email
        if (email === 'user1@example.com') await assignPlan('oro');
        if (email === 'user2@example.com') await assignPlan('diamante');
      }
    } catch (error) {
      toast.error('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">ENARMBOL</h1>

        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-md mb-6"
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

          {/* CONTRASEÑA CON OJITO */}
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
              className="absolute inset-y-0 right-0 flex items-center pr-3 pt-8 text-gray-600 hover:text-indigo-700 transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700"
          >
            {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-indigo-600 font-bold hover:underline"
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
}
