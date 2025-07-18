import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {Menu, X, User, Settings, LogOut, Zap, Mic2, Clock} from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        onLogout();
        setIsProfileOpen(false);
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/', icon: '🏠' },
        ...(user?.role === 'admin' ? [{ name: 'Administration', path: '/admin', icon: '⚙️' }] : [])
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-40">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">LunchLine</h1>
                            <p className="text-xs text-gray-500 hidden sm:block">No more waiting. Just heating.</p>
                        </div>
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.path}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                                    isActive(item.path)
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                            </motion.button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 bg-gray-100 rounded-xl px-4 py-2 hover:bg-gray-200 transition-colors"
                            >
                                <img
                                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                                </div>
                            </motion.button>

                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                                >
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            // Add profile settings functionality here
                                        }}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <Settings className="w-4 h-4" />
                                        <span className="text-sm">Settings</span>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-sm">Sign Out</span>
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>
                    </div>
                </div>

                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-200 py-4"
                    >
                        <div className="space-y-2">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.path}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${
                                        isActive(item.path)
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;