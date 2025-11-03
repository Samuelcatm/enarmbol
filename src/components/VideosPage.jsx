// src/components/VideosPage.jsx
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { PlayCircle } from 'lucide-react';

export default function VideosPage({ plan }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
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

        const videoQuery = query(collection(db, 'videos'));
        const snapshot = await getDocs(videoQuery);
        setVideos(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Error videos:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAndFetch();
  }, [user, navigate, plan]);

  if (loading) return <div className="text-center p-10 text-2xl">Cargando videos acumulativos...</div>;

  return (
    <div className={`min-h-screen p-8 ${plan === 'oro' ? 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100'}`}>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-8 text-xl font-bold flex items-center gap-2 hover:underline">
          ← Volver al Dashboard
        </button>
        <h1 className={`text-5xl font-black mb-10 text-center ${plan === 'oro' ? 'text-yellow-700' : 'text-purple-700'}`}>
          VIDEOS EXCLUSIVOS (Acumulativos Diarios)
        </h1>
        {videos.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">No hay videos subidos aún. ¡Nuevo diario mañana!</p>
        ) : (
          <div className="grid gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <PlayCircle className={`w-16 h-16 ${plan === 'oro' ? 'text-yellow-600' : 'text-purple-600'}`} />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{video.title}</h3>
                      <p className="text-md text-gray-600">Rumble unlisted • Diario acumulativo</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(video.url, '_blank')}
                    className={`font-bold px-8 py-4 rounded-xl text-lg transition-all flex items-center gap-3 shadow-lg ${plan === 'oro' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
                  >
                    <PlayCircle className="w-8 h-8" />
                    Ver Video
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
