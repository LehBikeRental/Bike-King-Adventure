"use client";

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Car,
} from 'lucide-react';
import AdminShell from '../../../components/admin/AdminShell';
import AdminLoader from '../../../components/admin/AdminLoader';
import ImageUploader from '../../../components/admin/ImageUploader';
import TypeSelector from '../../../components/admin/TypeSelector';

export default function AdminTaxisPage() {
  return (
    <AdminShell title="Taxi Fleet" subtitle="Manage 4x4 taxi vehicles — specs, images and pricing.">
      <VehiclesTab />
    </AdminShell>
  );
}

const EMPTY_VEHICLE_FORM = {
  name: '', badge: '', image_url: '', seats: '', luggage: '',
  features: [''], ideal_for: '', starting_rate: '', vehicle_type: 'innova',
  sort_order: 0, is_active: true,
};

function VehiclesTab() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_VEHICLE_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/taxi-vehicles');
      const json = await res.json();
      setVehicles(json.vehicles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_VEHICLE_FORM);
    setError('');
    setFormOpen(true);
  };

  const openEdit = (v) => {
    setEditingId(v.id);
    setForm({
      name: v.name || '', badge: v.badge || '', image_url: v.image_url || '',
      seats: v.seats || '', luggage: v.luggage || '',
      features: v.features?.length ? v.features : [''],
      ideal_for: v.ideal_for || '', starting_rate: v.starting_rate || '',
      vehicle_type: v.vehicle_type || 'innova', sort_order: v.sort_order || 0,
      is_active: v.is_active !== false,
    });
    setError('');
    setFormOpen(true);
  };

  const updateFeature = (idx, value) => {
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
      sort_order: Number(form.sort_order) || 0,
      features: form.features.map((f) => f.trim()).filter(Boolean),
    };

    try {
      const url = editingId ? `/api/admin/taxi-vehicles/${editingId}` : '/api/admin/taxi-vehicles';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save vehicle.');
      setFormOpen(false);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/taxi-vehicles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete.');
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleActive = async (v) => {
    try {
      const res = await fetch(`/api/admin/taxi-vehicles/${v.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...v, is_active: !v.is_active }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setVehicles((prev) => prev.map((x) => (x.id === v.id ? json.vehicle : x)));
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = vehicles.filter((v) => v.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      {!formOpen && (
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-toolbar">
              <div className="admin-search-box">
                <Search size={15} />
                <input placeholder="Search vehicles..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <button className="admin-btn admin-btn-primary" onClick={openCreate}>
              <Plus size={16} />
              <span>Add Vehicle</span>
            </button>
          </div>

          <div className="admin-table-wrap">
            {loading ? (
              <AdminLoader label="Loading taxi fleet..." />
            ) : filtered.length === 0 ? (
              <div className="admin-empty-state">
                <Car size={30} />
                <p>No vehicles found.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Type</th>
                    <th>Seats</th>
                    <th>Starting Rate</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v) => (
                    <tr key={v.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '220px' }}>
                          <div className="admin-image-preview" style={{ width: '44px', height: '44px' }}>
                            {v.image_url ? <img src={v.image_url} alt={v.name} /> : <Car size={18} />}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#0F172A' }}>{v.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{v.badge}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>{v.vehicle_type}</td>
                      <td>{v.seats}</td>
                      <td style={{ fontWeight: 700 }}>{v.starting_rate}</td>
                      <td>{v.sort_order}</td>
                      <td>
                        <button
                          className={`admin-badge ${v.is_active ? 'admin-badge-active' : 'admin-badge-inactive'}`}
                          style={{ border: 'none', cursor: 'pointer' }}
                          onClick={() => toggleActive(v)}
                        >
                          {v.is_active ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openEdit(v)}>
                            <Pencil size={13} />
                          </button>
                          <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(v.id, v.name)}>
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

      {formOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-drawer">
            <div className="admin-drawer-header">
              <span className="admin-card-title">{editingId ? 'Edit Taxi Vehicle' : 'Add New Taxi Vehicle'}</span>
              <button className="admin-drawer-close" onClick={() => setFormOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-drawer-body">
                {error && <div className="admin-error-box">{error}</div>}

                <div className="admin-form-group">
                  <label className="admin-form-label">Vehicle Name *</label>
                  <input
                    className="admin-input"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Toyota Innova Crysta 4x4"
                  />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Badge Text</label>
                    <input className="admin-input" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. Most Popular Family Ride" />
                  </div>
                  <TypeSelector category="taxi" label="Vehicle Type" value={form.vehicle_type} onChange={(val) => setForm({ ...form, vehicle_type: val })} />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Seats</label>
                    <input className="admin-input" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} placeholder="e.g. 6 + 1 Driver" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Luggage Capacity</label>
                    <input className="admin-input" value={form.luggage} onChange={(e) => setForm({ ...form, luggage: e.target.value })} placeholder="e.g. 4 Large Bags + Rooftop Carrier" />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Ideal For</label>
                  <input className="admin-input" value={form.ideal_for} onChange={(e) => setForm({ ...form, ideal_for: e.target.value })} placeholder="e.g. Families, honeymoon couples & executive touring" />
                </div>

                <div className="admin-form-group">
                  <ImageUploader label="Vehicle Image" value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Starting Rate Display Text *</label>
                    <input className="admin-input" required value={form.starting_rate} onChange={(e) => setForm({ ...form, starting_rate: e.target.value })} placeholder="₹3,800 / Day" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Sort Order</label>
                    <input type="number" className="admin-input" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Feature Highlights</label>
                  {form.features.map((feat, idx) => (
                    <div key={idx} className="admin-list-editor-row">
                      <input className="admin-input" value={feat} onChange={(e) => updateFeature(idx, e.target.value)} placeholder={`Feature ${idx + 1}`} />
                      <button type="button" className="admin-icon-remove" onClick={() => removeFeature(idx)}><X size={15} /></button>
                    </div>
                  ))}
                  <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addFeature}>
                    <Plus size={13} /><span>Add Feature</span>
                  </button>
                </div>

                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="vehicle_is_active"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    style={{ width: '17px', height: '17px' }}
                  />
                  <label htmlFor="vehicle_is_active" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Visible on the live website
                  </label>
                </div>
              </div>

              <div className="admin-drawer-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setFormOpen(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
