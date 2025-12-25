import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';

const Contact = ({ restaurantInfo }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitStatus, setSubmitStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSubmitStatus(''), 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
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
            <div className="bg-gradient-to-r from-texas-slate to-gray-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-heading mb-4"
                    >
                        CONTACT US
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-texas-cream"
                    >
                        We'd love to hear from you!
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-heading text-texas-red mb-8">GET IN TOUCH</h2>

                        {restaurantInfo && (
                            <div className="space-y-6">
                                {/* Address */}
                                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                                    <div className="bg-texas-red p-3 rounded-lg">
                                        <MapPin size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-texas-slate mb-1">Address</h3>
                                        <p className="text-gray-700">{restaurantInfo.address}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                                    <div className="bg-texas-orange p-3 rounded-lg">
                                        <Phone size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-texas-slate mb-1">Phone</h3>
                                        <p className="text-gray-700">{restaurantInfo.phone}</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                                    <div className="bg-texas-red p-3 rounded-lg">
                                        <Mail size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-texas-slate mb-1">Email</h3>
                                        <p className="text-gray-700">info@skeetstexasgrill.com</p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg">
                                    <div className="bg-texas-orange p-3 rounded-lg">
                                        <Clock size={24} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-texas-slate mb-3">Hours of Operation</h3>
                                        <div className="space-y-2">
                                            {Object.entries(restaurantInfo.hours).map(([day, hours]) => (
                                                <div key={day} className="flex justify-between text-sm">
                                                    <span className="font-semibold capitalize text-texas-slate">{day}</span>
                                                    <span className="text-gray-700">{hours}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-heading text-texas-red mb-8">SEND US A MESSAGE</h2>

                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8">
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-texas-slate font-semibold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-texas-red focus:outline-none transition-colors"
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="block text-texas-slate font-semibold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-texas-red focus:outline-none transition-colors"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-texas-slate font-semibold mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows="6"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-texas-red focus:outline-none transition-colors resize-none"
                                    placeholder="What would you like to tell us?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full flex items-center justify-center space-x-2"
                            >
                                <Send size={20} />
                                <span>Send Message</span>
                            </button>

                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"
                                >
                                    Message sent successfully! We'll get back to you soon.
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                                >
                                    Error sending message. Please try again.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>

                {/* Google Maps */}
                {restaurantInfo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-16"
                    >
                        <h2 className="text-3xl font-heading text-texas-red mb-8 text-center">FIND US ON THE MAP</h2>
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                            <iframe
                                src={restaurantInfo.mapEmbedUrl}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Skeet's Texas Grill Location"
                            ></iframe>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Contact;
