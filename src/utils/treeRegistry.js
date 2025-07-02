// Central tree registry for managing all tree components
// This provides a single source of truth for tree metadata and switching

export const treeRegistry = {
  // Tree metadata and configuration
  trees: {
    'myau-original': {
      id: 'myau-original',
      name: '🌿 Myau Original',
      description: 'Original CodePen with GSAP animations',
      codepenUrl: 'https://codepen.io/Myau/pen/wbmmeK',
      component: 'MyauTreeOriginal',
      category: 'svg',
      difficulty: 'medium',
      hasAudioReactivity: true,
      defaultSettings: {
        isPlaying: true,
        speed: 1.0
      }
    },
    'flowering': {
      id: 'flowering',
      name: '🌺 Flowering Tree',
      description: 'Scene.js-based tree with complex branches',
      codepenUrl: null, // Need to find original source
      component: 'FloweringTree',
      category: 'scenejs',
      difficulty: 'hard',
      hasAudioReactivity: true,
      defaultSettings: {
        isPlaying: true,
        speed: 1.0
      }
    },
    'fractal': {
      id: 'fractal',
      name: '🌳 Fractal Tree',
      description: 'Canvas-based recursive patterns',
      codepenUrl: 'https://codepen.io/aranja/pen/jbjxNZ',
      component: 'FractalTree',
      category: 'canvas',
      difficulty: 'hard',
      hasAudioReactivity: true,
      defaultSettings: {
        isPlaying: true,
        complexity: 5
      }
    },
    'character': {
      id: 'character',
      name: '😊 Character Tree',
      description: 'Character-based tree with bees and expressions',
      codepenUrl: 'https://codepen.io/jrvasol/pen/VBRpgb',
      component: 'CharacterTree',
      category: 'character',
      difficulty: 'medium',
      hasAudioReactivity: true,
      defaultSettings: {
        isPlaying: true,
        beeSpeed: 1.0
      }
    },
    'growing': {
      id: 'growing',
      name: '🌱 Growing Tree',
      description: 'GSAP-style growing animations',
      codepenUrl: null, // Custom implementation
      component: 'GrowingTree',
      category: 'svg',
      difficulty: 'easy',
      hasAudioReactivity: true,
      defaultSettings: {
        isPlaying: true,
        growthSpeed: 1.0
      }
    },
    'grant-jenkins-1': {
      id: 'grant-jenkins-1',
      name: '🌿 Grant Jenkins Tree 1',
      description: 'Sophisticated SVG with particles',
      codepenUrl: 'https://codepen.io/grantjenkins/pen/myddbvq',
      component: 'GrantJenkinsTree1',
      category: 'svg',
      difficulty: 'medium',
      hasAudioReactivity: true,
      defaultSettings: {
        isPlaying: true,
        particleCount: 20
      }
    },
    'grant-jenkins-2': {
      id: 'grant-jenkins-2',
      name: '⚡ Grant Jenkins Tree 2',
      description: 'Baby Groot - Interactive Processing.js with 4 seasons, 8 actions, and character costumes',
      codepenUrl: 'https://codepen.io/grantjenkins/pen/KKoemZO',
      component: 'GrantJenkinsTree2',
      category: 'processing',
      difficulty: 'expert',
      hasAudioReactivity: true,
      defaultSettings: {
        isPlaying: true,
        energyLevel: 0.5
      }
    },
    'grant-jenkins-3': {
      id: 'grant-jenkins-3',
      name: '🐝 Grant Jenkins Tree 3',
      description: '3D Bee - Pure CSS 3D with flying bee, 4 flowers, and rotating scene',
      codepenUrl: 'https://codepen.io/grantjenkins/pen/3D-bee',
      component: 'GrantJenkinsTree3',
      category: 'css3d',
      difficulty: 'expert',
      hasAudioReactivity: false,
      defaultSettings: {
        isPlaying: true,
        rotationSpeed: 1.0
      }
    },
    'monkey-business': {
      id: 'monkey-business',
      name: '🐒 Monkey Business',
      description: 'Complex Processing.js animation with 5 animated objects',
      codepenUrl: 'https://codepen.io/grantjenkins/pen/myddbvq',
      component: 'MonkeyBusiness',
      category: 'processing',
      difficulty: 'expert',
      hasAudioReactivity: false,
      defaultSettings: {
        isPlaying: true,
        frameRate: 60
      }
    }
  },

  // Get all trees
  getAllTrees() {
    return Object.values(this.trees);
  },

  // Get tree by ID
  getTree(id) {
    return this.trees[id];
  },

  // Get trees by category
  getTreesByCategory(category) {
    return Object.values(this.trees).filter(tree => tree.category === category);
  },

  // Get tree categories
  getCategories() {
    const categories = [...new Set(Object.values(this.trees).map(tree => tree.category))];
    return categories;
  },

  // Get default tree
  getDefaultTree() {
    return this.trees['growing'];
  },

  // Validate tree ID
  isValidTree(id) {
    return id in this.trees;
  },

  // Get tree order for display
  getTreeOrder() {
    return [
      'myau-original',
      'flowering', 
      'fractal',
      'character',
      'growing',
      'grant-jenkins-1',
      'grant-jenkins-2',
      'grant-jenkins-3',
      'monkey-business'
    ];
  },

  // Get trees in display order
  getTreesInOrder() {
    const order = this.getTreeOrder();
    return order.map(id => this.trees[id]).filter(Boolean);
  }
};

// Tree categories with descriptions
export const treeCategories = {
  svg: {
    name: 'SVG Trees',
    description: 'Vector-based trees with smooth animations',
    icon: '🎨'
  },
  canvas: {
    name: 'Canvas Trees', 
    description: 'Pixel-based trees with complex algorithms',
    icon: '🖼️'
  },
  scenejs: {
    name: 'Scene.js Trees',
    description: 'Timeline-based animations',
    icon: '⏱️'
  },
  character: {
    name: 'Character Trees',
    description: 'Trees with personality and expressions',
    icon: '😊'
  },
  geometric: {
    name: 'Geometric Trees',
    description: 'Mathematical and abstract patterns',
    icon: '📐'
  },
  processing: {
    name: 'Processing.js Trees',
    description: 'Complex animations with Processing.js',
    icon: '🎬'
  },
  css3d: {
    name: 'CSS 3D Trees',
    description: 'Pure CSS 3D transforms and animations',
    icon: '🎯'
  }
};

// Audio reactivity settings
export const audioSettings = {
  enabled: true,
  sensitivity: 0.5,
  smoothing: 0.1,
  thresholds: {
    quiet: 0.3,
    loud: 0.7
  }
};

// Animation settings
export const animationSettings = {
  defaultSpeed: 1.0,
  maxSpeed: 3.0,
  minSpeed: 0.1,
  autoPlay: true,
  loop: true
}; 