"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Compass,
  Car,
  Inbox,
  CalendarCheck,
  Home,
  Phone,
  Mail,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Bike as BikeIcon,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/bikes', label: 'Bike Fleet', icon: BikeIcon },
  { href: '/admin/taxis', label: 'Taxi Fleet', icon: Car },
  { href: '/admin/services', label: 'Services', icon: Package },
  { href: '/admin/packages', label: 'Tour Packages', icon: Compass },
  { href: '/admin/leads', label: 'Leads', icon: Inbox },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
  { href: '/admin/homepage', label: 'Homepage', icon: Home },
  { href: '/admin/contact-info', label: 'Contact Info', icon: Phone },
];

export default function AdminShell({ title, subtitle, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="admin-shell">
      <div
        className={`admin-sidebar-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-brand-icon">
            <BikeIcon size={19} color="#fff" />
          </div>
          <div className="admin-sidebar-brand-text">
            Biker King
            <span>Admin Dashboard</span>
          </div>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link ${isActive(item) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" target="_blank" className="admin-view-site-link">
            <ExternalLink size={14} />
            <span>View Live Website</span>
          </Link>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="admin-mobile-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div>
              <div className="admin-topbar-title">{title}</div>
              {subtitle && <div className="admin-topbar-sub">{subtitle}</div>}
            </div>
          </div>

          <div className="admin-topbar-user">
            <div className="admin-topbar-avatar">A</div>
            <span>Admin</span>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
