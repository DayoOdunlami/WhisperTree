import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavigationBar from './components/layout/TopNavigationBar';
import MainTreeView from './components/pages/MainTreeView';
import DevelopmentGrid from './components/pages/DevelopmentGrid';
import { treeRegistry } from './utils/treeRegistry';
import './index.css';

function App() {
  // State management
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'development'
  const [currentTree, setCurrentTree] = useState('growing');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isQuiet, setIsQuiet] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [showSettings, setShowSettings] = useState(false);

  // Auto-toggle for testing (can be removed later)
  const [autoToggle, setAutoToggle] = useState(false);

  useEffect(() => {
    if (!autoToggle) return;
    
    const interval = setInterval(() => {
      setIsQuiet(prev => !prev);
      setVolume(prev => prev > 0.5 ? 0.2 : 0.8);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoToggle]);

  // Tree selection handler
  const handleTreeSelect = (treeId) => {
    if (treeRegistry.isValidTree(treeId)) {
      setCurrentTree(treeId);
      // Switch to main view when selecting a tree from development grid
      if (currentView === 'development') {
        setCurrentView('main');
      }
    }
  };

  // Play/pause handler
  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  // Restart handler
  const handleRestart = () => {
    // Trigger a re-render by temporarily changing the key
    setCurrentTree(prev => {
      setTimeout(() => setCurrentTree(prev), 100);
      return 'temp';
    });
  };

  // View change handler
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Settings handler
  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  // Back to main view handler
  const handleBackToMain = () => {
    setCurrentView('main');
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <TopNavigationBar
        currentTree={currentTree}
        onTreeSelect={handleTreeSelect}
        isPlaying={isPlaying}
        onPlayToggle={handlePlayToggle}
        onRestart={handleRestart}
        onViewChange={handleViewChange}
        currentView={currentView}
        onSettingsClick={handleSettingsClick}
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentView === 'main' ? (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MainTreeView
              currentTree={currentTree}
              isPlaying={isPlaying}
              isQuiet={isQuiet}
              volume={volume}
              onTreeChange={handleTreeSelect}
            />
          </motion.div>
        ) : (
          <motion.div
            key="development"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DevelopmentGrid
              currentTree={currentTree}
              onTreeSelect={handleTreeSelect}
              isQuiet={isQuiet}
              volume={volume}
              onBackToMain={handleBackToMain}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel (Future Implementation) */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              
              {/* Auto-toggle for testing */}
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={autoToggle}
                    onChange={(e) => setAutoToggle(e.target.checked)}
                    className="rounded"
                  />
                  <span>Auto-toggle for testing</span>
                </label>
              </div>

              {/* Volume control */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Test Volume: {Math.round(volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Quiet/Loud toggle */}
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isQuiet}
                    onChange={(e) => setIsQuiet(e.target.checked)}
                    className="rounded"
                  />
                  <span>Quiet Mode</span>
                </label>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Controls (for testing) */}
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <motion.button
          onClick={() => setIsQuiet(true)}
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
          onClick={() => setIsQuiet(false)}
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
    </div>
  );
}

export default App;
