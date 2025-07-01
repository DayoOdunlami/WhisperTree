import React, { useEffect, useRef } from 'react';
import './styles.css';

const MonkeyBusiness = ({ isQuiet, volume, isPlaying }) => {
  const canvasRef = useRef(null);
  const processingRef = useRef(null);

  useEffect(() => {
    // Load Processing.js dynamically
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
      
      // Set canvas size explicitly
      canvas.width = 600;
      canvas.height = 600;
      
      const sketchProc = function(processingInstance) {
        const p = processingInstance;
        
        // Make Processing.js functions available globally within the sketch
        const size = p.size.bind(p);
        const frameRate = p.frameRate.bind(p);
        const smooth = p.smooth.bind(p);
        const color = p.color.bind(p);
        const noFill = p.noFill.bind(p);
        const noStroke = p.noStroke.bind(p);
        const fill = p.fill.bind(p);
        const stroke = p.stroke.bind(p);
        const strokeWeight = p.strokeWeight.bind(p);
        const bezier = p.bezier.bind(p);
        const line = p.line.bind(p);
        const rect = p.rect.bind(p);
        const quad = p.quad.bind(p);
        const ellipse = p.ellipse.bind(p);
        const arc = p.arc.bind(p);
        const pushMatrix = p.pushMatrix.bind(p);
        const popMatrix = p.popMatrix.bind(p);
        const translate = p.translate.bind(p);
        const rotate = p.rotate.bind(p);
        const radians = p.radians.bind(p);
        const sin = p.sin.bind(p);
        const cos = p.cos.bind(p);
        const constrain = p.constrain.bind(p);
        const lerp = p.lerp.bind(p);
        const random = p.random.bind(p);
        const background = p.background.bind(p);
        const textFont = p.textFont.bind(p);
        const textAlign = p.textAlign.bind(p);
        const text = p.text.bind(p);
        const pushStyle = p.pushStyle.bind(p);
        const popStyle = p.popStyle.bind(p);
        const CENTER = p.CENTER;

        size(600, 600);
        frameRate(60);
        smooth();

        Object.constructor.prototype.new = function() {
          var obj = Object.create(this.prototype);
          this.apply(obj, arguments);
          return obj;
        };

        // Cactus class
        var Cactus = (function() {
          Cactus = function(args) {
            this.x = args.x || 100;
            this.y = args.y || 0;
            this.colors = args.colors || {
              pot: color(123, 206, 246),
              cactus: color(100, 189, 107),
              shadow: color(40, 40, 40, 20)
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
          };

          Cactus.prototype = {
            draw: function() {
              pushMatrix();
              translate(this.x, this.y);
              
              // cactus
              noFill();
              stroke(this.colors.cactus);
              strokeWeight(21);
              bezier(this.anim.cactus.x1 + this.anim.cactus.xoff, this.anim.cactus.y1,
                     this.anim.cactus.x2 + this.anim.cactus.xoff * 0.75, this.anim.cactus.y2,
                     this.anim.cactus.x3 + this.anim.cactus.xoff * 0.5, this.anim.cactus.y3,
                     this.anim.cactus.x4, this.anim.cactus.y4);
              
              // branches
              strokeWeight(10);
              // left branch
              bezier(541 + this.anim.cactus.xoff, 470,
                     529 + this.anim.cactus.xoff, 470,
                     520 + this.anim.cactus.xoff, 475,
                     520 + this.anim.cactus.xoff, 459);
              // right branch
              bezier(540 + this.anim.cactus.xoff, 481,
                     552 + this.anim.cactus.xoff, 482,
                     561 + this.anim.cactus.xoff, 484,
                     561 + this.anim.cactus.xoff, 473);
              
              // feet
              strokeWeight(8);
              line(533, 536, 533, 550 + this.anim.feet.y1);
              line(546, 536, 546, 550 + this.anim.feet.y2);
              strokeWeight(1);
              
              // pot
              noStroke();
              fill(this.colors.pot);
              quad(517, 500, 562, 500, 554, 545, 525, 545);
              fill(this.colors.shadow);
              quad(540, 500, 562, 500, 554, 545, 540, 545);
              
              popMatrix();
            },

            update: function() {
              this.timer = (this.timer + 1) % 210;
              switch(this.state) {
                case 0: // walk in
                  this.x = constrain(this.x - 2, 0, this.x);
                  if(this.x > 0) {
                    var s = sin(radians(this.timer * this.anim.feet.speed)) * 5;
                    this.anim.feet.y1 = constrain(s, -5, 0);
                    this.anim.feet.y2 = constrain(-s, -5, 0);
                  } else {
                    this.anim.feet.y1 = ~~lerp(this.anim.feet.y1, 0, 0.10);
                    this.anim.feet.y2 = ~~lerp(this.anim.feet.y2, 0, 0.10);
                    this.anim.cactus.xoff = lerp(this.anim.cactus.xoff, 0, 0.15);
                  }
                  if(this.timer >= 90) this.state++;
                  break;
                case 1: // sit
                  this.y = constrain(this.y + 2.0, this.y, 10);
                  this.anim.feet.y1 = constrain(this.anim.feet.y1 - 2, -10, this.anim.feet.y1);
                  this.anim.feet.y2 = constrain(this.anim.feet.y2 - 2, -10, this.anim.feet.y2);
                  if(this.timer >= 150) this.state++;
                  break;
                case 2: // slide out
                  this.x = constrain(this.x + 4, 0, 100);
                  this.anim.cactus.xoff = lerp(this.anim.cactus.xoff, -10, 0.20);
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
          return Cactus;
        })();

        // App class
        var App = (function() {
          App = function() {
            this.timer = 0;
            this.cactus = Cactus.new({});
            this.colors = {
              light: color(255, 247, 225),
              medium: color(255, 247, 172),
              dark: color(255, 239, 130)
            };
          };

          App.prototype = {
            scene: function() {
              background(254, 219, 91);
              noStroke();
              fill(this.colors.dark);
              rect(0, 0, 60, 28, 4);
              rect(-20, 40, 60, 28, 4);
              rect(250, 120, 80, 28, 4);
              rect(550, 60, 60, 28, 4);
              rect(40, 325, 65, 28, 4);
              fill(this.colors.medium);
              rect(250, 155, 65, 28, 4);
              fill(this.colors.light);
              rect(47, 36, 70, 28, 4);
              rect(207, 120, 35, 28, 4);
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
          return App;
        })();

        var app = new App();
        
        p.draw = function() {
          app.go();
        };

        // Add a simple test animation to verify canvas is working
        p.setup = function() {
          console.log('Processing.js setup complete');
        };
      };

      try {
        processingRef.current = new Processing(canvas, sketchProc);
        console.log('Processing.js initialized successfully');
        console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
      } catch (error) {
        console.error('Error initializing Processing.js:', error);
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

  // Audio reactivity (optional enhancement)
  useEffect(() => {
    if (!processingRef.current) return;
    
    // You can add audio reactivity here if needed
    // For now, the animation runs independently as per original
  }, [isQuiet, volume, isPlaying]);

  return (
    <div className="monkey-business-container">
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