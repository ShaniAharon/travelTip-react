import {Routes, Route} from 'react-router-dom'
import {AppHeader} from './cmps/AppHeader'
import {MapApp} from './views/MapApp.jsx'

function App() {
  return (
    <section className="app-container container">
      <AppHeader />
      <Routes>
        <Route path="/" element={<MapApp />}></Route>
      </Routes>
    </section>
  )
}

export default App
