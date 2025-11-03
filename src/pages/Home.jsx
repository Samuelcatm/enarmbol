// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react';
import { useAppNavigate } from '@/context/NavigateContext';
import heroBg from '../assets/images/hero-bg.png';
import tiktokIcon from '../assets/icons/tiktok.png';
import facebookIcon from '../assets/icons/facebook.png';
import instagramIcon from '../assets/icons/instagram.png';
import telegramIcon from '../assets/icons/telegram.png';
import whatsappIcon from '../assets/icons/whatsapp.png';
import logoEnarmbol from '../assets/icons/logo-enarmbol.png';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef(null);

  const menuItems = [
    { icon: 'Usuario', to: '/login' },
    { icon: 'Planes', to: '#planes' },
    { icon: 'Especialidades', to: '#especialidades' },
    { icon: 'Contacto', to: '#contacto' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = () => {
    setIsVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(false), 10000);
  };

  useEffect(() => {
    const initial = setTimeout(() => setIsVisible(false), 10000);
    timeoutRef.current = initial;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`} style={{ background: 'rgba(30, 64, 175, 0.3)', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={logoEnarmbol} alt="ENARMBOL Logo" className="w-14 h-14 object-contain drop-shadow-md" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">ENARMBOL</h1>
        </div>
        <div className="bg-white/25 backdrop-blur-sm rounded-xl shadow-md p-2 flex gap-2">
          {menuItems.map((item, i) => (
            <button key={i} onClick={() => item.to.startsWith('#') ? scrollTo(item.to.slice(1)) : (window.location.href = item.to)} className="px-4 py-2 rounded-lg hover:bg-white/40 hover:shadow-sm transition-all text-white font-medium text-sm">
              {item.icon}
            </button>
          ))}
          <a href="https://wa.me/59173574001" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const navigate = useAppNavigate();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden pt-16" id="inicio">
      <div className="absolute inset-0 w-full h-full">
        <img src={heroBg} alt="ENARMBOL" className="w-full h-full object-cover object-center" style={{ objectFit: 'cover' }} />
      </div>
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 text-center z-10 relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          Prepárate para el Examen de Residencia Médica en Bolivia
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-medium text-yellow-300 mb-6 drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]">
          Videos y Preguntas ACTUALIZADAS en Base a la Bibliografía 2026
        </p>
        <p className="text-sm sm:text-base md:text-lg mb-10 max-w-3xl mx-auto font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          Preguntas actualizadas | Explicaciones detalladas | Simuladores reales
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/login')} className="bg-white text-blue-700 px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-yellow-50 transition-all shadow-lg transform hover:scale-105">
            Comenzar Ahora
          </button>
          <button onClick={() => scrollTo('planes')} className="border-2 border-white text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-blue-700 transition-all shadow-lg transform hover:scale-105">
            Ver Planes
          </button>
        </div>
      </div>
    </section>
  );
};

const Especialidades = () => {
  const navigate = useAppNavigate();

  const especialidades = [
    { nombre: 'Medicina Interna', icon: 'Stethoscope', color: 'from-blue-500 to-blue-700' },
    { nombre: 'Pediatría', icon: 'Baby', color: 'from-pink-500 to-rose-600' },
    { nombre: 'Cirugía General', icon: 'Scalpel', color: 'from-emerald-500 to-teal-600' },
    { nombre: 'Ginecología y Obstetricia', icon: 'Heart', color: 'from-purple-500 to-indigo-600' },
  ];

  const Icon = ({ name }) => {
    const icons = {
      Stethoscope: () => (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <path d="M12 19h.01"/>
          <path d="M9 19h6"/>
        </svg>
      ),
      Baby: () => (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9 12h6"/>
          <path d="M12 9v6"/>
          <path d="M8 16h8"/>
        </svg>
      ),
      Scalpel: () => (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21l18-18"/>
          <path d="M3 21l6-6"/>
          <path d="M15 9l6-6"/>
        </svg>
      ),
      Heart: () => (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    };
    const IconComponent = icons[name];
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <section className="py-20 bg-gray-50" id="especialidades">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-extrabold text-center text-gray-800 mb-16">Especialidades</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {especialidades.map((esp) => (
            <div key={esp.nombre} className={`bg-gradient-to-br ${esp.color} p-10 rounded-3xl shadow-xl text-white transform transition hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center justify-center text-center`}>
              <div className="p-4 bg-white bg-opacity-25 rounded-2xl mb-6">
                <Icon name={esp.icon} />
              </div>
              <h4 className="text-2xl font-bold mb-8">{esp.nombre}</h4>
              <button onClick={() => navigate('/login')} className="inline-flex items-center gap-2 bg-white text-gray-800 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Comenzar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Planes = () => {
  const planes = [
    {
      nombre: 'GRUPO BÁSICO',
      precio: 'GRATIS',
      color: 'border-gray-500',
      bg: 'bg-gray-50',
      beneficios: [
        '10 Clases grabadas',
        'Cuestionarios de 30 preguntas aleatorias por especialidad',
      ],
      inicio: 'Acceso inmediato',
    },
    {
      nombre: 'GRUPO ORO',
      precio: '400 Bs',
      original: '800 Bs',
      color: 'border-yellow-600',
      bg: 'bg-yellow-50',
      ilimitado: true,
      beneficios: [
        'Clases grabadas por tema',
        'Megasimulacros',
        'Material de estudio en relación a la NUEVA BIBLIOGRAFÍA',
        'Acceso hasta el día del examen',
      ],
      inicio: 'Lunes 3 de noviembre',
    },
    {
      nombre: 'GRUPO DIAMANTE',
      precio: '600 Bs',
      original: '1200 Bs',
      color: 'border-blue-600',
      bg: 'bg-blue-50',
      popular: true,
      beneficios: [
        'GRUPO DE ESTUDIO',
        'CLASES EN VIVO (retroalimentación semanal)',
        'Clases grabadas por tema',
        'Acceso hasta el día del examen',
        'Quizizz de cada tema',
        'Megasimulacros',
        'Material de estudio en relación a la NUEVA BIBLIOGRAFÍA',
        'Asistencia hasta el día del examen',
      ],
      inicio: 'Lunes 3 de noviembre',
    },
  ];

  const redes = [
    { name: 'TikTok', url: 'https://tiktok.com/@residenciamedicabolivia_', icon: tiktokIcon },
    { name: 'Facebook', url: 'https://www.facebook.com/Residenciamedicaboliviaenarmbol', icon: facebookIcon },
    { name: 'Instagram', url: 'https://www.instagram.com/residenciamedicabolivia2025?igsh=bjk1bXAydnBjZmps', icon: instagramIcon },
    { name: 'Telegram', url: 'https://t.me/ResidenciaMedicaBolivia23', icon: telegramIcon },
    { name: 'WhatsApp', url: 'https://wa.me/59173574001', icon: whatsappIcon },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="planes">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-extrabold text-gray-800 mb-4">Elige tu Grupo de Estudio</h3>
          <p className="text-xl text-gray-600 mb-6"><strong className="text-green-600">¡INICIO: LUNES 3 DE NOVIEMBRE!</strong></p>
          <p className="text-lg text-red-600 font-bold">PROMOCIÓN VÁLIDA HASTA EL DOMINGO 2 DE NOVIEMBRE 2025</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {planes.map((plan) => (
            <div key={plan.nombre} className={`relative border-4 ${plan.color} rounded-3xl p-8 text-center transition-all hover:shadow-2xl hover:scale-105 ${plan.bg} flex flex-col justify-between`}>
              {plan.ilimitado && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">ILIMITADO</div>}
              {plan.popular && <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">CUPOS LIMITADOS</div>}
              <div>
                <h4 className="text-3xl font-extrabold text-gray-800 mb-4">{plan.nombre}</h4>
                <div className="mb-6">
                  {plan.original ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl text-gray-400 line-through">{plan.original}</span>
                      <span className="text-4xl font-bold text-green-600">{plan.precio}</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-green-600">{plan.precio}</span>
                  )}
                </div>
                <ul className="text-left mb-6 space-y-2 text-gray-700 text-sm">
                  {plan.beneficios.map((beneficio, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12h14"/>
                        <path d="M12 5l7 7-7 7"/>
                      </svg>
                      <span>{beneficio}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-semibold text-gray-600 mb-6 italic">{plan.inicio}</p>
              </div>
              <a href={`https://wa.me/59173574001?text=¡Quiero%20inscribirme%20al%20${encodeURIComponent(plan.nombre)}!`} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-all shadow-md w-full">
                INSCRÍBETE AQUÍ
              </a>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 mt-16">
          {redes.map((red) => (
            <a key={red.name} href={red.url} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-200 border border-gray-200" title={red.name}>
              <img src={red.icon} alt={red.name} className="w-8 h-8 object-contain" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 text-center" id="contacto">
    <p className="text-sm">© 2025 ENARMBOL. Todos los derechos reservados.</p>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Especialidades />
      <Planes />
      <Footer />
    </div>
  );
}
