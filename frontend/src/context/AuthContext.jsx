import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set default axios headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        if (token) {
          const res = await axios.get('http://localhost:5000/api/auth/me');
          setUser(res.data.data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [token]);

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData);
      setToken(res.data.data.token);
      localStorage.setItem('token', res.data.data.token);
      setUser(res.data.data.user);
      toast.success('Registration successful!');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Registration failed');
      throw error;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', userData);
      setToken(res.data.data.token);
      localStorage.setItem('token', res.data.data.token);
      setUser(res.data.data.user);
      toast.success('Login successful!');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Login failed');
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 