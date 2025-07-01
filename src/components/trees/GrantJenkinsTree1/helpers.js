// Helper functions for Grant Jenkins Tree 1

export const calculateWindEffect = (windIntensity, baseX, baseY) => {
  const windOffset = Math.sin(Date.now() * 0.001) * windIntensity * 10;
  return {
    x: baseX + windOffset,
    y: baseY + Math.cos(Date.now() * 0.001) * windIntensity * 5
  };
};

export const generateParticle = (volume, isQuiet) => {
  const types = ['leaf', 'petal', 'sparkle'];
  const colors = ['#228B22', '#FF69B4', '#FFD700', '#87CEEB'];
  
  return {
    id: Date.now() + Math.random(),
    x: Math.random() * 400,
    y: 100 + Math.random() * 200,
    vx: (Math.random() - 0.5) * (isQuiet ? 2 : 6),
    vy: Math.random() * (isQuiet ? 1 : 3) + 1,
    life: 1,
    type: types[Math.floor(Math.random() * types.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 2 + Math.random() * 4
  };
};

export const calculateGrowthStages = (growthProgress) => {
  return {
    trunk: Math.min(growthProgress, 1),
    branches: Math.max(0, (growthProgress - 0.3) * 1.4),
    leaves: Math.max(0, (growthProgress - 0.6) * 2.5),
    flowers: Math.max(0, (growthProgress - 0.8) * 5)
  };
};

export const getAudioReactiveColors = (isQuiet, volume) => {
  if (isQuiet) {
    return {
      primary: '#228B22',
      secondary: '#32CD32',
      accent: '#90EE90',
      background: '#87CEEB'
    };
  } else {
    const intensity = Math.min(volume, 1);
    return {
      primary: `hsl(${120 - intensity * 30}, 70%, 50%)`,
      secondary: `hsl(${60 - intensity * 20}, 80%, 60%)`,
      accent: `hsl(${0 + intensity * 30}, 90%, 70%)`,
      background: `hsl(${200 + intensity * 40}, 60%, 70%)`
    };
  }
};

export const createBranchPath = (startX, startY, endX, endY, windIntensity = 0) => {
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const windOffset = Math.sin(Date.now() * 0.001) * windIntensity * 5;
  
  return `M${startX} ${startY} Q${midX + windOffset} ${midY} ${endX} ${endY}`;
};

export const animateParticles = (particles, isQuiet) => {
  return particles.map(particle => ({
    ...particle,
    x: particle.x + particle.vx,
    y: particle.y + particle.vy,
    life: particle.life - (isQuiet ? 0.01 : 0.03),
    rotation: (particle.rotation || 0) + (isQuiet ? 2 : 8),
    vx: particle.vx + (Math.random() - 0.5) * 0.5,
    vy: particle.vy + 0.1
  })).filter(p => p.life > 0 && p.y < 400);
}; 