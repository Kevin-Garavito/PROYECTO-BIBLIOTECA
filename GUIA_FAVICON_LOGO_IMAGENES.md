# GUÍA DE CAMBIOS: Favicon, Logo e Imágenes Persistentes

## 1️⃣ CAMBIAR EL FAVICON (Icono en la pestaña)

### Ubicación actual:
El favicon está en: **`public/`** (no existe aún)

### Pasos para cambiarlo:

**Opción A: Usar un archivo SVG o PNG existente**
1. Coloca tu archivo (favicon.svg, favicon.png, etc.) en la carpeta **`public/`**
2. Abre el archivo **`index.html`** en la raíz del proyecto
3. Busca la sección `<head>` y agrega esta línea:
   ```html
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
   ```
   O si usas PNG:
   ```html
   <link rel="icon" type="image/png" href="/favicon.png" />
   ```

**Opción B: Cambiar el favicon rápidamente**
- Reemplaza cualquier archivo favicon que coloques en `public/` 
- El navegador lo detectará automáticamente

---

## 2️⃣ CAMBIAR EL LOGO DE LA PÁGINA

El logo actualmente usa un **icono + texto**. Puedes cambiarlo de varias maneras:

### Ubicaciones donde aparece el logo:

**A. En la página principal:** [src/pages/Index.tsx](src/pages/Index.tsx#L36)
- Línea 36: Usa `<BookOpen />` (icono) + texto "BiblioSearch"
- Cambia el icono importando otro de `lucide-react`

**B. En la página admin:** [src/pages/Admin.tsx](src/pages/Admin.tsx#L107)
- Línea 107: Similar al anterior
- Mismo icono `<BookOpen />`

**C. En el footer:** [src/pages/Index.tsx](src/pages/Index.tsx#L175)
- Línea 175: Logo en el pie de página

### Cómo cambiar el logo:

**Opción 1: Cambiar el icono**
1. Abre [src/pages/Index.tsx](src/pages/Index.tsx)
2. En la línea 2, verás: `import { BookOpen, Shield, Search, MapPin, X, ArrowRight } from "lucide-react";`
3. Reemplaza `BookOpen` por otro icono de [lucide-react](https://lucide.dev)
   Ejemplos: `Library`, `Book`, `Bookmark`, `Database`, etc.

**Opción 2: Usar una imagen como logo**
1. Coloca tu imagen en `public/` o `src/assets/`
2. En [src/pages/Index.tsx](src/pages/Index.tsx#L36), reemplaza:
   ```tsx
   <BookOpen className="h-6 w-6 text-primary" />
   ```
   Con:
   ```tsx
   <img src="/tu-logo.png" alt="Logo" className="h-6 w-6" />
   ```

---

## 3️⃣ HACER PERSISTENTES LAS IMÁGENES Y DATOS

### ⚠️ PROBLEMA ACTUAL:
- Las imágenes y libros NO se guardan permanentemente
- Todo desaparece al recargar la página
- El admin solo usa estado local (no conectado a la BD)

### SOLUCIÓN - Actualizar el Admin para usar la API:

Ya el backend tiene la API lista. Solo necesitamos conectar el Admin a ella.

**Archivo a modificar:** [src/pages/Admin.tsx](src/pages/Admin.tsx)

Reemplaza la función `handleSave` (línea 50) con:

```typescript
const handleSave = async () => {
  if (!form.title || !form.author) {
    toast.error("Título y autor son obligatorios");
    return;
  }
  
  try {
    if (editingBook) {
      // Actualizar libro existente
      const res = await fetch(`http://localhost:3001/api/books/${editingBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Error al actualizar");
      setBooks((prev) => prev.map((b) => (b.id === editingBook.id ? { ...form, id: editingBook.id } : b)));
      toast.success("Libro actualizado ✓");
    } else {
      // Crear nuevo libro
      const res = await fetch("http://localhost:3001/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Error al agregar");
      const newBook = await res.json();
      setBooks((prev) => [...prev, newBook]);
      toast.success("Libro agregado ✓");
    }
    setEditingBook(null);
    setIsAdding(false);
    setForm(emptyBook);
  } catch (error) {
    toast.error("Error al guardar: " + error);
  }
};
```

Reemplaza también la función `handleDelete` (línea 67) con:

```typescript
const handleDelete = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/api/books/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Error al eliminar");
    setBooks((prev) => prev.filter((b) => b.id !== id));
    toast.success("Libro eliminado ✓");
  } catch (error) {
    toast.error("Error al eliminar: " + error);
  }
};
```

Agrega esta función al cargar la página:

```typescript
import { useEffect } from "react";

useEffect(() => {
  const loadBooks = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/books");
      const data = await res.json();
      setBooks(data.length > 0 ? data : sampleBooks);
    } catch {
      setBooks(sampleBooks);
    }
  };
  
  if (isLoggedIn) {
    loadBooks();
  }
}, [isLoggedIn]);
```

---

## 4️⃣ IMÁGENES PERSISTENTES

Las imágenes se subirán a `public/uploads/` automáticamente cuando uses el backend.

Para que las imágenes se guarden:
1. El backend ya está configurado con `multer`
2. Cuando subes una imagen en el Admin, se guarda en `public/uploads/`
3. Se devuelve la URL `/uploads/nombre-archivo` y se guarda en la BD

✅ **Al implementar los cambios anterior, las imágenes serán permanentes**

---

## 📋 RESUMEN DE ARCHIVOS A MODIFICAR

1. **`index.html`** - Agregar favicon link
2. **`public/favicon.svg`** - Crear/colocar tu favicon
3. **`src/pages/Index.tsx`** - Cambiar logo/icono (línea 36)
4. **`src/pages/Admin.tsx`** - Conectar a la API (reemplazar handleSave y handleDelete)
