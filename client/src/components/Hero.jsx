import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ restaurantInfo }) => {
    return (
        <div className="relative h-[600px] md:h-[700px] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/assets/photo.png')",
                }}
            >
                <div className="absolute inset-0 gradient-overlay"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-heading text-white mb-4 text-outline tracking-wider"
                    >
                        SKEET'S TEXAS GRILL
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-3xl text-texas-cream mb-2 font-semibold"
                    >
                        {restaurantInfo?.tagline || 'A Taste of Merkel'}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto"
                    >
                        {restaurantInfo?.subtitle || 'Small town diner vibes with big Texas flavor'}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link to="/menu" className="btn-primary flex items-center space-x-2">
                            <span>View Menu</span>
                            <ChevronRight size={20} />
                        </Link>
                        <Link to="/contact" className="btn-secondary">
                            Get Directions
                        </Link>
                    </motion.div>

                    {/* Quick Info Bar */}
                    {restaurantInfo && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="mt-12 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 max-w-3xl mx-auto"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0">
                                    <p className="text-sm text-gray-600 uppercase mb-1">Address</p>
                                    <p className="text-texas-slate font-semibold">{restaurantInfo.address.split(',')[0]}</p>
                                    <p className="text-texas-slate text-sm">{restaurantInfo.address.split(',').slice(1).join(',')}</p>
                                </div>
                                <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0">
                                    <p className="text-sm text-gray-600 uppercase mb-1">Phone</p>
                                    <p className="text-texas-red font-bold text-lg">{restaurantInfo.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 uppercase mb-1">Status</p>
                                    <p className="text-green-600 font-bold text-lg flex items-center justify-center">
                                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                        Open Now
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
