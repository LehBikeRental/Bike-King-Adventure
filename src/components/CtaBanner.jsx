"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CtaBanner({ onOpenBooking, onScrollToContact }) {
  return (
    <div className="cta-sunset-banner">
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Image
          src="/images/cta-sunset.webp"
          alt="Sunset Camping in Leh Ladakh"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
      </div>

      {/* Dark Overlay */}
      <div className="cta-sunset-overlay" />

      {/* Content */}
      <div className="cta-sunset-content">
        <h3 className="cta-sunset-title">
          READY TO START<br />
          YOUR ADVENTURE?
        </h3>
        <p className="cta-sunset-text">
          Book your journey today and make memories for a lifetime!
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onOpenBooking && onOpenBooking()}
            className="btn-primary-orange"
            style={{ padding: '9px 22px', fontSize: '0.85rem' }}
          >
            BOOK NOW
          </button>
          <Link
            href="/contact"
            className="btn-ghost-white"
            style={{ padding: '9px 22px', fontSize: '0.85rem' }}
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  );
}
