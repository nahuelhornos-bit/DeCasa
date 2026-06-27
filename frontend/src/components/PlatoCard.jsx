import { useState } from 'react'

function PlatoCard({ plato, onAgregar }) {
  const [errorImagen, setErrorImagen] = useState(false)

  const mostrarImagen = plato.imagenUrl && !errorImagen

  return (
    <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="bg-orange-100 h-32 flex items-center justify-center text-orange-400 text-xs overflow-hidden">
        {mostrarImagen ? (
          <img
            src={plato.imagenUrl}
            alt={plato.nombre}
            className="w-full h-full object-cover"
            onError={() => setErrorImagen(true)}
          />
        ) : (
          <span>
            {plato.imagenUrl ? 'No se pudo cargar la imagen' : 'Sin foto'}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{plato.cocinero}</p>
        <p className="font-bold text-gray-900 text-lg mb-1">{plato.nombre}</p>
        <p className="text-gray-500 text-sm mb-4">{plato.descripcion}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-600 font-extrabold text-xl">${plato.precio}</p>
            <p className="text-gray-400 text-xs">{plato.porciones} porciones disponibles</p>
          </div>
          <button
            onClick={() => onAgregar(plato)}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            Pedir
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlatoCard
