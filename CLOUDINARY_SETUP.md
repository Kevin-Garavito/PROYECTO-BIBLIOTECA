# 🚀 Configuración de Cloudinary para Book-Finder-Hub

## ¿Por qué Cloudinary?
Vercel no persiste archivos en el sistema de archivos entre deploys. Cloudinary permite almacenar imágenes en la nube de forma gratuita y confiable.

---

## 📋 PASO 1: Crear cuenta en Cloudinary

1. Ve a https://cloudinary.com/users/register
2. Crea una cuenta gratis (no necesita tarjeta de crédito)
3. Completa el registro con email y contraseña

---

## 🔑 PASO 2: Obtener credenciales

1. Inicia sesión en Cloudinary
2. Dirígete al **Dashboard**
3. En la sección superior, verás:
   - **Cloud Name** (aparece en URL como: `cloudinary.com/console/c/cloud_name/...`)
   - **API Key**
   - **API Secret**

Copia estos 3 valores.

---

## 📝 PASO 3: Configurar variables de entorno

### Local (Desarrollo)
Crea o edita el archivo `.env.local` en la raíz del proyecto:

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

Reemplaza `tu_cloud_name`, `tu_api_key` y `tu_api_secret` con los valores reales de Cloudinary.

### En Vercel (Producción)
1. Ve a tu proyecto en **Vercel Dashboard**
2. Click en **Settings** → **Environment Variables**
3. Agrega estas 3 variables:

| Variable | Valor |
|----------|-------|
| `CLOUDINARY_CLOUD_NAME` | Tu cloud name |
| `CLOUDINARY_API_KEY` | Tu API Key |
| `CLOUDINARY_API_SECRET` | Tu API Secret |

4. Click en **Save**
5. **Redeploy** tu proyecto

---

## 💻 PASO 4: Instalar dependencias

En la carpeta `backend/`:

```bash
npm install cloudinary
```

---

## ✅ PASO 5: Verificar que funciona

1. **Local**: 
   - Ejecuta `npm run dev` en el backend
   - Intenta subir una imagen desde la app
   - Verifica que aparezca en tu dashboard de Cloudinary

2. **Vercel**:
   - Realiza un nuevo deploy
   - Intenta subir una imagen desde la app en producción
   - Verifica que aparezca en Cloudinary

---

## 🐛 Troubleshooting

### Las imágenes no se suben
- Verifica que las credenciales en `.env.local` sean correctas
- Revisa los logs del backend buscando "Cloudinary error"
- Asegúrate de tener internet conexión

### Error "Invalid cloud name"
- Tu `CLOUDINARY_CLOUD_NAME` podría tener espacios o caracteres especiales
- Cópialo directamente del dashboard de Cloudinary

### Las imágenes ya cargadas desaparecieron en Vercel
- Es normal, fueron guardadas localmente. Ahora con Cloudinary las nuevas imágenes será persistentes.

---

## 📚 Endpoints afectados

- ✅ **POST `/api/upload`** - Ahora sube a Cloudinary
- ✅ **POST `/api/books/:id/cover`** - Ahora sube a Cloudinary
- ✅ **DELETE `/api/books/:id`** - Ahora elimina de Cloudinary

---

## 💡 Bonus: Plan gratuito de Cloudinary

El plan gratuito incluye:
- 25 GB de almacenamiento
- 25 millones de transformaciones/mes
- Uploads ilimitados
- ¡Más que suficiente para tu proyecto!

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs del backend
2. Verifica que las variables de entorno sean correctas
3. Consulta la documentación: https://cloudinary.com/documentation/node_integration
