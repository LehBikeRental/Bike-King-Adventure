export const metadata = {
  title: 'About Us | Authentic Ladakhi Expedition Leaders & Guides',
  description: 'Learn about Biker King Adventure, born in the heart of Leh Ladakh. Meet our passionate team of native Ladakhi road marshals, mechanics, and high-altitude expedition experts.',
  alternates: {
    canonical: 'https://bikerkingadventure.com/about',
  },
  openGraph: {
    title: 'About Biker King Adventure | Leh Ladakh Expedition Specialists',
    description: 'Born and raised in the trans-Himalayan valleys, our team brings unmatched local insight, safety, and passion.',
    url: 'https://bikerkingadventure.com/about',
    siteName: 'Biker King Adventure',
    images: [
      {
        url: '/images/cta-camp.webp',
        width: 1200,
        height: 630,
        alt: 'Biker King Adventure Team in Leh Ladakh',
      },
    ],
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}
