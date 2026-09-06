"use client";

import React from 'react';
import { Phone, MessageCircle, MapPin, Navigation, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CONTACT_CHANNELS, HANDOVER_CHECKLIST } from '../../data/contact';

export default function ContactChannelsGrid() {
  const phoneChannel = CONTACT_CHANNELS.find(c => c.type === 'phone');
  const waChannel = CONTACT_CHANNELS.find(c => c.type === 'whatsapp');
  const locChannel = CONTACT_CHANNELS.find(c => c.type === 'location');

  return (
    <div className="contact-info-panel">
      
      {/* 1. Phone Calling Channel */}
      {phoneChannel && (
        <div className="contact-channel-card">
          <div className="contact-icon-wrapper">
            <Phone size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="contact-channel-title">{phoneChannel.title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
              <a href={phoneChannel.action} style={{ color: '#0F172A', fontWeight: 800, fontSize: '1rem', textDecoration: 'none' }}>
                {phoneChannel.primary} <span style={{ fontSize: '0.72rem', color: '#FF9838', background: 'rgba(255, 101, 0, 0.15)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>{phoneChannel.primaryLabel}</span>
              </a>
              {phoneChannel.backup && (
                <a href={`tel:${phoneChannel.backup.replace(/[^0-9]/g, '')}`} style={{ color: '#475569', fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none' }}>
                  {phoneChannel.backup} <span style={{ fontSize: '0.72rem', color: '#64748B' }}>({phoneChannel.backupLabel})</span>
                </a>
              )}
            </div>
            <p className="contact-channel-sub">{phoneChannel.timing}</p>
          </div>
        </div>
      )}

      {/* 2. WhatsApp Instant Desk */}
      {waChannel && (
        <div className="contact-channel-card">
          <div className="contact-icon-wrapper" style={{ background: 'rgba(37, 211, 102, 0.1)', color: '#25D366' }}>
            <MessageCircle size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="contact-channel-title">{waChannel.title}</h3>
            <a 
              href={waChannel.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#25D366', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}
            >
              <span>{waChannel.chatText}</span>
              <ExternalLink size={14} />
            </a>
            <p className="contact-channel-sub">{waChannel.responseSpeed}</p>
          </div>
        </div>
      )}

      {/* 3. Physical Office Headquarters */}
      {locChannel && (
        <div className="contact-channel-card">
          <div className="contact-icon-wrapper" style={{ background: 'rgba(234, 88, 12, 0.1)', color: 'var(--primary-orange)' }}>
            <MapPin size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="contact-channel-title">{locChannel.title}</h3>
            <p style={{ color: '#1E293B', fontWeight: 700, fontSize: '0.92rem', marginTop: '4px', lineHeight: 1.5 }}>
              {locChannel.addressLine1},<br />
              {locChannel.addressLine2}
            </p>
            <p className="contact-channel-sub" style={{ marginTop: '6px' }}>
              {locChannel.landmark}
            </p>

            <div style={{ marginTop: '12px' }}>
              <a
                href={locChannel.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="google-directions-btn"
              >
                <Navigation size={14} />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 4. Pre-Trip Handover Checklist Card */}
      <div className="pre-trip-box">
        <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={18} color="var(--primary-orange)" />
          <span>What to Bring for Bike Handover</span>
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {HANDOVER_CHECKLIST.map((item, idx) => (
            <li key={idx} style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} color="#10B981" /> {item}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
