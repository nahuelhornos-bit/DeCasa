import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function CheckoutPage() {
  const navigate = useNavigate()
  const { carrito, quitarTodoElCarrito } = useApp()

  const [metodoPago, setMetodoPago] = useState('tarjeta')
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false)

  const [form, setForm] = useState({
    numeroTarjeta: '',
    nombreTarjeta: '',
    vencimiento: '',
    cvv: '',
    montoEfectivo: '',
  })

  const total = carrito.reduce((suma, plato) => suma + plato.precio, 0)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleConfirmar(e) {
    e.preventDefault()
    // aca va la llamada al backend cuando lo tengamos mi gente
    setPedidoConfirmado(true)
    quitarTodoElCarrito()
  }

  if (carrito.length === 0 && !pedidoConfirmado) {
    return (
      <div className="max-w-2xl mx-auto px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">No hay nada para pagar</h2>
        <button
          onClick={() => navigate('/menu')}
          className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          Ver menu de hoy
        </button>
      </div>
    )
  }

  if (pedidoConfirmado) {
    return (
      <div className="max-w-md mx-auto px-8 py-20 text-center">
        <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-10">
          <p className="text-4xl mb-4">✓</p>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Pedido realizado con exito</h2>
          <p className="text-gray-500 mb-6">
            Coordina el retiro de tu pedido directamente con el cocinero.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            Volver al menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Checkout</h2>
      <p className="text-gray-500 mb-8">Elegi como queres pagar tu pedido</p>

      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl px-6 py-4 mb-8 flex items-center justify-between">
        <span className="text-gray-600">Total a pagar</span>
        <span className="text-2xl font-extrabold text-orange-600">${total}</span>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setMetodoPago('tarjeta')}
          className={`flex-1 py-3 rounded-full text-sm font-semibold border-2 transition-colors ${
            metodoPago === 'tarjeta' ? 'bg-orange-500 text-gray-900 border-orange-500' : 'bg-white text-gray-600 border-orange-200'
          }`}
        >
          Tarjeta
        </button>
        <button
          type="button"
          onClick={() => setMetodoPago('mercadopago')}
          className={`flex-1 py-3 rounded-full text-sm font-semibold border-2 transition-colors ${
            metodoPago === 'mercadopago' ? 'bg-orange-500 text-gray-900 border-orange-500' : 'bg-white text-gray-600 border-orange-200'
          }`}
        >
          MercadoPago
        </button>
        <button
          type="button"
          onClick={() => setMetodoPago('efectivo')}
          className={`flex-1 py-3 rounded-full text-sm font-semibold border-2 transition-colors ${
            metodoPago === 'efectivo' ? 'bg-orange-500 text-gray-900 border-orange-500' : 'bg-white text-gray-600 border-orange-200'
          }`}
        >
          Efectivo
        </button>
      </div>

      <div className="bg-white border-2 border-orange-200 rounded-2xl p-8 shadow-sm">
        <form onSubmit={handleConfirmar} className="flex flex-col gap-4">

          {metodoPago === 'tarjeta' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Numero de tarjeta</label>
                <input
                  name="numeroTarjeta"
                  value={form.numeroTarjeta}
                  onChange={handleChange}
                  placeholder="1234 1234 1234 1234"
                  required
                  maxLength={19}
                  className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre en la tarjeta</label>
                <input
                  name="nombreTarjeta"
                  value={form.nombreTarjeta}
                  onChange={handleChange}
                  placeholder="Como figura en la tarjeta"
                  required
                  className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Vencimiento</label>
                  <input
                    name="vencimiento"
                    value={form.vencimiento}
                    onChange={handleChange}
                    placeholder="MM/AA"
                    required
                    maxLength={5}
                    className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">CVV</label>
                  <input
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                    maxLength={3}
                    className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </>
          )}

          {metodoPago === 'mercadopago' && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 text-center text-gray-500 text-sm">
              Vas a ser redirigido a MercadoPago para completar el pago de ${total}.
            </div>
          )}

          {metodoPago === 'efectivo' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Monto a pagar en efectivo</label>
              <input
                name="montoEfectivo"
                type="number"
                value={form.montoEfectivo}
                onChange={handleChange}
                placeholder={`Minimo $${total}`}
                required
                min={total}
                className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
              />
              <p className="text-xs text-gray-400 mt-1">Pagas directo al cocinero al retirar tu pedido.</p>
            </div>
          )}

          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 mt-2 transition-colors"
          >
            Confirmar pedido
          </button>

        </form>
      </div>
    </div>
  )
}

export default CheckoutPage
