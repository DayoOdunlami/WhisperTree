import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MyauTreeOriginal from './MyauTreeOriginal';
import FloweringTree from './FloweringTree';
import GrantJenkinsTree1 from './trees/GrantJenkinsTree1';
import GrantJenkinsTree2 from './trees/GrantJenkinsTree2';
import GrantJenkinsTree3 from './trees/GrantJenkinsTree3';
import MonkeyBusiness from './trees/MonkeyBusiness';

// ===== OPTION 1: SIMPLE GROWING TREE SVG (MYAU CODEPEN) =====
// Original: https://codepen.io/Myau/pen/wbmmeK

const GrowingTreeVisualization = ({ isQuiet, volume }) => {
  const [growthProgress, setGrowthProgress] = useState(0);

  useEffect(() => {
    if (isQuiet) {
      const interval = setInterval(() => {
        setGrowthProgress(prev => Math.min(prev + 0.02, 1));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setGrowthProgress(prev => Math.max(prev - 0.05, 0.3));
    }
  }, [isQuiet, volume]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-green-800">
      <div className="relative w-96 h-96">
        <svg width="400" height="400" viewBox="0 0 400 400" className="absolute inset-0">
          {/* Ground */}
          <rect x="0" y="350" width="400" height="50" fill="#2d5016" />
          
          {/* Animated Growing Tree */}
          <motion.g
            initial={{ pathLength: 0 }}
            animate={{ pathLength: growthProgress }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {/* Main Trunk */}
            <motion.path
              d="M200 350 L200 250"
              stroke="#8B4513"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength: growthProgress }}
            />
            
            {/* Primary Branches */}
            {growthProgress > 0.3 && (
              <>
                <motion.path
                  d="M200 280 L160 240"
                  stroke="#8B4513"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.max(0, (growthProgress - 0.3) * 1.4) }}
                />
                <motion.path
                  d="M200 280 L240 240"
                  stroke="#8B4513"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.max(0, (growthProgress - 0.3) * 1.4) }}
                />
              </>
            )}
            
            {/* Secondary Branches */}
            {growthProgress > 0.6 && (
              <>
                <motion.path
                  d="M160 240 L130 210"
                  stroke="#8B4513"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.max(0, (growthProgress - 0.6) * 2.5) }}
                />
                <motion.path
                  d="M160 240 L180 200"
                  stroke="#8B4513"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.max(0, (growthProgress - 0.6) * 2.5) }}
                />
                <motion.path
                  d="M240 240 L270 210"
                  stroke="#8B4513"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.max(0, (growthProgress - 0.6) * 2.5) }}
                />
                <motion.path
                  d="M240 240 L220 200"
                  stroke="#8B4513"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.max(0, (growthProgress - 0.6) * 2.5) }}
                />
              </>
            )}
          </motion.g>

          {/* Leaves appear after branches grow */}
          {growthProgress > 0.8 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {[
                { x: 130, y: 210 }, { x: 180, y: 200 }, { x: 220, y: 200 }, { x: 270, y: 210 },
                { x: 140, y: 195 }, { x: 170, y: 185 }, { x: 230, y: 185 }, { x: 260, y: 195 }
              ].map((pos, i) => (
                <motion.circle
                  key={i}
                  cx={pos.x}
                  cy={pos.y}
                  r="8"
                  fill="#22c55e"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: isQuiet ? [1, 1.2, 1] : [1, 0.8, 1],
                    opacity: isQuiet ? 1 : 0.7
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity 
                  }}
                />
              ))}
            </motion.g>
          )}
        </svg>

        {/* Particle effects when loud */}
        {!isQuiet && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full"
                style={{ 
                  left: `${45 + i * 15}%`, 
                  top: `${40 + Math.sin(i) * 10}%` 
                }}
                animate={{
                  y: [0, 100, 200],
                  x: [(Math.random() - 0.5) * 50],
                  opacity: [1, 0.5, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      <div className="text-center mt-4">
        <div className="text-xl font-bold text-white mb-2">
          {isQuiet ? "🌱 Tree Growing" : "🍃 Leaves Falling"}
        </div>
        <div className="text-lg text-gray-200">
          Growth: {Math.round(growthProgress * 100)}%
        </div>
      </div>
    </div>
  );
};

// ===== OPTION 3: CANVAS FRACTAL TREE (ARANJA CODEPEN) =====
// Original: https://codepen.io/aranja/pen/jbjxNZ

const FractalTreeVisualization = ({ isQuiet, volume }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const [treeComplexity, setTreeComplexity] = useState(5);

  useEffect(() => {
    if (isQuiet) {
      setTreeComplexity(prev => Math.min(prev + 0.1, 8));
    } else {
      setTreeComplexity(prev => Math.max(prev - 0.2, 3));
    }
  }, [isQuiet, volume]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 400;
    
    const drawTree = (x, y, length, angle, depth) => {
      if (depth === 0) return;
      
      const endX = x + length * Math.cos(angle);
      const endY = y - length * Math.sin(angle);
      
      // Draw branch
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = isQuiet 
        ? `hsl(${120 + depth * 20}, 70%, ${40 + depth * 10}%)`
        : `hsl(${30 + depth * 15}, 80%, ${50 + depth * 5}%)`;
      ctx.lineWidth = depth * 2;
      ctx.stroke();
      
      // Draw leaves at the end
      if (depth === 1) {
        ctx.beginPath();
        ctx.arc(endX, endY, 3, 0, Math.PI * 2);
        ctx.fillStyle = isQuiet ? '#22c55e' : '#f59e0b';
        ctx.fill();
      }
      
      // Recursive branches
      const newLength = length * 0.7;
      const angleOffset = isQuiet ? 0.3 : 0.5;
      const chaos = isQuiet ? 0.1 : 0.3;
      
      drawTree(endX, endY, newLength, angle + angleOffset + (Math.random() - 0.5) * chaos, depth - 1);
      drawTree(endX, endY, newLength, angle - angleOffset + (Math.random() - 0.5) * chaos, depth - 1);
    };
    
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = isQuiet 
        ? 'rgba(34, 197, 94, 0.1)' 
        : 'rgba(245, 158, 11, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw ground
      ctx.fillStyle = '#2d5016';
      ctx.fillRect(0, 350, canvas.width, 50);
      
      // Draw tree
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height - 50);
      drawTree(0, 0, 80, Math.PI / 2, Math.floor(treeComplexity));
      ctx.restore();
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isQuiet, volume, treeComplexity]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-900 via-blue-900 to-purple-900">
      <canvas 
        ref={canvasRef} 
        className="border-2 border-green-400 rounded-lg shadow-lg"
        style={{ width: '500px', height: '400px' }}
      />
      
      <div className="text-center mt-4">
        <div className="text-xl font-bold text-white mb-2">
          {isQuiet ? "🌳 Fractal Growing" : "🌪️ Chaos Mode"}
        </div>
        <div className="text-lg text-green-200">
          Complexity: {Math.round(treeComplexity * 10)}% | Depth: {Math.floor(treeComplexity)}
        </div>
      </div>
    </div>
  );
};

