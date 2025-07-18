import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Zap, MapPin, Clock, Users, Settings } from 'lucide-react';
import { fadeIn, staggerContainer } from '../utils/motion';
import SettingsModal from './SettingsModal';
import { supabase } from '../utils/supabaseClient';

const AdminPanel = ({ user }) => {
    const [microwaves, setMicrowaves] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingMicrowave, setEditingMicrowave] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        power: 1000,
        max_time: 30,
    });
    const [loading, setLoading] = useState(false);

    // Charger les micro-ondes au montage
    useEffect(() => {
        const fetchMicrowaves = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('microwaves')
                .select('*')
                .order('id', { ascending: true });

            if (error) {
                console.error('Erreur chargement micro-ondes:', error);
                alert('Erreur lors du chargement des micro-ondes');
            } else {
                setMicrowaves(data);
            }
            setLoading(false);
        };

        fetchMicrowaves();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (editingMicrowave) {
            // Mise à jour
            const { error } = await supabase
                .from('microwaves')
                .update(formData)
                .eq('id', editingMicrowave.id);

            if (error) {
                console.error('Erreur mise à jour:', error);
                alert('Erreur lors de la mise à jour');
            } else {
                setMicrowaves((prev) =>
                    prev.map((m) =>
                        m.id === editingMicrowave.id ? { ...m, ...formData } : m
                    )
                );
                setEditingMicrowave(null);
                setShowAddForm(false);
            }
        } else {
            // Ajout
            const newMicrowaveData = {
                ...formData,
                status: 'available',
                currentUserName: null,
                image:
                    'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop',
            };

            const { data, error } = await supabase
                .from('microwaves')
                .insert([newMicrowaveData])
                .select()
                .single();

            if (error) {
                console.error('Erreur ajout:', error);
                alert('Erreur lors de l’ajout');
            } else {
                setMicrowaves((prev) => [...prev, data]);
                setShowAddForm(false);
            }
        }

        setFormData({
            name: '',
            location: '',
            power: 1000,
            max_time: 30,
        });

        setLoading(false);
    };

    const handleEdit = (microwave) => {
        setEditingMicrowave(microwave);
        setFormData({
            name: microwave.name,
            location: microwave.location,
            power: microwave.power,
            max_time: microwave.maxTime,
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Oups ! Tu t’apprêtes à faire disparaître ce micro-ondes à tout jamais. Tu es vraiment sûr·e de vouloir le supprimer ?'
        );
        if (!confirmed) return;

        setLoading(true);
        try {
            const { error } = await supabase.from('microwaves').delete().eq('id', id);

            if (error) {
                console.error('Erreur suppression:', error);
                alert('Erreur lors de la suppression');
            } else {
                setMicrowaves((prev) => prev.filter((m) => m.id !== id));
            }
        } catch (err) {
            console.error('Erreur inattendue:', err);
            alert('Une erreur inattendue est survenue');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', location: '', power: 1000, max_time: 30 });
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
                                <p className="text-sm font-medium text-gray-600">
                                    Total des micro-ondes
                                </p>
                                <p className="text-3xl font-bold text-gray-800">
                                    {microwaves.length}
                                </p>
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
                                    {microwaves.filter((m) => m.status === 'available').length}
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
                                    {microwaves.filter((m) => m.status === 'occupied').length}
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
                                    {microwaves.filter((m) => m.status === 'maintenance').length}
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
                        disabled={loading}
                    >
                        <Plus className="w-5 h-5" />
                        <span>Ajouter Micro-onde</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowSettings(true)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                        disabled={loading}
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
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                    htmlFor="name"
                                >
                                    Microwave Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Kitchen Microwave A"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                    htmlFor="location"
                                >
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, location: e.target.value }))
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Main Kitchen - Floor 1"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                    htmlFor="power"
                                >
                                    Power (Watts)
                                </label>
                                <input
                                    id="power"
                                    type="number"
                                    min={100}
                                    max={2000}
                                    value={formData.power}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            power: Number(e.target.value),
                                        }))
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                    htmlFor="maxTime"
                                >
                                    Max Time (minutes)
                                </label>
                                <input
                                    id="maxTime"
                                    type="number"
                                    min={1}
                                    max={60}
                                    value={formData.max_time}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            max_time: Number(e.target.value),
                                        }))
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="md:col-span-2 flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                                >
                                    {loading ? 'En cours...' : editingMicrowave ? 'Mettre à jour' : 'Ajouter'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    disabled={loading}
                                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-400 transition"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                <motion.div
                    {...staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {microwaves.map((microwave) => (
                        <motion.div
                            key={microwave.id}
                            variants={fadeIn}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col"
                        >
                            <img
                                src={microwave.image}
                                alt={microwave.name}
                                className="w-full h-40 object-cover"
                                loading="lazy"
                            />
                            <div className="p-4 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{microwave.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{microwave.location}</p>
                                    <p className="text-sm text-gray-700">
                                        Puissance: {microwave.power} W
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Durée max: {microwave.max_time} minutes
                                    </p>
                                    <p className="text-sm font-semibold mt-2">
                                        Statut:{' '}
                                        <span
                                            className={
                                                microwave.status === 'available'
                                                    ? 'text-green-600'
                                                    : microwave.status === 'occupied'
                                                        ? 'text-red-600'
                                                        : 'text-yellow-600'
                                            }
                                        >
                      {microwave.status}
                    </span>
                                    </p>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handleEdit(microwave)}
                                        className="flex items-center space-x-1 text-blue-600 hover:underline"
                                        disabled={loading}
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span>Editer</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(microwave.id)}
                                        className="flex items-center space-x-1 text-red-600 hover:underline"
                                        disabled={loading}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Supprimer</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {showSettings && (
                    <SettingsModal
                        show={showSettings}
                        onClose={() => setShowSettings(false)}
                        microwaves={microwaves}
                        updateMicrowaves={handleUpdateMicrowaves}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
