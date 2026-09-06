"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowRight, Shield } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'BIKE FLEET', href: '/bikes' },
    { name: '4X4 TAXIS', href: '/taxis' },
    { name: 'PACKAGES', href: '/packages' },
    { name: 'SERVICES', href: '/services' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const isLinkActive = (link) => {
    if (link.href === '/' && pathname === '/') return true;
    if (link.href === '/bikes' && pathname.startsWith('/bikes')) return true;
    if (link.href === '/taxis' && pathname.startsWith('/taxis')) return true;
    if (link.href === '/packages' && pathname.startsWith('/packages')) return true;
    if (link.href === '/services' && pathname.startsWith('/services')) return true;
    if (link.href === '/about' && pathname.startsWith('/about')) return true;
    if (link.href === '/contact' && pathname.startsWith('/contact')) return true;
    return false;
  };

  return (
    <header className="site-header">
      <div className="container-custom header-inner">
        
        {/* Brand Logo with Compass Emblem */}
        <Link href="/" className="header-logo-link">
          <BrandLogo size={44} showText={true} isLight={true} />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
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

        {/* Right Action Buttons */}
        <div className="header-actions">
          <a href="tel:9797948265" className="header-phone-link">
            <Phone size={14} className="phone-icon-pulse" />
            <span className="phone-number-text">9797948265</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenBooking && onOpenBooking()}
            className="btn-primary-orange header-book-btn"
          >
            <span>BOOK NOW</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay">
          <div className="mobile-drawer-container">
            <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${isLinkActive(link) ? 'active' : ''}`}
                >
                  <span>{link.name}</span>
                  <ArrowRight size={14} opacity={0.6} />
                </Link>
              ))}
            </nav>

            <div className="mobile-drawer-footer">
              <a href="tel:9797948265" className="mobile-drawer-call">
                <Phone size={16} color="#FF6500" />
                <span>Call Local Desk: 9797948265</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenBooking) onOpenBooking();
                }}
                className="btn-primary-orange"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              >
                <span>RESERVE MOTORCYCLE / TOUR</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
