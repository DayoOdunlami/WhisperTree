import React, { Component } from 'react';
import TreeVisualization from './TreeVisualization';
import SettingsPanel from './components/SettingsPanel';
import StatusIndicator from './components/StatusIndicator';
import { useAudioMeter } from './hooks/useAudioMeter';

// Convert to functional component to use the custom hook
const App = () => {
  const [audio, setAudio] = React.useState(null);
  const [threshold, setThreshold] = React.useState(50);
  const [treeType, setTreeType] = React.useState('cherry');
  const [showSettings, setShowSettings] = React.useState(false);

  const { volume, isQuiet, isListening, testQuiet, testLoud } = useAudioMeter(audio, threshold);

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudio(stream);
    } catch (err) {
      alert('Microphone access denied. Please allow microphone to use WhisperTree.');
    }
  };

  const stopMicrophone = () => {
    if (audio) {
      audio.getTracks().forEach(track => track.stop());
      setAudio(null);
    }
  };

  const handleSensitivityChange = (newThreshold) => {
    setThreshold(newThreshold);
  };

  const handleTreeTypeChange = (newTreeType) => {
    setTreeType(newTreeType);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-green-200 font-child p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">WhisperTree</h1>
      
      {/* Microphone Controls */}
      <div className="flex gap-4 mb-6">
        {!isListening ? (
          <button
            onClick={startMicrophone}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg text-xl transition-colors"
          >
            🎤 Start Listening
          </button>
        ) : (
          <button
            onClick={stopMicrophone}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-lg text-xl transition-colors"
          >
            🔇 Stop Listening
          </button>
        )}
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg text-xl transition-colors"
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Tree Visualization */}
      <div className="w-full max-w-md flex justify-center items-center mb-8">
        <TreeVisualization isQuiet={isQuiet} volume={volume} treeType={treeType} />
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-6">
          <SettingsPanel
            sensitivity={threshold}
            onSensitivityChange={handleSensitivityChange}
            treeType={treeType}
            onTreeTypeChange={handleTreeTypeChange}
            onTestQuiet={testQuiet}
            onTestLoud={testLoud}
          />
        </div>
      )}

      {/* Status Indicator */}
      <StatusIndicator
        volume={volume}
        isQuiet={isQuiet}
        isListening={isListening}
      />
    </div>
  );
};

export default App;
