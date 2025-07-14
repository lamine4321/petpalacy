'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';

const pageTitles: { [key: string]: string } = {
  '/': 'AI Symptom Checker',
  '/pets': 'My Pets',
  '/farms': 'Farms',
  '/medications': 'Medication Tracker',
  '/appointments': 'Appointment Log',
  '/store': 'Retail Store',
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Dashboard';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
    </header>
  );
}
