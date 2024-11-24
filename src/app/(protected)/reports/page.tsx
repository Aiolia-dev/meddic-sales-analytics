'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// Données fictives pour les rapports
const mockData = {
  meddicTrends: {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Score MEDDIC Global',
        data: [65, 68, 72, 75, 78, 82],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
      },
    ],
  },
  pipelineValue: {
    labels: ['Discovery', 'Qualification', 'Proposition', 'Négociation', 'Closing'],
    datasets: [
      {
        label: 'Valeur Pipeline (K€)',
        data: [1200, 2400, 1800, 1500, 900],
        backgroundColor: [
          'rgba(37, 99, 235, 0.2)',
          'rgba(37, 99, 235, 0.4)',
          'rgba(37, 99, 235, 0.6)',
          'rgba(37, 99, 235, 0.8)',
          'rgba(37, 99, 235, 1)',
        ],
      },
    ],
  },
  teamPerformance: {
    labels: ['Metrics', 'Economic Buyer', 'Decision Criteria', 'Decision Process', 'Identify Pain', 'Champion'],
    datasets: [
      {
        label: 'Alice Smith',
        data: [85, 88, 90, 82, 87, 83],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
      },
      {
        label: 'Bob Johnson',
        data: [72, 75, 78, 70, 74, 71],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
      },
    ],
  },
  conversionRates: {
    labels: ['Discovery → Qualification', 'Qualification → Proposition', 'Proposition → Négociation', 'Négociation → Closing', 'Closing → Gagné'],
    datasets: [
      {
        label: 'Taux de Conversion (%)',
        data: [75, 60, 50, 40, 30],
        backgroundColor: 'rgba(37, 99, 235, 0.6)',
      },
    ],
  },
};

// Types de rapports disponibles
const reportTypes = [
  { id: 'meddic', name: 'Performance MEDDIC', icon: '📈' },
  { id: 'pipeline', name: 'Analyse Pipeline', icon: '🎯' },
  { id: 'activity', name: 'Activité Commerciale', icon: '📊' },
  { id: 'analysis', name: 'Analyse Avancée', icon: '🔍' },
];

export default function ReportsPage() {
  const { t } = useLanguage();
  const [selectedReport, setSelectedReport] = useState('meddic');
  const [timeFrame, setTimeFrame] = useState('month');

  // Options communes pour les graphiques
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('nav.reports')}</h1>
        <p className="text-gray-600">
          Analyses détaillées des performances commerciales et de l&apos;application de la méthodologie MEDDIC
        </p>
      </div>

      {/* Sélection du type de rapport */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {reportTypes.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedReport === report.id
                ? 'bg-blue-50 border-2 border-blue-500'
                : 'bg-white border-2 border-transparent hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{report.icon}</span>
              <span className="font-medium">{report.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Filtres temporels */}
      <div className="flex space-x-4 mb-8">
        {['week', 'month', 'quarter', 'year'].map((period) => (
          <button
            key={period}
            onClick={() => setTimeFrame(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeFrame === period
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t(`dashboard.filters.${period}`)}
          </button>
        ))}
      </div>

      {/* Contenu des rapports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Évolution du score MEDDIC */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Évolution du Score MEDDIC</h3>
          <div className="h-[300px]">
            <Line data={mockData.meddicTrends} options={commonOptions} />
          </div>
        </div>

        {/* Distribution du pipeline */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Distribution du Pipeline</h3>
          <div className="h-[300px]">
            <Bar data={mockData.pipelineValue} options={commonOptions} />
          </div>
        </div>

        {/* Performance de l'équipe */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Performance MEDDIC par Commercial</h3>
          <div className="h-[300px]">
            <Radar data={mockData.teamPerformance} options={commonOptions} />
          </div>
        </div>

        {/* Taux de conversion */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Taux de Conversion par Étape</h3>
          <div className="h-[300px]">
            <Bar 
              data={mockData.conversionRates}
              options={{
                ...commonOptions,
                indexAxis: 'y' as const,
              }}
            />
          </div>
        </div>
      </div>

      {/* KPIs récapitulatifs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Score MEDDIC Moyen</h4>
          <p className="text-3xl font-bold text-blue-600">78%</p>
          <p className="text-sm text-green-600 mt-2">↑ 4% vs période précédente</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Valeur Pipeline</h4>
          <p className="text-3xl font-bold text-blue-600">7.8M€</p>
          <p className="text-sm text-green-600 mt-2">↑ 12% vs période précédente</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Taux de Conversion</h4>
          <p className="text-3xl font-bold text-blue-600">32%</p>
          <p className="text-sm text-green-600 mt-2">↑ 2% vs période précédente</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Réunions Qualifiées</h4>
          <p className="text-3xl font-bold text-blue-600">156</p>
          <p className="text-sm text-green-600 mt-2">↑ 8% vs période précédente</p>
        </div>
      </div>
    </div>
  );
}
