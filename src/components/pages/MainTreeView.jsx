import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhisperTreeVisualization from '../WhisperTreeVisualization';

const MainTreeView = ({ 
  currentTree, 
  isPlaying, 
  isQuiet, 
  volume,
  onTreeChange 
}) => {
  return (
    <div className="main-tree-view min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 pt-16">
      <div className="relative w-full h-screen">
        
        {/* Tree Visualization Container */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTree}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="tree-container relative"
            >
              <WhisperTreeVisualization
                treeType={currentTree}
                isQuiet={isQuiet}
                volume={volume}
                isPlaying={isPlaying}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Ambient Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-green-200/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/20 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-200/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        {/* Tree Info Overlay */}
        <motion.div
          className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-sm text-gray-600">
            <div className="font-medium text-gray-800">
              {currentTree.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
            <div className="text-xs">
              Status: {isQuiet ? '🌱 Quiet' : '🍃 Active'}
            </div>
            <div className="text-xs">
              Volume: {Math.round(volume * 100)}%
            </div>
          </div>
        </motion.div>

        {/* Audio Status Indicator */}
        <motion.div
          className="absolute top-24 right-8 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div
            className={`w-4 h-4 rounded-full ${
              isQuiet ? 'bg-green-400' : 'bg-red-400'
            }`}
            animate={{
              scale: isQuiet ? [1, 1.2, 1] : [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

      </div>
    </div>
  );
};

export default MainTreeView; 