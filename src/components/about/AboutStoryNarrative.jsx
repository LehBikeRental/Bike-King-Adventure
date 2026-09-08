"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { NATIVE_PILLARS } from '../../data/about';

export default function AboutStoryNarrative({ onOpenBooking }) {
  return (
    <section className="container-custom about-story-section">
      <div className="about-story-grid">

        <div className="about-text-content">
          <div className="about-badge-tag">
            <Award size={16} />
            <span>Born in the Himalayas</span>
          </div>
          <h3>Pioneering Mountain Biking Journeys Across Leh Ladakh</h3>
          <p>
            Founded by passionate Ladakhi riders, <strong>Biker King Adventure</strong> was born out of a simple, fierce vision: to empower travelers from around the globe to explore the dramatic heights of Ladakh with complete confidence and safety.
          </p>
          <p>
            Riding the rugged passes of Khardung La (17,982 ft), Chang La (17,688 ft), and Umling La (19,024 ft) is not an ordinary commute. It tests both machine and human grit. We tune our bikes specifically for thin high-altitude air, provide certified high-grade protective gear, and back every rider with genuine 24/7 mountain support.
          </p>

          <div className="about-pillars-subgrid">
            {NATIVE_PILLARS.map((pillar, idx) => (
              <div key={idx} className="about-pillar-item">
                <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0 }} />
                <span>{pillar}</span>
              </div>
            ))}
          </div>

          <div className="about-story-actions">
            <button
              onClick={onOpenBooking}
              className="btn-primary-orange about-action-btn"
            >
              BOOK YOUR MOTORBIKE
            </button>
            <Link
              href="/contact"
              className="btn-secondary-white about-action-btn"
            >
              <span>CONTACT LEH DESK</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right Hero Image Card */}
        <div className="about-story-image-card">
          <Image
            src="/images/hero-pangong.webp"
            alt="Biker King Adventure Leh Ladakh Team and Fleet"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div className="about-story-image-overlay" />
          <div className="about-story-image-content">
            <div className="about-story-rating-row">
              <div style={{ display: 'flex', color: '#FBBF24' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />
                ))}
              </div>
              <span className="about-story-rating-text">Trusted by 5,000+ Himalayan Riders</span>
            </div>
            <p className="about-story-quote">
              &ldquo;Biker King Adventure provided us brand-new Himalayan 450s with carrier luggage frames and backup support. The ultimate mountain experience!&rdquo;
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
