import { Link, useLocation } from 'react-router-dom'
import './TopMenu.css'

function TopMenu() {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/baby-groot', label: 'Baby Groot' },
    { path: '/3d-bee', label: '3D Bee' },
    { path: '/flowering-tree', label: 'Flowering Tree' },
    { path: '/myau-tree', label: 'Myau Tree' },
    { path: '/monkey-business', label: 'Monkey Business' }
  ]

  return (
    <nav className="top-menu">
      <div className="menu-container">
        <div className="logo">
          <Link to="/">WhisperTree</Link>
        </div>
        <ul className="menu-items">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default TopMenu 