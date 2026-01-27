'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTheme } from '@/lib/theme-context';

export default function ShowcaseSection() {
  const { t } = useLanguage();
  const { isLightMode } = useTheme();
  useScrollAnimation();

  const mainProjects = [
    {
      id: 'onemore',
      label: t.showcase3Label || 'E-commerce optimizado',
      title:
        t.showcase3Title ||
        'OneMore – Tienda online con pagos y envíos automatizados',
      description:
        t.showcase3Desc ||
        'E-commerce integrado con Stripe y Sendcloud, pensado para medir todo el funnel de compra y automatizar el proceso de venta.',
      url: 'https://www.one-more.es',
      desktopSrc: '/onemore.png',
      mobileSrc: '/onemoresm.png',
      tags: ['Stripe', 'Sendcloud', 'Conversion tracking', 'SEO'],
    },
    {
      id: 'kalmi',
      label: t.showcase4Label || 'Tienda online',
      title:
        t.showcase4Title ||
        'Kalmi – E-commerce con IA y Mercado Pago',
      description:
        t.showcase4Desc ||
        'Tienda online para cliente en Buenos Aires, Argentina. Con integración de Mercado Pago, API de correos, dashboard de administrador y edición de imágenes con IA.',
      url: 'https://www.kalmi.com.ar',
      desktopSrc: '/kalmi.png',
      mobileSrc: '/kalmism.png',
      tags: ['Mercado Pago', 'Admin Dashboard', 'Email API', 'IA'],
    },
    {
      id: 'cuatrogranos',
      label: t.showcase2Label || 'Software de gestión',
      title: t.showcase2Title || 'CuatroGranos – Sistema de gestión agrícola',
      description:
        t.showcase2Desc ||
        'Aplicación para administrar campos, lotes, campañas y tareas. Información centralizada para mejorar la trazabilidad y la toma de decisiones.',
      url: 'https://www.cuatrogranos.com',
      desktopSrc: '/cuatrogranos.png',
      mobileSrc: '/cuatrogranossm.png',
      tags: ['SaaS', 'Dashboards', 'Reporting', 'APIs'],
    },
    {
      id: 'emplearg',
      label: t.showcase1Label || 'Plataforma tipo red social',
      title: t.showcase1Title || 'EmpleArg – Red de empleo con +2.600 usuarios',
      description:
        t.showcase1Desc ||
        'Plataforma para conectar personas desempleadas con empresas, con perfiles, publicaciones, panel administrador y autenticación completa.',
      url: 'https://www.emplearg.com',
      desktopSrc: '/emplearg.png',
      mobileSrc: '/empleargsm.png',
      tags: ['Next.js', 'Auth', 'Panel admin', 'MongoDB'],
    },
    {
      id: 'fontaneria',
      label: t.showcase5Label || 'Web con marketing digital',
      title:
        t.showcase5Title ||
        'Fontanería i Piscinas – Web + Google Business + Publicidad',
      description:
        t.showcase5Desc ||
        'Sitio web profesional con diseño optimizado. Incluye alta en Google Business para aparecer en maps, integración de Google Analytics y gestión completa de campaña publicitaria.',
      url: 'https://www.fontaneriaipiscinas.com',
      desktopSrc: '/fontaneria.png',
      mobileSrc: '/fontaneriasm.png',
      tags: ['Google Business', 'Analytics', 'SEO Local', 'Google Ads'],
    },
    {
      id: 'eventosenbarcelona',
      label: t.showcase6Label || 'Web empresarial',
      title:
        t.showcase6Title ||
        'Eventos en Barcelona – Plataforma de eventos nocturnos',
      description:
        t.showcase6Desc ||
        'Sitio web empresarial para eventos nocturnos en Barcelona. Desarrollo completo de interfaz con secciones, galería, sistema multiidioma, formulario de reservas con MailerSend y optimización SEO.',
      url: 'https://www.eventosenbarcelona.com',
      desktopSrc: '/eventosenbarcelona.png',
      mobileSrc: '/eventossm.png',
      tags: ['Multiidioma', 'MailerSend', 'SEO', 'Galería'],
    },
    {
      id: 'pidosoporte',
      label: t.showcase7Label || 'Web corporativa',
      title:
        t.showcase7Title ||
        'Pido Soporte – Empresa de IT en Argentina',
      description:
        t.showcase7Desc ||
        'Sitio web profesional para empresa de IT en Argentina. Diseño tech moderno, funcional y sencillo con enlaces a redes sociales, WhatsApp y presentación de servicios.',
      url: 'https://www.pidosoporte.com',
      desktopSrc: '/pidosoporte.png',
      mobileSrc: '/pidosoportesm.png',
      tags: ['Landing', 'IT', 'WhatsApp', 'Diseño moderno'],
    },
  ];

  const otherSites = [
    {
      name: 'Fontanería y Piscinas',
      url: 'https://www.fontaneriaipiscinas.com/',
    },
    {
      name: 'Eventos en Barcelona',
      url: 'https://www.eventosenbarcelona.com/',
    },
    {
      name: 'Pido Soporte',
      url: 'https://www.pidosoporte.com/',
    },
    {
      name: 'Portfolio Candelaria Gherardi',
      url: 'https://laureanogh.vercel.app/',
    },
  ];

  return (
    <section
      id="showcase"
      className={`relative overflow-hidden py-24 transition-colors duration-500 ${
        isLightMode ? 'bg-white' : 'bg-slate-950'
      }`}
    >
      {/* halo de fondo suave */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute top-[-6rem] left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full blur-3xl transition-colors duration-500 ${
            isLightMode ? 'bg-sky-100/80' : 'bg-sky-500/10'
          }`}
        />
        <div
          className={`absolute bottom-[-8rem] right-[-6rem] h-80 w-80 rounded-full blur-3xl transition-colors duration-500 ${
            isLightMode ? 'bg-rose-100/80' : 'bg-rose-500/10'
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* header */}
        <div className="mb-12 max-w-3xl fade-in">
          <p
            className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm transition-colors duration-500 ${
              isLightMode
                ? 'border-slate-200/70 bg-white/80 text-slate-500'
                : 'border-slate-700/70 bg-slate-900/80 text-slate-300'
            }`}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
            {t.showcasePill || 'Cómo se ven los proyectos en producción'}
          </p>

          <h2
            className={`text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl transition-colors duration-500 ${
              isLightMode ? 'text-slate-900' : 'text-slate-50'
            }`}
          >
            {t.showcaseTitle ||
              'Interfaces reales, pensadas para usarse todos los días.'}
          </h2>

          <p
            className={`mt-4 text-base leading-relaxed md:text-lg transition-colors duration-500 ${
              isLightMode ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            {t.showcaseSubtitle ||
              'Una selección de proyectos donde diseño, tecnología y negocio trabajan juntos: plataformas, software interno y tiendas online listas para escalar.'}
          </p>
        </div>

        {/* proyectos principales */}
        <div className="space-y-10 fade-in">
          {mainProjects.map((project, index) => (
            <article
              key={project.id}
              className={`grid gap-8 rounded-3xl border p-6 shadow-sm backdrop-blur-sm transition-all duration-300 md:grid-cols-2 lg:items-center ${
                isLightMode
                  ? 'border-slate-100 bg-white/90 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/60'
                  : 'border-slate-800/80 bg-slate-900/80 hover:border-slate-700'
              }`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* texto */}
              <div className="flex flex-col gap-4">
                <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-medium transition-colors duration-500 ${
                    isLightMode
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {project.label}
                </span>

                <h3
                  className={`text-sm font-semibold leading-snug transition-colors duration-500 ${
                    isLightMode ? 'text-slate-900' : 'text-slate-50'
                  }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`text-xs leading-relaxed transition-colors duration-500 ${
                    isLightMode ? 'text-slate-600' : 'text-slate-300/90'
                  }`}
                >
                  {project.description}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
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

                <div className="mt-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-xs font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                  >
                    Visitar sitio
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
              </div>

              {/* mockups MacBook + iPhone */}
              <div className="relative flex items-center justify-center p-4">
                {/* base gradient */}
                <div
                  className={`absolute inset-0 rounded-3xl opacity-50 blur-3xl transition-colors duration-500 ${
                    isLightMode
                      ? 'bg-gradient-to-br from-sky-100 via-slate-50 to-rose-100'
                      : 'bg-gradient-to-br from-sky-500/20 via-slate-900 to-rose-500/20'
                  }`}
                />

                <div className="relative flex w-full items-end justify-center gap-3 md:gap-4">
                  {/* MacBook frame */}
                  <div
                    className={`relative flex aspect-[16/10] w-full max-w-[280px] flex-col overflow-hidden rounded-xl border shadow-xl transition-all duration-500 ${
                      isLightMode
                        ? 'border-slate-300 bg-slate-900'
                        : 'border-slate-700 bg-black'
                    }`}
                  >
                    {/* top bar con dots */}
                    <div className={`flex items-center gap-1.5 border-b px-3 py-2 ${
                      isLightMode ? 'border-slate-700 bg-slate-800' : 'border-slate-800 bg-slate-900'
                    }`}>
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                    </div>

                    {/* contenido */}
                    <div className="relative flex-1 overflow-hidden bg-white">
                      <Image
                        src={project.desktopSrc}
                        alt={`${project.title} – vista desktop`}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* iPhone frame */}
                  <div
                    className={`relative aspect-[9/19.5] w-20 overflow-hidden rounded-[1.5rem] border shadow-lg transition-all duration-500 md:w-24 ${
                      isLightMode
                        ? 'border-slate-300 bg-slate-900'
                        : 'border-slate-700 bg-black'
                    }`}
                  >
                    {/* notch */}
                    <div className={`absolute left-1/2 top-1 z-10 h-2 w-12 -translate-x-1/2 rounded-full ${
                      isLightMode ? 'bg-slate-800' : 'bg-slate-950'
                    }`} />
                    
                    {/* contenido */}
                    <div className="relative h-full w-full overflow-hidden bg-white">
                      <Image
                        src={project.mobileSrc}
                        alt={`${project.title} – vista móvil`}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
