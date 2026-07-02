"use client";
import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:5000/api/messages', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (d.success) setMessages(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  const markRead = async (id) => {
    await fetch(`http://localhost:5000/api/messages/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: 1 } : m));
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await fetch(`http://localhost:5000/api/messages/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const unread = messages.filter(m => !m.is_read).length;

  return (
    <div className="space-y-6 max-w-4xl">
      <header className="border-b border-white/10 pb-6">
        <h1 className="font-headline text-3xl mb-1">Messages</h1>
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
          {unread > 0 ? <span className="text-primary">{unread} unread</span> : 'All caught up'} · {messages.length} total
        </p>
      </header>

      {loading ? (
        <div className="flex items-center gap-3 text-on-surface-variant py-8">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <GlassCard className="p-12 text-center border-white/5">
          <div className="text-4xl mb-4">📭</div>
          <p className="font-body text-on-surface-variant">No messages yet. When visitors contact you, they'll appear here.</p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {messages.map(msg => (
            <GlassCard key={msg.id} className={`p-5 border transition-all ${!msg.is_read ? 'border-primary/20 bg-primary/5' : 'border-white/5'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.is_read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>}
                    <span className="font-subheading text-base">{msg.name}</span>
                    <span className="font-label text-xs text-on-surface-variant">· {msg.email}</span>
                  </div>
                  {msg.subject && <div className="font-label text-xs text-primary uppercase tracking-wider mb-1">{msg.subject}</div>}
                  <p className="font-body text-sm text-on-surface-variant">{msg.message}</p>
                  <div className="font-label text-[10px] text-on-surface-variant/50 uppercase tracking-wider mt-2">
                    {new Date(msg.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {!msg.is_read && (
                    <button onClick={() => markRead(msg.id)} className="px-3 py-1.5 border border-primary/30 rounded-lg text-xs text-primary hover:bg-primary/10 transition-all whitespace-nowrap">Mark Read</button>
                  )}
                  <a href={`mailto:${msg.email}`} className="px-3 py-1.5 border border-white/10 rounded-lg text-xs text-on-surface-variant hover:border-primary/40 transition-all text-center">Reply</a>
                  <button onClick={() => handleDelete(msg.id)} className="px-3 py-1.5 border border-error/30 rounded-lg text-xs text-error hover:bg-error/10 transition-all">Delete</button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
