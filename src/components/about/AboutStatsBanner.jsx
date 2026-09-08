"use client";

import React from 'react';
import { ABOUT_STATS } from '../../data/about';

export default function AboutStatsBanner() {
  return (
    <div className="container-custom about-stats-container">
      <div className="stats-banner-grid">
        {ABOUT_STATS.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
