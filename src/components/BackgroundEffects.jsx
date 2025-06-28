import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundEffects = ({ isQuiet, volume, quietTime, showCelebration }) => {
  const getSkyColor = () => {
    if (!isQuiet) {
      // Loud - dark sky
      return 'from-gray-600 to-gray-800';
    } else if (volume < 20) {
      // Very quiet - bright sky
      return 'from-blue-300 to-blue-500';
    } else {
      // Moderate - normal sky
      return 'from-blue-200 to-green-200';
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Dynamic Background */}
      <motion.div
        className={`fixed inset-0 bg-gradient-to-b ${getSkyColor()} transition-all duration-1000`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Progress Indicator */}
      <motion.div
        className="fixed top-4 right-4 bg-white rounded-lg p-3 shadow-lg"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">🤫 Quiet Time</div>
          <div className="text-2xl font-bold text-green-600">
            {formatTime(quietTime)}
          </div>
        </div>
      </motion.div>

      {/* Celebration Effects */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Confetti */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px'
                }}
                initial={{ y: -10, opacity: 1 }}
                animate={{ 
                  y: window.innerHeight + 10, 
                  opacity: 0,
                  x: Math.random() * 200 - 100
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5
                }}
              />
            ))}
            
            {/* Celebration Message */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl text-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-xl font-bold text-gray-800 mb-2">
                Amazing Job!
              </div>
              <div className="text-gray-600">
                You stayed quiet for {formatTime(quietTime)}!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BackgroundEffects; 