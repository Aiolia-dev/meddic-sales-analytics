'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface MeddicSettings {
  minimumScore: number;
  warningThreshold: number;
  criticalThreshold: number;
  autoReminders: boolean;
}

interface NotificationSettings {
  emailNotifications: boolean;
  meetingReminders: boolean;
  scoreAlerts: boolean;
  weeklyReport: boolean;
  monthlyReport: boolean;
}

interface DisplaySettings {
  defaultView: 'list' | 'grid';
  defaultPeriod: 'week' | 'month' | 'quarter';
  compactMode: boolean;
  darkMode: boolean;
}

export default function SettingsPage() {
  const { t } = useLanguage();

  // États pour les différentes sections de paramètres
  const [meddic, setMeddic] = useState<MeddicSettings>({
    minimumScore: 70,
    warningThreshold: 60,
    criticalThreshold: 40,
    autoReminders: true,
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    meetingReminders: true,
    scoreAlerts: true,
    weeklyReport: false,
    monthlyReport: true,
  });

  const [display, setDisplay] = useState<DisplaySettings>({
    defaultView: 'list',
    defaultPeriod: 'month',
    compactMode: false,
    darkMode: false,
  });

  // Gestionnaires d'événements
  const handleMeddicChange = (key: keyof MeddicSettings, value: number | boolean) => {
    setMeddic(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDisplayChange = (key: keyof DisplaySettings, value: any) => {
    setDisplay(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* En-tête de la page */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">Personnalisez votre expérience MEDDIC Analytics</p>
      </div>

      {/* Paramètres MEDDIC */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Configuration MEDDIC</h2>
        <div className="space-y-6">
          {/* Score minimum */}
          <div>
            <label className="flex justify-between mb-2">
              <span className="text-gray-700">Score minimum requis</span>
              <span className="text-blue-600 font-medium">{meddic.minimumScore}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={meddic.minimumScore}
              onChange={(e) => handleMeddicChange('minimumScore', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Seuil d'alerte */}
          <div>
            <label className="flex justify-between mb-2">
              <span className="text-gray-700">Seuil d'alerte</span>
              <span className="text-yellow-600 font-medium">{meddic.warningThreshold}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={meddic.warningThreshold}
              onChange={(e) => handleMeddicChange('warningThreshold', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Seuil critique */}
          <div>
            <label className="flex justify-between mb-2">
              <span className="text-gray-700">Seuil critique</span>
              <span className="text-red-600 font-medium">{meddic.criticalThreshold}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={meddic.criticalThreshold}
              onChange={(e) => handleMeddicChange('criticalThreshold', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Rappels automatiques */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Rappels automatiques</span>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={meddic.autoReminders}
                  onChange={() => handleMeddicChange('autoReminders', !meddic.autoReminders)}
                />
                <div className={`block w-14 h-8 rounded-full transition-colors ${
                  meddic.autoReminders ? 'bg-blue-600' : 'bg-gray-300'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                  meddic.autoReminders ? 'translate-x-6' : ''
                }`}></div>
              </div>
            </label>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Notifications</h2>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Notifications par email' },
            { key: 'meetingReminders', label: 'Rappels de réunions' },
            { key: 'scoreAlerts', label: 'Alertes de score MEDDIC' },
            { key: 'weeklyReport', label: 'Rapport hebdomadaire' },
            { key: 'monthlyReport', label: 'Rapport mensuel' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <span className="text-gray-700">{label}</span>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={notifications[key as keyof NotificationSettings]}
                    onChange={() => handleNotificationChange(key as keyof NotificationSettings)}
                  />
                  <div className={`block w-14 h-8 rounded-full transition-colors ${
                    notifications[key as keyof NotificationSettings] ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                    notifications[key as keyof NotificationSettings] ? 'translate-x-6' : ''
                  }`}></div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Affichage */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Affichage</h2>
        <div className="space-y-6">
          {/* Vue par défaut */}
          <div>
            <label className="block text-gray-700 mb-2">Vue par défaut</label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  display.defaultView === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => handleDisplayChange('defaultView', 'list')}
              >
                Liste
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  display.defaultView === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => handleDisplayChange('defaultView', 'grid')}
              >
                Grille
              </button>
            </div>
          </div>

          {/* Période par défaut */}
          <div>
            <label className="block text-gray-700 mb-2">Période par défaut</label>
            <select
              value={display.defaultPeriod}
              onChange={(e) => handleDisplayChange('defaultPeriod', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="week">Semaine</option>
              <option value="month">Mois</option>
              <option value="quarter">Trimestre</option>
            </select>
          </div>

          {/* Mode compact */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Mode compact</span>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={display.compactMode}
                  onChange={() => handleDisplayChange('compactMode', !display.compactMode)}
                />
                <div className={`block w-14 h-8 rounded-full transition-colors ${
                  display.compactMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                  display.compactMode ? 'translate-x-6' : ''
                }`}></div>
              </div>
            </label>
          </div>

          {/* Mode sombre */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Mode sombre</span>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={display.darkMode}
                  onChange={() => handleDisplayChange('darkMode', !display.darkMode)}
                />
                <div className={`block w-14 h-8 rounded-full transition-colors ${
                  display.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                  display.darkMode ? 'translate-x-6' : ''
                }`}></div>
              </div>
            </label>
          </div>
        </div>
      </section>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-4 pb-8">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Annuler
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Enregistrer
        </button>
      </div>
    </div>
  );
}
