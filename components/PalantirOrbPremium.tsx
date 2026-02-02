'use client';

import { useEffect, useRef } from 'react';

interface PalantirOrbPremiumProps {
  size?: number;
  isLightMode?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Palantír Orb PREMIUM - Versión con efecto de cristal ahumado
 * 
 * Características adicionales vs versión estándar:
 * - Efecto de niebla volumétrica (smoke effect)
 * - Gradientes más complejos (cristal ahumado)
 - Profundidad aumentada con más capas
 * - Movimiento más orgánico tipo niebla
 * - Mejor sensación de "mirar dentro del orbe"
 */
export default function PalantirOrbPremium({ 
  size = 56, 
  isLightMode = false,
  onClick,
  className = ''
}: PalantirOrbPremiumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);
  const smokeParticlesRef = useRef<SmokeParticle[]>([]);

  // Paleta "cristal ahumado" más misteriosa
  const theme = isLightMode ? {
    base: 'radial-gradient(circle at 40% 40%, rgba(100, 116, 139, 0.3), rgba(71, 85, 105, 0.5), rgba(51, 65, 85, 0.7), rgba(30, 41, 59, 0.85))',
    accent: 'rgba(148, 163, 184, 0.4)',
    glow: 'rgba(71, 85, 105, 0.3)',
    glowHover: 'rgba(100, 116, 139, 0.5)',
    smoke: 'rgba(203, 213, 225, 0.15)',
    highlight: 'rgba(241, 245, 249, 0.5)',
    border: 'rgba(148, 163, 184, 0.3)',
    innerShadow: 'rgba(15, 23, 42, 0.4)',
  } : {
    base: 'radial-gradient(circle at 40% 40%, rgba(71, 85, 105, 0.4), rgba(51, 65, 85, 0.6), rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.9))',
    accent: 'rgba(103, 226, 240, 0.25)',
    glow: 'rgba(71, 85, 105, 0.25)',
    glowHover: 'rgba(103, 226, 240, 0.35)',
    smoke: 'rgba(167, 243, 208, 0.08)',
    highlight: 'rgba(167, 243, 208, 0.3)',
    border: 'rgba(100, 116, 139, 0.4)',
    innerShadow: 'rgba(0, 0, 0, 0.5)',
  };

  // Sistema de partículas tipo "humo"
  interface SmokeParticle {
    x: number;
    y: number;
    z: number; // Profundidad
    vx: number;
    vy: number;
    vz: number;
    size: number;
    alpha: number;
    phase: number;
    rotation: number;
    rotationSpeed: number;
  }

