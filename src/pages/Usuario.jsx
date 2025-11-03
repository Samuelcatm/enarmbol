import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PlanOro from '@/components/PlanOro';
import PlanDiamante from '@/components/PlanDiamante';
import Login from './Login'; // Reuse Login si quieres form

export default function Usuario() {
  const { user, plan, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && plan) {
      if (plan === 'oro') navigate('/plan-oro');
      if (plan === 'diamante') navigate('/plan-diamante');
    }
  }, [user, plan, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  if (!user) {
    return <Login />; // Muestra Login si no autenticado
  }

  if (plan === 'oro') {
    return <PlanOro onLogout={handleLogout} />;
  }
  if (plan === 'diamante') {
    return <PlanDiamante onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
        <p className="text-3xl font-bold text-indigo-700">Cargando plan...</p>
        <button onClick={handleLogout} className="mt-6 bg-red-600 text-white px-8 py-3 rounded-xl">Cerrar Sesión</button>
      </div>
    </div>
  );
}

