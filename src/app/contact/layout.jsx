export const metadata = {
  title: 'Contact Us | 24/7 Leh Booking Desk & Expedition Support',
  description: 'Connect with Biker King Adventure in Leh Ladakh. Instant WhatsApp booking, 24/7 rider emergency support, and visit our HQ at Malpax Complex, Leh Main Market.',
  alternates: {
    canonical: 'https://bikerkingadventure.com/contact',
  },
  openGraph: {
    title: 'Contact Biker King Adventure | Leh Ladakh Support & Inquiries',
    description: 'Get in touch for bike rentals, private taxis, custom group itineraries, and permits. 24/7 support in Leh Ladakh.',
    url: 'https://bikerkingadventure.com/contact',
    siteName: 'Biker King Adventure',
    images: [
      {
        url: '/images/hero-pangong.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Biker King Adventure Leh Ladakh',
      },
    ],
  },
};

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
