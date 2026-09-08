import './globals.css';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { supabase } from '../lib/supabase';

export const metadata = {
  metadataBase: new URL('https://bikerkingadventure.com'),
  title: {
    default: 'Biker King Adventure | Leh Ladakh Motorbike Rentals, Tours & Expeditions',
    template: '%s | Biker King Adventure'
  },
  description: 'Conquer the high Himalayan passes with Biker King Adventure. Premier Royal Enfield bike rentals (Himalayan 450, 411, Scram, Meteor), Leh Ladakh 4x4 taxi service, customized tour packages, snow leopard winter tracking, and hotel stays in Leh.',
  keywords: [
    'Biker King Adventure',
    'Leh Ladakh Bike Rental',
    'Royal Enfield Himalayan 450 rental Ladakh',
    'Ladakh motorcycle tours',
    'Leh taxi service',
    'Pangong lake bike trip',
    'Khardung La ride',
    'Leh Ladakh tour packages',
    'Snow leopard winter expedition Ladakh',
    'Himalayan bike expedition Leh',
    'Motorcycle rental Leh market'
  ],
  authors: [{ name: 'Biker King Adventure', url: 'https://bikerkingadventure.com' }],
  creator: 'Biker King Adventure',
  publisher: 'Biker King Adventure',
  alternates: {
    canonical: 'https://bikerkingadventure.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Biker King Adventure | Leh Ladakh Bike Rentals & Tours',
    description: 'Where Every Turn Is An Adventure. Explore Leh Ladakh with premium bikes, expert guides and unforgettable memories.',
    url: 'https://bikerkingadventure.com',
    siteName: 'Biker King Adventure',
    images: [
      {
        url: '/images/hero-pangong.webp',
        width: 1200,
        height: 630,
        alt: 'Biker King Adventure Leh Ladakh Motorbike Expedition'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biker King Adventure | Leh Ladakh Bike Rentals & Expeditions',
    description: 'Premier Royal Enfield bike rentals, 4x4 taxis, and guided tours across Leh Ladakh.',
    images: ['/images/hero-pangong.webp'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#EA580C',
};

const DEFAULT_CONTACT = {
  phone: '9797948265',
  email: 'bikerkingadventure98@gmail.com',
  addressLine1: 'Malpax complex, Leh Main Market',
  instagramUrl: 'https://www.instagram.com/ridewithbk?igsi=cGFxMWUxbDh3dGRx&utm_source=qr',
  facebookUrl: '',
  youtubeUrl: '',
};

async function getContactInfo() {
  try {
    const { data, error } = await supabase
      .from('home_content')
      .select('data')
      .eq('section_key', 'contact_info')
      .single();
    if (!error && data?.data) {
      return { ...DEFAULT_CONTACT, ...data.data };
    }
  } catch (err) {
    console.warn('Falling back to default contact info for structured data:', err);
  }
  return DEFAULT_CONTACT;
}

export default async function RootLayout({ children }) {
  const contact = await getContactInfo();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TravelAgency', 'AutoRental'],
        '@id': 'https://bikerkingadventure.com/#organization',
        name: 'Biker King Adventure',
        url: 'https://bikerkingadventure.com',
        logo: 'https://bikerkingadventure.com/favicon.svg',
        image: 'https://bikerkingadventure.com/images/hero-pangong.webp',
        description: 'Premier Royal Enfield motorbike rentals, 4x4 mountain taxis, and guided expeditions across Leh Ladakh.',
        telephone: `+91-${contact.phone}`,
        email: contact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: contact.addressLine1,
          addressLocality: 'Leh',
          addressRegion: 'Ladakh',
          postalCode: '194101',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 34.1526,
          longitude: 77.5771,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '07:00',
            closes: '22:00',
          },
        ],
        priceRange: '₹₹',
        sameAs: [contact.instagramUrl, contact.facebookUrl, contact.youtubeUrl].filter(Boolean),
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
