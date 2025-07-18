import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Zap, MapPin, Clock, Users, BarChart3, Settings } from 'lucide-react';
import { fadeIn, staggerContainer } from '../utils/motion';
import { mockMicrowaves, mockReservations, mockStats } from '../utils/mockData';
import SettingsModal from './SettingsModal';

const AdminPanel = ({ user }) => {
    const [microwaves, setMicrowaves] = useState(mockMicrowaves);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingMicrowave, setEditingMicrowave] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        power: 1000,
        maxTime: 30
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingMicrowave) {
            setMicrowaves(prev => prev.map(m =>
                m.id === editingMicrowave.id
                    ? { ...m, ...formData }
                    : m
            ));
            setEditingMicrowave(null);
        } else {
            const newMicrowave = {
                id: Date.now(),
                ...formData,
                status: 'available',
                currentUser: null,
                image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'
            };
            setMicrowaves(prev => [...prev, newMicrowave]);
        }
        setFormData({ name: '', location: '', power: 1000, maxTime: 30 });
        setShowAddForm(false);
    };

    const handleEdit = (microwave) => {
        setEditingMicrowave(microwave);
        setFormData({
            name: microwave.name,
            location: microwave.location,
            power: microwave.power,
            maxTime: microwave.maxTime
        });
        setShowAddForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Oups ! Tu t’apprêtes à faire disparaître ce micro-ondes à tout jamais. Tu es vraiment sûr·e de vouloir le supprimer ? ')) {
            setMicrowaves(prev => prev.filter(m => m.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({ name: '', location: '', power: 1000, maxTime: 30 });
        setEditingMicrowave(null);
        setShowAddForm(false);
    };

    const handleUpdateMicrowaves = (updatedMicrowaves) => {
        setMicrowaves(updatedMicrowaves);
    };

    return (
        <div className="pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto">
                <motion.div {...fadeIn} className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Administration 🛠️
                    </h1>
                    <p className="text-gray-600">Gérer les micro-ondes</p>
                </motion.div>

                <motion.div
                    {...staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                    <motion.div
                        variants={fadeIn}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total des micro-ondes</p>
                                <p className="text-3xl font-bold text-gray-800">{microwaves.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeIn}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Disponible</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {microwaves.filter(m => m.status === 'available').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeIn}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Occupé</p>
                                <p className="text-3xl font-bold text-red-600">
                                    {microwaves.filter(m => m.status === 'occupied').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeIn}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                                <p className="text-3xl font-bold text-yellow-600">
                                    {microwaves.filter(m => m.status === 'maintenance').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Settings className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Microwave Management</h2>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAddForm(true)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Ajouter Micro-onde</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowSettings(true)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                    >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </motion.button>
                </div>

                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            {editingMicrowave ? 'Edit Microwave' : 'Add New Microwave'}
                        </h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Microwave Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Kitchen Microwave A"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Main Kitchen - Floor 1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Power (Watts)
                                </label>
                                <input
                                    type="number"
                                    value={formData.power}
                                    onChange={(e) => setFormData(prev => ({ ...prev, power: parseInt(e.target.value) }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    min="500"
                                    max="2000"
                                    step="100"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Time (Minutes)
                                </label>
                                <input
                                    type="number"
                                    value={formData.maxTime}
                                    onChange={(e) => setFormData(prev => ({ ...prev, maxTime: parseInt(e.target.value) }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    min="5"
                                    max="60"
                                    step="5"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2 flex space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    {editingMicrowave ? 'Mettre à jour Micro-onde' : 'Ajouter Micro-onde'}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {showSettings && (
                    <SettingsModal
                        microwaves={microwaves}
                        onUpdateMicrowaves={handleUpdateMicrowaves}
                        onClose={() => setShowSettings(false)}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {microwaves.map((microwave, index) => (
                        <motion.div
                            key={microwave.id}
                            variants={fadeIn}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                        >
                            <div className="relative">
                                <img
                                    src={microwave.image}
                                    alt="Microwave"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <div className={`${microwave.status === 'available' ? 'bg-green-500' : microwave.status === 'occupied' ? 'bg-red-500' : 'bg-yellow-500'} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                                        {microwave.status}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{microwave.name}</h3>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{microwave.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <Zap className="w-4 h-4 mr-2" />
                                        <span>{microwave.power}W</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <Clock className="w-4 h-4 mr-2" />
                                        <span>Max {microwave.maxTime} minutes</span>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleEdit(microwave)}
                                        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span>Edit</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleDelete(microwave.id)}
                                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete</span>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;