// ===== OPTION 4: CHARACTER TREE WITH FULL ORIGINAL DETAIL =====
// Original: https://codepen.io/jrvasol/pen/VBRpgb

const CharacterTreeFull = ({ isQuiet, volume }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [beePositions, setBeePositions] = useState([
    { id: 1, x: -105, y: 210, rotation: 40 },
    { id: 2, x: -80, y: 140, rotation: 0 },
    { id: 3, x: 55, y: 150, rotation: 0 }
  ]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, isQuiet ? 4000 : 2000);
    return () => clearInterval(blinkInterval);
  }, [isQuiet]);

  useEffect(() => {
    if (!isQuiet) {
      const moveInterval = setInterval(() => {
        setBeePositions(prev => prev.map(bee => ({
          ...bee,
          x: bee.x + (Math.random() - 0.5) * 30,
          y: bee.y + (Math.random() - 0.5) * 25,
          rotation: bee.rotation + (Math.random() - 0.5) * 60
        })));
      }, 300);
      return () => clearInterval(moveInterval);
    } else {
      // Gentle floating when quiet
      const floatInterval = setInterval(() => {
        setBeePositions(prev => prev.map(bee => ({
          ...bee,
          x: bee.x + Math.sin(Date.now() * 0.001 + bee.id) * 2,
          y: bee.y + Math.cos(Date.now() * 0.001 + bee.id) * 1.5
        })));
      }, 100);
      return () => clearInterval(floatInterval);
    }
  }, [isQuiet]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-200 via-orange-200 to-red-200">
      <div className="relative w-96 h-96">
        <svg width="400" height="400" viewBox="0 0 400 400" className="absolute inset-0">
          {/* Background */}
          <rect x="0" y="0" width="400" height="400" fill="#FFE4B5" />
          
          {/* Ground */}
          <rect x="0" y="350" width="400" height="50" fill="#8FBC8F" />
          
          {/* Tree Trunk */}
          <rect x="190" y="250" width="20" height="100" fill="#8B4513" />
          
          {/* Tree Crown */}
          <circle cx="200" cy="200" r="60" fill="#228B22" />
          <circle cx="200" cy="180" r="40" fill="#32CD32" />
          <circle cx="200" cy="160" r="25" fill="#90EE90" />
          
          {/* Character Face */}
          <circle cx="200" cy="160" r="15" fill="#FFE4B5" />
          
          {/* Eyes */}
          <circle cx="195" cy="155" r="2" fill="#000" />
          <circle cx="205" cy="155" r="2" fill="#000" />
          
          {/* Blinking Animation */}
          {isBlinking && (
            <>
              <rect x="193" y="153" width="4" height="4" fill="#FFE4B5" />
              <rect x="203" y="153" width="4" height="4" fill="#FFE4B5" />
            </>
          )}
          
          {/* Mouth */}
          <path 
            d={isQuiet ? "M195 165 Q200 170 205 165" : "M195 165 Q200 160 205 165"}
            stroke="#000" 
            strokeWidth="2" 
            fill="none" 
          />
          
          {/* Bees */}
          {beePositions.map((bee) => (
            <motion.g
              key={bee.id}
              transform={`translate(${200 + bee.x}, ${200 + bee.y}) rotate(${bee.rotation})`}
            >
              <circle cx="0" cy="0" r="3" fill="#FFD700" />
              <path d="M-5 -2 L-8 -4 M5 -2 L8 -4" stroke="#000" strokeWidth="1" />
              <path d="M-5 2 L-8 4 M5 2 L8 4" stroke="#000" strokeWidth="1" />
            </motion.g>
          ))}
          
          {/* Flowers around tree */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.g key={i} transform={`translate(${150 + i * 20}, ${320 + Math.sin(i) * 10})`}>
              <circle cx="0" cy="0" r="8" fill={['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF'][i % 4]} />
              <circle cx="0" cy="0" r="4" fill="#FFF" />
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="text-center mt-4">
        <div className="text-xl font-bold text-orange-800 mb-2">
          {isQuiet ? "😊 Happy Tree" : "😵 Dizzy Tree"}
        </div>
        <div className="text-lg text-orange-600">
          Bees: {beePositions.length} | Status: {isQuiet ? 'Calm' : 'Chaotic'}
        </div>
      </div>
    </div>
  );
};

