import { useState, useEffect, useRef } from 'react';

export const useAudioMeter = (audioStream, threshold = 50) => {
  const [volume, setVolume] = useState(0);
  const [isQuiet, setIsQuiet] = useState(true);
  const [isListening, setIsListening] = useState(false);
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!audioStream) {
      setIsListening(false);
      return;
    }

    const setupAudio = () => {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 1024;
        analyserRef.current.smoothingTimeConstant = 0.8;
        
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(audioStream);
        microphoneRef.current.connect(analyserRef.current);
        
        setIsListening(true);
        tick();
      } catch (error) {
        console.error('Error setting up audio:', error);
        setIsListening(false);
      }
    };

    const tick = () => {
      if (!analyserRef.current) return;

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      analyserRef.current.getByteTimeDomainData(dataArray);
      
      // Calculate RMS volume
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const sample = (dataArray[i] - 128) / 128;
        sum += sample * sample;
      }
      const rms = Math.sqrt(sum / bufferLength);
      const volumeLevel = rms * 100;
      
      setVolume(volumeLevel);
      setIsQuiet(volumeLevel < threshold);
      
      animationIdRef.current = requestAnimationFrame(tick);
    };

    setupAudio();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (microphoneRef.current) {
        microphoneRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      setIsListening(false);
    };
  }, [audioStream, threshold]);

  const testQuiet = () => {
    setVolume(10);
    setIsQuiet(true);
  };

  const testLoud = () => {
    setVolume(80);
    setIsQuiet(false);
  };

  return {
    volume,
    isQuiet,
    isListening,
    testQuiet,
    testLoud
  };
}; 