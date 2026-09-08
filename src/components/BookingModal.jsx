"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react';
import { bikesData as staticBikesData } from '../data/bikes';
import { packagesData as staticPackagesData } from '../data/packages';
import { servicesList as staticServicesList } from '../data/services';
import { supabase } from '../lib/supabase';
import { useContactInfo } from '../lib/useContactInfo';

const staticServicesData = staticServicesList
  .filter((s) => s.bookingType === 'service')
  .map((s) => ({ id: s.id, title: s.shortTitle || s.title, price: s.price }));

function mapDbService(row) {
  return {
    id: row.slug || row.id,
    title: row.short_title || row.title,
    price: row.price,
  };
}

function mapDbBike(row) {
  return {
    id: row.slug || row.id,
    name: row.name,
    specs: row.specs,
    engine: row.engine,
    power: row.power,
    groundClearance: row.ground_clearance,
    fuelCapacity: row.fuel_capacity,
    type: row.type,
    price: row.price,
    priceDisplay: row.price_display,
    image: row.image_url,
    badge: row.badge,
    description: row.description,
    features: Array.isArray(row.features) ? row.features : [],
  };
}

function mapDbPackage(row) {
  return {
    id: row.slug || row.id,
    title: row.title,
    duration: row.duration,
    daysCount: row.days_count,
    route: row.route,
    price: row.price,
    priceDisplay: row.price_display,
    image: row.image_url,
    category: row.category,
    inclusions: Array.isArray(row.inclusions) ? row.inclusions : [],
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    itinerary: Array.isArray(row.itinerary) ? row.itinerary : [],
  };
}

export default function BookingModal({ isOpen, onClose, initialItem, initialType = 'bike' }) {
  const contact = useContactInfo();
  const [submitted, setSubmitted] = useState(false);
  const [bookingType, setBookingType] = useState(initialType);
  const [bikesData, setBikesData] = useState(staticBikesData);
  const [packagesData, setPackagesData] = useState(staticPackagesData);
  const [servicesData, setServicesData] = useState(staticServicesData);
  const [selectedBikeId, setSelectedBikeId] = useState(
    initialType === 'bike' && initialItem ? initialItem.id : staticBikesData[0].id
  );
  const [selectedPackageId, setSelectedPackageId] = useState(
    initialType === 'package' && initialItem ? initialItem.id : staticPackagesData[0].id
  );
  const [serviceType, setServiceType] = useState(
    initialType === 'service' && initialItem ? initialItem.title : staticServicesData[0]?.title || ''
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

  useEffect(() => {
    if (isOpen) setSubmitted(false);
  }, [isOpen]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        if (!error && isMounted && Array.isArray(data) && data.length > 0) {
          setPackagesData(data.map(mapDbPackage));
        }
      } catch (err) {
        console.warn('Falling back to static packages list:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('bikes')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        if (!error && isMounted && Array.isArray(data) && data.length > 0) {
          setBikesData(data.map(mapDbBike));
        }
      } catch (err) {
        console.warn('Falling back to static bikes list:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .eq('booking_type', 'service')
          .order('sort_order', { ascending: true });
        if (!error && isMounted && Array.isArray(data) && data.length > 0) {
          const mapped = data.map(mapDbService);
          setServicesData(mapped);
          if (!initialItem || initialType !== 'service') {
            setServiceType(mapped[0].title);
          }
        }
      } catch (err) {
        console.warn('Falling back to static services list:', err);
      }
    })();
    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const estimatedPrice = calculateEstimate();
    const itemName = bookingType === 'bike' 
      ? currentBike.name 
      : bookingType === 'package' 
        ? currentPackage.title 
        : serviceType;
    const itemId = bookingType === 'bike' ? currentBike.id : bookingType === 'package' ? currentPackage.id : null;

    // Save into Supabase Database
    try {
      if (supabase) {
        await supabase.from('bookings').insert([
          {
            booking_type: bookingType,
            item_name: itemName,
            item_id: itemId,
            days: days,
            riders_count: ridersCount,
            start_date: startDate || 'Flexible',
            pickup_location: pickupLoc,
            customer_name: fullName || 'Valued Guest',
            phone: phone || 'Direct WhatsApp',
            estimated_price: estimatedPrice,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ]);
      }
    } catch (err) {
      console.warn('Booking record save error:', err);
    }

    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1100 }}>
      <div className="modal-dialog" style={{ background: '#FFFFFF', borderRadius: '20px', overflow: 'hidden', border: '1px solid #CBD5E1', color: '#0F172A', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{
          background: '#F8FAFC',
          color: '#0F172A',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E2E8F0'
        }}>
          <div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--primary-orange)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Biker King Adventure • Instant Reservation
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', marginTop: '2px', color: '#0F172A' }}>
              Book Your Leh Ladakh Ride
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: '#EDF2F7',
              border: 'none',
              color: '#0F172A',
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
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 8px' }}>
              <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 900, color: '#0F172A', marginBottom: '8px' }}>
                Booking Request Received!
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                Thank you, <strong>{fullName || 'Guest'}</strong>! Your reservation request has been sent to our Leh office.
                Our team will review your dates and contact you on WhatsApp or phone shortly to confirm availability.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={`tel:+91${contact.phone}`} className="btn-primary-orange" style={{ padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <PhoneCall size={16} />
                  <span>Call Desk Now</span>
                </a>
                <button type="button" onClick={onClose} className="btn-secondary-white" style={{ padding: '12px 24px' }}>
                  Close
                </button>
              </div>
            </div>
          ) : (
          <>
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
                  {servicesData.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}{service.price ? ` — ${service.price}` : ''}
                    </option>
                  ))}
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
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                  Estimated Booking Amount
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, color: '#EA580C' }}>
                  ₹{calculateEstimate().toLocaleString('en-IN')}
                </p>
              </div>
              <span style={{ fontSize: '0.775rem', color: '#059669', background: 'rgba(16, 185, 129, 0.12)', padding: '4px 8px', borderRadius: '4px', fontWeight: 700 }}>
                ✓ Zero Advance Fee
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="btn-primary-orange"
              style={{ width: '100%', padding: '12px', fontSize: '0.875rem' }}
            >
              CONFIRM BOOKING <ArrowRight size={16} />
            </button>

            <p style={{ fontSize: '0.8rem', color: '#64748B', textAlign: 'center' }}>
              🔒 Your request goes straight to our Leh office team for confirmation.
            </p>

          </form>
          </>
          )}

        </div>

      </div>
    </div>
  );
}
