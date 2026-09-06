"use client";

import React from 'react';
import Link from 'next/link';
import { Bike, Car, Compass, Building2, Snowflake, Sparkles, ArrowRight } from 'lucide-react';
import { quickServicesData } from '../data/reviews';

export default function QuickServices() {
  const getIcon = (item) => {
    switch (item.iconType) {
      case 'bike':
        return <Bike size={24} strokeWidth={2.2} />;
      case 'car':
        return <Car size={24} strokeWidth={2.2} />;
      case 'traveler':
        return <Compass size={24} strokeWidth={2.2} />;
      case 'hotel':
        return <Building2 size={24} strokeWidth={2.2} />;
      case 'snow-leopard':
        return <Snowflake size={24} strokeWidth={2.2} />;
      case 'frozen-lake':
        return <Sparkles size={24} strokeWidth={2.2} />;
      default:
        return <Compass size={24} strokeWidth={2.2} />;
    }
  };

  const getServiceLink = (id) => {
    switch (id) {
      case 'bike-rental':
        return '/bikes';
      case 'taxi-service':
        return '/taxis';
      case 'tour-package':
        return '/packages';
      case 'hotel-availability':
        return '/services#hotels';
      case 'snow-leopard':
        return '/services#snow-leopard';
      case 'frozen-pangong':
        return '/services#frozen-pangong';
      default:
        return '/services';
    }
  };

  return (
    <div className="container-custom" id="destinations">
      <div className="quick-services-bar">
        <div className="quick-services-grid">
          {quickServicesData.map((item) => (
            <Link
              key={item.id}
              href={getServiceLink(item.id)}
              className="quick-service-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {/* Top-Left: Circular pastel icon badge */}
              <div
                className="quick-service-badge"
                style={{
                  backgroundColor: item.badgeBg,
                  color: item.badgeColor
                }}
              >
                {getIcon(item)}
              </div>

              {/* Title & Description */}
              <div className="quick-service-content">
                <h3 className="quick-service-title">{item.title}</h3>
                <p className="quick-service-desc">{item.desc}</p>
              </div>

              {/* Bottom-Right: Circular pastel right arrow button */}
              <div
                className="quick-service-arrow-btn"
                style={{
                  backgroundColor: item.arrowBg,
                  color: item.arrowColor
                }}
                aria-label={`Explore ${item.title} in Services`}
              >
                <ArrowRight size={17} strokeWidth={2.5} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
