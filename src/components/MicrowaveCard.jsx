import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Zap, MapPin, Calendar, X } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';

const MicrowaveCard = ({ microwave, onReserve, onCancel, userReservation, currentUserName }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return 'bg-green-500';
            case 'occupied': return 'bg-red-500';
            case 'maintenance': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'available': return 'Available';
            case 'occupied': return 'Occupied';
            case 'maintenance': return 'Maintenance';
            default: return 'Unknown';
        }
    };

    const isUserReservation = userReservation && userReservation.userId === currentUserName?.email;

    const formatEndTime = (endTime) => {
        if (!endTime) return 'soon';

        const date = parseISO(endTime);
        return isValid(date) ? format(date, 'HH:mm') : 'soon';
    };

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
            <div className="relative">
                <img
                    src={`https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop`}
                    alt="Microwave"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                    <div className={`${getStatusColor(microwave.status)} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1`}>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>{getStatusText(microwave.status)}</span>
                    </div>
                </div>
                <div className="absolute top-4 left-4">
                    <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {microwave.power}W
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{microwave.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{microwave.location}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center text-gray-600 text-sm mb-1">
                            <Zap className="w-4 h-4 mr-1" />
                            <span>{microwave.power}W</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Max {microwave.maxTime}min</span>
                        </div>
                    </div>
                </div>

                {microwave.status === 'occupied' && microwave.currentUserName && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                        <div className="flex items-center text-red-700 text-sm">
                            <User className="w-4 h-4 mr-2" />
                            <span>Currently used by {microwave.currentUserName}</span>
                        </div>
                        {userReservation && (
                            <div className="flex items-center text-red-600 text-xs mt-1">
                                <Calendar className="w-3 h-3 mr-1" />
                                <span>Until {formatEndTime(userReservation.endTime)}</span>
                            </div>
                        )}
                    </div>
                )}

                {microwave.status === 'maintenance' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
                        <div className="flex items-center text-yellow-700 text-sm">
                            <Zap className="w-4 h-4 mr-2" />
                            <span>Under maintenance</span>
                        </div>
                    </div>
                )}

                <div className="flex space-x-3">
                    {microwave.status === 'available' && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onReserve}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                        >
                            Reserve microwave
                        </motion.button>
                    )}

                    {isUserReservation && microwave.status === 'occupied' && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onCancel}
                            className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                        >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                        </motion.button>
                    )}

                    {microwave.status === 'occupied' && !isUserReservation && (
                        <button
                            disabled
                            className="flex-1 bg-gray-300 text-gray-500 py-3 px-4 rounded-xl font-semibold cursor-not-allowed"
                        >
                            Occupied
                        </button>
                    )}

                    {microwave.status === 'maintenance' && (
                        <button
                            disabled
                            className="flex-1 bg-gray-300 text-gray-500 py-3 px-4 rounded-xl font-semibold cursor-not-allowed"
                        >
                            Maintenance
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MicrowaveCard;