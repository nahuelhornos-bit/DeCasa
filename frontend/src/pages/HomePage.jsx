import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function HomePage() {
  const navigate = useNavigate()
  const { usuarioLogueado } = useApp()

  return (
    <div>
      <section className="bg-orange-500 py-20 px-8 text-center">
        <p className="text-gray-900 font-bold text-sm tracking-widest mb-2">UY COMIDA CASERA EN URUGUAY</p>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-3">De Casa</h1>
        <p className="text-gray-900 text-lg mb-8 opacity-80">Plataforma de comida casera accesible</p>
        <div className="flex gap-4 justify-center">
          {!usuarioLogueado && (
            <button
              onClick={() => navigate('/registro')}
              className="bg-gray-900 text-orange-400 px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              Registrarse
            </button>
          )}
          <button
            onClick={() => navigate('/nosotros')}
            className="bg-white text-gray-900 border-2 border-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-orange-400 transition-colors"
          >
            Nosotros
          </button>
        </div>
      </section>

      <section className="bg-orange-400 px-8 py-12 ">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          <div className="bg-orange-50 rounded-2xl p-6 text-center border-2 border-orange-200">
            <p className="font-bold text-gray-900 mb-2">Precios en $UY</p>
            <p className="text-gray-600 text-sm">Viandas desde $80. Comida real a precio justo.</p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-6 text-center border-2 border-orange-200">
            <p className="font-bold text-gray-900 mb-2">Retiro en el barrio</p>
            <p className="text-gray-600 text-sm">Elegis el cocinero mas cerca de tu casa.</p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-6 text-center border-2 border-orange-200">
            <p className="font-bold text-gray-900 mb-2">Efectivo o digital</p>
            <p className="text-gray-600 text-sm">Pagas como mas te guste.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage