import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ===== OPTION 1: SVG TREE WITH FRAMER MOTION (FROM YOUR PASTE) =====

const SVGTreeVisualization = ({ isQuiet, volume, treeType = 'nature' }) => {
  const [petals, setPetals] = useState([]);

  // Generate falling petals when loud
  useEffect(() => {
    if (!isQuiet && volume > 30) {
      const newPetals = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        x: 120 + Math.random() * 60,
        y: 100,
        rotation: Math.random() * 360,
        color: ['#ff69b4', '#ffb6c1', '#ffc0cb'][Math.floor(Math.random() * 3)]
      }));
      setPetals(prev => [...prev, ...newPetals].slice(-20));
    }
  }, [isQuiet, volume]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPetals(prev => prev.slice(3));
    }, 3000);
    return () => clearTimeout(timer);
  }, [petals]);

  const treeVariants = {
    calm: {
      rotate: [-1, 1, -1, 0],
      scale: 1,
      transition: {
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
      }
    },
    windy: {
      rotate: [-8, 8, -6, 6, -8],
      scale: [1, 0.95, 1, 0.92, 1],
      transition: {
        rotate: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.6, repeat: Infinity }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-green-100">
      <div className="relative">
        <motion.svg
          width="300"
          height="400"
          viewBox="0 0 300 400"
          className="drop-shadow-lg"
          animate={isQuiet ? "calm" : "windy"}
          variants={treeVariants}
        >
          <motion.rect
            x="140" y="200" width="20" height="200"
            fill="#8B4513" rx="10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ transformOrigin: "bottom" }}
          />
          <motion.circle
            cx="150" cy="180" r="70" fill="#22c55e"
            animate={{ scale: isQuiet ? [1, 1.05, 1] : [1, 0.9, 0.95, 1] }}
            transition={{ duration: isQuiet ? 3 : 0.5, repeat: Infinity }}
          />
          {isQuiet && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.ellipse
                  key={i}
                  cx={120 + (i * 15)} cy={140 + Math.sin(i) * 20}
                  rx="8" ry="12" fill="#22c55e"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 0.9, 1], rotate: [0, 10, -5, 0] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatDelay: 3 }}
                />
              ))}
            </>
          )}
        </motion.svg>

        <AnimatePresence>
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute w-3 h-3 rounded-full"
              style={{ backgroundColor: petal.color, left: petal.x, top: petal.y }}
              initial={{ y: petal.y, rotate: petal.rotation, opacity: 1 }}
              animate={{
                y: petal.y + 300,
                rotate: petal.rotation + 720,
                x: petal.x + (Math.random() - 0.5) * 100,
                opacity: 0
              }}
              transition={{ duration: 3, ease: "easeIn" }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 text-center">
        <div className="text-lg font-bold text-gray-700 mb-2">
          {isQuiet ? "🌸 Quiet & Growing" : "💨 Getting Windy!"}
        </div>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-red-400"
            animate={{ width: `${volume}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>
    </div>
  );
};

// ===== OPTION 2: CSS-BASED TREE ANIMATION (FROM YOUR PASTE) =====

const CSSTreeVisualization = ({ isQuiet, volume }) => {
  const [leaves, setLeaves] = React.useState([]);

  React.useEffect(() => {
    if (isQuiet) {
      const interval = setInterval(() => {
        const newLeaf = {
          id: Date.now(),
          x: Math.random() * 200 + 50,
          y: Math.random() * 100 + 100,
          delay: Math.random() * 2
        };
        setLeaves(prev => [...prev, newLeaf].slice(-15));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isQuiet]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 via-blue-50 to-green-50">
      <div className="relative">
        <motion.div
          className="relative"
          animate={{
            rotate: isQuiet ? [-1, 1, -1, 0] : [-5, 5, -3, 3, -5],
            scale: isQuiet ? 1 : [1, 0.95, 1]
          }}
          transition={{
            rotate: { duration: isQuiet ? 4 : 0.6, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: isQuiet ? 2 : 0.4, repeat: Infinity }
          }}
        >
          <motion.div
            style={{
              width: '30px', height: '180px',
              background: 'linear-gradient(to bottom, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
              borderRadius: '15px 15px 5px 5px',
              position: 'relative', margin: '0 auto',
              boxShadow: 'inset -5px 0 10px rgba(0,0,0,0.3)'
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          
          <motion.div style={{ position: 'relative', top: '-40px', left: '50%', transform: 'translateX(-50%)' }}>
            <motion.div
              style={{
                width: '160px', height: '120px',
                background: 'radial-gradient(circle, #22c55e 0%, #16a34a 70%, #15803d 100%)',
                borderRadius: '50% 50% 60% 60% / 60% 60% 40% 40%',
                position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }}
              animate={{ scale: isQuiet ? [1, 1.05, 1] : [1, 0.9, 0.95, 1] }}
              transition={{ duration: isQuiet ? 3 : 0.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute w-2 h-3 bg-green-400 rounded-full"
            style={{ left: leaf.x, top: leaf.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0.8, 1],
              opacity: [0, 1, 1, 0],
              y: [0, -20, -10, 0]
            }}
            transition={{ duration: 4, delay: leaf.delay }}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <motion.div 
          className="text-2xl font-bold mb-2"
          animate={{ color: isQuiet ? "#22c55e" : "#ef4444" }}
        >
          {isQuiet ? "🌱 Growing Peacefully" : "🍃 Leaves Dancing!"}
        </motion.div>
      </div>
    </div>
  );
};

// ===== OPTION 3: FLOWERING TREE (ADAPTED FROM SCENE.JS CODEPEN) =====

const FloweringTreeVisualization = ({ isQuiet, volume }) => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    if (isQuiet && Math.random() < 0.3) {
      const newFlower = {
        id: Date.now(),
        x: Math.random() * 100 + 50,
        y: Math.random() * 80 + 60,
        color: ['#F0A5A6', '#A7D3ED', '#FEDFBC', '#F0CCFE'][Math.floor(Math.random() * 4)],
        size: Math.random() * 10 + 15
      };
      setFlowers(prev => [...prev, newFlower].slice(-12));
    }
  }, [isQuiet, volume]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" 
         style={{ background: '#FEFDE3' }}>
      
      {/* Ground */}
      <div className="absolute bottom-0 w-full h-24 rounded-t-full" 
           style={{ background: '#CADC88' }}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-8 rounded-full"
             style={{ background: '#F2EDB4' }} />
      </div>

      {/* Tree Container */}
      <motion.div 
        className="relative"
        animate={{
          rotate: isQuiet ? [-1, 1, -1] : [-5, 5, -5],
          scale: isQuiet ? 1 : [1, 0.95, 1]
        }}
        transition={{
          rotate: { duration: isQuiet ? 4 : 0.8, repeat: Infinity },
          scale: { duration: isQuiet ? 3 : 0.5, repeat: Infinity }
        }}
        style={{ transformOrigin: 'bottom center' }}
      >
        {/* Tree Trunk */}
        <div 
          className="relative mx-auto"
          style={{
            width: '16px',
            height: '300px',
            background: '#816954',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)'
          }}
        />

        {/* Tree Branches */}
        <div className="absolute" style={{ top: '190px', right: '0' }}>
          <motion.div
            className="absolute"
            style={{
              width: '150px', height: '40px',
              borderBottom: '5px solid #816954',
              borderBottomLeftRadius: '100% 100%',
              transformOrigin: '100% 100%'
            }}
            animate={{ rotate: isQuiet ? [5, 7, 5] : [5, 15, 5] }}
            transition={{ duration: isQuiet ? 3 : 0.6, repeat: Infinity }}
          />
          
          {/* Leaves on branches */}
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: '23px', height: '23px',
                background: '#C5EABE',
                borderRadius: '0px 100%',
                left: `${20 + i * 30}px`,
                top: `${35 + Math.sin(i) * 5}px`
              }}
              animate={{
                scale: isQuiet ? [1, 1.1, 1] : [1, 0.8, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity 
              }}
            />
          ))}
        </div>

        {/* Left Branch System */}
        <div className="absolute" style={{ top: '130px', left: '0' }}>
          <motion.div
            style={{
              width: '160px', height: '60px',
              borderBottom: '5px solid #816954',
              borderBottomRightRadius: '100% 100%',
              transformOrigin: '0% 100%'
            }}
            animate={{ rotate: isQuiet ? [-5, -7, -5] : [-5, -15, -5] }}
            transition={{ duration: isQuiet ? 3 : 0.6, repeat: Infinity }}
          />
        </div>

        {/* Animated Flowers */}
        <AnimatePresence>
          {flowers.map((flower) => (
            <motion.div
              key={flower.id}
              className="absolute rounded-full"
              style={{
                width: `${flower.size}px`,
                height: `${flower.size}px`,
                background: flower.color,
                left: `${flower.x}px`,
                top: `${flower.y}px`
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 1, 1],
                rotate: [0, 180, 360]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 3,
                ease: "easeOut"
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Status */}
      <div className="absolute bottom-8 text-center">
        <motion.div 
          className="text-xl font-bold"
          style={{ color: '#816954' }}
          animate={{ scale: isQuiet ? 1 : [1, 1.1, 1] }}
        >
          {isQuiet ? "🌺 Flowers Blooming" : "🌪️ Wind Shaking"}
        </motion.div>
      </div>
    </div>
  );
};

// ===== CHARACTER TREE - FULL ORIGINAL ADAPTATION =====
// Based on: https://codepen.io/jrvasol/pen/VBRpgb
// Preserves all original artistic detail and complexity

const CharacterTreeVisualization = ({ isQuiet, volume }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [bees, setBees] = useState([
    { id: 1, x: 0, y: 0, rotation: 40, path: 0 },
    { id: 2, x: 0, y: 0, rotation: 0, path: 0 },
    { id: 3, x: 0, y: 0, rotation: 0, path: 0 }
  ]);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Define colors (from original SASS)
  const colors = {
    bg: '#D9E0E7',
    grass: '#A0BE38',
    treeBody: '#91633F',
    treeTop: '#EAD292',
    treeShade: '#6C4B35',
    treeShade2: '#C29C57',
    treeShade3: '#AB814E',
    treeShade4: '#855737',
    treeTrunk: '#6D4B36',
    treeEye: '#392F21',
    treeBrows: '#6C4B31',
    stem: '#7C9A2C',
    stemShadow: '#678127',
    stemLight: '#A0BE38',
    petalPink: '#E274A4',
    petalPinkShadow: '#B75379',
    petalOrange: '#E07335',
    petalYellow: '#ECC33F',
    petalYellowShade: '#E19C34',
    birdBody: '#89ADBB',
    birdTail: '#59718B',
    birdHead: '#D0DFE2'
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen"
      style={{ background: colors.bg, overflow: 'hidden' }}
    >
      <div 
        className="relative"
        style={{
          width: '800px',
          height: '500px',
          border: `3px solid ${colors.bg}`,
          margin: '100px auto',
          position: 'relative'
        }}
      >
        
        {/* Grass */}
        <div 
          className="absolute"
          style={{
            background: colors.grass,
            height: '16px',
            width: '450px',
            zIndex: 10,
            left: '50%',
            bottom: '40px',
            transform: 'translateX(-50%)'
          }}
        />

        {/* Main Tree Container */}
        <motion.div
          className="absolute"
          style={{
            background: colors.treeBody,
            height: '105px',
            width: '100px',
            top: '340px',
            left: '50%',
            transform: 'translateX(-50%)',
            position: 'relative',
            margin: 'auto'
          }}
          animate={{
            rotate: isQuiet ? [-0.5, 0.5, -0.5] : [-2, 2, -2],
            scale: isQuiet ? 1 : [1, 0.98, 1]
          }}
          transition={{
            rotate: { duration: isQuiet ? 4 : 1, repeat: Infinity },
            scale: { duration: isQuiet ? 2 : 0.5, repeat: Infinity }
          }}
        >
          {/* Tree base extension */}
          <div
            style={{
              content: '',
              display: 'block',
              position: 'absolute',
              width: '40px',
              height: '30px',
              zIndex: 4,
              bottom: '5px',
              left: '30px',
              background: colors.treeBody
            }}
          />

          {/* Tree Top */}
          <div
            style={{
              height: '12px',
              background: colors.treeTop,
              width: '120px',
              left: '-10px',
              top: '-10px',
              borderRadius: '10px 10px 0 0',
              zIndex: 4,
              position: 'relative',
              margin: 'auto'
            }}
          >
            {/* Tree top extension */}
            <div
              style={{
                content: '',
                display: 'block',
                position: 'absolute',
                left: '10px',
                width: '100px',
                background: colors.treeBody,
                height: '10px',
                top: '12px',
                zIndex: 3
              }}
            />
          </div>

          {/* Tree Face Container */}
          <div
            style={{
              position: 'relative',
              margin: 'auto',
              top: '7px',
              zIndex: 3
            }}
          >
            {/* Left Eye */}
            <motion.div
              style={{
                position: 'absolute',
                height: isBlinking ? '2px' : '10px',
                width: '10px',
                background: colors.treeEye,
                top: '15px',
                left: '30%',
                borderRadius: '100%'
              }}
              transition={{ duration: 0.1 }}
            />

            {/* Left Eyebrow */}
            <div
              style={{
                content: '',
                display: 'block',
                position: 'absolute',
                height: '8px',
                width: '25px',
                top: '0px',
                left: '20%',
                background: colors.treeBrows,
                borderRadius: '20px'
              }}
            />

            {/* Right Eye */}
            <motion.div
              style={{
                height: isBlinking ? '2px' : '10px',
                width: '10px',
                background: colors.treeEye,
                position: 'absolute',
                top: '15px',
                left: '60%',
                borderRadius: '100%'
              }}
              transition={{ duration: 0.1 }}
            />

            {/* Right Eyebrow */}
            <div
              style={{
                content: '',
                display: 'block',
                position: 'absolute',
                height: '8px',
                width: '25px',
                top: '0px',
                left: '55%',
                background: colors.treeBrows,
                borderRadius: '20px'
              }}
            />

            {/* Mouth */}
            <motion.div
              style={{
                height: isQuiet ? '15px' : '25px',
                width: '20px',
                top: isQuiet ? '30px' : '25px',
                borderRadius: '30px',
                position: 'relative',
                margin: 'auto',
                border: `5px solid ${colors.treeShade}`,
                borderColor: `transparent transparent ${colors.treeShade} transparent`
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Mouth dots */}
              <div
                style={{
                  content: '',
                  display: 'block',
                  width: '5px',
                  height: '5px',
                  background: colors.treeShade,
                  borderRadius: '50%',
                  position: 'relative',
                  top: isQuiet ? '10px' : '15px',
                  left: '-9px',
                  margin: 'auto'
                }}
              />
              <div
                style={{
                  content: '',
                  display: 'block',
                  width: '5px',
                  height: '5px',
                  background: colors.treeShade,
                  borderRadius: '50%',
                  position: 'relative',
                  top: isQuiet ? '5px' : '10px',
                  left: '9px',
                  margin: 'auto'
                }}
              />
            </motion.div>
          </div>

          {/* Tree Shading System - Complex layered shading from original */}
          
          {/* Shade 1 */}
          <div
            style={{
              zIndex: 1,
              height: '110px',
              width: '15px',
              position: 'absolute',
              left: '0px',
              top: '-70px',
              background: colors.treeShade2
            }}
          >
            <div
              style={{
                content: '',
                display: 'block',
                zIndex: 1,
                height: '100px',
                width: '120px',
                position: 'absolute',
                border: `15px solid ${colors.treeShade2}`,
                borderColor: `transparent ${colors.treeShade2} transparent transparent`,
                boxSizing: 'border-box',
                borderRadius: '50%',
                bottom: '-7px',
                right: '-5px',
                transform: 'rotate(28deg)'
              }}
            />
          </div>

          {/* Shade 2 */}
          <div
            style={{
              zIndex: 1,
              height: '110px',
              width: '15px',
              position: 'absolute',
              top: '-70px',
              left: '15px',
              background: colors.treeShade3
            }}
          >
            <div
              style={{
                content: '',
                display: 'block',
                zIndex: 3,
                height: '90px',
                width: '120px',
                position: 'absolute',
                border: `15px solid ${colors.treeShade3}`,
                borderColor: `transparent ${colors.treeShade3} transparent transparent`,
                boxSizing: 'border-box',
                borderRadius: '50%',
                bottom: '-7px',
                right: '-5px',
                transform: 'rotate(30deg)'
              }}
            />
            <div
              style={{
                content: '',
                display: 'block',
                zIndex: 2,
                height: '20px',
                width: '20px',
                position: 'absolute',
                bottom: '0',
                left: '1px',
                background: colors.treeBody
              }}
            />
          </div>

          {/* Shade 3 */}
          <div
            style={{
              zIndex: 2,
              height: '110px',
              width: '15px',
              position: 'absolute',
              top: '-70px',
              right: '15px',
              background: colors.treeShade3
            }}
          >
            <div
              style={{
                content: '',
                display: 'block',
                zIndex: 3,
                height: '90px',
                width: '120px',
                position: 'absolute',
                border: `15px solid ${colors.treeShade3}`,
                borderColor: `transparent transparent transparent ${colors.treeShade3}`,
                boxSizing: 'border-box',
                borderRadius: '50%',
                bottom: '-6px',
                left: '-5px',
                transform: 'rotate(-30deg)'
              }}
            />
            <div
              style={{
                content: '',
                display: 'block',
                zIndex: 2,
                height: '20px',
                width: '20px',
                position: 'absolute',
                bottom: '0',
                left: '0',
                background: colors.treeBody
              }}
            />
          </div>

          {/* Shade 4 */}
          <div
            style={{
              zIndex: 1,
              height: '110px',
              width: '15px',
              position: 'absolute',
              top: '-70px',
              right: '0',
              background: colors.treeBody
            }}
          >
            <div
              style={{
                content: '',
                display: 'block',
                zIndex: 1,
                height: '90px',
                width: '120px',
                position: 'absolute',
                border: `15px solid ${colors.treeBody}`,
                borderColor: `transparent transparent transparent ${colors.treeBody}`,
                boxSizing: 'border-box',
                borderRadius: '50%',
                bottom: '-6px',
                left: '-5px',
                transform: 'rotate(-30deg)'
              }}
            />
          </div>

          {/* Shade 5 - Central shadow */}
          <div
            style={{
              content: '',
              display: 'block',
              height: '40px',
              width: '15px',
              background: colors.treeShade4,
              position: 'absolute',
              bottom: '-10px',
              left: '43px',
              borderRadius: '20px',
              zIndex: 5
            }}
          >
            <div
              style={{
                content: '',
                display: 'block',
                height: '15px',
                width: '15px',
                background: colors.treeShade4,
                position: 'absolute',
                borderRadius: '40%',
                bottom: '4px',
                left: '7px'
              }}
            />
          </div>

          {/* Tree Trunk System - Complex multi-layer trunk */}
          
          {/* Trunk 1 */}
          <div
            style={{
              position: 'absolute',
              zIndex: -1,
              height: '50px',
              width: '40px',
              border: '15px solid',
              borderColor: `transparent transparent ${colors.treeBody} transparent`,
              borderRadius: '50%',
              top: '-70px',
              left: '-35px',
              transform: 'rotate(30deg)'
            }}
          >
            <div
              style={{
                content: '',
                height: '15px',
                width: '15px',
                position: 'absolute',
                display: 'block',
                background: colors.treeBody,
                borderRadius: '100%',
                left: '-7px',
                bottom: '-5px',
                transform: 'rotate(-30deg)'
              }}
            />
          </div>

          {/* Trunk 2 */}
          <div
            style={{
              position: 'absolute',
              zIndex: -1,
              height: '50px',
              width: '70px',
              border: '15px solid',
              borderColor: `transparent ${colors.treeTrunk} ${colors.treeTrunk} ${colors.treeTrunk}`,
              borderRadius: '50%',
              bottom: '-8px',
              right: '-85px',
              transform: 'rotate(5deg)'
            }}
          >
            <div
              style={{
                content: '',
                display: 'block',
                position: 'absolute',
                height: '16px',
                width: '16px',
                background: colors.treeTrunk,
                top: '-5px',
                right: '-4px',
                transform: 'rotate(-5deg)',
                borderRadius: '50%'
              }}
            />
          </div>

          {/* Trunk 3 with leaves */}
          <div
            style={{
              position: 'absolute',
              zIndex: -1,
              height: '70px',
              width: '80px',
              border: '12px solid',
              borderColor: `transparent transparent ${colors.treeTrunk} ${colors.treeTrunk}`,
              borderRadius: '50%',
              top: '-40px',
              right: '-60px',
              transform: 'rotate(-40deg)'
            }}
          >
            <div
              style={{
                content: '',
                display: 'block',
                position: 'absolute',
                height: '10px',
                width: '50px',
                background: colors.treeBody,
                transform: 'rotate(40deg)',
                right: '-34px',
                bottom: '-8px'
              }}
            />

            {/* Trunk 3 Leaves */}
            <div
              style={{
                position: 'absolute',
                height: '14px',
                width: '18px',
                background: colors.stemLight,
                borderRadius: '100px 0',
                left: '65px',
                top: '36px',
                transform: 'rotate(-50deg)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                height: '14px',
                width: '18px',
                background: colors.stem,
                borderRadius: '100px 0',
                left: '112px',
                top: '75px',
                transform: 'rotate(25deg)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                height: '14px',
                width: '18px',
                background: colors.stemShadow,
                borderRadius: '100px 0',
                left: '95px',
                top: '95px',
                transform: 'rotate(125deg)'
              }}
            />
          </div>
        </motion.div>

        {/* Complex Flower System */}
        
        {/* Pink Flower */}
        <div
          style={{
            position: 'relative',
            margin: 'auto',
            left: '37.6%',
            top: '250px'
          }}
        >
          {/* Pink flower stem */}
          <div
            style={{
              position: 'absolute',
              height: '80px',
              width: '80px',
              top: '2px',
              border: '10px solid',
              borderColor: `transparent transparent ${colors.stem} ${colors.stem}`,
              borderRadius: '45%'
            }}
          >
            <div
              style={{
                content: '',
                display: 'block',
                position: 'absolute',
                height: '10px',
                width: '10px',
                background: colors.stemShadow,
                top: '25px',
                left: '-10px'
              }}
            />
            <div
              style={{
                content: '',
                display: 'block',
                position: 'absolute',
                height: '14px',
                width: '18px',
                background: colors.stemShadow,
                top: '92px',
                left: '19px',
                borderRadius: '100px 0px'
              }}
            />
          </div>

          {/* Pink flower petals */}
          <motion.div
            style={{
              zIndex: 0,
              position: 'absolute',
              height: '30px',
              width: '30px',
              top: '2px',
              left: '-8px',
              background: '#9D416D',
              borderRadius: '100px 0px',
              transform: 'rotate(-40deg)'
            }}
            animate={{
              scale: isQuiet ? [1, 1.1, 1] : [1, 0.9, 1],
              rotate: isQuiet ? [-40, -35, -40] : [-40, -50, -40]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div
              style={{
                content: '',
                display: 'block',
                zIndex: 1,
                position: 'absolute',
                height: '35px',
                width: '25px',
                background: colors.petalPink,
                borderRadius: '10px 100px 10px 100px',
                left: '-8px',
                top: '-8px',
                transform: 'rotate(50deg)'
              }}
            />
            <div
              style={{
                content: '',
                display: 'block',
                zIndex: 1,
                position: 'absolute',
                height: '35px',
                width: '25px',
                left: '7px',
                top: '7px',
                background: colors.petalPinkShadow,
                borderRadius: '100px 10px 100px 10px',
                transform: 'rotate(38deg)'
              }}
            />
          </motion.div>

          {/* Pink flower dots */}
          <motion.div
            style={{
              height: '10px',
              width: '10px',
              background: colors.birdHead,
              position: 'absolute',
              borderRadius: '50%',
              top: '-12px',
              left: '-7px'
            }}
            animate={{
              opacity: isQuiet ? [1, 0.5, 1] : [1, 0.2, 1],
              scale: isQuiet ? 1 : [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            style={{
              height: '10px',
              width: '10px',
              background: colors.birdHead,
              position: 'absolute',
              borderRadius: '50%',
              top: '-12px',
              left: '14px'
            }}
            animate={{
              opacity: isQuiet ? [1, 0.5, 1] : [1, 0.2, 1],
              scale: isQuiet ? 1 : [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
        </div>

        {/* Animated Bees with complex movement */}
        <motion.div
          style={{
            height: '15px',
            width: '22px',
            borderRadius: '44%',
            background: colors.petalYellow,
            position: 'absolute',
            left: '295px',
            top: '210px',
            transform: 'rotate(40deg)'
          }}
          animate={{
            x: isQuiet ? [0, 15, -10, 0] : [0, 30, -30, 20, 0],
            y: isQuiet ? [0, -10, 5, 0] : [0, -30, 15, -20, 0],
            rotate: isQuiet ? [40, 50, 30, 40] : [40, 80, 0, 60, 40]
          }}
          transition={{
            duration: isQuiet ? 4 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div
            style={{
              content: '',
              display: 'block',
              position: 'relative',
              height: '8px',
              width: '14px',
              background: '#51524C',
              transform: 'rotate(-90deg)',
              top: '3px',
              left: '4px'
            }}
          />
        </motion.div>

        {/* Bird with Musical Notes */}
        <div
          style={{
            zIndex: -2,
            height: '50px',
            width: '50px',
            position: 'relative',
            margin: 'auto',
            left: '520px',
            top: '188px'
          }}
        >
          {/* Bird head */}
          <div
            style={{
              zIndex: 1,
              position: 'relative',
              margin: 'auto',
              top: '2px',
              height: '14px',
              width: '12px',
              background: colors.birdHead
            }}
          />

          {/* Bird body */}
          <div
            style={{
              position: 'relative',
              margin: 'auto',
              height: '40px',
              width: '28px',
              background: colors.birdBody,
              borderRadius: '100%'
            }}
          >
            <div
              style={{
                height: '8px',
                width: '8px',
                background: colors.birdTail,
                borderRadius: '100%',
                content: '',
                display: 'block',
                position: 'relative',
                top: '8px',
                left: '10px'
              }}
            />
            <div
              style={{
                height: '0',
                width: '0',
                content: '',
                display: 'block',
                position: 'relative',
                top: '10px',
                left: '8px',
                borderWidth: '6px',
                borderStyle: 'solid',
                borderColor: `${colors.birdTail} transparent transparent transparent`
              }}
            />
          </div>

          {/* Bird tail */}
          <motion.div
            style={{
              zIndex: -1,
              background: colors.birdTail,
              position: 'relative',
              margin: 'auto',
              height: '20px',
              width: '18px',
              top: '-5px'
            }}
            animate={{
              rotateX: isQuiet ? [0, 60, 0] : [0, 30, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Musical Notes - only when quiet */}
          {isQuiet && (
            <>
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '10px',
                    height: '10px',
                    background: colors.birdHead,
                    borderRadius: '50%',
                    left: `${50 + i * 15}px`,
                    top: `${-10 - i * 10}px`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -20, -40]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  {/* Musical note stem */}
                  <div
                    style={{
                      content: '',
                      display: 'block',
                      position: 'relative',
                      height: '10px',
                      width: '3px',
                      background: colors.birdHead,
                      left: '7px',
                      top: '-6px'
                    }}
                  />
                  {/* Musical note flag */}
                  <div
                    style={{
                      content: '',
                      display: 'block',
                      position: 'relative',
                      height: '7px',
                      width: '10px',
                      background: colors.birdHead,
                      left: '7px',
                      top: '-20px'
                    }}
                  />
                </motion.div>
              ))}
            </>
          )}
        </div>

        {/* Status Display */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <motion.div
            className="text-2xl font-bold mb-2"
            style={{ color: colors.treeBody }}
            animate={{
              scale: isQuiet ? 1 : [1, 1.1, 1],
              color: isQuiet ? colors.treeBody : colors.treeShade
            }}
            transition={{ duration: 0.3 }}
          >
            {isQuiet ? "😊 Happy Tree" : "😵 Dizzy Tree!"}
          </motion.div>
          <div className="text-lg" style={{ color: colors.treeBrows }}>
            {isQuiet ? "The tree is singing!" : "Too much buzzing!"}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== MAIN INTEGRATION COMPONENT =====

const WhisperTreeVisualization = ({ isQuiet, volume, treeType = 'svg' }) => {
  switch (treeType) {
    case 'svg':
      return <SVGTreeVisualization isQuiet={isQuiet} volume={volume} />;
    case 'css':
      return <CSSTreeVisualization isQuiet={isQuiet} volume={volume} />;
    case 'flowering':
      return <FloweringTreeVisualization isQuiet={isQuiet} volume={volume} />;
    case 'character':
      return <CharacterTreeVisualization isQuiet={isQuiet} volume={volume} />;
    default:
      return <SVGTreeVisualization isQuiet={isQuiet} volume={volume} />;
  }
};

export default WhisperTreeVisualization;
