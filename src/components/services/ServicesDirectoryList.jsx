"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bike, 
  Car, 
  Compass, 
  Building2, 
  Snowflake, 
  Flame, 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { servicesList } from '../../data/services';

export default function ServicesDirectoryList({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: "all", label: "All Services" },
    { id: "bikes", label: "Bikes & Gear" },
    { id: "taxis", label: "4x4 Taxis & Stays" },
    { id: "expeditions", label: "Guided Expeditions" }
  ];

  const getServiceIcon = (name) => {
    switch (name) {
      case 'Bike': return <Bike size={18} />;
      case 'Car': return <Car size={18} />;
      case 'Compass': return <Compass size={18} />;
      case 'Building2': return <Building2 size={18} />;
      case 'Snowflake': return <Snowflake size={18} />;
      case 'Flame': return <Flame size={18} />;
      case 'ShieldCheck': return <ShieldCheck size={18} />;
      case 'FileCheck': return <FileCheck size={18} />;
      default: return <Compass size={18} />;
    }
  };

  const filteredServices = servicesList.filter((service) => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <section className="container-custom" id="all-services" style={{ paddingBottom: '48px' }}>
      
      {/* Header & Filter Tabs */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.01em' }}>
          Complete Adventure & Travel Directory
        </h2>
        <p style={{ color: '#475569', fontSize: '0.9rem', maxWidth: '620px', margin: '6px auto 20px auto' }}>
          From online Inner Line Permits to high-altitude medical support and heated lakeside dome stays.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`service-chip-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 8 Detailed Cards Grid */}
      <div className="services-feature-grid">
        {filteredServices.map((svc) => (
          <div key={svc.id} className="service-feature-card">
            
            {/* Image Wrap */}
            <div className="service-feature-img-wrap">
              <Image
                src={svc.media}
                alt={svc.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, transparent 60%)' }} />
              
              <div className="service-badge-pill">
                <Sparkles size={11} />
                <span>{svc.badge}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="service-feature-body">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getServiceIcon(svc.iconName)}
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#EA580C', textTransform: 'uppercase' }}>
                    {svc.shortTitle}
                  </span>
                </div>

                <h3 className="service-feature-title">{svc.title}</h3>
                <p className="service-feature-desc">{svc.desc}</p>

                {/* Features List */}
                <ul className="service-checklist">
                  {svc.features.map((feat, idx) => (
                    <li key={idx} className="service-check-item">
                      <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Bar */}
              <div className="service-action-bar">
                <div>
                  <span className="service-price-label">Pricing</span>
                  <span className="service-price-tag">{svc.price}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {svc.dedicatedUrl ? (
                    <Link
                      href={svc.dedicatedUrl}
                      className="btn-primary-orange"
                      style={{ padding: '8px 16px', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>{svc.ctaText}</span>
                      <ArrowRight size={13} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => onOpenBooking(svc, svc.bookingType)}
                      className="btn-primary-orange"
                      style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                    >
                      <span>{svc.ctaText}</span>
                      <ArrowRight size={13} style={{ marginLeft: '4px' }} />
                    </button>
                  )}

                  <a
                    href={`https://wa.me/919797948265?text=${encodeURIComponent(`Hi Biker King Adventure, I am interested in: ${svc.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-whatsapp-btn"
                    aria-label={`Chat on WhatsApp about ${svc.title}`}
                  >
                    <MessageCircle size={15} />
                  </a>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
