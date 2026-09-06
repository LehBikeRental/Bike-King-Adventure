"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Utensils, Building2, Bike, FileCheck, Compass, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { packagesData } from '../data/packages';

export default function TourPackages({ onSelectPackage, onOpenAllPackages }) {
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
          <Compass size={14} />
          <span>Complete Guided & Self-Ride Expeditions</span>
        </div>
        <h2 className="section-title-large">
          Popular Tour Packages
        </h2>
        <p className="section-subtitle-clean">
          All-inclusive Ladakh circuits with stays in luxury Swiss camps, mechanic backup vans, buffet meals, and certified Inner Line Permits.
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
                    <span>View Itinerary</span>
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
          <span>Explore All Tour Packages & Details</span>
          <ArrowRight size={16} />
        </Link>
      </div>

    </section>
  );
}
