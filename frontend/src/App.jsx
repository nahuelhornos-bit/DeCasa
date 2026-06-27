import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import NosotrosPage from './pages/NosotrosPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import CarritoPage from './pages/CarritoPage'
import CheckoutPage from './pages/CheckoutPage'
import PublicarPlatoPage from './pages/PublicarPlatoPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/publicar-plato" element={<PublicarPlatoPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App