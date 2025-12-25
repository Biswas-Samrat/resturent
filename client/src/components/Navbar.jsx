import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ restaurantInfo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Reviews', path: '/reviews' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-texas-red shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3">
                        <img style={{ height: '50px', width: 'auto' }}
                            src="/assets/llogo.png"
                            alt="Skeet's Texas Grill Logo"
                            className="h-5 md:h-20 w-auto rounded-lg"
                        />

                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-white font-semibold transition-all duration-300 hover:text-texas-orange ${isActive(link.path) ? 'text-texas-orange border-b-2 border-texas-orange' : ''
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Quick Info */}
                    <div className="hidden lg:flex items-center space-x-4 text-white">
                        {restaurantInfo && (
                            <>
                                <div className="flex items-center space-x-2">
                                    <Phone size={16} />
                                    <span className="text-sm">{restaurantInfo.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-texas-cream">
                                    <MapPin size={16} />
                                    <span className="text-sm">Merkel, TX</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white p-2 rounded-lg hover:bg-texas-darkRed transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-texas-darkRed"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ${isActive(link.path)
                                        ? 'bg-texas-orange'
                                        : 'hover:bg-texas-red'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {restaurantInfo && (
                                <div className="pt-3 border-t border-texas-red space-y-2">
                                    <div className="flex items-center space-x-2 text-white px-4">
                                        <Phone size={16} />
                                        <span className="text-sm">{restaurantInfo.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-texas-cream px-4">
                                        <MapPin size={16} />
                                        <span className="text-sm">{restaurantInfo.address}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
