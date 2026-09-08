"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Utensils, Building2, Bike, FileCheck, Compass, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { packagesData as staticPackagesData } from '../data/packages';
import { supabase } from '../lib/supabase';

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

const DEFAULT_HEADER = {
  badgeText: 'Complete Guided & Self-Ride Expeditions',
  title: 'Popular Tour Packages',
  subtitle: 'All-inclusive Ladakh circuits with stays in luxury Swiss camps, mechanic backup vans, buffet meals, and certified Inner Line Permits.',
  buttonText: 'Explore All Tour Packages & Details',
};

export default function TourPackages({ onSelectPackage, onOpenAllPackages }) {
  const [header, setHeader] = useState(DEFAULT_HEADER);
  const [packagesData, setPackagesData] = useState(staticPackagesData);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('home_content')
          .select('data')
          .eq('section_key', 'packages_header')
          .single();
        if (!error && isMounted && data?.data) {
          setHeader({ ...DEFAULT_HEADER, ...data.data });
        }
      } catch (err) {
        console.warn('Falling back to default packages header:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('is_active', true)
          .eq('show_on_homepage', true)
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

  const getAmenityIcon = (name) => {
    switch (name) {
      case 'Meals':
        return <Utensils size={14} />;
      case 'Hotel':
        return <Building2 size={14} />;
      case 'Sightseeing':
        return <Bike size={14} />;
      case 'Permit':
        return <FileCheck size={14} />;
      default:
        return <FileCheck size={14} />;
    }
  };

  const getPackageBadge = (idx) => {
    switch (idx) {
      case 0:
        return { label: "Bestseller Circuit", color: "#EA580C" };
      case 1:
        return { label: "Popular Choice", color: "#0284C7" };
      case 2:
        return { label: "Ultimate Adventure", color: "#7C3AED" };
      case 3:
        return { label: "Winter Special", color: "#059669" };
      default:
        return { label: "Curated Tour", color: "#EA580C" };
    }
  };

  return (
    <section className="container-custom" id="packages" style={{ paddingTop: '44px', paddingBottom: '52px' }}>
      
      {/* Section Header */}
      <div className="section-header-clean">
        <div className="section-pill-tag">
          <Compass size={14} style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap' }}>{header.badgeText}</span>
        </div>
        <h2 className="section-title-large">
          {header.title}
        </h2>
        <p className="section-subtitle-clean">
          {header.subtitle}
        </p>
      </div>

      {/* 4 Packages Grid */}
      <div className="packages-grid">
        {packagesData.map((pkg, idx) => {
          const badge = getPackageBadge(idx);
          return (
            <div key={pkg.id} className="package-card">
              
              {/* Image & Day Badge */}
              <div className="package-img-box">
                <span className="package-day-badge">{pkg.duration}</span>
                {badge && (
                  <span 
                    className="package-featured-badge"
                    style={{ backgroundColor: badge.color }}
                  >
                    {badge.label}
                  </span>
                )}
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Content Body */}
              <div className="package-card-body">
                <div>
                  <h3 className="package-card-title">{pkg.title}</h3>
                  <p className="package-card-route">
                    <MapPin size={13} style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '4px', color: 'var(--primary-orange)', flexShrink: 0 }} />
                    <span>{pkg.route}</span>
                  </p>
                  <div className="package-price-row">
                    <span className="package-card-price">{pkg.priceDisplay}</span>
                    <span className="package-per-person">/ person (all inclusive)</span>
                  </div>
                </div>

                {/* Amenities Row */}
                <div style={{ marginTop: '14px' }}>
                  <div className="package-amenities-row">
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="package-amenity-item" title={inc.name}>
                        {getAmenityIcon(inc.name)}
                        <span>{inc.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => onSelectPackage && onSelectPackage(pkg)}
                    className="btn-view-details"
                  >
                    <span>See Details</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* View All Packages CTA */}
      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <Link
          href="/packages"
          className="btn-primary-orange"
          style={{ textDecoration: 'none', padding: '12px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <span>{header.buttonText}</span>
          <ArrowRight size={16} />
        </Link>
      </div>

    </section>
  );
}
