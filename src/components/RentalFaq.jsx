"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, PhoneCall, MessageCircle } from 'lucide-react';
import { rentalFaqsData } from '../data/faqs';
import { useContactInfo } from '../lib/useContactInfo';

export default function RentalFaq() {
  const contact = useContactInfo();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="container-custom" id="faq" style={{ paddingTop: '40px', paddingBottom: '50px' }}>
      
      {/* Header */}
      <div className="section-badge-header" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--primary-orange)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
          <HelpCircle size={15} />
          <span>Clear & Transparent Guidelines</span>
        </div>
        <h2 className="title-divider" style={{ fontSize: '1.75rem', fontWeight: 900 }}>
          LEH LADAKH RENTAL FAQS & RULES
        </h2>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', maxWidth: '640px', margin: '8px auto 0 auto', textAlign: 'center' }}>
          Everything you need to know about driving licenses, permits, deposits, and emergency high-altitude road support.
        </p>
      </div>

      <div className="faq-layout-grid">
        
        {/* Left Side: Accordion Items */}
        <div className="faq-accordion-list">
          {rentalFaqsData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={faq.id} 
                className={`faq-card-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <div className={`faq-chevron ${isOpen ? 'rotate' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Quick Assistance Card */}
        <div className="faq-sidebar-box">
          <div className="faq-support-card">
            <div className="faq-support-badge">
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginTop: '12px' }}>
              Have Custom Questions?
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '8px', lineHeight: 1.6 }}>
              Planning a group expedition or customized circuit across Zanskar, Nubra, or Hanle? Our Leh station manager will help you plan your itinerary.
            </p>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={`https://wa.me/${contact.whatsappNumber}?text=Hi%20Biker%20King%20Adventure,%20I%20have%20a%20question%20about%20bike%20rentals%20in%20Leh.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-orange"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  padding: '12px 18px',
                  fontSize: '0.875rem'
                }}
              >
                <MessageCircle size={17} />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:+91${contact.phone}`}
                className="btn-outline-dark"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  padding: '11px 18px',
                  fontSize: '0.875rem'
                }}
              >
                <PhoneCall size={16} />
                <span>Call {contact.phoneDisplay}</span>
              </a>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--slate-200)', textAlign: 'left' }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)', lineHeight: 1.5 }}>
                📍 <strong>Local Office:</strong> {contact.addressLine1}<br />
                ⏰ <strong>Timings:</strong> Mon - Sun: 7:00 AM - 10:00 PM
              </p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
