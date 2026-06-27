import { useNavigate } from 'react-router-dom'

const dimensiones = [
  {
    titulo: 'Comida nutritiva a menor costo',
    texto: 'Comida casera, real y a precio justo para quienes no pueden pagar lo que cuesta una cadena de comida rapida.',
    color: 'orange',
  },
  {
    titulo: 'Ingresos dignos para cocineros',
    texto: 'Mujeres, adultos mayores y personas sin empleo formal pueden vender lo que cocinan desde su casa, sin intermediarios.',
    color: 'green',
  },
  {
    titulo: 'Economia del barrio',
    texto: 'La plata circula entre vecinos y se queda en la zona, en vez de irse a una multinacional.',
    color: 'orange',
  },
  {
    titulo: 'Convivencia y solidaridad',
    texto: 'La comida une a la gente del mismo barrio. Compartir lo que uno cocina es un acto profundamente humano.',
    color: 'green',
  },
]

const sentimientos = [
  'Me siento en casa',
  'Mi infancia',
  'Sabor a hogar',
  'Satisfaccion plena',
  'La vida es bella',
]

const frecuencia = [
  { label: '1 vez al mes', color: '#b1543a' },
  { label: '2 veces', color: '#e0a458' },
  { label: '3 veces', color: '#6e7d4e' },
  { label: '4 o mas', color: '#9a9488' },
]

function NosotrosPage() {
  const navigate = useNavigate()

  return (
    <div>
      <section className="bg-orange-500 py-20 px-8 text-center">
        <p className="text-gray-900 font-bold text-sm tracking-widest mb-2">POR QUE EXISTIMOS</p>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Nosotros</h1>
        <p className="text-gray-900 text-lg max-w-2xl mx-auto opacity-80">
          Con lo que sale una hamburguesa en una cadena, una familia podria comprar
          los ingredientes para un guiso que alimenta a veinte. Esa paradoja nos hizo arrancar.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-8 py-14">
        <p className="text-orange-600 font-bold text-sm tracking-widest mb-2">FILOSOFIA: DIGNIDAD Y EMPATIA</p>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Comer bien no deberia ser un lujo</h2>
        <p className="text-gray-600 mb-4">
          El derecho a alimentarse bien no tendria que depender de cuanto gana cada uno. Al mismo tiempo,
          hay un monton de gente que cocina increible desde su casa pero no tiene donde ofrecer sus platos
          ni generar un ingreso a partir de eso.
        </p>
        <p className="text-gray-600">
          <strong className="text-orange-600">De Casa</strong> nace para responder a esas dos realidades:
          conecta cocineros caseros con personas que buscan comida real, nutritiva y accesible en su zona.
          No vendemos solo comida, ofrecemos cercania, calidez y confianza.
        </p>
      </section>

      <section className="bg-orange-400 px-8 py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">Como aportamos a la dignidad</h2>
          <p className="text-gray-900 opacity-75 text-center mb-8 max-w-xl mx-auto">
            Una vida digna no es solo sobrevivir: se construye en comunidad, en la solidaridad entre vecinos.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {dimensiones.map((d) => (
              <div
                key={d.titulo}
                className={`rounded-2xl p-6 border-2 ${
                  d.color === 'orange'
                    ? 'bg-orange-50 border-orange-200'
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <h3 className={`font-bold mb-2 ${d.color === 'orange' ? 'text-orange-600' : 'text-green-700'}`}>
                  {d.titulo}
                </h3>
                <p className="text-gray-600 text-sm">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 py-14">
        <p className="text-green-700 font-bold text-sm tracking-widest mb-2">VALIDACION</p>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Lo que nos dijo la gente</h2>
        <p className="text-gray-600 mb-10">
          Encuestamos a 15 personas que usan apps de delivery como PedidosYa o Rappi para entender sus habitos.
        </p>

        <div className="grid grid-cols-2 gap-8 items-center mb-12">
          <div className="bg-white rounded-2xl p-6 border-2 border-orange-200">
            <p className="font-bold text-gray-900 mb-5">Cuantas veces pedis delivery al mes?</p>
            <div className="flex items-center gap-6">
              <div className="relative w-40 h-40 shrink-0">
                <div
                  className="w-40 h-40 rounded-full"
                  style={{
                    background:
                      'conic-gradient(#b1543a 0% 60%, #e0a458 60% 87%, #6e7d4e 87% 94%, #9a9488 94% 100%)',
                  }}
                />
              </div>
              <ul className="flex flex-col gap-2 text-sm">
                {frecuencia.map((f) => (
                  <li key={f.label} className="flex items-center gap-2 text-gray-600">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: f.color }} />
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
            <p className="font-bold text-gray-900 mb-4">Que sentis al comer comida casera?</p>
            <ul className="flex flex-col gap-2">
              {sentimientos.map((s) => (
                <li
                  key={s}
                  className="bg-white border-l-4 border-orange-400 rounded-md px-3 py-2 text-gray-700 italic text-sm"
                >
                  "{s}"
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-orange-50 rounded-2xl p-8 border-2 border-orange-200 text-center">
          <p className="text-5xl font-extrabold text-orange-600 mb-2">60%</p>
          <p className="text-gray-700 max-w-md mx-auto mb-5">
            pide delivery solo una vez al mes y elige lo casero por sobre el resto, asociandolo con sentirse en casa.
          </p>
          <p className="text-orange-700 italic font-semibold">
            "Sabor a hogar, mi infancia, me siento en casa."
          </p>
        </div>
      </section>

      <section className="bg-gray-900 px-8 py-14 text-center">
        <h2 className="text-2xl font-extrabold text-orange-400 mb-3">Comida que alimenta el corazon y el estomago</h2>
        <p className="text-orange-100 opacity-80 max-w-xl mx-auto mb-8">
          Sumate a De Casa y descubri los platos que estan cocinando en tu barrio hoy.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-500 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-orange-400 transition-colors"
          >
            Ver platos
          </button>
          <button
            onClick={() => navigate('/registro')}
            className="bg-white text-gray-900 border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-transparent hover:text-white transition-colors"
          >
            Registrarse
          </button>
        </div>
      </section>
    </div>
  )
}

export default NosotrosPage
