# BiblioSearch - Sistema de Gestión de Biblioteca

Sistema moderno para buscar y gestionar libros en la biblioteca del Politécnico Colombiano Jaime Isaza Cadavid.

## 🚀 Características

- **Base de datos persistente**: Almacenamiento JSON con guardado automático
- **Gestión de imágenes**: Carga y almacenamiento de portadas de libros
- **API REST**: Servidor Express para operaciones CRUD
- **Búsqueda en tiempo real**: Busca por título, autor, ISBN, categoría
- **Mapa interactivo**: Localiza libros en los bloques de la biblioteca
- **Panel administrativo**: Agregar, editar y eliminar libros

## 📋 Requisitos

- Node.js 16+
- npm o yarn

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Poblar la base de datos con libros de ejemplo
npm run seed
```

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo (frontend + backend simultáneamente)
npm run dev

# O iniciar solo el frontend
npm run dev:frontend

# O iniciar solo el backend
npm run server
```

La aplicación estará disponible en:
- Frontend: `http://localhost:8080` o `http://localhost:8081`
- Backend API: `http://localhost:3001`

## 📁 Estructura del Proyecto

```
book-finder-hub/
├── server/                  # Backend Express
│   ├── server.ts           # Servidor principal
│   ├── db.ts               # Gestión de almacenamiento JSON
│   ├── seed.ts             # Script para poblar DB
│   └── tsconfig.json       # Configuración TypeScript
├── src/
│   ├── pages/
│   │   ├── Index.tsx       # Página principal
│   │   └── Admin.tsx       # Panel administrativo
│   ├── components/         # Componentes UI
│   ├── services/
│   │   └── bookService.ts  # Cliente API
│   ├── data/
│   │   └── books.ts        # Tipos e interfaces
│   └── ...
├── public/
│   ├── uploads/            # Imágenes de portadas
│   └── ...
├── books.json              # Base de datos JSON (generado)
└── package.json
```

## 🔐 Autenticación

El panel admin está protegido con contraseña:

**Contraseña demo**: `admin123`

⚠️ **Nota**: En producción, usar un sistema de autenticación real (JWT, OAuth, etc).

## 💾 Base de Datos

### Estructura (JSON)

```json
[
  {
    "id": "1716285600000",
    "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    "category": "Literatura",
    "isbn": "978-0-06-088328-7",
    "year": 1967,
    "available": true,
    "coverUrl": "/uploads/1716285600000-123456.jpg",
    "block": "B",
    "shelf": 1,
    "position": 3,
    "description": "Obra maestra del realismo mágico..."
  }
]
```

### Archivo de Almacenamiento

- **Ubicación**: `books.json` (raíz del proyecto)
- **Formato**: JSON Array
- **Persistencia**: Guardado automático en cada cambio
- **Sincronización**: Tiempo real entre frontend y backend

## 🖼️ Gestión de Imágenes

Las imágenes de portadas se guardan en `/public/uploads/` con nombres únicos basados en timestamps.

**Límites**:
- Tamaño máximo: 10MB
- Formatos: JPEG, PNG, GIF, WebP
- Al eliminar un libro, la imagen se elimina automáticamente

## 🔌 API REST

### Endpoints

#### Libros
- `GET /api/books` - Obtener todos los libros
- `GET /api/books/:id` - Obtener un libro
- `POST /api/books` - Crear libro
- `PUT /api/books/:id` - Actualizar libro
- `DELETE /api/books/:id` - Eliminar libro
- `POST /api/books/:id/cover` - Subir portada

### Ejemplo de Uso

```javascript
// Obtener libros
fetch('http://localhost:3001/api/books')
  .then(res => res.json())
  .then(books => console.log(books))

// Crear libro
fetch('http://localhost:3001/api/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Mi Libro',
    author: 'Autor',
    category: 'Ficción',
    isbn: '123-456-789',
    year: 2024,
    available: true,
    block: 'A',
    shelf: 1,
    position: 1,
    description: 'Descripción del libro'
  })
})
```

## 🛠️ Scripts

```bash
npm run dev              # Desarrollo (frontend + backend)
npm run dev:frontend    # Solo frontend
npm run server          # Solo backend
npm run seed            # Poblar DB con ejemplos
npm run build           # Build para producción
npm run preview         # Previsualizar build
npm run lint            # Validar código
npm run test            # Ejecutar tests
npm run test:watch      # Tests en modo watch
```

## 📝 Notas

- La base de datos JSON persiste automáticamente en `books.json`
- Las imágenes se guardan en el servidor, no como base64
- Los cambios son permanentes entre sesiones
- La carpeta `/public/uploads` es ignorada en git
- El archivo `books.json` también es ignorado en git (se regenera en cada instalación)

## 🤝 Contribuciones

Para cambios, por favor:
1. Crea un branch (`git checkout -b feature/AmazingFeature`)
2. Commit cambios (`git commit -m 'Add AmazingFeature'`)
3. Push al branch (`git push origin feature/AmazingFeature`)
4. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso interno del Politécnico Colombiano Jaime Isaza Cadavid.
