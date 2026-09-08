"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, Users, Luggage, CheckCircle2, ArrowRight, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import VehicleDetailsModal from '../VehicleDetailsModal';
import { taxiFleet as staticTaxiFleet } from '../../data/taxis';
import { supabase } from '../../lib/supabase';

function mapDbVehicle(row) {
  return {
    id: row.slug || row.id,
    name: row.name,
    badge: row.badge,
    image: row.image_url,
    seats: row.seats,
    luggage: row.luggage,
    features: Array.isArray(row.features) ? row.features : [],
    idealFor: row.ideal_for,
    startingRate: row.starting_rate,
    type: row.vehicle_type,
    description: row.description || `High-performance ${row.name || 'mountain vehicle'} configured specifically for Leh Ladakh's high-altitude mountain passes and rugged off-road terrain.`,
  };
}

export default function TaxiFleetList({ onOpenBooking, onSelectVehicle }) {
  const [taxiFleet, setTaxiFleet] = useState(staticTaxiFleet);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [detailsItem, setDetailsItem] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('taxi_vehicles')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        if (!error && isMounted && Array.isArray(data) && data.length > 0) {
          setTaxiFleet(data.map(mapDbVehicle));
        }
      } catch (err) {
        console.warn('Falling back to static taxi fleet:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  // Extract unique vehicle types dynamically from database/static fleet
  const uniqueTypes = Array.from(
    new Set(
      taxiFleet
        .map((v) => v.type)
        .filter(Boolean)
    )
  );

  const categories = [
    { id: 'all', label: 'All 4x4 Fleet', count: taxiFleet.length },
    ...uniqueTypes.map((type) => {
      const label = type.charAt(0).toUpperCase() + type.slice(1);
      const count = taxiFleet.filter((v) => v.type && v.type.toLowerCase() === type.toLowerCase()).length;
      return {
        id: type.toLowerCase(),
        label,
        count,
      };
    }),
  ];

  const parsePriceNum = (rateStr) => {
    if (!rateStr) return 0;
    const num = rateStr.replace(/[^0-9]/g, '');
    return parseInt(num, 10) || 0;
  };

  const filteredFleet = taxiFleet
    .filter((v) => {
      if (activeTab === 'all') return true;
      return v.type && v.type.toLowerCase() === activeTab.toLowerCase();
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return parsePriceNum(a.startingRate) - parsePriceNum(b.startingRate);
      if (sortBy === 'price-high') return parsePriceNum(b.startingRate) - parsePriceNum(a.startingRate);
      return 0;
    });

  return (
    <section className="container-custom" id="fleet" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--primary-orange)', padding: '4px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
          <Sparkles size={14} />
          <span>Leh Union Approved Fleet</span>
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0F172A' }}>
          Explore Our 4x4 Mountain Fleet
        </h2>
        <p style={{ color: '#475569', fontSize: '0.9rem', maxWidth: '600px', margin: '6px auto 0 auto' }}>
          Certified all-terrain vehicles equipped with emergency oxygen, snow chains, and high ground clearance.
        </p>
      </div>

      {/* Fleet Controls Bar (Category Filters & Sorting) */}
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
      <div className="taxi-fleet-grid">
        {filteredFleet.map((v) => {
          const allFeatures = Array.isArray(v.features) ? v.features : [];

          return (
            <div key={v.id} className="taxi-vehicle-card">
              
              {/* Top Badge & Image */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
                <span className="taxi-badge-pill">
                  <Sparkles size={11} />
                  <span>{v.badge}</span>
                </span>
              </div>

              {/* Content */}
              <div className="taxi-card-content">
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '8px' }}>
                  {v.name}
                </h3>

                {/* Specs Pills */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <span className="taxi-spec-pill">
                    <Users size={13} color="#EA580C" />
                    <span>{v.seats}</span>
                  </span>
                  <span className="taxi-spec-pill">
                    <Luggage size={13} color="#EA580C" />
                    <span>{v.luggage}</span>
                  </span>
                </div>

                {/* Features List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  {allFeatures.slice(0, 3).map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#334155' }}>
                      <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* See Details Button (Opens Modal) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDetailsItem(v);
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
                    padding: '4px 0',
                    marginBottom: '12px',
                    alignSelf: 'flex-start',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap' }}>See Details</span>
                  <ArrowRight size={13} style={{ flexShrink: 0 }} />
                </button>

                {/* Action Bar */}
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Starting From</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: 900, color: '#EA580C' }}>{v.startingRate}</p>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectVehicle) onSelectVehicle(v.type);
                      onOpenBooking(v);
                    }}
                    className="btn-primary-orange"
                    style={{ padding: '9px 18px', fontSize: '0.825rem' }}
                  >
                    <span>Book Taxi</span>
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
        type="taxi"
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onBookItem={(item) => {
          if (onSelectVehicle) onSelectVehicle(item.type);
          onOpenBooking(item);
        }}
      />
    </section>
  );
}
