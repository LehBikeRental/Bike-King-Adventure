"use client";

import React from 'react';
import { CheckCircle2, ShieldCheck, Check } from 'lucide-react';

export default function InclusionsExclusionsBox() {
  const inclusions = [
    'Stay in 3-Star Deluxe Hotels & Luxury Swiss Camps (Pangong/Nubra)',
    'Buffet Breakfast & Dinner throughout the tour',
    'Royal Enfield Bike / Private 4x4 Cab with fuel included',
    'Certified Leh Ladakh Inner Line Permits (ILP)',
    'Wildlife & Environmental Green Entry Fees',
    'Road Captain & Certified Royal Enfield Mechanic van',
    'Emergency Oxygen Cylinder and Pulse Oximeter'
  ];

  const exclusions = [
    'Airfare / Flight tickets to and from Leh (IXL)',
    'Lunch during road travel & personal snacks',
    'Monument entry tickets & photography charges',
    'Personal riding gear (available on daily hire at our shop)',
    'Personal travel and medical insurance',
    'Tips to driver, mechanic, and camp staff'
  ];

  return (
    <section className="container-custom" style={{ paddingBottom: '48px' }}>
      <div style={{ background: '#FFFFFF', border: '1px solid rgba(14, 165, 233, 0.2)', borderRadius: 'var(--radius-xl)', padding: '32px', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.08)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A' }}>
            Package Inclusions & Transparent Policies
          </h3>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '4px' }}>
            Zero hidden costs. Everything you need for high-altitude survival and comfort is included.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {/* Inclusions */}
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 'var(--radius-lg)', padding: '22px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#166534', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <CheckCircle2 size={20} color="#16A34A" />
              <span>What Is Always Included</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {inclusions.map((item, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: '#14532D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#16A34A" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 'var(--radius-lg)', padding: '22px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#9A3412', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <ShieldCheck size={20} color="#EA580C" />
              <span>Exclusions (Clear & Transparent)</span>
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {exclusions.map((item, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: '#7C2D12', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 800 }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
