import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import MenuCard from '../components/MenuCard';
import AutoRotatingReviews from '../components/AutoRotatingReviews';
import { useState, useEffect } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = ({ restaurantInfo }) => {
    const [featuredItems, setFeaturedItems] = useState([]);

    useEffect(() => {
        // Fetch all menu items and filter featured ones
        fetch('/api/menu')
            .then(res => res.json())
            .then(data => {
                const allItems = [
                    ...data.appetizers,
                    ...data.burgers,
                    ...data.chicken,
                    ...data.heartOfTexas,
                    ...data.coast,
                    ...data.border
                ];
                const featured = allItems.filter(item => item.featured);
                setFeaturedItems(featured);
            })
            .catch(err => console.error('Error fetching featured items:', err));
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <Hero restaurantInfo={restaurantInfo} />

            {/* Featured Items Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-heading">TOP SELLERS</h2>
                        <p className="section-subheading">
                            Our most popular dishes that keep folks coming back for more
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredItems.map((item, index) => (
                            <MenuCard key={item.id} item={item} index={index} />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mt-12"
                    >
                        <Link to="/menu" className="btn-primary inline-flex items-center space-x-2">
                            <span>See Full Menu</span>
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Review Highlight Section */}
            <section className="py-16 bg-gradient-to-br from-texas-red to-texas-darkRed text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading mb-6 text-white">
                            LOVED BY LOCALS
                        </h2>
                        {restaurantInfo && (
                            <div className="flex items-center justify-center space-x-2 mb-8">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={32}
                                            className={i < Math.floor(restaurantInfo.rating) ? 'fill-texas-orange text-texas-orange' : 'text-gray-400'}
                                        />
                                    ))}
                                </div>
                                <span className="text-3xl font-bold">{restaurantInfo.rating}/5</span>
                                <span className="text-lg text-gray-300">({restaurantInfo.totalReviews} reviews)</span>
                            </div>
                        )}

                        <AutoRotatingReviews />

                        <Link to="/reviews" className="btn-secondary inline-flex items-center space-x-2 mt-8">
                            <span>Read All Reviews</span>
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Hours & Location Teaser */}
            <section className="py-16 bg-texas-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Hours */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="card p-8"
                        >
                            <h3 className="text-3xl font-heading text-texas-red mb-6">HOURS</h3>
                            {restaurantInfo && (
                                <ul className="space-y-3">
                                    {Object.entries(restaurantInfo.hours).map(([day, hours]) => (
                                        <li key={day} className="flex justify-between items-center">
                                            <span className="font-semibold capitalize text-texas-slate">{day}</span>
                                            <span className="text-gray-700">{hours}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>

                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="card p-8"
                        >
                            <h3 className="text-3xl font-heading text-texas-red mb-6">VISIT US</h3>
                            {restaurantInfo && (
                                <>
                                    <p className="text-lg text-texas-slate mb-4">{restaurantInfo.address}</p>
                                    <p className="text-2xl font-bold text-texas-red mb-6">{restaurantInfo.phone}</p>
                                    <Link to="/contact" className="btn-primary w-full text-center">
                                        Get Directions
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
