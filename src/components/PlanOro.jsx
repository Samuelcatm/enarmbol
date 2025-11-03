// src/components/PlanOro.jsx
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { PlayCircle, BookOpen } from 'lucide-react';
import LogoOro from '@/assets/images/logo-oro.png';

export default function PlanOro() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const checkPlan = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists() || userDoc.data().plan !== 'oro') {
          navigate('/');
          return;
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkPlan();
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) return <div className="text-center p-10 text-yellow-700 text-2xl">Verificando acceso...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
            <img src={LogoOro} alt="Logo Oro" className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl animate-pulse" />
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-yellow-600 drop-shadow-md">GRUPO ORO</h1>
              <p className="text-sm text-blue-700 font-semibold tracking-wide">ENARMBOL - RESIDENCIA MÉDICA BOLIVIA</p>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </div>

        {/* BIENVENID@ */}
        <div className="text-center mb-16">
          <p className="text-3xl text-gray-700">¡Bienvenid@, <span className="font-bold text-yellow-700">{user?.email}</span>!</p>
        </div>

        {/* ÍCONOS GRANDES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div
            onClick={() => navigate('/plan-oro/videos')}
            className="cursor-pointer bg-white p-12 rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-500 transform hover:scale-110 text-center group"
          >
            <PlayCircle className="w-40 h-40 mx-auto text-yellow-600 mb-8 drop-shadow-2xl group-hover:animate-pulse" />
            <h2 className="text-5xl font-black text-yellow-700">VIDEOS EXCLUSIVOS</h2>
            <p className="text-xl text-gray-600 mt-4">Click → Lista acumulativa diaria</p>
          </div>

          <div
            onClick={() => navigate('/plan-oro/quizzes')}
            className="cursor-pointer bg-white p-12 rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-500 transform hover:scale-110 text-center group"
          >
            <BookOpen className="w-40 h-40 mx-auto text-yellow-600 mb-8 drop-shadow-2xl group-hover:animate-pulse" />
            <h2 className="text-5xl font-black text-yellow-700">QUIZZES EXCLUSIVOS</h2>
            <p className="text-xl text-gray-600 mt-4">Click → Lista acumulativa diaria</p>
          </div>
        </div>

      </div>
    </div>
  );
}
