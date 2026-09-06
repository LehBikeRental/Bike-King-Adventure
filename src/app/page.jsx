"use client";

import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import QuickServices from '../components/QuickServices';
import BikeAdvertisement from '../components/BikeAdvertisement';
import TourPackages from '../components/TourPackages';
import Reviews from '../components/Reviews';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import PackageModal from '../components/PackageModal';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import MobileStickyBar from '../components/MobileStickyBar';

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);
  const [bookingType, setBookingType] = useState('bike');

  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleOpenBooking = (item = null, type = 'bike') => {
    setSelectedBookingItem(item);
    setBookingType(type);
    setBookingModalOpen(true);
  };

  const handleOpenPackageModal = (pkg) => {
    setSelectedPackage(pkg);
    setPackageModalOpen(true);
  };

  const handleBookFromPackage = (pkg) => {
    setSelectedBookingItem(pkg);
    setBookingType('package');
    setBookingModalOpen(true);
  };

  return (
    <main className="page-main-layout">
      
      {/* 1. Top Announcement Bar */}
      <TopBar onOpenBooking={() => handleOpenBooking(null, 'bike')} />

      {/* 2. Main Sticky Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking(null, 'bike')} />

      {/* 3. Hero Section */}
      <Hero
        onOpenBooking={() => handleOpenBooking(null, 'bike')}
      />

      {/* 4. Floating Quick Services Bar */}
      <QuickServices />

      {/* 5. Featured Bike Rental Advertisement Banner */}
      <BikeAdvertisement
        onSelectBike={(bike) => handleOpenBooking(bike, 'bike')}
        onOpenBooking={() => handleOpenBooking(null, 'bike')}
      />

      {/* 6. Popular Tour Packages Showcase */}
      <TourPackages
        onSelectPackage={handleOpenPackageModal}
        onOpenAllPackages={() => handleOpenBooking(null, 'package')}
      />

      {/* 7. Verified Rider Reviews & Social Proof */}
      <section className="container-custom" style={{ paddingTop: '10px', paddingBottom: '32px' }}>
        <Reviews />
      </section>

      {/* 8. Full-Width Adventure Billboard CTA Banner */}
      <section className="container-custom" style={{ paddingBottom: '60px' }}>
        <CtaBanner onOpenBooking={() => handleOpenBooking(null, 'bike')} />
      </section>

      {/* 9. Footer */}
      <Footer onOpenBooking={() => handleOpenBooking(null, 'bike')} />

      {/* 10. Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* 11. Mobile Sticky Bottom Quick-Action Bar */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking(null, 'bike')} />

      {/* 12. Interactive Dynamic Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialItem={selectedBookingItem}
        initialType={bookingType}
      />

      {/* 13. Interactive Tour Package Details Modal */}
      <PackageModal
        pkg={selectedPackage}
        isOpen={packageModalOpen}
        onClose={() => setPackageModalOpen(false)}
        onBookPackage={handleBookFromPackage}
      />

    </main>
  );
}
