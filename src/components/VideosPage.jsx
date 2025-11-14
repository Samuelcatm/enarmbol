import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, collection, getDocs, query, doc, getDoc } from '@/services/firebase';
import { PlayCircle, X } from 'lucide-react';

export default function VideosPage({ plan }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkAndFetch();
  }, [user, navigate, plan]);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  if (loading) return <div className="text-center p-10 text-2xl">Cargando videos acumulativos...</div>;

  return (
    <div className={`min-h-screen p-8 ${plan === 'oro' ? 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100'}`}>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-8 text-xl font-bold flex items-center gap-2 hover:underline">← Volver al Dashboard</button>
        <h1 className={`text-5xl font-black mb-10 text-center ${plan === 'oro' ? 'text-yellow-700' : 'text-purple-700'}`}>VIDEOS EXCLUSIVOS (Acumulativos Diarios)</h1>
        
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
                      <p className="text-md text-gray-600">Rumble unlisted • Solo en tu dashboard</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openVideoModal(video)}
                    className={`font-bold px-8 py-4 rounded-xl text-lg transition-all flex items-center gap-3 shadow-lg ${
                      plan === 'oro' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
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

      {/* MODAL PRIVADO CON CANDADO */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" 
          onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-2xl w-full max-w-6xl h-[85vh] shadow-3xl overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg z-10 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* CANDADO VISUAL */}
            <div className="absolute top-4 left-4 bg-black/90 text-white px-4 py-2 rounded-full text-sm font-bold z-10">
              🔒 PRIVADO - Solo tú
            </div>

            <div className="w-full h-full p-2">
              <iframe
                src={selectedVideo.url}
                className="w-full h-full rounded-xl"
                frameBorder="0"
                allowFullScreen
                title={selectedVideo.title}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
