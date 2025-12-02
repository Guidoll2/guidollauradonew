# Componente PricingSection - Documentación

## 📋 Descripción General

`PricingSection` es un componente React premium para mostrar precios y paquetes de servicios web. Diseñado específicamente para el negocio B2B de Guidodev, transmite profesionalismo y confianza mediante:

- **Paleta de Marca Premium:** Degradado Salmón (#ffbba8) a Celeste (#67e2f0)
- **Diseño Limpio:** Fondo oscuro (slate-950) con tarjetas elegantes
- **Interactividad:** Efectos hover suaves y animaciones modernas
- **Multiidioma:** Soporte completo para Español, Inglés y Catalán

## 🎯 Características Clave

### Componente Principal: `PricingSection`
- Título y subtítulo configurables
- Integración con sistema de traducción (`useLanguage()`)
- Animación de scroll (`useScrollAnimation()`)
- Tarjeta de precios reutilizable
- Llamada a acción (CTA) con WhatsApp

### Subcomponente Reutilizable: `PricingCard`
- **Props totalmente configurables:**
  - `title` - Título del paquete
  - `description` - Descripción del servicio
  - `price` - Precio mostrado
  - `customizationText` - Texto bajo el precio
  - `buttonText` - Texto del botón CTA
  - `features` - Array de características incluidas
  - `includesLabel` - Etiqueta "Incluye:"
  - `noCommitmentText` - Texto de garantía
  - `isRecommended` - Mostrar badge (default: true)
  - `badgeText` - Texto del badge

## 🎨 Estilos y Diseño

### Colores de Marca
- **Salmón:** `#ffbba8`
- **Celeste:** `#67e2f0`
- **Fondo:** `bg-slate-950`
- **Tarjeta:** Degradado `from-slate-900 to-slate-800`

### Efectos Visuales
- Sombra de tarjeta con hover mejorado
- Efecto de escala en botón CTA (hover:scale-105)
- Animación de color en enlaces (hover:text-[#ffbba8])
- Ícono de checkmark en verde celeste

## 📱 Responsive Design

- **Desktop:** Layout completo con tarjeta centrada
- **Tablet:** Ajustes de padding y tamaño de fuente
- **Mobile:** Versión optimizada con `px-4`

## 🌍 Soporte Multiidioma

Las traducciones están integradas en `/public/locales/`:
- `es.json` - Español
- `en.json` - Inglés
- `ca.json` - Catalán

### Claves de Traducción Utilizadas
```typescript
t.pricingSectionTitle
t.pricingSectionSubtitle
t.initialPackageTitle
t.initialPackageDescription
t.recommendedPackage
t.startMyProject
t.needMoreFeatures
t.personalCustomization
t.includesLabel
t.noCommitment
t.contactWhatsApp
t.feature1 a t.feature8
```

## 💻 Cómo Usar

### Importar y Usar PricingSection

```typescript
import PricingSection from '@/components/PricingSection';

export default function HomePage() {
  return (
    <main>
      <PricingSection />
    </main>
  );
}
```

### Usar PricingCard para Múltiples Paquetes

```typescript
import { PricingCard } from '@/components/PricingCard';

export function MultiplePlans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <PricingCard
        title="Plan Inicial"
        description="Perfecto para comenzar"
        price="750€"
        customizationText="Personalizable"
        buttonText="Solicitar"
        features={['Feature 1', 'Feature 2']}
        includesLabel="Incluye:"
        noCommitmentText="Sin compromiso"
      />
    </div>
  );
}
```

## 🔧 Personalización

### Cambiar Colores de Marca

Reemplaza `from-[#ffbba8] to-[#67e2f0]` en:
- `PricingCard.tsx` línea 21 (badge)
- `PricingCard.tsx` línea 43 (precio)
- `PricingCard.tsx` línea 50 (botón)

### Cambiar Precio

En `PricingSection.tsx`, modifica:
```typescript
price="750€" // Cambiar aquí
```

### Agregar/Eliminar Características

En `PricingSection.tsx`, edita el array `features`:
```typescript
const features = [
  t.feature1 || 'Nueva característica 1',
  t.feature2 || 'Nueva característica 2',
  // ...
];
```

## 📞 Integración con WhatsApp

El enlace del botón "Más Opciones" apunta a:
```
https://wa.me/34
```

**Actualiza esto con el número de WhatsApp real del cliente:**
```typescript
href="https://wa.me/34XXXXXXXXX"
```

## 🚀 Características Futuras (Opcional)

1. **Múltiples Paquetes:** Agregar plan profesional y empresarial
2. **Comparador de Planes:** Tabla interactiva de características
3. **Carrusel de Testimonios:** Integración con `ProjectCarousel`
4. **Análitica:** Tracking de clicks en CTAs
5. **Formas de Pago:** Integración con Stripe/Mercado Pago

## 📦 Dependencias

- `react` / `next.js`
- `tailwindcss`
- `lucide-react` (ícono Check)
- Sistema de traducción personalizado (`lib/language-context`)
- Hook de animación (`hooks/useScrollAnimation`)

## ✅ Checklist de Verificación

- ✅ Componente crea correctamente
- ✅ Soporte multiidioma
- ✅ Responsivo en todos los dispositivos
- ✅ Colores de marca aplicados
- ✅ Efectos hover suave
- ✅ Ícono de checkmark visible
- ✅ Botón CTA funcional
- ✅ Sin errores de compilación

---

**Última actualización:** Noviembre 2025
**Versión:** 1.0
