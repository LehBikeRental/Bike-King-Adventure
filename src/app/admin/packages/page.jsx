"use client";

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Compass,
} from 'lucide-react';
import AdminShell from '../../../components/admin/AdminShell';
import ImageUploader from '../../../components/admin/ImageUploader';
import AdminLoader from '../../../components/admin/AdminLoader';

const INCLUSION_ICONS = ['Utensils', 'Building2', 'Bike', 'FileCheck'];

const EMPTY_FORM = {
  title: '',
  duration: '',
  days_count: 5,
  route: '',
  price: '',
  price_display: '',
  image_url: '',
  category: '',
  inclusions: [
    { name: 'Meals', icon: 'Utensils', text: '' },
    { name: 'Hotel', icon: 'Building2', text: '' },
    { name: 'Sightseeing', icon: 'Bike', text: '' },
    { name: 'Permit', icon: 'FileCheck', text: '' },
  ],
  highlights: [''],
  itinerary: [{ day: 'Day 1', title: '', desc: '' }],
  sort_order: 0,
  is_active: true,
  show_on_homepage: true,
};

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/packages');
      const json = await res.json();
      setPackages(json.packages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPackages(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError('');
    setDrawerOpen(true);
  };

  const openEdit = (pkg) => {
    setEditingId(pkg.id);
    setForm({
      title: pkg.title || '',
      duration: pkg.duration || '',
      days_count: pkg.days_count || 1,
      route: pkg.route || '',
      price: pkg.price || '',
      price_display: pkg.price_display || '',
      image_url: pkg.image_url || '',
      category: pkg.category || '',
      inclusions: pkg.inclusions?.length ? pkg.inclusions : EMPTY_FORM.inclusions,
      highlights: pkg.highlights?.length ? pkg.highlights : [''],
      itinerary: pkg.itinerary?.length ? pkg.itinerary : [{ day: 'Day 1', title: '', desc: '' }],
      sort_order: pkg.sort_order || 0,
      is_active: pkg.is_active !== false,
      show_on_homepage: pkg.show_on_homepage !== false,
    });
    setError('');
    setDrawerOpen(true);
  };

  // --- Inclusions ---
  const updateInclusion = (idx, field, value) => {
    const updated = [...form.inclusions];
    updated[idx] = { ...updated[idx], [field]: value };
    setForm({ ...form, inclusions: updated });
  };
  const addInclusion = () => setForm({ ...form, inclusions: [...form.inclusions, { name: '', icon: 'FileCheck', text: '' }] });
  const removeInclusion = (idx) => setForm({ ...form, inclusions: form.inclusions.filter((_, i) => i !== idx) });

  // --- Highlights ---
  const updateHighlight = (idx, value) => {
    const updated = [...form.highlights];
    updated[idx] = value;
    setForm({ ...form, highlights: updated });
  };
  const addHighlight = () => setForm({ ...form, highlights: [...form.highlights, ''] });
  const removeHighlight = (idx) => setForm({ ...form, highlights: form.highlights.filter((_, i) => i !== idx) });

  // --- Itinerary ---
  const updateItineraryDay = (idx, field, value) => {
    const updated = [...form.itinerary];
    updated[idx] = { ...updated[idx], [field]: value };
    setForm({ ...form, itinerary: updated });
  };
  const addItineraryDay = () => setForm({
    ...form,
    itinerary: [...form.itinerary, { day: `Day ${form.itinerary.length + 1}`, title: '', desc: '' }],
  });
  const removeItineraryDay = (idx) => setForm({ ...form, itinerary: form.itinerary.filter((_, i) => i !== idx) });

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price) || 0,
      days_count: Number(form.days_count) || 1,
      sort_order: Number(form.sort_order) || 0,
      highlights: form.highlights.map((h) => h.trim()).filter(Boolean),
      inclusions: form.inclusions.filter((i) => i.name && i.text),
      itinerary: form.itinerary.filter((d) => d.title || d.desc),
    };

    try {
      const url = editingId ? `/api/admin/packages/${editingId}` : '/api/admin/packages';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save package.');
      setDrawerOpen(false);
      loadPackages();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete.');
      setPackages((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleActive = async (pkg) => {
    try {
      const res = await fetch(`/api/admin/packages/${pkg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pkg, is_active: !pkg.is_active }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setPackages((prev) => prev.map((p) => (p.id === pkg.id ? json.package : p)));
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleHomepage = async (pkg) => {
    try {
      const res = await fetch(`/api/admin/packages/${pkg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pkg, show_on_homepage: !(pkg.show_on_homepage !== false) }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setPackages((prev) => prev.map((p) => (p.id === pkg.id ? json.package : p)));
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = packages.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.route?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell title="Tour Packages" subtitle="Manage multi-day expedition packages — pricing, itinerary, inclusions and images.">
      {!drawerOpen && (
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-toolbar">
            <div className="admin-search-box">
              <Search size={15} />
              <input
                placeholder="Search packages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <button className="admin-btn admin-btn-primary" onClick={openCreate}>
            <Plus size={16} />
            <span>Add Package</span>
          </button>
        </div>

        <div className="admin-table-wrap">
          {loading ? (
            <AdminLoader label="Loading packages..." />
          ) : filtered.length === 0 ? (
            <div className="admin-empty-state">
              <Compass size={30} />
              <p>No packages found.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Duration</th>
                  <th>Route</th>
                  <th>Price</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Homepage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((pkg) => (
                  <tr key={pkg.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '220px' }}>
                        <div className="admin-image-preview" style={{ width: '44px', height: '44px' }}>
                          {pkg.image_url ? <img src={pkg.image_url} alt={pkg.title} /> : <Compass size={18} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0F172A' }}>{pkg.title}</div>
                          {pkg.category && <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{pkg.category}</div>}
                        </div>
                      </div>
                    </td>
                    <td>{pkg.duration}</td>
                    <td style={{ maxWidth: '220px', whiteSpace: 'normal', fontSize: '0.8rem', color: '#64748B' }}>{pkg.route}</td>
                    <td style={{ fontWeight: 700 }}>{pkg.price_display}</td>
                    <td>{pkg.sort_order}</td>
                    <td>
                      <button
                        className={`admin-badge ${pkg.is_active ? 'admin-badge-active' : 'admin-badge-inactive'}`}
                        style={{ border: 'none', cursor: 'pointer' }}
                        onClick={() => toggleActive(pkg)}
                      >
                        {pkg.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td>
                      <button
                        className={`admin-badge ${pkg.show_on_homepage !== false ? 'admin-badge-active' : 'admin-badge-inactive'}`}
                        style={{ border: 'none', cursor: 'pointer' }}
                        onClick={() => toggleHomepage(pkg)}
                      >
                        {pkg.show_on_homepage !== false ? 'Shown' : 'Hidden'}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openEdit(pkg)}>
                          <Pencil size={13} />
                        </button>
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(pkg.id, pkg.title)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      )}

      {drawerOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-drawer">
            <div className="admin-drawer-header">
              <span className="admin-card-title">{editingId ? 'Edit Package' : 'Add New Package'}</span>
              <button className="admin-drawer-close" onClick={() => setDrawerOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-drawer-body">
                {error && <div className="admin-error-box">{error}</div>}

                <div className="admin-form-group">
                  <label className="admin-form-label">Title *</label>
                  <input
                    className="admin-input"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. LEH LADAKH ROAD TRIP"
                  />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Duration Label</label>
                    <input
                      className="admin-input"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      placeholder="e.g. 7 DAYS"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Days Count</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={form.days_count}
                      onChange={(e) => setForm({ ...form, days_count: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Route</label>
                  <input
                    className="admin-input"
                    value={form.route}
                    onChange={(e) => setForm({ ...form, route: e.target.value })}
                    placeholder="e.g. Leh – Nubra – Pangong – Tso Moriri – Leh"
                  />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Price (number) *</label>
                    <input
                      type="number"
                      className="admin-input"
                      required
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="24999"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Price Display Text *</label>
                    <input
                      className="admin-input"
                      required
                      value={form.price_display}
                      onChange={(e) => setForm({ ...form, price_display: e.target.value })}
                      placeholder="₹24,999 / Person"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <ImageUploader
                    label="Package Cover Image"
                    value={form.image_url}
                    onChange={(url) => setForm({ ...form, image_url: url })}
                  />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Category Tag (optional)</label>
                    <input
                      className="admin-input"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      placeholder="e.g. Winter Special"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Sort Order</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={form.sort_order}
                      onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                    />
                  </div>
                </div>

                <hr className="admin-section-divider" />

                <label className="admin-form-label">Inclusions (4 quick chips shown on cards)</label>
                {form.inclusions.map((inc, idx) => (
                  <div key={idx} className="admin-repeat-card">
                    <div className="admin-repeat-card-head">
                      <span>Inclusion {idx + 1}</span>
                      <button type="button" className="admin-icon-remove" onClick={() => removeInclusion(idx)}><X size={14} /></button>
                    </div>
                    <div className="admin-form-row-2">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Label</label>
                        <input className="admin-input" value={inc.name} onChange={(e) => updateInclusion(idx, 'name', e.target.value)} placeholder="e.g. Meals" />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Icon</label>
                        <select className="admin-select" value={inc.icon} onChange={(e) => updateInclusion(idx, 'icon', e.target.value)}>
                          {INCLUSION_ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Text</label>
                      <input className="admin-input" value={inc.text} onChange={(e) => updateInclusion(idx, 'text', e.target.value)} placeholder="e.g. Breakfast & Dinner" />
                    </div>
                  </div>
                ))}
                <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addInclusion}>
                  <Plus size={13} /><span>Add Inclusion</span>
                </button>

                <hr className="admin-section-divider" />

                <label className="admin-form-label">Highlights</label>
                {form.highlights.map((h, idx) => (
                  <div key={idx} className="admin-list-editor-row">
                    <input
                      className="admin-input"
                      value={h}
                      onChange={(e) => updateHighlight(idx, e.target.value)}
                      placeholder={`Highlight ${idx + 1}`}
                    />
                    <button type="button" className="admin-icon-remove" onClick={() => removeHighlight(idx)}>
                      <X size={15} />
                    </button>
                  </div>
                ))}
                <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addHighlight}>
                  <Plus size={13} /><span>Add Highlight</span>
                </button>

                <hr className="admin-section-divider" />

                <label className="admin-form-label">Day-by-Day Itinerary</label>
                {form.itinerary.map((d, idx) => (
                  <div key={idx} className="admin-repeat-card">
                    <div className="admin-repeat-card-head">
                      <span>{d.day || `Day ${idx + 1}`}</span>
                      <button type="button" className="admin-icon-remove" onClick={() => removeItineraryDay(idx)}><X size={14} /></button>
                    </div>
                    <div className="admin-form-row-2">
                      <div className="admin-form-group">
                        <label className="admin-form-label">Day Label</label>
                        <input className="admin-input" value={d.day} onChange={(e) => updateItineraryDay(idx, 'day', e.target.value)} placeholder="Day 1" />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label">Title</label>
                        <input className="admin-input" value={d.title} onChange={(e) => updateItineraryDay(idx, 'title', e.target.value)} />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Description</label>
                      <textarea className="admin-textarea" value={d.desc} onChange={(e) => updateItineraryDay(idx, 'desc', e.target.value)} />
                    </div>
                  </div>
                ))}
                <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addItineraryDay}>
                  <Plus size={13} /><span>Add Day</span>
                </button>

                <hr className="admin-section-divider" />

                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="pkg_is_active"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    style={{ width: '17px', height: '17px' }}
                  />
                  <label htmlFor="pkg_is_active" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Visible on the live website
                  </label>
                </div>

                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="pkg_show_on_homepage"
                    checked={form.show_on_homepage}
                    onChange={(e) => setForm({ ...form, show_on_homepage: e.target.checked })}
                    style={{ width: '17px', height: '17px' }}
                  />
                  <label htmlFor="pkg_show_on_homepage" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Show in homepage "Popular Tour Packages" section
                  </label>
                </div>
              </div>

              <div className="admin-drawer-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setDrawerOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
