import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, Zap } from 'lucide-react';
import { format, addMinutes, isValid } from 'date-fns';
import TimePicker from './TimePicker';
import { supabase } from '../utils/supabaseClient';  // adjust path

const ReservationModal = ({ user, microwave, onReserve, onClose }) => {
    const [duration, setDuration] = useState(5);
    const [startTime, setStartTime] = useState(new Date());
    const [purpose, setPurpose] = useState('');
    const [loading, setLoading] = useState(false);

    // Ensure startTime is valid, fallback to current date if not
    const validStartTime = isValid(startTime) ? startTime : new Date();
    const maxDuration = microwave?.maxTime || 30;
    const endTime = addMinutes(validStartTime, duration);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const reservation = {
            microwave_id: microwave.id,
            start_time: validStartTime.toISOString(),
            end_time: endTime.toISOString(),
            duration,
            purpose: purpose || 'Heating food',
            user_id: user.email,
            user_name: user.name,
        };

        const { data, error } = await supabase
            .from('reservations')
            .insert([reservation])
            .select()
            .single();

        setLoading(false);

        if (error) {
            alert('Erreur lors de la réservation : ' + error.message);
            return;
        }

        onReserve(data);
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">Micro-onde</h2>
                                <p className="text-blue-100">{microwave?.name}</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                                aria-label="Fermer la fenêtre de réservation"
                            >
                                <X className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <Zap className="w-4 h-4" />
                                    <span>{microwave?.power}W</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>Max {maxDuration} min</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <User className="w-4 h-4" />
                                    <span>{microwave?.location}</span>
                                </div>
                            </div>
                        </div>

                        <TimePicker value={validStartTime} onChange={setStartTime} label="Début" />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Durée: {duration} minutes
                            </label>
                            <input
                                type="range"
                                min="1"
                                max={maxDuration}
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                disabled={loading}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>1 min</span>
                                <span>{maxDuration} min</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optionnel)</label>
                            <input
                                type="text"
                                placeholder="e.g., Heating lunch"
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            />
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <h3 className="font-medium text-blue-800 mb-2">Résumé de réservation</h3>
                            <div className="space-y-1 text-sm text-blue-700">
                                <div className="flex justify-between">
                                    <span>Début:</span>
                                    <span>{isValid(validStartTime) ? format(validStartTime, 'HH:mm') : '--:--'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Fin:</span>
                                    <span>{isValid(endTime) ? format(endTime, 'HH:mm') : '--:--'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Durée:</span>
                                    <span>{duration} minutes</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                                disabled={loading}
                            >
                                Annuler
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                                disabled={loading}
                            >
                                {loading ? 'Réservation...' : 'Reserver'}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ReservationModal;
