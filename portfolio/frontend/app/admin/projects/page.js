"use client";
import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', description: '', tags: '', github_url: '', live_url: '', featured: false, sort_order: 0 });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const IMAGE_BASE_URL = API_URL.replace('/api', '');
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  const fetchProjects = async () => {
    const res = await fetch(`${API_URL}/projects`);
    const d = await res.json();
    if (d.success) setProjects(d.data);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', slug: '', description: '', tags: '', github_url: '', live_url: '', featured: false, sort_order: 0 });
    setImageFile(null);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditing(p.id);
    setForm({ ...p, tags: Array.isArray(p.tags) ? p.tags.join(', ') : '' });
    setImageFile(null);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const url = editing ? `${API_URL}/projects/${editing}` : `${API_URL}/projects`;
    const method = editing ? 'PUT' : 'POST';

    const isMultipart = !!imageFile;
    let body;
    let headers = { Authorization: `Bearer ${token}` };

    if (isMultipart) {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('slug', form.slug || '');
      formData.append('description', form.description || '');
      formData.append('github_url', form.github_url || '');
      formData.append('live_url', form.live_url || '');
      formData.append('featured', form.featured ? 'true' : 'false');
      formData.append('sort_order', form.sort_order || 0);

      const tagsArr = form.tags.split(',').map(t => t.trim()).filter(Boolean);
      tagsArr.forEach(tag => {
        formData.append('tags[]', tag);
      });

      formData.append('image', imageFile);
      body = formData;
    } else {
      headers['Content-Type'] = 'application/json';
      const tagsArr = form.tags.split(',').map(t => t.trim()).filter(Boolean);
      body = JSON.stringify({
        title: form.title,
        slug: form.slug || '',
        description: form.description || '',
        github_url: form.github_url || '',
        live_url: form.live_url || '',
        featured: !!form.featured,
        sort_order: parseInt(form.sort_order) || 0,
        tags: tagsArr,
        image_url: form.image_url || null
      });
    }

    try {
      const res = await fetch(url, {
        method,
        headers,
        body,
      });
      const d = await res.json();
      if (d.success) {
        setMessage(editing ? '✅ Project updated!' : '✅ Project created!');
        setShowForm(false);
        fetchProjects();
      } else {
        setMessage(`❌ ${d.message}`);
      }
    } catch {
      setMessage('❌ Server error.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProjects();
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <header className="border-b border-white/10 pb-6 flex justify-between items-center">
        <div>
          <h1 className="font-headline text-3xl mb-1">Projects</h1>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Manage portfolio projects</p>
        </div>
        <button onClick={openNew} className="px-6 py-3 bg-primary text-background font-semibold rounded-xl hover:bg-primary/90 transition-all cursor-pointer">
          + Add Project
        </button>
      </header>

      {message && <div className={`px-4 py-3 rounded-lg text-sm ${message.startsWith('✅') ? 'bg-primary/10 border border-primary/30 text-primary' : 'bg-error/10 border border-error/30 text-error'}`}>{message}</div>}

      {/* Form */}
      {showForm && (
        <GlassCard className="p-6 border-white/10">
          <h2 className="font-subheading text-lg mb-6">{editing ? 'Edit Project' : 'New Project'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'title', label: 'Title', required: true },
                { key: 'slug', label: 'Slug', placeholder: 'my-project-slug' },
                { key: 'github_url', label: 'GitHub URL', type: 'url' },
                { key: 'live_url', label: 'Live URL', type: 'url' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    value={form[f.key] || ''}
                    onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))}
                    required={f.required}
                    placeholder={f.placeholder}
                    className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary/60 text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Cover Image Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">Upload Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => { setImageFile(e.target.files[0]); setForm(s => ({ ...s, image_url: '' })); }}
                  className="w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer"
                />
              </div>
              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">Or Paste Image URL</label>
                <input
                  type="text"
                  value={form.image_url || ''}
                  onChange={e => { setForm(s => ({ ...s, image_url: e.target.value })); setImageFile(null); }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary/60 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">Description</label>
              <textarea
                value={form.description || ''}
                onChange={e => setForm(s => ({ ...s, description: e.target.value }))}
                rows={3}
                className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary/60 text-sm resize-none"
              />
            </div>
            <div>
              <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={form.tags || ''}
                onChange={e => setForm(s => ({ ...s, tags: e.target.value }))}
                placeholder="React, Node.js, MySQL"
                className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-2 text-on-surface focus:outline-none focus:border-primary/60 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={!!form.featured}
                onChange={e => setForm(s => ({ ...s, featured: e.target.checked }))}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor="featured" className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Featured Project</label>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 text-sm transition-all flex items-center gap-2 cursor-pointer">
                {saving && <span className="w-3 h-3 border-2 border-background/30 border-t-background rounded-full animate-spin"></span>}
                {saving ? 'Saving...' : (editing ? 'Update Project' : 'Create Project')}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border border-white/10 rounded-lg text-sm text-on-surface-variant hover:bg-white/5 transition-all cursor-pointer">
                Cancel
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Projects List */}
      {loading ? (
        <div className="flex items-center gap-3 text-on-surface-variant py-8">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          Loading projects...
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map(p => (
            <GlassCard key={p.id} className="p-5 border-white/5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {p.image_url && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 relative flex-shrink-0 bg-surface-container-highest">
                    <img src={p.image_url.startsWith('http') ? p.image_url : `${IMAGE_BASE_URL}${p.image_url}`} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-subheading text-base text-on-surface truncate">{p.title}</h3>
                    {p.featured ? <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-label uppercase tracking-wider flex-shrink-0">Featured</span> : null}
                  </div>
                  <p className="font-body text-sm text-on-surface-variant line-clamp-2 mb-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {(p.tags || []).map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-white/5 text-on-surface-variant rounded-full border border-white/10">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p)} className="px-3 py-1.5 border border-white/10 rounded-lg text-xs text-on-surface-variant hover:border-primary/40 hover:text-on-surface transition-all cursor-pointer">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 border border-error/30 rounded-lg text-xs text-error hover:bg-error/10 transition-all cursor-pointer">Delete</button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
