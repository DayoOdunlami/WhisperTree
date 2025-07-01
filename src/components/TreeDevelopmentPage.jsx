import React, { useState } from 'react';
import WhisperTreeVisualization from './WhisperTreeVisualization';
import FloweringTree from './FloweringTree';

const TreeDevelopmentPage = () => {
  const [isQuiet, setIsQuiet] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [autoToggle, setAutoToggle] = useState(false);

  // Auto-toggle between quiet and loud for testing
  React.useEffect(() => {
    if (!autoToggle) return;
    
    const interval = setInterval(() => {
      setIsQuiet(prev => !prev);
      setVolume(prev => prev > 0.5 ? 0.2 : 0.8);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoToggle]);

  const treeTypes = [
    { id: 'growing', name: '🌱 Growing Tree', description: 'GSAP-style growing animations' },
    { id: 'flowering', name: '🌺 Flowering Tree', description: 'Original Scene.js CodePen' },
    { id: 'fractal', name: '🌳 Fractal Tree', description: 'Canvas-based recursive patterns' },
    { id: 'character', name: '😊 Character Tree', description: 'Full detail with characters' },
    { id: 'myau-original', name: '🌿 Myau Original', description: 'Original CodePen with GSAP' },
    { id: 'grant-jenkins-1', name: '🌿 Grant Jenkins Tree 1', description: 'Sophisticated SVG with particles' },
    { id: 'grant-jenkins-2', name: '⚡ Grant Jenkins Tree 2', description: 'Geometric energy system' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-green-800 p-4">
      {/* Header Controls */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">🌳 Tree Development & Testing</h1>
        
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => setIsQuiet(true)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              isQuiet 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-600 text-gray-200 hover:bg-green-500'
            }`}
          >
            🌱 Quiet Mode
          </button>
          
          <button
            onClick={() => setIsQuiet(false)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              !isQuiet 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-600 text-gray-200 hover:bg-red-500'
            }`}
          >
            🍃 Loud Mode
          </button>
          
          <button
            onClick={() => setAutoToggle(!autoToggle)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              autoToggle 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-600 text-gray-200 hover:bg-purple-500'
            }`}
          >
            🔄 {autoToggle ? 'Stop' : 'Start'} Auto-Toggle
          </button>
        </div>

        <div className="text-white mb-4">
          <div className="text-lg">
            Status: <span className={isQuiet ? 'text-green-400' : 'text-red-400'}>
              {isQuiet ? 'Quiet' : 'Loud'}
            </span>
          </div>
          <div className="text-sm text-gray-300">
            Volume: {Math.round(volume * 100)}% | Auto-toggle: {autoToggle ? 'ON' : 'OFF'}
          </div>
        </div>
      </div>

      {/* Tree Carousel Row */}
      <div className="flex gap-6 max-w-7xl mx-auto overflow-x-auto pb-4 hide-scrollbar">
        {treeTypes.map((tree) => (
          <div key={tree.id} className="min-w-[340px] bg-black/20 rounded-lg p-4 backdrop-blur-sm flex-shrink-0">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-1">{tree.name}</h3>
              <p className="text-sm text-gray-300">{tree.description}</p>
            </div>
            <div className="relative h-80 bg-black/30 rounded-lg overflow-hidden">
              {tree.id === 'flowering' || tree.id === 'flowering-original' ? (
                <FloweringTree />
              ) : (
                <WhisperTreeVisualization 
                  isQuiet={isQuiet} 
                  volume={volume} 
                  treeType={tree.id}
                />
              )}
            </div>
            <div className="text-center mt-3">
              <div className="text-xs text-gray-400">
                Type: {tree.id}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Development Notes */}
      <div className="mt-8 max-w-4xl mx-auto bg-black/30 rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">🔧 Development Notes</h3>
        <div className="text-gray-300 space-y-2 text-sm">
          <p>• All trees are now visible simultaneously for easy comparison and testing</p>
          <p>• Use the controls above to test different audio states</p>
          <p>• Auto-toggle cycles between quiet and loud every 3 seconds</p>
          <p>• Each tree type preserves its original CodePen complexity and animations</p>
          <p>• Focus on getting animations right before adding sound control</p>
        </div>
      </div>
    </div>
  );
};

export default TreeDevelopmentPage; 