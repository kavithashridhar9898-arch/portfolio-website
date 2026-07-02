"use client";
import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    fetch('http://localhost:5000/api/analytics', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) setAnalytics(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Page Views', value: analytics?.totalViews || '—', icon: '👁️', sub: 'Total visits' },
    { label: 'Messages', value: analytics?.totalMessages || '—', icon: '✉️', sub: 'Contact submissions' },
    { label: 'Unread', value: analytics?.unreadMessages || '—', icon: '🔔', sub: 'Pending replies' },
    { label: 'Status', value: 'ONLINE', icon: '✅', sub: 'All systems go' },
  ];

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease]">
      <header className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="font-headline text-3xl mb-1">Overview</h1>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Live Portfolio Metrics</p>
        </div>
        <span className="flex items-center gap-2 font-label text-xs text-primary uppercase tracking-widest">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          Live
        </span>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="p-6 border-white/5">
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className="font-display text-4xl text-primary mb-1">
              {loading ? (
                <span className="inline-block w-12 h-8 bg-white/5 rounded animate-pulse"></span>
              ) : stat.value}
            </div>
            <div className="font-label text-xs uppercase tracking-widest text-on-surface">{stat.label}</div>
            <div className="font-label text-[10px] text-on-surface-variant mt-1">{stat.sub}</div>
          </GlassCard>
        ))}
      </div>

      {/* Quick Navigation */}
      <div>
        <h2 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/admin/projects', icon: '🚀', title: 'Manage Projects', desc: 'Add, edit, or delete portfolio projects' },
            { href: '/admin/skills', icon: '⚙️', title: 'Update Skills', desc: 'Manage your technology stack' },
            { href: '/admin/experience', icon: '💼', title: 'Experience', desc: 'Update your professional journey' },
            { href: '/admin/messages', icon: '✉️', title: 'View Messages', desc: 'Read contact form submissions' },
            { href: '/admin/settings', icon: '🔧', title: 'Site Settings', desc: 'Update site name, tagline, contact info' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="block p-5 rounded-2xl border border-white/5 bg-surface-container/40 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-subheading text-sm text-on-surface group-hover:text-primary transition-colors mb-1">{item.title}</div>
              <div className="font-body text-xs text-on-surface-variant">{item.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
