"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  HelpCircle, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingModal from '../../components/BookingModal';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

export default function ContactPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Motorbike Rental',
    travelDates: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "What documents are required to rent a motorcycle in Leh Ladakh?",
      a: "You need a valid original motorcycle driving license, a government ID proof (Aadhaar Card/Voter ID for Indians, Passport & Visa for foreign nationals), and a refundable security deposit."
    },
    {
      q: "Do you provide helmets and safety riding gear?",
      a: "Yes! High-quality ISI-approved helmets are included with every bike rental. Armored riding jackets, knee/elbow guards, waterproof gloves, and bungee cords are also available for hire."
    },
    {
      q: "Can you assist with Inner Line Permits (ILP)?",
      a: "Absolutely. We arrange official Inner Line Permits and Green Fees for protected areas including Khardung La, Nubra Valley, Pangong Tso, Hanle, and Umling La."
    },
    {
      q: "What if there is a puncture or mechanical trouble on the route?",
      a: "Every bike is supplied with a toolkit and puncture kit. For group riders and guided packages, our mechanic vehicle follows with full spare parts and oxygen cylinders."
    }
  ];

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      
      {/* 1. Top Bar */}
      <TopBar />

      {/* 2. Main Sticky Navigation */}
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* 3. Hero Section */}
      <section className="inner-hero">
        <div className="container-custom">
          <div className="inner-hero-badge">
            <MessageCircle size={14} />
            <span>24/7 Himalayan Assistance</span>
          </div>
          <h1 className="inner-hero-title">CONTACT US</h1>
          <p className="inner-hero-desc">
            Get in touch directly with our Leh Ladakh headquarters. Whether you need a Royal Enfield for a day, 
            a complete 10-day circuit package, or a local 4x4 taxi, our mountain experts are here to help.
          </p>
          <div className="inner-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="active">Contact Us</span>
          </div>
        </div>
      </section>

      {/* 4. Main Contact Grid */}
      <section className="container-custom" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="contact-page-grid">
          
          {/* Left Column: Direct Contact Info Channels */}
          <div className="contact-info-panel">
            
            {/* Phone Card */}
            <div className="contact-channel-card">
              <div className="contact-icon-wrapper">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="contact-channel-title">Direct Calling Numbers</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <a href="tel:9797948265" style={{ color: 'var(--slate-800)', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
                    +91 9797948265
                  </a>
                  <a href="tel:9419178265" style={{ color: 'var(--slate-800)', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
                    +91 9419178265
                  </a>
                </div>
                <p className="contact-channel-sub">Available 7:00 AM – 10:00 PM (Daily)</p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="contact-channel-card">
              <div className="contact-icon-wrapper" style={{ background: 'rgba(37, 211, 102, 0.1)', color: '#25D366' }}>
                <MessageCircle size={22} />
              </div>
              <div>
                <h3 className="contact-channel-title">WhatsApp Instant Support</h3>
                <p className="contact-channel-detail">
                  Fastest way to get bike photos, rates, and instant booking confirmations.
                </p>
                <a 
                  href="https://wa.me/919797948265"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    color: '#25D366', 
                    fontWeight: 700, 
                    fontSize: '0.875rem', 
                    textDecoration: 'none',
                    marginTop: '4px'
                  }}
                >
                  <span>Chat on WhatsApp: +91 9797948265</span>
                  &rarr;
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="contact-channel-card">
              <div className="contact-icon-wrapper">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="contact-channel-title">Email Inquiries</h3>
                <a href="mailto:zakisajjad9026@gmail.com" style={{ color: 'var(--slate-800)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                  zakisajjad9026@gmail.com
                </a>
                <p className="contact-channel-sub">For custom corporate & group expedition proposals</p>
              </div>
            </div>

            {/* Location Address */}
            <div className="contact-channel-card">
              <div className="contact-icon-wrapper">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="contact-channel-title">Leh Ladakh Headquarters & Garage</h3>
                <p className="contact-channel-detail">
                  Near Main Market / Fort Road, Leh Ladakh, UT Ladakh, 194101, India.
                </p>
                <p className="contact-channel-sub">Conveniently located 10 mins from Kushok Bakula Rimpochee Airport (IXL)</p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="contact-channel-card">
              <div className="contact-icon-wrapper">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="contact-channel-title">Operating Hours</h3>
                <p className="contact-channel-detail">
                  Monday &ndash; Sunday: 7:00 AM &ndash; 10:00 PM
                </p>
                <p className="contact-channel-sub">24/7 Emergency Support for all active expedition riders</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact / Inquiry Form */}
          <div className="contact-form-panel">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '8px' }}>
              SEND AN INQUIRY OR BOOKING REQUEST
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginBottom: '24px' }}>
              Fill in your adventure details and our Leh expedition team will respond within 2 hours with complete pricing and availability.
            </p>

            {submitted ? (
              <div style={{
                background: '#ecfdf5',
                border: '1px solid #10b981',
                borderRadius: '12px',
                padding: '32px 24px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#10b981',
                  color: 'var(--white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#065f46', marginBottom: '8px' }}>
                  Thank You, {formData.name || 'Rider'}!
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#047857', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
                  We have received your request for <strong>{formData.service}</strong>. Our team in Leh will reach out to you via WhatsApp / Phone shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-primary-orange"
                  style={{ fontSize: '0.8125rem', padding: '10px 24px' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 9876543210"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. rahul@example.com"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Interested Service</label>
                    <select
                      name="service"
                      className="form-input"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="Motorbike Rental">Motorbike Rental (Himalayan / Classic)</option>
                      <option value="Taxi Service">Taxi Service Leh Ladakh (4x4)</option>
                      <option value="Tour Package">Custom Tour Package</option>
                      <option value="Hotel / Camp Booking">Hotel & Swiss Camp Booking</option>
                      <option value="Snow Leopard Winter Expedition">Snow Leopard Winter Expedition</option>
                      <option value="Frozen Pangong Winter Ride">Frozen Pangong Winter Ride</option>
                      <option value="Riding Gear Rental">Riding Gear & Luggage Rental</option>
                      <option value="Inner Line Permits">Inner Line Permits & Passes</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Planned Travel Dates / Months</label>
                  <input
                    type="text"
                    name="travelDates"
                    placeholder="e.g. June 15 - June 22, 2026 (or approximate month)"
                    className="form-input"
                    value={formData.travelDates}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Specific Requirements</label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell us about your group size, preferred bikes (Himalayan 450, 411, etc.), route preferences, or any questions..."
                    className="form-input"
                    style={{ resize: 'vertical' }}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary-orange"
                  style={{
                    padding: '14px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 700
                  }}
                >
                  <Send size={18} />
                  <span>SUBMIT INQUIRY TO LEH DESK</span>
                </button>

                <p style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textAlign: 'center', margin: 0 }}>
                  We respect your privacy. No spam. You will be connected directly with an authentic local Leh tour specialist.
                </p>

              </form>
            )}

          </div>

        </div>

        {/* 5. Frequently Asked Questions */}
        <div style={{ marginTop: '50px' }}>
          <div className="section-badge-header">
            <h2 className="title-divider">FREQUENTLY ASKED QUESTIONS</h2>
          </div>
          <p style={{ color: 'var(--slate-600)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 24px auto', fontSize: '0.9rem' }}>
            Got queries regarding high-altitude riding permits, security deposits, or mechanical support? Here are the facts.
          </p>

          <div className="faq-grid">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-card">
                <h5>{faq.q}</h5>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 6. Footer */}
      <Footer onOpenBooking={() => setBookingModalOpen(true)} />

      {/* 7. Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* 8. Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialItem={null}
        initialType="bike"
      />

    </main>
  );
}
