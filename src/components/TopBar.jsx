"use client";

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container-custom">
        <div className="topbar-contact-wrap">
          <a href="tel:9797948265" className="topbar-item">
            <Phone size={14} style={{ color: 'var(--primary-orange)' }} />
            <span>9797948265</span>
          </a>
          <a href="mailto:bikerkingadventure98@gmail.com" className="topbar-item">
            <Mail size={14} style={{ color: 'var(--primary-orange)' }} />
            <span>bikerkingadventure98@gmail.com</span>
          </a>
          <div className="topbar-item">
            <MapPin size={14} style={{ color: 'var(--primary-orange)' }} />
            <span>Malpax complex, Leh, Ladakh 194101</span>
          </div>
        </div>
      </div>
    </div>
  );
}

