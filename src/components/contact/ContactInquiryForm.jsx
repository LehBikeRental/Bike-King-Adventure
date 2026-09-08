"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, PhoneCall } from 'lucide-react';
import { SERVICE_OPTIONS } from '../../data/contact';
import { supabase } from '../../lib/supabase';
import { useContactInfo } from '../../lib/useContactInfo';

export default function ContactInquiryForm() {
  const contact = useContactInfo();
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

    // 1. Try to record the lead in Supabase if connection is available
    try {
      if (supabase) {
        await supabase.from('leads').insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            travel_dates: formData.travelDates,
            riders_count: formData.ridersCount,
            message: formData.message
          }
        ]);
      }
    } catch (err) {
      console.warn('Supabase lead record skipped:', err);
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="contact-form-container">
      {submitted ? (
        <div className="contact-success-box">
          <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 12px auto' }} />
          <h3 className="contact-success-title">
            Inquiry Dispatched Successfully!
          </h3>
          <p className="contact-success-desc">
            Thank you, <strong>{formData.name}</strong>! Your inquiry has been received by our Leh office.
            Our station manager is reviewing your dates and will reach out on WhatsApp or phone shortly.
          </p>

          <div className="contact-success-actions">
            <a
              href={`tel:+91${contact.phone}`}
              className="btn-primary-orange contact-success-btn"
            >
              <PhoneCall size={16} />
              <span>Call Desk Now</span>
            </a>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="btn-secondary-white contact-success-btn"
            >
              Send Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-interactive-form">
          
          <div className="contact-form-header">
            <span className="contact-form-badge">
              Fast Inquiry Dispatch
            </span>
            <h2 className="contact-form-title">
              Send Us Your Travel Requirements
            </h2>
            <p className="contact-form-subtitle">
              Get an instant quote and permit guidance directly on your phone.
            </p>
          </div>

          {/* Service Selector Chips */}
          <div className="contact-service-section">
            <label className="form-field-label">
              Service You Are Inquiring For
            </label>
            <div className="contact-service-chips">
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
          <div className="contact-field-group">
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
          <div className="contact-field-group">
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
            <span>{loading ? 'Processing...' : 'Send Inquiry'}</span>
          </button>

          <p className="contact-privacy-note">
            🔒 No spam guaranteed. Your inquiry is directly sent to our local Leh office.
          </p>

        </form>
      )}
    </div>
  );
}
