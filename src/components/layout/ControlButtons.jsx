import React from 'react';
import { motion } from 'framer-motion';

const ControlButtons = ({ isPlaying, onPlayToggle, onRestart }) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Play/Pause Button */}
      <motion.button
        onClick={onPlayToggle}
        className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? 'Pause Animation' : 'Play Animation'}
      >
        <motion.div
          animate={{ scale: isPlaying ? 1 : 0.9 }}
          transition={{ duration: 0.2 }}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Restart Button */}
      <motion.button
        onClick={onRestart}
        className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Restart Animation"
      >
        <motion.svg 
          className="w-5 h-5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          animate={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </motion.svg>
      </motion.button>
    </div>
  );
};

export default ControlButtons; 