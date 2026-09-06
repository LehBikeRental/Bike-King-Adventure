"use client";

import React from 'react';
import { Phone, MessageCircle, Bike } from 'lucide-react';

export default function MobileStickyBar({ onOpenBooking }) {
  return (
    <aside className="mobile-bottom-bar" aria-label="Quick contact and booking">
      <div className="mobile-bottom-bar-inner">
        
        {/* Call Button */}
        <a
          href="tel:+919797948265"
          className="mobile-bottom-action-btn mobile-call-btn"
          aria-label="Call Biker King Adventure"
        >
          <Phone size={18} />
          <span>Call Us</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919797948265?text=Hi%20Biker%20King%20Adventure,%20I%20am%20interested%20in%20booking%20a%20bike%20rental."
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-bottom-action-btn mobile-wa-btn"
          aria-label="WhatsApp Inquiry"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>

        {/* Book Now Button */}
        <button
          type="button"
          onClick={() => onOpenBooking && onOpenBooking()}
          className="mobile-bottom-action-btn mobile-book-btn"
          aria-label="Book Bike"
        >
          <Bike size={18} />
          <span>Book Ride</span>
        </button>

      </div>
    </aside>
  );
}
