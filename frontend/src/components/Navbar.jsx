import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function Navbar() {
  const { usuarioLogueado, carrito, logout } = useApp()

  return (
    <nav className="w-full bg-orange-500 border-b-2 border-orange-600 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-xl font-extrabold text-gray-900">
        De Casa
      </Link>

      <div className="flex gap-3 items-center">
        <Link
          to="/nosotros"
          className="text-gray-900 font-semibold border-2 border-gray-900 px-4 py-1.5 rounded-full hover:bg-gray-900 hover:text-orange-400 transition-colors"
        >
          Nosotros
        </Link>

        {usuarioLogueado ? (
          <>
            <Link
              to="/menu"
              className="text-gray-900 font-semibold border-2 border-gray-900 px-4 py-1.5 rounded-full hover:bg-gray-900 hover:text-orange-400 transition-colors"
            >
              Ver menu
            </Link>

            {usuarioLogueado.rol === 'cocinero' && (
              <Link
                to="/publicar-plato"
                className="text-gray-900 font-semibold border-2 border-gray-900 px-4 py-1.5 rounded-full hover:bg-gray-900 hover:text-orange-400 transition-colors"
              >
                Publicar plato
              </Link>
            )}

            <Link
              to="/carrito"
              className="relative text-gray-900 font-semibold border-2 border-gray-900 px-4 py-1.5 rounded-full hover:bg-gray-900 hover:text-orange-400 transition-colors"
            >
              Carrito
              {carrito.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {carrito.length}
                </span>
              )}
            </Link>
            <span className="text-gray-900 text-sm font-medium opacity-80">Hola, {usuarioLogueado.nombre}</span>
            <button
              onClick={logout}
              className="text-gray-900 text-sm font-semibold underline hover:opacity-70"
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-900 font-semibold border-2 border-gray-900 px-4 py-1.5 rounded-full hover:bg-gray-900 hover:text-orange-400 transition-colors"
            >
              Ingresar
            </Link>
            <Link
              to="/registro"
              className="bg-green-600 text-white font-semibold px-4 py-1.5 rounded-full hover:bg-green-700 transition-colors"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
