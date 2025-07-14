'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HeartPulse,
  PawPrint,
  Pill,
  CalendarDays,
  ShoppingCart,
  LayoutDashboard,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const PawPrintIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="4" r="2" />
    <circle cx="18" cy="8" r="2" />
    <circle cx="20" cy="16" r="2" />
    <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-7 0V15a5 5 0 0 1 5-5z" />
    <path d="M6.12 15.38A3.5 3.5 0 0 0 4 18.5V22" />
    <path d="M14.26 15.17A3.5 3.5 0 0 1 18 18.5V22" />
  </svg>
);

const menuItems = [
  { href: '/', label: 'Symptom Checker', icon: HeartPulse },
  { href: '/pets', label: 'My Pets', icon: PawPrint },
  { href: '/medications', label: 'Medications', icon: Pill },
  { href: '/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/store', label: 'Store', icon: ShoppingCart },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <PawPrintIcon className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary-foreground group-data-[collapsible=icon]:hidden">
            PetPal
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
