import React, { useEffect, useRef } from 'react';
import './styles.css';

const GrantJenkinsTree2 = ({ isQuiet, volume, isPlaying = true }) => {
  const canvasRef = useRef(null);
  const processingInstanceRef = useRef(null);

  useEffect(() => {
    const loadProcessing = () => {
      return new Promise((resolve, reject) => {
        if (window.Processing) {
          resolve(window.Processing);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/processing.js/1.4.8/processing.min.js';
        script.onload = () => resolve(window.Processing);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initProcessing = async () => {
      try {
        const Processing = await loadProcessing();
        
        if (!canvasRef.current) return;

        const sketchProc = function(processingInstance) {
          // Bind Processing.js functions to avoid 'with' statement
          const p = processingInstance;
          const size = p.size.bind(p);
          const frameRate = p.frameRate.bind(p);
          const textFont = p.textFont.bind(p);
          const smooth = p.smooth.bind(p);
          const keyPressed = p.keyPressed.bind(p);
          const keyReleased = p.keyReleased.bind(p);
          const mouseClicked = p.mouseClicked.bind(p);
          const mouseOut = p.mouseOut.bind(p);
          const mouseMoved = p.mouseMoved.bind(p);
          const mouseX = p.mouseX;
          const mouseY = p.mouseY;
          const millis = p.millis.bind(p);
          const createFont = p.createFont.bind(p);
          const color = p.color.bind(p);
          const rect = p.rect.bind(p);
          const textAlign = p.textAlign.bind(p);
          const textSize = p.textSize.bind(p);
          const text = p.text.bind(p);
          const CENTER = p.CENTER;
          const noStroke = p.noStroke.bind(p);
          const fill = p.fill.bind(p);
          const pushStyle = p.pushStyle.bind(p);
          const popStyle = p.popStyle.bind(p);
          const background = p.background.bind(p);
          const noFill = p.noFill.bind(p);
          const stroke = p.stroke.bind(p);
          const strokeWeight = p.strokeWeight.bind(p);
          const beginShape = p.beginShape.bind(p);
          const vertex = p.vertex.bind(p);
          const bezierVertex = p.bezierVertex.bind(p);
          const endShape = p.endShape.bind(p);
          const CLOSE = p.COSE;
          const bezier = p.bezier.bind(p);
          const get = p.get.bind(p);
          const pushMatrix = p.pushMatrix.bind(p);
          const translate = p.translate.bind(p);
          const scale = p.scale.bind(p);
          const popMatrix = p.popMatrix.bind(p);
          const image = p.image.bind(p);
          const ellipse = p.ellipse.bind(p);
          const line = p.line.bind(p);
          const radians = p.radians.bind(p);
          const rotate = p.rotate.bind(p);
          const Math = window.Math;
            size(600, 600);
            frameRate(60);
            textFont(createFont("Trebuchet MS"));
            smooth();

            var scene;

            keyPressed = function () {
              scene.keys[keyCode] = true;
            };

            keyReleased = function () {
              scene.keys[keyCode] = false;
            };

            mouseClicked = function () {
              scene.clicked = true;
              scene.started = true;
            };

            mouseOut = function() {
              scene.over = false;
            };

            mouseMoved = function() {
              scene.over = true;
              scene.idle.time = millis();
              if(scene.idle.active) {
                scene.groot.action = scene.idle.action;
                scene.action.active = true;
                scene.action.timer = 240;
                scene.talkTimer = 50;
                scene.updateActionButtons();
                scene.idle.active = false;
              }
            };

            var Button = (function() {
              var Button = function(args) {
                this.x = args.x;
                this.y = args.y;
                this.w = args.w || 75;
                this.h = args.h || 35;
                this.content = args.content;
                this.textSize = args.textSize || this.w * 0.18;
                this.enabled = true;
                this.hover = false;
                this.selected = args.selected || false;
                this.func = args.func;
                this.backColor = args.backColor || color(240);
                this.textColor = color(25);
              };

              Button.prototype = {
                over: function() {
                  return (mouseX > this.x &&
                          mouseX < this.x + this.w &&
                          mouseY > this.y &&
                          mouseY < this.y + this.h);
                },

                draw: function() {
                  noStroke();
                  this.hover = this.over();
                  if(this.enabled && this.hover) {
                    scene.hover = true;
                  }
                  fill(this.backColor, this.selected ? 100 : this.enabled && this.hover ? 150 : 220);
                  rect(this.x, this.y, this.w, this.h);
                  pushStyle();
                  textAlign(CENTER, CENTER);
                  textSize(this.textSize);
                  fill(this.enabled ? this.textColor : color(this.textColor, 100));
                  text(this.content, this.x + this.w / 2, this.y + this.h / 2);
                  popStyle();
                  if(this.enabled && scene.clicked && this.hover) {
                    this.func();
                  }
                }
              };
              return Button;
            })();

            var Groot = (function() {
              Groot = function() {
                this.themes = {
                  summer: {
                    colors: {
                      outline: color(61, 38, 37),
                      dark: color(94, 132, 82),
                      medium: color(120, 159, 97),
                      light: color(151, 184, 126)
                    },
                    images: {
                      leafRight: undefined,
                      leafLeft: undefined
                    }
                  },
                  fall: {
                    colors: {
                      outline: color(61, 38, 37),
                      dark: color(211, 123, 43),
                      medium: color(217, 138, 70),
                      light: color(230, 181, 108)
                    },
                    images: {
                      leafRight: undefined,
                      leafLeft: undefined
                    }
                  },
                  winter: {
                    colors: {
                      outline: color(61, 38, 37),
                      dark: color(82, 122, 130),
                      medium: color(98, 153, 158),
                      light: color(127, 178, 184)
                    },
                    images: {
                      leafRight: undefined,
                      leafLeft: undefined
                    }
                  },
                  spring: {
                    colors: {
                      outline: color(61, 38, 37),
                      dark: color(94, 132, 82),
                      medium: color(120, 159, 97),
                      light: color(151, 184, 126)
                    },
                    images: {
                      leafRight: undefined,
                      leafLeft: undefined
                    }
                  }
                };

                this.theme = this.themes.summer;
                this.colors = {
                  outline: color(62, 39, 38),
                  dark: color(144, 110, 76),
                  medium: color(169, 135, 87),
                  light: color(192, 174, 135),
                };

                this.character = "none";
                this.coords = {
                  body: { offset: 0 },
                  face: { offset: 0, angle: 0 },
                  arms: {
                    left: { x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0, x4: 0, y4: 0 },
                    right: { x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0, x4: 0, y4: 0 }
                  },
                  mouth: {
                    x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0,
                    x4: 0, y4: 0, x5: 0, y5: 0, x6: 0, y6: 0
                  },
                  leaves: [
                    { scale: 1, scaleMax: 1 }, { scale: 1, scaleMax: 1 },
                    { scale: 1, scaleMax: 1 }, { scale: 1, scaleMax: 1 },
                    { scale: 1, scaleMax: 1 }, { scale: 1, scaleMax: 1 },
                    { scale: 0.85, scaleMax: 0.85 },
                    { scale: 0.9, scaleMax: 0.9 }, { scale: 0.9, scaleMax: 0.9 }
                  ],
                  flowers: [
                    { scale: 0, scaleMax: 0.5 }, { scale: 0, scaleMax: 0.5 },
                    { scale: 0, scaleMax: 0.5 }, { scale: 0, scaleMax: 0.5 }
                  ],
                  sticks: [
                    { scale: 0, scaleMax: 0.5 }, { scale: 0, scaleMax: 0.5 },
                    { scale: 0, scaleMax: 0.5 }, { scale: 0, scaleMax: 0.5 }
                  ],
                  snow: [
                    { x: 230, y: 175, diameter: 40, opacity: 0 },
                    { x: 280, y: 160, diameter: 30, opacity: 0 },
                    { x: 330, y: 150, diameter: 40, opacity: 0 },
                    { x: 370, y: 195, diameter: 25, opacity: 0 }
                  ]
                };

                this.action = "idle";
                this.idle = true;
                this.active = false;
                this.blink = { active: false, timer: 0, value: 0 };
                this.eyeClose = 0;
                this.vel = 4;
                this.images = {};
                this.setup();
              };

              Groot.prototype = {
                setup: function() {
                  // Summer/spring leaf image
                  pushStyle();
                  background(0, 0);
                  noStroke();
                  fill(this.themes.summer.colors.outline);
                  beginShape();
                  vertex(195, 211);
                  bezierVertex(224, 184, 215, 148, 192, 138);
                  bezierVertex(170, 152, 164, 184, 195, 211);
                  endShape(CLOSE);
                  
                  fill(this.themes.summer.colors.medium);
                  beginShape();
                  vertex(194, 204);
                  bezierVertex(216, 181, 210, 161, 193, 144);
                  bezierVertex(174, 162, 175, 182, 194, 204);
                  endShape(CLOSE);
                  
                  fill(this.themes.summer.colors.dark);
                  beginShape();
                  vertex(194, 204);
                  bezierVertex(216, 181, 210, 161, 193, 144);
                  bezierVertex(199, 168, 198, 184, 194, 199);
                  endShape(CLOSE);
                  
                  noFill();
                  stroke(this.themes.summer.colors.outline);
                  strokeWeight(1);
                  bezier(198, 174, 198, 181, 198, 189, 194, 204);
                  popStyle();
                  
                  this.images.leafRight = get(170, 135, 45, 78);
                  background(0, 0);
                  pushMatrix();
                  translate(45, 0);
                  scale(-1, 1);
                  image(this.images.leafRight, 0, 0);
                  popMatrix();
                  this.images.leafLeft = get(0, 0, 45, 78);

                  // Autumn leaf image
                  background(0, 0);
                  pushStyle();
                  noStroke();
                  fill(this.themes.fall.colors.outline);
                  beginShape();
                  vertex(195, 211);
                  bezierVertex(224, 184, 215, 148, 192, 138);
                  bezierVertex(170, 152, 164, 184, 195, 211);
                  endShape(CLOSE);
                  
                  fill(this.themes.fall.colors.medium);
                  beginShape();
                  vertex(194, 204);
                  bezierVertex(216, 181, 210, 161, 193, 144);
                  bezierVertex(174, 162, 175, 182, 194, 204);
                  endShape(CLOSE);
                  
                  fill(this.themes.fall.colors.dark);
                  beginShape();
                  vertex(194, 204);
                  bezierVertex(216, 181, 210, 161, 193, 144);
                  bezierVertex(199, 168, 198, 184, 194, 199);
                  endShape(CLOSE);
                  
                  noFill();
                  stroke(this.themes.fall.colors.outline);
                  strokeWeight(1);
                  bezier(198, 174, 198, 181, 198, 189, 194, 204);
                  popStyle();
                  
                  this.themes.fall.images.leafRight = get(170, 135, 45, 78);
                  background(0, 0);
                  pushMatrix();
                  translate(45, 0);
                  scale(-1, 1);
                  image(this.themes.fall.images.leafRight, 0, 0);
                  popMatrix();
                  this.themes.fall.images.leafLeft = get(0, 0, 45, 78);

                  // Winter leaf image
                  background(0, 0);
                  pushStyle();
                  noStroke();
                  fill(this.themes.winter.colors.outline);
                  beginShape();
                  vertex(195, 211);
                  bezierVertex(224, 184, 215, 148, 192, 138);
                  bezierVertex(170, 152, 164, 184, 195, 211);
                  endShape(CLOSE);
                  
                  fill(this.themes.winter.colors.medium);
                  beginShape();
                  vertex(194, 204);
                  bezierVertex(216, 181, 210, 161, 193, 144);
                  bezierVertex(174, 162, 175, 182, 194, 204);
                  endShape(CLOSE);
                  
                  fill(this.themes.winter.colors.dark);
                  beginShape();
                  vertex(194, 204);
                  bezierVertex(216, 181, 210, 161, 193, 144);
                  bezierVertex(199, 168, 198, 184, 194, 199);
                  endShape(CLOSE);
                  
                  noFill();
                  stroke(this.themes.winter.colors.outline);
                  strokeWeight(1);
                  bezier(198, 174, 198, 181, 198, 189, 194, 204);
                  popStyle();
                  
                  this.themes.winter.images.leafRight = get(170, 135, 45, 78);
                  background(0, 0);
                  pushMatrix();
                  translate(45, 0);
                  scale(-1, 1);
                  image(this.themes.winter.images.leafRight, 0, 0);
                  popMatrix();
                  this.themes.winter.images.leafLeft = get(0, 0, 45, 78);

                  // Spring leaf image
                  background(0, 0);
                  pushStyle();
                  noStroke();
                  fill(this.themes.spring.colors.outline);
                  beginShape();
                  vertex(195, 211);
                  bezierVertex(224, 184, 215, 148, 192, 138);
                  bezierVertex(170, 152, 164, 184, 195, 211);
                  endShape(CLOSE);
                  
                  fill(this.themes.spring.colors.medium);
                  beginShape();
                  vertex(194, 204);
                  bezierVertex(216, 181, 210, 161, 193, 144);
                  bezierVertex(174, 162, 175, 182, 194, 204);
                  endShape(CLOSE);
                  
                  fill(this.themes.spring.colors.dark);
                  beginShape();
                  vertex(194, 204);
                  bezierVertex(216, 181, 210, 161, 193, 144);
                  bezierVertex(199, 168, 198, 184, 194, 199);
                  endShape(CLOSE);
                  
                  noFill();
                  stroke(this.themes.spring.colors.outline);
                  strokeWeight(1);
                  bezier(198, 174, 198, 181, 198, 189, 194, 204);
                  popStyle();
                  
                  this.themes.spring.images.leafRight = get(170, 135, 45, 78);
                  background(0, 0);
                  pushMatrix();
                  translate(45, 0);
                  scale(-1, 1);
                  image(this.themes.spring.images.leafRight, 0, 0);
                  popMatrix();
                  this.themes.spring.images.leafLeft = get(0, 0, 45, 78);

                  // Blossom image
                  background(0, 0);
                  pushStyle();
                  noStroke();
                  fill(255, 255, 255);
                  ellipse(200, 200, 30, 30);
                  fill(255, 255, 0);
                  ellipse(200, 200, 15, 15);
                  popStyle();
                  this.images.blossom = get(185, 185, 30, 30);

                  // Stick image
                  background(0, 0);
                  pushStyle();
                  noStroke();
                  fill(139, 69, 19);
                  rect(195, 190, 10, 20);
                  popStyle();
                  this.images.stick = get(195, 190, 10, 20);
                },

                draw: function() {
                  pushStyle();
                  // Shadow under pot
                  noStroke();
                  fill(40, 60);
                  ellipse(287, 550, 200, 30);

                  pushMatrix();
                  translate(this.coords.body.offset / 2, 0);

                  // Draw pot
                  noStroke();
                  fill(139, 69, 19);
                  ellipse(287, 520, 80, 60);
                  fill(160, 82, 45);
                  ellipse(287, 520, 70, 50);

                  // Draw body
                  fill(this.colors.dark);
                  ellipse(287, 450, 60, 80);
                  fill(this.colors.medium);
                  ellipse(287, 450, 50, 70);

                  // Draw arms
                  this.drawArms();

                  // Draw head
                  fill(this.colors.dark);
                  ellipse(287, 380, 50, 60);
                  fill(this.colors.medium);
                  ellipse(287, 380, 40, 50);

                  // Draw face features
                  this.drawFace();

                  // Draw leaves
                  this.drawLeaves();

                  // Draw flowers and sticks
                  this.drawDecorations();

                  // Draw snow for winter
                  if (this.theme === this.themes.winter) {
                    this.drawSnow();
                  }

                  popMatrix();
                  popStyle();
                },

                drawArms: function() {
                  // Left arm
                  stroke(this.colors.outline);
                  strokeWeight(3);
                  line(this.coords.arms.left.x1, this.coords.arms.left.y1, 
                       this.coords.arms.left.x2, this.coords.arms.left.y2);
                  line(this.coords.arms.left.x2, this.coords.arms.left.y2, 
                       this.coords.arms.left.x3, this.coords.arms.left.y3);
                  line(this.coords.arms.left.x3, this.coords.arms.left.y3, 
                       this.coords.arms.left.x4, this.coords.arms.left.y4);

                  // Right arm
                  line(this.coords.arms.right.x1, this.coords.arms.right.y1, 
                       this.coords.arms.right.x2, this.coords.arms.right.y2);
                  line(this.coords.arms.right.x2, this.coords.arms.right.y2, 
                       this.coords.arms.right.x3, this.coords.arms.right.y3);
                  line(this.coords.arms.right.x3, this.coords.arms.right.y3, 
                       this.coords.arms.right.x4, this.coords.arms.right.y4);
                },

                drawFace: function() {
                  // Eyes
                  fill(255);
                  ellipse(275, 375, 8, 8);
                  ellipse(299, 375, 8, 8);
                  
                  fill(0);
                  ellipse(275, 375, 4, 4);
                  ellipse(299, 375, 4, 4);

                  // Mouth
                  noFill();
                  stroke(this.colors.outline);
                  strokeWeight(2);
                  beginShape();
                  vertex(this.coords.mouth.x1, this.coords.mouth.y1);
                  bezierVertex(this.coords.mouth.x2, this.coords.mouth.y2, 
                              this.coords.mouth.x3, this.coords.mouth.y3, 
                              this.coords.mouth.x4, this.coords.mouth.y4);
                  bezierVertex(this.coords.mouth.x5, this.coords.mouth.y5, 
                              this.coords.mouth.x6, this.coords.mouth.y6, 
                              this.coords.mouth.x1, this.coords.mouth.y1);
                  endShape();
                },

                drawLeaves: function() {
                  const leafPositions = [
                    { x: 257, y: 390, angle: -30 },
                    { x: 317, y: 390, angle: 30 },
                    { x: 267, y: 370, angle: -15 },
                    { x: 307, y: 370, angle: 15 },
                    { x: 277, y: 350, angle: -45 },
                    { x: 297, y: 350, angle: 45 },
                    { x: 287, y: 330, angle: 0 },
                    { x: 267, y: 310, angle: -60 },
                    { x: 307, y: 310, angle: 60 }
                  ];

                  leafPositions.forEach((pos, i) => {
                    if (this.coords.leaves[i]) {
                      pushMatrix();
                      translate(pos.x, pos.y);
                      rotate(radians(pos.angle));
                      scale(this.coords.leaves[i].scale);
                      
                      if (pos.angle < 0) {
                        image(this.theme.images.leafLeft, -22.5, -39);
                      } else {
                        image(this.theme.images.leafRight, -22.5, -39);
                      }
                      popMatrix();
                    }
                  });
                },

                drawDecorations: function() {
                  // Flowers
                  const flowerPositions = [
                    { x: 257, y: 390 }, { x: 317, y: 390 },
                    { x: 267, y: 370 }, { x: 307, y: 370 }
                  ];

                  flowerPositions.forEach((pos, i) => {
                    if (this.coords.flowers[i] && this.coords.flowers[i].scale > 0) {
                      pushMatrix();
                      translate(pos.x, pos.y);
                      scale(this.coords.flowers[i].scale);
                      image(this.images.blossom, -15, -15);
                      popMatrix();
                    }
                  });

                  // Sticks
                  const stickPositions = [
                    { x: 277, y: 350 }, { x: 297, y: 350 },
                    { x: 267, y: 310 }, { x: 307, y: 310 }
                  ];

                  stickPositions.forEach((pos, i) => {
                    if (this.coords.sticks[i] && this.coords.sticks[i].scale > 0) {
                      pushMatrix();
                      translate(pos.x, pos.y);
                      scale(this.coords.sticks[i].scale);
                      image(this.images.stick, -5, -10);
                      popMatrix();
                    }
                  });
                },

                drawSnow: function() {
                  this.coords.snow.forEach(snowflake => {
                    if (snowflake.opacity > 0) {
                      pushStyle();
                      noStroke();
                      fill(255, snowflake.opacity);
                      ellipse(snowflake.x, snowflake.y, snowflake.diameter, snowflake.diameter);
                      popStyle();
                    }
                  });
                },

                go: function() {
                  this.draw();
                }
              };
              return Groot;
            })();

            var Scene = (function() {
              Scene = function() {
                this.clicked = false;
                this.hover = false;
                this.over = false;
                this.keys = [];
                this.started = false;
                this.timer = 0;
                this.talkTimer = 0;
                
                this.action = { active: false, timer: 0 };
                this.idle = { active: true, time: 0, action: "idle" };
                
                this.themeButtons = [];
                this.actionButtons = [];
                this.characterButtons = [];
                
                this.groot = new Groot();
                this.init();
              };

              Scene.prototype = {
                init: function() {
                  this.setupThemeButtons();
                  this.setupActionButtons();
                  this.setupCharacterButtons();
                },

                setupThemeButtons: function() {
                  this.themeButtons = [
                    new Button({
                      x: 50, y: 50, w: 80, h: 30,
                      content: "Summer",
                      func: () => { this.groot.theme = this.groot.themes.summer; }
                    }),
                    new Button({
                      x: 140, y: 50, w: 80, h: 30,
                      content: "Fall",
                      func: () => { this.groot.theme = this.groot.themes.fall; }
                    }),
                    new Button({
                      x: 230, y: 50, w: 80, h: 30,
                      content: "Winter",
                      func: () => { this.groot.theme = this.groot.themes.winter; }
                    }),
                    new Button({
                      x: 320, y: 50, w: 80, h: 30,
                      content: "Spring",
                      func: () => { this.groot.theme = this.groot.themes.spring; }
                    })
                  ];
                },

                setupActionButtons: function() {
                  this.actionButtons = [
                    new Button({
                      x: 50, y: 100, w: 80, h: 30,
                      content: "Dance",
                      func: () => { this.triggerAction("dance"); }
                    }),
                    new Button({
                      x: 140, y: 100, w: 80, h: 30,
                      content: "Sleep",
                      func: () => { this.triggerAction("sleep"); }
                    }),
                    new Button({
                      x: 230, y: 100, w: 80, h: 30,
                      content: "Wave",
                      func: () => { this.triggerAction("wave"); }
                    }),
                    new Button({
                      x: 320, y: 100, w: 80, h: 30,
                      content: "Eat",
                      func: () => { this.triggerAction("eat"); }
                    }),
                    new Button({
                      x: 50, y: 140, w: 80, h: 30,
                      content: "Drink",
                      func: () => { this.triggerAction("drink"); }
                    }),
                    new Button({
                      x: 140, y: 140, w: 80, h: 30,
                      content: "Talk",
                      func: () => { this.triggerAction("talk"); }
                    }),
                    new Button({
                      x: 230, y: 140, w: 80, h: 30,
                      content: "Juggle",
                      func: () => { this.triggerAction("juggle"); }
                    }),
                    new Button({
                      x: 320, y: 140, w: 80, h: 30,
                      content: "Idle",
                      func: () => { this.triggerAction("idle"); }
                    })
                  ];
                },

                setupCharacterButtons: function() {
                  this.characterButtons = [
                    new Button({
                      x: 50, y: 180, w: 80, h: 30,
                      content: "None",
                      func: () => { this.groot.character = "none"; }
                    }),
                    new Button({
                      x: 140, y: 180, w: 80, h: 30,
                      content: "Pirate",
                      func: () => { this.groot.character = "pirate"; }
                    }),
                    new Button({
                      x: 230, y: 180, w: 80, h: 30,
                      content: "Ninja",
                      func: () => { this.groot.character = "ninja"; }
                    }),
                    new Button({
                      x: 320, y: 180, w: 80, h: 30,
                      content: "Potter",
                      func: () => { this.groot.character = "potter"; }
                    })
                  ];
                },

                triggerAction: function(action) {
                  this.groot.action = action;
                  this.action.active = true;
                  this.action.timer = 240;
                  this.updateActionButtons();
                },

                updateActionButtons: function() {
                  this.actionButtons.forEach(button => {
                    button.selected = button.content.toLowerCase() === this.groot.action;
                  });
                },

                update: function() {
                  this.clicked = false;
                  this.hover = false;
                  
                  // Update action timer
                  if (this.action.active) {
                    this.action.timer--;
                    if (this.action.timer <= 0) {
                      this.action.active = false;
                      this.groot.action = "idle";
                      this.updateActionButtons();
                    }
                  }

                  // Update idle system
                  if (millis() - this.idle.time > 5000 && !this.action.active) {
                    this.idle.active = true;
                    const actions = ["dance", "sleep", "wave", "eat", "drink", "talk"];
                    this.idle.action = actions[Math.floor(Math.random() * actions.length)];
                  }

                  // Update Groot coordinates based on action
                  this.updateGrootCoords();
                },

                updateGrootCoords: function() {
                  const action = this.groot.action;
                  const time = millis() * 0.01;

                  // Body sway
                  this.groot.coords.body.offset = Math.sin(time) * 2;

                  // Face movement
                  this.groot.coords.face.offset = Math.sin(time * 0.5) * 1;
                  this.groot.coords.face.angle = Math.sin(time * 0.3) * 5;

                  // Arm movements based on action
                  switch (action) {
                    case "dance":
                      this.groot.coords.arms.left.x1 = 257 + Math.sin(time * 2) * 10;
                      this.groot.coords.arms.left.y1 = 420 + Math.cos(time * 2) * 5;
                      this.groot.coords.arms.left.x2 = 247 + Math.sin(time * 2 + 1) * 15;
                      this.groot.coords.arms.left.y2 = 400 + Math.cos(time * 2 + 1) * 10;
                      this.groot.coords.arms.left.x3 = 237 + Math.sin(time * 2 + 2) * 20;
                      this.groot.coords.arms.left.y3 = 380 + Math.cos(time * 2 + 2) * 15;
                      this.groot.coords.arms.left.x4 = 227 + Math.sin(time * 2 + 3) * 25;
                      this.groot.coords.arms.left.y4 = 360 + Math.cos(time * 2 + 3) * 20;

                      this.groot.coords.arms.right.x1 = 317 + Math.sin(time * 2 + Math.PI) * 10;
                      this.groot.coords.arms.right.y1 = 420 + Math.cos(time * 2 + Math.PI) * 5;
                      this.groot.coords.arms.right.x2 = 327 + Math.sin(time * 2 + Math.PI + 1) * 15;
                      this.groot.coords.arms.right.y2 = 400 + Math.cos(time * 2 + Math.PI + 1) * 10;
                      this.groot.coords.arms.right.x3 = 337 + Math.sin(time * 2 + Math.PI + 2) * 20;
                      this.groot.coords.arms.right.y3 = 380 + Math.cos(time * 2 + Math.PI + 2) * 15;
                      this.groot.coords.arms.right.x4 = 347 + Math.sin(time * 2 + Math.PI + 3) * 25;
                      this.groot.coords.arms.right.y4 = 360 + Math.cos(time * 2 + Math.PI + 3) * 20;
                      break;

                    case "wave":
                      this.groot.coords.arms.left.x1 = 257; this.groot.coords.arms.left.y1 = 420;
                      this.groot.coords.arms.left.x2 = 247; this.groot.coords.arms.left.y2 = 400;
                      this.groot.coords.arms.left.x3 = 237; this.groot.coords.arms.left.y3 = 380;
                      this.groot.coords.arms.left.x4 = 227; this.groot.coords.arms.left.y4 = 360;

                      this.groot.coords.arms.right.x1 = 317; this.groot.coords.arms.right.y1 = 420;
                      this.groot.coords.arms.right.x2 = 327; this.groot.coords.arms.right.y2 = 400;
                      this.groot.coords.arms.right.x3 = 337; this.groot.coords.arms.right.y3 = 380;
                      this.groot.coords.arms.right.x4 = 347 + Math.sin(time * 3) * 20;
                      this.groot.coords.arms.right.y4 = 360 + Math.cos(time * 3) * 10;
                      break;

                    case "sleep":
                      this.groot.coords.arms.left.x1 = 257; this.groot.coords.arms.left.y1 = 420;
                      this.groot.coords.arms.left.x2 = 247; this.groot.coords.arms.left.y2 = 400;
                      this.groot.coords.arms.left.x3 = 237; this.groot.coords.arms.left.y3 = 380;
                      this.groot.coords.arms.left.x4 = 227; this.groot.coords.arms.left.y4 = 360;

                      this.groot.coords.arms.right.x1 = 317; this.groot.coords.arms.right.y1 = 420;
                      this.groot.coords.arms.right.x2 = 307; this.groot.coords.arms.right.y2 = 400;
                      this.groot.coords.arms.right.x3 = 297; this.groot.coords.arms.right.y3 = 380;
                      this.groot.coords.arms.right.x4 = 287; this.groot.coords.arms.right.y4 = 360;
                      break;

                    default:
                      // Idle position
                      this.groot.coords.arms.left.x1 = 257; this.groot.coords.arms.left.y1 = 420;
                      this.groot.coords.arms.left.x2 = 247; this.groot.coords.arms.left.y2 = 400;
                      this.groot.coords.arms.left.x3 = 237; this.groot.coords.arms.left.y3 = 380;
                      this.groot.coords.arms.left.x4 = 227; this.groot.coords.arms.left.y4 = 360;

                      this.groot.coords.arms.right.x1 = 317; this.groot.coords.arms.right.y1 = 420;
                      this.groot.coords.arms.right.x2 = 307; this.groot.coords.arms.right.y2 = 400;
                      this.groot.coords.arms.right.x3 = 297; this.groot.coords.arms.right.y3 = 380;
                      this.groot.coords.arms.right.x4 = 287; this.groot.coords.arms.right.y4 = 360;
                      break;
                  }

                  // Mouth animation
                  if (action === "talk" || action === "eat") {
                    const mouthOpen = Math.sin(time * 5) * 0.5 + 0.5;
                    this.groot.coords.mouth.x1 = 287; this.groot.coords.mouth.y1 = 390;
                    this.groot.coords.mouth.x2 = 287 + mouthOpen * 5; this.groot.coords.mouth.y2 = 395;
                    this.groot.coords.mouth.x3 = 287 + mouthOpen * 8; this.groot.coords.mouth.y3 = 400;
                    this.groot.coords.mouth.x4 = 287; this.groot.coords.mouth.y4 = 405;
                    this.groot.coords.mouth.x5 = 287 - mouthOpen * 8; this.groot.coords.mouth.y5 = 400;
                    this.groot.coords.mouth.x6 = 287 - mouthOpen * 5; this.groot.coords.mouth.y6 = 395;
                  } else {
                    this.groot.coords.mouth.x1 = 287; this.groot.coords.mouth.y1 = 390;
                    this.groot.coords.mouth.x2 = 287; this.groot.coords.mouth.y2 = 395;
                    this.groot.coords.mouth.x3 = 287; this.groot.coords.mouth.y3 = 400;
                    this.groot.coords.mouth.x4 = 287; this.groot.coords.mouth.y4 = 405;
                    this.groot.coords.mouth.x5 = 287; this.groot.coords.mouth.y5 = 400;
                    this.groot.coords.mouth.x6 = 287; this.groot.coords.mouth.y6 = 395;
                  }

                  // Leaf animations
                  this.groot.coords.leaves.forEach((leaf, i) => {
                    leaf.scale = leaf.scaleMax * (0.8 + Math.sin(time + i) * 0.2);
                  });

                  // Flower and stick animations for spring
                  if (this.groot.theme === this.groot.themes.spring) {
                    this.groot.coords.flowers.forEach((flower, i) => {
                      flower.scale = flower.scaleMax * (0.5 + Math.sin(time * 0.5 + i) * 0.5);
                    });
                  } else {
                    this.groot.coords.flowers.forEach(flower => {
                      flower.scale = 0;
                    });
                  }

                  // Stick animations for fall
                  if (this.groot.theme === this.groot.themes.fall) {
                    this.groot.coords.sticks.forEach((stick, i) => {
                      stick.scale = stick.scaleMax * (0.5 + Math.sin(time * 0.3 + i) * 0.5);
                    });
                  } else {
                    this.groot.coords.sticks.forEach(stick => {
                      stick.scale = 0;
                    });
                  }

                  // Snow animations for winter
                  if (this.groot.theme === this.groot.themes.winter) {
                    this.groot.coords.snow.forEach((snowflake, i) => {
                      snowflake.opacity = 100 + Math.sin(time * 0.2 + i) * 50;
                      snowflake.y += 0.5;
                      if (snowflake.y > 600) snowflake.y = 150;
                    });
                  } else {
                    this.groot.coords.snow.forEach(snowflake => {
                      snowflake.opacity = 0;
                    });
                  }
                },

                draw: function() {
                  background(34, 34, 34);
                  
                  // Draw Groot
                  this.groot.go();
                  
                  // Draw UI buttons
                  this.themeButtons.forEach(button => button.draw());
                  this.actionButtons.forEach(button => button.draw());
                  this.characterButtons.forEach(button => button.draw());
                },

                go: function() {
                  this.draw();
                  this.update();
                }
              };
              return Scene;
            })();

            scene = new Scene();
            
            p.draw = function() {
              scene.go();
            };
          };

        processingInstanceRef.current = new Processing(canvasRef.current, sketchProc);
      } catch (error) {
        console.error('Error initializing Processing.js:', error);
      }
    };

    if (isPlaying) {
      initProcessing();
    }

    return () => {
      if (processingInstanceRef.current) {
        processingInstanceRef.current.exit();
        processingInstanceRef.current = null;
      }
    };
  }, [isPlaying]);

  return (
    <div className="grant-jenkins-tree-2">
      <canvas ref={canvasRef} id="canvas" width="600" height="600" />
    </div>
  );
};

export default GrantJenkinsTree2; 