"use client";

import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useContactInfo } from '../lib/useContactInfo';

export default function ContactInfoCard() {
  const contact = useContactInfo();

  const contactDetails = [
    {
      icon: Phone,
      label: "Phone Number",
      value: contact.phone,
      href: `tel:${contact.phone}`
    },
    {
      icon: Mail,
      label: "Email Address",
      value: contact.email,
      href: `mailto:${contact.email}`
    },
    {
      icon: MapPin,
      label: "Office Address",
      value: `${contact.addressLine1}, ${contact.addressLine2}`,
      href: contact.mapsUrl
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: "Mon - Sun : 8:00 AM - 8:00 PM",
      href: null
    }
  ];

  return (
    <div style={{
      background: '#0D1322',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
    }}>
      <div className="contact-info-list">
        {contactDetails.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className="contact-info-item">
              <div className="contact-info-item-icon">
                <IconComp size={18} />
              </div>
              <div>
                <span className="contact-info-label" style={{ color: '#94A3B8' }}>{item.label}</span>
                {item.href ? (
                  <p className="contact-info-value">
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FF9838')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    >
                      {item.value}
                    </a>
                  </p>
                ) : (
                  <p className="contact-info-value" style={{ color: '#E2E8F0', fontWeight: 600 }}>{item.value}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
