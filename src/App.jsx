import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import { mockUser } from './utils/mockData';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (loginData) => {
    const userData = { ...mockUser, ...loginData };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
          />
        </div>
    );
  }

  return (
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {user && <Navbar user={user} onLogout={handleLogout} />}
          <Routes>
            <Route
                path="/login"
                element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
            />
            <Route
                path="/"
                element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
            />
            <Route
                path="/admin"
                element={user?.role === 'admin' ? <AdminPanel user={user} /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
  );
}

export default App;