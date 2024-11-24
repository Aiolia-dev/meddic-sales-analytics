'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const languageFlags = {
  fr: '🇫🇷',
  en: '🇺🇸'
};

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Titre - visible uniquement sur desktop */}
          <h1 className="text-xl font-semibold text-gray-800 hidden lg:block">
            MEDDIC Analytics
          </h1>

          {/* Actions */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Sélecteur de langue */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Sélectionner la langue"
              >
                <span className="text-xl" role="img" aria-label={language === 'fr' ? 'Français' : 'English'}>
                  {languageFlags[language]}
                </span>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-12 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      className={`w-full px-3 py-2 text-center hover:bg-gray-50 ${
                        language === 'fr' ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => {
                        setLanguage('fr');
                        setIsOpen(false);
                      }}
                      aria-label="Français"
                    >
                      <span className="text-xl" role="img" aria-label="Français">
                        {languageFlags.fr}
                      </span>
                    </button>
                    <button
                      className={`w-full px-3 py-2 text-center hover:bg-gray-50 ${
                        language === 'en' ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => {
                        setLanguage('en');
                        setIsOpen(false);
                      }}
                      aria-label="English"
                    >
                      <span className="text-xl" role="img" aria-label="English">
                        {languageFlags.en}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profil utilisateur */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                John Doe
              </span>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                👤
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
