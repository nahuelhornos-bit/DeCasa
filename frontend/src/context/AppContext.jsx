import { createContext, useState, useContext } from 'react'

export const AppContext = createContext()

const usuariosIniciales = [
  { id: 1, nombre: "Nahuel", apellido: "Hornos", email: "nahuel.hornos@gmail.com", password: "1234", rol: "cocinero", barrio: "Pocitos" },
  { id: 2, nombre: "Andre", apellido: "Lopez", email: "andre.lopez@gmail.com", password: "1234", rol: "admin", barrio: "Malvin" },
  { id: 3, nombre: "Erika", apellido: "Lopez", email: "erika.lopez@gmail.com", password: "1234", rol: "cliente", barrio: "Centro" },
  { id: 4, nombre: "Caetano", apellido: "De Souza", email: "caetano.desouza@gmail.com", password: "1234", rol: "cocinero", barrio: "Prado" }
]

const platosIniciales = [
  { id: 1, nombre: "Guiso de lentejas", cocinero: "Maria G.", barrio: "Pocitos", descripcion: "Lentejas con verduras de estacion.", precio: 95, porciones: 6, solidaria: false, imagenUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80" },
  { id: 2, nombre: "Fideos con tuco", cocinero: "Roberto F.", barrio: "Centro", descripcion: "Tuco casero con carne picada.", precio: 80, porciones: 4, solidaria: false, imagenUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80" },
  { id: 3, nombre: "Tarta de verduras", cocinero: "Lucia M.", barrio: "Malvin", descripcion: "Tarta de zapallito y morron.", precio: 110, porciones: 8, solidaria: false, imagenUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80" },
  { id: 4, nombre: "Vianda solidaria", cocinero: "Ana T.", barrio: "Centro", descripcion: "Porcion completa para quien la necesita.", precio: 50, porciones: 10, solidaria: true, imagenUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80" },
  { id: 5, nombre: "Arroz con pollo", cocinero: "Carlos P.", barrio: "Prado", descripcion: "Arroz con pollo al verdeo y pimientos.", precio: 90, porciones: 5, solidaria: false, imagenUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80" },
  { id: 6, nombre: "Sopa de verduras", cocinero: "Elena R.", barrio: "Aguada", descripcion: "Sopa casera con papa, zanahoria y puerro.", precio: 70, porciones: 6, solidaria: false, imagenUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80" },
  { id: 7, nombre: "Milanesas napolitanas", cocinero: "Jorge V.", barrio: "Cerrito", descripcion: "Milanesas con salsa de tomate y mozzarella.", precio: 120, porciones: 4, solidaria: false, imagenUrl: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&q=80" },
  { id: 8, nombre: "Porcion solidaria de guiso", cocinero: "Rosa N.", barrio: "Reducto", descripcion: "Guiso de arroz para quien mas lo necesita.", precio: 40, porciones: 12, solidaria: true, imagenUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80" }
]

export function AppProvider({ children }) {
  const [carrito, setCarrito] = useState([])
  const [usuarioLogueado, setUsuarioLogueado] = useState(null)
  const [usuarios, setUsuarios] = useState(usuariosIniciales)
  const [platos, setPlatos] = useState(platosIniciales)

  async function publicarPlato(nuevoPlato) {
    const platoCompleto = {
      ...nuevoPlato,
      cocinero: usuarioLogueado.nombre,
      barrio: usuarioLogueado.barrio,
      solidaria: false,
    }
    const res = await fetch('http://localhost:3000/platos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(platoCompleto),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'No se pudo publicar el plato')
    }
    setPlatos(prev => [...prev, data])
    return data
  }

  function quitarTodoElCarrito() {
  setCarrito([])
}

  function agregarAlCarrito(plato) {
    setCarrito([...carrito, plato])
  }

  function quitarDelCarrito(index) {
    const nuevo = carrito.filter((_, i) => i !== index)
    setCarrito(nuevo)
  }

  function login(usuario) {
    setUsuarioLogueado(usuario)
  }

  function logout() {
    setUsuarioLogueado(null)
    setCarrito([])
  }

async function registrarUsuario(nuevoUsuario) {
    const res = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'No se pudo registrar el usuario')
    }
    setUsuarios(prev => [...prev, data])
    return data
  }

  return (
    <AppContext.Provider value={{
      carrito, agregarAlCarrito, quitarDelCarrito, quitarTodoElCarrito,
      usuarioLogueado, login, logout,
      usuarios, registrarUsuario,
      platos, publicarPlato,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}