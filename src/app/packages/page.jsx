"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass } from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingModal from '../../components/BookingModal';
import PackageModal from '../../components/PackageModal';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';
import MobileStickyBar from '../../components/MobileStickyBar';
import RentalFaq from '../../components/RentalFaq';
import PackagesHeroGlamping from '../../components/packages/PackagesHeroGlamping';
import PackagesList from '../../components/packages/PackagesList';
import CustomPackageCalculator from '../../components/packages/CustomPackageCalculator';
import InclusionsExclusionsBox from '../../components/packages/InclusionsExclusionsBox';
import AmsSafetyProtocol from '../../components/packages/AmsSafetyProtocol';

export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);

  const handleOpenPackageModal = (pkg) => {
    setSelectedPackage(pkg);
    setPackageModalOpen(true);
  };

  const handleBookPackage = (pkg) => {
    setSelectedBookingItem(pkg);
    setBookingModalOpen(true);
  };

  return (
    <main className="page-main-layout">
      
      {/* 1. Header & Navigation */}
      <TopBar onOpenBooking={() => handleBookPackage(null)} />
      <Navbar onOpenBooking={() => handleBookPackage(null)} />

      {/* 2. Inner Hero Section */}
      <section className="inner-hero">
        <div className="container-custom">
          <div className="inner-hero-badge">
            <Compass size={14} />
            <span>All-Inclusive Guided & Self-Ride Himalayan Expeditions</span>
          </div>
          <h1 className="inner-hero-title">Curated Ladakh Tour Packages</h1>
          <p className="inner-hero-desc">
            Carefully calibrated itineraries with stays in heated luxury Swiss dome camps, 
            certified Inner Line Permits, mechanic rescue vans, and high-altitude medical support.
          </p>
          <div className="inner-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="active">Tour Packages</span>
          </div>
        </div>
      </section>

      {/* 3. Expedition Glamping Spotlight Banner */}
      <PackagesHeroGlamping onOpenBooking={handleBookPackage} />

      {/* 4. Filterable Packages Grid */}
      <PackagesList 
        onSelectPackage={handleOpenPackageModal} 
        onBookPackage={handleBookPackage} 
      />

      {/* 5. Interactive Custom Tour Cost Calculator */}
      <CustomPackageCalculator onBookPackage={handleBookPackage} />

      {/* 6. Inclusions vs Exclusions Matrix */}
      <InclusionsExclusionsBox />

      {/* 7. High-Altitude AMS Safety Protocol */}
      <AmsSafetyProtocol />

      {/* 8. FAQs */}
      <RentalFaq />

      {/* 9. Footer & Interactive Bottom Elements */}
      <Footer onOpenBooking={() => handleBookPackage(null)} />
      <FloatingWhatsApp />
      <MobileStickyBar onOpenBooking={() => handleBookPackage(null)} />

      {/* 10. Modals */}
      <PackageModal
        pkg={selectedPackage}
        isOpen={packageModalOpen}
        onClose={() => setPackageModalOpen(false)}
        onBookPackage={(pkg) => handleBookPackage(pkg)}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialItem={selectedBookingItem}
        initialType="package"
      />

    </main>
  );
}
