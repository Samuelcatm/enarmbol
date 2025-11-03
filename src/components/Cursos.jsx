import { useNavigate } from 'react-router-dom';

const Cursos = ({ user }) => {
  const navigate = useNavigate();

  const handleInscription = (plan) => {
    if (!user && plan !== 'Curso Básico') {
      navigate('/login');
    } else {
      console.log(`Inscribiendo al plan: ${plan}`);
    }
  };

  const planes = [
    {
      title: 'Curso Básico',
      price: 'GRATIS',
      description: 'Acceso libre a contenido fundamental',
      features: [
        'Contenido básico de todas las especialidades',
        'Acceso a foros de discusión',
        'Material de estudio descargable',
        'Actualizaciones mensuales',
      ],
    },
    {
      title: 'Grupo Oro',
      price: '$299',
      description: 'Preparación completa y personalizada',
      features: [
        'Todo el contenido del plan básico',
        'Simulacros de examen ilimitados',
        'Sesiones de tutoría grupal',
        'Acceso a chat exclusivo',
        'Certificado de participación',
      ],
    },
    {
      title: 'Grupo Diamante',
      price: '$599',
      description: 'Experiencia premium con mentoría 1:1',
      features: [
        'Todo el contenido de Grupo Oro',
        'Mentoría personalizada 1:1',
        'Revisión de casos clínicos',
        'Acceso prioritario a nuevos contenidos',
        'Garantía de satisfacción',
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="planes">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Planes de Estudio</h3>
          <p className="text-xl text-gray-600">Elige el plan que mejor se adapte a tus necesidades</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {planes.map((plan, index) => (
            <div key={index} className="plan-card bg-white rounded-xl shadow-lg p-8 card-hover">
              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    plan.title === 'Curso Básico'
                      ? 'bg-green-100'
                      : plan.title === 'Grupo Oro'
                      ? 'bg-yellow-100'
                      : 'bg-purple-100'
                  }`}
                >
                  <i
                    className={`fas ${
                      plan.title === 'Curso Básico'
                        ? 'fa-book'
                        : plan.title === 'Grupo Oro'
                        ? 'fa-crown'
                        : 'fa-gem'
                    } text-2xl ${
                      plan.title === 'Curso Básico'
                        ? 'text-green-600'
                        : plan.title === 'Grupo Oro'
                        ? 'text-yellow-600'
                        : 'text-purple-600'
                    }`}
                  ></i>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h4>
                <div className="text-3xl font-bold mb-2 text-yellow-600">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <i className="fas fa-check mr-3 text-green-600"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleInscription(plan.title)}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.title === 'Curso Básico'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {plan.title === 'Curso Básico' ? 'Acceder Gratis' : 'Suscribirse'}
              </button>
              {plan.title === 'Grupo Oro' && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-bl-lg text-sm font-semibold">
                  Popular
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cursos;

