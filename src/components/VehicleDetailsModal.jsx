"use client";

import React from 'react';
import Image from 'next/image';
import { X, Check, ArrowRight, ShieldCheck, Zap, Fuel, Gauge, Users, Luggage, MessageCircle, Sparkles } from 'lucide-react';
import { useContactInfo } from '../lib/useContactInfo';

export default function VehicleDetailsModal({ item, type = 'bike', isOpen, onClose, onBookItem }) {
  const contact = useContactInfo();

  if (!isOpen || !item) return null;

  const isBike = type === 'bike';
  const title = item.name || 'Vehicle Details';
  const priceDisplay = item.priceDisplay || item.startingRate || (item.price ? `₹${item.price.toLocaleString('en-IN')} / Day` : 'Contact for Rate');

  const defaultBikeFeatures = [
    'Tuned specifically for thin high-altitude air (FI/Carb pre-calibrated)',
    'Pre-fitted with heavy duty carrier luggage rack & crash guard',
    'Includes 24/7 emergency satellite call roadside assistance in remote passes',
    'Verified local Leh town permits pre-arranged for Khardung La & Pangong',
    'Helmets and basic maintenance tool kit provided at handover'
  ];

  const defaultTaxiFeatures = [
    'Emergency Portable Medical Oxygen Cylinder & Oximeter onboard',
    'High-altitude heater & dual climate AC',
    'Snow chains and heavy-duty all-terrain mountain tyres',
    'Driven by native Ladakhi driver with 10+ years high-pass experience',
    'All Leh Taxi Union standard tariffs with zero hidden charges'
  ];

  const featuresList = (Array.isArray(item.features) && item.features.length > 0)
    ? item.features
    : (isBike ? defaultBikeFeatures : defaultTaxiFeatures);

  const whatsappMessage = encodeURIComponent(
    `Hi Biker King Adventure! I would like to inquire about the ${title} (${priceDisplay}). Please provide availability for my trip dates!`
  );

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-dialog"
        style={{
          maxWidth: '780px',
          width: '92%',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '24px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            color: '#0F172A',
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

        {/* Scrollable Container */}
        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
          
          {/* 2-Column Responsive Layout Grid */}
          <div className="vehicle-modal-grid">
            
            {/* Left Column: 1:1 Image Showcase & Quick Specs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* 1:1 Square Image Container */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'radial-gradient(circle, #F8FAFC 0%, #EFF6FF 100%)',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
              }}>
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94A3B8' }}>
                    No image available
                  </div>
                )}

                {/* Badge */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  zIndex: 5,
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#FF9838',
                  border: '1px solid rgba(255, 152, 56, 0.3)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  <Sparkles size={11} style={{ display: 'inline', marginRight: '4px' }} />
                  {item.badge || (isBike ? 'Mountain Tested' : 'Union Approved')}
                </span>
              </div>

              {/* Quick Spec Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {isBike ? (
                  <>
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 6px', borderRadius: '8px', textAlign: 'center' }}>
                      <Zap size={15} color="#EA580C" style={{ margin: '0 auto 2px auto' }} />
                      <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Power</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0F172A' }}>{item.power ? item.power.split('@')[0] : '20+ PS'}</span>
                    </div>
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 6px', borderRadius: '8px', textAlign: 'center' }}>
                      <Gauge size={15} color="#EA580C" style={{ margin: '0 auto 2px auto' }} />
                      <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Clearance</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0F172A' }}>{item.groundClearance || '200 mm'}</span>
                    </div>
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 6px', borderRadius: '8px', textAlign: 'center' }}>
                      <Fuel size={15} color="#EA580C" style={{ margin: '0 auto 2px auto' }} />
                      <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Tank</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0F172A' }}>{item.fuelCapacity || '15 L'}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 6px', borderRadius: '8px', textAlign: 'center' }}>
                      <Users size={15} color="#EA580C" style={{ margin: '0 auto 2px auto' }} />
                      <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Seating</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0F172A' }}>{item.seats || '6+1'}</span>
                    </div>
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 6px', borderRadius: '8px', textAlign: 'center' }}>
                      <Luggage size={15} color="#EA580C" style={{ margin: '0 auto 2px auto' }} />
                      <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Luggage</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0F172A' }}>{item.luggage ? item.luggage.split('+')[0] : '3 Bags'}</span>
                    </div>
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 6px', borderRadius: '8px', textAlign: 'center' }}>
                      <ShieldCheck size={15} color="#EA580C" style={{ margin: '0 auto 4px auto' }} />
                      <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Drive</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0F172A' }}>4x4 High-Pass</span>
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Right Column: Title, Overview, Full Specs, Pricing & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#EA580C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {isBike ? (item.specs || `${item.type || 'Adventure'} Fleet`) : (item.type ? `${item.type.toUpperCase()} CATEGORY` : '4x4 TAXI')}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: '#0F172A', margin: '2px 0 0 0' }}>
                  {title}
                </h2>
              </div>

              {/* Overview */}
              {(item.description || item.idealFor) && (
                <div style={{ marginBottom: '16px', background: '#F8FAFC', padding: '12px 14px', borderRadius: '10px', borderLeft: '3px solid #EA580C' }}>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    {item.description || item.idealFor}
                  </p>
                </div>
              )}

              {/* Features */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} color="#10B981" />
                  <span>Included Equipment & Features</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {featuresList.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: '#334155' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Bar */}
              <div style={{
                marginTop: 'auto',
                paddingTop: '16px',
                borderTop: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                    Rental Rate / Tariff
                  </span>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 900, color: '#EA580C', margin: 0 }}>
                    {priceDisplay}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <a
                    href={`https://wa.me/${contact.whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-dark"
                    style={{ padding: '9px 14px', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <MessageCircle size={14} color="#25D366" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onBookItem) onBookItem(item);
                    }}
                    className="btn-primary-orange"
                    style={{ padding: '9px 16px', fontSize: '0.825rem' }}
                  >
                    <span>Reserve Now</span>
                    <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
