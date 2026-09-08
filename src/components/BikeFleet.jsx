"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Fuel, Gauge, Zap, SlidersHorizontal, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import VehicleDetailsModal from './VehicleDetailsModal';
import { bikesData } from '../data/bikes';

export default function BikeFleet({ onSelectBike, onOpenAllBikes }) {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [detailsItem, setDetailsItem] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

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
    <section className="bikes-fleet-section" id="fleet">
      
      {/* Section Header */}
      <div className="bikes-header-row">
        <div>
          <span className="section-badge-orange">RECOMMENDED VEHICLES</span>
          <h2 className="section-title-dark">Choose Your Ladakh Machine</h2>
        </div>

        <button
          className="btn-view-all-desktop"
          onClick={onOpenAllBikes}
        >
          <span>View All Models</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Filter & Sort Bar */}
      <div className="bikes-filter-bar">
        <div className="filter-pills-row">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`filter-pill-btn ${activeTab === cat.id ? 'active' : ''}`}
            >
              <span>{cat.label}</span>
              <span className="filter-pill-count">{cat.count}</span>
            </button>
          ))}
        </div>

        <div className="filter-sort-row">
          <SlidersHorizontal size={14} className="sort-icon" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-sort-select"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Bike Cards Grid */}
      <div className="bikes-grid">
        {filteredBikes.map((bike) => (
          <div
            key={bike.id}
            className="bike-card"
            onClick={() => {
              setDetailsItem(bike);
              setDetailsOpen(true);
            }}
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
                style={{ objectFit: 'cover' }}
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

              {/* See Details Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDetailsItem(bike);
                  setDetailsOpen(true);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#EA580C',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  margin: '8px 0',
                  padding: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                <Info size={13} style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap' }}>See Details</span>
              </button>

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

      {/* Vehicle Details Modal */}
      <VehicleDetailsModal
        item={detailsItem}
        type="bike"
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onBookItem={(item) => onSelectBike && onSelectBike(item)}
      />

    </section>
  );
}