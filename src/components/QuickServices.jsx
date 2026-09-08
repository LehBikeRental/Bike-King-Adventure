"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bike, Car, Compass, Building2, Snowflake, Sparkles, ArrowRight } from 'lucide-react';
import { quickServicesData as staticQuickServicesData } from '../data/reviews';
import { supabase } from '../lib/supabase';

const COLOR_MAP = {
  bike: { bg: 'rgba(234, 88, 12, 0.12)', color: '#EA580C' },
  car: { bg: 'rgba(37, 99, 235, 0.12)', color: '#2563EB' },
  traveler: { bg: 'rgba(5, 150, 105, 0.12)', color: '#059669' },
  hotel: { bg: 'rgba(124, 58, 237, 0.12)', color: '#7C3AED' },
  'snow-leopard': { bg: 'rgba(8, 145, 178, 0.12)', color: '#0891B2' },
  'frozen-lake': { bg: 'rgba(2, 132, 199, 0.12)', color: '#0284C7' },
};

const DEFAULT_ITEMS = staticQuickServicesData.map((item) => ({
  id: item.id,
  title: item.title,
  desc: item.desc,
  iconType: item.iconType,
  link: undefined,
}));

export default function QuickServices() {
  const [items, setItems] = useState(DEFAULT_ITEMS);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('home_content')
          .select('data')
          .eq('section_key', 'quick_services')
          .single();
        if (!error && isMounted && data?.data?.items?.length) {
          setItems(data.data.items);
        }
      } catch (err) {
        console.warn('Falling back to default quick services content:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

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

  const getServiceLink = (item) => {
    if (item.link) return item.link;
    switch (item.id) {
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
          {items.map((item) => {
            const colors = COLOR_MAP[item.iconType] || COLOR_MAP.bike;
            return (
              <Link
                key={item.id}
                href={getServiceLink(item)}
                className="quick-service-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {/* Top-Left: Circular pastel icon badge */}
                <div
                  className="quick-service-badge"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.color
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
                    backgroundColor: colors.bg,
                    color: colors.color
                  }}
                  aria-label={`Explore ${item.title} in Services`}
                >
                  <ArrowRight size={17} strokeWidth={2.5} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
