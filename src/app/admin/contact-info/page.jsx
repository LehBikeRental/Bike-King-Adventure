"use client";

import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, Phone, Mail, MapPin, Share2 } from 'lucide-react';
import AdminShell from '../../../components/admin/AdminShell';
import AdminLoader from '../../../components/admin/AdminLoader';
import { DEFAULT_CONTACT_INFO } from '../../../lib/useContactInfo';

function SavedTick({ show }) {
  if (!show) return null;
  return (
    <span style={{ color: '#16A34A', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <CheckCircle2 size={14} /> Saved
    </span>
  );
}

export default function AdminContactInfoPage() {
  const [data, setData] = useState(DEFAULT_CONTACT_INFO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/home-content');
        const json = await res.json();
        if (json.sections?.contact_info) {
          setData({ ...DEFAULT_CONTACT_INFO, ...json.sections.contact_info });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const set = (key, value) => setData({ ...data, [key]: value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const res = await fetch('/api/admin/home-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section_key: 'contact_info', data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save.');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminShell title="Contact Info" subtitle="Manage the phone, email, WhatsApp and social links shown across your website.">
        <AdminLoader label="Loading contact info..." />
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Contact Info" subtitle="One place to control the phone, email, WhatsApp number, address and social links used everywhere on your website.">
      <form onSubmit={handleSave}>
        {error && <div className="admin-error-box">{error}</div>}

        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} color="var(--primary-orange)" />
              Phone & WhatsApp
            </span>
          </div>
          <div className="admin-card-body">
            <div className="admin-form-row-2">
              <div className="admin-form-group">
                <label className="admin-form-label">Primary Phone (digits only, no country code)</label>
                <input className="admin-input" value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="9797948265" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Primary Phone Display Text</label>
                <input className="admin-input" value={data.phoneDisplay} onChange={(e) => set('phoneDisplay', e.target.value)} placeholder="+91 9797948265" />
              </div>
            </div>
            <div className="admin-form-row-2">
              <div className="admin-form-group">
                <label className="admin-form-label">Backup Phone (digits only)</label>
                <input className="admin-input" value={data.phoneBackup} onChange={(e) => set('phoneBackup', e.target.value)} placeholder="9419178265" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Backup Phone Display Text</label>
                <input className="admin-input" value={data.phoneBackupDisplay} onChange={(e) => set('phoneBackupDisplay', e.target.value)} placeholder="+91 9419178265" />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">WhatsApp Number (with country code, no + or spaces)</label>
              <input className="admin-input" value={data.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)} placeholder="919797948265" />
              <p className="admin-helper-text">Used to build every "Chat on WhatsApp" button across the site.</p>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--primary-orange)" />
              Email
            </span>
          </div>
          <div className="admin-card-body">
            <div className="admin-form-group">
              <label className="admin-form-label">Email Address</label>
              <input type="email" className="admin-input" value={data.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} color="var(--primary-orange)" />
              Office Address
            </span>
          </div>
          <div className="admin-card-body">
            <div className="admin-form-group">
              <label className="admin-form-label">Address Line 1</label>
              <input className="admin-input" value={data.addressLine1} onChange={(e) => set('addressLine1', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Address Line 2</label>
              <input className="admin-input" value={data.addressLine2} onChange={(e) => set('addressLine2', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Landmark</label>
              <input className="admin-input" value={data.landmark} onChange={(e) => set('landmark', e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Google Maps Link</label>
              <input className="admin-input" value={data.mapsUrl} onChange={(e) => set('mapsUrl', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Share2 size={16} color="var(--primary-orange)" />
              Social Media Links
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <SavedTick show={saved} />
              <button className="admin-btn admin-btn-primary admin-btn-sm" type="submit" disabled={saving}>
                <Save size={14} />
                <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
              </button>
            </div>
          </div>
          <div className="admin-card-body">
            <div className="admin-form-row-2">
              <div className="admin-form-group">
                <label className="admin-form-label">Instagram URL</label>
                <input className="admin-input" value={data.instagramUrl} onChange={(e) => set('instagramUrl', e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Facebook URL</label>
                <input className="admin-input" value={data.facebookUrl} onChange={(e) => set('facebookUrl', e.target.value)} />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">YouTube URL</label>
              <input className="admin-input" value={data.youtubeUrl} onChange={(e) => set('youtubeUrl', e.target.value)} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', alignItems: 'center' }}>
          <SavedTick show={saved} />
          <button className="admin-btn admin-btn-primary" type="submit" disabled={saving}>
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
