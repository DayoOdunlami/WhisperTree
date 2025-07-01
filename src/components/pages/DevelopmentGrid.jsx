import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { treeRegistry } from '../../utils/treeRegistry';
import TreeTile from '../ui/TreeTile';

const DevelopmentGrid = ({ 
  currentTree, 
  onTreeSelect, 
  isQuiet, 
  volume,
  onBackToMain 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allTrees = treeRegistry.getTreesInOrder();
  const categories = treeRegistry.getCategories();

  // Filter trees based on search and category
  const filteredTrees = allTrees.filter(tree => {
    const matchesSearch = tree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tree.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tree.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="development-grid min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onBackToMain}
              className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back
            </motion.button>
            <h1 className="text-3xl font-bold text-gray-800">🌳 Development Gallery</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              + Add CodePen
            </motion.button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search trees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Tree Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {filteredTrees.map((tree, index) => (
              <motion.div
                key={tree.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TreeTile
                  tree={tree}
                  isSelected={currentTree === tree.id}
                  isQuiet={isQuiet}
                  volume={volume}
                  onSelect={() => onTreeSelect(tree.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredTrees.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🌳</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No trees found</h3>
            <p className="text-gray-500">
              Try adjusting your search or category filter
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          className="mt-12 p-6 bg-white rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{allTrees.length}</div>
              <div className="text-sm text-gray-500">Total Trees</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {allTrees.filter(t => t.codepenUrl).length}
              </div>
              <div className="text-sm text-gray-500">CodePen Sources</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {allTrees.filter(t => t.hasAudioReactivity).length}
              </div>
              <div className="text-sm text-gray-500">Audio Reactive</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DevelopmentGrid; 