"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote, ExternalLink, MessageSquare } from 'lucide-react';
import { reviewsData as staticReviewsData } from '../data/reviews';
import { supabase } from '../lib/supabase';

const DEFAULT_CONTENT = {
  eyebrow: 'Verified Rider Experiences',
  title: 'What Our Riders Say',
  subtitle: 'Real reviews from real adventurers who conquered Khardung La, Pangong, and Zanskar with Biker King Adventure.',
  googleRating: '4.9',
  googleReviewsCount: '(350+ Reviews in Leh)',
  googleMapsUrl: 'https://maps.google.com/?q=Leh+Ladakh+Bike+Rentals',
  items: staticReviewsData,
};

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('home_content')
          .select('data')
          .eq('section_key', 'reviews')
          .single();
        if (!error && isMounted && data?.data) {
          setContent({
            ...DEFAULT_CONTENT,
            ...data.data,
            items: data.data.items?.length ? data.data.items : DEFAULT_CONTENT.items,
          });
        }
      } catch (err) {
        console.warn('Falling back to default reviews content:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setCardsToShow(1);
        } else if (window.innerWidth < 1024) {
          setCardsToShow(2);
        } else {
          setCardsToShow(4);
        }
      }
    };
    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const items = content.items || [];
  const maxIndex = Math.max(0, items.length - cardsToShow);

  // Clamp currentIndex whenever cardsToShow or items length changes
  useEffect(() => {
    const maxIdx = Math.max(0, items.length - cardsToShow);
    if (currentIndex > maxIdx) {
      setCurrentIndex(Math.max(0, maxIdx));
    }
  }, [cardsToShow, items.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Auto rotate testimonials every 4 seconds
  useEffect(() => {
    if (isPaused || items.length === 0) return;
    const maxIdx = Math.max(0, items.length - cardsToShow);
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIdx ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, items.length, cardsToShow]);

  const gap = 16;
  const shiftPercent = (currentIndex * 100) / cardsToShow;
  const shiftGap = (currentIndex * gap) / cardsToShow;

  return (
    <div
      className="reviews-section-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* Clean Section Header (Matching Tour Packages & Bike Fleet) */}
      <div className="section-header-clean" style={{ position: 'relative' }}>
        <div className="section-pill-tag">
          <MessageSquare size={14} style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap' }}>{content.eyebrow}</span>
        </div>
        <h2 className="section-title-large">
          {content.title}
        </h2>
        <p className="section-subtitle-clean">
          {content.subtitle}
        </p>

        {/* Carousel Navigation Buttons */}
        <div className="reviews-header-nav">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous rider review"
            className="reviews-nav-btn"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="reviews-counter">
            {currentIndex + 1} / {maxIndex + 1}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next rider review"
            className="reviews-nav-btn"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Multi-Card Carousel Slider Viewport (Spans 100% of container-custom) */}
      <div className="reviews-carousel-viewport">
        <div
          className="reviews-carousel-track"
          style={{
            transform: `translateX(calc(-${shiftPercent}% - ${shiftGap}px))`,
          }}
        >
          {items.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="review-card-item"
            >
              <div className="review-card-inner">
                {/* Quote Icon */}
                <div className="review-quote-mark">
                  <Quote size={24} />
                </div>

                {/* Stars & Route Badge */}
                <div className="review-meta-row">
                  <div className="review-stars-list">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  {rev.trip && (
                    <span className="review-trip-pill">{rev.trip}</span>
                  )}
                </div>

                {/* Review Text */}
                <p className="review-text-content">
                  "{rev.review}"
                </p>

                {/* Reviewer Bio */}
                <div className="reviewer-bio-row">
                  <div className="reviewer-avatar-wrap">
                    <Image
                      src={rev.avatar || '/images/hero-pangong.webp'}
                      alt={rev.name || 'Rider'}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  
                  <div className="reviewer-info-col">
                    <div className="reviewer-name-row">
                      <span className="reviewer-name">{rev.name}</span>
                      {rev.verified && (
                        <span className="verified-badge-chip">
                          <CheckCircle2 size={12} />
                          <span>Verified Rider</span>
                        </span>
                      )}
                    </div>
                    <span className="reviewer-location">{rev.location}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Reviews Trust Card Footer */}
      <div 
        className="google-trust-badge-row"
        style={{
          marginTop: '28px',
          marginBottom: '16px',
          paddingTop: '18px',
          borderTop: '1px solid rgba(15, 23, 42, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div 
          className="google-stars-summary"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div className="google-g-logo" style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
          </div>
          
          <div className="google-rating-digits" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <strong style={{ fontSize: '1.2rem', color: '#0F172A', fontWeight: 900 }}>{content.googleRating}</strong>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#FBBC05" color="#FBBC05" />
              ))}
            </div>
          </div>
          
          <span className="google-reviews-count" style={{ color: '#475569', fontSize: '0.925rem', fontWeight: 700 }}>
            {content.googleReviewsCount}
          </span>
        </div>

        <a
          href={content.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="google-maps-link"
          style={{
            color: '#EA580C',
            fontSize: '0.925rem',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none'
          }}
        >
          <span>View All Google Reviews</span>
          <ExternalLink size={15} />
        </a>
      </div>

    </div>
  );
}
