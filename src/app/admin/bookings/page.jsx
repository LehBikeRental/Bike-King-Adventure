"use client";

import React, { useEffect, useState } from 'react';
import { Search, Trash2, CalendarCheck, Phone } from 'lucide-react';
import AdminShell from '../../../components/admin/AdminShell';
import AdminLoader from '../../../components/admin/AdminLoader';

const STATUS_OPTIONS = ['pending', 'confirmed', 'cancelled'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bookings');
      const json = await res.json();
      setBookings(json.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBookings(); }, []);

  const updateStatus = async (id, status) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this booking permanently?')) return;
    try {
      await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' });
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert('Failed to delete booking.');
    }
  };

  const filtered = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch =
      b.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.phone?.toLowerCase().includes(search.toLowerCase()) ||
      b.item_name?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <AdminShell title="Bookings" subtitle="Reservation requests submitted through the booking widget on your website.">
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-toolbar">
            <div className="admin-search-box">
              <Search size={15} />
              <input
                placeholder="Search by name, phone, item..."
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
            <AdminLoader label="Loading bookings..." />
          ) : filtered.length === 0 ? (
            <div className="admin-empty-state">
              <CalendarCheck size={30} />
              <p>No bookings found.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>Days</th>
                  <th>Riders</th>
                  <th>Est. Price</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{b.customer_name}</div>
                      {b.phone && (
                        <a href={`tel:${b.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', textDecoration: 'none', fontSize: '0.78rem' }}>
                          <Phone size={11} />{b.phone}
                        </a>
                      )}
                    </td>
                    <td>{b.item_name}</td>
                    <td style={{ textTransform: 'capitalize' }}>{b.booking_type}</td>
                    <td>{b.start_date || '—'}</td>
                    <td>{b.days || '—'}</td>
                    <td>{b.riders_count || '—'}</td>
                    <td style={{ fontWeight: 700 }}>{b.estimated_price ? `₹${Number(b.estimated_price).toLocaleString('en-IN')}` : '—'}</td>
                    <td style={{ fontSize: '0.76rem', color: '#94A3B8', whiteSpace: 'nowrap' }}>{formatDate(b.created_at)}</td>
                    <td>
                      <select
                        className={`admin-status-select admin-badge-${b.status}`}
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(b.id)}>
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
