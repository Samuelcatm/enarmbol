import { useParams } from 'react-router-dom';

const SpecialtyPage = ({ specialtyData }) => {
  const { specialty } = useParams(); // Captura el parámetro de especialidad desde la URL

  // Busca los datos de la especialidad actual
  const currentSpecialty = specialtyData.find(
    (s) => s.name.replace(/ /g, '-') === specialty
  );

  if (!currentSpecialty) {
    return <p className="text-center py-10">Especialidad no encontrada.</p>;
  }

  return (
    <div className="py-10 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
        <h3 className="text-3xl font-bold text-blue-800 mb-4 text-center">
          {currentSpecialty.name}
        </h3>
        <p className="text-lg mb-4">{currentSpecialty.description || 'Descripción pendiente.'}</p>

        {/* Placeholder para Quizizz (reemplazar con URL real cuando la tengas) */}
        {currentSpecialty.quizUrl ? (
          <iframe
            src={currentSpecialty.quizUrl}
            width="100%"
            height="500"
            frameBorder="0"
            allowFullScreen
            className="mb-4 rounded-lg"
            title={`Quiz ${currentSpecialty.name}`}
          ></iframe>
        ) : (
          <p className="text-yellow-600 text-center mb-4">
            Quiz pendiente. Sube la URL de Quizizz cuando esté listo.
          </p>
        )}

        {/* Placeholder para videos o resúmenes (opcional, ajusta según necesites) */}
        {currentSpecialty.videoUrl ? (
          <iframe
            src={currentSpecialty.videoUrl}
            width="100%"
            height="300"
            frameBorder="0"
            allowFullScreen
            className="mb-4 rounded-lg"
            title={`Video ${currentSpecialty.name}`}
          ></iframe>
        ) : (
          <p className="text-yellow-600 text-center mb-4">
            Video o resumen pendiente. Sube la URL cuando esté listo.
          </p>
        )}
      </div>
    </div>
  );
};

export default SpecialtyPage;
