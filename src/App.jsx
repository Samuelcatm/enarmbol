// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { NavigateProvider } from '@/context/NavigateContext';

const Login = lazy(() => import('./pages/Login.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const Usuario = lazy(() => import('./pages/Usuario.jsx'));
const PlanOro = lazy(() => import('./components/PlanOro.jsx'));
const PlanDiamante = lazy(() => import('./components/PlanDiamante.jsx'));
const PlanMegasimulacros = lazy(() => import('./components/PlanMegasimulacros.jsx')); // ← NUEVO
const VideosPage = lazy(() => import('./components/VideosPage.jsx'));
const QuizzesPage = lazy(() => import('./components/QuizzesPage.jsx'));
const ResumenesPage = lazy(() => import('./components/ResumenesPage.jsx'));

function App() {
  return (
    <NavigateProvider>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuario" element={<Usuario />} />
          
          {/* PLAN ORO */}
          <Route path="/plan-oro" element={<PlanOro />} />
          <Route path="/plan-oro/videos" element={<VideosPage plan="oro" />} />
          <Route path="/plan-oro/quizzes" element={<QuizzesPage plan="oro" />} />
          <Route path="/plan-oro/resumenes" element={<ResumenesPage plan="oro" />} />

          {/* PLAN DIAMANTE */}
          <Route path="/plan-diamante" element={<PlanDiamante />} />
          <Route path="/plan-diamante/videos" element={<VideosPage plan="diamante" />} />
          <Route path="/plan-diamante/quizzes" element={<QuizzesPage plan="diamante" />} />
          <Route path="/plan-diamante/resumenes" element={<ResumenesPage plan="diamante" />} />

          {/* PLAN MEGASIMULACROS 1800 */}
          <Route path="/plan-megasimulacros" element={<PlanMegasimulacros />} />
          <Route path="/plan-megasimulacros/videos" element={<VideosPage plan="megasimulacros" />} />
          <Route path="/plan-megasimulacros/quizzes" element={<QuizzesPage plan="megasimulacros" />} />
          <Route path="/plan-megasimulacros/resumenes" element={<ResumenesPage plan="megasimulacros" />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </NavigateProvider>
  );
}

export default App;
