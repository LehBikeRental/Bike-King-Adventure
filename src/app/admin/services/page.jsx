"use client";

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Package,
  Bike,
  Car,
  Compass,
  Building2,
  Snowflake,
  Flame,
  ShieldCheck,
  FileCheck,
  Sun,
  Headphones,
} from 'lucide-react';
import AdminShell from '../../../components/admin/AdminShell';
import ImageUploader from '../../../components/admin/ImageUploader';
import AdminLoader from '../../../components/admin/AdminLoader';
import TypeSelector from '../../../components/admin/TypeSelector';

const ICON_OPTIONS = ['Bike', 'Car', 'Compass', 'Building2', 'Snowflake', 'Flame', 'ShieldCheck', 'FileCheck', 'Sun', 'Headphones'];
const ICON_MAP = { Bike, Car, Compass, Building2, Snowflake, Flame, ShieldCheck, FileCheck, Sun, Headphones };
const BOOKING_TYPE_OPTIONS = ['bike', 'package', 'service'];

const EMPTY_FORM = {
  title: '',
  short_title: '',
  category: 'expeditions',
  badge: '',
  icon_name: 'Compass',
  description: '',
  image_url: '',
  dedicated_url: '',
  features: [''],
  price: '',
  cta_text: 'Inquire Now',
  booking_type: 'service',
  sort_order: 0,
  is_active: true,
};

function ServiceIcon({ name, size = 16 }) {
  const Icon = ICON_MAP[name] || Package;
  return <Icon size={size} />;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/services');
      const json = await res.json();
      setServices(json.services || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadServices(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError('');
    setDrawerOpen(true);
  };

  const openEdit = (svc) => {
    setEditingId(svc.id);
    setForm({
      title: svc.title || '',
      short_title: svc.short_title || '',
      category: svc.category || 'expeditions',
      badge: svc.badge || '',
      icon_name: svc.icon_name || 'Compass',
      description: svc.description || '',
      image_url: svc.image_url || '',
      dedicated_url: svc.dedicated_url || '',
      features: svc.features?.length ? svc.features : [''],
      price: svc.price || '',
      cta_text: svc.cta_text || 'Inquire Now',
      booking_type: svc.booking_type || 'service',
      sort_order: svc.sort_order || 0,
      is_active: svc.is_active !== false,
    });
    setError('');
    setDrawerOpen(true);
  };

  const handleFeatureChange = (idx, value) => {
    const updated = [...form.features];
    updated[idx] = value;
    setForm({ ...form, features: updated });
  };

  const addFeature = () => setForm({ ...form, features: [...form.features, ''] });
  const removeFeature = (idx) => setForm({ ...form, features: form.features.filter((_, i) => i !== idx) });

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      ...form,
      features: form.features.map((f) => f.trim()).filter(Boolean),
      sort_order: Number(form.sort_order) || 0,
    };

    try {
      const url = editingId ? `/api/admin/services/${editingId}` : '/api/admin/services';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save service.');
      setDrawerOpen(false);
      loadServices();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete.');
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleActive = async (svc) => {
    try {
      const res = await fetch(`/api/admin/services/${svc.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...svc, is_active: !svc.is_active }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setServices((prev) => prev.map((s) => (s.id === svc.id ? json.service : s)));
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = services.filter((s) =>
    s.title?.toLowerCase().includes(search.toLowerCase()) ||
    s.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell title="Services" subtitle="Manage the services shown across your website — pricing, images, and details.">
      {!drawerOpen && (
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-toolbar">
            <div className="admin-search-box">
              <Search size={15} />
              <input
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <button className="admin-btn admin-btn-primary" onClick={openCreate}>
            <Plus size={16} />
            <span>Add Service</span>
          </button>
        </div>

        <div className="admin-table-wrap">
          {loading ? (
            <AdminLoader label="Loading services..." />
          ) : filtered.length === 0 ? (
            <div className="admin-empty-state">
              <Package size={30} />
              <p>No services found.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((svc) => (
                  <tr key={svc.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '220px' }}>
                        <div className="admin-image-preview" style={{ width: '44px', height: '44px' }}>
                          {svc.image_url ? <img src={svc.image_url} alt={svc.title} /> : <ServiceIcon name={svc.icon_name} size={18} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0F172A' }}>{svc.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{svc.short_title}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{svc.category}</td>
                    <td style={{ fontWeight: 700 }}>{svc.price}</td>
                    <td>{svc.sort_order}</td>
                    <td>
                      <button
                        className={`admin-badge ${svc.is_active ? 'admin-badge-active' : 'admin-badge-inactive'}`}
                        style={{ border: 'none', cursor: 'pointer' }}
                        onClick={() => toggleActive(svc)}
                      >
                        {svc.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openEdit(svc)}>
                          <Pencil size={13} />
                        </button>
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(svc.id, svc.title)}>
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
              <span className="admin-card-title">{editingId ? 'Edit Service' : 'Add New Service'}</span>
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
                    placeholder="e.g. Royal Enfield Motorbike Rentals"
                  />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Short Title</label>
                    <input
                      className="admin-input"
                      value={form.short_title}
                      onChange={(e) => setForm({ ...form, short_title: e.target.value })}
                      placeholder="e.g. Royal Enfield Bikes"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Badge Text</label>
                    <input
                      className="admin-input"
                      value={form.badge}
                      onChange={(e) => setForm({ ...form, badge: e.target.value })}
                      placeholder="e.g. WINTER EXPEDITION"
                    />
                  </div>
                </div>

                <div className="admin-form-row-2">
                  <TypeSelector category="service" label="Category" value={form.category} onChange={(val) => setForm({ ...form, category: val })} />
                  <div className="admin-form-group">
                    <label className="admin-form-label">Icon</label>
                    <select
                      className="admin-select"
                      value={form.icon_name}
                      onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
                    >
                      {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Description</label>
                  <textarea
                    className="admin-textarea"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Short marketing description shown on the services page..."
                  />
                </div>

                <div className="admin-form-group">
                  <ImageUploader
                    label="Service Image"
                    value={form.image_url}
                    onChange={(url) => setForm({ ...form, image_url: url })}
                  />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Price *</label>
                    <input
                      className="admin-input"
                      required
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="e.g. From ₹800 / Day"
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

                <div className="admin-form-group">
                  <label className="admin-form-label">Features / Highlights</label>
                  {form.features.map((feat, idx) => (
                    <div key={idx} className="admin-list-editor-row">
                      <input
                        className="admin-input"
                        value={feat}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder={`Feature ${idx + 1}`}
                      />
                      <button type="button" className="admin-icon-remove" onClick={() => removeFeature(idx)}>
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                  <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addFeature}>
                    <Plus size={13} />
                    <span>Add Feature</span>
                  </button>
                </div>

                <hr className="admin-section-divider" />

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">CTA Button Text</label>
                    <input
                      className="admin-input"
                      value={form.cta_text}
                      onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Booking Type</label>
                    <select
                      className="admin-select"
                      value={form.booking_type}
                      onChange={(e) => setForm({ ...form, booking_type: e.target.value })}
                    >
                      {BOOKING_TYPE_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Dedicated Page URL (optional)</label>
                  <input
                    className="admin-input"
                    value={form.dedicated_url}
                    onChange={(e) => setForm({ ...form, dedicated_url: e.target.value })}
                    placeholder="e.g. /bikes (leave blank to use booking modal instead)"
                  />
                </div>

                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    style={{ width: '17px', height: '17px' }}
                  />
                  <label htmlFor="is_active" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Visible on the live website
                  </label>
                </div>
              </div>

              <div className="admin-drawer-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setDrawerOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
