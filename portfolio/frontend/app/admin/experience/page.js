"use client";
import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminExperience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', company: '', period: '', description: '', sort_order: 0 });
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const fetchItems = async () => {
    const res = await fetch(`${API_URL}/experience`);
    const d = await res.json();
    if (d.success) setItems(d.data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const openNew = () => { setEditing(null); setForm({ title: '', company: '', period: '', description: '', sort_order: items.length + 1 }); setShowForm(true); };
  const openEdit = (e) => { setEditing(e.id); setForm({ ...e }); setShowForm(true); };

  const handleSave = async (ev) => {
    ev.preventDefault(); setSaving(true); setMessage('');
    const url = editing ? `${API_URL}/experience/${editing}` : `${API_URL}/experience`;
    try {
      const res = await fetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const d = await res.json();
      if (d.success) { setMessage('✅ Saved!'); setShowForm(false); fetchItems(); }
      else setMessage(`❌ ${d.message}`);
    } catch { setMessage('❌ Server error.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience entry?')) return;
    await fetch(`${API_URL}/experience/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetchItems();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <header className="border-b border-white/10 pb-6 flex justify-between items-center">
        <div>
          <h1 className="font-headline text-3xl mb-1">Experience</h1>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Manage your professional journey</p>
        </div>
        <button onClick={openNew} className="px-6 py-3 bg-primary text-background font-semibold rounded-xl hover:bg-primary/90 transition-all">+ Add Entry</button>
      </header>

      {message && <div className={`px-4 py-3 rounded-lg text-sm ${message.startsWith('✅') ? 'bg-primary/10 border border-primary/30 text-primary' : 'bg-error/10 border border-error/30 text-error'}`}>{message}</div>}

      {showForm && (
        <GlassCard className="p-6 border-white/10">
          <h2 className="font-subheading text-lg mb-5">{editing ? 'Edit Entry' : 'New Entry'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{ key: 'title', label: 'Job Title', req: true }, { key: 'company', label: 'Company', req: true }, { key: 'period', label: 'Period', placeholder: 'Jan 2025 – Present' }].map(f => (
                <div key={f.key}>
                  <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">{f.label}</label>
                  <input type="text" required={f.req} value={form[f.key] || ''} placeholder={f.placeholder}
                    onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))}
                    className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary/60 text-sm" />
                </div>
              ))}
            </div>
            <div>
              <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">Description</label>
              <textarea rows={4} value={form.description || ''} onChange={e => setForm(s => ({ ...s, description: e.target.value }))}
                className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary/60 text-sm resize-none" />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 text-sm transition-all flex items-center gap-2">
                {saving && <span className="w-3 h-3 border-2 border-background/30 border-t-background rounded-full animate-spin"></span>}
                {saving ? 'Saving...' : (editing ? 'Update' : 'Create')}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border border-white/10 rounded-lg text-sm text-on-surface-variant hover:bg-white/5">Cancel</button>
            </div>
          </form>
        </GlassCard>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-on-surface-variant py-8">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          Loading...
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <GlassCard key={item.id} className="p-5 border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="font-subheading text-base mb-0.5">{item.title}</div>
                  <div className="text-primary/80 text-sm mb-0.5">{item.company}</div>
                  <div className="font-label text-xs text-on-surface-variant uppercase tracking-wider mb-2">{item.period}</div>
                  <p className="font-body text-sm text-on-surface-variant line-clamp-2">{item.description}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(item)} className="px-3 py-1.5 border border-white/10 rounded-lg text-xs hover:border-primary/40 transition-all">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 border border-error/30 rounded-lg text-xs text-error hover:bg-error/10 transition-all">Delete</button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
