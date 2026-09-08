"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import { useContactInfo } from '../lib/useContactInfo';

// Official Clean Crisp WhatsApp SVG Icon
const OfficialWhatsAppIcon = ({ size = 30 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 2.159.684 4.159 1.85 5.8L2.5 21.5l3.822-1.282A9.946 9.946 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm.006 18.006c-1.848 0-3.567-.506-5.044-1.385l-.362-.215-2.617.878.892-2.529-.236-.375A7.954 7.954 0 014 12c0-4.411 3.589-8 8.006-8C16.411 4 20 7.589 20 12s-3.589 8.006-7.994 8.006zm4.33-5.926c-.237-.118-1.402-.692-1.619-.771-.217-.079-.375-.118-.533.118-.158.237-.612.771-.75 0.929-.138.158-.276.178-.513.059-.237-.118-1.002-.369-1.909-1.178-.707-.63-1.185-1.408-1.324-1.645-.138-.237-.015-.365.104-.483.107-.107.237-.276.355-.414.118-.138.158-.237.237-.395.079-.158.039-.296-.02-.414-.059-.118-.533-1.284-.73-1.758-.192-.462-.387-.399-.533-.407l-.455-.008c-.158 0-.414.059-.631.296-.217.237-.829.81-.829 1.975 0 1.165.849 2.291.967 2.449.118.158 1.671 2.551 4.048 3.578.565.245 1.007.391 1.351.5.567.18 1.083.155 1.491.094.455-.068 1.402-.573 1.6-1.126.197-.553.197-1.027.138-1.126-.059-.099-.217-.158-.454-.276z"
      fill="#FFFFFF"
    />
  </svg>
);

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const contact = useContactInfo();

  // Hide floating action buttons on Admin Dashboard routes
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="floating-action-group" aria-label="Quick Contact Actions">
      {/* 1. Direct Phone Call Floating Button */}
      <a
        href={`tel:+91${contact.phone.replace(/[^0-9]/g, '')}`}
        className="floating-action-btn floating-call-btn"
        aria-label="Call Leh Station Desk"
        title={`Call Biker King Leh Desk (${contact.phoneDisplay})`}
      >
        <Phone size={22} color="#ffffff" strokeWidth={2.2} />
        <span className="floating-btn-tooltip">Call Desk</span>
      </a>

      {/* 2. Official Green WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${contact.whatsappNumber}?text=Hi%20Biker%20King%20Adventure,%20I%20am%20planning%20a%20trip%20to%20Leh%20Ladakh%20and%20want%20to%20inquire%20about%20your%20services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-action-btn floating-wa-btn whatsapp-pulse"
        aria-label="Chat with us on WhatsApp"
        title="Chat with Biker King on WhatsApp"
      >
        <OfficialWhatsAppIcon size={32} />
        <span className="floating-btn-tooltip">WhatsApp</span>
      </a>
    </div>
  );
}
