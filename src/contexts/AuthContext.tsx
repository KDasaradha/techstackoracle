'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  emailVerifiedAt: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth state on mount
    const storedToken = localStorage.getItem('userToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []); // Empty dependency array means this runs only once on mount

  const login = (newToken: string, newUser: User) => {
    console.log('AuthContext: login called', { userId: newUser.id, email: newUser.email });
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('userToken', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    console.log('AuthContext: logout called');
    setToken(null);
    setUser(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token && !!user,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}