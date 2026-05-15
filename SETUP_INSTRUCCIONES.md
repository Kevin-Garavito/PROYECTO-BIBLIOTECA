# 📚 BiblioSearch - Sistema de Búsqueda y Ubicación de Libros

## Instrucciones de Instalación y Ejecución

### 📋 Requisitos Previos

- **Node.js** versión 16 o superior ([descargar](https://nodejs.org))
- **npm** o **bun** (viene con Node.js)
- **Git** (opcional, para clonar el repositorio)

---

## 🚀 Instalación Inicial

### 1. Clonar o descargar el proyecto

```bash
# Si usas git
git clone <tu-repositorio>
cd book-finder-hub

# O si descargaste el ZIP, extrae y abre la carpeta
cd book-finder-hub
```

### 2. Instalar dependencias

```bash
# Con npm
npm install

# O con bun (más rápido)
bun install
```

---

## ▶️ Ejecutar el Programa

El proyecto tiene dos partes que deben ejecutarse **simultáneamente en dos terminales diferentes**:

### Terminal 1: Servidor Backend (API REST)

```bash
# Navega a la carpeta raíz del proyecto
cd c:\Users\KEVIN GC\Desktop\book-finder-hub

# Inicia el servidor backend en puerto 3001
npx tsx ./server/server.ts
```

✅ Esperado: Verás el mensaje:
```
✓ Database already exists
✓ Server running on http://localhost:3001
✓ API: http://localhost:3001/api
```

---

### Terminal 2: Frontend (Aplicación React)

```bash
# Abre una **nueva terminal** (NO cierres la anterior)
cd c:\Users\KEVIN GC\Desktop\book-finder-hub

# Inicia el servidor de desarrollo del frontend en puerto 5173
npm run dev
```

✅ Esperado: Verás algo como:
```
  VITE v5.4.19  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

---

## 🌐 Acceder a la Aplicación

Abre tu navegador favorito y ve a:

### Página Principal (Búsqueda y Visualización)
```
http://localhost:5173
```

### Panel de Administración (Gestión de Libros)
```
http://localhost:5173/admin
```

**Credenciales de Demo:**
- **Usuario**: Sin requerimiento
- **Contraseña**: `admin123`

---

## 📝 Funciones Principales

### En la Página Principal
- 🔍 **Buscar libros** por título, autor, categoría o ISBN
- 📍 **Ver ubicación** de cada libro en la biblioteca
- 🗺️ **Ver mapa interactivo** de los bloques de la biblioteca
- 📖 **Ver detalles completos** de cada libro

### En el Panel Admin
- ➕ **Agregar nuevos libros**
- ✏️ **Editar libros existentes**
- 🖼️ **Subir imágenes de portada**
- 🗑️ **Eliminar libros**
- 📊 **Gestionar disponibilidad** (Disponible/Prestado)

---

## 🔧 Comandos Útiles

```bash
# Instalar dependencias nuevas
npm install nombre-del-paquete

# Ejecutar tests (si están disponibles)
npm run test

# Construir para producción
npm run build

# Limpiar caché
npm run clean
```

---

## 📂 Estructura del Proyecto

```
book-finder-hub/
├── server/                 # Backend Express.js
│   ├── server.ts          # API REST principal
│   ├── db.ts              # Lógica de base de datos
│   └── tsconfig.json
├── src/                   # Frontend React
│   ├── pages/             # Páginas principales
│   │   ├── Index.tsx      # Página principal
│   │   └── Admin.tsx      # Panel de administración
│   ├── components/        # Componentes reutilizables
│   ├── data/
│   │   └── books.ts       # Datos de libros
│   └── App.tsx
├── public/
│   └── uploads/           # Carpeta para imágenes de portadas
├── package.json
└── vite.config.ts
```

---

## 🐛 Solución de Problemas

### El servidor no inicia

**Problema**: Error `EADDRINUSE` (puerto 3001 ya en uso)

**Solución**:
```bash
# Encuentre qué proceso usa el puerto 3001
netstat -ano | findstr :3001

# O cambia el puerto en server/server.ts línea 14
const PORT = 3002; // Usa otro puerto disponible
```

---

### Las imágenes no suben

**Problema**: Error al subir imágenes en Admin

**Solución**:
- Asegúrate de que `public/uploads/` existe
- El servidor backend debe estar corriendo (Terminal 1)
- La carpeta debe tener permisos de escritura

---

### La página principal no muestra libros

**Problema**: Página en blanco o sin libros

**Solución**:
- Abre la consola del navegador (F12)
- Verifica que no haya errores de conexión a `http://localhost:3001/api/books`
- Asegúrate de que el servidor backend esté corriendo

---

### Cambiar la contraseña del Admin

En `src/pages/Admin.tsx` línea 9:

```typescript
const ADMIN_PASSWORD = "admin123"; // Cambia esto

// Cambiar a:
const ADMIN_PASSWORD = "tu-nueva-contraseña";
```

⚠️ **Nota**: En producción, guarda las credenciales en variables de entorno (`.env`)

---

## 📦 Dependencias Principales

- **React** - UI Framework
- **Express.js** - Servidor backend
- **Tailwind CSS** - Estilos
- **Shadcn/ui** - Componentes UI
- **Multer** - Carga de archivos
- **Sonner** - Notificaciones

---

## ✅ Checklist de Inicio Rápido

- [ ] Node.js y npm instalados
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor backend iniciado (`npx tsx ./server/server.ts`)
- [ ] Frontend iniciado (`npm run dev`)
- [ ] Acceso a `http://localhost:5173` en el navegador
- [ ] Acceso a `/admin` con contraseña `admin123`

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa la consola del navegador (F12 → Console)
2. Revisa la terminal del servidor backend
3. Verifica que ambos puertos (3001 y 5173) estén disponibles
4. Intenta hacer `npm install` nuevamente

---

**¡Listo para explorar BiblioSearch! 🎉**
