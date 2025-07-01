import React, { useEffect, useRef } from 'react';
import './styles.css';

const MonkeyBusiness = () => {
  const canvasRef = useRef(null);
  const processingRef = useRef(null);

  useEffect(() => {
    const loadProcessing = async () => {
      if (window.Processing) {
        initializeAnimation();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/processing.js/1.4.8/processing.min.js';
      script.onload = initializeAnimation;
      document.head.appendChild(script);
    };

    const initializeAnimation = () => {
      if (!canvasRef.current || processingRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = 600;
      canvas.height = 600;

      // Minimal Processing.js sketch for debugging
      const sketchProc = function(p) {
        p.setup = function() {
          p.size(600, 600);
          p.background(255, 255, 255);
        };
        p.draw = function() {
          p.background(255, 255, 255);
          p.fill(255, 0, 0);
          p.ellipse(300, 300, 200, 200);
          console.log('Processing draw running');
        };
      };

      try {
        processingRef.current = new window.Processing(canvas, sketchProc);
        console.log('Processing.js minimal sketch initialized', processingRef.current);
      } catch (error) {
        console.error('Error initializing minimal Processing.js:', error);
      }
    };

    loadProcessing();

    return () => {
      if (processingRef.current) {
        processingRef.current.exit();
        processingRef.current = null;
      }
    };
  }, []);

  return (
    <div className="monkey-business-container">
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'red', zIndex: 1000 }}>
        Monkey Business Minimal Debug
      </div>
      <canvas
        ref={canvasRef}
        id="monkey-business-canvas"
        className="monkey-business-canvas"
        width="600"
        height="600"
      />
    </div>
  );
};

export default MonkeyBusiness; 