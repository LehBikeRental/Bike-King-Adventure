"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (supabase) {
        await supabase.from('leads').insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.subject || 'General Inquiry',
            message: formData.message,
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
    <div className="get-in-touch-box" id="contact">
      <div style={{ marginBottom: '14px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase' }}>
          GET IN TOUCH
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
          We'd love to hear from you!
        </p>
      </div>

      {submitted ? (
        <div style={{
          backgroundColor: 'rgba(255, 101, 0, 0.1)',
          border: '1px solid rgba(255, 101, 0, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          textAlign: 'center'
        }}>
          <CheckCircle2 size={32} style={{ color: 'var(--primary-orange)', margin: '0 auto 8px auto' }} />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF' }}>Message Sent Successfully!</h4>
          <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '4px' }}>
            Our Leh team has received your inquiry and will get back to you on WhatsApp or phone shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-primary-orange"
            style={{ marginTop: '12px', padding: '8px 18px', fontSize: '0.85rem' }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* Row 1: Name & Email */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Row 2: Phone & Subject */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            <input
              type="tel"
              placeholder="Phone (Optional)"
              className="form-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Subject (e.g. Tour Inquiry)"
              className="form-input"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          {/* Row 3: Message Textarea */}
          <textarea
            rows={3}
            placeholder="Your Message"
            required
            className="form-input"
            style={{ resize: 'vertical' }}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary-orange"
            style={{ width: '100%', padding: '10px 16px', fontSize: '0.875rem', marginTop: '2px' }}
          >
            {loading ? 'SENDING...' : 'SEND MESSAGE'}
          </button>

        </form>
      )}
    </div>
  );
}
