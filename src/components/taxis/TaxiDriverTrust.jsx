"use client";

import React from 'react';
import { ShieldCheck, Award, Snowflake, Clock } from 'lucide-react';
import { driverTrustBadges } from '../../data/taxis';

export default function TaxiDriverTrust() {
  const icons = [ShieldCheck, Award, Snowflake, Clock];
  const colors = ['#EA580C', '#0284C7', '#10B981', '#7C3AED'];

  return (
    <section className="container-custom" style={{ paddingBottom: '60px' }}>
      <div style={{ background: '#FFFFFF', border: '1px solid rgba(14, 165, 233, 0.2)', borderRadius: 'var(--radius-xl)', padding: '32px', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0F172A' }}>
            Why Travel With Biker King Mountain Cabs?
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#475569', marginTop: '4px' }}>
            Safety and high-altitude expertise are our highest virtues.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {driverTrustBadges.map((badge, idx) => {
            const IconComp = icons[idx % icons.length];
            const color = colors[idx % colors.length];
            return (
              <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '18px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-full)', background: `${color}15`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                  <IconComp size={20} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>{badge.title}</h4>
                <p style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  {badge.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
