"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, MessageCircle, Heart, CheckCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { supabase } from '../lib/supabase';
import { useContactInfo } from '../lib/useContactInfo';

const DEFAULT_CONTENT = {
  tagline: 'Your trusted adventure partner in Leh Ladakh. Ride more, worry less!',
  newsletterTitle: 'NEWSLETTER',
  newsletterSubtitle: 'Subscribe to get updates & exclusive offers.',
  copyrightText: 'Biker King Adventure. All Rights Reserved.',
};

export default function Footer({ onOpenBooking }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const contact = useContactInfo();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('home_content')
          .select('data')
          .eq('section_key', 'footer')
          .single();
        if (!error && isMounted && data?.data) {
          setContent({ ...DEFAULT_CONTENT, ...data.data });
        }
      } catch (err) {
        console.warn('Falling back to default footer content:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await supabase.from('newsletter_subscribers').insert([{ email }]);
    } catch (err) {
      console.warn('Newsletter subscription save error:', err);
    }

    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container-custom">
        
        <div className="footer-columns-grid">
          
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <BrandLogo size={52} showText={true} isLight={true} />
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--slate-400)', lineHeight: 1.5, marginBottom: '16px', maxWidth: '240px' }}>
              {content.tagline}
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--slate-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--slate-300)',
                  transition: 'all 0.2s'
                }}
              >
                <Instagram size={14} />
              </a>
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--slate-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--slate-300)',
                  transition: 'all 0.2s'
                }}
              >
                <Facebook size={14} />
              </a>
              <a
                href={contact.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--slate-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--slate-300)',
                  transition: 'all 0.2s'
                }}
              >
                <Youtube size={14} />
              </a>
              <a
                href={`https://wa.me/${contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--slate-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--slate-300)',
                  transition: 'all 0.2s'
                }}
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-links-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Our Services</Link></li>
              <li><Link href="/bikes">Bike Rental Fleet</Link></li>
              <li><Link href="/taxis">4x4 Mountain Taxis</Link></li>
              <li><Link href="/packages">Tour Packages</Link></li>
            </ul>
          </div>

          {/* Column 3: Other Links */}
          <div>
            <h4 className="footer-col-title">OTHER LINKS</h4>
            <ul className="footer-links-list">
              <li><Link href="/about">Our Himalayan Story</Link></li>
              <li><Link href="/services#hotels">Hotels & Swiss Camps</Link></li>
              <li><Link href="/bikes#gear-rental">Riding Gear Rental</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/services#snow-leopard">Winter Expeditions</Link></li>
            </ul>
          </div>

          {/* Column 4: Our Services */}
          <div>
            <h4 className="footer-col-title">OUR SERVICES</h4>
            <ul className="footer-links-list">
              <li><Link href="/bikes">Royal Enfield Bike Rental</Link></li>
              <li><Link href="/taxis">Taxi & 4x4 Leh Ladakh</Link></li>
              <li><Link href="/packages">Motorcycle Tour Packages</Link></li>
              <li><Link href="/services#hotels">Hotel & Resort Booking</Link></li>
              <li><Link href="/services#snow-leopard">Snow Leopard Winter Tour</Link></li>
              <li><Link href="/services#frozen-pangong">Frozen Pangong Lake Drive</Link></li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h4 className="footer-col-title">{content.newsletterTitle}</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginBottom: '12px' }}>
              {content.newsletterSubtitle}
            </p>

            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '0.75rem', fontWeight: 600 }}>
                <CheckCircle size={15} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="footer-newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn-primary-orange"
                  style={{ width: '100%', padding: '8px 16px', fontSize: '0.75rem' }}
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} {content.copyrightText}
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</a>
            <span>|</span>
            <a href="#privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Designed with</span>
            <Heart size={12} fill="#EF4444" stroke="#EF4444" />
            <span>for Riders</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
