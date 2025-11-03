import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../firebase';
import Chat from './Chat';

const Videos = ({ user }) => {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: '', speciality: 'Medicina Interna', theme: '', file: null, progress: 0 });
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const specialities = ['Medicina Interna', 'Cirugía General', 'Ginecología y Obstetricia', 'Pediatría', 'Salud Pública'];

  useEffect(() => {
    if (user) {
      const videosQuery = query(collection(db, 'videos'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(videosQuery, (snapshot) => {
        const videosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVideos(videosData);
      }, (error) => {
        console.error("Error fetching videos:", error);
        setError('Error al cargar los videos.');
      });
      return () => unsubscribe();
    } else {
      setVideos([]);
    }
  }, [user]);

  const handleFileChange = (e) => {
    setNewVideo((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.speciality || !newVideo.theme || !newVideo.file) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (!user || user.uid !== auth.currentUser.uid) { // Solo CEO sube videos
      setError('Solo el propietario puede subir videos.');
      return;
    }
    setIsUploading(true);
    try {
      const storageRef = ref(storage, `videos/${newVideo.speciality}/${newVideo.theme}/${newVideo.file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, newVideo.file);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setNewVideo((prev) => ({ ...prev, progress }));
      }, (error) => {
        console.error("Error uploading video:", error);
        setError('Error al subir el video: ' + error.message);
        setIsUploading(false);
      }, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, 'videos'), {
          title: newVideo.title,
          speciality: newVideo.speciality,
          theme: newVideo.theme,
          videoUrl: downloadURL,
          userId: user.uid,
          timestamp: serverTimestamp(),
        });
        setNewVideo({ title: '', speciality: 'Medicina Interna', theme: '', file: null, progress: 0 });
        setError('');
        setIsUploading(false);
      });
    } catch (err) {
      console.error("Error adding video:", err);
      setError('Error al agregar el video: ' + err.message);
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-800 bg-white p-4 rounded-lg shadow-md">Videos - Enarmbol</h2>
      <div className="max-w-3xl mx-auto">
        {user ? (
          <>
            <p className="text-lg text-gray-700 mb-6 text-center bg-white p-3 rounded-lg shadow-sm">
              ¡Hola! Sube y gestiona videos por especialidad y tema.
            </p>
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Título</label>
                  <input
                    type="text"
                    name="title"
                    value={newVideo.title}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Especialidad</label>
                  <select
                    name="speciality"
                    value={newVideo.speciality}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {specialities.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Tema</label>
                  <input
                    type="text"
                    name="theme"
                    value={newVideo.theme}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                  {newVideo.progress > 0 && <progress value={newVideo.progress} max="100" className="w-full mt-2" />}
                </div>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-900 transition disabled:bg-gray-400"
                >
                  {isUploading ? 'Subiendo...' : 'Subir Video'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </form>
            </div>
            <div className="mt-8 space-y-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-2xl font-bold text-blue-800 mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-2">Especialidad: {video.speciality}</p>
                  <p className="text-gray-600 mb-2">Tema: {video.theme}</p>
                  <video controls controlsList="nodownload" className="w-full mb-4">
                    <source src={video.videoUrl} type="video/mp4" />
                    Tu navegador no soporta video.
                  </video>
                  <Chat videoId={video.id} user={user} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-lg text-gray-700 text-center bg-white p-4 rounded-lg shadow-sm">Debes iniciar sesión para ver los videos.</p>
        )}
      </div>
    </div>
  );
};

export default Videos;
