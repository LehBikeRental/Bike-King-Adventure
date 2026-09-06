"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Bike, 
  Compass, 
  Headphones, 
  Calendar, 
  Search, 
  Star, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { bikesData } from '../data/bikes';

export default function Hero({ onOpenBooking, onScrollToContact }) {
  const [selectedBikeId, setSelectedBikeId] = useState(bikesData[0].id);
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');

  const badges = [
    { label: "Best Price Guarantee", icon: ShieldCheck },
    { label: "Well Maintained Fleet", icon: Bike },
    { label: "Expert Local Guides", icon: Compass },
    { label: "24/7 Road Assistance", icon: Headphones },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const foundBike = bikesData.find((b) => b.id === selectedBikeId) || bikesData[0];
    if (onOpenBooking) {
      onOpenBooking(foundBike, 'bike');
    }
  };

  return (
    <section className="hero-section">
      {/* Background Image with optimized priority */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Image
          src="/images/hero-pangong.webp"
          alt="Biker King Leh Ladakh Pangong Lake Adventure"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
        />
      </div>

      {/* Cinematic Dark Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Hero Content */}
      <div className="container-custom" style={{ width: '100%', position: 'relative', zIndex: 3 }}>
        <div className="hero-content">
          
          {/* Top Trust Ribbon */}
          <div className="hero-trust-ribbon">
            <div className="trust-ribbon-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <span><strong>4.9/5 Rated</strong> • 5,000+ Happy Riders Across Khardung La & Pangong</span>
          </div>

          <h1 className="hero-title-main">
            Where Every Turn
            <span className="hero-title-orange">Is An Adventure</span>
          </h1>

          <p className="hero-subtitle">
            Experience Leh Ladakh with showroom-conditioned Royal Enfields, 24/7 high-altitude backup, and verified Inner Line Permits.
          </p>

          {/* 4 Feature Badges */}
          <div className="hero-badges-grid">
            {badges.map((badge, idx) => {
              const IconComp = badge.icon;
              return (
                <div key={idx} className="hero-badge-item">
                  <div className="hero-badge-icon">
                    <IconComp size={15} />
                  </div>
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>

          {/* Interactive Fast Availability Search Bar */}
          <div className="hero-search-wrapper">
            <form onSubmit={handleSearchSubmit} className="hero-search-form">
              
              {/* Field 1: Choose Motorcycle */}
              <div className="hero-search-field">
                <label className="hero-search-label">
                  <Bike size={14} className="hero-search-icon-label" />
                  <span>Select Motorcycle</span>
                </label>
                <select
                  value={selectedBikeId}
                  onChange={(e) => setSelectedBikeId(e.target.value)}
                  className="hero-search-select"
                >
                  {bikesData.map((bike) => (
                    <option key={bike.id} value={bike.id}>
                      {bike.name} ({bike.priceDisplay})
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 2: Pick-up Date */}
              <div className="hero-search-field">
                <label className="hero-search-label">
                  <Calendar size={14} className="hero-search-icon-label" />
                  <span>Pick-Up Date</span>
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="hero-search-input"
                  placeholder="Select Date"
                />
              </div>

              {/* Field 3: Drop-Off Date */}
              <div className="hero-search-field">
                <label className="hero-search-label">
                  <Calendar size={14} className="hero-search-icon-label" />
                  <span>Drop-Off Date</span>
                </label>
                <input
                  type="date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className="hero-search-input"
                  placeholder="Select Date"
                />
              </div>

              {/* Field 4: Search & Book CTA Button */}
              <div className="hero-search-action">
                <button type="submit" className="hero-search-btn">
                  <Search size={16} />
                  <span>Check Availability</span>
                </button>
              </div>

            </form>
          </div>

          {/* Quick Action Links */}
          <div className="hero-actions-row">
            <button
              onClick={() => onOpenBooking && onOpenBooking(null, 'bike')}
              className="btn-primary-orange"
            >
              EXPLORE ALL FLEET
            </button>
            <Link
              href="/services"
              className="btn-ghost-white"
            >
              TAXI & TOUR PACKAGES
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
