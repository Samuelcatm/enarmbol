// src/components/PlanMegasimulacros.jsx
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { LogOut } from 'lucide-react';

export default function PlanMegasimulacros() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quizLinks, setQuizLinks] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const loadData = async () => {
      try {
        // Verificar plan
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists() || userDoc.data().plan !== 'megasimulacros') {
          navigate('/');
          return;
        }

        // Cargar links desde Firebase
        const megasRef = doc(db, 'quizzes', 'megasimulacros-1800');
        const megasDoc = await getDoc(megasRef);
        if (megasDoc.exists() && megasDoc.data().links) {
          // Convertir array de links en objetos {id, url}
          setQuizLinks(megasDoc.data().links.map((url, index) => ({
            id: index + 1,
            url
          })));
        } else {
          setQuizLinks([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) return <div className="text-center p-10 text-purple-700 text-2xl">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-purple-800">
            MEGASIMULACROS 2000
          </h1>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Salir
          </button>
        </div>

        {quizLinks.length === 0 ? (
          <p className="text-center text-xl text-gray-700">No hay simulacros disponibles aún. Contacta al soporte.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizLinks.map((quiz) => (
              <a
                key={quiz.id}
                href={quiz.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105 border border-purple-200 hover:border-purple-400 flex items-center justify-between"
              >
                <h3 className="text-xl font-bold text-purple-800">
                  Megasimulacro {quiz.id}
                </h3>
                <button className="bg-purple-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-purple-700 transition-all">
                  Abrir
                </button>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
