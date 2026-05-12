import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    const storedAdminInfo = localStorage.getItem('adminInfo');
    if (storedAdminInfo) {
      setAdminInfo(JSON.parse(storedAdminInfo));
    }
  }, []);

  const login = (data) => {
    setAdminInfo(data);
    localStorage.setItem('adminInfo', JSON.stringify(data));
  };

  const logout = () => {
    setAdminInfo(null);
    localStorage.removeItem('adminInfo');
  };

  return (
    <AuthContext.Provider value={{ adminInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
