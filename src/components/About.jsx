import { Link } from 'react-router-dom';

const About = ({ user }) => {
  if (!user) return <p className="text-center mt-10">Debes iniciar sesión para ver esta página.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-800 text-white p-4">
        <ul className="flex space-x-6 justify-center">
          <li><Link to="/blog" className="hover:underline">Blog</Link></li>
          <li><Link to="/cursos" className="hover:underline">Cursos</Link></li>
          <li><Link to="/testimonios" className="hover:underline">Testimonios</Link></li>
          <li><Link to="/contacto" className="hover:underline">Contacto</Link></li>
        </ul>
      </nav>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">Quiénes Somos</h1>
        <p className="text-gray-700 mb-4">
          Enarmbol es una plataforma educativa diseñada para médicos en residencia en Bolivia. Nuestra misión es proporcionar recursos, videos, y un espacio de interacción para que los profesionales de la salud crezcan en sus especialidades: Medicina Interna, Cirugía General, Ginecología y Obstetricia, Pediatría, y Salud Pública.
        </p>
        <p className="text-gray-700 mb-4">
          Ofrecemos un blog para compartir experiencias, videos educativos organizados por especialidad y tema, y un foro de preguntas y respuestas para resolver dudas en tiempo real. Todo esto en un entorno seguro y exclusivo para afiliados.
        </p>
        <p className="text-gray-700">
          ¡Únete a nuestra comunidad y lleva tu formación al siguiente nivel!
        </p>
      </div>
    </div>
  );
};

export default About;
