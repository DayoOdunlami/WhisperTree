import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import TreeVisualization from './TreeVisualization';
// import TreeVisualization from './TreeVisualization'; // To be implemented

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      isQuiet: true,
      volume: 0,
      threshold: 50,
      treeType: 'cherry',
      listening: false
    };
  }

  startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.setState({ audio: stream, listening: true });
    } catch (err) {
      alert('Microphone access denied. Please allow microphone to use WhisperTree.');
    }
  };

  handleVolumeChange = (isQuiet, volume) => {
    this.setState({ isQuiet, volume });
  };

  render() {
    const { audio, isQuiet, volume, threshold, treeType, listening } = this.state;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-green-200 font-child">
        <h1 className="text-3xl font-bold mb-6">WhisperTree</h1>
        {/* Microphone button */}
        {!listening && (
          <button
            onClick={this.startMicrophone}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-6 mb-6 shadow-lg text-2xl"
          >
            🎤 Start Listening
          </button>
        )}
        {/* AudioAnalyser for volume detection */}
        {audio && (
          <AudioAnalyser
            audio={audio}
            threshold={threshold}
            onVolumeChange={this.handleVolumeChange}
          />
        )}
        {/* TreeVisualization placeholder */}
        <div className="w-full max-w-md flex justify-center items-center mb-8">
          <TreeVisualization isQuiet={isQuiet} volume={volume} treeType={treeType} />
        </div>
        {/* SettingsPanel and StatusIndicator will go here */}
        {/* <SettingsPanel ... /> */}
        {/* <StatusIndicator ... /> */}
      </div>
    );
  }
}

export default App;
