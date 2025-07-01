import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { treeRegistry } from '../../utils/treeRegistry';

const TreeSelector = ({ currentTree, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTreeData = treeRegistry.getTree(currentTree) || treeRegistry.getDefaultTree();
  const allTrees = treeRegistry.getTreesInOrder();

  const handleSelect = (treeId) => {
    onSelect(treeId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-lg">{currentTreeData.name.split(' ')[0]}</span>
        <span className="text-sm text-gray-600">{currentTreeData.name.split(' ').slice(1).join(' ')}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400"
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-2">
              {allTrees.map((tree) => (
                <motion.button
                  key={tree.id}
                  onClick={() => handleSelect(tree.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentTree === tree.id
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{tree.name.split(' ')[0]}</span>
                    <div className="flex-1">
                      <div className="font-medium">{tree.name.split(' ').slice(1).join(' ')}</div>
                      <div className="text-sm text-gray-500">{tree.description}</div>
                    </div>
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
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TreeSelector; 