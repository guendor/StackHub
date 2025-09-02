'use client';
import Navbar from '@/components/navbar';
import LegalFooter from '@/components/legal-footer';
import DebugToggle from '@/components/debug-toggle';
import { currentUser, setSession } from '@/lib/auth';
import { useEffect, useState } from 'react';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try { setUser(currentUser()); } catch { setUser(null); }
  }, []);

  const handleLogout = () => {
    try { setSession(null); setUser(null); } catch {}
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="max-w-6xl mx-auto p-4">{children}</main>
      <LegalFooter />
      <DebugToggle />
    </>
  );
}
