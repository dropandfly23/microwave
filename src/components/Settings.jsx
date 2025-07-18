import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, X, Plus, Edit, Trash2, Zap, Clock, MapPin } from 'lucide-react';
import { fadeIn } from '../utils/motion';

const Settings = ({ microwaves, onUpdateMicrowaves, onClose }) => {
    const [localMicrowaves, setLocalMicrowaves] = useState([...microwaves]);
    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        power: 1000,
        maxTime: 30
    });

    const handleEdit = (microwave) => {
        setEditingId(microwave.id);
        setFormData({
            name: microwave.name,
            location: microwave.location,
            power: microwave.power,
            maxTime: microwave.maxTime
        });
    };

    const handleSave = (id) => {
        setLocalMicrowaves(prev => prev.map(m =>
            m.id === id ? { ...m, ...formData } : m
        ));
        setEditingId(null);
        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm('Oups ! Tu t’apprêtes à faire disparaître ce micro-ondes à tout jamais. Tu es vraiment sûr·e de vouloir le supprimer ? ')) {
            setLocalMicrowaves(prev => prev.filter(m => m.id !== id));
        }
    };

    const handleAdd = () => {
        const newMicrowave = {
            id: Date.now(),
            ...formData,
            status: 'available',
            currentUser: null,
            image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'
        };
        setLocalMicrowaves(prev => [...prev, newMicrowave]);
        setShowAddForm(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({ name: '', location: '', power: 1000, maxTime: 30 });
    };

    const handleSaveAll = () => {
        onUpdateMicrowaves(localMicrowaves);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <SettingsIcon className="w-8 h-8" />
                            <div>
                                <h2 className="text-2xl font-bold">Microwave Settings</h2>
                                <p className="text-blue-100">Manage your microwave data</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Microwave List</h3>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowAddForm(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add New</span>
                        </motion.button>
                    </div>

                    {showAddForm && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
                        >
                            <h4 className="text-lg font-semibold text-green-800 mb-4">Add New Microwave</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Microwave Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    placeholder="Power (W)"
                                    value={formData.power}
                                    onChange={(e) => setFormData(prev => ({ ...prev, power: parseInt(e.target.value) }))}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    min="500"
                                    max="2000"
                                    step="100"
                                />
                                <input
                                    type="number"
                                    placeholder="Max Time (min)"
                                    value={formData.maxTime}
                                    onChange={(e) => setFormData(prev => ({ ...prev, maxTime: parseInt(e.target.value) }))}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    min="5"
                                    max="60"
                                    step="5"
                                />
                            </div>
                            <div className="flex space-x-3 mt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAdd}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                >
                                    Ajouter Micro-onde
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => { setShowAddForm(false); resetForm(); }}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    <div className="space-y-4">
                        {localMicrowaves.map((microwave) => (
                            <motion.div
                                key={microwave.id}
                                {...fadeIn}
                                className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                            >
                                {editingId === microwave.id ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <input
                                            type="number"
                                            value={formData.power}
                                            onChange={(e) => setFormData(prev => ({ ...prev, power: parseInt(e.target.value) }))}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="500"
                                            max="2000"
                                            step="100"
                                        />
                                        <input
                                            type="number"
                                            value={formData.maxTime}
                                            onChange={(e) => setFormData(prev => ({ ...prev, maxTime: parseInt(e.target.value) }))}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            min="5"
                                            max="60"
                                            step="5"
                                        />
                                        <div className="md:col-span-2 flex space-x-3">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleSave(microwave.id)}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                            >
                                                <Save className="w-4 h-4" />
                                                <span>Save</span>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => { setEditingId(null); resetForm(); }}
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                                            >
                                                Cancel
                                            </motion.button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-2">{microwave.name}</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                                <div className="flex items-center space-x-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{microwave.location}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Zap className="w-4 h-4" />
                                                    <span>{microwave.power}W</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>Max {microwave.maxTime} minutes</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 ml-4">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleEdit(microwave)}
                                                className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(microwave.id)}
                                                className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="flex justify-end space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSaveAll}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                            <Save className="w-5 h-5" />
                            <span>Save All Changes</span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Settings;