'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';

export default function AboutMeSection() {
  const { t } = useLanguage();

  return (
    <section 
      className="w-full py-24"
      style={{
        background: 'radial-gradient(circle at 30% 30%, #67e2f0, transparent 60%), radial-gradient(circle at 70% 70%, #ffbba8, transparent 60%), white'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
            {t.aboutFocusTitle || t.aboutTitle || '¿Quién soy?'}
          </h2>
    
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1fr] gap-12 items-start">
          <div className="flex justify-center lg:justify-start">
            <div className="w-64 h-64 rounded-full overflow-hidden shadow-[0_18px_55px_rgba(15,23,42,0.20)] ring-1 ring-slate-200/70 bg-white/40 backdrop-blur">
              <Image
                src="/oficina.png"
                alt="Guidoll.dev"
                width={500}
                height={500}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl p-6 bg-white shadow-lg shadow-slate-200/40 ring-1 ring-slate-100">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {t.aboutFocusTitle || 'Mi Enfoque'}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {t.aboutIntro}
              </p>
            </div>

            <div className="rounded-3xl p-6 bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-50 shadow-lg shadow-slate-200/30 ring-1 ring-slate-100">
              <h3 className="text-lg font-semibold text-sky-700 mb-3">
                {t.aboutFocusSubtitle || '¿En qué me enfoco?'}
              </h3>
              <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex gap-3">
                  <span>💻</span>
                  <span>{t.aboutFullCycle}</span>
                </li>
                <li className="flex gap-3">
                  <span>🧩</span>
                  <span>{t.aboutPaymentsSEO}</span>
                </li>
                <li className="flex gap-3">
                  <span>🚀</span>
                  <span>{t.aboutGoal}</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/34675497068"
                target="_blank"
                className="block w-full text-center rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-semibold py-4 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all tracking-wide"
              >
                {t.contactWhatsApp || 'Contáctame por WhatsApp'} 💬
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
