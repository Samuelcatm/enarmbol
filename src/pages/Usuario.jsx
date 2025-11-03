// src/pages/Usuario.jsx
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import PlanOro from '@/components/PlanOro';
import PlanDiamante from '@/components/PlanDiamante';

export default function Usuario() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, plan, loginWithEmail, logout } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
    } catch (error) {
      // Error ya mostrado
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // MOSTRAR PLAN
  if (user && plan === 'oro') {
    return <PlanOro onLogout={handleLogout} />;
  }
  if (user && plan === 'diamante') {
    return <PlanDiamante onLogout={handleLogout} />;
  }

  // FORMULARIO DE LOGIN
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">ENARMBOL</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user1@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password123"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          ¿No tienes acceso? Contacta al administrador.
        </p>
      </div>
    </div>
  );
}

