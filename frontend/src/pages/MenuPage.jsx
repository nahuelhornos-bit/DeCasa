import PlatoCard from '../components/PlatoCard'
import { useApp } from '../context/AppContext'

function MenuPage() {
  const { agregarAlCarrito, carrito, platos, usuarioLogueado } = useApp()

  const platosVisibles = usuarioLogueado
    ? platos.filter(p => p.barrio === usuarioLogueado.barrio)
    : platos

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Platos de hoy</h2>
          {usuarioLogueado && (
            <p className="text-gray-500 text-sm mt-1">
              Mostrando platos en <span className="font-semibold text-orange-600">{usuarioLogueado.barrio}</span>
            </p>
          )}
        </div>
        <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full border-2 border-green-200">
          {carrito.length} en el carrito
        </span>
      </div>

      {platosVisibles.length === 0 ? (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-10 text-center">
          <p className="text-gray-700 font-semibold mb-1">Todavia no hay platos en tu barrio</p>
          <p className="text-gray-500 text-sm">Volve mas tarde, los cocineros de tu zona estan cocinando.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {platosVisibles.map(plato => (
            <PlatoCard key={plato.id} plato={plato} onAgregar={agregarAlCarrito} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuPage