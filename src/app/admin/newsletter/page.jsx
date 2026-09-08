"use client";

import React, { useEffect, useState } from 'react';
import { Search, Trash2, Mail, Download } from 'lucide-react';
import AdminShell from '../../../components/admin/AdminShell';
import AdminLoader from '../../../components/admin/AdminLoader';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/newsletter');
      const json = await res.json();
      setSubscribers(json.subscribers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSubscribers(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Remove this subscriber permanently?')) return;
    try {
      await fetch(`/api/admin/newsletter/${id}`, { method: 'DELETE' });
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert('Failed to delete subscriber.');
    }
  };

  const handleExportCsv = () => {
    const rows = [['Email', 'Subscribed At'], ...filtered.map((s) => [s.email, s.created_at])];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = subscribers.filter((s) => s.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminShell title="Newsletter Subscribers" subtitle="Emails collected from the footer newsletter signup form.">
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-toolbar">
            <div className="admin-search-box">
              <Search size={15} />
              <input
                placeholder="Search by email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>
              {subscribers.length} total subscriber{subscribers.length === 1 ? '' : 's'}
            </span>
          </div>
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={handleExportCsv} disabled={filtered.length === 0}>
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="admin-table-wrap">
          {loading ? (
            <AdminLoader label="Loading subscribers..." />
          ) : filtered.length === 0 ? (
            <div className="admin-empty-state">
              <Mail size={30} />
              <p>No newsletter subscribers yet.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Subscribed On</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub) => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: 700, color: '#0F172A' }}>
                      <a href={`mailto:${sub.email}`} style={{ color: '#0F172A', textDecoration: 'none' }}>{sub.email}</a>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748B' }}>{formatDate(sub.created_at)}</td>
                    <td>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(sub.id)}>
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
