import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PlanOro from '@/components/PlanOro';
import PlanDiamante from '@/components/PlanDiamante';

export default function Usuario() {
  const { user, plan, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && plan) {
      if (plan === 'oro') {
        navigate('/plan-oro', { replace: true });
      } else if (plan === 'diamante') {
        navigate('/plan-diamante', { replace: true });
      }
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
    navigate('/login');
    return null;
  }

  // Renderiza según el plan
  return plan === 'oro' ? <PlanOro /> : <PlanDiamante />;
}

