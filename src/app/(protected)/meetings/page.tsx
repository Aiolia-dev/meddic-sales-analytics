'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { HorizontalProgressBar } from '@/components/ui/HorizontalProgressBar';

// Données fictives des réunions
const mockMeetings = [
  {
    id: 1,
    title: 'Présentation Solution TechCorp',
    date: '2024-01-15T10:00:00',
    duration: 45,
    company: 'TechCorp',
    dealValue: '450K€',
    salesRep: 'Alice Smith',
    attendees: ['John Director (Economic Buyer)', 'Sarah Tech (Champion)', 'Mike IT (User)'],
    meddic: {
      metrics: 90,
      economic_buyer: 85,
      decision_criteria: 95,
      decision_process: 80,
      identify_pain: 90,
      champion: 85,
    },
    status: 'completed',
    nextSteps: 'Envoyer proposition commerciale détaillée',
    notes: 'Forte adhésion à la solution. Points clés: ROI en 6 mois, intégration avec systèmes existants.',
  },
  {
    id: 2,
    title: 'Discovery Call InnovSoft',
    date: '2024-01-16T14:30:00',
    duration: 60,
    company: 'InnovSoft',
    dealValue: '380K€',
    salesRep: 'Alice Smith',
    attendees: ['Paul CFO (Economic Buyer)', 'Marie Project (User)'],
    meddic: {
      metrics: 75,
      economic_buyer: 80,
      decision_criteria: 70,
      decision_process: 65,
      identify_pain: 85,
      champion: 60,
    },
    status: 'completed',
    nextSteps: 'Identifier le champion et planifier une démonstration technique',
    notes: 'Besoin identifié: optimisation des processus de vente. Budget confirmé pour Q1.',
  },
  {
    id: 3,
    title: 'Démo Technique CloudNet',
    date: '2024-01-17T11:00:00',
    duration: 90,
    company: 'CloudNet',
    dealValue: '320K€',
    salesRep: 'Bob Johnson',
    attendees: ['David CTO (Technical Decision Maker)', 'Emma Arch (Champion)'],
    meddic: {
      metrics: 85,
      economic_buyer: 70,
      decision_criteria: 90,
      decision_process: 75,
      identify_pain: 85,
      champion: 90,
    },
    status: 'scheduled',
    nextSteps: 'Présenter la proposition de valeur à l\'economic buyer',
    notes: 'Démo technique approfondie prévue. Focus sur la scalabilité et la sécurité.',
  },
  {
    id: 4,
    title: 'Revue Solution GlobalTech',
    date: '2024-01-18T15:00:00',
    duration: 60,
    company: 'GlobalTech',
    dealValue: '380K€',
    salesRep: 'Carol Williams',
    attendees: ['Robert CEO (Economic Buyer)', 'Alice PM (Champion)', 'Tom IT (User)'],
    meddic: {
      metrics: 95,
      economic_buyer: 90,
      decision_criteria: 85,
      decision_process: 80,
      identify_pain: 90,
      champion: 85,
    },
    status: 'scheduled',
    nextSteps: 'Finaliser la proposition commerciale',
    notes: 'Excellente compréhension des besoins. Décision prévue pour fin janvier.',
  },
];

// Composant pour afficher le statut de la réunion
function MeetingStatus({ status }: { status: string }) {
  const statusClasses = {
    completed: 'bg-green-100 text-green-800',
    scheduled: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
      {status === 'completed' ? 'Terminée' : status === 'scheduled' ? 'Planifiée' : 'Annulée'}
    </span>
  );
}

const CompletedMeetingScores = ({ scores }) => {
  const { t } = useLanguage();
  
  // Mapping des clés de score vers les clés de traduction
  const criteriaTranslationKeys = {
    metrics: 'dashboard.meddic.metrics',
    economic_buyer: 'dashboard.meddic.economicBuyer',
    decision_criteria: 'dashboard.meddic.decisionCriteria',
    decision_process: 'dashboard.meddic.decisionProcess',
    identify_pain: 'dashboard.meddic.identifyPain',
    champion: 'dashboard.meddic.champion'
  };

  return (
    <div className="space-y-4">
      {Object.entries(scores).map(([criterion, score]) => (
        <div key={criterion} className="flex items-center gap-4">
          <span className="w-48 text-sm text-gray-600">
            {t(criteriaTranslationKeys[criterion])}
          </span>
          <div className="flex-1">
            <HorizontalProgressBar percentage={score} />
          </div>
          <span className="text-sm text-gray-600 w-12 text-right">{score}%</span>
        </div>
      ))}
    </div>
  );
};

export default function MeetingsPage() {
  const { t } = useLanguage();
  const [selectedMeeting, setSelectedMeeting] = useState(mockMeetings[0]);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredMeetings = filterStatus === 'all' 
    ? mockMeetings 
    : mockMeetings.filter(meeting => meeting.status === filterStatus);

  // Calcul du score MEDDIC moyen
  const averageMeddic = (meeting: typeof mockMeetings[0]) => {
    const scores = Object.values(meeting.meddic);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('nav.meetings')}</h1>
        <p className="text-gray-600">
          Suivi et analyse des réunions commerciales avec évaluation MEDDIC en temps réel
        </p>
      </div>

      {/* Filtres */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Toutes
        </button>
        <button
          onClick={() => setFilterStatus('scheduled')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filterStatus === 'scheduled' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Planifiées
        </button>
        <button
          onClick={() => setFilterStatus('completed')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filterStatus === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Terminées
        </button>
      </div>

      {/* Liste des réunions et détails */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des réunions */}
        <div className="lg:col-span-1 space-y-4">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              onClick={() => setSelectedMeeting(meeting)}
              className={`p-4 rounded-lg shadow-md cursor-pointer transition-all ${
                selectedMeeting.id === meeting.id
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-white hover:bg-gray-50 border-2 border-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                <MeetingStatus status={meeting.status} />
              </div>
              <div className="text-sm text-gray-500 mb-2">
                {new Date(meeting.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">{meeting.company}</span>
                <span className="text-sm font-medium text-blue-600">{meeting.dealValue}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Détails de la réunion sélectionnée */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMeeting.title}</h2>
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>{selectedMeeting.company}</span>
                <span>•</span>
                <span>{selectedMeeting.salesRep}</span>
                <span>•</span>
                <span>{selectedMeeting.duration} min</span>
              </div>
            </div>

            {/* Participants */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Participants</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  {selectedMeeting.attendees.map((attendee, index) => (
                    <li key={index} className="text-gray-700">{attendee}</li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedMeeting.status === 'completed' ? (
              <>
                {/* Score MEDDIC - Uniquement pour les réunions terminées */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Score MEDDIC</h3>
                  <CompletedMeetingScores scores={selectedMeeting.meddic} />
                </div>

                {/* Notes et prochaines étapes - Uniquement pour les réunions terminées */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Notes</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedMeeting.notes}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Prochaines étapes</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedMeeting.nextSteps}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Message pour les réunions planifiées */
              <div className="mt-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Réunion à venir</h3>
                  <p className="text-blue-700">
                    Les scores MEDDIC, notes et prochaines étapes seront disponibles une fois la réunion terminée.
                  </p>
                  <div className="mt-4 text-sm text-blue-600">
                    Date prévue : {new Date(selectedMeeting.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
