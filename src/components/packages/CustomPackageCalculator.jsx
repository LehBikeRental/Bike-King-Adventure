"use client";

import React, { useState } from 'react';
import { Award, Clock, Users, Bike, MessageCircle } from 'lucide-react';

export default function CustomPackageCalculator({ onBookPackage }) {
  const [calcDays, setCalcDays] = useState(7);
  const [calcTravelers, setCalcTravelers] = useState(2);
  const [calcVehicle, setCalcVehicle] = useState('himalayan-450');

  const vehicleBaseRates = {
    'himalayan-450': 2500,
    'himalayan-411': 2000,
    'innova-crysta': 5200,
    'scorpio-4x4': 4800,
    'tempo-traveler': 7500
  };

  const vehicleNames = {
    'himalayan-450': 'Royal Enfield Himalayan 450 (Self-Ride)',
    'himalayan-411': 'Royal Enfield Himalayan 411 (Self-Ride)',
    'innova-crysta': 'Toyota Innova Crysta (Private Cab with Driver)',
    'scorpio-4x4': 'Mahindra Scorpio 4x4 (Private Cab with Driver)',
    'tempo-traveler': 'Force Tempo Traveler (12+1 Seater for Groups)'
  };

  const perPersonPerDayStay = 2200; // 3-star stay + dinner + breakfast + permits
  const estVehicleDaily = vehicleBaseRates[calcVehicle] || 2500;
  const totalStayCost = calcDays * perPersonPerDayStay * calcTravelers;
  const totalVehicleCost = calcDays * estVehicleDaily;
  const estTotalPackage = Math.round(totalStayCost + totalVehicleCost);
  const estPerPersonCost = Math.round(estTotalPackage / Math.max(1, calcTravelers));

  const whatsappInquiryText = encodeURIComponent(
    `Hi Biker King Adventure! I want to book a Custom Ladakh Tour:\n• Duration: ${calcDays} Days\n• Travelers: ${calcTravelers} Person(s)\n• Vehicle: ${vehicleNames[calcVehicle]}\n• Approx Quote: ₹${estPerPersonCost.toLocaleString('en-IN')}/person\nPlease send me detailed itinerary and dates!`
  );

  return (
    <section className="container-custom" style={{ paddingBottom: '48px' }}>
      <div className="package-custom-calc-card">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--primary-orange)', padding: '5px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
            <Award size={14} />
            <span>Tailor-Made Expeditions</span>
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.01em' }}>
            Custom Tour Package Cost Calculator
          </h2>
          <p style={{ color: '#475569', fontSize: '0.92rem', maxWidth: '640px', margin: '6px auto 0 auto' }}>
            Select your trip duration, group size, and vehicle. Get an instant realistic cost estimate backed by our Leh office.
          </p>
        </div>

        {/* Form Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          
          {/* Step 1: Trip Duration */}
          <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0' }}>
            <label style={{ fontSize: '0.825rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Clock size={16} color="#EA580C" />
              <span>Trip Duration: {calcDays} Days</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {[5, 6, 7, 8, 9, 10, 12, 14].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setCalcDays(d)}
                  style={{
                    padding: '7px',
                    background: calcDays === d ? '#EA580C' : '#FFFFFF',
                    color: calcDays === d ? '#FFFFFF' : '#334155',
                    border: calcDays === d ? '1px solid #EA580C' : '1px solid #CBD5E1',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {d}D
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Number of Travelers */}
          <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0' }}>
            <label style={{ fontSize: '0.825rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Users size={16} color="#EA580C" />
              <span>Group Size: {calcTravelers} Person{calcTravelers > 1 ? 's' : ''}</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {[1, 2, 4, 6, 8, 10, 12, 16].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCalcTravelers(num)}
                  style={{
                    padding: '7px',
                    background: calcTravelers === num ? '#EA580C' : '#FFFFFF',
                    color: calcTravelers === num ? '#FFFFFF' : '#334155',
                    border: calcTravelers === num ? '1px solid #EA580C' : '1px solid #CBD5E1',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {num === 1 ? 'Solo' : `${num} Pax`}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Vehicle Preference */}
          <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid #E2E8F0' }}>
            <label style={{ fontSize: '0.825rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Bike size={16} color="#EA580C" />
              <span>Selected Vehicle</span>
            </label>
            <select
              value={calcVehicle}
              onChange={(e) => setCalcVehicle(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#0F172A',
                fontSize: '0.85rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="himalayan-450">Royal Enfield Himalayan 450 (Self-Ride)</option>
              <option value="himalayan-411">Royal Enfield Himalayan 411 (Self-Ride)</option>
              <option value="innova-crysta">Toyota Innova Crysta (Private Cab with Driver)</option>
              <option value="scorpio-4x4">Mahindra Scorpio 4x4 (Private Cab with Driver)</option>
              <option value="tempo-traveler">Force Tempo Traveler (12+1 Seater for Groups)</option>
            </select>
          </div>

        </div>

        {/* Output Strip */}
        <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: 'var(--radius-xl)', padding: '24px 28px', color: '#FFFFFF', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
              Estimated Package Total ({calcDays} Days • {calcTravelers} Person{calcTravelers > 1 ? 's' : ''})
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '4px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#EA580C' }}>
                ₹{estPerPersonCost.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#E2E8F0' }}>
                / person (Total: ₹{estTotalPackage.toLocaleString('en-IN')})
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
              Includes 3-Star hotels, Swiss dome lakefront camps, breakfast & dinner, fuel, permits & guide.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/919797948265?text=${whatsappInquiryText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-orange"
              style={{ padding: '12px 24px', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <MessageCircle size={17} />
              <span>Get Quotation on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => onBookPackage({ title: `Custom ${calcDays}D Tour (${vehicleNames[calcVehicle]})`, priceDisplay: `₹${estPerPersonCost.toLocaleString('en-IN')} / person` })}
              className="btn-outline-dark"
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: '#FFFFFF', padding: '12px 20px', fontSize: '0.875rem', cursor: 'pointer' }}
            >
              Book Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
