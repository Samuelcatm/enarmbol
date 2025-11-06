// src/components/QuizzesPage.jsx
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, collection, getDocs, query, doc, getDoc } from '@/services/firebase';
import { BookOpen } from 'lucide-react';

export default function QuizzesPage({ plan }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    const checkAndFetch = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists() || userDoc.data().plan !== plan) {
          navigate('/');
          return;
        }
        const quizQuery = query(collection(db, 'quizzes'));
        const snapshot = await getDocs(quizQuery);
        setQuizzes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkAndFetch();
  }, [user, navigate, plan]);

  if (loading) return <div className="text-center p-10 text-2xl">Cargando quizzes...</div>;

  return (
    <div className={`min-h-screen p-8 ${plan === 'oro' ? 'bg-gradient-to-br from-yellow-50 to-orange-50' : 'bg-gradient-to-br from-indigo-50 to-blue-100'}`}>
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-8 text-xl font-bold flex items-center gap-2 hover:underline text-gray-700">
          ← Volver al Dashboard
        </button>

        <h1 className={`text-6xl font-black mb-12 text-center ${plan === 'oro' ? 'text-yellow-700' : 'text-purple-700'} drop-shadow-lg`}>
          QUIZZES EXCLUSIVOS (Diarios)
        </h1>

        {quizzes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No hay quizzes hoy.</p>
            <p className="text-xl text-gray-500 mt-4">¡Nuevo a las 7:00 AM!</p>
          </div>
        ) : (
          <div className="space-y-10">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-3xl shadow-3xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <div className={`p-8 ${plan === 'oro' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-purple-600 to-indigo-700'}`}>
                  <div className="flex items-center gap-6">
                    <BookOpen className="w-16 h-16 text-white drop-shadow-2xl" />
                    <div>
                      <h3 className="text-3xl font-black text-white">{quiz.title}</h3>
                      <p className="text-white/90 text-lg font-medium">Wayground privado • Solo alumnos</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-gray-50 text-center">
                  <button
                    onClick={() => window.open(quiz.url, '_blank', 'noopener,noreferrer')}
                    className={`font-bold px-12 py-5 rounded-2xl text-2xl transition-all flex items-center gap-4 mx-auto shadow-2xl ${
                      plan === 'oro' 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    <BookOpen className="w-10 h-10" />
                    Hacer Quiz Ahora
                  </button>
                  <p className="mt-4 text-sm text-gray-500">
                    Abre en nueva pestaña • 100% seguro
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
