'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export default function Sidebar({ onCloseMobile }: SidebarProps) {
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
    <div className="h-full flex flex-col text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">MEDDIC Analytics</h1>
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={() => onCloseMobile?.()}
                className={`
                  flex items-center p-3 rounded-lg 
                  transition-colors duration-200
                  hover:bg-blue-700
                  ${pathname === item.path ? 'bg-blue-700' : ''}
                `}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 text-sm text-blue-200">
        <p>Version 1.0.0</p>
      </div>
    </div>
  );
}
