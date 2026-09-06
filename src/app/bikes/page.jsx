"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingModal from '../../components/BookingModal';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import MobileStickyBar from '../../components/MobileStickyBar';
import RentalFaq from '../../components/RentalFaq';
import BikeFleetList from '../../components/bikes/BikeFleetList';
import RidingGearSection from '../../components/bikes/RidingGearSection';
import RentalGuidelines from '../../components/bikes/RentalGuidelines';

export default function BikesPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);

  const handleOpenBooking = (bike = null) => {
    setSelectedBike(bike);
    setBookingModalOpen(true);
  };

  return (
    <main className="page-main-layout">
      
      {/* 1. Header & Navigation */}
      <TopBar onOpenBooking={() => handleOpenBooking(null)} />
      <Navbar onOpenBooking={() => handleOpenBooking(null)} />

      {/* 2. Inner Hero Section */}
      <section className="inner-hero">
        <div className="container-custom">
          <div className="inner-hero-badge">
            <Zap size={14} />
            <span>Showroom Maintained Royal Enfield Fleet</span>
          </div>
          <h1 className="inner-hero-title">Leh Ladakh Motorcycle Fleet</h1>
          <p className="inner-hero-desc">
            Explore Khardung La (17,982 ft), Chang La, and Pangong Lake with precision-tuned motorcycles. 
            Pre-equipped with carrier luggage racks, heavy-duty crash guards, and verified local Leh permits.
          </p>
          <div className="inner-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="active">Bike Fleet</span>
          </div>
        </div>
      </section>

      {/* 3. Filterable Bike Fleet Grid */}
      <BikeFleetList onOpenBooking={handleOpenBooking} />

      {/* 4. Riding Gear & Accessories Rental Checklist */}
      <RidingGearSection onOpenBooking={handleOpenBooking} />

      {/* 5. Rental Guidelines & Handover Terms */}
      <RentalGuidelines />

      {/* 6. FAQs */}
      <RentalFaq />

      {/* 7. Footer & Interactive Bottom Elements */}
      <Footer onOpenBooking={() => handleOpenBooking(null)} />
      <FloatingWhatsApp />
      <MobileStickyBar onOpenBooking={() => handleOpenBooking(null)} />

      {/* 8. Reservation Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialItem={selectedBike}
        initialType="bike"
      />

    </main>
  );
}
