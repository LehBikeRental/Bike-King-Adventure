"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote, ExternalLink } from 'lucide-react';
import { reviewsData } from '../data/reviews';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : reviewsData.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < reviewsData.length - 1 ? prev + 1 : 0));
  };

  // Auto rotate testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentReview = reviewsData[currentIndex];

  return (
    <div className="reviews-box">
      
      {/* Reviews Box Header */}
      <div className="reviews-box-header">
        <div>
          <span className="reviews-box-eyebrow">Verified Rider Experiences</span>
          <h2 className="reviews-header-title">
            What Our Riders Say
          </h2>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="reviews-nav-buttons">
          <button
            onClick={handlePrev}
            aria-label="Previous rider review"
            className="reviews-nav-btn"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="reviews-counter">
            {currentIndex + 1} / {reviewsData.length}
          </span>
          <button
            onClick={handleNext}
            aria-label="Next rider review"
            className="reviews-nav-btn"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Featured Testimonial Card */}
      <div className="review-active-card">
        
        {/* Quote Icon */}
        <div className="review-quote-mark">
          <Quote size={28} />
        </div>

        {/* Stars & Route Badge */}
        <div className="review-meta-row">
          <div className="review-stars-list">
            {[...Array(currentReview.rating)].map((_, i) => (
              <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
            ))}
          </div>
          {currentReview.trip && (
            <span className="review-trip-pill">{currentReview.trip}</span>
          )}
        </div>

        {/* Review Text */}
        <p className="review-text-content">
          "{currentReview.review}"
        </p>

        {/* Reviewer Bio */}
        <div className="reviewer-bio-row">
          <div className="reviewer-avatar-wrap">
            <Image
              src={currentReview.avatar}
              alt={currentReview.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          <div className="reviewer-info-col">
            <div className="reviewer-name-row">
              <span className="reviewer-name">{currentReview.name}</span>
              {currentReview.verified && (
                <span className="verified-badge-chip">
                  <CheckCircle2 size={12} />
                  <span>Verified Rider</span>
                </span>
              )}
            </div>
            <span className="reviewer-location">{currentReview.location}</span>
          </div>
        </div>

      </div>

      {/* Google Reviews Trust Card */}
      <div className="google-trust-badge-row">
        <div className="google-stars-summary">
          <div className="google-g-logo">
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
          </div>
          <div className="google-rating-digits">
            <strong>4.9</strong>
            <div style={{ display: 'flex', gap: '2px', marginLeft: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#FBBC05" color="#FBBC05" />
              ))}
            </div>
          </div>
          <span className="google-reviews-count">(350+ Reviews in Leh)</span>
        </div>

        <a
          href="https://maps.google.com/?q=Leh+Ladakh+Bike+Rentals"
          target="_blank"
          rel="noopener noreferrer"
          className="google-maps-link"
        >
          <span>View All Google Reviews</span>
          <ExternalLink size={12} />
        </a>
      </div>

    </div>
  );
}
