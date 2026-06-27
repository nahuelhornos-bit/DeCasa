import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const barrios = [
  'Pocitos', 'Centro', 'Cordon', 'Ciudad Vieja', 'Malvin', 'Buceo',
  'Parque Rodo', 'Punta Carretas', 'Prado', 'Aguada', 'Cerrito',
  'Reducto', 'La Blanqueada', 'Tres Cruces', 'Carrasco', 'Union',
]

function RegisterForm() {
  const navigate = useNavigate()
  const { registrarUsuario, login } = useApp()

  const [rol, setRol] = useState('cliente')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    barrio: '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setEnviando(true)

    const nuevoUsuario = {
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      password: form.password,
      rol: rol,
      barrio: form.barrio,
    }

    try {
      const usuarioCreado = await registrarUsuario(nuevoUsuario)
      login(usuarioCreado)
      navigate('/menu')
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'No se pudo conectar con el servidor. Esta corriendo el backend?'
          : err.message
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div>
      <div className="flex mb-6 border-2 border-orange-500 rounded-full overflow-hidden">
        <button
          type="button"
          onClick={() => setRol('cliente')}
          className={`flex-1 py-2 text-sm font-semibold transition-colors ${
            rol === 'cliente' ? 'bg-orange-500 text-gray-900' : 'bg-white text-orange-500'
          }`}
        >
          Soy cliente
        </button>
        <button
          type="button"
          onClick={() => setRol('cocinero')}
          className={`flex-1 py-2 text-sm font-semibold transition-colors ${
            rol === 'cocinero' ? 'bg-orange-500 text-gray-900' : 'bg-white text-orange-500'
          }`}
        >
          Soy cocinero
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
            className="border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
          />
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            required
            className="border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
          />
        </div>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
          className="border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
        />

        <div>
          <select
            name="barrio"
            value={form.barrio}
            onChange={handleChange}
            required
            className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500 bg-white text-gray-700"
          >
            <option value="">Elegi tu barrio</option>
            {barrios.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            {rol === 'cliente'
              ? 'Vas a ver los platos disponibles en tu barrio.'
              : 'Tus platos se van a publicar en este barrio.'}
          </p>
        </div>

        {error && (
          <div className="rounded-xl w-full px-4 py-3 bg-red-50 border-2 border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 mt-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {enviando ? 'Registrando...' : `Registrarme como ${rol}`}
        </button>
      </form>
    </div>
  )
}

export default RegisterForm