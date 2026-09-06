"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Fuel, Gauge, Shield, Zap, SlidersHorizontal, CheckCircle2, ArrowRight } from 'lucide-react';
import { bikesData } from '../data/bikes';

export default function BikeFleet({ onSelectBike, onOpenAllBikes }) {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', label: 'All Fleet', count: bikesData.length },
    { id: 'Adventure', label: 'Adventure Tourers', count: bikesData.filter(b => b.type === 'Adventure' || b.type === 'Scrambler').length },
    { id: 'Cruiser', label: 'Cruisers & Classics', count: bikesData.filter(b => b.type === 'Cruiser' || b.type === 'Classic' || b.type === 'Roadster').length },
    { id: 'Scooter', label: 'Scooters', count: bikesData.filter(b => b.type === 'Scooter').length }
  ];

  const filteredBikes = useMemo(() => {
    let result = bikesData.filter((bike) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'Adventure') return bike.type === 'Adventure' || bike.type === 'Scrambler';
      if (activeTab === 'Cruiser') return bike.type === 'Cruiser' || bike.type === 'Classic' || bike.type === 'Roadster';
      if (activeTab === 'Scooter') return bike.type === 'Scooter';
      return true;
    });

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeTab, sortBy]);

  return (
    <section className="container-custom" id="bikes" style={{ paddingTop: '52px', paddingBottom: '44px' }}>

      {/* Section Badge Header */}
      <div className="section-badge-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--primary-orange)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
          <Zap size={14} />
          <span>Showroom Maintained Fleet</span>
        </div>
        <h2 className="title-divider">
          PREMIUM MOTORCYCLE FLEET
        </h2>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', maxWidth: '600px', margin: '8px auto 0 auto', textAlign: 'center' }}>
          High-performance Royal Enfields pre-fitted with luggage carriers, crash guards, and puncture-resistant all-terrain tyres.
        </p>
      </div>

      {/* Interactive Controls Bar: Category Pills + Sort Dropdown */}
      <div className="fleet-controls-bar">
        
        {/* Category Pills */}
        <div className="fleet-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`fleet-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
            >
              <span>{cat.label}</span>
              <span className="fleet-tab-badge">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="fleet-sort-wrapper">
          <SlidersHorizontal size={15} className="fleet-sort-icon" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="fleet-sort-select"
            aria-label="Sort motorcycles"
          >
            <option value="featured">Featured / Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* 8 Bikes Dynamic Grid */}
      <div className="bikes-grid">
        {filteredBikes.map((bike) => (
          <div
            key={bike.id}
            className="bike-card"
            onClick={() => onSelectBike && onSelectBike(bike)}
          >
            {/* Top Badge */}
            {bike.badge && (
              <span className="bike-card-badge">{bike.badge}</span>
            )}

            {/* Bike Image Area */}
            <div className="bike-card-img-wrap">
              <Image
                src={bike.image}
                alt={bike.name}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Bike Details */}
            <div className="bike-card-details">
              
              <div className="bike-card-header">
                <h3 className="bike-card-title">{bike.name}</h3>
                <span className="bike-type-tag">{bike.type}</span>
              </div>

              {/* Spec Chips Row */}
              <div className="bike-specs-chips">
                <span className="spec-chip" title="Power Output">
                  <Zap size={12} className="spec-chip-icon" />
                  <span>{bike.power ? bike.power.split('@')[0].trim() : '20+ PS'}</span>
                </span>
                <span className="spec-chip" title="Fuel Tank Capacity">
                  <Fuel size={12} className="spec-chip-icon" />
                  <span>{bike.fuelCapacity || '15 L'}</span>
                </span>
                <span className="spec-chip" title="Ground Clearance">
                  <Gauge size={12} className="spec-chip-icon" />
                  <span>{bike.groundClearance || '200 mm'}</span>
                </span>
              </div>

              {/* Card Footer: Price & Prominent Action Button */}
              <div className="bike-card-footer">
                <div className="bike-card-price-col">
                  <span className="bike-price-label">Rental Rate</span>
                  <p className="bike-card-price">
                    <span className="bike-price-val">₹{bike.price.toLocaleString('en-IN')}</span>
                    <span className="bike-price-unit"> / Day</span>
                  </p>
                </div>
                
                <button
                  type="button"
                  className="btn-bike-book"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBike && onSelectBike(bike);
                  }}
                >
                  <span>Reserve</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Trust Guarantee Note */}
      <div className="fleet-trust-strip">
        <div className="trust-strip-item">
          <CheckCircle2 size={16} color="#10B981" />
          <span>Complimentary ISI Certified Helmet</span>
        </div>
        <div className="trust-strip-item">
          <CheckCircle2 size={16} color="#10B981" />
          <span>Heavy-Duty Luggage Carriers Fitted</span>
        </div>
        <div className="trust-strip-item">
          <CheckCircle2 size={16} color="#10B981" />
          <span>Instant Security Deposit Refund</span>
        </div>
        <div className="trust-strip-item">
          <CheckCircle2 size={16} color="#10B981" />
          <span>Pre-Assigned Inner Line Permits</span>
        </div>
      </div>

    </section>
  );
}