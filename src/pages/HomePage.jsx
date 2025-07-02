import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const animations = [
    { path: '/baby-groot', label: 'Baby Groot', description: 'Interactive tree animation' },
    { path: '/3d-bee', label: '3D Bee', description: 'Three-dimensional bee visualization' },
    { path: '/flowering-tree', label: 'Flowering Tree', description: 'Beautiful flowering animation' },
    { path: '/myau-tree', label: 'Myau Tree', description: 'Unique tree visualization' },
    { path: '/monkey-business', label: 'Monkey Business', description: 'Playful monkey animation' }
  ]

  return (
    <div className="page-container">
      <div className="home-content">
        <h1>Welcome to WhisperTree</h1>
        <p className="subtitle">A collection of beautiful interactive animations</p>
        
        <div className="animations-grid">
          {animations.map((animation) => (
            <Link key={animation.path} to={animation.path} className="animation-card">
              <h3>{animation.label}</h3>
              <p>{animation.description}</p>
              <span className="view-button">View Animation →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage 