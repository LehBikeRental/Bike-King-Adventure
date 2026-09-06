"use client";

import React from 'react';
import Link from 'next/link';
import { Compass, Bike, ShieldCheck, Sun, Headphones } from 'lucide-react';
import { whyChooseData } from '../data/reviews';

export default function WhyChooseUs() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Compass':
        return <Compass size={22} />;
      case 'Bike':
        return <Bike size={22} />;
      case 'ShieldCheck':
        return <ShieldCheck size={22} />;
      case 'Sun':
        return <Sun size={22} />;
      case 'Headphones':
        return <Headphones size={22} />;
      default:
        return <Compass size={22} />;
    }
  };

  return (
    <div className="why-choose-box" id="about-us">
      <h2 className="why-choose-title">
        WHY CHOOSE<br />
        <span className="why-choose-brand-name">BIKER KING ADVENTURE?</span>
      </h2>

      <div className="why-choose-grid">
        {whyChooseData.map((item) => (
          <div key={item.id} className="why-choose-item">
            <div className="why-choose-icon-wrap">
              {getIcon(item.icon)}
            </div>
            <div>
              <h3 className="why-choose-item-title">{item.title}</h3>
              <p className="why-choose-item-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <Link 
          href="/about" 
          style={{ 
            color: 'var(--primary-orange)', 
            fontWeight: 700, 
            fontSize: '0.8125rem', 
            textDecoration: 'none', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px' 
          }}
        >
          <span>Learn more about our Ladakhi team & history</span> &rarr;
        </Link>
      </div>
    </div>
  );
}
