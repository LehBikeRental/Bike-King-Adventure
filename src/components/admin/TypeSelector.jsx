"use client";

import React, { useEffect, useState } from 'react';
import { Settings2, X } from 'lucide-react';

export default function TypeSelector({ category, value, onChange, label = 'Type' }) {
  const [options, setOptions] = useState([]);
  const [managing, setManaging] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await fetch(`/api/admin/type-options?category=${category}`);
      const json = await res.json();
      setOptions(json.options || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, [category]);

  const handleSelectChange = (e) => {
    if (e.target.value === '__add_new__') {
      setAdding(true);
      return;
    }
    onChange(e.target.value);
  };

  const handleAddNew = async () => {
    const name = newName.trim();
    if (!name) return;
    setError('');
    try {
      const res = await fetch('/api/admin/type-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to add type.');
      setOptions((prev) => [...prev, json.option]);
      onChange(json.option.name);
      setNewName('');
      setAdding(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete type "${name}"? Items already using it will keep it, but it won't be selectable again.`)) return;
    try {
      const res = await fetch(`/api/admin/type-options/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete type.');
      setOptions((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const hasCurrentValue = options.some((o) => o.name === value);

  return (
    <div className="admin-form-group">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label className="admin-form-label">{label}</label>
        <button
          type="button"
          onClick={() => setManaging((m) => !m)}
          style={{ background: 'none', border: 'none', color: 'var(--primary-orange)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <Settings2 size={12} />
          <span>{managing ? 'Done' : 'Manage Types'}</span>
        </button>
      </div>

      {!adding ? (
        <select className="admin-select" value={value} onChange={handleSelectChange}>
          {!hasCurrentValue && value && <option value={value}>{value}</option>}
          {options.map((o) => (
            <option key={o.id} value={o.name}>{o.name}</option>
          ))}
          <option value="__add_new__">+ Add New Type...</option>
        </select>
      ) : (
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            autoFocus
            className="admin-input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New type name"
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddNew(); } }}
          />
          <button type="button" className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleAddNew}>Add</button>
          <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => { setAdding(false); setNewName(''); setError(''); }}>Cancel</button>
        </div>
      )}
      {error && <p style={{ color: '#DC2626', fontSize: '0.75rem', marginTop: '4px' }}>{error}</p>}

      {managing && (
        <div style={{ marginTop: '10px', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px' }}>
          {options.length === 0 ? (
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: 0 }}>No types yet.</p>
          ) : options.map((o) => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.85rem', color: '#334155' }}>{o.name}</span>
              <button type="button" className="admin-icon-remove" onClick={() => handleDelete(o.id, o.name)}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
