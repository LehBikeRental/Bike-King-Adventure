"use client";

import React from 'react';
import { Activity } from 'lucide-react';

export default function AmsSafetyProtocol() {
  return (
    <section className="container-custom" style={{ paddingBottom: '60px' }}>
      <div style={{ background: '#FFFFFF', border: '1px solid rgba(14, 165, 233, 0.2)', borderRadius: 'var(--radius-xl)', padding: '32px', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Activity size={24} color="#EA580C" />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
            High-Altitude Acclimatization & AMS Safety Guide
          </h3>
        </div>
        <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
          Leh is situated at 11,500 ft (3,500 m) above sea level. Acclimatization is essential to ensure a headache-free, enjoyable holiday. 
          Here is our golden rule protocol followed on all Biker King expeditions:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#EA580C', marginBottom: '4px' }}>Day 1</div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>Mandatory Rest</h4>
            <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>Do not visit Khardung La or ride on Day 1. Rest in your hotel room to let your body adjust to lower oxygen.</p>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0284C7', marginBottom: '4px' }}>Hydrate</div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>Drink 4-5 Litres</h4>
            <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>Dry mountain air causes rapid dehydration. Drink water, garlic soup, and ORS electrolytes continuously.</p>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10B981', marginBottom: '4px' }}>Medical</div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>Oxygen Cylinders</h4>
            <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>Our backup vehicles carry medical oxygen and oximeters. Contact your trip marshal immediately if feeling dizzy.</p>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#7C3AED', marginBottom: '4px' }}>Clothing</div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>Layering Strategy</h4>
            <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>Pangong temperatures drop to -5°C even in summer. Carry windproof jackets, thermal innerwear, and UV sunglasses.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
