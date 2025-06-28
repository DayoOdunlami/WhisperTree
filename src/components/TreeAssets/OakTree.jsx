import React from 'react';
import { motion } from 'framer-motion';

const OakTree = ({ isQuiet, leaves, fallingLeaves }) => {
  const treeVariants = {
    quiet: { 
      scale: 1, 
      rotate: 0, 
      transition: { type: 'spring', stiffness: 120 } 
    },
    loud: { 
      scale: 0.97, 
      rotate: [0, -1.5, 1.5, -1.5, 0], 
      transition: { repeat: Infinity, duration: 0.7 } 
    }
  };

  const Leaf = ({ x, y, falling }) => (
    <motion.ellipse
      cx={x}
      cy={y}
      rx="6"
      ry="10"
      fill="#a16207"
      initial={{ opacity: 1, y: 0 }}
      animate={falling ? { opacity: 0, y: 70 } : { opacity: 1, y: 0 }}
      transition={{ duration: 1.3 }}
    />
  );

  const Acorn = ({ x, y, falling }) => (
    <motion.g
      initial={{ opacity: 1, y: 0 }}
      animate={falling ? { opacity: 0, y: 70 } : { opacity: 1, y: 0 }}
      transition={{ duration: 1.3 }}
    >
      <ellipse cx={x} cy={y} rx="3" ry="5" fill="#8d5524" />
      <ellipse cx={x} cy={y-3} rx="2" ry="2" fill="#a16207" />
    </motion.g>
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
      
      {/* Sturdy branches */}
      <path d="M200 200 Q180 180 160 220" stroke="#8d5524" strokeWidth="10" fill="none" />
      <path d="M200 220 Q220 180 240 220" stroke="#8d5524" strokeWidth="10" fill="none" />
      <path d="M200 180 Q180 160 160 200" stroke="#8d5524" strokeWidth="8" fill="none" />
      <path d="M200 200 Q220 160 240 200" stroke="#8d5524" strokeWidth="8" fill="none" />
      <path d="M200 160 Q180 140 160 180" stroke="#8d5524" strokeWidth="6" fill="none" />
      <path d="M200 180 Q220 140 240 180" stroke="#8d5524" strokeWidth="6" fill="none" />
      
      {/* Leaves on tree */}
      {leaves.map((leaf) => (
        <Leaf key={leaf.id} x={leaf.x} y={leaf.y} falling={false} />
      ))}
      
      {/* Acorns */}
      <Acorn x={180} y={150} falling={false} />
      <Acorn x={220} y={170} falling={false} />
      <Acorn x={200} y={140} falling={false} />
      
      {/* Falling leaves */}
      {fallingLeaves.map((leaf) => (
        <Leaf key={leaf.id + '-fall'} x={leaf.x} y={leaf.y} falling={true} />
      ))}
    </motion.svg>
  );
};

export default OakTree; 