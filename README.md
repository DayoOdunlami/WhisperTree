# WhisperTree

A modern React application showcasing beautiful interactive animations built with Vite.

## Features

- 🚀 Built with Vite for fast development and builds
- ⚛️ React 18 with modern hooks and patterns
- 🎨 Clean, minimalist UI design
- 📱 Responsive design for all devices
- 🎯 Individual pages for each animation
- 🔗 React Router for seamless navigation

## Animations

- **Baby Groot** - Interactive tree animation
- **3D Bee** - Three-dimensional bee visualization  
- **Flowering Tree** - Beautiful flowering animation
- **Myau Tree** - Unique tree visualization
- **Monkey Business** - Playful monkey animation

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is configured for deployment on Vercel. Simply push to GitHub and Vercel will automatically build and deploy the application.

## Tech Stack

- **Frontend**: React 18, Vite
- **Routing**: React Router DOM
- **Styling**: CSS3 with modern features
- **Deployment**: Vercel

## Project Structure

```
src/
├── components/
│   ├── TopMenu.jsx          # Navigation component
│   └── TopMenu.css
├── pages/
│   ├── HomePage.jsx         # Landing page
│   ├── HomePage.css
│   ├── BabyGrootPage.jsx    # Animation pages
│   ├── ThreeDBeePage.jsx
│   ├── FloweringTreePage.jsx
│   ├── MyauTreePage.jsx
│   └── MonkeyBusinessPage.jsx
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css               # Global styles
```

## Adding New Animations

1. Create a new page component in `src/pages/`
2. Add the route to `src/App.jsx`
3. Add the menu item to `src/components/TopMenu.jsx`
4. Integrate your animation code

## License

MIT License - feel free to use this project for your own animations! 