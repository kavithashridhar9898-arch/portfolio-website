"use client";
import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Frontend', proficiency: 80, sort_order: 0 });
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  const CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools'];

  const fetchSkills = async () => {
    const res = await fetch('http://localhost:5000/api/skills');
    const d = await res.json();
    if (d.success) setSkills(d.data);
    setLoading(false);
  };

  useEffect(() => { fetchSkills(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', category: 'Frontend', proficiency: 80, sort_order: skills.length + 1 });
    setShowForm(true);
  };

  const openEdit = (s) => {
    setEditing(s.id);
    setForm({ ...s });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const url = editing ? `http://localhost:5000/api/skills/${editing}` : 'http://localhost:5000/api/skills';
    const method = editing ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const d = await res.json();
      if (d.success) {
        setMessage(editing ? '✅ Skill updated!' : '✅ Skill added!');
        setShowForm(false);
        fetchSkills();
      } else {
        setMessage(`❌ ${d.message}`);
      }
    } catch { setMessage('❌ Server error.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    await fetch(`http://localhost:5000/api/skills/${id}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` }
    });
    fetchSkills();
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {});

  return (
    <div className="space-y-6 max-w-5xl">
      <header className="border-b border-white/10 pb-6 flex justify-between items-center">
        <div>
          <h1 className="font-headline text-3xl mb-1">Skills</h1>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Manage your technology stack</p>
        </div>
        <button onClick={openNew} className="px-6 py-3 bg-primary text-background font-semibold rounded-xl hover:bg-primary/90 transition-all">
          + Add Skill
        </button>
      </header>

      {message && <div className={`px-4 py-3 rounded-lg text-sm ${message.startsWith('✅') ? 'bg-primary/10 border border-primary/30 text-primary' : 'bg-error/10 border border-error/30 text-error'}`}>{message}</div>}

      {showForm && (
        <GlassCard className="p-6 border-white/10">
          <h2 className="font-subheading text-lg mb-5">{editing ? 'Edit Skill' : 'New Skill'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">Skill Name</label>
                <input type="text" required value={form.name} onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary/60 text-sm" placeholder="React Native" />
              </div>
              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">Category</label>
                <select value={form.category} onChange={e => setForm(s => ({ ...s, category: e.target.value }))}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary/60 text-sm">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">Proficiency ({form.proficiency}%)</label>
                <input type="range" min="0" max="100" value={form.proficiency} onChange={e => setForm(s => ({ ...s, proficiency: parseInt(e.target.value) }))}
                  className="w-full accent-primary" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 text-sm transition-all flex items-center gap-2">
                {saving && <span className="w-3 h-3 border-2 border-background/30 border-t-background rounded-full animate-spin"></span>}
                {saving ? 'Saving...' : (editing ? 'Update Skill' : 'Add Skill')}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border border-white/10 rounded-lg text-sm text-on-surface-variant hover:bg-white/5 transition-all">Cancel</button>
            </div>
          </form>
        </GlassCard>
      )}

      {loading ? (
        <div className="flex items-center gap-3 text-on-surface-variant py-8">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          Loading skills...
        </div>
      ) : (
        <div className="space-y-6">
          {CATEGORIES.map(cat => (
            grouped[cat].length > 0 && (
              <div key={cat}>
                <h2 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">{cat}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {grouped[cat].map(skill => (
                    <GlassCard key={skill.id} className="p-4 border-white/5 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-body text-sm text-on-surface mb-1">{skill.name}</div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${skill.proficiency || 0}%` }}></div>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => openEdit(skill)} className="px-2 py-1 border border-white/10 rounded text-xs text-on-surface-variant hover:border-primary/40 transition-all">Edit</button>
                        <button onClick={() => handleDelete(skill.id)} className="px-2 py-1 border border-error/30 rounded text-xs text-error hover:bg-error/10 transition-all">✕</button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
