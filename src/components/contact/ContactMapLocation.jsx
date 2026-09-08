"use client";

import React from 'react';
import { MapPin, Navigation, Clock, ShieldCheck } from 'lucide-react';
import { useContactInfo } from '../../lib/useContactInfo';

export default function ContactMapLocation() {
  const contact = useContactInfo();

  return (
    <section className="container-custom contact-map-section">
      <div className="card-white contact-map-card">
        <div className="contact-map-header">
          <div>
            <div className="contact-map-badge">
              <MapPin size={15} />
              <span>Shop Location Guide</span>
            </div>
            <h3 className="contact-map-title">
              Find Us in Leh Main Market
            </h3>
            <p className="contact-map-desc">
              Located right in the heart of Leh town, 10 minutes from Kushok Bakula Rimpochee Airport.
            </p>
          </div>

          <a
            href={contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-orange contact-map-directions-btn"
          >
            <Navigation size={16} style={{ flexShrink: 0 }} />
            <span style={{ whiteSpace: 'nowrap' }}>Open in Google Maps</span>
          </a>
        </div>

        {/* Map Embed Frame */}
        <div className="contact-map-frame">
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
        <div className="contact-map-tips">
          <div className="contact-map-tip-item">
            <Clock size={18} color="var(--primary-orange)" style={{ flexShrink: 0 }} />
            <span><strong>Shop Timings:</strong> 7:00 AM – 10:00 PM (Daily)</span>
          </div>
          <div className="contact-map-tip-item">
            <ShieldCheck size={18} color="#10B981" style={{ flexShrink: 0 }} />
            <span><strong>Airport Pickup:</strong> Available on request for rentals</span>
          </div>
          <div className="contact-map-tip-item">
            <Navigation size={18} color="var(--primary-orange)" style={{ flexShrink: 0 }} />
            <span><strong>Landmark:</strong> {contact.landmark}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
