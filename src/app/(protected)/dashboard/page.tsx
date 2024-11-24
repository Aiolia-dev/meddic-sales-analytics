'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

// Mock data
const mockData = {
  globalScore: 78,
  meetingsAnalyzed: 156,
  averageDuration: '45 minutes',
  teamMembers: [
    { name: 'Alice Smith', score: 85, meetings: 42 },
    { name: 'Bob Johnson', score: 72, meetings: 38 },
    { name: 'Carol Williams', score: 79, meetings: 45 },
    { name: 'David Brown', score: 68, meetings: 31 }
  ],
  meddicScores: {
    metrics: 82,
    economicBuyer: 75,
    decisionCriteria: 80,
    decisionProcess: 73,
    identifyPain: 85,
    champion: 78
  }
};

const timeFilters = ['day', 'week', 'month', 'quarter', 'year'];

export default function DashboardPage() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('month');
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        <div className="flex space-x-2">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedTimeFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedTimeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t(`dashboard.filters.${filter}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">{t('dashboard.kpi.global')}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-4xl font-semibold text-blue-600">{mockData.globalScore}%</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">{t('dashboard.kpi.meetings')}</h3>
          <div className="mt-2">
            <p className="text-4xl font-semibold text-blue-600">{mockData.meetingsAnalyzed}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">{t('dashboard.kpi.duration')}</h3>
          <div className="mt-2">
            <p className="text-4xl font-semibold text-blue-600">{mockData.averageDuration}</p>
          </div>
        </div>
      </div>

      {/* MEDDIC Criteria Breakdown */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('dashboard.meddic.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(mockData.meddicScores).map(([criteria, score]) => (
            <div key={criteria} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-2">
                <span className="text-xl font-semibold text-blue-600">{score}%</span>
              </div>
              <p className="text-sm font-medium text-gray-700">
                {t(`dashboard.meddic.${criteria}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('dashboard.team.title')}</h2>
        <div className="space-y-4">
          {mockData.teamMembers.map((member) => (
            <div key={member.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">
                    {member.meetings} {t('dashboard.team.meetings')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${member.score}%` }}
                  />
                </div>
                <span className="font-medium text-gray-900">{member.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
