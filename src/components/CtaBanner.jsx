"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useContactInfo } from '../lib/useContactInfo';

const DEFAULT_CTA = {
  tagText: 'Season 2026 Reservations Active',
  title: 'Ready To Conquer The Highest Passes On Earth?',
  description: 'Get showroom-tuned Royal Enfields, private 4x4 mountain cabs, fast-track Inner Line Permits, and 24/7 mechanic rescue vans directly coordinated from our Malpax Complex desk in Leh.',
  backgroundImage: '/images/cta-camp.webp',
  primaryButtonText: 'Reserve Motorcycle Now',
  whatsappButtonText: 'Chat on WhatsApp',
};

export default function CtaBanner({ onOpenBooking }) {
  const [content, setContent] = useState(DEFAULT_CTA);
  const contact = useContactInfo();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('home_content')
          .select('data')
          .eq('section_key', 'cta_banner')
          .single();
        if (!error && isMounted && data?.data) {
          setContent({ ...DEFAULT_CTA, ...data.data });
        }
      } catch (err) {
        console.warn('Falling back to default CTA content:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="cta-sunset-banner">
      {/* Background 4K Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Image
          src={content.backgroundImage || DEFAULT_CTA.backgroundImage}
          alt="Luxury Swiss Camping and Motorcycle Expeditions in Leh Ladakh"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 45%' }}
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="cta-sunset-overlay" />

      {/* Content */}
      <div className="cta-sunset-content">
        <div className="cta-sunset-badge">
          <Sparkles size={13} style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap' }}>{content.tagText}</span>
        </div>

        <h3 className="cta-sunset-title">
          {content.title}
        </h3>

        <p className="cta-sunset-text" style={{ color: '#CBD5E1', fontSize: '0.925rem', lineHeight: 1.6, margin: '10px 0 20px 0' }}>
          {content.description}
        </p>

        <div className="cta-sunset-actions">
          <button
            onClick={() => onOpenBooking && onOpenBooking()}
            className="btn-primary-orange cta-sunset-btn"
          >
            <span>{content.primaryButtonText}</span>
            <ArrowRight size={16} />
          </button>

          <a
            href={`https://wa.me/${contact.whatsappNumber}?text=Hi%20Biker%20King%20Adventure,%20I%20want%20to%20reserve%20a%20bike%20or%20tour.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-white cta-sunset-btn"
          >
            <MessageCircle size={16} color="#25D366" />
            <span>{content.whatsappButtonText}</span>
          </a>

          <Link
            href="/contact"
            className="cta-sunset-link"
          >
            Visit Our Leh Office &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
