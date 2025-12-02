# 🎨 VISUAL PREVIEW - PricingSection Component

## Descripción Visual

El componente `PricingSection` es una sección premium de precios que se vería así en tu sitio web:

---

## 📐 Estructura HTML (Markup)

```
┌─────────────────────────────────────────────────────────┐
│              FONDO OSCURO (slate-950)                   │
│                                                           │
│                                                           │
│          ╔═══════════════════════════════════════╗       │
│          ║    Elige la Solución Web que          ║       │
│          ║    Impulsará tu Negocio              ║       │
│          ║    (Título en blanco, 48px bold)     ║       │
│          ╚═══════════════════════════════════════╝       │
│                                                           │
│   Comienza con nuestros planes base, diseñados para     │
│   convertir. Rápido, escalable y profesional.           │
│   (Subtítulo en gris claro, 18px)                       │
│                                                           │
│                                                           │
│   ┌────────────────────────────────────────┐            │
│   │ ╔════════════════════════════════════╗ │            │
│   │ ║  PAQUETE RECOMENDADO              ║ │            │
│   │ ║  (Degradado Salmón → Celeste)     ║ │            │
│   │ ╚════════════════════════════════════╝ │            │
│   │                                        │            │
│   │  Paquete Inicial: Landing Page        │            │
│   │  (Título H3, blanco, 24px bold)      │            │
│   │                                        │            │
│   │  Una Landing Page profesional         │            │
│   │  optimizada para generar leads...     │            │
│   │  (Descripción gris, 14px)            │            │
│   │                                        │            │
│   │  750€                                  │            │
│   │  (Precio con degradado, 48px bold)    │            │
│   │                                        │            │
│   │  Personalizamos según tus             │            │
│   │  necesidades                          │            │
│   │  (Subtítulo precio, 12px gris)       │            │
│   │                                        │            │
│   │  ╔════════════════════════════════╗  │            │
│   │  ║  Empezar mi Proyecto           ║  │            │
│   │  ║  (Botón degradado salmón/cyan) ║  │            │
│   │  ╚════════════════════════════════╝  │            │
│   │                                        │            │
│   │  ─────────────────────────────────   │            │
│   │  (Separador gris oscuro)             │            │
│   │                                        │            │
│   │  Incluye:                             │            │
│   │  ✓ Diseño profesional personalizado   │            │
│   │  ✓ Desarrollo web moderno            │            │
│   │  ✓ Hosting incluido                  │            │
│   │  ✓ Dominio personalizado             │            │
│   │  ✓ Enlaces a redes sociales          │            │
│   │  ✓ Formularios de contacto           │            │
│   │  ✓ Botones de WhatsApp               │            │
│   │  ✓ Optimización SEO básica           │            │
│   │  (Checkmarks en cyan, lista 14px)    │            │
│   │                                        │            │
│   │  💳 Sin compromiso • Cotización       │            │
│   │  gratuita                             │            │
│   │  (Nota final, 12px gris oscuro)      │            │
│   └────────────────────────────────────────┘            │
│                                                           │
│   ¿Necesitas más funcionalidades? Contáctanos para     │
│   un presupuesto personalizado                          │
│   (Texto gris)                                          │
│                                                           │
│   Contáctame por WhatsApp →                             │
│   (Link en cyan, hover a salmón)                        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Paleta de Colores

### Colores Principales
```
┌─────────────────────────────────┐
│ Salmón (Salmon Pink):           │
│ #ffbba8                         │
│ RGB(255, 187, 168)             │
│ ████████████████████████████    │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Celeste (Cyan Blue):            │
│ #67e2f0                         │
│ RGB(103, 226, 240)             │
│ ████████████████████████████    │
└─────────────────────────────────┘
```

### Colores de Fondo
```
Fondo Principal:    #0f172a (slate-950)
Fondo Tarjeta:      #1e293b → #0f172a (slate-900 → slate-800)
Borde:              #334155 (slate-700)
```

### Colores de Texto
```
Texto Principal:    #ffffff (white)
Texto Secundario:   #d1d5db (gray-300)
Texto Terciario:    #6b7280 (gray-500)
Ícono Check:        #67e2f0 (cyan)
```

---

## 📱 Responsive Design

### Mobile (< 768px)
```
┌─────────────────────────────┐
│  ELIGE LA SOLUCIÓN...       │
│  (texto centrado)           │
│                             │
│  Comienza con nuestros...   │
│  (texto centrado, máx 2xl)  │
│                             │
│  ┌─────────────────────────┐│
│  │ PAQUETE RECOMENDADO    ││
│  │ Paquete Inicial...     ││
│  │ (Tarjeta a ancho full) ││
│  │ 750€                   ││
│  │ ...                    ││
│  └─────────────────────────┘│
│                             │
│  ¿Necesitas más...          │
│  Contáctame por WhatsApp →  │
└─────────────────────────────┘
```

### Tablet & Desktop (≥ 768px)
```
Mismo layout pero con mejor espaciado
y tamaños de fuente más grandes
```

---

## ✨ Efectos Interactivos

### 1. Badge "PAQUETE RECOMENDADO"
- **Default:** Degradado salmón → celeste con texto oscuro
- **Hover:** Efecto subtle (sin cambios dramáticos)

### 2. Precio (750€)
- **Default:** Texto degradado salmón → celeste, 48px bold
- **Effect:** Se ve prominente y atractivo

### 3. Botón "Empezar mi Proyecto"
- **Default:** Degradado salmón → celeste, color oscuro, bordes redondeados
- **Hover:**
  - Escala aumenta (scale-105)
  - Sombra de cyan mejorada
  - Transición suave (300ms)

### 4. Checkmarks (✓)
- **Color:** Celeste (#67e2f0)
- **Tamaño:** 20px
- **Alineación:** Al inicio de cada línea con margen

### 5. Tarjeta Completa
- **Default:** Sombra 2xl con borde subtle
- **Hover:**
  - Sombra aumentada
  - Aura cyan subtle
  - Transición de 500ms

### 6. Links de Contacto
- **Default:** Cyan (#67e2f0)
- **Hover:** Cambian a salmón (#ffbba8)

---

## 🔤 Tipografía

### Título Principal (H2)
- **Tamaño:** 36px (mobile) → 48px (desktop)
- **Peso:** Bold (font-weight: 700)
- **Color:** Blanco
- **Clase:** `text-4xl md:text-5xl font-bold`

### Subtítulo
- **Tamaño:** 18px → 20px
- **Peso:** Normal
- **Color:** Gris claro
- **Clase:** `text-lg md:text-xl text-gray-300`

### Título de Tarjeta (H3)
- **Tamaño:** 24px
- **Peso:** Bold
- **Color:** Blanco
- **Clase:** `text-2xl font-bold`

### Descripción
- **Tamaño:** 14px
- **Peso:** Normal
- **Color:** Gris
- **Clase:** `text-sm text-gray-300`

### Precio
- **Tamaño:** 48px
- **Peso:** Bold
- **Color:** Degradado
- **Clase:** `text-5xl font-bold text-transparent bg-clip-text`

### Features/Incluye
- **Tamaño:** 14px
- **Peso:** Normal
- **Color:** Gris
- **Clase:** `text-sm text-gray-300`

---

## 📐 Espaciado

### Sección Completa
```
Padding:    py-20 px-4 md:px-8
Max Width:  max-w-6xl
```

### Tarjeta
```
Padding Interior:    p-8
Max Width:          max-w-md
Espacios entre:     mb-8 (general), mb-2 (entre títulos)
```

### Lista de Features
```
Espacio entre items: space-y-4
Gap entre icon y text: gap-3
```

---

## 🎬 Animaciones

### Scroll Animation
- La sección tiene la clase `scroll-animation`
- Se activa con `useScrollAnimation()` hook
- Fade-in suave al entrar en viewport

### Hover Transiciones
```
Duración: 300ms (botón), 500ms (tarjeta)
Timing: transition-all, transition-shadow
Curva: default cubic-bezier
```

---

## 🌐 Multiidioma Support

### Español (ES)
```
Título: "Elige la Solución Web que Impulsará tu Negocio"
Botón: "Empezar mi Proyecto"
Badge: "PAQUETE RECOMENDADO"
```

### Inglés (EN)
```
Título: "Choose the Web Solution That Will Drive Your Business"
Botón: "Start My Project"
Badge: "RECOMMENDED PACKAGE"
```

### Catalán (CA)
```
Título: "Tria la Solució Web que Impulsarà el Teu Negoci"
Botón: "Comença el Meu Projecte"
Badge: "PAQUET RECOMANAT"
```

---

## 🎯 Características Destacadas

### Premium Look
- ✨ Degradado de marca distintivo
- ✨ Colores contrastados pero armoniosos
- ✨ Espaciado generoso
- ✨ Sombras sofisticadas

### User Experience
- 🎯 CTA clara y prominente
- 🎯 Información bien organizada
- 🎯 Efectos interactivos suaves
- 🎯 Accesibilidad mejorada

### Profesionalismo
- 💼 Sin microcopy superficial
- 💼 "Precio Base" en lugar de "desde"
- 💼 Enfoque en valor, no en precio bajo
- 💼 Mensaje premium y confiable

---

## 📊 Performance

### Tamaño de Archivo
- `PricingSection.tsx`: ~2.5 KB
- `PricingCard.tsx`: ~2.2 KB
- Total: ~4.7 KB (muy ligero)

### Renderización
- Sin JavaScript pesado
- Solo Tailwind CSS
- Lucide-react icon (< 1 KB)

### Accesibilidad
- ✅ Contraste WCAG AA
- ✅ Estructura semántica H2/H3
- ✅ Botones accesibles
- ✅ Navegación por teclado

---

**Visualización actualizada: Noviembre 2025**

