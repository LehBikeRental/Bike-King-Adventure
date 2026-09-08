"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingModal from '../../components/BookingModal';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import MobileStickyBar from '../../components/MobileStickyBar';

// Dedicated Modular Subcomponents
import ContactChannelsGrid from '../../components/contact/ContactChannelsGrid';
import ContactInquiryForm from '../../components/contact/ContactInquiryForm';
import ContactMapLocation from '../../components/contact/ContactMapLocation';

export default function ContactPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <main className="page-main-layout">
      
      {/* Navigation Bars */}
      <TopBar onOpenBooking={() => setBookingModalOpen(true)} />
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Section */}
      <section className="inner-hero">
        <div className="container-custom">
          <div className="inner-hero-badge">
            <MessageCircle size={14} style={{ flexShrink: 0 }} />
            <span style={{ whiteSpace: 'nowrap' }}>24/7 Local Leh Ladakh Support</span>
          </div>
          <h1 className="inner-hero-title">Connect With Our Leh Desk</h1>
          <p className="inner-hero-desc">
            Direct coordination with our Malpax Complex headquarters. Whether you need a Himalayan 450 for a solo Khardung La ride, 
            a 4x4 Innova for Pangong, or urgent road assistance &mdash; our local team is standing by.
          </p>
          <div className="inner-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="active">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Main Channels & Interactive Inquiry Grid */}
      <section className="container-custom contact-main-section">
        <div className="contact-page-grid">
          {/* Left Column: Direct Communication Channels & Pre-Trip Checklist */}
          <ContactChannelsGrid />

          {/* Right Column: Interactive Dispatch Form */}
          <ContactInquiryForm />
        </div>
      </section>

      {/* Map & Location Guide */}
      <ContactMapLocation />

      {/* Global Overlays & Footer */}
      <Footer onOpenBooking={() => setBookingModalOpen(true)} />
      <FloatingWhatsApp />
      <MobileStickyBar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialItem={null}
        initialType="bike"
      />

    </main>
  );
}
