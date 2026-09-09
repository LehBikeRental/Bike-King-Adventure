"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Flame,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useContactInfo } from '../lib/useContactInfo';

const ICON_MAP = { Flame, Sparkles, ShieldCheck, PhoneCall };

function getDefaultAnnouncements(whatsappNumber) {
  return [
    {
      id: 1,
      badge: 'Season 2026 Deal',
      icon: 'Flame',
      desktopText: 'Ladakh Season 2026 Bookings Open! Get Flat 10% OFF on all Himalayan 450 & 411 rentals.',
      mobileText: 'Ladakh 2026 Open: Flat 10% OFF Rentals!',
      ctaText: 'Claim Offer',
      actionType: 'booking',
      href: '/services#bikes',
    },
    {
      id: 2,
      badge: 'New Fleet',
      icon: 'Sparkles',
      desktopText: 'Brand New Royal Enfield Himalayan 450 Fleet with Panniers & GPS mounts ready in Leh.',
      mobileText: 'New Himalayan 450 Fleet Ready in Leh!',
      ctaText: 'View Bikes',
      actionType: 'link',
      href: '/services#bikes',
    },
    {
      id: 3,
      badge: 'Safety First',
      icon: 'ShieldCheck',
      desktopText: 'Free Riding Gear, Oxygen Cylinder & 24/7 Mechanic Backup on all guided expeditions.',
      mobileText: 'Free Riding Gears & 24/7 Road Support!',
      ctaText: 'Explore Tours',
      actionType: 'link',
      href: '/services#packages-service',
    },
    {
      id: 4,
      badge: 'Leh Desk 24/7',
      icon: 'PhoneCall',
      desktopText: 'Custom Ladakh, Zanskar & Spiti itineraries with native riders. Instant WhatsApp booking.',
      mobileText: 'Instant Booking & Support on WhatsApp!',
      ctaText: 'Chat Now',
      actionType: 'external',
      href: `https://wa.me/${whatsappNumber}?text=Hi%20Biker%20King%20Adventure,%20I%20saw%20your%20announcement%20and%20want%20to%20inquire%20about%20bike%20rentals%20and%20tours.`,
    },
  ];
}

export default function TopBar({ onOpenBooking }) {
  const contact = useContactInfo();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [announcements, setAnnouncements] = useState(() => getDefaultAnnouncements(contact.whatsappNumber));
  const [customAnnouncements, setCustomAnnouncements] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!customAnnouncements) {
      setAnnouncements(getDefaultAnnouncements(contact.whatsappNumber));
    }
  }, [contact.whatsappNumber, customAnnouncements]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('home_content')
          .select('data')
          .eq('section_key', 'topbar')
          .single();
        if (!error && isMounted && Array.isArray(data?.data?.announcements)) {
          setCustomAnnouncements(data.data.announcements);
          setAnnouncements(data.data.announcements);
        }
      } catch (err) {
        console.warn('Falling back to default announcements:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  // Check sessionStorage on mount
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('bka_announcement_dismissed');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    } catch (e) {
      // ignore in environments where sessionStorage is blocked
    }
  }, []);

  // Handle auto-rotation
  useEffect(() => {
    if (isPaused || isDismissed || announcements.length === 0) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, isDismissed, announcements.length]);

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
      setIsFading(false);
    }, 200);
  };

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
      setIsFading(false);
    }, 200);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('bka_announcement_dismissed', 'true');
    } catch (e) {
      // ignore
    }
  };

  if (isDismissed || announcements.length === 0) {
    return null;
  }

  const current = announcements[currentIndex % announcements.length];
  const IconComponent = ICON_MAP[current.icon] || Flame;

  const handleCtaClick = (e) => {
    if (current.actionType === 'booking') {
      if (onOpenBooking) {
        e.preventDefault();
        onOpenBooking();
      }
    }
  };

  return (
    <div 
      className="topbar"
      role="region"
      aria-label="Announcements & Special Offers"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom">
        <div className="announcement-wrap">
          
          {/* Announcement Content & Slider */}
          <div className="announcement-slider-area">
            {/* Pulsing Highlight Badge */}
            <div className="announcement-badge">
              <span className="announcement-pulse-dot" aria-hidden="true" />
              <IconComponent size={12} style={{ flexShrink: 0 }} />
              <span>{current.badge}</span>
            </div>

            {/* Dynamic Text with fade transition */}
            <div 
              className="announcement-content"
              style={{
                opacity: isFading ? 0 : 1,
                transform: isFading ? 'translateY(2px)' : 'translateY(0)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              <span className="announcement-message announcement-message-desktop">
                {current.desktopText}
              </span>
              <span className="announcement-message announcement-message-mobile">
                {current.mobileText}
              </span>

              {/* Call-to-Action Link/Button */}
              {current.actionType === 'external' ? (
                <a
                  href={current.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="announcement-cta"
                >
                  <span>{current.ctaText}</span>
                  <ArrowRight size={12} />
                </a>
              ) : current.actionType === 'booking' && onOpenBooking ? (
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="announcement-cta"
                >
                  <span>{current.ctaText}</span>
                  <ArrowRight size={12} />
                </button>
              ) : (
                <Link
                  href={current.href}
                  onClick={handleCtaClick}
                  className="announcement-cta"
                >
                  <span>{current.ctaText}</span>
                  <ArrowRight size={12} />
                </Link>
              )}
            </div>
          </div>

          {/* Right Controls: Prev / Next / Dismiss */}
          <div className="announcement-actions">
            <button
              type="button"
              onClick={handlePrev}
              className="announcement-icon-btn announcement-nav-btn"
              aria-label="Previous announcement"
              title="Previous"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="announcement-icon-btn announcement-nav-btn"
              aria-label="Next announcement"
              title="Next"
            >
              <ChevronRight size={15} />
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="announcement-icon-btn"
              aria-label="Dismiss announcement"
              title="Dismiss announcement"
            >
              <X size={15} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
