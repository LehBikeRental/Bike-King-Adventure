"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Utensils,
  Building2,
  Bike,
  FileCheck,
  Eye
} from 'lucide-react';
import { packagesData as staticPackagesData } from '../../data/packages';
import { supabase } from '../../lib/supabase';

function mapDbPackage(row) {
  return {
    id: row.slug || row.id,
    title: row.title,
    duration: row.duration,
    daysCount: row.days_count,
    route: row.route,
    price: row.price,
    priceDisplay: row.price_display,
    image: row.image_url,
    category: row.category,
    inclusions: Array.isArray(row.inclusions) ? row.inclusions : [],
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    itinerary: Array.isArray(row.itinerary) ? row.itinerary : [],
  };
}

export default function PackagesList({ onSelectPackage, onBookPackage }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [packagesData, setPackagesData] = useState(staticPackagesData);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        if (!error && isMounted && Array.isArray(data) && data.length > 0) {
          setPackagesData(data.map(mapDbPackage));
        }
      } catch (err) {
        console.warn('Falling back to static packages list:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const isBikeTour = (pkg) => pkg.daysCount >= 7 || pkg.id === 'ladakh-bike-expedition';
  const isWinterTour = (pkg) => pkg.id === 'winter-snow-leopard-expedition';
  const isFamilyTour = (pkg) => pkg.daysCount <= 6 && !isWinterTour(pkg);

  const categories = [
    { id: 'all', label: 'All Expeditions', count: packagesData.length },
    { id: 'bike', label: 'Motorcycle Tours (7-8D)', count: packagesData.filter(isBikeTour).length },
    { id: 'family', label: 'Family & 4x4 Cabs (5-6D)', count: packagesData.filter(isFamilyTour).length },
    { id: 'winter', label: 'Winter Snow Leopard', count: packagesData.filter(isWinterTour).length },
  ];

  const getAmenityIcon = (name) => {
    switch (name) {
      case 'Meals':
        return <Utensils size={14} color="#EA580C" />;
      case 'Hotel':
        return <Building2 size={14} color="#0284C7" />;
      case 'Sightseeing':
        return <Bike size={14} color="#10B981" />;
      case 'Permit':
        return <FileCheck size={14} color="#7C3AED" />;
      default:
        return <FileCheck size={14} color="#EA580C" />;
    }
  };

  const getPackageBadge = (pkg, idx) => {
    if (pkg.id === 'winter-snow-leopard-expedition') return { label: "Winter Wildlife", color: "#059669" };
    if (pkg.id === 'nubra-turtuk-border') return { label: "LOC Border Special", color: "#2563EB" };
    if (idx === 0) return { label: "Bestseller Circuit", color: "#EA580C" };
    if (idx === 1) return { label: "Popular Choice", color: "#0284C7" };
    if (idx === 2) return { label: "Ultimate Adventure", color: "#7C3AED" };
    return { label: "Curated Tour", color: "#EA580C" };
  };

  const filteredPackages = packagesData.filter((pkg) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'bike') return isBikeTour(pkg);
    if (selectedCategory === 'family') return isFamilyTour(pkg);
    if (selectedCategory === 'winter') return isWinterTour(pkg);
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'duration') return b.daysCount - a.daysCount;
    return 0;
  });

  return (
    <section className="container-custom" style={{ paddingTop: '40px', paddingBottom: '48px' }}>
      
      {/* Filter & Sort Bar */}
      <div className="packages-filter-bar">
        <div className="packages-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`packages-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '0.8rem',
              color: '#0F172A',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration">Duration (Longest First)</option>
          </select>
        </div>
      </div>

      {/* 6 Rich Package Cards Grid */}
      <div className="packages-dedicated-grid">
        {filteredPackages.map((pkg, idx) => {
          const badge = getPackageBadge(pkg, idx);
          return (
            <div 
              key={pkg.id} 
              className="package-detailed-card"
              onClick={() => onSelectPackage(pkg)}
              style={{ cursor: 'pointer' }}
            >
              {/* Image Wrap */}
              <div className="package-detailed-img-wrap">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
                
                {/* Badge */}
                <span 
                  style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    left: '12px', 
                    background: badge.color, 
                    color: '#FFFFFF', 
                    fontSize: '0.7rem', 
                    fontWeight: 800, 
                    padding: '4px 10px', 
                    borderRadius: 'var(--radius-full)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  {badge.label}
                </span>

                {/* Duration Pill */}
                <span 
                  style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    right: '12px', 
                    background: 'rgba(15, 23, 42, 0.85)', 
                    color: '#FFFFFF', 
                    fontSize: '0.72rem', 
                    fontWeight: 800, 
                    padding: '4px 10px', 
                    borderRadius: 'var(--radius-full)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Clock size={12} color="#EA580C" />
                  <span>{pkg.duration}</span>
                </span>

                {/* Route overlay title on image */}
                <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px' }}>
                  <p style={{ color: '#FDBA74', fontSize: '0.75rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pkg.route}</span>
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="package-detailed-body">
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px', lineHeight: 1.3 }}>
                    {pkg.title}
                  </h3>

                  {/* Inclusions Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', margin: '10px 0', background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '8px 10px', borderRadius: 'var(--radius-md)' }}>
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2px' }} title={inc.text}>
                        {getAmenityIcon(inc.name)}
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#166534' }}>{inc.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights Checklist */}
                  <div className="package-highlights-list">
                    {pkg.highlights.slice(0, 3).map((item, hIdx) => (
                      <div key={hIdx} className="package-highlight-item">
                        <CheckCircle2 size={13} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Booking Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '14px', marginTop: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                      All-Inclusive Price
                    </span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#EA580C' }}>
                      {pkg.priceDisplay.split('/')[0].trim()}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', marginLeft: '3px' }}>/ person</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPackage(pkg);
                      }}
                      style={{
                        background: '#F1F5F9',
                        border: '1px solid #CBD5E1',
                        color: '#0F172A',
                        borderRadius: 'var(--radius-sm)',
                        padding: '7px 10px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                    >
                      <Eye size={13} color="#EA580C" style={{ flexShrink: 0 }} />
                      <span style={{ whiteSpace: 'nowrap' }}>See Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookPackage(pkg);
                      }}
                      className="btn-primary-orange"
                      style={{ padding: '7px 12px', fontSize: '0.78rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                    >
                      <span>Book</span>
                      <ArrowRight size={13} style={{ marginLeft: '4px', flexShrink: 0 }} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
