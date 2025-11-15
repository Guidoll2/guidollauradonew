# 📸 Guía de Imágenes - Guidoll.dev Portfolio

## 📁 Estructura de Carpetas

```
public/
├── projects/           # Imágenes de proyectos
├── clients/           # Logos de clientes
├── images/            # Imágenes generales
├── favicon.ico        # Favicon del sitio
└── og-image.jpg       # Imagen para Open Graph (redes sociales)
```

## 🎨 Especificaciones de Imágenes

### 📱 Proyectos (`/public/projects/`)
- **Formato**: JPG, PNG, WebP
- **Dimensiones**: 800x600px (ratio 4:3)
- **Peso**: Máximo 500KB
- **Nombres**: `proyecto-1.jpg`, `ecommerce.jpg`, `saas-app.jpg`

**Ejemplos:**
- `/projects/ecommerce.jpg`
- `/projects/saas.jpg`
- `/projects/portfolio.jpg`

### 🏢 Logos de Clientes (`/public/clients/`)
- **Formato**: SVG (preferible) o PNG
- **Dimensiones**: 200x200px (cuadrado)
- **Peso**: Máximo 100KB
- **Fondo**: Transparente
- **Nombres**: `nombre-cliente.svg`

**Ejemplos:**
- `/clients/techcorp.svg`
- `/clients/startuphub.svg`
- `/clients/digitalventures.svg`
- `/clients/innovacorp.svg`

### 🖼️ Imágenes Generales (`/public/images/`)
- **Formato**: JPG, PNG, WebP
- **Dimensiones**: Variables según uso
- **Nombres descriptivos**

**Ejemplos:**
- `/images/hero-bg.jpg` - Fondo del hero
- `/images/profile.jpg` - Foto personal
- `/images/og-image.jpg` - Imagen para redes sociales (1200x630px)

## 🔧 Uso en el Código

### En componentes React:
```tsx
import Image from 'next/image';

// Imagen de proyecto
<Image
  src="/projects/ecommerce.jpg"
  alt="E-commerce Platform"
  width={800}
  height={600}
  className="rounded-lg"
/>

// Logo de cliente
<Image
  src="/clients/techcorp.svg"
  alt="TechCorp Barcelona"
  width={200}
  height={200}
  className="h-16 w-auto"
/>
```

### En CSS (como background):
```css
.hero-bg {
  background-image: url('/images/hero-bg.jpg');
}
```

### En la base de datos MongoDB:
```json
{
  "image": "/projects/ecommerce.jpg",
  "logo": "/clients/techcorp.svg"
}
```

## 📐 Mejores Prácticas

### 🎯 Optimización
1. **Usar Next.js Image**: Siempre usar `next/image` para optimización automática
2. **Formatos modernos**: WebP > JPG > PNG
3. **Compresión**: Usar herramientas como TinyPNG
4. **Lazy loading**: Automático con `next/image`

### 📱 Responsive
1. **Múltiples tamaños**: Considerar crear versiones small/medium/large
2. **Art direction**: Diferentes crops para móvil/desktop
3. **Retina**: Considerar imágenes @2x para pantallas de alta densidad

### 🔍 SEO
1. **Alt text**: Siempre descriptivo y relevante
2. **Nombres de archivo**: Descriptivos con palabras clave
3. **Open Graph**: Imagen og-image.jpg de 1200x630px

## 🚀 Recomendaciones para Guidoll.dev

### Proyectos destacados:
- Capturas de pantalla profesionales
- Mostrar múltiples vistas (desktop/mobile)
- Destacar elementos únicos del diseño

### Logos de clientes:
- Pedir versión monocromática
- SVG vectorial para escalabilidad
- Versiones para fondo claro/oscuro

### Imágenes del hero:
- Texturas o patrones suaves
- Que complementen el degradado salmón-azul
- Sin distraer del contenido principal

## 📁 Estructura Final Recomendada

```
public/
├── projects/
│   ├── ecommerce-preview.jpg
│   ├── saas-dashboard.jpg
│   └── portfolio-interactive.jpg
├── clients/
│   ├── techcorp-logo.svg
│   ├── startuphub-logo.svg
│   ├── digitalventures-logo.svg
│   └── innovacorp-logo.svg
├── images/
│   ├── og-image.jpg
│   └── favicon.ico
```

## 🔗 URLs de Acceso

Las imágenes serán accesibles en:
- **Proyectos**: `https://guidoll.dev/projects/nombre.jpg`
- **Clientes**: `https://guidoll.dev/clients/logo.svg` 
- **Generales**: `https://guidoll.dev/images/imagen.jpg`