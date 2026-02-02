'use client';

import { useEffect, useRef } from 'react';

interface PalantirOrbProps {
  size?: number;
  isLightMode?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Palantír Orb - Orbe flotante inspirado en LOTR, Siri y glassmorphism premium
 * 
 * Características:
 * - Movimiento interno tipo Perlin noise
 * - Glassmorphism con refracción realista
 * - Resplandor dinámico que responde al hover
 * - Optimizado para 56-64px
 * - Performance nativa (CSS + Canvas 2D)
 */
export default function PalantirOrb({ 
  size = 56, 
  isLightMode = false,
  onClick,
  className = ''
}: PalantirOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  // Paleta de colores adaptativos
  const theme = isLightMode ? {
    primary: [30, 64, 175],      // Blue 900
    secondary: [59, 130, 246],   // Blue 500
    accent: [96, 165, 250],      // Blue 400
    glow: 'rgba(59, 130, 246, 0.25)',
    glowHover: 'rgba(59, 130, 246, 0.4)',
    gradient: 'radial-gradient(circle at 35% 35%, rgba(147, 197, 253, 0.9), rgba(59, 130, 246, 0.7), rgba(30, 64, 175, 0.85))',
    highlight: 'rgba(255, 255, 255, 0.6)',
    particleColor: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.4)',
  } : {
    primary: [255, 187, 168],    // Coral
    secondary: [103, 226, 240],  // Cyan
    accent: [167, 243, 208],     // Emerald
    glow: 'rgba(255, 187, 168, 0.2)',
    glowHover: 'rgba(103, 226, 240, 0.3)',
    gradient: 'radial-gradient(circle at 35% 35%, rgba(167, 243, 208, 0.5), rgba(103, 226, 240, 0.6), rgba(255, 187, 168, 0.7))',
    highlight: 'rgba(255, 255, 255, 0.4)',
    particleColor: 'rgba(255, 255, 255, 0.6)',
    border: 'rgba(255, 255, 255, 0.2)',
  };

  // Particle system para el movimiento interno
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    phase: number;
  }

  // Inicializar partículas
  useEffect(() => {
    const particleCount = 12;
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * size,
      y: Math.random() * size,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.3 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [size]);

  // Animación del canvas con movimiento Perlin-like
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const animate = () => {
      timeRef.current += 0.008; // Velocidad muy lenta
      ctx.clearRect(0, 0, size, size);

      const particles = particlesRef.current;
      const centerX = size / 2;
      const centerY = size / 2;
      const maxRadius = size * 0.35;

      particles.forEach((p) => {
        // Movimiento tipo Perlin noise (simulado con senos)
        const noiseX = Math.sin(timeRef.current + p.phase) * 0.15;
        const noiseY = Math.cos(timeRef.current * 0.8 + p.phase) * 0.15;

        p.x += p.vx + noiseX;
        p.y += p.vy + noiseY;

        // Mantener partículas dentro del círculo con bounce suave
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > maxRadius) {
          const angle = Math.atan2(dy, dx);
          p.x = centerX + Math.cos(angle) * maxRadius;
          p.y = centerY + Math.sin(angle) * maxRadius;
          p.vx *= -0.5;
          p.vy *= -0.5;
        }

        // Alpha pulsante muy sutil
        const alphaPulse = Math.sin(timeRef.current * 2 + p.phase) * 0.1;
        const currentAlpha = p.alpha + alphaPulse;

        // Dibujar partícula con glow
        ctx.save();
        ctx.globalAlpha = currentAlpha;
        
        // Glow externo
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, theme.particleColor);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core brillante
        ctx.globalAlpha = currentAlpha * 1.5;
        ctx.fillStyle = theme.particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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
  }, [size, theme.particleColor]);

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
      {/* Aura externa - resplandor que responde al hover */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"
        style={{ 
          background: theme.glow,
          transform: 'scale(1.8)',
          transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Halo medio - glow constante */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-60"
        style={{ 
          background: theme.glow,
          transform: 'scale(1.4)',
        }}
      />

      {/* Contenedor principal del orbe */}
      <div 
        className="relative w-full h-full rounded-full overflow-hidden transition-all duration-500 ease-out group-hover:scale-105 group-active:scale-95"
        style={{
          boxShadow: `
            0 0 0 1px ${theme.border},
            0 8px 32px ${theme.glow},
            inset 0 1px 0 ${theme.highlight}
          `,
        }}
      >
        {/* Canvas de partículas - movimiento interno */}
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="absolute inset-0 z-10"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Gradiente base - cuerpo del orbe */}
        <div 
          className="absolute inset-0"
          style={{
            background: theme.gradient,
          }}
        />

        {/* Capa de vidrio - glassmorphism */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 60%)',
            backdropFilter: 'blur(8px)',
          }}
        />

        {/* Highlight superior - refracción de luz */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: 'radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.8), transparent 35%)',
            animation: 'shimmer 8s ease-in-out infinite',
          }}
        />

        {/* Sombra interna inferior - profundidad */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 80%, rgba(0, 0, 0, 0.2), transparent 60%)',
          }}
        />

        {/* Pulso sutil en el borde */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30"
          style={{
            border: `2px solid ${isLightMode ? 'rgba(59, 130, 246, 0.6)' : 'rgba(103, 226, 240, 0.6)'}`,
            animation: 'pulse-border 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* Animaciones CSS inline para evitar dependencias externas */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(2px, 2px) scale(1.05);
            opacity: 0.6;
          }
        }

        @keyframes pulse-border {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }
      `}</style>
    </button>
  );
}
