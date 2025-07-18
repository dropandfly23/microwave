import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Users, Zap } from 'lucide-react';
import MicrowaveCard from './MicrowaveCard';
import ReservationModal from './ReservationModal';
import { fadeIn, staggerContainer } from '../utils/motion';
import { mockMicrowaves, mockReservations } from '../utils/mockData';

const Dashboard = ({ user }) => {
    const [microwaves, setMicrowaves] = useState(mockMicrowaves);
    const [reservations, setReservations] = useState(mockReservations);
    const [selectedMicrowave, setSelectedMicrowave] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const stats = {
        total: microwaves.length,
        available: microwaves.filter(m => m.status === 'available').length,
        myReservations: reservations.filter(r => r.userId === user.email).length
    };

    const handleReservation = (reservationData) => {
        const newReservation = {
            id: Date.now(),
            microwaveId: selectedMicrowave.id,
            userId: user.email,
            userName: user.name,
            ...reservationData,
            status: 'active'
        };

        setReservations(prev => [...prev, newReservation]);

        setMicrowaves(prev => prev.map(m =>
            m.id === selectedMicrowave.id
                ? { ...m, status: 'occupied', currentUser: user.name }
                : m
        ));

        setShowModal(false);
        setSelectedMicrowave(null);
    };

    const handleCancelReservation = (microwaveId) => {
        setReservations(prev => prev.filter(r => r.microwaveId !== microwaveId || r.userId !== user.email));
        setMicrowaves(prev => prev.map(m =>
            m.id === microwaveId
                ? { ...m, status: 'available', currentUser: null }
                : m
        ));
    };

    const openReservationModal = (microwave) => {
        setSelectedMicrowave(microwave);
        setShowModal(true);
    };

    return (
        <div className="pt-20 px-4 pb-8">
            <div className="max-w-7xl mx-auto">
                <motion.div {...fadeIn} className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Bienvenue, {user.name}! 👋
                    </h1>
                    <p className="text-gray-600">Réserve ton micro-ondes, chauffe ton repas !</p>
                </motion.div>

                <motion.div
                    {...staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    <motion.div
                        variants={fadeIn}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total des micro-ondes</p>
                                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
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
                                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                                <p className="text-3xl font-bold text-green-600">{stats.available}</p>
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
                                <p className="text-sm font-medium text-gray-600">Mes réservations</p>
                                <p className="text-3xl font-bold text-purple-600">{stats.myReservations}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div {...staggerContainer}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Available Microwaves</h2>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Available</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Occupied</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Maintenance</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {microwaves.map((microwave, index) => (
                            <motion.div
                                key={microwave.id}
                                variants={fadeIn}
                                transition={{ delay: index * 0.1 }}
                            >
                                <MicrowaveCard
                                    microwave={microwave}
                                    onReserve={() => openReservationModal(microwave)}
                                    onCancel={() => handleCancelReservation(microwave.id)}
                                    userReservation={reservations.find(r => r.microwaveId === microwave.id && r.userId === user.email)}
                                    currentUser={user}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {showModal && (
                <ReservationModal
                    microwave={selectedMicrowave}
                    onReserve={handleReservation}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedMicrowave(null);
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;