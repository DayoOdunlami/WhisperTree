# WhisperTree

WhisperTree is a React-based web application that encourages children to maintain quiet environments through gamified visual feedback. The app visualizes ambient noise levels using an animated tree that blooms when quiet and sheds leaves/petals when loud.

## Features
- Real-time microphone input and noise detection
- Multiple animated tree types that respond to sound levels
- Child-friendly UI with Tailwind CSS
- Adjustable sensitivity and tree type selection
- No audio is recorded or stored (privacy-first)

## Tree Types Available
1. **🌱 Growing Tree** - GSAP-style growing animations with progressive branch development
2. **🌺 Flowering Tree** - Scene.js-based tree with complex multi-level branches and flowers
3. **🌳 Fractal Tree** - Canvas-based recursive fractal patterns with mathematical precision
4. **😊 Character Tree** - Character-based tree with facial expressions and bee animations
5. **🌿 Myau Original** - Original CodePen adaptation with GSAP animations
6. **🌿 Grant Jenkins Tree 1** - Sophisticated SVG tree with particle effects and wind animations
7. **⚡ Grant Jenkins Tree 2** - Geometric energy system with mathematical patterns and chaos particles

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm start
```

### 3. Build for production
```bash
npm run build
```

## Tech Stack
- React
- Tailwind CSS
- Framer Motion
- Web Audio API

## Development Workflow
1. Make changes locally
2. Test with `npm start`
3. Commit and push to your GitHub repo
4. Deploy to Vercel (auto-deploy via GitHub integration)

## Deployment
To deploy to Vercel:
```bash
npm install -g vercel
vercel --prod
```

---

**Note:** All audio processing is done in-browser. No audio is stored or sent to any server.
