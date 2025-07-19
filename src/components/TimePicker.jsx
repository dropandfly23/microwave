import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronUp, ChevronDown, ChevronDown as ChevronToggle } from 'lucide-react';

const TimePicker = ({ value, onChange, label = "Select Time", disabled = false }) => {
    const initialDate = value ? new Date(value) : new Date();
    const [isOpen, setIsOpen] = useState(false);
    const [hours, setHours] = useState(initialDate.getHours());
    const [minutes, setMinutes] = useState(initialDate.getMinutes());

    const handleTimeChange = (newHours, newMinutes) => {
        const newDate = new Date();
        newDate.setHours(newHours, newMinutes, 0, 0);
        onChange(newDate);
    };

    const wrap = (value, max) => (value + max) % max;

    const incrementHours = () => {
        const newHours = wrap(hours + 1, 24);
        setHours(newHours);
        handleTimeChange(newHours, minutes);
    };

    const decrementHours = () => {
        const newHours = wrap(hours - 1, 24);
        setHours(newHours);
        handleTimeChange(newHours, minutes);
    };

    const incrementMinutes = () => {
        const newMinutes = wrap(minutes + 1, 60);
        const carry = minutes === 59 ? 1 : 0;
        const newHours = wrap(hours + carry, 24);
        setMinutes(newMinutes);
        setHours(newHours);
        handleTimeChange(newHours, newMinutes);
    };

    const decrementMinutes = () => {
        const newMinutes = wrap(minutes - 1, 60);
        const carry = minutes === 0 ? -1 : 0;
        const newHours = wrap(hours + carry, 24);
        setMinutes(newMinutes);
        setHours(newHours);
        handleTimeChange(newHours, newMinutes);
    };

    const formatTime = (h, m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

            <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                    disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-blue-300'
                }`}
            >
                <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-800 font-medium">{formatTime(hours, minutes)}</span>
                </div>
                <ChevronToggle
                    className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </motion.button>

            {isOpen && !disabled && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4"
                >
                    <div className="flex items-center justify-center space-x-8">
                        {/* Hours */}
                        <div className="flex flex-col items-center space-y-2">
                            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Hours</label>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={incrementHours}
                                className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center"
                            >
                                <ChevronUp className="w-4 h-4 text-blue-600" />
                            </motion.button>
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center my-2">
                <span className="text-xl font-bold text-gray-800">
                  {hours.toString().padStart(2, '0')}
                </span>
                            </div>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={decrementHours}
                                className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center"
                            >
                                <ChevronDown className="w-4 h-4 text-blue-600" />
                            </motion.button>
                        </div>

                        <div className="text-2xl font-bold text-gray-400">:</div>

                        {/* Minutes */}
                        <div className="flex flex-col items-center space-y-2">
                            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Minutes</label>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={incrementMinutes}
                                className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center"
                            >
                                <ChevronUp className="w-4 h-4 text-blue-600" />
                            </motion.button>
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center my-2">
                <span className="text-xl font-bold text-gray-800">
                  {minutes.toString().padStart(2, '0')}
                </span>
                            </div>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={decrementMinutes}
                                className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center"
                            >
                                <ChevronDown className="w-4 h-4 text-blue-600" />
                            </motion.button>
                        </div>
                    </div>

                    <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Confirm
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default TimePicker;
