"use client";
import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    site_name: '',
    tagline: '',
    contact_email: '',
    available_for_work: 'true',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_URL}/settings`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setSettings(d.data || settings);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [API_URL]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      const d = await res.json();
      if (d.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(d.message || 'Failed to save settings.');
      }
    } catch {
      setError('Server error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <header className="border-b border-white/10 pb-6">
        <h1 className="font-headline text-3xl mb-1">Site Settings</h1>
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Configure your portfolio</p>
      </header>

      {loading ? (
        <div className="flex items-center gap-3 text-on-surface-variant">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          Loading settings...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <GlassCard className="p-6 space-y-5 border-white/5">
            <h2 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">General</h2>

            {[
              { key: 'site_name', label: 'Site Name', placeholder: 'Anshul S. Katte' },
              { key: 'tagline', label: 'Tagline', placeholder: 'Full-Stack Developer' },
              { key: 'contact_email', label: 'Contact Email', placeholder: 'anshulnayak.9898@gmail.com', type: 'email' },
              { key: 'location', label: 'Location', placeholder: 'Mangalore, Karnataka, India' },
            ].map(field => (
              <div key={field.key}>
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">{field.label}</label>
                <input
                  type={field.type || 'text'}
                  value={settings[field.key] || ''}
                  onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all font-body"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div>
              <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Available for Work</label>
              <select
                value={settings.available_for_work || 'true'}
                onChange={e => setSettings(s => ({ ...s, available_for_work: e.target.value }))}
                className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/60 transition-all font-body"
              >
                <option value="true">✅ Yes — Available for Work</option>
                <option value="false">❌ No — Not Available</option>
              </select>
            </div>
          </GlassCard>

          {error && (
            <div className="px-4 py-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm">{error}</div>
          )}
          {saved && (
            <div className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm">✅ Settings saved successfully!</div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-primary text-background font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin"></span>
                Saving...
              </>
            ) : 'Save Settings'}
          </button>
        </form>
      )}
    </div>
  );
}
