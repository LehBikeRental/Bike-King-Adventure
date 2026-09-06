"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Construct WhatsApp message URL
    const text = `*New Inquiry from Biker King Website*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Subject:* ${encodeURIComponent(formData.subject || 'Trip Inquiry')}%0A*Message:* ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/919797948265?text=${text}`, '_blank');
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
            Our Leh team is reviewing your inquiry. We have also opened WhatsApp to assist you immediately.
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
            className="btn-primary-orange"
            style={{ width: '100%', padding: '10px 16px', fontSize: '0.875rem', marginTop: '2px' }}
          >
            SEND MESSAGE
          </button>

        </form>
      )}
    </div>
  );
}
