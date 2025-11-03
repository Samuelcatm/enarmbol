const Contacto = () => {
  return (
    <section className="py-20" id="contacto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Contáctanos</h3>
          <p className="text-xl text-gray-600">Estamos aquí para ayudarte en tu preparación</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fab fa-whatsapp text-green-600 text-xl"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">WhatsApp</h5>
                  <p className="text-gray-600">+591 73574001</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">Email</h5>
                  <p className="text-gray-600">enarmbol@gmail.com</p>
                </div>
              </div>
              <div className="pt-6">
                <h5 className="font-semibold text-gray-800 mb-4">Síguenos en redes sociales</h5>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad de interés</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                      <option>Selecciona una especialidad</option>
                      <option>Medicina Interna</option>
                      <option>Cirugía General</option>
                      <option>Ginecología y Obstetricia</option>
                      <option>Pediatría</option>
                      <option>Salud Pública</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                    <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;