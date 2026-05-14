# Frontend - BiblioSearch

## Descripción

Frontend moderno de BiblioSearch construido con React 18, Vite, TypeScript y Tailwind CSS.

## Estructura

```
frontend/
├── src/
│   ├── components/    # Componentes React reutilizables
│   ├── pages/         # Páginas principales
│   ├── services/      # Servicios API
│   ├── data/          # Datos estáticos
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilidades
│   ├── assets/        # Imágenes y recursos
│   ├── App.tsx        # Componente raíz
│   └── main.tsx       # Entry point
├── public/            # Archivos estáticos
├── package.json       # Dependencias frontend
├── vite.config.ts     # Configuración Vite
├── tailwind.config.ts # Configuración Tailwind
└── tsconfig.json      # Configuración TypeScript
```

## Scripts

- `npm run dev` - Ejecutar servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Ver build de producción localmente
- `npm run lint` - Ejecutar linter
- `npm test` - Ejecutar tests unitarios
- `npm run test:watch` - Tests en modo watch

## Configuración de Desarrollo

### Requisitos

- Node.js v18+
- npm v9+

### Instalación

```bash
cd frontend
npm install
npm run dev
```

Abre http://localhost:8080 en tu navegador.

## Variables de Entorno

Crear archivo `.env.local` en la raíz del frontend (opcional):

```env
VITE_API_URL=http://localhost:3001/api
```

## Colores de Marca

- **Verde Primario**: `#009852` - `--brand-green` 
- **Dorado Secundario**: `#ffd400` - `--brand-gold`

## Componentes Principales

- `SearchBar` - Búsqueda de libros
- `BookCard` - Tarjeta de libro
- `LibraryMap` - Mapa interactivo de ubicaciones
- Componentes UI de shadcn/ui

## Páginas

- `/` - Página principal (búsqueda)
- `/admin` - Panel administrativo

---

**Puerto por defecto**: 8080
**Build output**: `dist/`
