# BiblioSearch - Sistema de Búsqueda Bibliográfica 📚

## 📋 Descripción

BiblioSearch es un sistema moderno de búsqueda y localización de material bibliográfico en tiempo real para la **Biblioteca del Politécnico Colombiano Jaime Isaza Cadavid**. Permite a estudiantes y docentes encontrar libros por título, autor, categoría o ISBN, y visualizar su ubicación exacta en las diferentes áreas de la biblioteca.

---

## 🏗️ Arquitectura y Metodología

### Modelo de Arquitectura: **Monorepo Cliente-Servidor con Capas**

```
┌─────────────────────────────────────────────────────┐
│              FRONTEND (React + Vite)                │
│  Componentes UI │ Pages │ Services │ Hooks │ Datos  │
└────────────────────┬────────────────────────────────┘
                     │ API REST (JSON)
                     │ Puerto: 3001
┌────────────────────┴────────────────────────────────┐
│           BACKEND (Express.js + Node.js)            │
│  Rutas API │ Controllers │ Database │ Middleware   │
└────────────────────┬────────────────────────────────┘
                     │ MySQL
                     │
              ┌──────┴──────┐
              │  Base de    │
              │   Datos     │
              └─────────────┘
```

### Características de la Arquitectura:

**✅ Ventajas:**
- **Separación de responsabilidades**: Frontend y backend completamente desacoplados
- **Escalabilidad**: Cada capa puede crecer independientemente
- **Mantenibilidad**: Fácil de entender y modificar código separado por capas
- **Deployment flexible**: Se pueden desplegar en servidores diferentes
- **Performance optimizado**: Frontend estático, backend procesando en paralelo
- **Fácil testing**: Cada capa se prueba independientemente
- **Reusabilidad**: La API puede usarse desde múltiples clientes (web, mobile, etc)

**⚠️ Desventajas:**
- **Mayor complejidad inicial**: Requiere coordinar 2 servidores en desarrollo
- **Latencia de red**: Cada request backend suma latencia
- **Sincronización**: Más difícil mantener sincronía entre capas en desarrollo
- **Debugging**: Los errores pueden estar en frontend, backend o en la comunicación
- **DevOps**: Requiere configuración de CORS y manejo de múltiples puertos

---

## 🚀 Instrucciones de Ejecución

### Requisitos Previos

```bash
- Node.js v18+ 
- npm v9+
- MySQL 8.0+
```

### Instalación y Ejecución

#### 1. **Instalación de dependencias**

```bash
npm install
```

#### 2. **Configurar Base de Datos**

Crea un archivo `.env` en la raíz (si no existe):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=bibliography_db
```

Inicializa la BD:

```bash
npm run seed
```

#### 3. **Ejecutar en Desarrollo (Ambos servidores)**

```bash
npm run dev
```

Esto abrirá:
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001

#### 4. **Ejecutar Solo Frontend**

```bash
npm run dev:frontend
```

#### 5. **Ejecutar Solo Backend**

```bash
npm run server
```

#### 6. **Build para Producción**

```bash
npm run build
```

Genera carpeta `dist/` lista para deployment.

---

## 📁 Estructura de Carpetas

```
book-finder-hub/
├── src/                          # Frontend
│   ├── components/               # Componentes React reutilizables
│   │   ├── ui/                  # Componentes de shadcn/ui
│   │   ├── BookCard.tsx         # Card individual de libro
│   │   ├── SearchBar.tsx        # Barra de búsqueda
│   │   └── LibraryMap.tsx       # Mapa interactivo de ubicaciones
│   ├── pages/                    # Páginas principales
│   │   ├── Index.tsx            # Página principal (búsqueda)
│   │   ├── Admin.tsx            # Panel administrativo
│   │   └── NotFound.tsx         # Página 404
│   ├── services/                 # Servicios API
│   │   └── bookService.ts       # Cliente HTTP para API backend
│   ├── data/                     # Datos estáticos
│   │   └── books.ts             # Array de libros de ejemplo
│   ├── hooks/                    # Custom hooks React
│   ├── lib/                      # Utilidades
│   ├── App.tsx                  # Componente raíz
│   └── main.tsx                 # Entry point
│
├── server/                        # Backend
│   ├── server.ts                # Servidor Express
│   ├── db.ts                    # Conexión y operaciones DB
│   ├── seed.ts                  # Script de inicialización
│   └── tsconfig.json            # Config TypeScript backend
│
├── public/                        # Archivos estáticos
│   ├── uploads/                 # Portadas de libros subidas
│   └── robots.txt
│
├── package.json                 # Dependencias principales
├── tsconfig.json                # Config TypeScript global
├── vite.config.ts               # Config Vite (bundler)
├── tailwind.config.ts           # Config Tailwind CSS
└── README.md                    # Este archivo
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18.3** - Librería UI
- **Vite 5.4** - Bundler ultrarrápido
- **TypeScript 5.8** - Tipado estático
- **Tailwind CSS 3.4** - Estilos
- **shadcn/ui** - Componentes pre-diseñados
- **React Router 6.30** - Navegación
- **Sonner** - Notificaciones toast

### Backend
- **Express 4.18** - Framework HTTP
- **Node.js** - Runtime
- **MySQL2 3.10** - Conexión DB
- **Multer 1.4** - Upload de archivos
- **CORS 2.8** - Control de origen

### Desarrollo
- **Vitest** - Testing unitario
- **Playwright** - Testing E2E
- **ESLint** - Linting
- **PostCSS** - Transformaciones CSS

---

## 📱 Funcionalidades Principales

### Página Principal (Index)
- ✅ Búsqueda avanzada de libros
- ✅ Filtros por categoría
- ✅ Visualización en cards con carátulas
- ✅ Mapa interactivo de ubicaciones
- ✅ Estado de disponibilidad en tiempo real

### Panel Admin
- ✅ Crear nuevos libros
- ✅ Editar información de libros
- ✅ Subir y gestionar carátulas
- ✅ Eliminar registros
- ✅ Protegido con contraseña (demo)

---

## 🔐 Seguridad

⚠️ **Nota**: En producción se debe implementar:
- JWT o OAuth2 para autenticación
- HTTPS obligatorio
- Validación de entrada en backend
- Rate limiting en API
- CORS configurado específicamente
- Variables de entorno para secretos

---

## 📊 Colores de Marca

- **Verde Primario**: `#009852` - Botones, encabezados
- **Dorado Secundario**: `#ffd400` - Acentos, destacados

---

## 💡 Uso de Colores en Interfaz

- **Navegación (Navbar)**: Verde #009852 de fondo
- **Botones principales**: Verde #009852
- **Acentos y destacados**: Dorado #ffd400
- **Mapa de ubicación**: Verde y dorado en bloques y selecciones
- **Estados disponibles**: Verde para disponible

---

## 🤝 Contribuciones

Para cambios locales:

1. Crear rama: `git checkout -b feature/nombre`
2. Hacer cambios
3. Commit: `git commit -m "Descripción clara"`
4. Push: `git push origin feature/nombre`

---

## 📞 Contacto

**Desarrollado para**: Politécnico Colombiano Jaime Isaza Cadavid
**Propósito**: REDCOLSI 2026 - Expo de Tecnología

---

## 📄 Licencia

Este proyecto es propietario del Politécnico Colombiano Jaime Isaza Cadavid.

---

**Última actualización**: Abril 2026
