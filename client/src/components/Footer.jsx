import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ restaurantInfo }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-texas-slate text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-2xl font-heading text-texas-orange mb-4">
                            SKEET'S TEXAS GRILL
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Bringing authentic Texas flavors to Merkel since day one.
                            Where every meal feels like home.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-texas-orange transition-colors" aria-label="Facebook">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="hover:text-texas-orange transition-colors" aria-label="Instagram">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="hover:text-texas-orange transition-colors" aria-label="Twitter">
                                <Twitter size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-heading text-texas-orange mb-4">QUICK LINKS</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/menu" className="text-gray-300 hover:text-white transition-colors">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link to="/reviews" className="text-gray-300 hover:text-white transition-colors">
                                    Reviews
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-heading text-texas-orange mb-4">CONTACT US</h3>
                        {restaurantInfo && (
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-3">
                                    <MapPin size={20} className="text-texas-orange mt-1 flex-shrink-0" />
                                    <span className="text-gray-300">{restaurantInfo.address}</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Phone size={20} className="text-texas-orange flex-shrink-0" />
                                    <span className="text-gray-300">{restaurantInfo.phone}</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Mail size={20} className="text-texas-orange flex-shrink-0" />
                                    <span className="text-gray-300">info@skeetstexasgrill.com</span>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; {currentYear} Skeet's Texas Grill. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
