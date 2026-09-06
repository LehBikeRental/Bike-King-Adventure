"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { NATIVE_PILLARS } from '../../data/about';

export default function AboutStoryNarrative({ onOpenBooking }) {
  return (
    <section className="container-custom" style={{ paddingTop: '50px', paddingBottom: '40px' }}>
      <div className="about-story-grid">
        
        <div className="about-text-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-orange)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase' }}>
            <Award size={16} />
            <span>Native Himalayan Roots</span>
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0F172A', marginBottom: '14px', lineHeight: 1.25 }}>
            Pioneering Mountain Journeys Across Leh Ladakh Since 2012
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, marginBottom: '14px' }}>
            Founded by passionate local Ladakhi riders, <strong>Biker King Adventure</strong> was born out of a simple, fierce vision: to empower travelers from around the globe to explore the dramatic heights of Ladakh with complete confidence, pristine machinery, and true brotherhood.
          </p>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
            Riding the high passes of Khardung La (17,982 ft), Chang La (17,688 ft), and Umling La (19,024 ft) tests both human grit and engine reliability. We tune our bikes specifically for thin high-altitude air, provide certified protective gear, and back every rider with genuine 24/7 mountain support.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {NATIVE_PILLARS.map((pillar, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>{pillar}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '28px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              onClick={onOpenBooking}
              className="btn-primary-orange"
              style={{ padding: '12px 28px' }}
            >
              RESERVE YOUR RIDE
            </button>
            <Link
              href="/contact"
              className="btn-secondary-white"
              style={{ padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>VISIT OUR LEH OFFICE</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right Hero Image Card */}
        <div style={{ position: 'relative', width: '100%', minHeight: '380px', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
          <Image
            src="/images/hero-pangong.webp"
            alt="Biker King Adventure Leh Ladakh Team and Fleet"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 50%)'
          }} />
          <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', color: 'var(--white)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary-orange)', letterSpacing: '1px' }}>
              Headquarters
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginTop: '2px' }}>
              Malpax Complex, Leh Main Market, Ladakh
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--slate-300)', marginTop: '4px' }}>
              Minutes from Leh Airport. Come meet our mechanics and inspect your motorcycle before setting out.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
