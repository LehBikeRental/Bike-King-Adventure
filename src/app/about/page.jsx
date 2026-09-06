"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mountain } from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingModal from '../../components/BookingModal';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import MobileStickyBar from '../../components/MobileStickyBar';
import WhyChooseUs from '../../components/WhyChooseUs';

// Dedicated Modular Subcomponents
import AboutStatsBanner from '../../components/about/AboutStatsBanner';
import AboutStoryNarrative from '../../components/about/AboutStoryNarrative';
import AboutMilestonesTimeline from '../../components/about/AboutMilestonesTimeline';
import AboutSafetyRules from '../../components/about/AboutSafetyRules';

export default function AboutPage() {
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
            <span>Born in Leh, Ladakh</span>
          </div>
          <h1 className="inner-hero-title">About Biker King Adventure</h1>
          <p className="inner-hero-desc">
            Where every turn is an adventure. Founded and operated by native Himalayan riders dedicated to delivering 
            unmatched motorcycle rentals, 4x4 expeditions, and 24/7 high-altitude safety.
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

      {/* 3. Why Choose Us Core Values */}
      <section className="container-custom" style={{ paddingBottom: '40px' }}>
        <WhyChooseUs />
      </section>

      {/* 4. Company Milestones Timeline */}
      <AboutMilestonesTimeline />

      {/* 5. High-Altitude Safety & Acclimatization Hub */}
      <AboutSafetyRules />

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
