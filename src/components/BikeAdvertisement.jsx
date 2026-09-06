"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Zap, 
  Fuel, 
  Gauge, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Flame
} from 'lucide-react';
import { bikesData } from '../data/bikes';

export default function BikeAdvertisement({ onSelectBike, onOpenBooking }) {
  // Top 3 featured flagship bikes for the advertisement teaser
  const featuredBikes = [
    bikesData.find(b => b.id === 'himalayan-450') || bikesData[1],
    bikesData.find(b => b.id === 'himalayan-411') || bikesData[0],
    bikesData.find(b => b.id === 'scram-411') || bikesData[3],
  ];

  return (
    <section className="container-custom" id="bikes" style={{ paddingTop: '48px', paddingBottom: '44px' }}>
      
      {/* Advertisement Promo Card Container */}
      <div className="bike-ad-container">
        
        {/* Top Header */}
        <div className="bike-ad-header">
          <div className="bike-ad-badge">
            <Flame size={14} color="#EA580C" />
            <span>Special Fleet Promotion • Season 2026</span>
          </div>

          <h2 className="bike-ad-title">
            Conquer The High Passes On Royal Enfield
          </h2>

          <p className="bike-ad-subtitle">
            Showroom-tuned adventure motorcycles starting from <strong>₹800 / Day</strong>. 
            Pre-equipped with heavy-duty luggage racks, crash guards, and dual-purpose terrain tyres.
          </p>
        </div>

        {/* 3 Featured Bikes Showcase Cards */}
        <div className="bike-ad-grid">
          {featuredBikes.map((bike) => (
            <div 
              key={bike.id}
              className="bike-ad-card"
              onClick={() => onSelectBike && onSelectBike(bike)}
            >
              {/* Badge */}
              <div className="bike-ad-card-badge">
                <Sparkles size={12} />
                <span>{bike.badge || 'Top Pick'}</span>
              </div>

              {/* Bike Image */}
              <div className="bike-ad-img-wrap">
                <Image
                  src={bike.image}
                  alt={bike.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Card Body */}
              <div className="bike-ad-card-body">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 className="bike-ad-card-name">{bike.name}</h3>
                  <span className="bike-ad-card-type">{bike.type}</span>
                </div>

                <p className="bike-ad-card-desc">
                  {bike.description}
                </p>

                {/* Specs chips */}
                <div className="bike-specs-chips" style={{ marginBottom: '16px' }}>
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

                {/* Price & Booking Button */}
                <div className="bike-ad-card-footer">
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                      Rental Rate
                    </span>
                    <span className="bike-ad-price">
                      ₹{bike.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-500)' }}>/ Day</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn-primary-orange"
                    style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectBike) onSelectBike(bike);
                    }}
                  >
                    <span>Reserve</span>
                    <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Call to Action Strip */}
        <div className="bike-ad-bottom-bar">
          <div className="bike-ad-bottom-text">
            <h4>Want to see all 8 models including Meteor, Classic 350, Hunter & Scooty?</h4>
            <p>Compare full engine specifications, luggage capacity, and security deposit terms.</p>
          </div>

          <div className="bike-ad-bottom-actions">
            <Link href="/bikes" className="btn-primary-orange" style={{ textDecoration: 'none', padding: '12px 24px' }}>
              <span>View Full Bike Fleet & Pricing (8 Models)</span>
              <ArrowRight size={16} style={{ marginLeft: '6px' }} />
            </Link>
            <button 
              type="button" 
              onClick={() => onOpenBooking && onOpenBooking()}
              className="btn-dark-pill"
              style={{ padding: '12px 20px', fontSize: '0.82rem' }}
            >
              Quick Inquire
            </button>
          </div>
        </div>

        {/* Trust Badges Strip */}
        <div className="fleet-trust-strip" style={{ marginTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'transparent' }}>
          <div className="trust-strip-item">
            <CheckCircle2 size={16} color="#10B981" />
            <span style={{ color: 'var(--slate-300)' }}>Complimentary ISI Certified Helmets</span>
          </div>
          <div className="trust-strip-item">
            <CheckCircle2 size={16} color="#10B981" />
            <span style={{ color: 'var(--slate-300)' }}>Heavy-Duty Carrier Racks Fitted</span>
          </div>
          <div className="trust-strip-item">
            <CheckCircle2 size={16} color="#10B981" />
            <span style={{ color: 'var(--slate-300)' }}>Instant Security Deposit Refund</span>
          </div>
          <div className="trust-strip-item">
            <CheckCircle2 size={16} color="#10B981" />
            <span style={{ color: 'var(--slate-300)' }}>24/7 Roadside Assistance in Leh</span>
          </div>
        </div>

      </div>

    </section>
  );
}
