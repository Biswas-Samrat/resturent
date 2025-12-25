import { motion } from 'framer-motion';

const MenuCard = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card group"
        >
            <div className="p-6">
                {/* Featured Badge */}
                {item.featured && (
                    <div className="mb-3">
                        <span className="bg-texas-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                            Featured
                        </span>
                    </div>
                )}

                {/* Item Name */}
                <h3 className="text-2xl font-heading text-texas-red mb-2 group-hover:text-texas-orange transition-colors duration-300">
                    {item.name}
                </h3>

                {/* Price */}
                <div className="text-3xl font-bold text-texas-slate mb-3">
                    ${item.price.toFixed(2)}
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                    {item.description}
                </p>

                {/* Sides Note */}
                {item.sides && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-texas-slate italic">
                            ✓ {item.sides}
                        </p>
                    </div>
                )}

                {/* Hover Effect Line */}
                <div className="h-1 bg-gradient-to-r from-texas-red to-texas-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-4 rounded-full"></div>
            </div>
        </motion.div>
    );
};

export default MenuCard;
