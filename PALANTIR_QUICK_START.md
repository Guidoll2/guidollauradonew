# 🚀 Palantír Orb - Quick Start

## Instalación Inmediata

### 1. El orbe ya está integrado
El componente `PalantirOrb.tsx` ya está en tu proyecto y reemplaza el botón azul simple en `FloatingAssistant.tsx`.

### 2. Ver en acción
```bash
npm run dev
```

Visita: `http://localhost:3000/demo-orb`

---

## Uso Básico

### Ejemplo Mínimo
```tsx
import PalantirOrb from '@/components/PalantirOrb';

<PalantirOrb
  size={56}
  isLightMode={false}
  onClick={() => console.log('clicked')}
/>
```

### Ejemplo Completo (FloatingAssistant)
```tsx
'use client';

import PalantirOrb from './PalantirOrb';
import { useTheme } from '@/lib/theme-context';

export default function FloatingAssistant() {
  const { isLightMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-8 right-8 z-50">
          <PalantirOrb
            size={56}
            isLightMode={isLightMode}
            onClick={() => setIsOpen(true)}
          />
        </div>
      )}
      
      {/* ... rest of chat interface */}
    </>
  );
}
```

---

## Props API

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `size` | `number` | `56` | Tamaño en pixels (40-80 recomendado) |
| `isLightMode` | `boolean` | `false` | Tema claro u oscuro |
| `onClick` | `() => void` | - | Handler del click |
| `className` | `string` | `''` | Clases Tailwind adicionales |

---

## Tamaños Recomendados

```tsx
// Mobile (compacto)
<PalantirOrb size={48} />

// Desktop (normal) ⭐
<PalantirOrb size={56} />

// Tablet/Large
<PalantirOrb size={64} />

// Hero (destacado)
<PalantirOrb size={80} />
```

---

## Responsive Design

```tsx
<PalantirOrb
  size={56}
  className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
  isLightMode={isLightMode}
  onClick={handleClick}
/>
```

---

## Posicionamiento

### Fixed (flotante)
```tsx
<div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
  <PalantirOrb size={56} />
</div>
```

### Sticky (pegado al scroll)
```tsx
<div className="sticky top-4 z-50">
  <PalantirOrb size={56} />
</div>
```

### Inline (en el flujo)
```tsx
<div className="flex items-center gap-4">
  <PalantirOrb size={48} />
  <span>Chat with AI</span>
</div>
```

---

## Personalización de Colores

### Modificar tema en PalantirOrb.tsx

```typescript
// Línea ~33
const theme = isLightMode ? {
  primary: [30, 64, 175],      // ← Cambia estos valores RGB
  secondary: [59, 130, 246],
  accent: [96, 165, 250],
  glow: 'rgba(59, 130, 246, 0.25)',
  // ...
} : {
  primary: [255, 187, 168],    // ← Dark mode colors
  secondary: [103, 226, 240],
  // ...
};
```

### Ejemplo: Orbe Verde
```typescript
const theme = isLightMode ? {
  primary: [34, 197, 94],      // Green 600
  secondary: [74, 222, 128],   // Green 400
  accent: [134, 239, 172],     // Green 300
  glow: 'rgba(34, 197, 94, 0.25)',
  // ...
}
```

---

## Estados Dinámicos

### Loading/Pensando
```tsx
<div className="relative">
  <PalantirOrb size={56} />
  
  {isLoading && (
    <div className="absolute inset-0 animate-spin"
         style={{ animationDuration: '2s' }}>
      {/* Anillo de carga */}
      <div className="absolute inset-2 rounded-full border-2 border-t-white/60 border-r-transparent" />
    </div>
  )}
</div>
```

### Notificación
```tsx
<div className="relative">
  <PalantirOrb size={56} />
  
  {hasNewMessage && (
    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
  )}
</div>
```

---

## Performance Tips

### 1. Limitar instancias
```tsx
// ❌ Mal: Múltiples orbes con animaciones
{items.map(item => <PalantirOrb key={item.id} />)}

// ✅ Bien: Un solo orbe flotante
<PalantirOrb size={56} />
```

### 2. Lazy loading
```tsx
const PalantirOrb = dynamic(
  () => import('@/components/PalantirOrb'),
  { ssr: false }
);
```

### 3. Condicional rendering
```tsx
// Solo mostrar después de scroll
{scrollY > 300 && <PalantirOrb size={56} />}
```

---

## Troubleshooting

### El orbe no se ve
```tsx
// Verificar z-index
<div className="z-50"> {/* Suficientemente alto */}
  <PalantirOrb size={56} />
</div>
```

### Animaciones lentas
```tsx
// El canvas puede ser pesado en dispositivos antiguos
// Solución: Reducir partículas en PalantirOrb.tsx línea ~71
const particleCount = 8; // Era 12
```

### No responde al click
```tsx
// Verificar que el handler esté definido
<PalantirOrb 
  onClick={() => console.log('Working!')} // ← Test
/>
```

---

## Ejemplos Reales

### 1. Chat Assistant (actual)
```tsx
// components/FloatingAssistant.tsx
{!isOpen && (
  <PalantirOrb
    size={56}
    isLightMode={isLightMode}
    onClick={() => setIsOpen(true)}
    className="md:w-16 md:h-16"
  />
)}
```

### 2. Hero CTA
```tsx
// app/page.tsx
<section className="text-center">
  <h1>Habla con nuestro AI</h1>
  <PalantirOrb 
    size={80}
    isLightMode={isLightMode}
    onClick={openChat}
    className="mx-auto mt-8"
  />
</section>
```

### 3. Floating FAB (Material Design)
```tsx
<div className="fixed bottom-20 right-6 z-50 flex flex-col gap-4">
  <button className="action-button">Share</button>
  <button className="action-button">Save</button>
  <PalantirOrb size={56} onClick={openMenu} />
</div>
```

---

## Next Steps

1. **Ver el demo**: `http://localhost:3000/demo-orb`
2. **Leer docs**: `PALANTIR_ORB_DOCS.md`
3. **Personalizar**: Edita colores y tamaños según tu marca
4. **Integrar**: Ya está en FloatingAssistant, solo prueba

---

## Soporte

- 📖 Docs completas: [PALANTIR_ORB_DOCS.md](./PALANTIR_ORB_DOCS.md)
- 🎨 Demo interactivo: `/demo-orb`
- 💻 Código fuente: [components/PalantirOrb.tsx](./components/PalantirOrb.tsx)

**¡Disfruta tu orbe vivo! 🔮**
