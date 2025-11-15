# Guidoll.dev - Portfolio Premium

Sitio web portfolio personal para desarrollador freelance especializado en captar clientes de alto nivel en Barcelona.

## 🚀 Características Técnicas

- **Framework**: Next.js 16 con React 19
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS v4
- **Base de datos**: MongoDB (Azure Cosmos DB)
- **Multiidioma**: Español, Catalán, Inglés
- **Diseño**: One-page con scroll animado
- **Responsive**: Optimizado para móvil y desktop

## 🎨 Diseño

- Paleta principal: Degradado salmón a azul
- Estética moderna y minimalista
- Animaciones suaves y microinteracciones
- Tipografía sans-serif (Geist)
- Efectos hover y transiciones CSS

## 📱 Secciones

1. **Header fijo**: Logo, selector de idioma, botón contacto
2. **Hero**: Claim principal con fondo animado
3. **Servicios**: Lista de servicios clave
4. **Clientes**: Logos de clientes destacados (desde MongoDB)
5. **Proyectos**: 3 proyectos visuales destacados (desde MongoDB)
6. **Footer**: Contacto con email, Instagram y WhatsApp

## 🛠️ Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar MongoDB
Copia `.env.example` a `.env.local` y configura:
```env
MONGODB_URI=tu_cadena_de_conexion_mongodb
MONGODB_DB=guidolldev
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

### 4. Construir para producción
```bash
npm run build
npm start
```

## 📊 Estructura de datos MongoDB

### Colección: projects
```json
{
  "_id": "ObjectId",
  "title": {
    "es": "Título en español",
    "ca": "Títol en català", 
    "en": "Title in english"
  },
  "description": {
    "es": "Descripción en español",
    "ca": "Descripció en català",
    "en": "Description in english"
  },
  "image": "/projects/image.jpg",
  "technologies": ["Next.js", "TypeScript", "MongoDB"],
  "liveUrl": "https://example.com",
  "featured": true,
  "order": 1,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Colección: clients
```json
{
  "_id": "ObjectId",
  "name": "Nombre del Cliente",
  "logo": "/clients/logo.svg",
  "website": "https://cliente.com",
  "featured": true,
  "order": 1
}
```

## 🌐 API Endpoints

- `GET /api/projects` - Obtiene proyectos destacados
- `GET /api/clients` - Obtiene clientes destacados

## 📧 Información de Contacto

- **Email**: guido.llaurado@gmail.com
- **Instagram**: [@guidoll.dev](https://www.instagram.com/guidoll.dev/)
- **WhatsApp**: +34675497068

## 🔧 Tecnologías Utilizadas

- Next.js 16.0.1
- React 19.2.0
- TypeScript 5+
- TailwindCSS 4
- MongoDB Driver 6.20.0

## 📝 Notas de Desarrollo

- Los datos se cargan desde MongoDB con fallback a datos mock
- Las API routes manejan la conexión a la base de datos
- El sistema multiidioma está completamente configurado
- Las animaciones son CSS puro sin librerías externas
- Optimizado para SEO y performance

## 🚀 Despliegue

Recomendado en Vercel con las siguientes variables de entorno:
- `MONGODB_URI`
- `MONGODB_DB`
- `NODE_ENV=production`
