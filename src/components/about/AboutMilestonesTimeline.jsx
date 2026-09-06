"use client";

import React, { useState } from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { COMPANY_MILESTONES } from '../../data/about';

export default function AboutMilestonesTimeline() {
  const [activeMilestone, setActiveMilestone] = useState(0);

  return (
    <section className="container-custom" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--primary-orange)', padding: '5px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
          <Sparkles size={14} />
          <span>Our Journey Over The Years</span>
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A' }}>
          The Biker King Chronicles
        </h2>
        <p style={{ color: '#475569', fontSize: '0.88rem' }}>
          Click through our milestone years to see how we grew into Leh's most trusted rental house.
        </p>
      </div>

      {/* Timeline Year Tabs */}
      <div className="timeline-tabs-row">
        {COMPANY_MILESTONES.map((m, idx) => (
          <button
            key={m.year}
            type="button"
            onClick={() => setActiveMilestone(idx)}
            className={`timeline-tab-btn ${activeMilestone === idx ? 'active' : ''}`}
          >
            <span className="timeline-year">{m.year}</span>
            <span className="timeline-title-short">{m.title}</span>
          </button>
        ))}
      </div>

      {/* Active Milestone Card */}
      <div className="timeline-active-card">
        <div className="timeline-badge-year">{COMPANY_MILESTONES[activeMilestone].year}</div>
        <h3 className="timeline-active-title">{COMPANY_MILESTONES[activeMilestone].title}</h3>
        <p className="timeline-active-desc">{COMPANY_MILESTONES[activeMilestone].desc}</p>
      </div>
    </section>
  );
}
