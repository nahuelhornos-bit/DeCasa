import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login, usuarios } = useApp()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const usuario = usuarios.find(u => u.email === form.email && u.password === form.password)
    if (!usuario) {
      setError('Email o contraseña incorrectos')
      return
    }
    login(usuario)
    navigate('/menu')
  }

  return (
    <div className="max-w-md mx-auto px-8 py-16">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">Ingresar</h2>
      <p className="text-gray-500 text-center mb-8">Accede a tu cuenta de De Casa</p>

      <div className="bg-white border-2 border-orange-200 rounded-2xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 mt-2 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        No tenes cuenta?{' '}
        <span onClick={() => navigate('/registro')} className="text-orange-600 font-semibold cursor-pointer underline">
          Registrate aca
        </span>
      </p>
    </div>
  )
}

export default LoginPage
