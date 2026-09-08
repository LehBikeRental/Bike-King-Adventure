"use client";

import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Navigation, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HANDOVER_CHECKLIST } from '../../data/contact';
import { useContactInfo } from '../../lib/useContactInfo';

export default function ContactChannelsGrid() {
  const contact = useContactInfo();

  const phoneChannel = {
    title: 'Direct Calling Numbers',
    primary: contact.phoneDisplay,
    primaryLabel: 'Primary Desk',
    backup: contact.phoneBackupDisplay,
    backupLabel: 'Backup Line',
    timing: 'Available 7:00 AM – 10:00 PM (Everyday)',
    action: `tel:${contact.phone}`,
  };
  const waChannel = {
    title: 'WhatsApp Instant Desk',
    chatText: `Chat on WhatsApp (${contact.phoneDisplay})`,
    responseSpeed: 'Average response time: Under 5 minutes',
    url: `https://wa.me/${contact.whatsappNumber}?text=Hi%20Biker%20King%20Adventure,%20I%20want%20to%20inquire%20about%20Leh%20rentals.`,
  };
  const locChannel = {
    title: 'Leh Ladakh Headquarters',
    addressLine1: contact.addressLine1,
    addressLine2: contact.addressLine2,
    landmark: `📍 Landmark: ${contact.landmark}`,
    directionsUrl: contact.mapsUrl,
  };

  return (
    <div className="contact-info-panel">
      
      {/* 1. Phone Calling Channel */}
      {phoneChannel && (
        <div className="contact-channel-card">
          <div className="contact-icon-wrapper">
            <Phone size={22} />
          </div>
          <div className="contact-channel-content">
            <h3 className="contact-channel-title">{phoneChannel.title}</h3>
            <div className="contact-phone-links">
              <a href={phoneChannel.action} className="contact-phone-primary">
                <span>{phoneChannel.primary}</span>
                <span className="contact-badge-orange">{phoneChannel.primaryLabel}</span>
              </a>
              {phoneChannel.backup && (
                <a href={`tel:${phoneChannel.backup.replace(/[^0-9]/g, '')}`} className="contact-phone-backup">
                  <span>{phoneChannel.backup}</span> <span className="contact-backup-label">({phoneChannel.backupLabel})</span>
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
          <div className="contact-icon-wrapper icon-wa">
            <MessageCircle size={22} />
          </div>
          <div className="contact-channel-content">
            <h3 className="contact-channel-title">{waChannel.title}</h3>
            <a 
              href={waChannel.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-wa-link"
            >
              <span>{waChannel.chatText}</span>
              <ExternalLink size={14} style={{ flexShrink: 0 }} />
            </a>
            <p className="contact-channel-sub">{waChannel.responseSpeed}</p>
          </div>
        </div>
      )}

      {/* 3. Email Desk */}
      <div className="contact-channel-card">
        <div className="contact-icon-wrapper icon-email">
          <Mail size={22} />
        </div>
        <div className="contact-channel-content">
          <h3 className="contact-channel-title">Email Us</h3>
          <a
            href={`mailto:${contact.email}`}
            className="contact-email-link"
          >
            {contact.email}
          </a>
          <p className="contact-channel-sub">We reply to every email within 24 hours.</p>
        </div>
      </div>

      {/* 4. Physical Office Headquarters */}
      {locChannel && (
        <div className="contact-channel-card">
          <div className="contact-icon-wrapper icon-location">
            <MapPin size={22} />
          </div>
          <div className="contact-channel-content">
            <h3 className="contact-channel-title">{locChannel.title}</h3>
            <p className="contact-address-text">
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
                <Navigation size={14} style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap' }}>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. Pre-Trip Handover Checklist Card */}
      <div className="pre-trip-box">
        <h4 className="pre-trip-title">
          <ShieldCheck size={18} color="var(--primary-orange)" style={{ flexShrink: 0 }} />
          <span>What to Bring for Bike Handover</span>
        </h4>
        <ul className="pre-trip-list">
          {HANDOVER_CHECKLIST.map((item, idx) => (
            <li key={idx} className="pre-trip-item">
              <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0 }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
