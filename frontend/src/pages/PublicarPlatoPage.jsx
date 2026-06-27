import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function PublicarPlatoPage() {
  const navigate = useNavigate()
  const { usuarioLogueado, publicarPlato } = useApp()

  if (!usuarioLogueado || usuarioLogueado.rol !== 'cocinero') {
    navigate('/menu')
    return null
  }

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    porciones: '',
    imagenUrl: '',
  })
  const [exito, setExito] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [subiendo, setSubiendo] = useState(false)
  const [errorSubida, setErrorSubida] = useState('')
  const [publicando, setPublicando] = useState(false)
  const [errorPublicar, setErrorPublicar] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleArchivoImagen(e) {
    const archivo = e.target.files[0]
    if (!archivo) return

    setErrorSubida('')
    setPreviewUrl(URL.createObjectURL(archivo))
    setSubiendo(true)

    const formData = new FormData()
    formData.append('imagen', archivo)

    try {
      const res = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorSubida(data.error || 'No se pudo subir la imagen')
        setPreviewUrl(null)
        return
      }
      setForm(prev => ({ ...prev, imagenUrl: data.url }))
    } catch (err) {
      setErrorSubida('No se pudo conectar con el servidor. Esta corriendo el backend?')
      setPreviewUrl(null)
    } finally {
      setSubiendo(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorPublicar('')
    setPublicando(true)

    try {
      await publicarPlato({
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: Number(form.precio),
        porciones: Number(form.porciones),
        imagenUrl: form.imagenUrl,
      })
      setExito(true)
      setForm({ nombre: '', descripcion: '', precio: '', porciones: '', imagenUrl: '' })
      setPreviewUrl(null)
      setErrorSubida('')
    } catch (err) {
      setErrorPublicar(
        err.message === 'Failed to fetch'
          ? 'No se pudo conectar con el servidor. Esta corriendo el backend?'
          : err.message
      )
    } finally {
      setPublicando(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Publicar un plato</h2>
      <p className="text-gray-500 mb-2">
        Hola {usuarioLogueado.nombre}, completa los datos del plato que queres ofrecer hoy.
      </p>
      <p className="text-sm text-gray-500 mb-8">
        Se va a publicar en tu barrio:{' '}
        <span className="font-semibold text-orange-600">{usuarioLogueado.barrio}</span>
      </p>

      {exito && (
        <div className="bg-green-50 border-2 border-green-300 text-green-700 rounded-xl px-6 py-4 mb-6 flex items-center justify-between">
          <p className="font-semibold">Plato publicado con exito!</p>
          <button onClick={() => navigate('/menu')} className="text-sm underline">
            Ver en el menu
          </button>
        </div>
      )}

      <div className="bg-white border-2 border-orange-200 rounded-2xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del plato</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Guiso de lentejas"
              required
              className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descripcion, ingredientes y preparacion</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Conta que lleva el plato y como lo preparas..."
              required
              rows={4}
              className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Precio por porcion ($UY)</label>
              <input
                name="precio"
                type="number"
                value={form.precio}
                onChange={handleChange}
                placeholder="Ej: 90"
                required
                min="1"
                className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Cantidad de porciones</label>
              <input
                name="porciones"
                type="number"
                value={form.porciones}
                onChange={handleChange}
                placeholder="Ej: 6"
                required
                min="1"
                className="w-full border-2 border-orange-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Foto del plato</label>
    <input
  type="file"
  accept="image/*"
  onChange={handleArchivoImagen}
  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-orange-500 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-orange-600"
/>
            {subiendo && (
              <p className="text-xs text-orange-500 mt-1">Subiendo imagen...</p>
            )}

            {errorSubida && (
              <div className="mt-3 rounded-xl w-full px-4 py-3 bg-red-50 border-2 border-red-200 text-red-600 text-sm">
                {errorSubida}
              </div>
            )}

            {previewUrl && !subiendo && (
              <img
                src={previewUrl}
                alt="preview"
                className="mt-3 rounded-xl w-full h-40 object-cover border-2 border-orange-200"
              />
            )}
          </div>

          {errorPublicar && (
            <div className="rounded-xl w-full px-4 py-3 bg-red-50 border-2 border-red-200 text-red-600 text-sm">
              {errorPublicar}
            </div>
          )}

          <button
            type="submit"
            disabled={subiendo || publicando}
            className="bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 mt-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {publicando ? 'Publicando...' : subiendo ? 'Subiendo imagen...' : 'Publicar plato'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default PublicarPlatoPage