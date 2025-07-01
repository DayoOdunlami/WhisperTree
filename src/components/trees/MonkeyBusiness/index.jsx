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
          // Draw the original cactus trunk bezier (from original Processing.js code)
          p.stroke(0, 200, 0);
          p.strokeWeight(21);
          p.noFill();
          // Original trunk bezier coordinates
          p.bezier(541, 449, 541, 469, 541, 488, 541, 507);
          p.strokeWeight(1);
          p.noStroke();
          // Draw the cactus pot (original quad coordinates)
          p.fill(139, 69, 19); // brown
          p.quad(517, 500, 562, 500, 554, 545, 525, 545);
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