import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import reviewsData from '../data/data.json';

const Reviews = ({ restaurantInfo }) => {
    const [reviews, setReviews] = useState(reviewsData);
    const [currentReview, setCurrentReview] = useState(0);
    const [formData, setFormData] = useState({
        author: '',
        rating: 5,
        comment: '',
    });
    const [submitStatus, setSubmitStatus] = useState('');

    // Auto-rotate reviews every 3.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [reviews.length]);

    const nextReview = () => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ author: '', rating: 5, comment: '' });
                setTimeout(() => setSubmitStatus(''), 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setSubmitStatus('error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-texas-cream">
            {/* Header */}
            <div className="bg-gradient-to-r from-texas-orange to-texas-lightOrange text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-heading mb-4"
                    >
                        REVIEWS
                    </motion.h1>
                    {restaurantInfo && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center justify-center space-x-3"
                        >
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={28}
                                        className={i < Math.floor(restaurantInfo.rating) ? 'fill-white text-white' : 'text-gray-300'}
                                    />
                                ))}
                            </div>
                            <span className="text-2xl font-bold">{restaurantInfo.rating}/5</span>
                            <span className="text-lg">({restaurantInfo.totalReviews} reviews)</span>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Testimonials Slider */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-heading text-texas-red mb-8">CUSTOMER TESTIMONIALS</h2>

                        {reviews.length > 0 && (
                            <div className="relative w-full">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentReview}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="bg-white rounded-xl shadow-xl p-8 min-h-[300px] w-full"
                                    >
                                        <div className="flex mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={24}
                                                    className={i < (reviews[currentReview]?.stars || 0) ? 'fill-texas-orange text-texas-orange' : 'text-gray-300'}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-lg text-texas-slate italic mb-6 leading-relaxed">
                                            "{reviews[currentReview]?.comment}"
                                        </p>

                                        <div className="border-t pt-4">
                                            <p className="font-bold text-texas-red">{reviews[currentReview]?.username}</p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Buttons */}
                                <div className="flex justify-center items-center mt-6 gap-6">
                                    <button
                                        onClick={prevReview}
                                        className="bg-texas-red hover:bg-texas-darkRed text-white p-3 rounded-full transition-colors shadow-lg"
                                        aria-label="Previous review"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>

                                    <div className="flex items-center gap-2 font-medium text-texas-slate">
                                        <span>{currentReview + 1}</span>
                                        <span className="text-gray-400">/</span>
                                        <span>{reviews.length}</span>
                                    </div>

                                    <button

                                        onClick={nextReview}
                                        className="bg-texas-red hover:bg-texas-darkRed text-white p-3 rounded-full transition-colors shadow-lg"
                                        aria-label="Next review"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Review Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-heading text-texas-red mb-8">LEAVE A REVIEW</h2>

                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8">
                            <div className="mb-6">
                                <label htmlFor="author" className="block text-texas-slate font-semibold mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-texas-red focus:outline-none transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="rating" className="block text-texas-slate font-semibold mb-2">
                                    Rating
                                </label>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                                            className="transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={32}
                                                className={star <= formData.rating ? 'fill-texas-orange text-texas-orange' : 'text-gray-300'}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="comment" className="block text-texas-slate font-semibold mb-2">
                                    Your Review
                                </label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleInputChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-texas-red focus:outline-none transition-colors resize-none"
                                    placeholder="Tell us about your experience..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full flex items-center justify-center space-x-2"
                            >
                                <Send size={20} />
                                <span>Submit Review</span>
                            </button>

                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"
                                >
                                    Thank you for your review!
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                                >
                                    Error submitting review. Please try again.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
