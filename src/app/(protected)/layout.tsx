'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { LanguageProvider } from '@/hooks/useLanguage';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Header />
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}
