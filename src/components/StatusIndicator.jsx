import React from 'react';
import { motion } from 'framer-motion';

const StatusIndicator = ({ volume, isQuiet, isListening }) => {
  const getStatusColor = () => {
    if (!isListening) return 'bg-gray-400';
    if (isQuiet) return 'bg-green-500';
    return 'bg-red-500';
  };

  const getStatusEmoji = () => {
    if (!isListening) return '🔇';
    if (isQuiet) return '🤫';
    return '🔊';
  };

  const getStatusText = () => {
    if (!isListening) return 'Not Listening';
    if (isQuiet) return 'Quiet - Good Job!';
    return 'Too Loud!';
  };

  const getVolumeBarColor = () => {
    if (volume < 30) return 'bg-green-500';
    if (volume < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <motion.div 
      className="bg-white rounded-lg p-4 shadow-lg max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
        📊 Current Status
      </h3>
      
      {/* Status Indicator */}
      <div className="flex items-center justify-center mb-4">
        <motion.div 
          className={`w-4 h-4 rounded-full ${getStatusColor()} mr-3`}
          animate={{ scale: isListening ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
        />
        <span className="text-2xl mr-2">{getStatusEmoji()}</span>
        <span className="font-medium text-gray-700">{getStatusText()}</span>
      </div>

      {/* Volume Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Volume: {Math.round(volume)}%</span>
          <span>{isListening ? 'Listening' : 'Off'}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div 
            className={`h-3 rounded-full ${getVolumeBarColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(volume, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Quick Tips */}
      <div className="text-xs text-gray-500 text-center">
        {isQuiet && isListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 font-medium"
          >
            🌸 Keep it quiet to grow more petals!
          </motion.div>
        )}
        {!isQuiet && isListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 font-medium"
          >
            😮 Try whispering to save the petals!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StatusIndicator; 