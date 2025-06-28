import React, { Component } from 'react';

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 0,
      isQuiet: true,
      volumeHistory: []
    };
    this.rafId = null;
    this.analyser = null;
    this.dataArray = null;
    this.audioContext = null;
    this.microphone = null;
  }

  componentDidMount() {
    if (this.props.audio) {
      this.setupAudio(this.props.audio);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.audio !== prevProps.audio) {
      this.cleanupAudio();
      if (this.props.audio) {
        this.setupAudio(this.props.audio);
      }
    }
  }

  componentWillUnmount() {
    this.cleanupAudio();
  }

  setupAudio = (stream) => {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 1024;
    this.microphone = this.audioContext.createMediaStreamSource(stream);
    this.microphone.connect(this.analyser);
    this.dataArray = new Uint8Array(this.analyser.fftSize);
    this.tick();
  };

  cleanupAudio = () => {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.audioContext) this.audioContext.close();
    this.analyser = null;
    this.dataArray = null;
    this.audioContext = null;
    this.microphone = null;
  };

  tick = () => {
    if (!this.analyser) return;
    this.analyser.getByteTimeDomainData(this.dataArray);
    // RMS calculation
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      const sample = (this.dataArray[i] - 128) / 128;
      sum += sample * sample;
    }
    const rms = Math.sqrt(sum / this.dataArray.length);
    const volume = rms * 100;
    const threshold = this.props.threshold || 50;
    const isQuiet = volume < threshold;
    this.setState({ volume, isQuiet });
    if (this.props.onVolumeChange) {
      this.props.onVolumeChange(isQuiet, volume);
    }
    this.rafId = requestAnimationFrame(this.tick);
  };

  render() {
    return null;
  }
}

export default AudioAnalyser;
