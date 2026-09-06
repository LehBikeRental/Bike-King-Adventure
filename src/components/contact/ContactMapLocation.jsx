"use client";

import React from 'react';
import { MapPin, Navigation, Clock, ShieldCheck } from 'lucide-react';

export default function ContactMapLocation() {
  return (
    <section className="container-custom" style={{ paddingBottom: '60px' }}>
      <div className="card-white" style={{ padding: '28px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary-orange)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
              <MapPin size={15} />
              <span>Shop Location Guide</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0F172A' }}>
              Find Us in Leh Main Market
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Located right in the heart of Leh town, 10 minutes from Kushok Bakula Rimpochee Airport.
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=Malpax+Complex+Leh+Ladakh"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-orange"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.85rem', textDecoration: 'none' }}
          >
            <Navigation size={16} />
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Map Embed Frame */}
        <div style={{ width: '100%', height: '340px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0', position: 'relative' }}>
          <iframe
            title="Biker King Adventure Leh Ladakh Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13254.348128362619!2d77.5701!3d34.1526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38fdeb3d3e8e19b5%3A0x6b907db18aa050b!2sLeh%2C%20Ladakh!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Quick Tips Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#334155' }}>
            <Clock size={18} color="var(--primary-orange)" />
            <span><strong>Shop Timings:</strong> 7:00 AM – 10:00 PM (Daily)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#334155' }}>
            <ShieldCheck size={18} color="#10B981" />
            <span><strong>Airport Pickup:</strong> Available on request for rentals</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#334155' }}>
            <Navigation size={18} color="var(--primary-orange)" />
            <span><strong>Landmark:</strong> Near Leh Main Post Office & SBI</span>
          </div>
        </div>

      </div>
    </section>
  );
}
