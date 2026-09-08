"use client";

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Bike as BikeIcon,
} from 'lucide-react';
import AdminShell from '../../../components/admin/AdminShell';
import ImageUploader from '../../../components/admin/ImageUploader';
import AdminLoader from '../../../components/admin/AdminLoader';
import TypeSelector from '../../../components/admin/TypeSelector';

const EMPTY_FORM = {
  name: '',
  specs: '',
  engine: '',
  power: '',
  ground_clearance: '',
  fuel_capacity: '',
  type: 'Adventure',
  price: '',
  price_display: '',
  image_url: '',
  badge: '',
  description: '',
  features: [''],
  sort_order: 0,
  is_active: true,
  show_on_homepage: true,
};

export default function AdminBikesPage() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadBikes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bikes');
      const json = await res.json();
      setBikes(json.bikes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBikes(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError('');
    setDrawerOpen(true);
  };

  const openEdit = (bike) => {
    setEditingId(bike.id);
    setForm({
      name: bike.name || '',
      specs: bike.specs || '',
      engine: bike.engine || '',
      power: bike.power || '',
      ground_clearance: bike.ground_clearance || '',
      fuel_capacity: bike.fuel_capacity || '',
      type: bike.type || 'Adventure',
      price: bike.price || '',
      price_display: bike.price_display || '',
      image_url: bike.image_url || '',
      badge: bike.badge || '',
      description: bike.description || '',
      features: bike.features?.length ? bike.features : [''],
      sort_order: bike.sort_order || 0,
      is_active: bike.is_active !== false,
      show_on_homepage: bike.show_on_homepage !== false,
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
      price: Number(form.price) || 0,
      sort_order: Number(form.sort_order) || 0,
      features: form.features.map((f) => f.trim()).filter(Boolean),
    };

    try {
      const url = editingId ? `/api/admin/bikes/${editingId}` : '/api/admin/bikes';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save bike.');
      setDrawerOpen(false);
      loadBikes();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/bikes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete.');
      setBikes((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleActive = async (bike) => {
    try {
      const res = await fetch(`/api/admin/bikes/${bike.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bike, is_active: !bike.is_active }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setBikes((prev) => prev.map((b) => (b.id === bike.id ? json.bike : b)));
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleHomepage = async (bike) => {
    try {
      const res = await fetch(`/api/admin/bikes/${bike.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bike, show_on_homepage: !(bike.show_on_homepage !== false) }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setBikes((prev) => prev.map((b) => (b.id === bike.id ? json.bike : b)));
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = bikes.filter((b) =>
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.type?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell title="Bike Fleet" subtitle="Manage rental motorcycles & scooters — specs, images and pricing.">
      {!drawerOpen && (
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-toolbar">
            <div className="admin-search-box">
              <Search size={15} />
              <input
                placeholder="Search bikes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <button className="admin-btn admin-btn-primary" onClick={openCreate}>
            <Plus size={16} />
            <span>Add Bike</span>
          </button>
        </div>

        <div className="admin-table-wrap">
          {loading ? (
            <AdminLoader label="Loading bike fleet..." />
          ) : filtered.length === 0 ? (
            <div className="admin-empty-state">
              <BikeIcon size={30} />
              <p>No bikes found.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Bike</th>
                  <th>Type</th>
                  <th>Price / Day</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Homepage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((bike) => (
                  <tr key={bike.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '220px' }}>
                        <div className="admin-image-preview" style={{ width: '44px', height: '44px' }}>
                          {bike.image_url ? <img src={bike.image_url} alt={bike.name} /> : <BikeIcon size={18} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0F172A' }}>{bike.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{bike.specs}</div>
                        </div>
                      </div>
                    </td>
                    <td>{bike.type}</td>
                    <td style={{ fontWeight: 700 }}>{bike.price_display}</td>
                    <td>{bike.sort_order}</td>
                    <td>
                      <button
                        className={`admin-badge ${bike.is_active ? 'admin-badge-active' : 'admin-badge-inactive'}`}
                        style={{ border: 'none', cursor: 'pointer' }}
                        onClick={() => toggleActive(bike)}
                      >
                        {bike.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td>
                      <button
                        className={`admin-badge ${bike.show_on_homepage !== false ? 'admin-badge-active' : 'admin-badge-inactive'}`}
                        style={{ border: 'none', cursor: 'pointer' }}
                        onClick={() => toggleHomepage(bike)}
                      >
                        {bike.show_on_homepage !== false ? 'Shown' : 'Hidden'}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openEdit(bike)}>
                          <Pencil size={13} />
                        </button>
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(bike.id, bike.name)}>
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
              <span className="admin-card-title">{editingId ? 'Edit Bike' : 'Add New Bike'}</span>
              <button className="admin-drawer-close" onClick={() => setDrawerOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-drawer-body">
                {error && <div className="admin-error-box">{error}</div>}

                <div className="admin-form-group">
                  <label className="admin-form-label">Bike Name *</label>
                  <input
                    className="admin-input"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Himalayan 450"
                  />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Specs Tag</label>
                    <input
                      className="admin-input"
                      value={form.specs}
                      onChange={(e) => setForm({ ...form, specs: e.target.value })}
                      placeholder="e.g. 450cc | Adventure"
                    />
                  </div>
                  <TypeSelector category="bike" label="Type" value={form.type} onChange={(val) => setForm({ ...form, type: val })} />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Engine</label>
                    <input
                      className="admin-input"
                      value={form.engine}
                      onChange={(e) => setForm({ ...form, engine: e.target.value })}
                      placeholder="e.g. 452cc Liquid-Cooled Sherpa Engine"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Power Output</label>
                    <input
                      className="admin-input"
                      value={form.power}
                      onChange={(e) => setForm({ ...form, power: e.target.value })}
                      placeholder="e.g. 40.02 PS @ 8000 rpm"
                    />
                  </div>
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Ground Clearance</label>
                    <input
                      className="admin-input"
                      value={form.ground_clearance}
                      onChange={(e) => setForm({ ...form, ground_clearance: e.target.value })}
                      placeholder="e.g. 230 mm"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Fuel Tank Capacity</label>
                    <input
                      className="admin-input"
                      value={form.fuel_capacity}
                      onChange={(e) => setForm({ ...form, fuel_capacity: e.target.value })}
                      placeholder="e.g. 17 L"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Description</label>
                  <textarea
                    className="admin-textarea"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Short marketing description shown on the bike fleet page..."
                  />
                </div>

                <div className="admin-form-group">
                  <ImageUploader
                    label="Bike Image"
                    value={form.image_url}
                    onChange={(url) => setForm({ ...form, image_url: url })}
                  />
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Price (number, per day) *</label>
                    <input
                      type="number"
                      className="admin-input"
                      required
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="2500"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Price Display Text *</label>
                    <input
                      className="admin-input"
                      required
                      value={form.price_display}
                      onChange={(e) => setForm({ ...form, price_display: e.target.value })}
                      placeholder="₹2,500 / Day"
                    />
                  </div>
                </div>

                <div className="admin-form-row-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Badge Text</label>
                    <input
                      className="admin-input"
                      value={form.badge}
                      onChange={(e) => setForm({ ...form, badge: e.target.value })}
                      placeholder="e.g. Top Pick"
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
                  <label className="admin-form-label">Feature Highlights (optional, shown as bullet list)</label>
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
                  <p className="admin-helper-text">Leave blank to auto-generate from power & ground clearance.</p>
                </div>

                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="bike_is_active"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    style={{ width: '17px', height: '17px' }}
                  />
                  <label htmlFor="bike_is_active" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Visible on the live website
                  </label>
                </div>

                <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="bike_show_on_homepage"
                    checked={form.show_on_homepage}
                    onChange={(e) => setForm({ ...form, show_on_homepage: e.target.checked })}
                    style={{ width: '17px', height: '17px' }}
                  />
                  <label htmlFor="bike_show_on_homepage" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Show in homepage "Rent Royal Enfield Bikes" showcase
                  </label>
                </div>
              </div>

              <div className="admin-drawer-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setDrawerOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Bike'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
