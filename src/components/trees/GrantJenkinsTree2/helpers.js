// Helper functions for Grant Jenkins Tree 2

export const generateGeometricShape = (type, x, y, size, energyLevel) => {
  const baseColors = {
    circle: '#00ffff',
    triangle: '#ff00ff',
    square: '#ffff00',
    hexagon: '#00ff00'
  };
  
  const color = baseColors[type] || '#ffffff';
  const opacity = 0.3 + energyLevel * 0.7;
  const rotation = Math.random() * 360;
  
  return {
    type,
    x,
    y,
    size,
    rotation,
    color,
    opacity,
    energyLevel
  };
};

export const calculateEnergyFlow = (energyLevel, pulsePhase) => {
  return {
    intensity: energyLevel * Math.sin(pulsePhase),
    frequency: 1 + energyLevel * 2,
    amplitude: 0.5 + energyLevel * 0.5
  };
};

export const generateBranchSystem = (energyLevel, maxBranches = 15) => {
  const branches = [];
  const numBranches = Math.floor(3 + energyLevel * maxBranches);
  
  for (let i = 0; i < numBranches; i++) {
    const angle = (i / numBranches) * Math.PI * 2;
    const length = 20 + Math.random() * 60 * energyLevel;
    const x = 200 + Math.cos(angle) * (30 + i * 8);
    const y = 300 - i * 12;
    
    branches.push({
      id: i,
      x1: 200,
      y1: 350,
      x2: x,
      y2: y,
      angle: angle,
      length: length,
      thickness: Math.max(2, 10 - i * 0.6),
      color: `hsl(${120 + i * 15}, 70%, ${50 + energyLevel * 30}%)`,
      energy: energyLevel * (1 - i / numBranches)
    });
  }
  
  return branches;
};

export const createChaosParticles = (volume, isQuiet) => {
  if (isQuiet) return [];
  
  const particles = [];
  const numParticles = Math.floor(volume * 20);
  
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      id: Date.now() + i,
      x: Math.random() * 400,
      y: Math.random() * 400,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      life: 1,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      size: 1 + Math.random() * 3
    });
  }
  
  return particles;
};

export const calculateGeometricPattern = (energyLevel, time) => {
  const patterns = [];
  const numShapes = Math.floor(5 + energyLevel * 15);
  
  for (let i = 0; i < numShapes; i++) {
    const type = ['circle', 'triangle', 'square', 'hexagon'][i % 4];
    const x = 100 + Math.random() * 200;
    const y = 100 + Math.random() * 200;
    const size = 3 + Math.random() * 12;
    
    patterns.push({
      id: i,
      type,
      x,
      y,
      size,
      rotation: (time * 0.001 + i) * 30,
      color: `hsl(${200 + i * 25}, 80%, ${60 + energyLevel * 20}%)`,
      opacity: 0.2 + energyLevel * 0.6
    });
  }
  
  return patterns;
};

export const getEnergyColors = (energyLevel, isQuiet) => {
  if (isQuiet) {
    return {
      primary: '#00ffff',
      secondary: '#0080ff',
      accent: '#40e0d0',
      background: '#1a1a2e'
    };
  } else {
    const intensity = Math.min(energyLevel, 1);
    return {
      primary: `hsl(${180 + intensity * 60}, 100%, 70%)`,
      secondary: `hsl(${240 + intensity * 40}, 100%, 60%)`,
      accent: `hsl(${300 + intensity * 30}, 100%, 70%)`,
      background: `hsl(${0 + intensity * 20}, 50%, 20%)`
    };
  }
};

export const animateEnergyNodes = (nodes, energyLevel, time) => {
  return nodes.map((node, index) => ({
    ...node,
    scale: 1 + Math.sin(time * 0.001 + index) * energyLevel * 0.5,
    opacity: 0.6 + Math.sin(time * 0.002 + index) * energyLevel * 0.4,
    glow: energyLevel * Math.sin(time * 0.003 + index)
  }));
};

export const calculatePulseWaves = (energyLevel, time) => {
  const waves = [];
  const numWaves = Math.floor(1 + energyLevel * 3);
  
  for (let i = 0; i < numWaves; i++) {
    waves.push({
      id: i,
      radius: 50 + i * 30,
      opacity: Math.max(0, 1 - (time * 0.001 + i * 0.5) % 2),
      speed: 1 + energyLevel * 2
    });
  }
  
  return waves;
}; 