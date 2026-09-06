"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Check, Calendar, User, Phone, MapPin, Bike, ArrowRight } from 'lucide-react';
import { bikesData } from '../data/bikes';
import { packagesData } from '../data/packages';

export default function BookingModal({ isOpen, onClose, initialItem, initialType = 'bike' }) {
  const [bookingType, setBookingType] = useState(initialType);
  const [selectedBikeId, setSelectedBikeId] = useState(
    initialType === 'bike' && initialItem ? initialItem.id : bikesData[0].id
  );
  const [selectedPackageId, setSelectedPackageId] = useState(
    initialType === 'package' && initialItem ? initialItem.id : packagesData[0].id
  );
  const [serviceType, setServiceType] = useState(
    initialType === 'service' && initialItem ? initialItem.title : 'Bike Rental'
  );
  const [days, setDays] = useState(3);
  const [ridersCount, setRidersCount] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupLoc, setPickupLoc] = useState('Malpax Complex, Leh Main Market');

  useEffect(() => {
    if (initialType) setBookingType(initialType);
    if (initialType === 'bike' && initialItem) setSelectedBikeId(initialItem.id);
    if (initialType === 'package' && initialItem) setSelectedPackageId(initialItem.id);
    if (initialType === 'service' && initialItem) setServiceType(initialItem.title);
  }, [initialItem, initialType]);

  if (!isOpen) return null;

  const currentBike = bikesData.find((b) => b.id === selectedBikeId) || bikesData[0];
  const currentPackage = packagesData.find((p) => p.id === selectedPackageId) || packagesData[0];

  const calculateEstimate = () => {
    if (bookingType === 'bike') {
      return currentBike.price * days * ridersCount;
    } else if (bookingType === 'package') {
      return currentPackage.price * ridersCount;
    }
    return 2000 * days;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    let text = `*New Reservation Request - Biker King Adventure*%0A%0A`;
    text += `*Type:* ${bookingType.toUpperCase()}%0A`;
    if (bookingType === 'bike') {
      text += `*Bike:* ${currentBike.name} (${currentBike.specs})%0A`;
      text += `*Duration:* ${days} Day(s)%0A`;
      text += `*Bikes Count:* ${ridersCount}%0A`;
      text += `*Estimated Total:* ₹${calculateEstimate().toLocaleString('en-IN')}%0A`;
    } else if (bookingType === 'package') {
      text += `*Package:* ${currentPackage.title} (${currentPackage.duration})%0A`;
      text += `*Persons:* ${ridersCount}%0A`;
      text += `*Package Total:* ₹${calculateEstimate().toLocaleString('en-IN')}%0A`;
    } else {
      text += `*Service:* ${serviceType}%0A`;
    }
    text += `*Start Date:* ${startDate || 'Immediate / Flexible'}%0A`;
    text += `*Pickup Location:* ${pickupLoc}%0A`;
    text += `*Customer Name:* ${encodeURIComponent(fullName || 'Valued Guest')}%0A`;
    text += `*Phone:* ${encodeURIComponent(phone || 'WhatsApp Direct')}`;

    window.open(`https://wa.me/919797948265?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--slate-950) 0%, var(--slate-900) 100%)',
          color: 'var(--white)',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--primary-orange)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Biker King Adventure • Instant Reservation
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '2px' }}>
              Book Your Leh Ladakh Ride
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'var(--white)',
              borderRadius: 'var(--radius-full)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          
          {/* Booking Type Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
            {['bike', 'package', 'service'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setBookingType(type)}
                style={{
                  padding: '8px 4px',
                  borderRadius: 'var(--radius-sm)',
                  border: bookingType === type ? '2px solid var(--primary-orange)' : '1px solid var(--slate-200)',
                  background: bookingType === type ? 'var(--primary-orange-light)' : 'var(--slate-50)',
                  color: bookingType === type ? 'var(--primary-orange)' : 'var(--slate-700)',
                  fontWeight: 800,
                  fontSize: '0.825rem',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                {type === 'bike' ? '🏍️ Motorbike' : type === 'package' ? '🏔️ Tour Package' : '🚖 Taxi / Service'}
              </button>
            ))}
          </div>

          <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Conditional Dropdown Selection */}
            {bookingType === 'bike' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '6px' }}>
                  Select Motorcycle Model
                </label>
                <select
                  className="form-input"
                  value={selectedBikeId}
                  onChange={(e) => setSelectedBikeId(e.target.value)}
                >
                  {bikesData.map((bike) => (
                    <option key={bike.id} value={bike.id}>
                      {bike.name} — {bike.specs} ({bike.priceDisplay})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {bookingType === 'package' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '6px' }}>
                  Select Tour Package
                </label>
                <select
                  className="form-input"
                  value={selectedPackageId}
                  onChange={(e) => setSelectedPackageId(e.target.value)}
                >
                  {packagesData.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} ({pkg.duration}) — {pkg.priceDisplay}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {bookingType === 'service' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '6px' }}>
                  Select Service Type
                </label>
                <select
                  className="form-input"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option>Taxi Service Leh Ladakh (Innova / Fortuner 4x4)</option>
                  <option>Hotel & Homestay Booking</option>
                  <option>Snow Leopard Winter Expedition</option>
                  <option>Frozen Pangong Lake Tour</option>
                  <option>Motorbike Mechanic & Backup Vehicle</option>
                </select>
              </div>
            )}

            {/* Inputs: Days, Riders, Date */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
              {bookingType === 'bike' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '4px' }}>
                    Rental Days
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="form-input"
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '4px' }}>
                  {bookingType === 'bike' ? 'No. of Bikes' : 'No. of Persons'}
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={ridersCount}
                  onChange={(e) => setRidersCount(Number(e.target.value))}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '4px' }}>
                  Trip Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Customer Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '4px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '4px' }}>
                  WhatsApp / Phone No.
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Estimated Price Card */}
            <div style={{
              background: 'var(--slate-50)',
              border: '1px solid var(--slate-200)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Estimated Booking Amount
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, color: 'var(--slate-900)' }}>
                  ₹{calculateEstimate().toLocaleString('en-IN')}
                </p>
              </div>
              <span style={{ fontSize: '0.775rem', color: '#059669', background: '#D1FAE5', padding: '4px 8px', borderRadius: '4px', fontWeight: 700 }}>
                ✓ Zero Advance Fee
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="btn-primary-orange"
              style={{ width: '100%', padding: '12px', fontSize: '0.875rem' }}
            >
              CONFIRM & INQUIRE ON WHATSAPP <ArrowRight size={16} />
            </button>

            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', textAlign: 'center' }}>
              🔒 Instant confirmation with Biker King office in Malpax Complex, Leh.
            </p>

          </form>

        </div>

      </div>
    </div>
  );
}
