import axios from 'axios';
import React, {createContext, useState, useContext, ReactNode} from 'react';

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  token: string | null;
  isAuth: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Implement the AuthProvider
export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (user: User, token: string) => {
    setUser(user);
    setToken(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return <AuthContext.Provider value={{isAuth: !!user && !!token, user, login, logout, token}}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
