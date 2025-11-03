import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, collection, getDocs, query, doc, getDoc } from '@/services/firebase';  // ← CAMBIO AQUÍ: Todo desde proxy
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

  if (loading) return <div className="text-center p-10 text-2xl">Cargando quizzes acumulativos...</div>;

  return (
    <div className={`min-h-screen p-8 ${plan === 'oro' ? 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100'}`}>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-8 text-xl font-bold flex items-center gap-2 hover:underline">← Volver al Dashboard</button>
        <h1 className={`text-5xl font-black mb-10 text-center ${plan === 'oro' ? 'text-yellow-700' : 'text-purple-700'}`}>QUIZZES EXCLUSIVOS (Acumulativos Diarios)</h1>
        {quizzes.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">No hay quizzes subidos aún. ¡Nuevo diario mañana!</p>
        ) : (
          <div className="grid gap-8">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <BookOpen className={`w-16 h-16 ${plan === 'oro' ? 'text-yellow-600' : 'text-purple-600'}`} />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{quiz.title}</h3>
                      <p className="text-md text-gray-600">Quizizz interactivo • Diario acumulativo</p>
                    </div>
                  </div>
                  <button onClick={() => window.open(quiz.url, '_blank')} className={`font-bold px-8 py-4 rounded-xl text-lg transition-all flex items-center gap-3 shadow-lg ${plan === 'oro' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
                    <BookOpen className="w-8 h-8" />
                    Hacer Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
