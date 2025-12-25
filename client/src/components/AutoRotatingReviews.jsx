import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import reviewsData from '../data/data.json';

const AutoRotatingReviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleReviews, setVisibleReviews] = useState([0, 1]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = (prev + 2) % reviewsData.length;
                const second = (next + 1) % reviewsData.length;
                setVisibleReviews([next, second]);
                return next;
            });
        }, 3500); // Change every 3.5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8 min-h-[150px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={`review-${visibleReviews[0]}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                    <p className="text-lg italic mb-3">
                        "{reviewsData[visibleReviews[0]]?.comment}"
                    </p>
                    <p className="text-texas-cream font-semibold">
                        - {reviewsData[visibleReviews[0]]?.username}
                    </p>
                </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.div
                    key={`review-${visibleReviews[1]}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                    <p className="text-lg italic mb-3">
                        "{reviewsData[visibleReviews[1]]?.comment}"
                    </p>
                    <p className="text-texas-cream font-semibold">
                        - {reviewsData[visibleReviews[1]]?.username}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default AutoRotatingReviews;
