"use client";

import React, { useState } from 'react';
import { ShieldCheck, Check, MessageCircle } from 'lucide-react';

export default function RidingGearSection({ onOpenBooking }) {
  const gearItems = [
    { id: 'helmet', name: 'DOT/ECE Certified Off-Road Full Face Helmet', dailyRate: 150, desc: 'With anti-fog pinlock visor & breath deflector' },
    { id: 'jacket', name: 'All-Weather CE Level 2 Armored Riding Jacket', dailyRate: 250, desc: 'Thermal liner + rain liner for sub-zero passes' },
    { id: 'pants', name: 'Riding Pants with Knee & Hip Armor Protectors', dailyRate: 200, desc: 'Heavy-duty 600D cordura water-repellent fabric' },
    { id: 'gloves', name: 'Waterproof Thermal Winter Riding Gloves', dailyRate: 100, desc: 'Knuckle armor + warm fleece insulation' },
    { id: 'knee-guards', name: 'Bionic Impact-Resistant Knee & Shin Guards', dailyRate: 80, desc: 'Hinged ergonomic fit over normal jeans' },
    { id: 'boots', name: 'Waterproof Adventure Touring Riding Boots', dailyRate: 200, desc: 'Reinforced ankle support & non-slip grip soles' },
    { id: 'gopro', name: 'Action Camera Chin Mount + Extension Arm', dailyRate: 50, desc: 'Fits all Royal Enfield helmets securely' },
    { id: 'duffel', name: '60L Waterproof D-Ring Mountain Duffel Bag', dailyRate: 100, desc: 'Pre-fitted with heavy duty bungee straps' }
  ];

  const [selectedGear, setSelectedGear] = useState(['helmet', 'jacket', 'knee-guards', 'gloves']);

  const toggleGearItem = (id) => {
    if (selectedGear.includes(id)) {
      setSelectedGear(selectedGear.filter(item => item !== id));
    } else {
      setSelectedGear([...selectedGear, id]);
    }
  };

  const calculatedGearTotal = selectedGear.reduce((sum, id) => {
    const item = gearItems.find(g => g.id === id);
    return sum + (item ? item.dailyRate : 0);
  }, 0);

  const selectedItemNames = selectedGear.map(id => {
    const item = gearItems.find(g => g.id === id);
    return item ? item.name.split(' ')[0] : '';
  }).join(', ');

  const whatsappGearText = encodeURIComponent(
    `Hi Biker King Adventure! I want to reserve riding gear for my Ladakh trip:\n• Selected Items: ${selectedItemNames}\n• Daily Total: ₹${calculatedGearTotal}/day\nPlease confirm size availability!`
  );

  return (
    <section className="container-custom" id="gear-rental" style={{ paddingBottom: '48px' }}>
      <div className="gear-checklist-container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(234, 88, 12, 0.1)', color: 'var(--primary-orange)', padding: '5px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
            <ShieldCheck size={14} />
            <span>Travel Light Without Baggage Headaches</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A' }}>
            Riding Gear & Touring Accessories Hire
          </h2>
          <p style={{ color: '#475569', fontSize: '0.88rem', maxWidth: '600px', margin: '0 auto' }}>
            Sanitized, CE-certified protective riding gear and waterproof touring baggage available right at our Leh shop.
          </p>
        </div>

        {/* Gear Grid */}
        <div className="gear-items-grid">
          {gearItems.map((item) => {
            const isChecked = selectedGear.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleGearItem(item.id)}
                className={`gear-item-card ${isChecked ? 'selected' : ''}`}
              >
                <div className={`gear-checkbox ${isChecked ? 'active' : ''}`}>
                  {isChecked && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                </div>

                <div className="gear-text-col">
                  <span className="gear-name">{item.name}</span>
                  <span className="gear-desc">{item.desc}</span>
                </div>

                <div className="gear-price-pill">
                  ₹{item.dailyRate} <span style={{ fontSize: '0.68rem', fontWeight: 500 }}>/day</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gear Summary Bottom Bar */}
        <div className="gear-summary-bar">
          <div>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
              Gear Package Total ({selectedGear.length} Selected)
            </span>
            <p style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              ₹{calculatedGearTotal} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#94A3B8' }}>/ Rider / Day</span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/919797948265?text=${whatsappGearText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-orange"
              style={{ padding: '10px 20px', fontSize: '0.825rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <MessageCircle size={15} />
              <span>Reserve Gear on WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenBooking({ name: `Riding Gear Bundle (${selectedGear.length} items)`, priceDisplay: `₹${calculatedGearTotal} / Day` })}
              className="btn-outline-dark"
              style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', padding: '10px 18px', fontSize: '0.825rem' }}
            >
              Add to Bike Booking
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
