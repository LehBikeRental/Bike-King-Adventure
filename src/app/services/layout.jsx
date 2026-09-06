export const metadata = {
  title: 'Himalayan Travel Services & Bike Rental | Biker King Adventure Leh',
  description: 'Explore our complete Leh Ladakh services: Royal Enfield motorbike rentals (Himalayan 450, 411), 4x4 mountain taxis, guided expeditions, snow leopard tracking, and luxury Swiss camps.',
  alternates: {
    canonical: 'https://bikerkingadventure.com/services',
  },
  openGraph: {
    title: 'Himalayan Travel Services & Bike Rental | Biker King Adventure Leh',
    description: 'Premier Royal Enfield rentals, 4x4 mountain cabs, boutique stays, and winter expeditions across Ladakh.',
    url: 'https://bikerkingadventure.com/services',
    siteName: 'Biker King Adventure',
    images: [
      {
        url: '/images/bikes/himalayan-450.jpg',
        width: 1200,
        height: 630,
        alt: 'Royal Enfield Bike Rentals Leh Ladakh',
      },
    ],
  },
};

export default function ServicesLayout({ children }) {
  return <>{children}</>;
}
