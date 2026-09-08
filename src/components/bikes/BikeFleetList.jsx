"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Gauge,
  Fuel,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import VehicleDetailsModal from '../VehicleDetailsModal';
import { bikesData as staticBikesData } from '../../data/bikes';
import { supabase } from '../../lib/supabase';

function mapDbBike(row) {
  return {
    id: row.slug || row.id,
    name: row.name,
    specs: row.specs,
    engine: row.engine,
    power: row.power,
    groundClearance: row.ground_clearance,
    fuelCapacity: row.fuel_capacity,
    type: row.type,
    price: row.price,
    priceDisplay: row.price_display,
    image: row.image_url,
    badge: row.badge,
    description: row.description,
    features: Array.isArray(row.features) ? row.features : [],
  };
}

export default function BikeFleetList({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [bikesData, setBikesData] = useState(staticBikesData);
  const [detailsItem, setDetailsItem] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('bikes')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        if (!error && isMounted && Array.isArray(data) && data.length > 0) {
          setBikesData(data.map(mapDbBike));
        }
      } catch (err) {
        console.warn('Falling back to static bikes list:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const categories = [
    { id: 'all', label: 'All Fleet', count: bikesData.length },
    { id: 'Adventure', label: 'Adventure Tourers', count: bikesData.filter(b => b.type === 'Adventure' || b.type === 'Scrambler').length },
    { id: 'Cruiser', label: 'Cruisers & Classics', count: bikesData.filter(b => b.type === 'Cruiser' || b.type === 'Classic' || b.type === 'Roadster').length },
    { id: 'Scooter', label: 'Scooters', count: bikesData.filter(b => b.type === 'Scooter').length }
  ];

  const filteredBikes = bikesData.filter((bike) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'Adventure') return bike.type === 'Adventure' || bike.type === 'Scrambler';
    if (activeTab === 'Cruiser') return bike.type === 'Cruiser' || bike.type === 'Classic' || bike.type === 'Roadster';
    if (activeTab === 'Scooter') return bike.type === 'Scooter';
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <section className="container-custom" id="fleet-list" style={{ paddingTop: '32px', paddingBottom: '48px' }}>
      
      {/* Fleet Controls Bar */}
      <div className="fleet-controls-bar">
        
        {/* Category Tabs */}
        <div className="fleet-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`fleet-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
            >
              <span>{cat.label}</span>
              <span className="fleet-tab-count">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="fleet-sort-wrap">
          <SlidersHorizontal size={14} color="#64748B" />
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="fleet-sort-select"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Fleet Grid */}
      <div className="bikes-fleet-grid">
        {filteredBikes.map((bike) => {
          const allFeatures = bike.features && bike.features.length > 0
            ? bike.features
            : [
                bike.power || 'High Torque Engine',
                bike.groundClearance ? `Ground Clearance: ${bike.groundClearance}` : 'High Clearance Chassis',
                'High-Altitude Carb/FI Tuned'
              ];

          return (
            <div key={bike.id} className="bike-fleet-card">
              
              {/* Top Badge */}
              <div className="bike-card-badge-wrap">
                <span className="bike-card-badge">
                  <Sparkles size={11} />
                  <span>{bike.badge || 'Available'}</span>
                </span>
              </div>

              {/* Bike Image Container */}
              <div className="bike-card-image-wrap">
                <Image
                  src={bike.image}
                  alt={bike.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Card Body */}
              <div className="bike-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span className="bike-type-tag">{bike.type}</span>
                  <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 800 }}>Showroom Tuned</span>
                </div>

                <h3 className="bike-name">{bike.name}</h3>

                {/* Specs Chips */}
                <div className="bike-specs-row">
                  <div className="bike-spec-item">
                    <Gauge size={13} color="#EA580C" />
                    <span>{bike.specs || 'Himalayan Tourer'}</span>
                  </div>
                  <div className="bike-spec-item">
                    <Fuel size={13} color="#EA580C" />
                    <span>{bike.fuelCapacity ? `Tank ${bike.fuelCapacity}` : (bike.mileage || '15 L')}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="bike-features-list">
                  {allFeatures.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="bike-feat-point">
                      <CheckCircle2 size={12} color="#10B981" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* See Details Button (Opens Modal) */}
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
                    padding: '2px 0 10px 0',
                    alignSelf: 'flex-start',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap' }}>See Details</span>
                  <ArrowRight size={13} style={{ flexShrink: 0 }} />
                </button>

                {/* Price & Booking Bar */}
                <div className="bike-bottom-bar">
                  <div>
                    <span className="bike-price-label">Rental Rate</span>
                    <p className="bike-price-val">{bike.priceDisplay}</p>
                  </div>

                  <button
                    onClick={() => onOpenBooking(bike)}
                    className="btn-primary-orange"
                    style={{ padding: '9px 18px', fontSize: '0.825rem' }}
                  >
                    <span>Reserve Ride</span>
                    <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Vehicle Details Modal */}
      <VehicleDetailsModal
        item={detailsItem}
        type="bike"
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onBookItem={(item) => onOpenBooking(item)}
      />
    </section>
  );
}
