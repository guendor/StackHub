'use client';

import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import LegalFooter from '@/components/legal-footer';
import DebugToggle from '@/components/debug-toggle';
import { currentUser, setSession } from '@/lib/auth';
import { useEffect, useState } from 'react';

export const metadata: Metadata = {
  title: 'StakeHub Alpha',
  description: 'MVP de marketplace de staking de poker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  // ler sessão do localStorage só no cliente
  useEffect(() => {
    try {
      setUser(currentUser());
    } catch {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    try {
      setSession(null);
      setUser(null);
    } catch {}
  };

  return (
    <html lang="pt-br">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
        <LegalFooter />
        <DebugToggle />
      </body>
    </html>
  );
}
