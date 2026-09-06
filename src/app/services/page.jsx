"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass } from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingModal from '../../components/BookingModal';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import MobileStickyBar from '../../components/MobileStickyBar';
import RentalFaq from '../../components/RentalFaq';
import ServicesPortalGrid from '../../components/services/ServicesPortalGrid';
import ServicesDirectoryList from '../../components/services/ServicesDirectoryList';
import ExpeditionChecklist from '../../components/services/ExpeditionChecklist';

export default function ServicesPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingType, setBookingType] = useState('service');

  const handleOpenBooking = (service = null, type = 'service') => {
    setSelectedService(service);
    setBookingType(type);
    setBookingModalOpen(true);
  };

  return (
    <main className="page-main-layout">
      
      {/* 1. Header & Navigation */}
      <TopBar onOpenBooking={() => handleOpenBooking(null, 'service')} />
      <Navbar onOpenBooking={() => handleOpenBooking(null, 'service')} />

      {/* 2. Inner Hero Section */}
      <section className="inner-hero">
        <div className="container-custom">
          <div className="inner-hero-badge">
            <Compass size={14} />
            <span>Official Leh Ladakh Adventure Directory</span>
          </div>
          <h1 className="inner-hero-title">Our Adventure Services</h1>
          <p className="inner-hero-desc">
            Complete high-altitude expedition infrastructure: Royal Enfield fleet hire, 4x4 mountain cabs, 
            guided tour departures, Swiss lakeside camps, riding apparel, and certified Ladakh Inner Line Permits.
          </p>
          <div className="inner-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="active">Services</span>
          </div>
        </div>
      </section>

      {/* 3. Core Adventure Portals (Bikes, Taxis, Packages) */}
      <ServicesPortalGrid />

      {/* 4. Complete Adventure Services Directory */}
      <ServicesDirectoryList onOpenBooking={handleOpenBooking} />

      {/* 5. Pre-Trip Expedition Checklist */}
      <ExpeditionChecklist />

      {/* 6. FAQs */}
      <RentalFaq />

      {/* 7. Footer & Interactive Bottom Elements */}
      <Footer onOpenBooking={() => handleOpenBooking(null, 'service')} />
      <FloatingWhatsApp />
      <MobileStickyBar onOpenBooking={() => handleOpenBooking(null, 'service')} />

      {/* 8. Reservation Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialItem={selectedService}
        initialType={bookingType}
      />

    </main>
  );
}
