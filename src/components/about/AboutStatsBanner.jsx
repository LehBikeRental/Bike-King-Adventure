"use client";

import React from 'react';
import { ABOUT_STATS } from '../../data/about';

export default function AboutStatsBanner() {
  return (
    <div className="container-custom" style={{ marginTop: '-24px', position: 'relative', zIndex: 10 }}>
      <div className="stats-banner-grid">
        {ABOUT_STATS.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
            {stat.subtext && (
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
                {stat.subtext}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
