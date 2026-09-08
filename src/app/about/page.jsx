"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mountain, ArrowRight } from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingModal from '../../components/BookingModal';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import MobileStickyBar from '../../components/MobileStickyBar';
import { useContactInfo } from '../../lib/useContactInfo';

// Dedicated Modular Subcomponents
import AboutStatsBanner from '../../components/about/AboutStatsBanner';
import AboutStoryNarrative from '../../components/about/AboutStoryNarrative';
import AboutWhyChoosePillars from '../../components/about/AboutWhyChoosePillars';
import AboutTestimonials from '../../components/about/AboutTestimonials';

export default function AboutPage() {
  const contact = useContactInfo();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleOpenBooking = () => {
    setBookingModalOpen(true);
  };

  return (
    <main className="page-main-layout">

      {/* Navigation Bars */}
      <TopBar onOpenBooking={handleOpenBooking} />
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Hero Header */}
      <section className="inner-hero">
        <div className="container-custom">
          <div className="inner-hero-badge">
            <Mountain size={14} />
            <span>Our Himalayan Journey</span>
          </div>
          <h1 className="inner-hero-title">About Biker King Adventure</h1>
          <p className="inner-hero-desc">
            Where Every Turn Is An Adventure. Premier Royal Enfield motorbike rentals, guided Himalayan expeditions, and trusted travel logistics in the heart of Leh Ladakh.
          </p>
          <div className="inner-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="active">About Us</span>
          </div>
        </div>
      </section>

      {/* 1. Stats Counter Banner */}
      <AboutStatsBanner />

      {/* 2. Founding Story Narrative & HQ Card */}
      <AboutStoryNarrative onOpenBooking={handleOpenBooking} />

      {/* 3. Why Choose Us — Four Core Pillars */}
      <AboutWhyChoosePillars />

      {/* 4. Rider Testimonials */}
      <AboutTestimonials />

      {/* 5. Bottom Call-To-Action Banner */}
      <section className="about-bottom-cta">
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <h2 className="about-cta-title">
            READY TO RIDE THE ROOF OF THE WORLD?
          </h2>
          <p className="about-cta-desc">
            Reserve your Royal Enfield, customized tour package, or 4x4 taxi with Leh Ladakh's leading adventure specialists today.
          </p>
          <div className="about-cta-buttons">
            <button onClick={handleOpenBooking} className="btn-primary-orange about-cta-btn">
              BOOK YOUR MOTORBIKE NOW
            </button>
            <a
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-white about-cta-btn"
            >
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* Footer & Global Overlays */}
      <Footer onOpenBooking={handleOpenBooking} />
      <FloatingWhatsApp />
      <MobileStickyBar onOpenBooking={handleOpenBooking} />

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
