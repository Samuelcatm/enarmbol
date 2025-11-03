import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-medico text-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center md:justify-center">
        <Link to="/" className="text-xl font-bold">Enarmbol</Link>
        <ul className="flex space-x-4 md:space-x-6">
          <li><Link to="/planes">Planes</Link></li>
          <li><Link to="/instructor">¡Conoce al Equipo!</Link></li> {/* Cambiado a "¡Conoce al Equipo!" */}
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
