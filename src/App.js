import React from 'react';
import WhisperTreeVisualization from './components/WhisperTreeVisualization';
import TreeDevelopmentPage from './components/TreeDevelopmentPage';
import SettingsPanel from './components/SettingsPanel';
import StatusIndicator from './components/StatusIndicator';
import BackgroundEffects from './components/BackgroundEffects';
import { useAudioMeter } from './hooks/useAudioMeter';
import { useWhisperTreeSettings, useWhisperTreeProgress } from './hooks/useLocalStorage';

const App = () => {
  const [audio, setAudio] = React.useState(null);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showProgress, setShowProgress] = React.useState(true);
  const [isDevelopmentMode, setIsDevelopmentMode] = React.useState(true); // Start in dev mode

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

  // Show development page if in development mode
  if (isDevelopmentMode) {
    return (
      <div>
        {/* Development Mode Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setIsDevelopmentMode(false)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg"
          >
            🚀 Switch to App Mode
          </button>
        </div>
        
        <TreeDevelopmentPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 via-purple-800 to-green-800 relative">
      {/* Sticky Top Bar with All Controls */}
      <div className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-md flex flex-wrap items-center justify-between px-6 py-3 gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-white tracking-wide">WhisperTree</h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {!isListening ? (
            <button
              onClick={startMicrophone}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 shadow-lg text-lg transition-colors"
            >
              🎤 Start Listening
            </button>
          ) : (
            <button
              onClick={stopMicrophone}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2 shadow-lg text-lg transition-colors"
            >
              🔇 Stop Listening
            </button>
          )}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 shadow-lg text-lg transition-colors"
          >
            ⚙️ Settings
          </button>
          <button
            onClick={handleToggleProgress}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-4 py-2 shadow-lg text-lg transition-colors"
          >
            📊 {showProgress ? 'Hide' : 'Show'} Progress
          </button>
          <select
            value={settings.treeType}
            onChange={e => handleTreeTypeChange(e.target.value)}
            className="bg-white/80 text-gray-800 rounded px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="growing">🌱 Growing Tree</option>
            <option value="flowering">🌺 Flowering Tree</option>
            <option value="fractal">🌳 Fractal Tree</option>
            <option value="character">😊 Character Tree</option>
            <option value="myau-original">🌿 Myau Original</option>
            <option value="flowering-original">🌸 Flowering Original</option>
          </select>
          <button
            onClick={() => setIsDevelopmentMode(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg ml-2"
          >
            🔧 Dev Mode
          </button>
        </div>
      </div>

      {/* Settings Panel (Floating) */}
      {showSettings && (
        <div className="absolute left-1/2 top-24 z-40 -translate-x-1/2 w-full max-w-md">
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

      {/* Status Indicator (Floating) */}
      <div className="absolute right-6 top-24 z-40">
        <StatusIndicator
          volume={volume}
          isQuiet={isQuiet}
          isListening={isListening}
        />
      </div>

      {/* Main Tree Visualization - Fullscreen Centered */}
      <div className="flex-1 flex items-center justify-center w-full h-full min-h-[60vh]">
        <div className="w-full h-full flex items-center justify-center">
          <WhisperTreeVisualization 
            isQuiet={isQuiet} 
            volume={volume} 
            treeType={settings.treeType} 
          />
        </div>
      </div>

      {/* Progress Summary (Floating at Bottom) */}
      {showProgress && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 rounded-lg p-4 shadow-lg max-w-sm mx-auto z-40">
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

      {/* Background Effects (behind everything) */}
      <BackgroundEffects 
        isQuiet={isQuiet} 
        volume={volume} 
        quietTime={progress.totalQuietTime}
        showCelebration={settings.enableCelebrations}
      />
    </div>
  );
};

export default App;
