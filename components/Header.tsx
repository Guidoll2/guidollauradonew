'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { Language } from '@/lib/types';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { isLightMode, toggleTheme } = useTheme();

  const languages: { code: Language; label: string }[] = [
    { code: 'es', label: 'ES' },
    { code: 'ca', label: 'CA' },
    { code: 'en', label: 'EN' }
  ];

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-500 ${
      isLightMode 
        ? 'bg-white/80 border-gray-100' 
        : 'bg-slate-900/80 border-slate-800'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
         
          <button onClick={handleLogoClick} className="flex items-center hover:opacity-80 transition-opacity">
         <svg className={`w-6 h-6 transition-colors duration-500 ${
           isLightMode ? 'text-gray-700' : 'text-white'
         }`} fill="none" stroke="currentColor"
  viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
  <path d="M3.5 11L12 4l8.5 7" />
  <path d="M6 12v7.5a1.5 1.5 0 0 0 1.5 1.5H16.5A1.5 1.5 0 0 0 18 19.5V12" />
</svg>

          </button>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 transition-colors ${
                isLightMode 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-gray-300 hover:text-white'
              }`}
              title={isLightMode ? 'Modo oscuro' : 'Modo claro'}
              aria-label="Cambiar tema"
            >
              {isLightMode ? <Moon size={22} /> : <Sun size={22} />}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isLightMode
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <span>{languages.find(lang => lang.code === language)?.label}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isLangMenuOpen && (
                <div className={`absolute top-full right-0 mt-1 rounded-lg shadow-lg border py-1 min-w-[80px] transition-colors ${
                  isLightMode
                    ? 'bg-white border-gray-200'
                    : 'bg-slate-800 border-slate-700'
                }`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === lang.code 
                          ? isLightMode
                            ? 'bg-gray-50 text-blue-600 font-medium'
                            : 'bg-slate-700 text-blue-400 font-medium'
                          : isLightMode
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}