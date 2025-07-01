import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

const GrantJenkinsTree2 = ({ isQuiet, volume, isPlaying = true }) => {
  const [branches, setBranches] = useState([]);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [geometricShapes, setGeometricShapes] = useState([]);
  const animationRef = useRef();

  // Audio-reactive energy system
  useEffect(() => {
    if (isQuiet) {
      setEnergyLevel(prev => Math.min(prev + 0.02, 1));
    } else {
      setEnergyLevel(prev => Math.max(prev - 0.05, 0.2));
    }
  }, [isQuiet, volume]);

  // Pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 0.1) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate geometric branches
  useEffect(() => {
    const generateBranches = () => {
      const newBranches = [];
      const maxBranches = Math.floor(5 + energyLevel * 10);
      
      for (let i = 0; i < maxBranches; i++) {
        const angle = (i / maxBranches) * Math.PI * 2;
        const length = 30 + Math.random() * 50 * energyLevel;
        const x = 200 + Math.cos(angle) * (50 + i * 10);
        const y = 300 - i * 15;
        
        newBranches.push({
          id: i,
          x1: 200,
          y1: 350,
          x2: x,
          y2: y,
          angle: angle,
          length: length,
          thickness: 8 - i * 0.5,
          color: `hsl(${120 + i * 20}, 70%, ${50 + energyLevel * 20}%)`
        });
      }
      setBranches(newBranches);
    };

    generateBranches();
  }, [energyLevel]);

  // Generate geometric shapes
  useEffect(() => {
    const shapes = [];
    const numShapes = Math.floor(3 + energyLevel * 8);
    
    for (let i = 0; i < numShapes; i++) {
      const type = ['circle', 'triangle', 'square', 'hexagon'][i % 4];
      const x = 150 + Math.random() * 100;
      const y = 150 + Math.random() * 100;
      const size = 5 + Math.random() * 15;
      
      shapes.push({
        id: i,
        type,
        x,
        y,
        size,
        rotation: Math.random() * 360,
        color: `hsl(${200 + i * 30}, 80%, ${60 + energyLevel * 20}%)`,
        opacity: 0.3 + energyLevel * 0.7
      });
    }
    setGeometricShapes(shapes);
  }, [energyLevel]);

  const renderShape = (shape) => {
    const { type, x, y, size, rotation, color, opacity } = shape;
    
    switch (type) {
      case 'circle':
        return (
          <motion.circle
            cx={x}
            cy={y}
            r={size}
            fill={color}
            opacity={opacity}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [rotation, rotation + 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: shape.id * 0.2
            }}
          />
        );
      case 'triangle':
        return (
          <motion.polygon
            points={`${x},${y - size} ${x - size},${y + size} ${x + size},${y + size}`}
            fill={color}
            opacity={opacity}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [rotation, rotation + 180]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: shape.id * 0.3
            }}
          />
        );
      case 'square':
        return (
          <motion.rect
            x={x - size}
            y={y - size}
            width={size * 2}
            height={size * 2}
            fill={color}
            opacity={opacity}
            animate={{
              scale: [1, 1.15, 1],
              rotate: [rotation, rotation + 90]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: shape.id * 0.4
            }}
          />
        );
      case 'hexagon':
        const points = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          points.push(`${x + Math.cos(angle) * size},${y + Math.sin(angle) * size}`);
        }
        return (
          <motion.polygon
            points={points.join(' ')}
            fill={color}
            opacity={opacity}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [rotation, rotation + 120]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: shape.id * 0.5
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grant-jenkins-tree-2">
      <div className="tree-container">
        <svg width="400" height="400" viewBox="0 0 400 400" className="tree-svg">
          {/* Background with gradient */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isQuiet ? "#2C3E50" : "#E74C3C"} />
              <stop offset="50%" stopColor={isQuiet ? "#34495E" : "#C0392B"} />
              <stop offset="100%" stopColor={isQuiet ? "#1B2631" : "#922B21"} />
            </linearGradient>
            <radialGradient id="energyGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>
            <filter id="energyFilter">
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
            </filter>
          </defs>

          {/* Background */}
          <rect x="0" y="0" width="400" height="400" fill="url(#bgGradient)" />

          {/* Energy field */}
          <motion.circle
            cx="200"
            cy="200"
            r={50 + energyLevel * 100}
            fill="url(#energyGlow)"
            opacity={0.3}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />

          {/* Geometric shapes */}
          <g className="geometric-shapes">
            {geometricShapes.map(renderShape)}
          </g>

          {/* Main trunk */}
          <motion.rect
            x="195"
            y="300"
            width="10"
            height={100 + energyLevel * 50}
            fill="#8B4513"
            animate={{
              height: [100 + energyLevel * 50, 110 + energyLevel * 50, 100 + energyLevel * 50]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
          />

          {/* Branches */}
          <g className="branches">
            {branches.map((branch) => (
              <motion.line
                key={branch.id}
                x1={branch.x1}
                y1={branch.y1}
                x2={branch.x2}
                y2={branch.y2}
                stroke={branch.color}
                strokeWidth={branch.thickness}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  strokeWidth: branch.thickness + Math.sin(pulsePhase + branch.id) * 2
                }}
                transition={{
                  duration: 1,
                  delay: branch.id * 0.1
                }}
                filter="url(#energyFilter)"
              />
            ))}
          </g>

          {/* Energy nodes */}
          {branches.map((branch) => (
            <motion.circle
              key={`node-${branch.id}`}
              cx={branch.x2}
              cy={branch.y2}
              r={3 + energyLevel * 5}
              fill="#FFFFFF"
              opacity={0.8}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: branch.id * 0.2
              }}
            />
          ))}

          {/* Pulse waves */}
          <AnimatePresence>
            {isQuiet && (
              <motion.circle
                cx="200"
                cy="200"
                r="0"
                stroke="#FFFFFF"
                strokeWidth="2"
                fill="none"
                initial={{ r: 0, opacity: 1 }}
                animate={{ r: 200, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </AnimatePresence>

          {/* Chaos particles when loud */}
          {!isQuiet && (
            <g className="chaos-particles">
              {[...Array(12)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={100 + Math.random() * 200}
                  cy={100 + Math.random() * 200}
                  r="2"
                  fill="#FF6B6B"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 100],
                    y: [0, (Math.random() - 0.5) * 100]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </g>
          )}
        </svg>
      </div>

      <div className="tree-status">
        <div className="status-text">
          {isQuiet ? "⚡ Energy Building" : "💥 Energy Dispersing"}
        </div>
        <div className="energy-indicator">
          Energy: {Math.round(energyLevel * 100)}%
        </div>
        <div className="shape-count">
          Shapes: {geometricShapes.length} | Branches: {branches.length}
        </div>
      </div>
    </div>
  );
};

export default GrantJenkinsTree2; 