'use client';

import { useState } from 'react';
import PalantirOrb from './PalantirOrb';

/**
 * Demo interactivo del Palantír Orb
 * Muestra todas las variaciones y opciones de personalización
 */
export default function PalantirOrbDemo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [size, setSize] = useState(56);
  const [showGrid, setShowGrid] = useState(true);

  const isLight = theme === 'light';

  return (
    <div 
      className="min-h-screen transition-colors duration-500 p-8"
      style={{
        background: isLight 
          ? 'linear-gradient(to bottom, #f8fafc, #e2e8f0)'
          : 'linear-gradient(to bottom, #0f172a, #1e293b)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: isLight ? '#0f172a' : '#f1f5f9' }}
          >
            🔮 Palantír Orb
          </h1>
          <p 
            className="text-lg md:text-xl"
            style={{ color: isLight ? '#475569' : '#94a3b8' }}
          >
            Orbe vivo inspirado en LOTR, Siri y glassmorphism premium
          </p>
        </div>

        {/* Controls */}
        <div 
          className="rounded-2xl p-6 mb-12 backdrop-blur-xl"
          style={{
            background: isLight 
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(15, 23, 42, 0.5)',
            border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Theme Toggle */}
            <div>
              <label 
                className="block text-sm font-medium mb-3"
                style={{ color: isLight ? '#1e293b' : '#e2e8f0' }}
              >
                Tema
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    isLight ? 'scale-105' : 'scale-100 opacity-50'
                  }`}
                  style={{
                    background: isLight 
                      ? 'linear-gradient(135deg, #1e40af, #3b82f6)'
                      : 'rgba(59, 130, 246, 0.2)',
                    color: isLight ? '#fff' : '#94a3b8',
                  }}
                >
                  ☀️ Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    !isLight ? 'scale-105' : 'scale-100 opacity-50'
                  }`}
                  style={{
                    background: !isLight 
                      ? 'linear-gradient(135deg, #ffbba8, #67e2f0)'
                      : 'rgba(255, 187, 168, 0.2)',
                    color: !isLight ? '#0f172a' : '#64748b',
                  }}
                >
                  🌙 Dark
                </button>
              </div>
            </div>

            {/* Size Slider */}
            <div>
              <label 
                className="block text-sm font-medium mb-3"
                style={{ color: isLight ? '#1e293b' : '#e2e8f0' }}
              >
                Tamaño: {size}px
              </label>
              <input
                type="range"
                min="40"
                max="80"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
                style={{
                  accentColor: isLight ? '#3b82f6' : '#67e2f0',
                }}
              />
            </div>

            {/* Grid Toggle */}
            <div>
              <label 
                className="block text-sm font-medium mb-3"
                style={{ color: isLight ? '#1e293b' : '#e2e8f0' }}
              >
                Grid de Fondo
              </label>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="px-4 py-2 rounded-lg transition-all"
                style={{
                  background: showGrid 
                    ? isLight 
                      ? 'linear-gradient(135deg, #1e40af, #3b82f6)'
                      : 'linear-gradient(135deg, #ffbba8, #67e2f0)'
                    : isLight
                      ? 'rgba(0,0,0,0.05)'
                      : 'rgba(255,255,255,0.05)',
                  color: showGrid 
                    ? isLight ? '#fff' : '#0f172a'
                    : isLight ? '#64748b' : '#94a3b8',
                }}
              >
                {showGrid ? '✓ Activado' : '✗ Desactivado'}
              </button>
            </div>
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Variación 1: Normal */}
          <ShowcaseCard
            title="Normal"
            description="Estado por defecto, ideal para uso general"
            isLight={isLight}
            showGrid={showGrid}
          >
            <PalantirOrb
              size={size}
              isLightMode={isLight}
              onClick={() => alert('¡Orbe clickeado!')}
            />
          </ShowcaseCard>

          {/* Variación 2: Pequeño (Mobile) */}
          <ShowcaseCard
            title="Compacto"
            description="Optimizado para móviles (48px)"
            isLight={isLight}
            showGrid={showGrid}
          >
            <PalantirOrb
              size={48}
              isLightMode={isLight}
              onClick={() => alert('¡Compacto!')}
            />
          </ShowcaseCard>

          {/* Variación 3: Grande (Hero) */}
          <ShowcaseCard
            title="Hero"
            description="Versión grande para destacar (80px)"
            isLight={isLight}
            showGrid={showGrid}
          >
            <PalantirOrb
              size={80}
              isLightMode={isLight}
              onClick={() => alert('¡Hero!')}
            />
          </ShowcaseCard>
        </div>

        {/* Contexto de Uso */}
        <div 
          className="rounded-2xl p-8 backdrop-blur-xl"
          style={{
            background: isLight 
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(15, 23, 42, 0.5)',
            border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          <h2 
            className="text-2xl font-bold mb-6"
            style={{ color: isLight ? '#0f172a' : '#f1f5f9' }}
          >
            Contextos de Uso
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sobre fondo claro */}
            <div
              className="rounded-xl p-8 flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                minHeight: '200px',
              }}
            >
              {showGrid && <GridPattern light />}
              <PalantirOrb
                size={size}
                isLightMode={true}
                onClick={() => {}}
              />
              <div className="absolute top-4 left-4 text-sm font-medium text-slate-700">
                Fondo Claro
              </div>
            </div>

            {/* Sobre fondo oscuro */}
            <div
              className="rounded-xl p-8 flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                minHeight: '200px',
              }}
            >
              {showGrid && <GridPattern light={false} />}
              <PalantirOrb
                size={size}
                isLightMode={false}
                onClick={() => {}}
              />
              <div className="absolute top-4 left-4 text-sm font-medium text-slate-300">
                Fondo Oscuro
              </div>
            </div>
          </div>
        </div>

        {/* Specs Técnicas */}
        <div 
          className="rounded-2xl p-8 mt-8 backdrop-blur-xl"
          style={{
            background: isLight 
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(15, 23, 42, 0.5)',
            border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          <h2 
            className="text-2xl font-bold mb-6"
            style={{ color: isLight ? '#0f172a' : '#f1f5f9' }}
          >
            Especificaciones Técnicas
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <SpecCard
              label="Bundle Size"
              value="~2KB"
              icon="📦"
              isLight={isLight}
            />
            <SpecCard
              label="Performance"
              value="60fps"
              icon="⚡"
              isLight={isLight}
            />
            <SpecCard
              label="Partículas"
              value="12"
              icon="✨"
              isLight={isLight}
            />
            <SpecCard
              label="Capas"
              value="7"
              icon="🎨"
              isLight={isLight}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para las tarjetas de showcase
function ShowcaseCard({ 
  title, 
  description, 
  children, 
  isLight,
  showGrid 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode;
  isLight: boolean;
  showGrid: boolean;
}) {
  return (
    <div 
      className="rounded-2xl p-6 backdrop-blur-xl transition-all hover:scale-105"
      style={{
        background: isLight 
          ? 'rgba(255, 255, 255, 0.7)'
          : 'rgba(15, 23, 42, 0.5)',
        border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
      }}
    >
      <h3 
        className="text-lg font-bold mb-2"
        style={{ color: isLight ? '#0f172a' : '#f1f5f9' }}
      >
        {title}
      </h3>
      <p 
        className="text-sm mb-6"
        style={{ color: isLight ? '#64748b' : '#94a3b8' }}
      >
        {description}
      </p>
      <div className="flex items-center justify-center h-32 relative">
        {showGrid && <GridPattern light={isLight} />}
        {children}
      </div>
    </div>
  );
}

// Componente para las specs
function SpecCard({ 
  label, 
  value, 
  icon, 
  isLight 
}: { 
  label: string; 
  value: string; 
  icon: string;
  isLight: boolean;
}) {
  return (
    <div 
      className="rounded-xl p-4"
      style={{
        background: isLight 
          ? 'rgba(0,0,0,0.03)'
          : 'rgba(255,255,255,0.03)',
      }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div 
        className="text-2xl font-bold mb-1"
        style={{ color: isLight ? '#0f172a' : '#f1f5f9' }}
      >
        {value}
      </div>
      <div 
        className="text-xs"
        style={{ color: isLight ? '#64748b' : '#94a3b8' }}
      >
        {label}
      </div>
    </div>
  );
}

// Grid pattern de fondo
function GridPattern({ light }: { light: boolean }) {
  return (
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(${light ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)'} 1px, transparent 1px),
          linear-gradient(90deg, ${light ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)'} 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}
    />
  );
}
