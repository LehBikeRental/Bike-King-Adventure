"use client";

import React from 'react';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { preTripChecklistData } from '../../data/services';

export default function ExpeditionChecklist() {
  return (
    <section className="container-custom" style={{ paddingBottom: '60px' }}>
      <div className="pre-trip-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <HelpCircle size={22} color="#EA580C" />
          <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Mandatory Pre-Trip Expedition Checklist
          </h3>
        </div>

        <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '22px' }}>
          Please ensure these 4 prerequisites are addressed prior to commencing your motorcycle ride or high-altitude mountain expedition in Leh Ladakh:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {preTripChecklistData.map((item, idx) => (
            <div key={idx} className="pre-trip-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <ShieldCheck size={16} color="#10B981" />
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  {item.title}
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
