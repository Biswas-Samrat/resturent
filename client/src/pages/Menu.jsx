import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MenuCard from '../components/MenuCard';

const Menu = () => {
    const [menuData, setMenuData] = useState(null);
    const [activeCategory, setActiveCategory] = useState('burgers');
    const [loading, setLoading] = useState(true);

    const categories = [
        { id: 'appetizers', name: 'Appetizers', icon: '🍗' },
        { id: 'burgers', name: 'Burgers & Sandwiches', icon: '🍔' },
        { id: 'chicken', name: 'Grilled Chicken', icon: '🍗' },
        { id: 'heartOfTexas', name: 'Heart of Texas', icon: '🥩' },
        { id: 'coast', name: 'On the Coast', icon: '🐟' },
        { id: 'border', name: 'On the Border', icon: '🌮' },
    ];

    useEffect(() => {
        fetch('/api/menu')
            .then(res => res.json())
            .then(data => {
                setMenuData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching menu:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-texas-red"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-texas-cream">
            {/* Header */}
            <div className="bg-gradient-to-r from-texas-red to-texas-darkRed text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-heading mb-4"
                    >
                        OUR MENU
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-texas-cream"
                    >
                        Fresh ingredients, bold flavors, and Texas-sized portions
                    </motion.p>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="sticky top-20 z-40 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto py-4 space-x-2 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex-shrink-0 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${activeCategory === category.id
                                        ? 'bg-texas-red text-white shadow-lg'
                                        : 'bg-gray-200 text-texas-slate hover:bg-gray-300'
                                    }`}
                            >
                                <span className="mr-2">{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-4xl font-heading text-texas-red mb-8">
                        {categories.find(c => c.id === activeCategory)?.name}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {menuData && menuData[activeCategory] && menuData[activeCategory].map((item, index) => (
                            <MenuCard key={item.id} item={item} index={index} />
                        ))}
                    </div>

                    {menuData && menuData[activeCategory] && menuData[activeCategory].length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">No items in this category yet.</p>
                        </div>
                    )}
                </motion.div>

                {/* Notes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 bg-white rounded-xl shadow-lg p-8"
                >
                    <h3 className="text-2xl font-heading text-texas-red mb-4">MENU NOTES</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li>✓ Most entrées come with your choice of two sides</li>
                        <li>✓ Available sides: Fries, Mashed Potatoes, Green Beans, Coleslaw, Mac & Cheese, Corn</li>
                        <li>✓ Gluten-free and vegetarian options available - please ask your server</li>
                        <li>✓ Consuming raw or undercooked meats may increase your risk of foodborne illness</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default Menu;
