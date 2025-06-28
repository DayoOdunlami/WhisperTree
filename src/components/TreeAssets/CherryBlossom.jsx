import React from 'react';
import { motion } from 'framer-motion';

const CherryBlossom = ({ isQuiet, petals, fallingPetals }) => {
  const treeVariants = {
    quiet: { 
      scale: 1, 
      rotate: 0, 
      transition: { type: 'spring', stiffness: 100 } 
    },
    loud: { 
      scale: 0.95, 
      rotate: [0, -2, 2, -2, 0], 
      transition: { repeat: Infinity, duration: 0.6 } 
    }
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

  return (
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
      <path d="M200 180 Q180 160 160 200" stroke="#8d5524" strokeWidth="6" fill="none" />
      <path d="M200 200 Q220 160 240 200" stroke="#8d5524" strokeWidth="6" fill="none" />
      
      {/* Petals on tree */}
      {petals.map((petal) => (
        <Petal key={petal.id} x={petal.x} y={petal.y} falling={false} />
      ))}
      
      {/* Falling petals */}
      {fallingPetals.map((petal) => (
        <Petal key={petal.id + '-fall'} x={petal.x} y={petal.y} falling={true} />
      ))}
    </motion.svg>
  );
};

export default CherryBlossom; 