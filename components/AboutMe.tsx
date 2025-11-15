'use client';

import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';

export default function AboutMe() {
  const { t } = useLanguage();
  useScrollAnimation();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-smooth"></div>
      <div className="absolute bottom-0 right-20 w-72 h-72 bg-salmon rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-smooth" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t.aboutTitle}
          </h2>
        </div>

        {/* Content with Image */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-slide-in-scale">
            <div className="relative rounded-3xl overflow-hidden h-96 md:h-[500px] border-4 border-salmon shadow-2xl">
              <Image
                src="/Sagradabambula.png"
                alt="Guido Llaurado"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Intro */}
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-salmon/20 hover:border-salmon transition-all duration-300 shadow-lg hover:shadow-xl">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.aboutIntro}
              </p>
            </div>

            {/* Technologies & Services */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 border-2 border-sky-300 hover:border-sky-500 transition-all duration-300 shadow-lg hover:shadow-xl">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.aboutTechnologies}
              </p>
            </div>

            {/* Closure */}
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-salmon/20 hover:border-salmon transition-all duration-300 shadow-lg hover:shadow-xl">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.aboutClosure}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href="https://wa.me/34675497068"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center py-4 px-8 bg-gradient-to-b from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl active:scale-95"
              >
                {t.contactWhatsApp} 📱
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
