import React from 'react';
import { motion } from 'framer-motion';
import WhisperTreeVisualization from '../WhisperTreeVisualization';

const TreeTile = ({ tree, isSelected, isQuiet, volume, onSelect }) => {
  return (
    <motion.div
      className={`tree-tile bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-green-500 shadow-lg scale-105' 
          : 'hover:shadow-md hover:scale-102'
      }`}
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Tree Preview */}
      <div className="relative h-48 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32">
            <WhisperTreeVisualization
              treeType={tree.id}
              isQuiet={isQuiet}
              volume={volume}
              isPlaying={false} // Don't auto-play in grid view
            />
          </div>
        </div>
        
        {/* Play Button Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-white/90 rounded-full p-3">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </motion.div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
            {tree.category}
          </span>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            tree.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
            tree.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {tree.difficulty}
          </span>
        </div>
      </div>

      {/* Tree Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 text-lg">{tree.name}</h3>
          {tree.codepenUrl && (
            <a
              href={tree.codepenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              ↗
            </a>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {tree.description}
        </p>

        {/* Features */}
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          {tree.hasAudioReactivity && (
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Audio</span>
            </span>
          )}
          {tree.codepenUrl && (
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>CodePen</span>
            </span>
          )}
        </div>

        {/* Select Button */}
        <motion.button
          className={`w-full mt-3 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            isSelected
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSelected ? 'Selected' : 'Select Tree'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TreeTile; 