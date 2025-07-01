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

      // Full original Processing.js cactus code with animation and state
      function Cactus(args) {
        args = args || {};
        this.x = args.x || 100;
        this.y = args.y || 0;
        this.colors = args.colors || {
          pot: p.color(139, 69, 19), // brown
          cactus: p.color(0, 200, 0), // green
          shadow: p.color(100, 50, 10, 180) // dark brown, semi-transparent
        };
        this.anim = {
          cactus: {
            x1: 541, y1: 449, x2: 541, y2: 469,
            x3: 541, y3: 488, x4: 541, y4: 507,
            xoff: 0
          },
          feet: { y1: 0, y2: 0, speed: 25 }
        };
        this.timer = args.timer || 0;
        this.state = args.state || 0;
      }
      Cactus.prototype = {
        draw: function() {
          p.noFill();
          p.stroke(this.colors.cactus);
          p.strokeWeight(21);
          // Trunk
          p.bezier(
            this.anim.cactus.x1 + this.anim.cactus.xoff, this.anim.cactus.y1,
            this.anim.cactus.x2 + this.anim.cactus.xoff * 0.75, this.anim.cactus.y2,
            this.anim.cactus.x3 + this.anim.cactus.xoff * 0.5, this.anim.cactus.y3,
            this.anim.cactus.x4, this.anim.cactus.y4
          );
          // Left arm
          p.strokeWeight(10);
          p.bezier(
            541 + this.anim.cactus.xoff, 470,
            529 + this.anim.cactus.xoff, 470,
            520 + this.anim.cactus.xoff, 475,
            520 + this.anim.cactus.xoff, 459
          );
          // Right arm
          p.bezier(
            540 + this.anim.cactus.xoff, 481,
            552 + this.anim.cactus.xoff, 482,
            561 + this.anim.cactus.xoff, 484,
            561 + this.anim.cactus.xoff, 473
          );
          // Feet
          p.strokeWeight(8);
          p.line(533, 536, 533, 550 + this.anim.feet.y1);
          p.line(546, 536, 546, 550 + this.anim.feet.y2);
          p.strokeWeight(1);
          p.noStroke();
          // Pot
          p.fill(this.colors.pot);
          p.quad(517, 500, 562, 500, 554, 545, 525, 545);
          // Shadow
          p.fill(this.colors.shadow);
          p.quad(540, 500, 562, 500, 554, 545, 540, 545);
        },
        update: function() {
          this.timer = (this.timer + 1) % 210;
          switch(this.state) {
            case 0: // walk in
              this.x = p.constrain(this.x - 2, 0, this.x);
              if(this.x > 0) {
                var s = p.sin(p.radians(this.timer * this.anim.feet.speed)) * 5;
                this.anim.feet.y1 = p.constrain(s, -5, 0);
                this.anim.feet.y2 = p.constrain(-s, -5, 0);
              } else {
                this.anim.feet.y1 = ~~p.lerp(this.anim.feet.y1, 0, 0.10);
                this.anim.feet.y2 = ~~p.lerp(this.anim.feet.y2, 0, 0.10);
                this.anim.cactus.xoff = p.lerp(this.anim.cactus.xoff, 0, 0.15);
              }
              if(this.timer >= 90) this.state++;
              break;
            case 1: // sit
              this.y = p.constrain(this.y + 2.0, this.y, 10);
              this.anim.feet.y1 = p.constrain(this.anim.feet.y1 - 2, -10, this.anim.feet.y1);
              this.anim.feet.y2 = p.constrain(this.anim.feet.y2 - 2, -10, this.anim.feet.y2);
              if(this.timer >= 150) this.state++;
              break;
            case 2: // slide out
              this.x = p.constrain(this.x + 4, 0, 100);
              this.anim.cactus.xoff = p.lerp(this.anim.cactus.xoff, -10, 0.20);
              if(this.timer === 0) {
                this.y = 0;
                this.anim.feet.y1 = 0;
                this.anim.feet.y2 = 0;
                this.anim.cactus.xoff = 15;
                this.state = 0;
              }
              break;
          }
        },
        go: function() {
          this.draw();
          this.update();
        }
      };

      // App class (background + cactus)
      function App() {
        this.timer = 0;
        this.cactus = new Cactus({});
        this.colors = {
          light: p.color(255, 247, 225),
          medium: p.color(255, 247, 172),
          dark: p.color(255, 239, 130)
        };
      }
      App.prototype = {
        scene: function() {
          p.background(254, 219, 91);
          p.noStroke();
          p.fill(this.colors.dark);
          p.rect(0, 0, 60, 28, 4);
          p.rect(-20, 40, 60, 28, 4);
          p.rect(250, 120, 80, 28, 4);
          p.rect(550, 60, 60, 28, 4);
          p.rect(40, 325, 65, 28, 4);
          p.fill(this.colors.medium);
          p.rect(250, 155, 65, 28, 4);
          p.fill(this.colors.light);
          p.rect(47, 36, 70, 28, 4);
          p.rect(207, 120, 35, 28, 4);
        },
        draw: function() {
          this.scene();
          this.cactus.go();
        },
        update: function() {
          this.timer = (this.timer + 1) % 210;
        },
        go: function() {
          this.draw();
          this.update();
        }
      };

      let app;
      p.setup = function() {
        p.size(600, 600);
        p.frameRate(60);
        p.smooth();
        app = new App();
      };
      p.draw = function() {
        app.go();
      };

      try {
        processingRef.current = new window.Processing(canvas, p);
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