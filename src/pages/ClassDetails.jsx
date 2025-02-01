import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch class details and trainers
  const { data, isLoading } = useQuery({
    queryKey: ['class', id],
    queryFn: async () => {
      const res = await axios.get(`https://fitverse-pearl.vercel.app/classes/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const { classDetails, trainers } = data;

  return (
   <>
   <Helmet>
     <title>Fitverse | Class Details</title>
   </Helmet>
   <motion.div 
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.5 }}
     className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-orange-50 to-white"
   >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-orange-100"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative h-48 sm:h-72 lg:h-96 overflow-hidden"
        >
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={classDetails?.image}
            alt={classDetails?.name}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 sm:p-6 lg:p-8"
        >
          <motion.h1 
            whileHover={{ scale: 1.02 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF640D] to-orange-600 bg-clip-text text-transparent"
          >
            {classDetails?.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6 text-sm sm:text-base"
          >
            {classDetails?.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8"
          >
            <div className="bg-orange-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold mb-2 text-[#FF640D]">Class Details:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Duration:</span>
                  <span>{classDetails?.duration}</span>
                </li>
                <li className="flex items-center gap-2">  
                  <span className="font-medium text-gray-700">Schedule:</span>
                  <span>{classDetails?.schedule}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Location:</span>
                  <span>{classDetails?.location}</span>
                </li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold mb-2 text-[#FF640D]">Additional Information:</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Price:</span>
                  <span className="text-[#FF640D] font-semibold">${classDetails?.price}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Capacity:</span>
                  <span>{classDetails?.capacity} students</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 bg-gradient-to-r from-orange-50 to-white p-4 rounded-xl shadow-sm"
          >
            <h3 className="font-semibold mb-2 text-[#FF640D]">Difficulty Level:</h3>
            <ul className="list-disc pl-5 space-y-1">
                <motion.li 
                  key={1}
                  whileHover={{ x: 5 }}
                  className="text-gray-700"
                >
                  {classDetails?.difficulty}
                </motion.li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-[#FF640D] text-center">Available Trainers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainers?.map((trainer, index) => (
                <motion.div 
                  key={trainer._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-white to-orange-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={trainer.profileImage}
                    alt={trainer.fullName}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover cursor-pointer border-2 border-[#FF640D]"
                    onClick={() => navigate(`/trainer/${trainer._id}`)}
                  />
                  <h4 className="text-lg font-semibold text-center text-gray-800">{trainer.fullName}</h4>
                  <p className="text-[#FF640D] text-center text-sm font-medium">{trainer.experience} years experience</p>
                  <div className="mt-3 bg-white/50 p-2 rounded-lg">
                    <h5 className="font-medium text-sm mb-1 text-gray-700">Specializations:</h5>
                    <p className="text-sm text-[#FF640D]">{trainer.skills?.join(', ')}</p>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-2 flex justify-center space-x-3"
                  >
                    {trainer.socialMedia?.facebook && (
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        href={trainer.socialMedia.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Facebook
                      </motion.a>
                    )}
                    {trainer.socialMedia?.twitter && (
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        href={trainer.socialMedia.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:text-blue-500"
                      >
                        Twitter
                      </motion.a>
                    )}
                    {trainer.socialMedia?.instagram && (
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        href={trainer.socialMedia.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-pink-600 hover:text-pink-700"
                      >
                        Instagram
                      </motion.a>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
   </>
  );
};

export default ClassDetails;