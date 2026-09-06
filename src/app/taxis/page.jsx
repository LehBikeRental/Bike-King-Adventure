"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Car } from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingModal from '../../components/BookingModal';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import MobileStickyBar from '../../components/MobileStickyBar';
import RentalFaq from '../../components/RentalFaq';
import TaxiRouteEstimator from '../../components/taxis/TaxiRouteEstimator';
import TaxiFleetList from '../../components/taxis/TaxiFleetList';
import TaxiDriverTrust from '../../components/taxis/TaxiDriverTrust';

export default function TaxisPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenBooking = (vehicle = null) => {
    setSelectedItem(vehicle ? { name: vehicle.name, price: vehicle.startingRate } : null);
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
            <Car size={14} />
            <span>Official Leh Ladakh Taxi Union Approved Fleet</span>
          </div>
          <h1 className="inner-hero-title">4x4 Mountain Taxi & Cab Services</h1>
          <p className="inner-hero-desc">
            Comfortable, climate-controlled Toyota Innova Crysta, Scorpio 4x4, and Tempo Travelers. 
            Driven by native Ladakhi drivers with decades of snow and high-altitude pass navigation experience.
          </p>
          <div className="inner-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="active">4x4 Taxis</span>
          </div>
        </div>
      </section>

      {/* 3. Interactive Route & Fare Estimator */}
      <TaxiRouteEstimator onOpenBooking={handleOpenBooking} />

      {/* 4. 4x4 Vehicle Fleet Cards */}
      <TaxiFleetList onOpenBooking={handleOpenBooking} />

      {/* 5. Driver Trust & Safety Badges */}
      <TaxiDriverTrust />

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
        initialItem={selectedItem}
        initialType="service"
      />

    </main>
  );
}
