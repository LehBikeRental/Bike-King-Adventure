"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'SERVICES', href: '/services' },
    { name: 'BIKE RENTAL', href: '/#bikes' },
    { name: 'TAXI SERVICE', href: '/services#taxi-service' },
    { name: 'PACKAGES', href: '/#packages' },
    { name: 'HOTELS', href: '/services#hotels' },
    { name: 'CONTACT US', href: '/contact' },
  ];

  const isLinkActive = (link) => {
    if (link.href === '/' && pathname === '/') return true;
    if (link.href === '/about' && (pathname === '/about' || pathname === '/about-us')) return true;
    if (link.href === '/services' && (pathname === '/services' || pathname === '/service')) return true;
    if (link.href === '/contact' && (pathname === '/contact' || pathname === '/contact-us')) return true;
    return false;
  };

  return (
    <header className="site-header">
      <div className="container-custom" style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        
        {/* Brand Logo with Compass Emblem */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', minWidth: 0, flexShrink: 1 }}>
          <BrandLogo size={48} showText={true} />
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '20px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`nav-link ${isLinkActive(link) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={() => onOpenBooking && onOpenBooking()}
            className="btn-primary-orange"
            style={{ padding: '8px 18px', fontSize: '0.8125rem' }}
          >
            BOOK NOW
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--slate-800)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--white)',
          borderBottom: '1px solid var(--slate-200)',
          padding: '16px 20px 24px 20px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: isLinkActive(link) ? 'var(--primary-orange)' : 'var(--slate-700)',
                  textDecoration: 'none',
                  padding: '6px 0',
                  borderBottom: '1px solid var(--slate-100)'
                }}
              >
                {link.name}
              </Link>
            ))}
            <div style={{ paddingTop: '8px' }}>
              <a 
                href="tel:9797948265"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--slate-800)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  marginBottom: '12px'
                }}
              >
                <Phone size={16} style={{ color: 'var(--primary-orange)' }} />
                <span>Call: 9797948265</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenBooking) onOpenBooking();
                }}
                className="btn-primary-orange"
                style={{ width: '100%' }}
              >
                BOOK YOUR RIDE
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
