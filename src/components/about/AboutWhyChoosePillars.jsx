"use client";

import React from 'react';
import { Compass, Wrench, ShieldCheck, HeartHandshake } from 'lucide-react';
import { WHY_CHOOSE_PILLARS } from '../../data/about';

const ICON_MAP = { Compass, Wrench, ShieldCheck, HeartHandshake };

export default function AboutWhyChoosePillars() {
  return (
    <section className="container-custom about-why-choose-section">
      <div style={{ textAlign: 'center' }}>
        <div className="section-badge-header">
          <h2 className="title-divider">WHY CHOOSE BIKER KING ADVENTURE</h2>
        </div>
        <p className="about-pillars-desc">
          We combine high-altitude technical mastery with genuine Ladakhi hospitality to ensure your road trip is seamless, safe, and unforgettable.
        </p>

        <div className="features-pillar-grid">
          {WHY_CHOOSE_PILLARS.map((pillar, idx) => {
            const IconComp = ICON_MAP[pillar.icon] || Compass;
            return (
              <div key={idx} className="pillar-card">
                <div className="pillar-icon-box">
                  <IconComp size={24} />
                </div>
                <h4>{pillar.title}</h4>
                <p>{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
