import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CherryBlossom from './components/TreeAssets/CherryBlossom';
import WillowTree from './components/TreeAssets/WillowTree';
import OakTree from './components/TreeAssets/OakTree';

const TreeVisualization = ({ isQuiet, volume, treeType = 'cherry' }) => {
  const [petals, setPetals] = useState([
    { id: 1, x: 200, y: 120 },
    { id: 2, x: 180, y: 140 },
    { id: 3, x: 220, y: 140 },
    { id: 4, x: 210, y: 160 },
    { id: 5, x: 190, y: 160 }
  ]);
  const [fallingPetals, setFallingPetals] = useState([]);
  const [quietTime, setQuietTime] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Track quiet time
  useEffect(() => {
    let interval;
    if (isQuiet && volume > 0) {
      interval = setInterval(() => {
        setQuietTime(prev => {
          const newTime = prev + 1;
          if (newTime % 30 === 0) {
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000);
          }
          return newTime;
        });
      }, 1000);
    } else {
      setQuietTime(0);
    }
    return () => clearInterval(interval);
  }, [isQuiet, volume]);

  // Handle petal/leaf falling
  useEffect(() => {
    if (!isQuiet && petals.length > 0) {
      const petal = petals[0];
      setPetals(petals.slice(1));
      setFallingPetals([...fallingPetals, { ...petal, falling: true }]);
    } else if (isQuiet && petals.length < 5) {
      const newPetal = { 
        id: Date.now(), 
        x: 200 + Math.random() * 30 - 15, 
        y: 120 + Math.random() * 40 
      };
      setPetals([...petals, newPetal]);
    }
    
    if (fallingPetals.length > 0) {
      const timeout = setTimeout(() => {
        setFallingPetals(fallingPetals.slice(1));
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [isQuiet]);

  const renderTree = () => {
    const commonProps = { isQuiet, fallingPetals };
    switch (treeType) {
      case 'cherry':
        return <CherryBlossom {...commonProps} petals={petals} />;
      case 'willow':
        return <WillowTree {...commonProps} leaves={petals} fallingLeaves={fallingPetals} />;
      case 'oak':
        return <OakTree {...commonProps} leaves={petals} fallingLeaves={fallingPetals} />;
      default:
        return <CherryBlossom {...commonProps} petals={petals} />;
    }
  };

  return (
    <div className="tree-container relative">
      {renderTree()}
      
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-yellow-400 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              🎉 {Math.floor(quietTime / 60)}m {quietTime % 60}s Quiet!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TreeVisualization; 