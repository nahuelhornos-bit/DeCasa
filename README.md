# DeCasa

**DeCasa** es una plataforma web que conecta cocineros caseros con personas que quieren comprar comida casera en su barrio. Incluye además una modalidad de **platos solidarios**, pensada para acercar viandas a quienes más lo necesitan.

El proyecto está dividido en dos partes:

- **Backend** — API REST construida con Node.js + Express.
- **Frontend** — Single Page Application construida con React + Vite + Tailwind CSS.

---

## Características

-  Catálogo de platos caseros con datos del cocinero, barrio, precio y porciones.
-  Platos solidarios destacados aparte.
-  Registro e inicio de sesión de usuarios (clientes, cocineros y administradores).
-  Carrito de compras y proceso de checkout.
-  Publicación de platos con carga de imágenes.
-  Subida de imágenes al servidor mediante `multer`.

---

## Estructura del proyecto

```
DeCasa/
├── backend/
│   ├── controllers/        # Lógica de cada recurso (platos, usuarios, upload)
│   ├── data/               # Datos en memoria (platos.js, usuarios.js)
│   ├── routes/             # Definición de rutas de la API
│   ├── uploads/            # Imágenes subidas (se crea automáticamente)
│   └── index.js            # Punto de entrada del servidor
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/      # Navbar, Footer, PlatoCard, RegisterForm
    │   ├── context/         # AppContext (estado global)
    │   ├── pages/           # Home, Menu, Carrito, Checkout, Login, etc.
    │   ├── App.jsx
    │   └── main.jsx
    └── vite.config.js
```

---

## Instalación y ejecución

Cloná el repositorio y luego instalá las dependencias de cada parte por separado.

### 1. Backend

```bash
cd backend
npm install
npm start
```

El servidor queda corriendo en **http://localhost:3000**.

### 2. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La aplicación queda disponible en la URL que indique Vite (por defecto **http://localhost:5173**).

---

## API REST

Base URL: `http://localhost:3000`

### Platos — `/platos`

| Método | Ruta          | Descripción                  |
|--------|---------------|------------------------------|
| GET    | `/platos`     | Lista todos los platos       |
| GET    | `/platos/:id` | Obtiene un plato por su ID   |
| POST   | `/platos`     | Crea un nuevo plato          |
| PUT    | `/platos/:id` | Modifica un plato existente  |
| DELETE | `/platos/:id` | Elimina un plato             |

### Usuarios — `/usuarios`

| Método | Ruta            | Descripción                  |
|--------|-----------------|------------------------------|
| GET    | `/usuarios`     | Lista todos los usuarios     |
| GET    | `/usuarios/:id` | Obtiene un usuario por su ID |
| POST   | `/usuarios`     | Crea un nuevo usuario        |
| DELETE | `/usuarios/:id` | Elimina un usuario           |

### Imágenes — `/api/upload`

| Método | Ruta          | Descripción                                        |
|--------|---------------|----------------------------------------------------|
| POST   | `/api/upload` | Sube una imagen (campo `imagen`, solo `image/*`)   |

Las imágenes subidas se sirven de forma estática desde `/uploads`.

---

## Scripts disponibles

### Backend
| Comando      | Acción                       |
|--------------|------------------------------|
| `npm start`  | Inicia el servidor Express   |

### Frontend
| Comando           | Acción                                    |
|-------------------|-------------------------------------------|
| `npm run dev`     | Inicia el servidor de desarrollo (Vite)   |
| `npm run build`   | Genera el build de producción             |
| `npm run preview` | Previsualiza el build de producción       |

---

## Notas

- Las contraseñas de los usuarios de ejemplo se almacenan en texto plano y los datos son ficticios; este proyecto tiene fines educativos/demostrativos.
- Para un entorno de producción se recomienda incorporar una base de datos, hashing de contraseñas y validación de tokens en el backend.
