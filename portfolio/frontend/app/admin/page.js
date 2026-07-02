"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    if (typeof window !== 'undefined' && localStorage.getItem('admin_token')) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials. Try again.');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <GlassCard className="w-full max-w-md p-10 relative z-10 border border-white/10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-primary"><path d="M12 1C8.676 1 6 3.676 6 7v2H4a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V10a1 1 0 00-1-1h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 9a2 2 0 110 4 2 2 0 010-4z"/></svg>
          </div>
          <h1 className="font-display text-2xl tracking-[0.15em] uppercase text-on-surface">NEXUS CONTROL</h1>
          <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest mt-2">Admin Authentication</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm font-body">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all font-body placeholder:text-on-surface-variant/30"
              placeholder="anshulnayak.9898@gmail.com"
              required
            />
          </div>
          <div>
            <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all font-body placeholder:text-on-surface-variant/30"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-background font-semibold rounded-xl transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin"></span>
                Authenticating...
              </span>
            ) : 'Initialize Session'}
          </button>
        </form>

        <p className="text-center text-on-surface-variant/40 text-xs font-label mt-6">
          Default: anshulnayak.9898@gmail.com / Admin@1234
        </p>
      </GlassCard>
    </div>
  );
}
