import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtener país desde Vercel Geolocation (disponible en production en Vercel)
  // @ts-ignore - geo está disponible en Vercel Edge Runtime
  const country = request.geo?.country || 'US';
  
  // Mapear país a región de precios
  let region = 'EU'; // Default Europa
  
  if (country === 'AR') {
    region = 'AR'; // Argentina
  } else if (['US', 'MX', 'CO', 'CL', 'PE', 'EC', 'VE', 'UY', 'PY', 'BO', 'BR'].includes(country)) {
    region = 'US'; // USA y LATAM (excepto Argentina)
  } else if (['ES', 'FR', 'DE', 'IT', 'PT', 'GB', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI'].includes(country)) {
    region = 'EU'; // Europa
  }
  
  // Crear respuesta con header de región
  const response = NextResponse.next();
  response.headers.set('x-user-region', region);
  
  return response;
}

// Configurar para que se ejecute en todas las rutas
export const config = {
  matcher: '/:path*',
};
