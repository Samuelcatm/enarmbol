import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const QandA = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ text: '', speciality: '', theme: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      const qandaQuery = query(collection(db, 'qanda'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(qandaQuery, (snapshot) => {
        const questionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuestions(questionsData);
      }, (error) => {
        console.error("Error fetching Q&A:", error);
        setError('Error al cargar las preguntas.');
      });
      return () => unsubscribe();
    } else {
      setQuestions([]);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.text || !newQuestion.speciality || !newQuestion.theme) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    try {
      await addDoc(collection(db, 'qanda'), {
        text: newQuestion.text,
        speciality: newQuestion.speciality,
        theme: newQuestion.theme,
        userId: user.uid,
        timestamp: serverTimestamp(),
        answers: [],
      });
      setNewQuestion({ text: '', speciality: '', theme: '' });
      setError('');
    } catch (err) {
      console.error("Error adding question:", err);
      setError('Error al agregar la pregunta: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-800 bg-white p-4 rounded-lg shadow-md">Preguntas y Respuestas - Enarmbol</h2>
      <div className="max-w-3xl mx-auto">
        {user ? (
          <>
            <p className="text-lg text-gray-700 mb-6 text-center bg-white p-3 rounded-lg shadow-sm">
              ¡Haz y responde preguntas por especialidad y tema!
            </p>
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
              <form onSubmit={handleAddQuestion} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Pregunta</label>
                  <textarea
                    name="text"
                    value={newQuestion.text}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Especialidad</label>
                  <input
                    type="text"
                    name="speciality"
                    value={newQuestion.speciality}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Tema</label>
                  <input
                    type="text"
                    name="theme"
                    value={newQuestion.theme}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-900 transition"
                >
                  Enviar Pregunta
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </form>
            </div>
            <div className="mt-8 space-y-6">
              {questions.map((q) => (
                <div key={q.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">Pregunta: {q.text}</h3>
                  <p className="text-gray-600 mb-2">Especialidad: {q.speciality}</p>
                  <p className="text-gray-600 mb-2">Tema: {q.theme}</p>
                  <p className="text-sm text-gray-500 mb-4">Por: {q.userId}</p>
                  {/* Placeholder para respuestas (a implementar más adelante) */}
                  <div className="mt-2">
                    <p className="text-gray-500">Respuestas: {q.answers.length || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-lg text-gray-700 text-center bg-white p-4 rounded-lg shadow-sm">Debes iniciar sesión para ver el Q&A.</p>
        )}
      </div>
    </div>
  );
};

export default QandA;
