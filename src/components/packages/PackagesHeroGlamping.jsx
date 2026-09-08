"use client";

import React from 'react';
import Image from 'next/image';
import { Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { useContactInfo } from '../../lib/useContactInfo';

export default function PackagesHeroGlamping({ onOpenBooking }) {
  const contact = useContactInfo();
  return (
    <section className="container-custom" style={{ paddingTop: '28px', paddingBottom: '32px' }}>
      <div style={{
        background: '#FFFFFF',
        border: '1px solid rgba(14, 165, 233, 0.2)',
        borderRadius: 'var(--radius-2xl)',
        overflow: 'hidden',
        boxShadow: '0 12px 36px rgba(14, 165, 233, 0.08)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
      }}>
        {/* Left Media Image */}
        <div style={{ position: 'relative', minHeight: '320px' }}>
          <Image
            src="/images/tours/expedition-camp.jpg"
            alt="Luxury Swiss Dome Camping at Pangong Lake with Biker King Adventure"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', color: '#FFFFFF' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, background: '#EA580C', padding: '4px 12px', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>
              Exclusive Accommodation
            </span>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 900, marginTop: '6px' }}>
              Lakefront Swiss Dome Camps
            </h4>
            <p style={{ fontSize: '0.825rem', color: '#E2E8F0' }}>
              Heated beds, private washrooms, hot running water & starlight bonfire nights.
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#EA580C', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Sparkles size={14} />
            <span>Season 2026 Guaranteed Departures</span>
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', marginBottom: '12px', lineHeight: 1.25 }}>
            Ride With Peace Of Mind • Everything Is Included
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
            Whether you want to ride a showroom Royal Enfield Himalayan 450 in a convoy led by an expert local road captain, 
            or prefer a private 4x4 Innova Crysta for your family, our Leh headquarters coordinates every single detail seamlessly.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
              <CheckCircle2 size={16} color="#10B981" /> <span>Buffet Breakfast & Dinners</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
              <CheckCircle2 size={16} color="#10B981" /> <span>Approved Inner Line Permits</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
              <CheckCircle2 size={16} color="#10B981" /> <span>Oxygen & Medical Support</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
              <CheckCircle2 size={16} color="#10B981" /> <span>Luggage Van & RE Mechanic</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/${contact.whatsappNumber}?text=Hi%20Biker%20King%20Adventure,%20I%20want%20to%20customize%20a%20Ladakh%20tour%20package.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-orange"
              style={{ padding: '12px 24px', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <MessageCircle size={16} />
              <span>Request Custom Package</span>
            </a>
            <button
              type="button"
              onClick={() => onOpenBooking(null)}
              className="btn-outline-dark"
              style={{ padding: '12px 20px', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Inquire Over Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
