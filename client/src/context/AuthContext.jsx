import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email, password) => {
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll just store the user locally
      const newUser = { email, id: Date.now().toString() };
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return { data: newUser, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      // In a real app, you would validate credentials against an API
      // For demo purposes, we'll just simulate a successful login
      const user = { email, id: Date.now().toString() };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return { data: user, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const value = {
    signUp,
    signIn,
    signOut,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};