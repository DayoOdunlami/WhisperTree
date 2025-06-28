import React from 'react';
import TreeVisualization from './TreeVisualization';
import SettingsPanel from './components/SettingsPanel';
import StatusIndicator from './components/StatusIndicator';
import BackgroundEffects from './components/BackgroundEffects';
import { useAudioMeter } from './hooks/useAudioMeter';
import { useWhisperTreeSettings, useWhisperTreeProgress } from './hooks/useLocalStorage';

const App = () => {
  const [audio, setAudio] = React.useState(null);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showProgress, setShowProgress] = React.useState(true);

  // Local storage hooks
  const [settings, setSettings] = useWhisperTreeSettings();
  const [progress, updateProgress, resetProgress] = useWhisperTreeProgress();

  const { volume, isQuiet, isListening, testQuiet, testLoud } = useAudioMeter(audio, settings.threshold);

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
    setSettings(prev => ({ ...prev, threshold: newThreshold }));
  };

  const handleTreeTypeChange = (newTreeType) => {
    setSettings(prev => ({ ...prev, treeType: newTreeType }));
  };

  const handleToggleProgress = () => {
    setShowProgress(!showProgress);
    setSettings(prev => ({ ...prev, showProgress: !showProgress }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-child p-4 relative">
      {/* Background Effects */}
      <BackgroundEffects 
        isQuiet={isQuiet} 
        volume={volume} 
        quietTime={progress.totalQuietTime}
        showCelebration={settings.enableCelebrations}
      />
      
      <h1 className="text-4xl font-bold mb-6 text-gray-800 relative z-10">WhisperTree</h1>
      
      {/* Microphone Controls */}
      <div className="flex gap-4 mb-6 relative z-10">
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

        <button
          onClick={handleToggleProgress}
          className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-4 shadow-lg text-xl transition-colors"
        >
          📊 {showProgress ? 'Hide' : 'Show'} Progress
        </button>
      </div>

      {/* Tree Visualization */}
      <div className="w-full max-w-md flex justify-center items-center mb-8 relative z-10">
        <TreeVisualization 
          isQuiet={isQuiet} 
          volume={volume} 
          treeType={settings.treeType} 
        />
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-6 relative z-10">
          <SettingsPanel
            sensitivity={settings.threshold}
            onSensitivityChange={handleSensitivityChange}
            treeType={settings.treeType}
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

      {/* Progress Summary */}
      {showProgress && (
        <div className="mt-6 bg-white rounded-lg p-4 shadow-lg max-w-sm mx-auto relative z-10">
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">📈 Your Progress</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {Math.floor(progress.totalQuietTime / 60)}m
              </div>
              <div className="text-sm text-gray-600">Total Quiet Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {progress.sessionsCompleted}
              </div>
              <div className="text-sm text-gray-600">Sessions</div>
            </div>
          </div>
          <button
            onClick={resetProgress}
            className="w-full mt-3 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Reset Progress
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
