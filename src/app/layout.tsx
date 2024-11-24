import './globals.css'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/hooks/useLanguage'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MEDDIC Sales Analytics',
  description: 'Sales performance tracking using MEDDIC methodology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <LanguageProvider>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  )
}
