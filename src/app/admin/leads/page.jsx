"use client";

import React, { useEffect, useState } from 'react';
import { Search, Trash2, Inbox, Phone, Mail } from 'lucide-react';
import AdminShell from '../../../components/admin/AdminShell';
import AdminLoader from '../../../components/admin/AdminLoader';

const STATUS_OPTIONS = ['new', 'contacted', 'closed'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const json = await res.json();
      setLeads(json.leads || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadLeads(); }, []);

  const updateStatus = async (id, status) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this lead permanently?')) return;
    try {
      await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      alert('Failed to delete lead.');
    }
  };

  const filtered = leads.filter((l) => {
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchesSearch =
      l.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <AdminShell title="Leads" subtitle="Inquiries submitted through the Contact page on your website.">
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-toolbar">
            <div className="admin-search-box">
              <Search size={15} />
              <input
                placeholder="Search by name, phone, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="admin-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: 'auto' }}>
              <option value="all">All Statuses</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="admin-table-wrap">
          {loading ? (
            <AdminLoader label="Loading leads..." />
          ) : filtered.length === 0 ? (
            <div className="admin-empty-state">
              <Inbox size={30} />
              <p>No leads found.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Travel Dates</th>
                  <th>Riders</th>
                  <th>Message</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id}>
                    <td style={{ fontWeight: 700, color: '#0F172A' }}>{lead.full_name}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#334155', textDecoration: 'none', fontSize: '0.8rem' }}>
                            <Phone size={12} />{lead.phone}
                          </a>
                        )}
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', textDecoration: 'none', fontSize: '0.78rem' }}>
                            <Mail size={12} />{lead.email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td>{lead.service}</td>
                    <td>{lead.travel_dates || '—'}</td>
                    <td>{lead.riders_count || '—'}</td>
                    <td style={{ maxWidth: '220px', whiteSpace: 'normal' }}>{lead.message || '—'}</td>
                    <td style={{ fontSize: '0.76rem', color: '#94A3B8', whiteSpace: 'nowrap' }}>{formatDate(lead.created_at)}</td>
                    <td>
                      <select
                        className={`admin-status-select admin-badge-${lead.status}`}
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(lead.id)}>
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
