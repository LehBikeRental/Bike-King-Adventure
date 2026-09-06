"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, PhoneCall } from 'lucide-react';
import { SERVICE_OPTIONS } from '../../data/contact';
import { supabase } from '../../lib/supabase';

export default function ContactInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Motorbike Rental',
    travelDates: '',
    ridersCount: '1',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Try to record in Supabase inquiries if connection is available
    try {
      if (supabase) {
        await supabase.from('inquiries').insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            travel_dates: formData.travelDates,
            riders_count: formData.ridersCount,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);
      }
    } catch (err) {
      console.warn('Supabase inquiry record skipped:', err);
    }

    setLoading(false);
    setSubmitted(true);

    // 2. Dispatch structured WhatsApp message directly to Biker King
    const text = `*New Travel Inquiry - Biker King Adventure*%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Email:* ${encodeURIComponent(formData.email || 'N/A')}%0A` +
      `*Service Required:* ${encodeURIComponent(formData.service)}%0A` +
      `*Travel Dates:* ${encodeURIComponent(formData.travelDates || 'Flexible')}%0A` +
      `*Riders / Persons:* ${encodeURIComponent(formData.ridersCount)}%0A` +
      `*Message / Special Request:* ${encodeURIComponent(formData.message || 'None')}`;

    window.open(`https://wa.me/919797948265?text=${text}`, '_blank');
  };

  return (
    <div className="contact-form-container">
      {submitted ? (
        <div className="contact-success-box">
          <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A' }}>
            Inquiry Dispatched Successfully!
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#475569', marginTop: '8px', lineHeight: 1.6 }}>
            Thank you, <strong>{formData.name}</strong>! We have opened WhatsApp with your complete trip request. 
            Our Leh station manager is reviewing your dates and will confirm availability immediately.
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
            <a
              href="tel:+919797948265"
              className="btn-primary-orange"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', fontSize: '0.85rem' }}
            >
              <PhoneCall size={16} />
              <span>Call Desk Now</span>
            </a>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="btn-secondary-white"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              Send Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-interactive-form">
          
          <div style={{ marginBottom: '18px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--primary-orange)' }}>
              Fast Inquiry Dispatch
            </span>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>
              Send Us Your Travel Requirements
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#64748B', marginTop: '4px' }}>
              Get an instant quote and permit guidance directly on your phone.
            </p>
          </div>

          {/* Service Selector Chips */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              Service You Are Inquiring For
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SERVICE_OPTIONS.map((srv) => (
                <button
                  key={srv}
                  type="button"
                  onClick={() => setFormData({ ...formData, service: srv })}
                  className={`service-chip-btn ${formData.service === srv ? 'active' : ''}`}
                >
                  {srv}
                </button>
              ))}
            </div>
          </div>

          {/* Row 1: Name & Phone */}
          <div className="contact-inputs-grid-2">
            <div>
              <label className="form-field-label">Your Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-field-label">WhatsApp Mobile Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="form-input"
              />
            </div>
          </div>

          {/* Row 2: Email & Dates */}
          <div className="contact-inputs-grid-2">
            <div>
              <label className="form-field-label">Email Address (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-field-label">Expected Travel Dates</label>
              <input
                type="text"
                name="travelDates"
                value={formData.travelDates}
                onChange={handleChange}
                placeholder="e.g. 15 June - 22 June"
                className="form-input"
              />
            </div>
          </div>

          {/* Row 3: Riders Count */}
          <div style={{ marginBottom: '14px' }}>
            <label className="form-field-label">Number of Riders / Travelers</label>
            <select
              name="ridersCount"
              value={formData.ridersCount}
              onChange={handleChange}
              className="form-input"
            >
              <option value="1">1 Person / Solo Rider</option>
              <option value="2">2 Persons / Couple</option>
              <option value="3-5">Small Group (3 to 5 Riders)</option>
              <option value="6+">Large Expedition Group (6+ Members)</option>
            </select>
          </div>

          {/* Message / Custom Requirements */}
          <div style={{ marginBottom: '18px' }}>
            <label className="form-field-label">Any Specific Bike Model or Route Preference?</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Need 2 Himalayan 450s with luggage carriers for Nubra and Pangong circuit..."
              className="form-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="contact-submit-btn"
          >
            <Send size={16} />
            <span>{loading ? 'Processing...' : 'Send Inquiry via WhatsApp'}</span>
          </button>

          <p style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textAlign: 'center', marginTop: '10px' }}>
            🔒 No spam guaranteed. Your inquiry is directly sent to our local Leh office.
          </p>

        </form>
      )}
    </div>
  );
}
