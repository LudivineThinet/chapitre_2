import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function AuthProvider({ children }) {
  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem("userEmail") ?? null
  );
  const [userRole, setUserRole] = useState(
    () => localStorage.getItem("userRole") ?? null
  );

  // Vérifier le token au démarrage de l'app
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      logout();
    }
  }, []);

  function login(email, role, token) {
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);
    setUserEmail(email);
    setUserRole(role);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setUserEmail(null);
    setUserRole(null);
  }

  return (
    <AuthContext.Provider value={{ userEmail, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}