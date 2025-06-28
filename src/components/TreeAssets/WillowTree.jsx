import React from 'react';
import { motion } from 'framer-motion';

const WillowTree = ({ isQuiet, leaves, fallingLeaves }) => {
  const treeVariants = {
    quiet: { 
      scale: 1, 
      rotate: 0, 
      transition: { type: 'spring', stiffness: 80 } 
    },
    loud: { 
      scale: 0.98, 
      rotate: [0, -1, 1, -1, 0], 
      transition: { repeat: Infinity, duration: 0.8 } 
    }
  };

  const Leaf = ({ x, y, falling }) => (
    <motion.path
      d={`M${x},${y} Q${x-5},${y-8} ${x-10},${y} Q${x-5},${y+8} ${x},${y}`}
      fill="#22c55e"
      initial={{ opacity: 1, y: 0 }}
      animate={falling ? { opacity: 0, y: 80 } : { opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
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
      
      {/* Main branches */}
      <path d="M200 200 Q180 180 160 220" stroke="#8d5524" strokeWidth="8" fill="none" />
      <path d="M200 220 Q220 180 240 220" stroke="#8d5524" strokeWidth="8" fill="none" />
      
      {/* Willow branches - flowing down */}
      <path d="M160 220 Q140 240 120 280" stroke="#8d5524" strokeWidth="4" fill="none" />
      <path d="M240 220 Q260 240 280 280" stroke="#8d5524" strokeWidth="4" fill="none" />
      <path d="M200 200 Q200 220 200 260" stroke="#8d5524" strokeWidth="4" fill="none" />
      
      {/* Leaves on tree */}
      {leaves.map((leaf) => (
        <Leaf key={leaf.id} x={leaf.x} y={leaf.y} falling={false} />
      ))}
      
      {/* Falling leaves */}
      {fallingLeaves.map((leaf) => (
        <Leaf key={leaf.id + '-fall'} x={leaf.x} y={leaf.y} falling={true} />
      ))}
    </motion.svg>
  );
};

export default WillowTree; 