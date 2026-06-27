import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function CarritoPage() {
  const navigate = useNavigate()
  const { carrito, quitarDelCarrito } = useApp()

  const total = carrito.reduce((suma, plato) => suma + plato.precio, 0)

  if (carrito.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Tu carrito esta vacio</h2>
        <button
          onClick={() => navigate('/menu')}
          className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          Ver menu de hoy
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Tu pedido</h2>

      <div className="flex flex-col gap-4 mb-8">
        {carrito.map((plato, index) => (
          <div key={index} className="flex items-center justify-between bg-white border-2 border-orange-200 rounded-xl px-6 py-4">
            <div>
              <p className="font-semibold text-gray-900">{plato.nombre}</p>
              <p className="text-sm text-gray-400">{plato.cocinero} · {plato.barrio}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold text-orange-600">${plato.precio}</p>
              <button
                onClick={() => quitarDelCarrito(index)}
                className="text-gray-400 hover:text-red-500 text-sm"
              >
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-orange-200 pt-6 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-extrabold text-orange-600">${total}</p>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  )
}

export default CarritoPage
