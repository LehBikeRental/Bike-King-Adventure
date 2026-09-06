"use client";

import React from 'react';
import Image from 'next/image';
import { X, Check, Utensils, Building2, Bike, FileCheck, ArrowRight, MapPin } from 'lucide-react';

export default function PackageModal({ pkg, isOpen, onClose, onBookPackage }) {
  if (!isOpen || !pkg) return null;

  const getAmenityIcon = (name) => {
    switch (name) {
      case 'Meals':
        return <Utensils size={16} />;
      case 'Hotel':
        return <Building2 size={16} />;
      case 'Sightseeing':
        return <Bike size={16} />;
      case 'Permit':
        return <FileCheck size={16} />;
      default:
        return <FileCheck size={16} />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: '680px', background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#0F172A', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Banner Header */}
        <div style={{ position: 'relative', height: '220px', width: '100%' }}>
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            style={{ objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(9,13,22,0.85) 100%)'
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'var(--white)',
              borderRadius: 'var(--radius-full)',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          {/* Banner Title */}
          <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', zIndex: 5, color: 'var(--white)' }}>
            <span className="package-day-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '6px' }}>
              {pkg.duration}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.15 }}>
              {pkg.title}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '4px' }}>
              📍 {pkg.route}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          
          {/* Price & Inclusions Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #E2E8F0'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                Tour Cost Per Person
              </span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary-orange)' }}>
                {pkg.priceDisplay}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              {pkg.inclusions.map((inc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                  <div style={{ color: 'var(--primary-orange)' }}>
                    {getAmenityIcon(inc.name)}
                  </div>
                  <span>{inc.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          {pkg.highlights && (
            <div style={{ marginTop: '18px' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: '#0F172A', marginBottom: '8px' }}>
                Tour Highlights
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                {pkg.highlights.map((hl, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.85rem', color: '#334155' }}>
                    <Check size={14} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day-wise Itinerary */}
          {pkg.itinerary && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: '#0F172A', marginBottom: '10px' }}>
                Day-by-Day Itinerary
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto', paddingRight: '6px' }}>
                {pkg.itinerary.map((item, idx) => (
                  <div key={idx} style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.775rem', fontWeight: 800, background: 'var(--primary-orange)', color: 'var(--white)', padding: '2px 6px', borderRadius: '3px' }}>
                        {item.day}
                      </span>
                      <h5 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A' }}>
                        {item.title}
                      </h5>
                    </div>
                    <p style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.45 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                onClose();
                if (onBookPackage) onBookPackage(pkg);
              }}
              className="btn-primary-orange"
              style={{ flex: 1, padding: '12px', fontSize: '0.875rem' }}
            >
              BOOK THIS TOUR NOW <ArrowRight size={16} />
            </button>
            <a
              href={`https://wa.me/919797948265?text=Hi%20Biker%20King,%20I%20am%20interested%20in%20${encodeURIComponent(pkg.title)}%20package`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', padding: '12px 20px', fontSize: '0.85rem' }}
            >
              WhatsApp Inquiry
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
