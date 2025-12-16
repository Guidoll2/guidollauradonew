'use client';

import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTheme } from '@/lib/theme-context';

export default function ProjectsSection() {
  const { t } = useLanguage();
  const { isLightMode } = useTheme();
  useScrollAnimation();

  const projects = [
    {
      label: t.project1Label || 'Plataforma tipo red social',
      title: t.project1Title || 'EmpleArg: red de empleo con +2.600 usuarios',
      description:
        t.project1Desc ||
        'Plataforma creada para conectar personas desempleadas con empresas. Incluye perfiles, panel administrador, publicaciones, sistema de autenticación y analítica integrada.',
      result:
        t.project1Result ||
        'Crecimiento orgánico y validación del modelo gracias a un producto estable y fácil de usar.',
      tags: ['Next.js', 'Auth', 'Panel admin', 'MongoDB'],
      link: t.project1Link || null, // puedes poner acá la URL real si quieres
    },
    {
      label: t.project2Label || 'Software a medida',
      title:
        t.project2Title ||
        'Sistema de gestión para empresa agrícola',
      description:
        t.project2Desc ||
        'Aplicación interna para administrar campos, lotes, tareas y producción. Diseñada para mejorar la trazabilidad y la toma de decisiones en el día a día.',
      result:
        t.project2Result ||
        'Información centralizada, menos errores operativos y mejor control del negocio.',
      tags: ['SaaS interno', 'Dashboards', 'APIs', 'Reporting'],
      link: t.project2Link || null,
    },
    {
      label: t.project3Label || 'E-commerce optimizado',
      title:
        t.project3Title ||
        'Tienda online con pagos y envíos automatizados',
      description:
        t.project3Desc ||
        'Desarrollo de tienda online con Stripe, integración con mensajería (Sendcloud) y eventos de Analytics para medir todo el funnel de compra.',
      result:
        t.project3Result ||
        'Proceso de venta automático: pedido, pago, generación de etiqueta de envío y notificaciones al cliente.',
      tags: ['Stripe', 'Sendcloud', 'Conversion tracking', 'SEO'],
      link: t.project3Link || null,
    },
  ];

  return (
    <section
      id="projects"
      className={`relative overflow-hidden py-24 transition-colors duration-500 ${
        isLightMode
          ? 'bg-white'
          : 'bg-slate-950'
      }`}
    >
      {/* Fondo suave, muy minimal */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute top-0 left-1/2 h-72 w-[32rem] -translate-x-1/2 rounded-full blur-3xl transition-colors duration-500 ${
            isLightMode
              ? 'bg-sky-100/80'
              : 'bg-sky-500/10'
          }`}
        />
        <div
          className={`absolute bottom-[-6rem] right-[-4rem] h-80 w-80 rounded-full blur-3xl transition-colors duration-500 ${
            isLightMode
              ? 'bg-rose-100/80'
              : 'bg-rose-500/10'
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Cabecera de sección */}
        <div className="mb-12 max-w-3xl fade-in">
          <p
            className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm transition-colors duration-500 ${
              isLightMode
                ? 'border-slate-200/70 bg-white/80 text-slate-500'
                : 'border-slate-700/70 bg-slate-900/70 text-slate-300'
            }`}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
            {t.projectsPill ||
              'Proyectos reales, en producción'}
          </p>

          <h2
            className={`text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl transition-colors duration-500 ${
              isLightMode ? 'text-slate-900' : 'text-slate-50'
            }`}
          >
            {t.projectsTitle ||
              'Proyectos que combinan producto, negocio y tecnología.'}
          </h2>

          <p
            className={`mt-4 text-base leading-relaxed md:text-lg transition-colors duration-500 ${
              isLightMode ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            {t.projectsSubtitle ||
              'Desde plataformas tipo red social hasta software de gestión y tiendas online. Cada proyecto se diseña para resolver un problema concreto del negocio, no solo para “tener una web bonita”.'}
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 fade-in">
          {projects.map((project, index) => (
            <article
              key={index}
              className={`group flex h-full flex-col rounded-3xl border p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                isLightMode
                  ? 'border-slate-100 bg-white/90 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/60'
                  : 'border-slate-800/70 bg-slate-900/80 hover:border-slate-700'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium transition-colors duration-500 ${
                    isLightMode
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {project.label}
                </span>
              </div>

              <h3
                className={`mb-3 text-sm font-semibold leading-snug transition-colors duration-500 ${
                  isLightMode ? 'text-slate-900' : 'text-slate-50'
                }`}
              >
                {project.title}
              </h3>

              <p
                className={`mb-3 text-xs leading-relaxed transition-colors duration-500 ${
                  isLightMode ? 'text-slate-600' : 'text-slate-300/90'
                }`}
              >
                {project.description}
              </p>

              <p
                className={`mb-4 text-xs font-medium transition-colors duration-500 ${
                  isLightMode ? 'text-slate-700' : 'text-slate-200'
                }`}
              >
                {project.result}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-500 ${
                      isLightMode
                        ? 'border-slate-200 bg-slate-50 text-slate-500'
                        : 'border-slate-700 bg-slate-900/80 text-slate-300'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && (
                <div className="mt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-xs font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                  >
                    Ver proyecto
                    <svg
                      className="ml-1 h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.7}
                        d="M9 5h10M19 5v10M19 5L5 19"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
