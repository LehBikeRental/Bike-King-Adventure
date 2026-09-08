"use client";

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { servicesList as staticServicesList } from '../../data/services';
import { supabase } from '../../lib/supabase';
import { useContactInfo } from '../../lib/useContactInfo';
import ServiceDetailsModal from '../ServiceDetailsModal';

function mapDbService(row) {
  return {
    id: row.slug || row.id,
    category: row.category,
    badge: row.badge,
    title: row.title,
    shortTitle: row.short_title,
    iconName: row.icon_name,
    desc: row.description,
    media: row.image_url,
    dedicatedUrl: row.dedicated_url || undefined,
    features: Array.isArray(row.features) ? row.features : [],
    price: row.price,
    ctaText: row.cta_text,
    bookingType: row.booking_type,
  };
}

export default function ServicesDirectoryList({ onOpenBooking }) {
  const contact = useContactInfo();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [servicesList, setServicesList] = useState(staticServicesList);
  const [detailsItem, setDetailsItem] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (!error && isMounted && Array.isArray(data) && data.length > 0) {
          setServicesList(data.map(mapDbService));
        }
      } catch (err) {
        console.warn('Falling back to static services list:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const uniqueCategories = Array.from(
    new Set(servicesList.map((s) => s.category).filter(Boolean))
  );

  const categories = [
    { id: 'all', label: 'All Services' },
    ...uniqueCategories.map((cat) => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    })),
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

  const filteredServices = servicesList
    .filter((service) => {
      if (activeCategory === 'all') return true;
      return service.category === activeCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <section className="container-custom" id="all-services" style={{ paddingTop: '40px', paddingBottom: '48px' }}>
      
      {/* Filter & Sort Bar */}
      <div className="packages-filter-bar" style={{ marginBottom: '28px' }}>
        <div className="packages-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`packages-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SlidersHorizontal size={14} color="#64748B" />
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '0.8rem',
              color: '#0F172A',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="recommended">Recommended</option>
            <option value="title-asc">Title: A to Z</option>
          </select>
        </div>
      </div>

      {/* Services Grid (Uniform Equal Height Cards) */}
      <div className="packages-dedicated-grid">
        {filteredServices.map((svc) => (
          <div
            key={svc.id}
            className="package-detailed-card"
            onClick={() => {
              setDetailsItem(svc);
              setDetailsOpen(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            
            {/* Image Wrap */}
            <div className="package-detailed-img-wrap">
              <Image
                src={svc.media}
                alt={svc.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
              
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: '#EA580C',
                color: '#FFFFFF',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Sparkles size={11} />
                <span>{svc.badge || 'Official Service'}</span>
              </span>
            </div>

            {/* Card Body */}
            <div className="package-detailed-body">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-full)', background: 'rgba(234, 88, 12, 0.1)', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {getServiceIcon(svc.iconName)}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#EA580C', textTransform: 'uppercase' }}>
                    {svc.shortTitle}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px', lineHeight: 1.3 }}>
                  {svc.title}
                </h3>
                
                <p style={{ fontSize: '0.83rem', color: '#475569', lineHeight: 1.45, marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {svc.desc}
                </p>

                {/* Features List */}
                <div className="package-highlights-list" style={{ marginBottom: '12px' }}>
                  {svc.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="package-highlight-item">
                      <CheckCircle2 size={13} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '14px', marginTop: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                    Pricing Rate
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#EA580C' }}>
                    {svc.price}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailsItem(svc);
                      setDetailsOpen(true);
                    }}
                    style={{
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      color: '#0F172A',
                      borderRadius: 'var(--radius-sm)',
                      padding: '7px 10px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                  >
                    <Eye size={13} color="#EA580C" style={{ flexShrink: 0 }} />
                    <span style={{ whiteSpace: 'nowrap' }}>See Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenBooking) onOpenBooking(svc, svc.bookingType || 'service');
                    }}
                    className="btn-primary-orange"
                    style={{ padding: '7px 12px', fontSize: '0.78rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    <span>Reserve</span>
                    <ArrowRight size={13} style={{ marginLeft: '4px', flexShrink: 0 }} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Service Details Modal */}
      <ServiceDetailsModal
        item={detailsItem}
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onBookService={(item, type) => onOpenBooking && onOpenBooking(item, type)}
      />

    </section>
  );
}
