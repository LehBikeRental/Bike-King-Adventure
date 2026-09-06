"use client";

import React from 'react';
import Link from 'next/link';
import { Bike, Car, Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesPortalGrid() {
  const portalCards = [
    {
      title: "Bike Fleet & Rental",
      subtitle: "8 Showroom-Tuned Models",
      desc: "Royal Enfield Himalayan 450, 411, Scram, Meteor, Classic 350 & Scooters. Fully equipped with luggage racks & crash guards.",
      price: "From ₹800 / Day",
      link: "/bikes",
      icon: Bike,
      badge: "Full Fleet Dedicated",
      accentColor: "#EA580C"
    },
    {
      title: "4x4 Mountain Taxis",
      subtitle: "Toyota Innova & Scorpio 4x4",
      desc: "Climate-controlled private SUVs with native Ladakhi drivers. Oxygen canisters on board & official union benchmark tariffs.",
      price: "Union Approved Rates",
      link: "/taxis",
      icon: Car,
      badge: "Union Certified",
      accentColor: "#0284C7"
    },
    {
      title: "Curated Tour Packages",
      subtitle: "5 to 9-Day Expeditions",
      desc: "All-inclusive guided rides and private family tours. Luxury Swiss lakefront dome camps, meals, permits & mechanic backup.",
      price: "From ₹16,999 / Person",
      link: "/packages",
      icon: Compass,
      badge: "All-Inclusive",
      accentColor: "#059669"
    }
  ];

  return (
    <section className="container-custom" style={{ paddingTop: '28px', paddingBottom: '36px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>
          Explore Our Core Adventure Portals
        </h2>
        <p style={{ color: '#475569', fontSize: '0.9rem', maxWidth: '620px', margin: '4px auto 0 auto' }}>
          Jump straight into dedicated fleet specifications, instant route fare estimators, and curated itineraries.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px' }}>
        {portalCards.map((portal, idx) => {
          const IconComp = portal.icon;
          return (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(14, 165, 233, 0.22)',
                borderRadius: 'var(--radius-xl)',
                padding: '28px 24px',
                boxShadow: '0 8px 24px rgba(14, 165, 233, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-full)', background: `${portal.accentColor}15`, color: portal.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComp size={24} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, background: `${portal.accentColor}12`, color: portal.accentColor, padding: '3px 10px', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>
                    {portal.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0F172A', marginBottom: '4px' }}>
                  {portal.title}
                </h3>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: portal.accentColor, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
                  {portal.subtitle}
                </span>

                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.55, marginBottom: '20px' }}>
                  {portal.desc}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Pricing</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A' }}>{portal.price}</span>
                </div>

                <Link
                  href={portal.link}
                  className="btn-primary-orange"
                  style={{ textDecoration: 'none', padding: '9px 18px', fontSize: '0.825rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
