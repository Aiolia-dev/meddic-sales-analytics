'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

// Données fictives des commerciaux
const salesTeam = [
  {
    id: 1,
    name: 'Alice Smith',
    role: 'Senior Sales Executive',
    photo: '👩‍💼',
    metrics: {
      metrics: 85,
      economic_buyer: 88,
      decision_criteria: 90,
      decision_process: 82,
      identify_pain: 87,
      champion: 83,
    },
    deals: {
      won: 12,
      pipeline: 8,
      total_value: '2.4M€',
    },
    top_deals: [
      { company: 'TechCorp', value: '450K€', probability: 85, stage: 'Negotiation' },
      { company: 'InnovSoft', value: '380K€', probability: 75, stage: 'Proposal' },
      { company: 'DataFlex', value: '290K€', probability: 90, stage: 'Closing' },
    ],
  },
  {
    id: 2,
    name: 'Bob Johnson',
    role: 'Senior Account Executive',
    photo: '👨‍💼',
    metrics: {
      metrics: 72,
      economic_buyer: 75,
      decision_criteria: 78,
      decision_process: 70,
      identify_pain: 74,
      champion: 71,
    },
    deals: {
      won: 8,
      pipeline: 10,
      total_value: '1.8M€',
    },
    top_deals: [
      { company: 'CloudNet', value: '320K€', probability: 70, stage: 'Discovery' },
      { company: 'SecureIT', value: '280K€', probability: 85, stage: 'Proposal' },
      { company: 'SmartSys', value: '260K€', probability: 65, stage: 'Negotiation' },
    ],
  },
  {
    id: 3,
    name: 'Carol Williams',
    role: 'Account Executive',
    photo: '👩‍💼',
    metrics: {
      metrics: 79,
      economic_buyer: 82,
      decision_criteria: 81,
      decision_process: 77,
      identify_pain: 80,
      champion: 78,
    },
    deals: {
      won: 10,
      pipeline: 7,
      total_value: '2.1M€',
    },
    top_deals: [
      { company: 'GlobalTech', value: '380K€', probability: 80, stage: 'Proposal' },
      { company: 'NetSolutions', value: '340K€', probability: 75, stage: 'Discovery' },
      { company: 'InfoSys', value: '310K€', probability: 85, stage: 'Negotiation' },
    ],
  },
  {
    id: 4,
    name: 'David Brown',
    role: 'Account Executive',
    photo: '👨‍💼',
    metrics: {
      metrics: 68,
      economic_buyer: 70,
      decision_criteria: 72,
      decision_process: 65,
      identify_pain: 71,
      champion: 69,
    },
    deals: {
      won: 6,
      pipeline: 9,
      total_value: '1.5M€',
    },
    top_deals: [
      { company: 'SoftwareOne', value: '290K€', probability: 65, stage: 'Discovery' },
      { company: 'DataCore', value: '270K€', probability: 70, stage: 'Proposal' },
      { company: 'CloudSphere', value: '250K€', probability: 60, stage: 'Negotiation' },
    ],
  },
];

export default function TeamAnalysis() {
  const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = useState(salesTeam[0]);

  // Configuration du graphique radar pour les métriques MEDDIC
  const radarData = {
    labels: ['Metrics', 'Economic Buyer', 'Decision Criteria', 'Decision Process', 'Identify Pain', 'Champion'],
    datasets: [
      {
        label: selectedMember.name,
        data: [
          selectedMember.metrics.metrics,
          selectedMember.metrics.economic_buyer,
          selectedMember.metrics.decision_criteria,
          selectedMember.metrics.decision_process,
          selectedMember.metrics.identify_pain,
          selectedMember.metrics.champion,
        ],
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('nav.team')}</h1>
        <p className="text-gray-600">
          Analyse détaillée des performances de l&apos;équipe commerciale basée sur la méthodologie MEDDIC.
          Sélectionnez un membre de l&apos;équipe pour voir ses métriques détaillées.
        </p>
      </div>

      {/* Sélection du membre de l'équipe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {salesTeam.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className={`p-6 rounded-lg shadow-md cursor-pointer transition-all ${
              selectedMember.id === member.id
                ? 'bg-blue-50 border-2 border-blue-500'
                : 'bg-white hover:bg-gray-50 border-2 border-transparent'
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{member.photo}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analyse détaillée */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Graphique MEDDIC */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Score MEDDIC</h3>
          <div className="h-[400px]">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        {/* Métriques clés */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Métriques clés</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Deals gagnés</p>
              <p className="text-2xl font-bold text-blue-600">{selectedMember.deals.won}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Pipeline</p>
              <p className="text-2xl font-bold text-blue-600">{selectedMember.deals.pipeline}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Valeur totale</p>
              <p className="text-2xl font-bold text-blue-600">{selectedMember.deals.total_value}</p>
            </div>
          </div>

          {/* Top deals */}
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-3">Top Deals</h4>
            <div className="space-y-3">
              {selectedMember.top_deals.map((deal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{deal.company}</p>
                    <p className="text-sm text-gray-500">{deal.stage}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{deal.value}</p>
                    <p className="text-sm text-green-600">{deal.probability}% prob.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
