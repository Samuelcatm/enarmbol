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

    let planKey = 'basico';
    if (plan === 'Grupo Oro') planKey = 'oro';
    if (plan === 'Grupo Diamante') planKey = 'diamante';
    if (plan === 'Megasimulacros 1800') planKey = 'megasimulacros';

    await assignPlan(planKey);

    // Redirigir según plan
    if (planKey === 'oro') navigate('/plan-oro');
    if (planKey === 'diamante') navigate('/plan-diamante');
    if (planKey === 'megasimulacros') navigate('/plan-megasimulacros');
    if (planKey === 'basico') navigate('/plan-basico');
  };

  const planes = [
    {
      title: 'Curso Básico',
      price: 'Gratis',
      features: ['Acceso limitado', '1 tema por semana'],
      color: 'border-gray-500',
      bg: 'bg-gray-50',
    },
    {
      title: 'Grupo Oro',
      price: '400 Bs',
      original: '800 Bs',
      features: [
        'Clases grabadas por tema',
        'Megasimulacros',
        'Material de estudio en relación a la NUEVA BIBLIOGRAFÍA',
        'Acceso hasta el día del examen',
      ],
      color: 'border-yellow-600',
      bg: 'bg-yellow-50',
      ilimitado: true,
    },
    {
      title: 'Grupo Diamante',
      price: '600 Bs',
      original: '1200 Bs',
      features: [
        'GRUPO DE ESTUDIO',
        'CLASES EN VIVO (retroalimentación semanal)',
        'Clases grabadas por tema',
        'Acceso hasta el día del examen',
        'Quizizz de cada tema',
        'Megasimulacros',
        'Material de estudio en relación a la NUEVA BIBLIOGRAFÍA',
        'Asistencia hasta el día del examen',
      ],
      color: 'border-blue-600',
      bg: 'bg-blue-50',
      popular: true,
    },
    // ★★★ PLAN NUEVO: MEGASIMULACROS 1800 ★★★
    {
      title: 'Megasimulacros 1800',
      price: '50 Bs',
      features: [
        '1800 preguntas para el examen de Residencia Médica Bolivia 2026',
        'Todo lo que debes saber respecto a la nueva bibliografía',
        '36 simulacros completos de 50 preguntas cada uno',
        'Preguntas tipo ENARM con explicaciones detalladas',
        'Acceso inmediato e ilimitado',
      ],
      color: 'border-purple-700',
      bg: 'bg-purple-50',
      popular: true,
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="planes">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold text-center mb-16">Elige tu plan</h3>
        <div className="grid md:grid-cols-4 gap-8">
          {planes.map((p, i) => (
            <div 
              key={i} 
              className={`bg-white p-8 rounded-xl shadow-lg border-4 ${p.color} relative ${p.popular ? 'scale-105 shadow-2xl' : ''}`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">
                  RECOMENDADO
                </div>
              )}
              <h4 className="text-2xl font-bold text-center">{p.title}</h4>
              <p className="text-3xl font-bold text-yellow-600 text-center mt-4">{p.price}</p>
              {p.original && (
                <p className="text-center text-gray-500 line-through">{p.original}</p>
              )}
              <ul className="my-6 space-y-3">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <span className="text-green-600">✔</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleInscription(p.title)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
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