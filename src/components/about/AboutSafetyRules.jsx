"use client";

import React, { useState } from 'react';
import { Activity, Droplets, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SAFETY_TABS_DATA } from '../../data/about';

export default function AboutSafetyRules() {
  const [activeTab, setActiveTab] = useState('acclimatization');

  return (
    <section className="container-custom" style={{ paddingBottom: '60px' }}>
      <div className="safety-hub-container">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--primary-orange)', padding: '5px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
            <Activity size={14} />
            <span>Safety Is Never An Option — It's Our Law</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A' }}>
            High-Altitude Safety & Acclimatization Hub
          </h2>
          <p style={{ color: '#475569', fontSize: '0.88rem' }}>
            Essential medical and mechanical knowledge for surviving and thriving at 11,500+ feet.
          </p>
        </div>

        {/* Safety Tabs */}
        <div className="safety-nav-tabs">
          <button
            type="button"
            onClick={() => setActiveTab('acclimatization')}
            className={`safety-tab-btn ${activeTab === 'acclimatization' ? 'active' : ''}`}
          >
            <Droplets size={16} />
            <span>Acclimatization Rules</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bikePrep')}
            className={`safety-tab-btn ${activeTab === 'bikePrep' ? 'active' : ''}`}
          >
            <Wrench size={16} />
            <span>Bike Mountain Prep</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('roadsideSupport')}
            className={`safety-tab-btn ${activeTab === 'roadsideSupport' ? 'active' : ''}`}
          >
            <ShieldCheck size={16} />
            <span>24/7 Roadside Rescue</span>
          </button>
        </div>

        {/* Active Safety Content Card */}
        <div className="safety-content-box">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
            {SAFETY_TABS_DATA[activeTab].title}
          </h3>
          {SAFETY_TABS_DATA[activeTab].subtitle && (
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '16px' }}>
              {SAFETY_TABS_DATA[activeTab].subtitle}
            </p>
          )}
          <div className="safety-points-grid">
            {SAFETY_TABS_DATA[activeTab].points.map((point, idx) => (
              <div key={idx} className="safety-point-card">
                <CheckCircle2 size={18} color="#EA580C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.88rem', color: '#1E293B', lineHeight: 1.6 }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
