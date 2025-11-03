// src/context/NavigateContext.jsx
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateContext = createContext();

export function NavigateProvider({ children }) {
  const navigate = useNavigate();
  return (
    <NavigateContext.Provider value={navigate}>
      {children}
    </NavigateContext.Provider>
  );
}

export function useAppNavigate() {
  return useContext(NavigateContext);
}
