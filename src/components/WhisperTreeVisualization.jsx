import React from 'react';
import { motion } from 'framer-motion';

export default function WhisperTreeVisualization({ isQuiet, volume, treeType = 'svg' }) {
  const renderTree = () => {
    switch (treeType) {
      case 'svg':
        return (
          <div className='text-center p-8 bg-gradient-to-b from-sky-200 to-green-100 rounded-lg'>
            <motion.div
              className='w-32 h-32 bg-green-500 rounded-full mx-auto mb-4'
              animate={{
                scale: isQuiet ? [1, 1.1, 1] : [1, 0.9, 1],
                rotate: isQuiet ? [-2, 2, -2] : [-10, 10, -10]
              }}
              transition={{ duration: isQuiet ? 3 : 0.5, repeat: Infinity }}
            />
            <h3 className='text-xl font-bold text-gray-700'>SVG Tree</h3>
            <p className='text-sm text-gray-600'>Volume: {volume}% | Status: {isQuiet ? 'Quiet' : 'Loud'}</p>
          </div>
        );
      case 'css':
        return (
          <div className='text-center p-8 bg-gradient-to-b from-blue-200 to-green-50 rounded-lg'>
            <motion.div
              className='w-32 h-32 bg-blue-500 rounded-full mx-auto mb-4'
              animate={{
                scale: isQuiet ? [1, 1.05, 1] : [1, 0.95, 1],
                rotate: isQuiet ? [-1, 1, -1] : [-5, 5, -5]
              }}
              transition={{ duration: isQuiet ? 2 : 0.4, repeat: Infinity }}
            />
            <h3 className='text-xl font-bold text-gray-700'>CSS Tree</h3>
            <p className='text-sm text-gray-600'>Volume: {volume}% | Status: {isQuiet ? 'Quiet' : 'Loud'}</p>
          </div>
        );
      case 'flowering':
        return (
          <div className='text-center p-8 bg-yellow-50 rounded-lg'>
            <motion.div
              className='w-32 h-32 bg-yellow-400 rounded-full mx-auto mb-4'
              animate={{
                scale: isQuiet ? [1, 1.15, 1] : [1, 0.85, 1],
                rotate: isQuiet ? [-3, 3, -3] : [-8, 8, -8]
              }}
              transition={{ duration: isQuiet ? 4 : 0.6, repeat: Infinity }}
            />
            <h3 className='text-xl font-bold text-gray-700'>Flowering Tree</h3>
            <p className='text-sm text-gray-600'>Volume: {volume}% | Status: {isQuiet ? 'Quiet' : 'Loud'}</p>
          </div>
        );
      case 'character':
        return (
          <div className='text-center p-8 bg-purple-50 rounded-lg'>
            <motion.div
              className='w-32 h-32 bg-purple-400 rounded-full mx-auto mb-4'
              animate={{
                scale: isQuiet ? [1, 1.2, 1] : [1, 0.8, 1],
                rotate: isQuiet ? [-1, 1, -1] : [-12, 12, -12]
              }}
              transition={{ duration: isQuiet ? 2.5 : 0.3, repeat: Infinity }}
            />
            <h3 className='text-xl font-bold text-gray-700'>Character Tree</h3>
            <p className='text-sm text-gray-600'>Volume: {volume}% | Status: {isQuiet ? 'Quiet' : 'Loud'}</p>
          </div>
        );
      default:
        return <div>Unknown tree type</div>;
    }
  };

  return (
    <div className='max-w-md mx-auto'>
      {renderTree()}
    </div>
  );
}
