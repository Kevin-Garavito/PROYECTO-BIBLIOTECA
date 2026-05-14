# Backend - BiblioSearch

## Descripción

Backend API REST para BiblioSearch construido con Express.js y Node.js.

## Estructura

```
backend/
├── src/
│   ├── server.ts      # Servidor Express
│   ├── db.ts          # Operaciones de base de datos
│   └── seed.ts        # Script de inicialización
├── package.json       # Dependencias backend
└── tsconfig.json      # Configuración TypeScript
```

## Scripts

- `npm run dev` - Ejecutar servidor en desarrollo
- `npm run seed` - Inicializar base de datos con datos de ejemplo
- `npm test` - Ejecutar tests

## Variables de Entorno

Crear archivo `.env.local` en la raíz del backend:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=bibliography_db
PORT=3001
NODE_ENV=development
```

## Endpoints API

### Libros

- `GET /api/books` - Obtener todos los libros
- `GET /api/books/:id` - Obtener libro por ID
- `POST /api/books` - Crear nuevo libro
- `PUT /api/books/:id` - Actualizar libro
- `DELETE /api/books/:id` - Eliminar libro

### Imágenes

- `POST /api/upload/:bookId` - Subir portada de libro

## Conexión a Base de Datos

El backend se conecta automáticamente a MySQL en el puerto 3306.

**Requisito**: MySQL debe estar corriendo localmente o configurarse la URL de conexión en `.env.local`.

---

**Puerto por defecto**: 3001
