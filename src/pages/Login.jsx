// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { user, plan, loginWithEmail } = useAuth();
  const navigate = useNavigate();

  // Redirect si ya está logueado
  useEffect(() => {
    if (user && plan) {
      if (plan === 'oro') navigate('/plan-oro');
      else if (plan === 'diamante') navigate('/plan-diamante');
      else if (plan === 'megasimulacros') navigate('/plan-megasimulacros'); // ← NUEVA LÍNEA
    }
  }, [user, plan, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      toast.success('¡Bienvenido a ENARMBOL!');
    } catch (error) {
      toast.error('Correo o contraseña incorrectos');
    }
  };

  const handleContact = () => {
    window.open('https://wa.me/59173574001?text=¡Hola!%20Quiero%20acceder%20a%20ENARMBOL%20🥼', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">ENARMBOL</h1>

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
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            onClick={handleContact}
            className="text-indigo-600 font-bold hover:underline"
          >
            Contáctanos
          </button>
        </p>
      </div>
    </div>
  );
}
