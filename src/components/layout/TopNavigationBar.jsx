import React from 'react';
import { motion } from 'framer-motion';
import TreeSelector from './TreeSelector';
import ControlButtons from './ControlButtons';

const TopNavigationBar = ({ 
  currentTree, 
  onTreeSelect, 
  isPlaying, 
  onPlayToggle, 
  onRestart,
  onViewChange,
  currentView,
  onSettingsClick,
  isQuiet,
  onQuietToggle,
  onLoudToggle
}) => {
  return (
    <motion.div 
      className="top-nav-bar fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200/50 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        
        {/* Left: Branding */}
        <div className="flex items-center space-x-4">
          <motion.h1 
            className="text-xl font-bold text-green-700 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-2xl">🌳</span>
            <span>WhisperTree</span>
          </motion.h1>
        </div>
        
        {/* Center: Tree Controls */}
        <div className="flex items-center space-x-4">
          <TreeSelector 
            currentTree={currentTree} 
            onSelect={onTreeSelect} 
          />
          <ControlButtons 
            isPlaying={isPlaying}
            onPlayToggle={onPlayToggle}
            onRestart={onRestart}
          />
        </div>
        
        {/* Right: Navigation & Audio Controls */}
        <div className="flex items-center space-x-4">
          {/* Quick Audio Controls */}
          <div className="flex space-x-2">
            <motion.button
              onClick={onQuietToggle}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isQuiet 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-green-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🌱 Quiet
            </motion.button>
            
            <motion.button
              onClick={onLoudToggle}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                !isQuiet 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-red-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🍃 Loud
            </motion.button>
          </div>
          
          <motion.button 
            onClick={() => onViewChange('development')}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentView === 'development' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📊 Development
          </motion.button>
          
          <motion.button 
            onClick={onSettingsClick}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 rounded-lg transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            title="Settings"
          >
            ⚙️
          </motion.button>
        </div>
        
      </div>
    </motion.div>
  );
};

export default TopNavigationBar; 