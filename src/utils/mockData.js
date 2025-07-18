export const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@company.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    role: 'user'
};

export const mockMicrowaves = [
    {
        id: 1,
        name: 'Kitchen Microwave A',
        location: 'Main Kitchen - Floor 1',
        power: 1000,
        maxTime: 30,
        status: 'available',
        currentUserName: null,
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'
    },
    {
        id: 2,
        name: 'Break Room Microwave',
        location: 'Break Room - Floor 2',
        power: 800,
        maxTime: 25,
        status: 'occupied',
        currentUserName: 'Sarah Wilson',
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'
    },
    {
        id: 3,
        name: 'Cafeteria Microwave 1',
        location: 'Cafeteria - Ground Floor',
        power: 1200,
        maxTime: 35,
        status: 'available',
        currentUserName: null,
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'
    },
    {
        id: 4,
        name: 'Cafeteria Microwave 2',
        location: 'Cafeteria - Ground Floor',
        power: 1200,
        maxTime: 35,
        status: 'maintenance',
        currentUserName: null,
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'
    },
    {
        id: 5,
        name: 'Executive Floor Microwave',
        location: 'Executive Lounge - Floor 5',
        power: 900,
        maxTime: 20,
        status: 'available',
        currentUserName: null,
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'
    },
    {
        id: 6,
        name: 'Lab Microwave',
        location: 'Research Lab - Floor 3',
        power: 700,
        maxTime: 15,
        status: 'occupied',
        currentUserName: 'Mike Johnson',
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'
    }
];

export const mockReservations = [
    {
        id: 1,
        microwaveId: 2,
        userId: 'sarah@company.com',
        userName: 'Sarah Wilson',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 10 * 60000).toISOString(),
        duration: 10,
        purpose: 'Heating lunch',
        status: 'active'
    },
    {
        id: 2,
        microwaveId: 6,
        userId: 'mike@company.com',
        userName: 'Mike Johnson',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 5 * 60000).toISOString(),
        duration: 5,
        purpose: 'Warming coffee',
        status: 'active'
    }
];

export const mockStats = {
    totalMicrowaves: 6,
    availableMicrowaves: 3,
    occupiedMicrowaves: 2,
    maintenanceMicrowaves: 1,
    totalReservationsToday: 15,
    averageUsageTime: 8
};