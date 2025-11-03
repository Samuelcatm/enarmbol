import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Especialidades = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth State Changed in Especialidades:', user ? 'Logged in' : 'Logged out');
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const specialties = [
    { name: 'Medicina-Interna', label: 'Medicina Interna', color: 'red', icon: 'fas fa-heartbeat', description: 'Diagnóstico y tratamiento de enfermedades del adulto' },
    { name: 'Cirugia-General', label: 'Cirugía General', color: 'blue', icon: 'fas fa-cut', description: 'Procedimientos quirúrgicos y técnicas operatorias' },
    { name: 'Ginecologia-y-Obstetricia', label: 'Ginecología y Obstetricia', color: 'pink', icon: 'fas fa-baby', description: 'Salud reproductiva femenina y atención del embarazo' },
    { name: 'Pediatria', label: 'Pediatría', color: 'green', icon: 'fas fa-child', description: 'Atención médica integral del niño y adolescente' },
  ];

  const handleSpecialtyClick = (specialtyName) => {
    console.log('Clicked Specialty in Especialidades:', specialtyName, 'User:', user ? 'Verified' : 'Not Verified');
    if (!user) {
      navigate('/login');
    } else {
      const plan = user ? (localStorage.getItem('userPlan') || 'oro') : null;
      navigate(`/${plan === 'diamante' ? 'plan-diamante' : 'plan-oro'}/${specialtyName}`);
    }
  };

  return (
    <section>
      <div>
        <div>
          <h3>Especialidades Médicas</h3>
          <p>Contenido especializado en 4 bloques principales</p>
        </div>
        <div>
          {specialties.map((specialty, index) => (
            <div key={index}>
              <div>
                <div>
                  <i>{specialty.icon}</i>
                </div>
                <h4>{specialty.label}</h4>
                <p>{specialty.description}</p>
                <button onClick={() => handleSpecialtyClick(specialty.name)}>Ver Contenido</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Especialidades;
