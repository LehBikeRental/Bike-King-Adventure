"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bike, 
  Car, 
  Compass, 
  Building2, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Snowflake, 
  Flame, 
  FileCheck 
} from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingModal from '../../components/BookingModal';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

export default function ServicesPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenBooking = (service = null) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const servicesList = [
    {
      id: "bike-rental",
      badge: "FLAGSHIP SERVICE",
      title: "Royal Enfield Motorbike Rental",
      shortTitle: "Royal Enfield Bikes",
      icon: Bike,
      desc: "Conquer the highest mountain passes on properly tuned, top-tier Royal Enfield motorbikes. Every motorcycle is rigorously inspected and accessorized for extreme Ladakh terrain.",
      media: "/images/bikes/himalayan-450.jpg",
      features: [
        "Royal Enfield Himalayan 450, 411, Scram, Meteor & Classic 350",
        "Complimentary ISI-certified helmets for rider & pillion",
        "Heavy-duty luggage carrier racks & bungee cords installed",
        "Comprehensive toolkit, spare tube & puncture repair kit included",
        "Clear security deposit terms & flexible daily/weekly rental plans"
      ],
      price: "From ₹800 / Day",
      ctaText: "Rent A Motorcycle",
      bookingType: "bike"
    },
    {
      id: "taxi-service",
      badge: "4x4 MOUNTAIN FLEET",
      title: "Leh Ladakh Taxi & 4x4 Cab Service",
      shortTitle: "4x4 Mountain Taxis",
      icon: Car,
      desc: "Explore Ladakh with absolute peace of mind. Private transfers, multi-day circuits, and rugged off-road journeys driven by certified local Ladakhi mountain pilots.",
      media: "/images/services/taxi-service.jpg",
      features: [
        "Toyota Innova Crysta, Mahindra Scorpio 4x4 & Tempo Travelers",
        "Airport pick-and-drop from Kushok Bakula Rimpochee Airport (IXL)",
        "Scenic circuits: Nubra Valley, Pangong Tso, Tso Moriri & Hanle",
        "Highest motorable roads: Khardung La (17,982 ft) & Umling La (19,024 ft)",
        "Fixed union approved transparent taxi fare tariffs"
      ],
      price: "Custom Circuit Rates",
      ctaText: "Book A Taxi",
      bookingType: "service"
    },
    {
      id: "packages-service",
      badge: "GUIDED EXPEDITIONS",
      title: "Guided Motorcycle Tour Packages",
      shortTitle: "Tour Packages",
      icon: Compass,
      desc: "All-inclusive, fully supported group and customized private expeditions. Ride freely while our back-end crew handles luggage, mechanics, permits, and emergencies.",
      media: "/images/services/guided-tours.jpg",
      features: [
        "5 to 12-day fixed departures across Ladakh & Zanskar Valley",
        "Dedicated backup support truck carrying luggage & spare bikes",
        "Accompanying certified mechanic & experienced road marshal",
        "Medical first-aid kit & high-altitude oxygen cylinders on board",
        "Comfortable boutique hotel stays and lakeside swiss camps"
      ],
      price: "All-Inclusive Tours",
      ctaText: "Explore Packages",
      bookingType: "package"
    },
    {
      id: "hotels",
      badge: "CURATED STAYS",
      title: "Hotels & Luxury Swiss Camps",
      shortTitle: "Hotels & Swiss Camps",
      icon: Building2,
      desc: "Rest comfortably after hours of mountain riding. We arrange guaranteed bookings at hand-picked boutique hotels in Leh town and luxury swiss camps beside Pangong Lake.",
      media: "/images/services/luxury-camps.jpg",
      features: [
        "3-Star & 4-Star boutique hotels in Leh with guaranteed heating",
        "Luxury lakeside Swiss cottage tents with attached washrooms",
        "Running hot water, generator power backup & warm bedding",
        "Organic local Ladakhi, Indian, and Continental buffet dining",
        "Stunning balcony mountain views & warm Ladakhi hospitality"
      ],
      price: "Best Seasonal Rates",
      ctaText: "Reserve Stay",
      bookingType: "service"
    },
    {
      id: "snow-leopard",
      badge: "WINTER EXPEDITION",
      title: "Snow Leopard Tracking in Hemis",
      shortTitle: "Snow Leopard Trek",
      icon: Snowflake,
      desc: "A thrilling once-in-a-lifetime winter wildlife expedition (January to March) into the snowy mountains of Hemis National Park to track the elusive 'Ghost of the Mountains'.",
      media: "/images/services/snow-leopard.jpg",
      features: [
        "Led by world-renowned native Ladakhi wildlife spotters",
        "Professional spotting scopes & telephoto observation points",
        "Warm homestays in traditional Ladakhi winter villages",
        "Opportunity to spot Tibetan wolves, blue sheep, and golden eagles",
        "Complete winter acclimatization and safety protocols"
      ],
      price: "Winter Season Special",
      ctaText: "Inquire Wildlife Tour",
      bookingType: "service"
    },
    {
      id: "frozen-pangong",
      badge: "MAGICAL ICE LAKE",
      title: "Frozen Pangong Lake Winter Tour",
      shortTitle: "Frozen Pangong Lake",
      icon: Flame,
      desc: "Witness the sheer magic of the high Himalayas in winter. Cross snow-covered Chang La in insulated 4x4s and walk upon the crystal turquoise ice sheet of Pangong Lake.",
      media: "/images/services/frozen-lake.jpg",
      features: [
        "Heated 4x4 SUVs with anti-skid snow chains & expert snow drivers",
        "Thermal suits, insulated winter boots & warm fleece provisions",
        "Spectacular winter photography & surreal blue-ice formations",
        "Warm insulated heating homestays near the lake boundary",
        "Strict altitude acclimatization and medical monitoring"
      ],
      price: "Exclusive Departures",
      ctaText: "Inquire Frozen Lake",
      bookingType: "service"
    },
    {
      id: "gear-rental",
      badge: "RIDER SAFETY",
      title: "Riding Gear & Camping Equipment",
      shortTitle: "Riding & Camp Gear",
      icon: ShieldCheck,
      desc: "Travel light without hauling heavy luggage on flights. Rent certified protective motorcycle riding apparel, warm waterproof layers, and camping gear right here in Leh.",
      media: "/images/services/riding-gear.jpg",
      features: [
        "CE Level 2 armored all-weather riding jackets & riding pants",
        "High-altitude waterproof thermal winter riding gloves",
        "Impact-resistant knee guards, elbow guards & boots",
        "60L waterproof saddlebags, tank bags & heavy bungee cords",
        "High-altitude 4-season camping tents & -10°C sleeping bags"
      ],
      price: "Budget Daily Hire",
      ctaText: "Rent Riding Gear",
      bookingType: "service"
    },
    {
      id: "permits",
      badge: "OFFICIAL CLEARANCE",
      title: "Inner Line Permits & Clearances",
      shortTitle: "Inner Line Permits",
      icon: FileCheck,
      desc: "Skip the paperwork and administrative lines. We process and print all official Leh District Inner Line Permits and Green/Wildlife fees for you in advance.",
      media: "/images/services/permits.jpg",
      features: [
        "Fast-track issuance within 24 hours of ID submission",
        "Permits for Khardung La, Nubra Valley (Turtuk), Pangong & Hanle",
        "Special passes for Umling La (19,024 ft) & Chushul sector",
        "Physical stamped documents ready for collection upon bike pickup",
        "Expert local consultation on road blocks & military checkpoints"
      ],
      price: "Fast-Track Processing",
      ctaText: "Request Permits",
      bookingType: "service"
    }
  ];

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      
      {/* 1. Top Bar */}
      <TopBar />

      {/* 2. Main Sticky Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking(null)} />

      {/* 3. Hero Section */}
      <section className="inner-hero">
        <div className="container-custom">
          <div className="inner-hero-badge">
            <Sparkles size={14} />
            <span>Complete Himalayan Travel Solutions</span>
          </div>
          <h1 className="inner-hero-title">OUR HIMALAYAN SERVICES</h1>
          <p className="inner-hero-desc">
            From premier Royal Enfield bike rentals and private 4x4 mountain taxis to all-inclusive guided expeditions 
            and winter snow leopard tracking &mdash; we provide everything you need to conquer Leh Ladakh.
          </p>
          <div className="inner-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="active">Services</span>
          </div>
        </div>
      </section>

      {/* 4. Quick Services Overview Anchor Grid */}
      <section className="container-custom" style={{ paddingTop: '36px', paddingBottom: '16px' }}>
        <div className="services-quick-anchors">
          {servicesList.map((srv) => {
            const IconComp = srv.icon;
            return (
              <a
                key={srv.id}
                href={`#${srv.id}`}
                className="quick-service-anchor"
              >
                <div className="quick-service-anchor-left">
                  <div className="quick-service-anchor-icon">
                    <IconComp size={15} />
                  </div>
                  <span className="quick-service-anchor-text">{srv.shortTitle}</span>
                </div>
                <span style={{ color: 'var(--primary-orange)', fontWeight: 800, fontSize: '0.9rem' }}>&darr;</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* 5. Detailed Full Services Grid - 4 Rows and 2 Columns Layout */}
      <section className="container-custom" style={{ paddingTop: '16px', paddingBottom: '60px' }}>
        <div className="services-list-grid">
          {servicesList.map((service) => (
            <div key={service.id} id={service.id} className="service-full-card">
              
              {/* Media Container with Badge */}
              <div className="service-card-media">
                <span className="service-card-badge">{service.badge}</span>
                <Image
                  src={service.media}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.45) 0%, transparent 60%)'
                }} />
              </div>

              {/* Body */}
              <div className="service-card-body">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>

                {/* Feature checklist */}
                <ul className="service-card-features">
                  {service.features.map((feat, fidx) => (
                    <li key={fidx}>
                      <Check size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Fixed Footer Action - Price on left, fixed button on right */}
                <div className="service-card-footer">
                  <div className="service-card-price-block">
                    <span className="service-card-price-label">Pricing / Plan</span>
                    <span className="service-card-price-value">{service.price}</span>
                  </div>
                  <button
                    onClick={() => handleOpenBooking(service)}
                    className="service-card-btn"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Custom Group Booking Banner */}
        <div className="services-custom-banner">
          <h2>
            NEED A CUSTOM HIMALAYAN ITINERARY FOR YOUR GROUP?
          </h2>
          <p style={{ color: 'var(--slate-300)', maxWidth: '640px', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            Whether it&apos;s a corporate team expedition, a college biking squad, or a private luxury honeymoon in Ladakh, 
            our team designs tailor-made packages tailored to your schedule and budget.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
            <Link
              href="/contact"
              className="btn-primary-orange"
              style={{ padding: '12px 28px', fontSize: '0.85rem' }}
            >
              REQUEST CUSTOM PROPOSAL
            </Link>
            <a
              href="https://wa.me/919797948265"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-white"
              style={{ padding: '12px 24px', fontSize: '0.85rem' }}
            >
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>

      </section>

      {/* 6. Footer */}
      <Footer onOpenBooking={() => handleOpenBooking(null)} />

      {/* 7. Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* 8. Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialItem={selectedService}
        initialType="service"
      />

    </main>
  );
}
