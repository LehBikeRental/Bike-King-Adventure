"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export default function CtaBanner({ onOpenBooking }) {
  return (
    <div className="cta-sunset-banner">
      {/* Background 4K Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Image
          src="/images/cta-camp.webp"
          alt="Luxury Swiss Camping and Motorcycle Expeditions in Leh Ladakh"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="cta-sunset-overlay" />

      {/* Content */}
      <div className="cta-sunset-content">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 101, 0, 0.2)', border: '1px solid rgba(255, 101, 0, 0.4)', padding: '4px 12px', borderRadius: 'var(--radius-full)', color: '#FF9838', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.04em' }}>
          <Sparkles size={13} />
          <span>Season 2026 Reservations Active</span>
        </div>

        <h3 className="cta-sunset-title">
          Ready To Conquer The Highest Passes On Earth?
        </h3>

        <p className="cta-sunset-text" style={{ color: '#CBD5E1', fontSize: '0.925rem', lineHeight: 1.6, margin: '10px 0 20px 0' }}>
          Get showroom-tuned Royal Enfields, private 4x4 mountain cabs, fast-track Inner Line Permits, 
          and 24/7 mechanic rescue vans directly coordinated from our Malpax Complex desk in Leh.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => onOpenBooking && onOpenBooking()}
            className="btn-primary-orange"
            style={{ padding: '12px 26px', fontSize: '0.85rem' }}
          >
            <span>Reserve Motorcycle Now</span>
            <ArrowRight size={16} />
          </button>

          <a
            href="https://wa.me/919797948265?text=Hi%20Biker%20King%20Adventure,%20I%20want%20to%20reserve%20a%20bike%20or%20tour."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-white"
            style={{ padding: '12px 20px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
          >
            <MessageCircle size={16} color="#25D366" />
            <span>Chat on WhatsApp</span>
          </a>

          <Link
            href="/contact"
            style={{ color: '#CBD5E1', fontSize: '0.825rem', fontWeight: 700, textDecoration: 'none', marginLeft: '6px' }}
          >
            Visit Our Leh Office &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
