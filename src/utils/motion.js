export const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const slideIn = (direction = 'left', delay = 0) => ({
    initial: {
        x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
        y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
        opacity: 0
    },
    animate: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            type: 'tween',
            duration: 0.5,
            delay,
            ease: [0.25, 0.25, 0.25, 0.75]
        }
    }
});

export const scaleIn = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3, type: 'spring' }
};

export const textVariant = (delay = 0) => ({
    initial: {
        y: -50,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1.25,
            delay
        }
    }
});