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

      // Minimal Processing.js sketch with Cactus class debug
      const sketchProc = function(p) {
        // Cactus class
        function Cactus() {}
        Cactus.prototype.draw = function() {
          p.fill(0, 0, 255); // blue
          p.rect(100, 100, 100, 100); // blue rectangle
        };
        let cactus;
        p.setup = function() {
          p.size(600, 600);
          p.frameRate(60);
          p.smooth();
          cactus = new Cactus();
          console.log('Processing.js setup with Cactus class');
        };
        p.draw = function() {
          p.background(255, 255, 0);
          p.fill(255, 0, 0);
          p.ellipse(300, 300, 100, 100);
          cactus.draw(); // draw blue rectangle from Cactus class
          p.fill(0);
          p.textSize(32);
          p.text('Frame: ' + p.frameCount, 220, 50);
          console.log('Processing.js draw with Cactus class, frame:', p.frameCount);
        };
      };

      try {
        processingRef.current = new window.Processing(canvas, sketchProc);
        console.log('Processing.js cactus sketch initialized', processingRef.current);
      } catch (error) {
        console.error('Error initializing cactus Processing.js:', error);
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
        Monkey Business Cactus Debug
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