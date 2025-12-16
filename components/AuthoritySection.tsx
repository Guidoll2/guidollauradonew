'use client';

import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTheme } from '@/lib/theme-context';

export default function AuthoritySection() {
  const { t } = useLanguage();
  const { isLightMode } = useTheme();
  useScrollAnimation();

  const strengths = [
    {
      title: t.authority1Title || 'UX/UI enfocado en conversión',
      description:
        t.authority1Desc ||
        'Diseños limpios, rápidos y fáciles de usar que guían al usuario a la acción: comprar, reservar o contactar.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M4 5a2 2 0 012-2h12a2 2 0 012 2v11a2 2 0 01-2 2h-6l-3.5 3.5A1 1 0 018 21v-3H6a2 2 0 01-2-2V5z"
          />
        </svg>
      ),
    },
    {
      title: t.authority2Title || 'E-commerce medido, no intuitivo',
      description:
        t.authority2Desc ||
        'Integración completa con Stripe, pasarelas de pago y automatizaciones para que cada venta quede trazada.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M3 5h18M6 5l1.5 12.5A2 2 0 009.5 19h5a2 2 0 001.99-1.78L18 9M10 11h4m-5 4h2"
          />
        </svg>
      ),
    },
    {
      title:
        t.authority3Title || 'Analytics + Pixel de Meta y TikTok Ads',
      description:
        t.authority3Desc ||
        'Configuro GA4 y los píxeles publicitarios para que puedas optimizar campañas con datos reales, no suposiciones.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M4 19V9m5 10V5m5 14v-7m5 7V8"
          />
        </svg>
      ),
    },
    {
      title: t.authority4Title || 'Arquitectura sólida y escalable',
      description:
        t.authority4Desc ||
        'Next.js, APIs bien pensadas e integraciones estables para que tu proyecto crezca sin volverse un problema técnico.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="authority"
      className={`relative overflow-hidden py-24 transition-colors duration-500 ${
        isLightMode
          ? 'bg-gradient-to-b from-white via-slate-50 to-white'
          : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
      }`}
    >
      {/* manchas suaves de fondo, muy sutiles */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl transition-colors duration-500 ${
          isLightMode ? 'bg-sky-200/40' : 'bg-sky-500/15'
        }`} />
        <div className={`absolute bottom-0 right-[-6rem] h-80 w-80 rounded-full blur-3xl transition-colors duration-500 ${
          isLightMode ? 'bg-rose-200/40' : 'bg-rose-500/15'
        }`} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:grid lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        {/* Columna izquierda: copy de autoridad */}
        <div className="space-y-6 fade-in">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-sm transition-colors duration-500 ${
            isLightMode
              ? 'border-slate-200/70 bg-white/80 text-slate-500'
              : 'border-slate-700/60 bg-slate-900/70 text-slate-300'
          }`}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {t.authorityPill || 'Autoridad, datos y diseño al servicio de tu negocio'}
          </div>

          <h2 className={`text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl transition-colors duration-500 ${
            isLightMode ? 'text-slate-900' : 'text-slate-50'
          }`}>
            {t.authorityTitle ||
              'No solo diseño webs. Construyo herramientas digitales que venden y miden.'}
          </h2>

          <p className={`max-w-xl text-base leading-relaxed md:text-lg transition-colors duration-500 ${
            isLightMode ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t.authoritySubtitle ||
  'Trabajo con negocios que entienden que su web y su software son piezas clave del negocio: estética cuidada, rendimiento, métricas claras y capacidad real para escalar campañas y operaciones.'}

          </p>

          <ul className={`space-y-3 text-sm md:text-base transition-colors duration-500 ${
            isLightMode ? 'text-slate-600' : 'text-slate-300'
          }`}>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-50 text-[10px] text-emerald-600 dark:bg-emerald-500/10">
                ✓
              </span>
              <span>
             {t.authorityBullet1 ||
  'Experiencia construyendo tiendas online, plataformas tipo red social y software a medida para empresas, conectados a Stripe, Sendcloud y otras APIs.'}

              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500/30 text-[10px] text-emerald-600 transition-colors duration-500 ${
                isLightMode ? 'bg-emerald-50' : 'bg-emerald-500/10'
              }`}>
                ✓
              </span>
              <span>
                {t.authorityBullet2 ||
                  'Implementación de Analytics, eventos clave y píxeles publicitarios para tomar decisiones con datos.'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500/30 text-[10px] text-emerald-600 transition-colors duration-500 ${
                isLightMode ? 'bg-emerald-50' : 'bg-emerald-500/10'
              }`}>
                ✓
              </span>
              <span>
                {t.authorityBullet3 ||
                  'Acompañamiento técnico directo: hablas conmigo, no con un intermediario o un soporte genérico.'}
              </span>
            </li>
          </ul>

          {/* Chips de stack / especialización */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
  'E-commerce & Stripe',
  'Software a medida',
  'Sistemas de gestión',
  'Meta & TikTok Pixel',
].map((label) => (
              <span
                key={label}
                className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm transition-colors duration-500 ${
                  isLightMode
                    ? 'border-slate-200/70 bg-white/80 text-slate-500'
                    : 'border-slate-700/60 bg-slate-900/60 text-slate-300'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Columna derecha: cards de fortalezas */}
        <div className="grid gap-4 fade-in md:grid-cols-2">
          {strengths.map((item, index) => (
            <article
              key={index}
              className={`group flex flex-col rounded-2xl border p-5 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                isLightMode
                  ? 'border-slate-100 bg-white/80 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/60'
                  : 'border-slate-800/70 bg-slate-900/70 hover:border-slate-700'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-md transition-colors duration-500 ${
                isLightMode
                  ? 'bg-slate-900 text-slate-50 shadow-slate-900/30'
                  : 'bg-slate-100 text-slate-900'
              }`}>
                {item.icon}
              </div>
              <h3 className={`mb-2 text-sm font-semibold transition-colors duration-500 ${
                isLightMode ? 'text-slate-900' : 'text-slate-50'
              }`}>
                {item.title}
              </h3>
              <p className={`text-xs leading-relaxed transition-colors duration-500 ${
                isLightMode ? 'text-slate-500' : 'text-slate-300/90'
              }`}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
