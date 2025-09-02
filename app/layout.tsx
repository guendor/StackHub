import type { Metadata } from 'next';
import './globals.css';
import ClientShell from '@/components/client-shell';

export const metadata: Metadata = {
  title: 'StakeHub Alpha',
  description: 'MVP de marketplace de staking de poker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
