import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

const GrantJenkinsTree1 = ({ isQuiet, volume, isPlaying = true }) => {
  const [growthStage, setGrowthStage] = useState(0);
  const [particles, setParticles] = useState([]);
  const [windIntensity, setWindIntensity] = useState(0);
  const animationRef = useRef();

  // Audio-reactive growth
  useEffect(() => {
    if (isQuiet) {
      const interval = setInterval(() => {
        setGrowthStage(prev => Math.min(prev + 0.01, 1));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setGrowthStage(prev => Math.max(prev - 0.02, 0.3));
    }
  }, [isQuiet, volume]);

  // Wind effect based on volume
  useEffect(() => {
    setWindIntensity(isQuiet ? 0 : volume * 0.5);
  }, [isQuiet, volume]);

  // Particle system
  useEffect(() => {
    if (!isQuiet && volume > 0.6) {
      const newParticle = {
        id: Date.now(),
        x: Math.random() * 400,
        y: 100 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 2 + 1,
        life: 1,
        type: Math.random() > 0.5 ? 'leaf' : 'petal'
      };
      setParticles(prev => [...prev, newParticle]);
    }

    const animateParticles = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
            rotation: (p.rotation || 0) + 5
          }))
          .filter(p => p.life > 0 && p.y < 400)
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [isQuiet, volume]);

  const trunkPath = `M200 400 L200 ${400 - 150 * growthStage}`;
  const branchPaths = [
    `M200 ${400 - 120 * growthStage} L${160 - 20 * windIntensity} ${400 - 180 * growthStage}`,
    `M200 ${400 - 120 * growthStage} L${240 + 20 * windIntensity} ${400 - 180 * growthStage}`,
    `M200 ${400 - 100 * growthStage} L${140 - 15 * windIntensity} ${400 - 140 * growthStage}`,
    `M200 ${400 - 100 * growthStage} L${260 + 15 * windIntensity} ${400 - 140 * growthStage}`,
  ];

  return (
    <div className="grant-jenkins-tree-1">
      <div className="tree-container">
        <svg width="400" height="400" viewBox="0 0 400 400" className="tree-svg">
          {/* Background gradient */}
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isQuiet ? "#87CEEB" : "#FF6B6B"} />
              <stop offset="100%" stopColor={isQuiet ? "#E0F6FF" : "#FFE4E1"} />
            </linearGradient>
            <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8FBC8F" />
              <stop offset="100%" stopColor="#556B2F" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect x="0" y="0" width="400" height="400" fill="url(#skyGradient)" />
          
          {/* Ground */}
          <rect x="0" y="350" width="400" height="50" fill="url(#groundGradient)" />

          {/* Tree trunk with growth animation */}
          <motion.path
            d={trunkPath}
            stroke="#8B4513"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: growthStage }}
            transition={{ duration: 2, ease: "easeOut" }}
            filter={isQuiet ? "url(#glow)" : "none"}
          />

          {/* Branches */}
          {growthStage > 0.3 && branchPaths.map((path, index) => (
            <motion.path
              key={index}
              d={path}
              stroke="#8B4513"
              strokeWidth={8 - index * 1.5}
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Math.max(0, (growthStage - 0.3) * 1.4) }}
              transition={{ duration: 1.5, delay: index * 0.2 }}
            />
          ))}

          {/* Leaves */}
          {growthStage > 0.6 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {[
                { x: 140, y: 260, size: 12, color: "#228B22" },
                { x: 260, y: 260, size: 12, color: "#228B22" },
                { x: 160, y: 220, size: 10, color: "#32CD32" },
                { x: 240, y: 220, size: 10, color: "#32CD32" },
                { x: 180, y: 180, size: 8, color: "#90EE90" },
                { x: 220, y: 180, size: 8, color: "#90EE90" },
                { x: 200, y: 160, size: 6, color: "#98FB98" },
              ].map((leaf, i) => (
                <motion.circle
                  key={i}
                  cx={leaf.x + (Math.sin(Date.now() * 0.001 + i) * windIntensity * 5)}
                  cy={leaf.y}
                  r={leaf.size}
                  fill={leaf.color}
                  animate={{
                    scale: isQuiet ? [1, 1.1, 1] : [1, 0.9, 1],
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

          {/* Flowers */}
          {growthStage > 0.8 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {[
                { x: 150, y: 240, color: "#FF69B4" },
                { x: 250, y: 240, color: "#FF69B4" },
                { x: 170, y: 200, color: "#FFB6C1" },
                { x: 230, y: 200, color: "#FFB6C1" },
                { x: 200, y: 170, color: "#FFC0CB" },
              ].map((flower, i) => (
                <motion.g
                  key={i}
                  transform={`translate(${flower.x}, ${flower.y})`}
                  animate={{
                    rotate: isQuiet ? [0, 5, -5, 0] : [0, 15, -15, 0],
                    scale: isQuiet ? [1, 1.05, 1] : [1, 0.95, 1]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                >
                  {/* Flower petals */}
                  {[0, 60, 120, 180, 240, 300].map((angle, j) => (
                    <motion.ellipse
                      key={j}
                      cx={Math.cos(angle * Math.PI / 180) * 8}
                      cy={Math.sin(angle * Math.PI / 180) * 8}
                      rx="4"
                      ry="8"
                      fill={flower.color}
                      transform={`rotate(${angle})`}
                    />
                  ))}
                  {/* Flower center */}
                  <circle cx="0" cy="0" r="3" fill="#FFD700" />
                </motion.g>
              ))}
            </motion.g>
          )}

          {/* Falling particles */}
          <AnimatePresence>
            {particles.map(particle => (
              <motion.g
                key={particle.id}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ 
                  opacity: particle.life,
                  scale: particle.life,
                  x: particle.x,
                  y: particle.y,
                  rotate: particle.rotation || 0
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.1 }}
              >
                {particle.type === 'leaf' ? (
                  <ellipse cx="0" cy="0" rx="3" ry="6" fill="#228B22" />
                ) : (
                  <circle cx="0" cy="0" r="4" fill="#FF69B4" />
                )}
              </motion.g>
            ))}
          </AnimatePresence>

          {/* Ambient particles when quiet */}
          {isQuiet && (
            <motion.g>
              {[...Array(8)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={50 + Math.random() * 300}
                  cy={50 + Math.random() * 200}
                  r="1"
                  fill="#FFFFFF"
                  opacity="0.6"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.6, 0.2, 0.6]
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.5,
                    repeat: Infinity
                  }}
                />
              ))}
            </motion.g>
          )}
        </svg>
      </div>

      <div className="tree-status">
        <div className="status-text">
          {isQuiet ? "🌱 Growing Peacefully" : "🍃 Dancing in the Wind"}
        </div>
        <div className="growth-indicator">
          Growth: {Math.round(growthStage * 100)}%
        </div>
      </div>
    </div>
  );
};

export default GrantJenkinsTree1; 