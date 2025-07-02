import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopMenu from './components/TopMenu'
import HomePage from './pages/HomePage'
import BabyGrootPage from './pages/BabyGrootPage'
import ThreeDBeePage from './pages/ThreeDBeePage'
import FloweringTreePage from './pages/FloweringTreePage'
import MyauTreePage from './pages/MyauTreePage'
import MonkeyBusinessPage from './pages/MonkeyBusinessPage'

function App() {
  return (
    <Router>
      <div className="app">
        <TopMenu />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/baby-groot" element={<BabyGrootPage />} />
            <Route path="/3d-bee" element={<ThreeDBeePage />} />
            <Route path="/flowering-tree" element={<FloweringTreePage />} />
            <Route path="/myau-tree" element={<MyauTreePage />} />
            <Route path="/monkey-business" element={<MonkeyBusinessPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App 