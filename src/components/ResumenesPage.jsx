// src/components/ResumenesPage.jsx
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, collection, getDocs, doc, getDoc } from '@/services/firebase';
import { FileText, ArrowLeft } from 'lucide-react';

export default function ResumenesPage({ plan }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumenes, setResumenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchResumenes = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists() || userDoc.data().plan !== plan) {
          navigate('/');
          return;
        }

        const q = collection(db, 'resumenes');
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setResumenes(data);
      } catch (err) {
        console.error("Error cargando resúmenes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumenes();
  }, [user, navigate, plan]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-700">Cargando resúmenes...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 md:p-10 ${plan === 'oro' ? 'bg-gradient-to-br from-yellow-50 to-orange-50' : 'bg-gradient-to-br from-indigo-50 to-purple-100'}`}>
      <div className="max-w-5xl mx-auto">
        {/* VOLVER */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-3 text-xl font-bold text-gray-700 hover:text-gray-900 transition-all"
        >
          <ArrowLeft className="w-8 h-8" />
          Volver al Dashboard
        </button>

        {/* TÍTULO */}
        <h1 className={`text-6xl md:text-7xl font-black text-center mb-16 ${plan === 'oro' ? 'text-yellow-700' : 'text-purple-700'} drop-shadow-lg`}>
          RESÚMENES EXCLUSIVOS
        </h1>

        {/* LISTA */}
        {resumenes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-2xl">
            <FileText className="w-32 h-32 mx-auto text-gray-300 mb-6" />
            <p className="text-2xl font-bold text-gray-600">¡Pronto disponible!</p>
            <p className="text-lg text-gray-500 mt-3">Primer resumen: <strong>Mañana 7:00 AM</strong></p>
          </div>
        ) : (
          <div className="space-y-10">
            {resumenes.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500"
              >
                {/* HEADER */}
                <div className={`p-8 ${plan === 'oro' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-purple-600 to-indigo-700'}`}>
                  <div className="flex items-center gap-6">
                    <FileText className="w-16 h-16 text-white drop-shadow-2xl" />
                    <div>
                      <h3 className="text-3xl font-black text-white">{res.title}</h3>
                      <p className="text-white/90 text-lg">PDF + Mapa Mental</p>
                    </div>
                  </div>
                </div>

                {/* BOTÓN DESCARGA */}
                <div className="p-8 bg-gray-50 text-center">
                  <a
                    href={res.url_temp || res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-4 font-bold text-2xl px-12 py-5 rounded-2xl shadow-2xl transition-all ${
                      plan === 'oro'
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    <FileText className="w-10 h-10" />
                    Descargar Ahora
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
