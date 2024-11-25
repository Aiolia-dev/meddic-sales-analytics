export type Language = 'en' | 'fr';

export const translations = {
  en: {
    // Login
    'login.title': 'MEDDIC Analytics',
    'login.subtitle': 'Sign in to your account',
    'login.email.label': 'Email address',
    'login.password.label': 'Password',
    'login.remember': 'Remember me',
    'login.forgot': 'Forgot your password?',
    'login.submit': 'Sign in',
    'login.error': 'Invalid credentials',

    // Header
    'language.select': 'Language',
    'language.en': 'English',
    'language.fr': 'French',
    'header.logout': 'Sign out',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.team': 'Team Analysis',
    'nav.meetings': 'Meetings',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.filters.day': 'Day',
    'dashboard.filters.week': 'Week',
    'dashboard.filters.month': 'Month',
    'dashboard.filters.quarter': 'Quarter',
    'dashboard.filters.year': 'Year',
    
    'dashboard.kpi.global': 'Global MEDDIC Score',
    'dashboard.kpi.meetings': 'Meetings Analyzed',
    'dashboard.kpi.duration': 'Average Duration',
    
    'dashboard.meddic.title': 'MEDDIC Criteria Breakdown',
    'dashboard.meddic.metrics': 'Metrics',
    'dashboard.meddic.economicBuyer': 'Economic Buyer',
    'dashboard.meddic.decisionCriteria': 'Decision Criteria',
    'dashboard.meddic.decisionProcess': 'Decision Process',
    'dashboard.meddic.identifyPain': 'Identify Pain',
    'dashboard.meddic.champion': 'Champion',
    
    'dashboard.team.title': 'Team Performance',
    'dashboard.team.meetings': 'meetings',
  },
  fr: {
    // Login
    'login.title': 'MEDDIC Analytics',
    'login.subtitle': 'Connexion à votre compte',
    'login.email.label': 'Adresse email',
    'login.password.label': 'Mot de passe',
    'login.remember': 'Se souvenir de moi',
    'login.forgot': 'Mot de passe oublié ?',
    'login.submit': 'Se connecter',
    'login.error': 'Identifiants invalides',

    // Header
    'language.select': 'Langue',
    'language.en': 'Anglais',
    'language.fr': 'Français',
    'header.logout': 'Se déconnecter',
    
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.team': 'Analyse d\'équipe',
    'nav.meetings': 'Réunions',
    'nav.reports': 'Rapports',
    'nav.settings': 'Paramètres',

    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.filters.day': 'Jour',
    'dashboard.filters.week': 'Semaine',
    'dashboard.filters.month': 'Mois',
    'dashboard.filters.quarter': 'Trimestre',
    'dashboard.filters.year': 'Année',
    
    'dashboard.kpi.global': 'Score MEDDIC Global',
    'dashboard.kpi.meetings': 'Réunions Analysées',
    'dashboard.kpi.duration': 'Durée Moyenne',
    
    'dashboard.meddic.title': 'Répartition des Critères MEDDIC',
    'dashboard.meddic.metrics': 'Métriques',
    'dashboard.meddic.economicBuyer': 'Décideur Économique',
    'dashboard.meddic.decisionCriteria': 'Critères de Décision',
    'dashboard.meddic.decisionProcess': 'Processus de Décision',
    'dashboard.meddic.identifyPain': 'Identification des Besoins',
    'dashboard.meddic.champion': 'Champion',
    
    'dashboard.team.title': 'Performance de l\'Équipe',
    'dashboard.team.meetings': 'réunions',
  }
};
