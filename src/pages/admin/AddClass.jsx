import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const AddClass = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    capacity: '',
    difficulty: '',
    price: '',
    image: '',
    schedule: '',
    location: ''
  });
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const addClassMutation = useMutation({
    mutationFn: async (classData) => {
      try {
        const response = await axios.post('https://fitverse-pearl.vercel.app/classes', classData);
        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to add class';
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['classes']);
      setFormData({
        name: '',
        description: '',
        duration: '',
        capacity: '',
        difficulty: '',
        price: '',
        image: '',
        schedule: '',
        location: ''
      });
      setError('');
      toast.success('Class added successfully');
    },
    onError: (error) => {
      setError(error.message);
      toast.error('Failed to add class. Please try again.');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.name || !formData.description || !formData.duration) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await addClassMutation.mutateAsync(formData);
    } catch (err) {
      // Error will be handled by onError callback
      console.error('Error adding class:', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-4 md:p-6 lg:p-8"
    >
      <motion.h2 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-[#FF640D] to-orange-600 bg-clip-text text-transparent"
      >
        Add New Class
      </motion.h2>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg shadow-md"
        >
          {error}
        </motion.div>
      )}

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit} 
        className="space-y-4 bg-gradient-to-br from-white to-orange-50 p-6 rounded-xl shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#FF640D] focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block mb-1 font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#FF640D] focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#FF640D] focus:border-transparent transition-all duration-300 min-h-[100px]"
            required
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block mb-1 font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full p-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#FF640D] focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block mb-1 font-medium text-gray-700">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#FF640D] focus:border-transparent transition-all duration-300"
              required
            >
              <option value="">Select Difficulty</option>
              <option value="All Levels">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block mb-1 font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#FF640D] focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block mb-1 font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#FF640D] focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block mb-1 font-medium text-gray-700">Schedule</label>
            <input
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              className="w-full p-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#FF640D] focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block mb-1 font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#FF640D] focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-gradient-to-r from-[#FF640D] to-orange-600 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:from-orange-300 disabled:to-orange-400 mt-6"
          disabled={addClassMutation.isPending}
        >
          {addClassMutation.isPending ? 'Adding...' : 'Add Class'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AddClass;
