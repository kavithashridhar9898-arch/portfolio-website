"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';

function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/admin') return; // Skip auth check on login page
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    }
  }, [pathname, router]);

  return children;
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-surface-container-lowest text-on-surface">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative min-h-screen">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
