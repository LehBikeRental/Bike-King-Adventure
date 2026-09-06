"use client";

import React from 'react';
import { FileCheck, ShieldCheck, Fuel, AlertTriangle } from 'lucide-react';

export default function RentalGuidelines() {
  const guidelines = [
    {
      icon: FileCheck,
      color: '#EA580C',
      title: 'Original Driving License',
      desc: 'Mandatory original physical Driving License (Motorcycle with gear). Digital soft copies or Learner licenses are strictly not accepted per Ladakh RTO.'
    },
    {
      icon: ShieldCheck,
      color: '#0284C7',
      title: 'Refundable Security Deposit',
      desc: '₹5,000 per motorcycle deposited at handoff via UPI or Cash. Fully refunded immediately upon returning the bike with no accidental damage.'
    },
    {
      icon: Fuel,
      color: '#10B981',
      title: 'Fuel Policy (Tank-to-Tank)',
      desc: 'Motorcycle is handed over with sufficient fuel to reach the Leh main filling station. Please return at the same fuel level.'
    },
    {
      icon: AlertTriangle,
      color: '#7C3AED',
      title: 'Zero Riding Restrictions',
      desc: 'All our bikes are 100% legal & registered under Ladakh Bike Rental Association. Ride freely anywhere in Nubra, Pangong, Hanle, and Zanskar.'
    }
  ];

  return (
    <section className="container-custom" style={{ paddingBottom: '60px' }}>
      <div style={{ background: '#FFFFFF', border: '1px solid rgba(14, 165, 233, 0.2)', borderRadius: 'var(--radius-xl)', padding: '32px', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0F172A' }}>
            Rental Guidelines & Handover Terms
          </h3>
          <p style={{ color: '#475569', fontSize: '0.88rem', marginTop: '4px' }}>
            Transparent procedures so you can hit the mountain highway in under 10 minutes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {guidelines.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-full)', background: `${item.color}15`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <IconComp size={20} />
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>{item.title}</h4>
                <p style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
