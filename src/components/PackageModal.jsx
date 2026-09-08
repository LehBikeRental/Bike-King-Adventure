"use client";

import React from 'react';
import Image from 'next/image';
import { X, Check, Utensils, Building2, Bike, FileCheck, ArrowRight, MapPin, MessageCircle, Calendar } from 'lucide-react';
import { useContactInfo } from '../lib/useContactInfo';

export default function PackageModal({ pkg, isOpen, onClose, onBookPackage }) {
  const contact = useContactInfo();

  if (!isOpen || !pkg) return null;

  const getAmenityIcon = (name) => {
    switch (name) {
      case 'Meals':
        return <Utensils size={14} color="#EA580C" />;
      case 'Hotel':
        return <Building2 size={14} color="#0284C7" />;
      case 'Sightseeing':
        return <Bike size={14} color="#10B981" />;
      case 'Permit':
        return <FileCheck size={14} color="#7C3AED" />;
      default:
        return <FileCheck size={14} color="#EA580C" />;
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Biker King Adventure! I want to inquire about the package: ${pkg.title} (${pkg.duration}). Please share details and availability!`
  );

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-dialog"
        style={{
          maxWidth: '720px',
          width: '94%',
          background: '#FFFFFF',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: 0
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Banner Header */}
        <div style={{ position: 'relative', height: '210px', width: '100%', flexShrink: 0 }}>
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 720px"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(9,13,22,0.85) 100%)'
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              zIndex: 20,
              background: 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-full)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          {/* Banner Title & Info */}
          <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', zIndex: 10, color: '#FFFFFF' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: '#EA580C',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}>
              <Calendar size={12} />
              <span>{pkg.duration}</span>
            </span>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.15, margin: 0 }}>
              {pkg.title}
            </h2>
            
            <p style={{ fontSize: '0.825rem', color: '#CBD5E1', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} color="#FF9838" />
              <span>{pkg.route}</span>
            </p>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '20px 24px' }}>
          
          {/* Price & Inclusions Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '16px',
            borderBottom: '1px solid #E2E8F0'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                Tour Cost Per Person
              </span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: '#EA580C', margin: 0 }}>
                {pkg.priceDisplay}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {pkg.inclusions.map((inc, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#334155',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  {getAmenityIcon(inc.name)}
                  <span>{inc.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights Checklist */}
          {pkg.highlights && pkg.highlights.length > 0 && (
            <div style={{ marginTop: '18px' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#0F172A', marginBottom: '10px', letterSpacing: '0.04em' }}>
                Tour Highlights
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
                {pkg.highlights.map((hl, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.83rem', color: '#334155', background: '#F0FDF4', border: '1px solid #DCFCE7', padding: '8px 10px', borderRadius: '8px' }}>
                    <Check size={14} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day-wise Itinerary (No nested scrollbar!) */}
          {pkg.itinerary && pkg.itinerary.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#0F172A', marginBottom: '12px', letterSpacing: '0.04em' }}>
                Day-by-Day Itinerary
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pkg.itinerary.map((item, idx) => (
                  <div key={idx} style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderLeft: '4px solid #EA580C',
                    borderRadius: '8px',
                    padding: '12px 14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.725rem', fontWeight: 800, background: '#EA580C', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        {item.day}
                      </span>
                      <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        {item.title}
                      </h5>
                    </div>
                    <p style={{ fontSize: '0.83rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Pinned Bottom Action Bar */}
        <div style={{
          flexShrink: 0,
          padding: '14px 24px',
          borderTop: '1px solid #E2E8F0',
          background: '#F8FAFC',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => {
              onClose();
              if (onBookPackage) onBookPackage(pkg);
            }}
            className="btn-primary-orange"
            style={{
              padding: '11px 22px',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span>BOOK THIS TOUR NOW</span>
            <ArrowRight size={16} style={{ marginLeft: '6px' }} />
          </button>
          
          <a
            href={`https://wa.me/${contact.whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', padding: '11px 20px', fontSize: '0.825rem', whiteSpace: 'nowrap' }}
          >
            <MessageCircle size={15} color="#25D366" style={{ marginRight: '6px' }} />
            <span>WhatsApp Inquiry</span>
          </a>
        </div>

      </div>
    </div>
  );
}

