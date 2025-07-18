import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Chrome, Facebook } from 'lucide-react';
import { fadeIn } from '../utils/motion';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            onLogin({
                email,
                name: email.split('@')[0],
                avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
                role: email.includes('admin') ? 'admin' : 'user'
            });
            setLoading(false);
        }, 1000);
    };

    const handleSocialLogin = (provider) => {
        setLoading(true);
        setTimeout(() => {
            onLogin({
                email: `user@${provider}.com`,
                name: `${provider} User`,
                avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face`,
                role: 'user',
                provider
            });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                {...fadeIn}
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <span className="text-2xl">🍲</span>
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">LunchLine</h1>
                    <p className="text-gray-600">No more waiting. Just heating.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Log in'}
                    </motion.button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSocialLogin('google')}
                            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <Chrome className="w-5 h-5 text-red-500" />
                            <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSocialLogin('facebook')}
                            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <Facebook className="w-5 h-5 text-blue-600" />
                            <span className="ml-2 text-sm font-medium text-gray-700">Facebook</span>
                        </motion.button>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Use admin@company.com for admin access
                </p>
            </motion.div>
        </div>
    );
};

export default Login;