  // Inicializar partículas de humo
  useEffect(() => {
    const particleCount = 20; // Más partículas para efecto denso
    smokeParticlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * size,
      y: Math.random() * size,
      z: Math.random(), // 0-1, más cerca = más grande
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      vz: (Math.random() - 0.5) * 0.05,
      size: Math.random() * 4 + 2,
      alpha: Math.random() * 0.15 + 0.05,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }));
  }, [size]);

  // Animación de humo volumétrico
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const animate = () => {
      timeRef.current += 0.006; // Muy lento para efecto etéreo
      ctx.clearRect(0, 0, size, size);

      const particles = smokeParticlesRef.current;
      const centerX = size / 2;
      const centerY = size / 2;
      const maxRadius = size * 0.4;

      // Ordenar por z (profundidad) para correcto rendering
      particles.sort((a, b) => a.z - b.z);

      particles.forEach((p) => {
        // Movimiento tipo fluido turbulento
        const turbulenceX = Math.sin(timeRef.current * 0.5 + p.phase) * 0.3;
        const turbulenceY = Math.cos(timeRef.current * 0.3 + p.phase * 1.3) * 0.3;
        const turbulenceZ = Math.sin(timeRef.current * 0.4 + p.phase * 0.7) * 0.02;

        p.x += p.vx + turbulenceX;
        p.y += p.vy + turbulenceY;
        p.z += p.vz + turbulenceZ;
        p.rotation += p.rotationSpeed;

        // Wrap Z (profundidad cíclica)
        if (p.z < 0) p.z = 1;
        if (p.z > 1) p.z = 0;

        // Mantener partículas dentro del círculo
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > maxRadius) {
          const angle = Math.atan2(dy, dx);
          p.x = centerX + Math.cos(angle) * maxRadius * 0.9;
          p.y = centerY + Math.sin(angle) * maxRadius * 0.9;
          p.vx *= -0.3;
          p.vy *= -0.3;
        }

        // Tamaño basado en profundidad (perspectiva)
        const depthScale = 0.3 + p.z * 0.7;
        const renderSize = p.size * depthScale;

        // Alpha pulsante + profundidad
        const alphaPulse = Math.sin(timeRef.current * 1.5 + p.phase) * 0.05;
        const depthAlpha = 0.3 + p.z * 0.7; // Más cerca = más visible
        const currentAlpha = (p.alpha + alphaPulse) * depthAlpha;

        // Dibujar "humo" con forma irregular
        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Gradiente radial para efecto volumétrico
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, renderSize * 4);
        gradient.addColorStop(0, theme.smoke);
        gradient.addColorStop(0.4, theme.smoke.replace(/[\d.]+\)/, '0.08)'));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        
        // Forma irregular (elipse rotada)
        ctx.scale(1, 1.5);
        ctx.beginPath();
        ctx.arc(0, 0, renderSize * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, theme.smoke]);

  return (
    <button
      onClick={onClick}
      className={`group relative ${className}`}
      style={{ 
        width: size, 
        height: size,
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-label="Open AI Assistant"
    >
      {/* Aura externa - resplandor místico */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-all duration-1000 ease-out"
        style={{ 
          background: theme.glow,
          transform: 'scale(2)',
        }}
      />

      {/* Contenedor principal del orbe */}
      <div 
        className="relative w-full h-full rounded-full overflow-hidden transition-all duration-700 ease-out group-hover:scale-[1.08] group-active:scale-95"
        style={{
          boxShadow: `
            0 0 0 1px ${theme.border},
            0 12px 48px ${theme.glow},
            inset 0 2px 4px ${theme.highlight},
            inset 0 -8px 16px ${theme.innerShadow}
          `,
        }}
      >
        {/* Canvas de humo - movimiento volumétrico */}
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="absolute inset-0 z-20"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Gradiente base - cristal ahumado */}
        <div 
          className="absolute inset-0"
          style={{
            background: theme.base,
          }}
        />

        {/* Capa de niebla interior */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(
                circle at 50% 50%, 
                ${theme.smoke}, 
                transparent 70%
              )
            `,
          }}
        />

        {/* Highlight superior - refracción de luz */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            background: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.6), transparent 40%)',
            animation: 'shimmer-slow 12s ease-in-out infinite',
          }}
        />

        {/* Capa de vidrio - glassmorphism premium */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 38% 32%, rgba(255, 255, 255, 0.2), transparent 65%)',
            backdropFilter: 'blur(12px)',
          }}
        />

        {/* Venas de energía sutil */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(
                ellipse at 30% 70%, 
                ${theme.accent}, 
                transparent 50%
              ),
              radial-gradient(
                ellipse at 70% 30%, 
                ${theme.accent}, 
                transparent 50%
              )
            `,
            animation: 'pulse-slow 8s ease-in-out infinite',
          }}
        />

        {/* Sombra interna inferior - profundidad */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 85%, rgba(0, 0, 0, 0.4), transparent 60%)',
          }}
        />

        {/* Brillo de borde en hover */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"
          style={{
            border: `1.5px solid ${theme.accent}`,
          }}
        />
      </div>

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes shimmer-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translate(3px, 3px) scale(1.1);
            opacity: 0.4;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
      `}</style>
    </button>
  );
}
