"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

const NAV_LINKS = [
  { href: '/admin/dashboard', icon: '📊', label: 'Overview' },
  { href: '/admin/projects', icon: '🚀', label: 'Projects' },
  { href: '/admin/skills', icon: '⚙️', label: 'Skills' },
  { href: '/admin/experience', icon: '💼', label: 'Experience' },
  { href: '/admin/messages', icon: '✉️', label: 'Messages' },
  { href: '/admin/settings', icon: '🔧', label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('admin_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin');
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-surface-container-highest border-r border-white/5 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="font-display text-lg tracking-widest text-primary flex items-center gap-2 mb-1">
          <span>⚡</span> NEXUS
        </div>
        <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
          Admin Control Center
        </p>
      </div>

      {/* User info */}
      {user && (
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-primary text-sm flex-shrink-0">
            {user.name?.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="text-sm text-on-surface truncate font-medium">{user.name}</div>
            <div className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">{user.role}</div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-label text-xs uppercase tracking-wider transition-all duration-200",
                isActive
                  ? "bg-primary/15 text-primary border-l-2 border-primary"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
              )}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Back to site + logout */}
      <div className="p-3 border-t border-white/5 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-label text-xs uppercase tracking-wider text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all"
        >
          <span>🌐</span> View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-label text-xs uppercase tracking-wider text-error hover:bg-error/10 transition-all"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}
