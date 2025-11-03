// src/components/Planes.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Planes = () => {
  const { user, assignPlan } = useAuth();
  const navigate = useNavigate();

  const handleInscription = async (plan) => {
    if (!user) {
      navigate('/login');
      return;
    }

    let planKey = 'oro';
    if (plan === 'Grupo Diamante') planKey = 'diamante';

    await assignPlan(planKey);
    navigate(`/${planKey === 'oro' ? 'plan-oro' : 'plan-diamante'}`);
  };

  const planes = [
    {
      title: 'Curso Básico',
      price: 'Gratis',
      features: ['Acceso limitado', '1 tema por semana']
    },
    {
      title: 'Grupo Oro',
      price: '$99/mes',
      features: ['10 temas', 'Cuestionarios', 'Soporte']
    },
    {
      title: 'Grupo Diamante',
      price: '$199/mes',
      features: ['Todo ilimitado', 'Discord VIP', 'Mentoría']
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="planes">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold text-center mb-16">Elige tu plan</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {planes.map((p, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-bold">{p.title}</h4>
              <p className="text-3xl font-bold text-yellow-600">{p.price}</p>
              <ul className="my-6 space-y-2">
                {p.features.map((f, j) => <li key={j}> {f}</li>)}
              </ul>
              <button
                onClick={() => handleInscription(p.title)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                {p.title === 'Curso Básico' ? 'Acceder Gratis' : 'Suscribirse'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Planes;
