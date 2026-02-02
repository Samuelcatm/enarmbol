// src/pages/Usuario.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PlanOro from '@/components/PlanOro';
import PlanDiamante from '@/components/PlanDiamante';
import PlanMegasimulacros from '@/components/PlanMegasimulacros';

export default function Usuario() {
  const { user, plan, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user && plan) {
      console.log('Redirigiendo desde Usuario - plan:', plan);
      if (plan === 'oro') {
        navigate('/plan-oro', { replace: true });
      } else if (plan === 'diamante') {
        navigate('/plan-diamante', { replace: true });
      } else if (plan === 'megasimulacros') {
        navigate('/plan-megasimulacros', { replace: true });
      }
    } else if (user && !plan) {
      // Usuario existe pero sin plan → redirigir a home o mensaje
      navigate('/', { replace: true });
    }
  }, [user, plan, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100">
        <div className="text-4xl font-bold text-yellow-700">
          Cargando tu plan...
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  // Renderizar componente según plan
  if (plan === 'oro') return <PlanOro />;
  if (plan === 'diamante') return <PlanDiamante />;
  if (plan === 'megasimulacros') return <PlanMegasimulacros />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-2xl font-bold text-red-700">
        No tienes un plan activo. Contacta al soporte.
      </div>
    </div>
  );
}
