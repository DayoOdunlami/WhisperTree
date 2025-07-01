import React from 'react';
import { motion } from 'framer-motion';

const SettingsPanel = ({ 
  sensitivity, 
  onSensitivityChange, 
  treeType, 
  onTreeTypeChange,
  onTestQuiet,
  onTestLoud 
}) => {
  return (
    <motion.div 
      className="bg-white rounded-lg p-6 shadow-lg max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        🌳 Tree Settings
      </h3>
      
      {/* Sensitivity Slider */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How Sensitive? <span className="text-green-600 font-bold">{sensitivity}%</span>
        </label>
        <input 
          type="range" 
          min="10" 
          max="90" 
          value={sensitivity}
          onChange={(e) => onSensitivityChange(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Very Quiet</span>
          <span>Very Loud</span>
        </div>
      </div>

      {/* Tree Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose Your Tree
        </label>
        <select 
          value={treeType} 
          onChange={(e) => onTreeTypeChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="growing">🌱 Growing Tree (GSAP Style)</option>
          <option value="flowering">🌺 Flowering Tree (Scene.js Style)</option>
          <option value="fractal">🌳 Fractal Tree (Canvas)</option>
          <option value="character">😊 Character Tree (Full Detail)</option>
          <option value="myau-original">🌿 Myau Original (GSAP)</option>
          <option value="grant-jenkins-1">🌿 Grant Jenkins Tree 1 (SVG Particles)</option>
          <option value="grant-jenkins-2">⚡ Grant Jenkins Tree 2 (Geometric Energy)</option>
        </select>
      </div>

      {/* Test Buttons */}
      <div className="flex gap-3">
        <motion.button 
          onClick={onTestQuiet}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🤫 Test Quiet
        </motion.button>
        <motion.button 
          onClick={onTestLoud}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔊 Test Loud
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SettingsPanel; 