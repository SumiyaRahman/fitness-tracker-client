import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: trainer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://fitverse-pearl.vercel.app/trainers/${id}`
        );
        return response.data.data;
      } catch (error) {
        console.error("API Error:", error);
        toast.error('Failed to fetch trainer details.');
        throw new Error(
          error.response?.data?.message || "Failed to fetch trainer details"
        );
      }
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    toast.error('Failed to fetch trainer details.');
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error.message}
      </div>
    );
  }

  if (!trainer) {
    toast.error('No trainer data found');
    return <div className="text-center py-4">No trainer data found</div>;
  }

  const handleSlotSelect = (slotId) => {
    navigate(`/booking/${id}/${slotId}`);
    // console.log(id, slotId);
  };

  return (
    <>
      <Helmet>
        <title>Fitverse | Trainer Details</title>
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-orange-50 to-white"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Side - Trainer Info */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-orange-100"
          >
            <div className="space-y-6 sm:space-y-8">
              <motion.div 
                className="text-center relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-orange-100 to-transparent rounded-t-2xl -z-10" />
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src={trainer.profileImage || "https://i.ibb.co/MgsTCcv/avater.jpg"}
                  alt={trainer.fullName}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-4 sm:mb-6 object-cover border-4 border-[#FF640D] shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
                <motion.h2 
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF640D] to-orange-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  {trainer.fullName}
                </motion.h2>
                <p className="text-gray-600 mt-2">{trainer.email}</p>
              </motion.div>

              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div 
                  className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-white p-4 rounded-xl shadow-sm"
                  whileHover={{ scale: 1.02, backgroundColor: "#fff" }}
                >
                  <span className="font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#FF640D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Experience
                  </span>
                  <span className="text-[#FF640D] font-bold">{trainer.experience} years</span>
                </motion.div>

                <motion.div 
                  className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-white p-4 rounded-xl shadow-sm"
                  whileHover={{ scale: 1.02, backgroundColor: "#fff" }}
                >
                  <span className="font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#FF640D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Available Time
                  </span>
                  <span className="text-[#FF640D] font-bold">{trainer.availableTime}</span>
                </motion.div>

                <motion.div 
                  className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-white p-4 rounded-xl shadow-sm"
                  whileHover={{ scale: 1.02, backgroundColor: "#fff" }}
                >
                  <span className="font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#FF640D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Age
                  </span>
                  <span className="text-[#FF640D] font-bold">{trainer.age} years</span>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-xl shadow-sm"
                  whileHover={{ scale: 1.02, backgroundColor: "#fff" }}
                >
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#FF640D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Specialized Classes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trainer.classes?.map((className, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        className="bg-gradient-to-r from-[#FF640D] to-[#FF8B3D] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        {className}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-xl shadow-sm"
                  whileHover={{ scale: 1.02, backgroundColor: "#fff" }}
                >
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#FF640D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trainer.skills?.map((skill, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        className="bg-gradient-to-r from-[#FF640D] to-[#FF8B3D] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Social Media Links */}
                <motion.div className="flex justify-center space-x-6">
                  {trainer.socialLinks?.facebook && (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={trainer.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF640D] hover:text-[#FF8B3D]"
                    >
                      <FaFacebook size={24} />
                    </motion.a>
                  )}
                  {trainer.socialLinks?.twitter && (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={trainer.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF640D] hover:text-[#FF8B3D]"
                    >
                      <FaTwitter size={24} />
                    </motion.a>
                  )}
                  {trainer.socialLinks?.instagram && (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={trainer.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF640D] hover:text-[#FF8B3D]"
                    >
                      <FaInstagram size={24} />
                    </motion.a>
                  )}
                </motion.div>

                {/* Be a Trainer Section */}
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to="/be-a-trainer"
                    className="inline-block bg-gradient-to-r from-[#FF640D] to-[#FF8B3D] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Become a Trainer
                  </Link>
                  <p className="mt-3 text-gray-600 text-sm">
                    Want to join our team? Apply to become a trainer today!
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Available Slots */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-orange-100"
          >
            <motion.h3 
              className="text-2xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-[#FF640D] to-orange-600 bg-clip-text text-transparent flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Available Slots
            </motion.h3>
            <div className="grid grid-cols-1 gap-4">
              {trainer.availableDays?.map((slot, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSlotSelect(slot.slotId)}
                  disabled={slot.isBooked}
                  className={`group flex justify-between items-center w-full p-5 ${
                    slot.isBooked 
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#FF640D] to-[#FF8B3D] hover:shadow-xl'
                  } text-white rounded-xl shadow-lg transition-all duration-300`}
                >
                  <span className="font-semibold text-lg">{slot.day}</span>
                  <div className="flex flex-col items-end">
                    <span className="bg-white text-[#FF640D] px-4 py-2 rounded-full text-sm font-medium group-hover:bg-orange-100 transition-colors duration-300">
                      {trainer.availableTime}
                    </span>
                    {slot.isBooked && (
                      <span className="text-xs mt-1 text-gray-600">Booked</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default TrainerDetails;
