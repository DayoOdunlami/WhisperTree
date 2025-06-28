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

// ===== OPTION 4: CHARACTER TREE (ADAPTED FROM CUTE CODEPEN) =====

const CharacterTreeVisualization = ({ isQuiet, volume }) => {
  const [bees, setBees] = useState([
    { id: 1, x: -105, y: 210, rotation: 40 },
    { id: 2, x: -80, y: 140, rotation: 0 },
    { id: 3, x: 55, y: 150, rotation: 0 }
  ]);

  const [isBlinking, setIsBlinking] = useState(false);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Bee movement when noisy
  useEffect(() => {
    if (!isQuiet) {
      const moveInterval = setInterval(() => {
        setBees(prev => prev.map(bee => ({
          ...bee,
          x: bee.x + (Math.random() - 0.5) * 20,
          y: bee.y + (Math.random() - 0.5) * 15,
          rotation: bee.rotation + (Math.random() - 0.5) * 45
        })));
      }, 500);
      return () => clearInterval(moveInterval);
    }
  }, [isQuiet]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" 
         style={{ background: '#D9E0E7' }}>
      
      <div className="relative border-4 rounded-lg p-8"
           style={{ 
             width: '800px', 
             height: '500px', 
             borderColor: '#D9E0E7',
             background: 'linear-gradient(to bottom, #D9E0E7 0%, #A0BE38 100%)'
           }}>

        {/* Grass */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 h-4"
             style={{ 
               width: '450px', 
               background: '#A0BE38',
               zIndex: 10 
             }} />

        {/* Character Tree */}
        <motion.div 
          className="absolute"
          style={{ 
            left: '50%', 
            top: '340px',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '105px',
            background: '#91633F'
          }}
          animate={{
            rotate: isQuiet ? [-0.5, 0.5, -0.5] : [-3, 3, -3],
            scale: isQuiet ? 1 : [1, 0.98, 1]
          }}
          transition={{
            rotate: { duration: isQuiet ? 4 : 0.8, repeat: Infinity },
            scale: { duration: isQuiet ? 2 : 0.4, repeat: Infinity }
          }}
        >
          {/* Tree Top */}
          <div 
            className="absolute"
            style={{
              width: '120px',
              height: '12px',
              background: '#EAD292',
              borderRadius: '10px 10px 0 0',
              left: '-10px',
              top: '-10px',
              zIndex: 4
            }}
          />

          {/* Tree Face */}
          <div className="relative" style={{ top: '7px', zIndex: 3 }}>
            {/* Eyes */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '10px', height: isBlinking ? '2px' : '10px',
                background: '#392F21',
                top: '15px', left: '30%'
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '10px', height: isBlinking ? '2px' : '10px',
                background: '#392F21',
                top: '15px', left: '60%'
              }}
              transition={{ duration: 0.1 }}
            />

            {/* Eyebrows */}
            <div 
              className="absolute"
              style={{
                width: '25px', height: '8px',
                background: '#6C4B31',
                borderRadius: '20px',
                top: '0px', left: '20%'
              }}
            />
            <div 
              className="absolute"
              style={{
                width: '25px', height: '8px',
                background: '#6C4B31',
                borderRadius: '20px',
                top: '0px', left: '55%'
              }}
            />

            {/* Mouth */}
            <motion.div
              className="absolute"
              style={{
                width: '20px', height: isQuiet ? '15px' : '25px',
                borderRadius: '30px',
                border: '5px solid #6C4B35',
                borderColor: 'transparent transparent #6C4B35 transparent',
                top: isQuiet ? '25px' : '20px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Tree Body Shading */}
          <div 
            className="absolute"
            style={{
              width: '15px', height: '110px',
              background: '#C29C57',
              left: '0px', top: '-70px',
              zIndex: 1
            }}
          />
        </motion.div>

        {/* Animated Bees */}
        {bees.map((bee) => (
          <motion.div
            key={bee.id}
            className="absolute"
            style={{
              width: '22px', height: '15px',
              borderRadius: '44%',
              background: '#ECC33F',
              left: `${400 + bee.x}px`,
              top: `${bee.y}px`,
              zIndex: 5
            }}
            animate={{
              x: isQuiet ? [0, 10, 0] : [0, 30, -20, 0],
              y: isQuiet ? [0, -5, 0] : [0, -15, 10, 0],
              rotate: bee.rotation + (isQuiet ? 0 : 15)
            }}
            transition={{
              duration: isQuiet ? 3 : 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Bee stripes */}
            <div 
              className="absolute"
              style={{
                width: '14px', height: '8px',
                background: '#51524C',
                top: '3px', left: '4px',
                transform: 'rotate(-90deg)'
              }}
            />
          </motion.div>
        ))}

        {/* Musical Notes (when quiet) */}
        {isQuiet && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: '10px', height: '10px',
                  background: '#D0DFE2',
                  left: `${580 + i * 20}px`,
                  top: `${160 - i * 10}px`,
                  zIndex: 6
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -20, -40]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </>
        )}

        {/* Flowers */}
        <div className="absolute" style={{ left: '37.6%', top: '250px' }}>
          <motion.div
            className="rounded-full"
            style={{
              width: '30px', height: '30px',
              background: '#E274A4',
              borderRadius: '100px 0px'
            }}
            animate={{
              scale: isQuiet ? [1, 1.1, 1] : [1, 0.9, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 text-center">
        <motion.div 
          className="text-2xl font-bold"
          style={{ color: '#91633F' }}
          animate={{ 
            scale: isQuiet ? 1 : [1, 1.2, 1],
            color: isQuiet ? '#91633F' : '#D2691E'
          }}
        >
          {isQuiet ? "😊 Happy Tree" : "😵 Dizzy Tree!"}
        </motion.div>
        <div className="mt-2 text-lg" style={{ color: '#6C4B35' }}>
          {isQuiet ? "The tree is singing!" : "Too much buzzing!"}
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
