import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const treeVariants = {
  quiet: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 100 } },
  loud: { scale: 0.95, rotate: [0, -2, 2, -2, 0], transition: { repeat: Infinity, duration: 0.6 } }
};

const Petal = ({ x, y, falling }) => (
  <motion.ellipse
    cx={x}
    cy={y}
    rx="8"
    ry="12"
    fill="#f472b6"
    initial={{ opacity: 1, y: 0 }}
    animate={falling ? { opacity: 0, y: 60 } : { opacity: 1, y: 0 }}
    transition={{ duration: 1.2 }}
  />
);

const TreeVisualization = ({ isQuiet, volume, treeType = 'cherry' }) => {
  const [petals, setPetals] = useState([
    { id: 1, x: 200, y: 120 },
    { id: 2, x: 180, y: 140 },
    { id: 3, x: 220, y: 140 },
    { id: 4, x: 210, y: 160 },
    { id: 5, x: 190, y: 160 }
  ]);
  const [fallingPetals, setFallingPetals] = useState([]);

  useEffect(() => {
    if (!isQuiet && petals.length > 0) {
      // Remove a petal and animate it falling
      const petal = petals[0];
      setPetals(petals.slice(1));
      setFallingPetals([...fallingPetals, { ...petal, falling: true }]);
    } else if (isQuiet && petals.length < 5) {
      // Regrow a petal
      const newPetal = { id: Date.now(), x: 200 + Math.random() * 30 - 15, y: 120 + Math.random() * 40 };
      setPetals([...petals, newPetal]);
    }
    // Clean up fallen petals after animation
    if (fallingPetals.length > 0) {
      const timeout = setTimeout(() => {
        setFallingPetals(fallingPetals.slice(1));
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [isQuiet]);

  return (
    <div className="tree-container">
      <motion.svg
        width="400"
        height="500"
        viewBox="0 0 400 500"
        animate={isQuiet ? 'quiet' : 'loud'}
        variants={treeVariants}
        style={{ margin: '0 auto', display: 'block' }}
      >
        {/* Trunk */}
        <rect x="190" y="200" width="20" height="120" fill="#8d5524" rx="10" />
        {/* Branches */}
        <path d="M200 200 Q180 180 160 220" stroke="#8d5524" strokeWidth="8" fill="none" />
        <path d="M200 220 Q220 180 240 220" stroke="#8d5524" strokeWidth="8" fill="none" />
        {/* Petals on tree */}
        {petals.map((petal) => (
          <Petal key={petal.id} x={petal.x} y={petal.y} falling={false} />
        ))}
        {/* Falling petals */}
        <AnimatePresence>
          {fallingPetals.map((petal) => (
            <Petal key={petal.id + '-fall'} x={petal.x} y={petal.y} falling={true} />
          ))}
        </AnimatePresence>
      </motion.svg>
    </div>
  );
};

export default TreeVisualization; 