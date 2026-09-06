"use client";

import React from 'react';
import Image from 'next/image';
import { Sparkles, Users, Luggage, CheckCircle2, ArrowRight } from 'lucide-react';
import { taxiFleet } from '../../data/taxis';

export default function TaxiFleetList({ onOpenBooking, onSelectVehicle }) {
  return (
    <section className="container-custom" id="fleet" style={{ paddingBottom: '48px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A' }}>
          Explore Our 4x4 Mountain Fleet
        </h2>
        <p style={{ color: '#475569', fontSize: '0.9rem', maxWidth: '600px', margin: '4px auto 0 auto' }}>
          Certified all-terrain vehicles equipped with emergency oxygen, snow chains, and high ground clearance.
        </p>
      </div>

      <div className="taxi-fleet-grid">
        {taxiFleet.map((v) => (
          <div key={v.id} className="taxi-vehicle-card">
            
            {/* Top Badge */}
            <div style={{ position: 'relative', width: '100%', height: '220px' }}>
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

              <p style={{ fontSize: '0.825rem', color: '#64748B', marginBottom: '14px', fontStyle: 'italic' }}>
                💡 {v.idealFor}
              </p>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                {v.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#334155' }}>
                    <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

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
        ))}
      </div>
    </section>
  );
}
