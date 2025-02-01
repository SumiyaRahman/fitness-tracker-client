import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';  
import { motion } from 'framer-motion';

const AllClasses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 6;

  const { data: classes = [], isLoading: classesLoading, error: classesError } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axios.get('https://fitverse-pearl.vercel.app/classes');
      return res.data;
    }
  });

  const filteredClasses = classes.filter(classItem =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filteredClasses.slice(indexOfFirstClass, indexOfLastClass);
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (classesLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (classesError) return <div className="min-h-screen flex items-center justify-center">Error: {classesError.message}</div>;

  return (
    <>
      <Helmet>
        <title>Fitverse | All Classes</title>
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-orange-50 to-white"
      >
        <motion.h1 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 zen-dots text-[#383838] hover:text-[#FF640D] transition-colors duration-300"
        >
          All Classes
        </motion.h1>
      
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search classes..."
              className="w-full px-6 py-3 rounded-full border-2 border-orange-100 focus:outline-none focus:ring-2 focus:ring-[#FF640D] focus:border-transparent shadow-lg transition-all duration-300 pl-12"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8"
        >
          {currentClasses.map((classItem, index) => (
            <motion.div
              key={classItem._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-orange-100"
            >
              <div className="relative overflow-hidden group">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={classItem.image}
                  alt={classItem.name}
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-3 text-gray-800 hover:text-[#FF640D] transition-colors duration-300">{classItem.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{classItem.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center bg-orange-50 p-3 rounded-lg">
                    <span className="font-medium text-gray-700">Price:</span>
                    <span className="text-[#FF640D] font-bold text-lg">${classItem.price}</span>
                  </div>
                </div>

                <Link 
                  to={`/classes/${classItem._id}`}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#FF640D] to-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:from-orange-500 hover:to-[#FF640D]"
                  >
                    View Details
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-2 sm:gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FF640D] text-white hover:bg-[#e65a0c] hover:shadow-md'
              }`}
            >
              Previous
            </motion.button>
            
            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index + 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(index + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === index + 1
                    ? 'bg-[#FF640D] text-white shadow-md'
                    : 'bg-orange-50 text-gray-600 hover:bg-orange-100'
                }`}
              >
                {index + 1}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FF640D] text-white hover:bg-[#e65a0c] hover:shadow-md'
              }`}
            >
              Next
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default AllClasses;
