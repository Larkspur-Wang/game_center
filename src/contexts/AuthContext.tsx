import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, register, guestLogin } from '../api/auth';

interface AuthContextType {
  user: { userId: string; token: string } | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  guestLogin: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ userId: string; token: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = async (username: string, password: string) => {
    const data = await login(username, password);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const registerUser = async (username: string, password: string) => {
    await register(username, password);
  };

  const loginGuest = async () => {
    const data = await guestLogin();
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login: loginUser, register: registerUser, guestLogin: loginGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};