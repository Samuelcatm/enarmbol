// src/components/layout/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Bell, User, LogOut, Trophy } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-medico to-green-medico rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-medico">ENARMBOL</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-medico font-medium">Inicio</Link>
            <Link to="/specialties" className="text-gray-700 hover:text-blue-medico font-medium">Especialidades</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-medico font-medium">Mi Progreso</Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button className="relative p-2 text-gray-600 hover:text-blue-medico">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-boliviano rounded-full"></span>
                </button>
                <div className="hidden md:flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium">{user.displayName?.split(' ')[0]}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-boliviano"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-medico text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Iniciar Sesión
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Inicio</Link>
              <Link to="/specialties" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Especialidades</Link>
              <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Mi Progreso</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
