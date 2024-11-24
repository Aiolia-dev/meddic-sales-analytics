'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const menuItems = [
    { name: t('nav.dashboard'), path: '/dashboard', icon: '📊' },
    { name: t('nav.team'), path: '/team', icon: '👥' },
    { name: t('nav.meetings'), path: '/meetings', icon: '🎯' },
    { name: t('nav.reports'), path: '/reports', icon: '📈' },
    { name: t('nav.settings'), path: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-blue-800 text-white h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">MEDDIC Analytics</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors ${
                  pathname === item.path ? 'bg-blue-700' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
