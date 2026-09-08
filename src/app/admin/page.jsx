"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Compass, Car, Inbox, CalendarCheck, AlertCircle, ArrowRight, Clock, Bike as BikeIcon, Mail } from 'lucide-react';
import AdminShell from '../../components/admin/AdminShell';
import AdminLoader from '../../components/admin/AdminLoader';

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="admin-stat-card">
      <div>
        <div className="admin-stat-label">{label}</div>
        <div className="admin-stat-value">{value}</div>
      </div>
      <div className="admin-stat-icon" style={{ background: `${color}18`, color }}>
        <Icon size={20} />
      </div>
    </div>
  );
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const json = await res.json();
        setStats(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AdminShell title="Dashboard Overview" subtitle="Welcome back — here's what's happening on your website.">
      {loading ? (
        <AdminLoader label="Loading dashboard..." />
      ) : (
        <>
          <div className="admin-stats-grid">
            <StatCard label="Bike Fleet" value={stats?.totalBikes ?? 0} icon={BikeIcon} color="#0284C7" />
            <StatCard label="Taxi Fleet" value={stats?.totalTaxiVehicles ?? 0} icon={Car} color="#059669" />
            <StatCard label="Active Services" value={stats?.totalServices ?? 0} icon={Package} color="#EA580C" />
            <StatCard label="Tour Packages" value={stats?.totalPackages ?? 0} icon={Compass} color="#7C3AED" />
            <StatCard label="Total Leads" value={stats?.totalLeads ?? 0} icon={Inbox} color="#2563EB" />
            <StatCard label="Total Bookings" value={stats?.totalBookings ?? 0} icon={CalendarCheck} color="#059669" />
            <StatCard label="Newsletter Subscribers" value={stats?.totalNewsletterSubscribers ?? 0} icon={Mail} color="#0891B2" />
            <StatCard label="New Leads (unread)" value={stats?.newLeads ?? 0} icon={AlertCircle} color="#DC2626" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
            <div className="admin-card">
              <div className="admin-card-header">
                <span className="admin-card-title">Recent Leads</span>
                <Link href="/admin/leads" className="admin-btn admin-btn-ghost admin-btn-sm">
                  <span>View All</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
              <div className="admin-card-body-flush">
                {stats?.recentLeads?.length ? (
                  <div>
                    {stats.recentLeads.map((lead) => (
                      <div
                        key={lead.id}
                        style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', padding: '14px 22px', borderBottom: '1px solid #F1F5F9' }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>{lead.full_name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{lead.service} • {lead.phone}</div>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                          <Clock size={12} />
                          {timeAgo(lead.created_at)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="admin-empty-state">
                    <Inbox size={30} />
                    <p style={{ fontSize: '0.82rem' }}>No leads yet from the contact page.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <span className="admin-card-title">Recent Bookings</span>
                <Link href="/admin/bookings" className="admin-btn admin-btn-ghost admin-btn-sm">
                  <span>View All</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
              <div className="admin-card-body-flush">
                {stats?.recentBookings?.length ? (
                  <div>
                    {stats.recentBookings.map((b) => (
                      <div
                        key={b.id}
                        style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', padding: '14px 22px', borderBottom: '1px solid #F1F5F9' }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>{b.customer_name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{b.item_name} • {b.booking_type}</div>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                          <Clock size={12} />
                          {timeAgo(b.created_at)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="admin-empty-state">
                    <CalendarCheck size={30} />
                    <p style={{ fontSize: '0.82rem' }}>No bookings submitted yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </AdminShell>
  );
}