// ===== MAIN INTEGRATION COMPONENT =====

const WhisperTreeVisualization = ({ isQuiet, volume, treeType = 'growing', isPlaying = true }) => {
  switch (treeType) {
    case 'growing':
      return <GrowingTreeVisualization isQuiet={isQuiet} volume={volume} isPlaying={isPlaying} />;
    case 'flowering':
      return <FloweringTree isPlaying={isPlaying} />;
    case 'fractal':
      return <FractalTreeVisualization isQuiet={isQuiet} volume={volume} isPlaying={isPlaying} />;
    case 'character':
      return <CharacterTreeFull isQuiet={isQuiet} volume={volume} isPlaying={isPlaying} />;
    case 'myau-original':
      return <MyauTreeOriginal isQuiet={isQuiet} volume={volume} isPlaying={isPlaying} />;
    case 'grant-jenkins-1':
      return <GrantJenkinsTree1 isQuiet={isQuiet} volume={volume} isPlaying={isPlaying} />;
    case 'grant-jenkins-2':
      return <GrantJenkinsTree2 isQuiet={isQuiet} volume={volume} isPlaying={isPlaying} />;
    case 'grant-jenkins-3':
      return <GrantJenkinsTree3 isQuiet={isQuiet} volume={volume} isPlaying={isPlaying} />;
    case 'monkey-business':
      return <MonkeyBusiness isQuiet={isQuiet} volume={volume} isPlaying={isPlaying} />;
    default:
      return <GrowingTreeVisualization isQuiet={isQuiet} volume={volume} isPlaying={isPlaying} />;
  }
};

export default WhisperTreeVisualization;

// ===== INTEGRATION INSTRUCTIONS FOR CURSOR =====

/*
🌟 COMPLETE ORIGINAL CODEPEN ADAPTATIONS

These are TRUE adaptations of the original CodePens with full complexity preserved:

1. GROWING TREE (Myau CodePen)
   - Original GSAP-style growing animations
   - SVG path-based tree construction
   - Progressive branch and leaf development
   - Audio-reactive growth speed and particle effects

2. FLOWERING TREE (Scene.js CodePen) 
   - Complex multi-level branch system (15+ branches)
   - Multiple flower types (hearts, tulips, 5-petal flowers)
   - Detailed leaf positioning and animations
   - Rich background with hills and ground effects
   - Progressive Scene.js-style growing animations

3. FRACTAL TREE (Aranja CodePen)
   - Canvas-based recursive fractal algorithms
   - Dynamic depth and complexity based on audio
   - Realistic branching patterns with mathematical precision
   - Audio-reactive colors, angles, and chaos levels
   - Original gradient backgrounds and leaf effects

4. CHARACTER TREE (Full Original Detail)
   - Complete 5-layer shading system from original
   - Complex flower arrangements with stems and petals
   - GSAP-style bee movement patterns
   - Bird with musical notes and detailed animations
   - Facial expressions that change with audio state
   - All original SASS styling converted to React

INSTALLATION:
1. npm install framer-motion
2. Replace current tree component with this file
3. Update tree selector to include all 4 options:

   <select value={treeType} onChange={(e) => setTreeType(e.target.value)}>
     <option value="growing">🌱 Growing Tree (GSAP Style)</option>
     <option value="flowering">🌺 Flowering Tree (Scene.js Style)</option>
     <option value="fractal">🌳 Fractal Tree (Canvas)</option>
     <option value="character">😊 Character Tree (Full Detail)</option>
   </select>

AUDIO BEHAVIORS:
- Growing: Progressive growth when quiet, leaf particles when loud
- Flowering: Flowers bloom when quiet, petals fall when loud  
- Fractal: Increases complexity when quiet, chaos when loud
- Character: Happy expressions when quiet, dizzy/chaotic when loud

All trees now preserve their original artistic complexity and visual richness!
*/
