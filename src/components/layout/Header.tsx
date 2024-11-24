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

  // Fermer le menu lors d'un clic à l'extérieur
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end h-16">
          <div className="relative flex items-center" ref={dropdownRef}>
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
              <div className="absolute right-0 mt-2 top-full w-12 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
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
        </div>
      </div>
    </header>
  );
}
