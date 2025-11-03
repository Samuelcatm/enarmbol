import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { NavigateProvider } from '@/context/NavigateContext';
import { AuthProvider } from '@/context/AuthContext'; // NUEVO

const Login = lazy(() => import('./pages/Login.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const Usuario = lazy(() => import('./pages/Usuario.jsx'));
const PlanOro = lazy(() => import('./components/PlanOro.jsx'));
const PlanDiamante = lazy(() => import('./components/PlanDiamante.jsx'));
const VideosPage = lazy(() => import('./components/VideosPage.jsx'));
const QuizzesPage = lazy(() => import('./components/QuizzesPage.jsx'));

function App() {
  return (
    <AuthProvider> {/* ENVUELVE TODO */}
      <NavigateProvider>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usuario" element={<Usuario />} />
            
            <Route path="/plan-oro" element={<PlanOro />} />
            <Route path="/plan-oro/videos" element={<VideosPage plan="oro" />} />
            <Route path="/plan-oro/quizzes" element={<QuizzesPage plan="oro" />} />
            
            <Route path="/plan-diamante" element={<PlanDiamante />} />
            <Route path="/plan-diamante/videos" element={<VideosPage plan="diamante" />} />
            <Route path="/plan-diamante/quizzes" element={<QuizzesPage plan="diamante" />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </NavigateProvider>
    </AuthProvider>
  );
}

export default App;
