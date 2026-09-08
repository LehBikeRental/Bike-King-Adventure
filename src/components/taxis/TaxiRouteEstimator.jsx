"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, Navigation, Clock } from 'lucide-react';
import { ladakhTaxiRoutes as staticTaxiRoutes } from '../../data/taxis';
import { supabase } from '../../lib/supabase';

function mapDbRoute(row) {
  return {
    title: row.title,
    distance: row.distance,
    duration: row.duration,
    passes: row.passes,
    highlights: row.highlights,
    innovaPrice: row.innova_price,
    scorpioPrice: row.scorpio_price,
    tempoPrice: row.tempo_price,
  };
}

export default function TaxiRouteEstimator({ onOpenBooking }) {
  const [ladakhTaxiRoutes, setLadakhTaxiRoutes] = useState(staticTaxiRoutes);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState('innova');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('taxi_routes')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        if (!error && isMounted && Array.isArray(data) && data.length > 0) {
          setLadakhTaxiRoutes(data.map(mapDbRoute));
          setSelectedRouteIndex(0);
        }
      } catch (err) {
        console.warn('Falling back to static taxi routes:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const currentRoute = ladakhTaxiRoutes[selectedRouteIndex] || ladakhTaxiRoutes[0];
  const currentTaxiPrice = selectedVehicle === 'innova'
    ? currentRoute.innovaPrice
    : selectedVehicle === 'scorpio'
    ? currentRoute.scorpioPrice
    : currentRoute.tempoPrice;

  const vehicleLabel = selectedVehicle === 'innova'
    ? 'Toyota Innova Crysta'
    : selectedVehicle === 'scorpio'
    ? 'Mahindra Scorpio 4x4'
    : 'Force Tempo Traveler';

  return (
    <section className="container-custom" style={{ paddingTop: '28px', paddingBottom: '40px' }}>
      <div className="estimator-banner-card">
        
        {/* Header */}
        <div className="estimator-header">
          <div className="estimator-badge">
            <Calculator size={16} />
            <span>Interactive Fare Calculator</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.01em', marginBottom: '8px' }}>
            Instant Ladakh Taxi Fare Estimator
          </h2>
          <p style={{ color: '#475569', fontSize: '0.92rem', maxWidth: '650px', margin: '0 auto' }}>
            Official Leh Taxi Union benchmark rates. Select your preferred circuit and vehicle to see exact fixed pricing with zero hidden charges.
          </p>
        </div>

        {/* Form Controls */}
        <div className="estimator-controls-grid">
          
          {/* Circuit Select */}
          <div className="estimator-field">
            <label className="estimator-label">
              <Navigation size={14} color="#EA580C" />
              <span>Select Destination / Circuit</span>
            </label>
            <select
              value={selectedRouteIndex}
              onChange={(e) => setSelectedRouteIndex(Number(e.target.value))}
              className="estimator-select"
            >
              {ladakhTaxiRoutes.map((route, idx) => (
                <option key={idx} value={idx}>
                  {route.title}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Type Select */}
          <div className="estimator-field">
            <label className="estimator-label">
              <Clock size={14} color="#EA580C" />
              <span>Choose Vehicle Category</span>
            </label>
            <div className="estimator-vehicle-selector">
              <button
                type="button"
                onClick={() => setSelectedVehicle('innova')}
                className={`estimator-veh-btn ${selectedVehicle === 'innova' ? 'active' : ''}`}
              >
                Innova Crysta
              </button>
              <button
                type="button"
                onClick={() => setSelectedVehicle('scorpio')}
                className={`estimator-veh-btn ${selectedVehicle === 'scorpio' ? 'active' : ''}`}
              >
                Scorpio 4x4
              </button>
              <button
                type="button"
                onClick={() => setSelectedVehicle('tempo')}
                className={`estimator-veh-btn ${selectedVehicle === 'tempo' ? 'active' : ''}`}
              >
                Tempo (12+1)
              </button>
            </div>
          </div>

        </div>

        {/* Selected Circuit Snapshot Box */}
        <div className="estimator-result-card">
          
          <div className="estimator-route-details">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(234, 88, 12, 0.15)', color: '#EA580C', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                {currentRoute.distance}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8' }}>
                Est. Duration: {currentRoute.duration}
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
              {currentRoute.title}
            </h3>

            <p style={{ fontSize: '0.8rem', color: '#CBD5E1', margin: 0 }}>
              <strong>Highlights:</strong> {currentRoute.highlights}
            </p>
          </div>

          <div className="estimator-price-action">
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                Union Standard Tariff
              </span>
              <p className="estimator-price-val">
                ₹{currentTaxiPrice.toLocaleString('en-IN')}
              </p>
              <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700 }}>
                ✓ Includes Fuel, Driver & Tolls
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onOpenBooking({ name: `${currentRoute.title} (${vehicleLabel})`, startingRate: `₹${currentTaxiPrice.toLocaleString('en-IN')}` })}
                className="btn-primary-orange"
                style={{ padding: '12px 22px', fontSize: '0.85rem' }}
              >
                Reserve Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
