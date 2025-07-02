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
      className="top-nav-bar fixed top-0 w-full bg-emerald-500/95 text-white shadow-lg z-50 border-b border-emerald-200/40 rounded-b-2xl backdrop-blur-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        
        {/* Left: Branding */}
        <div className="flex items-center space-x-4">
          <motion.h1 
            className="text-2xl font-extrabold text-white flex items-center space-x-2 tracking-tight drop-shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-3xl">🌳</span>
            <span>WhisperTree</span>
          </motion.h1>
        </div>
        
        {/* Center: Tree Controls */}
        <div className="flex items-center space-x-6">
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
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm ${
                isQuiet 
                  ? 'bg-white text-emerald-600 ring-2 ring-emerald-300' 
                  : 'bg-emerald-400/80 text-white hover:bg-emerald-300/90'
              }`}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              🌱 Quiet
            </motion.button>
            <motion.button
              onClick={onLoudToggle}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm ${
                !isQuiet 
                  ? 'bg-white text-rose-600 ring-2 ring-rose-300' 
                  : 'bg-rose-400/80 text-white hover:bg-rose-300/90'
              }`}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              🍃 Loud
            </motion.button>
          </div>
          
          <motion.button 
            onClick={() => onViewChange('development')}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors shadow-sm ${
              currentView === 'development' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100/80 text-blue-700 hover:bg-blue-200/90'
            }`}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
          >
            📊 Development
          </motion.button>
          
          <motion.button 
            onClick={onSettingsClick}
            className="p-2 text-white hover:text-emerald-100 hover:bg-emerald-600/60 rounded-xl transition-colors"
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