import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const ActivityLogs = () => {
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const { data } = await axios.get('https://fitverse-pearl.vercel.app/all-trainers');
      return data;
    }
  });

  const handleViewFeedback = async (trainer) => {
    try {
      const { data } = await axios.get(`https://fitverse-pearl.vercel.app/feedback/${trainer.email}`);
      setSelectedFeedback(data?.feedback || 'No feedback provided');
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast.error('Error loading feedback');
      setSelectedFeedback('Error loading feedback');
      setShowModal(true);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-orange-50 to-white"
    >
      <motion.h2 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center bg-gradient-to-r from-[#FF640D] to-orange-600 bg-clip-text text-transparent"
      >
        Trainer Application Status
      </motion.h2>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="overflow-x-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100"
      >
        <table className="min-w-full bg-gradient-to-br from-white to-orange-50">
          <thead className="bg-gradient-to-r from-[#FF640D]/10 to-orange-100/20">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold text-gray-700">Name</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold text-gray-700">Email</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold text-gray-700">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {trainers.map((trainer, index) => (
              <motion.tr 
                key={trainer._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.6)" }}
                className="hover:bg-orange-50/30 transition-colors duration-200"
              >
                <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">{trainer.fullName}</td>
                <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">{trainer.email}</td>
                <td className="px-4 sm:px-6 py-4">
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      trainer.status === 'active' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' :
                      trainer.status === 'rejected' ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800' :
                      'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800'
                    }`}
                  >
                    {trainer.status}
                  </motion.span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  {trainer.status === 'rejected' && (
                    <motion.button
                      whileHover={{ scale: 1.1, color: '#FF640D' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewFeedback(trainer)}
                      className="text-blue-600 hover:text-[#FF640D] transition-colors duration-300"
                    >
                      <FaEye className="text-xl" />
                    </motion.button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Feedback Modal */}
      {showModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gradient-to-br from-white to-orange-50 p-6 sm:p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl border border-orange-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FF640D] to-orange-600 bg-clip-text text-transparent">
                Rejection Feedback
              </h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-[#FF640D] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 p-4 sm:p-6 rounded-xl shadow-inner mb-6"
            >
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{selectedFeedback}</p>
            </motion.div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-[#FF640D] to-[#FF8B3D] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ActivityLogs;
