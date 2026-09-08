"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Bike,
  Compass,
  Headphones,
  Star,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const ICON_MAP = { ShieldCheck, Bike, Compass, Headphones };

const DEFAULT_HERO = {
  trustBadgeText: '4.9/5 Rated • 5,000+ Happy Riders Across Khardung La & Pangong',
  titleLine1: 'Where Every Turn',
  titleLine2: 'Is An Adventure',
  subtitle: 'Experience Leh Ladakh with showroom-conditioned Royal Enfields, 24/7 high-altitude backup, and verified Inner Line Permits.',
  backgroundImage: '/images/hero-pangong.webp',
  banners: [],
  badges: [
    { label: 'Best Price Guarantee', icon: 'ShieldCheck' },
    { label: 'Well Maintained Fleet', icon: 'Bike' },
    { label: 'Expert Local Guides', icon: 'Compass' },
    { label: '24/7 Road Assistance', icon: 'Headphones' },
  ],
  primaryButtonText: 'EXPLORE ALL FLEET',
  secondaryButtonText: 'TAXI & TOUR PACKAGES',
};

export default function Hero({ onOpenBooking, onScrollToContact }) {
  const [content, setContent] = useState(DEFAULT_HERO);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('home_content')
          .select('data')
          .eq('section_key', 'hero')
          .single();
        if (!error && isMounted && data?.data) {
          setContent({ ...DEFAULT_HERO, ...data.data });
        }
      } catch (err) {
        console.warn('Falling back to default hero content:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const badges = (content.badges || []).map((b) => ({ label: b.label, icon: ICON_MAP[b.icon] || ShieldCheck }));

  const slides = (content.banners && content.banners.length > 0)
    ? content.banners
        .filter((b) => b.image)
        .map((b) => ({
          image: b.image,
          titleLine1: b.titleLine1 || content.titleLine1,
          titleLine2: b.titleLine2 || content.titleLine2,
          subtitle: b.subtitle || content.subtitle,
        }))
    : [{
        image: content.backgroundImage || DEFAULT_HERO.backgroundImage,
        titleLine1: content.titleLine1,
        titleLine2: content.titleLine2,
        subtitle: content.subtitle,
      }];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[activeSlide] || slides[0];

  return (
    <section className="hero-section">
      {/* Background Banner Slider (auto-rotates infinitely when multiple banners are set) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {slides.map((slide, idx) => (
          <div
            key={slide.image + idx}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: idx === activeSlide ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
            }}
          >
            <Image
              src={slide.image}
              alt="Biker King Leh Ladakh Pangong Lake Adventure"
              fill
              priority={idx === 0}
              style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
            />
          </div>
        ))}
      </div>

      {/* Cinematic Dark Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Banner Pagination Dots */}
      {slides.length > 1 && (
        <div className="hero-banner-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`hero-banner-dot ${idx === activeSlide ? 'active' : ''}`}
              aria-label={`Show banner ${idx + 1}`}
              onClick={() => setActiveSlide(idx)}
            />
          ))}
        </div>
      )}

      {/* Hero Content */}
      <div className="container-custom" style={{ width: '100%', position: 'relative', zIndex: 3 }}>
        <div className="hero-content">

          <h1 className="hero-title-main" key={`title-${activeSlide}`}>
            {currentSlide.titleLine1}
            <span className="hero-title-orange">{currentSlide.titleLine2}</span>
          </h1>

          <p className="hero-subtitle" key={`subtitle-${activeSlide}`}>
            {currentSlide.subtitle}
          </p>

          {/* 4 Feature Badges */}
          <div className="hero-badges-grid">
            {badges.map((badge, idx) => {
              const IconComp = badge.icon;
              return (
                <div key={idx} className="hero-badge-item">
                  <div className="hero-badge-icon">
                    <IconComp size={15} />
                  </div>
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>

          {/* Quick Action Links */}
          <div className="hero-actions-row">
            <button
              onClick={() => onOpenBooking && onOpenBooking(null, 'bike')}
              className="btn-primary-orange"
            >
              {content.primaryButtonText}
            </button>
            <Link
              href="/services"
              className="btn-ghost-white"
            >
              {content.secondaryButtonText}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
