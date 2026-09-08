"use client";

import React, { useState, useEffect } from 'react';
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
import { bikesData as staticBikesData } from '../data/bikes';
import { supabase } from '../lib/supabase';

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

const DEFAULT_CONTENT = {
  badgeText: 'Explore Ladakh',
  title: 'Rent Royal Enfield Bikes in Leh',
  subtitle: 'Well-maintained adventure bikes fitted with luggage carriers, crash guards, and mountain tyres.',
};

export default function BikeAdvertisement({ onSelectBike, onOpenBooking }) {
  const [bikesData, setBikesData] = useState(staticBikesData);
  const [content, setContent] = useState(DEFAULT_CONTENT);

  // Shows every bike the admin has ticked "Show in homepage showcase" for.
  const featuredBikes = bikesData;

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('home_content')
          .select('data')
          .eq('section_key', 'bike_ad')
          .single();
        if (!error && isMounted && data?.data) {
          setContent({ ...DEFAULT_CONTENT, ...data.data });
        }
      } catch (err) {
        console.warn('Falling back to default bike ad content:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('bikes')
          .select('*')
          .eq('is_active', true)
          .eq('show_on_homepage', true)
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

  return (
    <section className="container-custom" id="bikes" style={{ paddingTop: '48px', paddingBottom: '44px' }}>
      
      {/* Advertisement Promo Card Container */}
      <div className="bike-ad-container">
        
        {/* Top Header */}
        <div className="bike-ad-header">
          <div className="bike-ad-badge">
            <Flame size={14} color="#EA580C" style={{ flexShrink: 0 }} />
            <span style={{ whiteSpace: 'nowrap' }}>{content.badgeText}</span>
          </div>

          <h2 className="bike-ad-title">
            {content.title}
          </h2>

          <p className="bike-ad-subtitle">
            {content.subtitle}
          </p>
        </div>

        {/* Featured Bikes Showcase Cards */}
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
                  style={{ objectFit: 'cover' }}
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

        {/* View All Bikes Button */}
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link
            href="/bikes"
            className="btn-primary-orange"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              fontSize: '0.875rem',
              textDecoration: 'none',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            <span>View All Bikes & Models</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>

    </section>
  );
}
