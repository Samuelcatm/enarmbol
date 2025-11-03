const Herramientas = () => {
  return (
    <section className="py-20 bg-gray-50" id="herramientas">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Herramientas de Estudio</h3>
          <p className="text-xl text-gray-600">Recursos interactivos para optimizar tu preparación</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 card-hover">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-comments text-blue-600 text-2xl"></i>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Chat Colaborativo</h4>
              <p className="text-gray-600 mb-6">Conecta con otros estudiantes, comparte dudas y resuelve casos clínicos en tiempo real con nuestra comunidad médica.</p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Acceder al Chat
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 card-hover">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-question-circle text-green-600 text-2xl"></i>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Quizizz Médicos</h4>
              <p className="text-gray-600 mb-6">Practica con preguntas de selección múltiple actualizadas, simulacros de examen y evaluaciones por especialidad.</p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Iniciar Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herramientas;
