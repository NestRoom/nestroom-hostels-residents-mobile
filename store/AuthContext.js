import React, { createContext, useContext, useState } from 'react';

import * as SecureStore from 'expo-secure-store';
import { secureFetch } from '@/services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('userToken');
      if (storedToken) {
        setToken(storedToken);
        // Fetch user profile to verify token and get fresh data
        const data = await secureFetch('/auth/profile');
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error loading token:', error);
      // If profile fetch fails, token might be invalid
      if (error.status === 401) {
        await logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async credentials => {
    try {
      const data = await secureFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (data.token) {
        await SecureStore.setItemAsync('userToken', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isLoading,
        setIsLoading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
