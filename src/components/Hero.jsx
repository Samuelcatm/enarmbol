const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="gradient-bg text-white py-20" id="inicio">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-6">Prepárate para tu Residencia Médica en Bolivia</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Plataforma educativa especializada en la preparación de médicos postulantes a la residencia médica. Contenido actualizado, metodología probada y resultados garantizados.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection('planes')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Ver Planes
          </button>
          <button
            onClick={() => scrollToSection('especialidades')}
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Especialidades
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
