import React, { useState, useContext } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
const BeATrainer = () => {
    const {user} = useAuth();
    const initialFormData = {
        fullName: '',
        email: user?.email || '',
        age: '',
        profileImage: '',
        experience: '',
        facebook: '',
        twitter: '',
        instagram: '',
        skills: [],
        availableDays: [],
        availableTime: '',
        classes: []
    };

    const [formData, setFormData] = useState(initialFormData);

    const skillsList = [
        'Weight Training',
        'Cardio',
        'Yoga',
        'Pilates',
        'CrossFit',
        'Martial Arts',
        'Nutrition Planning'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const classesList = ['Yoga', 'Spinning', 'Zumba', 'HIIT', 'Boxing', 'Pilates'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e, type) => {
        const { value, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [type]: checked 
                ? [...prevState[type], value]
                : prevState[type].filter(item => item !== value)
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            profileImage: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!formData.fullName || !formData.age || !formData.experience || !formData.profileImage) {
                toast.error('Please fill in all required fields');
                return;
            }

            if (formData.skills.length === 0) {
                toast.error('Please select at least one skill');
                return;
            }

            if (formData.availableDays.length === 0) {
                toast.error('Please select at least one available day');
                return;
            }

            if (!formData.availableTime) {
                toast.error('Please select your available time');
                return;
            }

            const response = await fetch('https://fitverse-pearl.vercel.app/trainers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    status: 'pending'
                })
            });
            
            if (response.ok) {
                toast.success('Trainer application submitted successfully!');
                setFormData(initialFormData);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to submit trainer application');
            }
        } catch (error) {
            toast.error('Failed to submit trainer application. Please try again.');
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-20"
        >
            <motion.h2 
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-[#FF640D] to-orange-600 bg-clip-text text-transparent"
            >
                Become a Trainer
            </motion.h2>
            
            <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit} 
                className="max-w-6xl mx-auto space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-orange-100"
            >
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                    >
                        <label className="block text-sm font-medium text-orange-600">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                            required
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                    >
                        <label className="block text-sm font-medium text-orange-600">Email</label>
                        <input
                            type="email"
                            value={formData.email || ''}
                            className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
                            readOnly
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                    >
                        <label className="block text-sm font-medium text-orange-600">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                            required
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                    >
                        <label className="block text-sm font-medium text-orange-600">Profile Image URL</label>
                        <input
                            type="url"
                            name="profileImage"
                            value={formData.profileImage}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                            required
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                    >
                        <label className="block text-sm font-medium text-orange-600">Years of Experience</label>
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                            required
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                    >
                        <label className="block text-sm font-medium text-orange-600">Available Time</label>
                        <input
                            type="time"
                            name="availableTime"
                            value={formData.availableTime}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                            required
                        />
                    </motion.div>
                </div>

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="space-y-3 bg-gradient-to-r from-orange-50 to-white p-6 rounded-xl"
                >
                    <label className="block text-sm font-medium text-orange-600">Social Media Links</label>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm">
                            <FaFacebook className="text-blue-600 text-xl" />
                            <input
                                type="url"
                                name="facebook"
                                value={formData.facebook}
                                onChange={handleChange}
                                placeholder="Facebook URL"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm">
                            <FaTwitter className="text-blue-400 text-xl" />
                            <input
                                type="url"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                placeholder="Twitter URL"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm">
                            <FaInstagram className="text-pink-600 text-xl" />
                            <input
                                type="url"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                placeholder="Instagram URL"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="space-y-3 bg-gradient-to-r from-orange-50 to-white p-6 rounded-xl"
                    >
                        <label className="block text-sm font-medium text-orange-600">Skills</label>
                        <div className="grid grid-cols-2 gap-3">
                            {skillsList.map(skill => (
                                <motion.label 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    key={skill} 
                                    className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        value={skill}
                                        checked={formData.skills.includes(skill)}
                                        onChange={(e) => handleCheckboxChange(e, 'skills')}
                                        className="w-4 h-4 text-orange-500"
                                    />
                                    <span className="text-sm">{skill}</span>
                                </motion.label>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="space-y-3 bg-gradient-to-r from-orange-50 to-white p-6 rounded-xl"
                    >
                        <label className="block text-sm font-medium text-orange-600">Classes</label>
                        <div className="grid grid-cols-2 gap-3">
                            {classesList.map(classItem => (
                                <motion.label 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    key={classItem} 
                                    className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        value={classItem}
                                        checked={formData.classes.includes(classItem)}
                                        onChange={(e) => handleCheckboxChange(e, 'classes')}
                                        className="w-4 h-4 text-orange-500"
                                    />
                                    <span className="text-sm">{classItem}</span>
                                </motion.label>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-xl"
                >
                    <label className="block text-sm font-medium text-orange-600">Available Days</label>
                    <div className="flex flex-wrap gap-3">
                        {daysOfWeek.map(day => (
                            <motion.label 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                key={day} 
                                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    value={day}
                                    checked={formData.availableDays.includes(day)}
                                    onChange={(e) => handleCheckboxChange(e, 'availableDays')}
                                    className="w-4 h-4 text-orange-500"
                                />
                                <span className="text-sm">{day}</span>
                            </motion.label>
                        ))}
                    </div>
                </motion.div>

                <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#FF640D] to-orange-600 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Submit Application
                </motion.button>
            </motion.form>
        </motion.div>
    );
};

export default BeATrainer;