# Sistema de Precios Regionales - Documentación

## 📍 Descripción

Sistema de detección automática de región geográfica con precios diferenciados por país/región, implementado con Vercel Edge Middleware.

## 🌎 Regiones Soportadas

### 🇦🇷 Argentina (AR)
- **Moneda**: Pesos Argentinos (ARS)
- **Precios**:
  - Pack Presencia Express: $350.000 ARS
  - Landing Page Alta Conversión: $950.000 ARS
  - Web Profesional: $2.000.000 ARS
  - Desarrollo Integral: $4.000.000 ARS

### 🌎 América (US/LATAM)
- **Moneda**: Dólares USD
- **Incluye**: USA, México, Colombia, Chile, Perú, Ecuador, Venezuela, Uruguay, Paraguay, Bolivia, Brasil
- **Precios**:
  - Pack Presencia Express: $240 USD
  - Landing Page Alta Conversión: $660 USD
  - Web Profesional: $1,425 USD
  - Desarrollo Integral: $2,970 USD

### 🇪🇺 Europa (EU)
- **Moneda**: Euros (EUR)
- **Incluye**: España, Francia, Alemania, Italia, Portugal, Reino Unido, etc.
- **Precios**:
  - Pack Presencia Express: 199€
  - Landing Page Alta Conversión: 550€
  - Web Profesional: 1.200€
  - Desarrollo Integral: Desde 2.500€

## 🔧 Implementación Técnica

### Archivos Creados/Modificados:

1. **Archivos de Precios Regionales**:
   - `/public/locales/pricing-ar.json`
   - `/public/locales/pricing-us.json`
   - `/public/locales/pricing-eu.json`

2. **Middleware de Vercel**:
   - `/middleware.ts` - Detecta país automáticamente usando Vercel Edge

3. **Contexto de Región**:
   - `/lib/region-context.tsx` - Maneja estado de región y precios

4. **Componentes Actualizados**:
   - `/app/layout.tsx` - Agrega RegionProvider
   - `/components/Header.tsx` - Selector manual de región
   - `/components/PricingSection.tsx` - Usa precios regionales

## 🚀 Funcionamiento

1. **Detección Automática**:
   - Al entrar al sitio, Vercel detecta el país desde la IP
   - Se asigna la región correspondiente (AR/US/EU)
   - Se cargan los precios apropiados

2. **Cambio Manual**:
   - Botón en el Header (🇦🇷/🌎/🇪🇺)
   - Se guarda preferencia en localStorage
   - Cambia precios instantáneamente

3. **Persistencia**:
   - La región seleccionada manualmente se guarda
   - Se mantiene entre sesiones

## 📱 UX/UI

- **Selector de Región**: Dropdown con banderas en el Header
- **Precios Dinámicos**: Actualización automática sin recargar
- **Visual Feedback**: Región activa resaltada
- **Multi-idioma**: Compatible con ES/CA/EN

## 🔍 Testing

Para probar localmente:

```javascript
// Cambiar región manualmente desde la consola del navegador:
localStorage.setItem('userRegion', 'AR'); // o 'US' o 'EU'
location.reload();
```

## 📊 Ventajas de Negocio

- ✅ **Mayor Conversión**: Precios adaptados al poder adquisitivo local
- ✅ **Transparencia**: Cliente ve precio en su moneda desde el inicio
- ✅ **Flexibilidad**: Puede cambiar región si está viajando
- ✅ **SEO Friendly**: No afecta indexación ni duplica contenido

## 🎯 Despliegue en Vercel

El middleware `request.geo` solo funciona en **producción en Vercel**. 
En desarrollo local usará detección por timezone como fallback.

## 🔮 Futuro

Posibles mejoras:
- Agregar más regiones (UK, Brasil con BRL, etc.)
- Conversión de moneda en tiempo real
- A/B testing de precios por región
- Analytics de conversión por región
