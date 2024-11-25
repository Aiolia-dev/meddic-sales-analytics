'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    // Simulation d'authentification
    if (email === 'cedric@example.com' && password === 'password') {
      router.push('/dashboard');
    } else {
      setError(t('login.error'));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Colonne de gauche avec message impactant */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-cyan-500 to-cyan-700 p-12 items-center justify-center text-white">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-6">
            Optimisez vos ventes avec MEDDIC Analytics
          </h1>
          <p className="text-xl leading-relaxed opacity-90">
            Transformez vos réunions commerciales en insights stratégiques. 
            Suivez, analysez et améliorez votre processus de vente MEDDIC 
            pour maximiser votre taux de conversion.
          </p>
          <div className="mt-8 space-y-4 text-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Analyse en temps réel de vos critères MEDDIC</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Suivi détaillé des performances de l'équipe</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Rapports et insights personnalisés</span>
            </div>
          </div>
        </div>
      </div>

      {/* Colonne de droite avec formulaire de login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t('login.title')}</h2>
            <p className="mt-2 text-gray-600">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('login.email.label')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('login.password.label')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  {t('login.remember')}
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
                  {t('login.forgot')}
                </a>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              {t('login.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
