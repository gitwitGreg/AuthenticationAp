import '../src/index.css'
import Register from './components/Register'
import Navbar from './components/Navbar'
import { BrowserRouter,Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/Register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
