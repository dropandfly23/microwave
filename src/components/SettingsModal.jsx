import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, X, Plus, Edit, Trash2, Zap, Clock, MapPin } from 'lucide-react';
import { fadeIn } from '../utils/motion';
import { supabase } from '../utils/supabaseClient';

const SettingsModal = ({ onUpdateMicrowaves, onClose }) => {
    const [localMicrowaves, setLocalMicrowaves] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        power: 1000,
        maxTime: 30
    });

    useEffect(() => {
        const fetchMicrowaves = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('microwaves').select('*');
            if (error) {
                console.error("Erreur lors du chargement des micro-ondes :", error.message);
                alert("Impossible de charger les micro-ondes : " + error.message);
            } else {
                setLocalMicrowaves(data);
            }
            setLoading(false);
        };

        fetchMicrowaves();
    }, []);

    const handleEdit = (microwave) => {
        setEditingId(microwave.id);
        setFormData({
            name: microwave.name,
            location: microwave.location,
            power: microwave.power,
            maxTime: microwave.maxTime || microwave.max_time
        });
    };

    const handleSave = async (id) => {
        const updatedMicrowave = {
            name: formData.name,
            location: formData.location,
            power: formData.power,
            max_time: formData.maxTime
        };

        const { data, error } = await supabase
            .from('microwaves')
            .update(updatedMicrowave)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error("Erreur lors de la mise à jour :", error.message);
            alert("Erreur lors de la mise à jour : " + error.message);
        } else {
            setLocalMicrowaves(prev => prev.map(m =>
                m.id === id ? { ...m, ...updatedMicrowave } : m
            ));
            setEditingId(null);
            resetForm();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Oups ! Tu t’apprêtes à faire disparaître ce micro-ondes à tout jamais. Tu es vraiment sûr·e de vouloir le supprimer ?')) {
            const { error } = await supabase
                .from('microwaves')
                .delete()
                .eq('id', id);

            if (error) {
                console.error("Erreur lors de la suppression :", error.message);
                alert("Erreur lors de la suppression : " + error.message);
            } else {
                setLocalMicrowaves(prev => prev.filter(m => m.id !== id));
            }
        }
    };

    const handleAdd = async () => {
        const newMicrowave = {
            name: formData.name,
            location: formData.location,
            power: formData.power,
            max_time: formData.maxTime,
            status: 'available',
            current_user_name: null,
            image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'
        };

        const { data, error } = await supabase
            .from('microwaves')
            .insert([newMicrowave])
            .select()
            .single();

        if (error) {
            console.error('Erreur lors de l’ajout du micro-ondes:', error.message);
            alert("Erreur lors de l'ajout : " + error.message);
        } else {
            setLocalMicrowaves(prev => [...prev, data]);
            setShowAddForm(false);
            resetForm();
        }
    };

    const resetForm = () => {
        setFormData({ name: '', location: '', power: 1000, maxTime: 30 });
    };

    const handleSaveAll = () => {
        onUpdateMicrowaves(localMicrowaves);
        onClose();
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center text-gray-700 font-semibold">
                    Chargement des micro-ondes en cours...
                </div>
            </div>
        );
    }

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
                                <h2 className="text-2xl font-bold">Réglages Micro-ondes</h2>
                                <p className="text-blue-100">Gère tes micro-ondes comme un·e pro</p>
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
                        <h3 className="text-xl font-bold text-gray-800">Liste des Micro-ondes</h3>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowAddForm(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Ajoute un nouveau</span>
                        </motion.button>
                    </div>

                    {showAddForm && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
                        >
                            <h4 className="text-lg font-semibold text-green-800 mb-4">Ajouter un micro-ondes</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Nom du micro-ondes"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="Emplacement"
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    placeholder="Puissance (W)"
                                    value={formData.power}
                                    onChange={(e) => setFormData(prev => ({ ...prev, power: parseInt(e.target.value) }))}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    min="500"
                                    max="2000"
                                    step="100"
                                />
                                <input
                                    type="number"
                                    placeholder="Temps max (min)"
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
                                    🚀 Go, j'ajoute !
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => { setShowAddForm(false); resetForm(); }}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                                >
                                    ✖️ Oups, non
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
                                                <span>Sauvegarder</span>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => { setEditingId(null); resetForm(); }}
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors flex items-center space-x-2"
                                            >
                                                <X className="w-4 h-4" />
                                                <span>Annuler</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col space-y-1">
                                            <h4 className="text-lg font-semibold text-gray-800">{microwave.name}</h4>
                                            <p className="text-gray-600 flex items-center space-x-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{microwave.location}</span>
                                            </p>
                                            <p className="text-gray-600 flex items-center space-x-2">
                                                <Zap className="w-4 h-4" />
                                                <span>{microwave.power} W</span>
                                            </p>
                                            <p className="text-gray-600 flex items-center space-x-2">
                                                <Clock className="w-4 h-4" />
                                                <span>Temps max : {microwave.maxTime ?? microwave.max_time} min</span>
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleEdit(microwave)}
                                                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
                                                title="Modifier"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(microwave.id)}
                                                className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-gray-100 flex justify-end space-x-4 border-t border-gray-300">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="px-6 py-2 rounded-xl bg-gray-400 text-white font-semibold hover:bg-gray-500 transition-colors"
                    >
                        Annuler
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSaveAll}
                        className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Sauvegarder tout
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default SettingsModal;
