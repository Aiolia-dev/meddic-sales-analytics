'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const { t, currentLanguage, setLanguage } = useLanguage();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    // Pour l'instant, on redirige simplement vers la page de login
    router.push('/');
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-gray-900">MEDDIC Analytics</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sélecteur de langue */}
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as 'fr' | 'en')}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
              >
                <option value="fr">{t('language.fr')}</option>
                <option value="en">{t('language.en')}</option>
              </select>
            </div>

            {/* Menu utilisateur */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-cyan-600 flex items-center justify-center text-white">
                  <span>CK</span>
                </div>
                <span>Cédric Kerbidi</span>
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Menu déroulant */}
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {t('header.logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
