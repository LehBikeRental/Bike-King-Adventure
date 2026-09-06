export const taxiFleet = [
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta 4x4',
    badge: 'Most Popular Family Ride',
    image: '/images/taxis/innova-crysta.jpg',
    seats: '6 + 1 Driver',
    luggage: '4 Large Bags + Rooftop Carrier',
    features: [
      'High-Altitude Dual Climate AC & Heater',
      'Reclining Captain Bucket Seats',
      'Snow Chains & High Ground Clearance',
      'Emergency Medical Oxygen Cylinder Onboard'
    ],
    idealFor: 'Families, honeymoon couples & executive mountain touring',
    startingRate: '₹3,800 / Day',
    type: 'innova'
  },
  {
    id: 'scorpio-4x4',
    name: 'Mahindra Scorpio 4x4 Expedition',
    badge: 'Rugged Off-Road Champion',
    image: '/images/taxis/scorpio-4x4.jpg',
    seats: '6 + 1 Driver',
    luggage: '3 Large Bags + Heavy Luggage Rack',
    features: [
      'Shift-on-the-fly 4WD Low/High Range',
      'All-Terrain Off-Road Tyres & Snorkel',
      'Tackles Deep Shyok River Water Crossings',
      'Expert Local Ladakhi Mountain Driver'
    ],
    idealFor: 'Remote trails: Zanskar, Chushul, Hanle & Umling La',
    startingRate: '₹3,600 / Day',
    type: 'scorpio'
  },
  {
    id: 'tempo-traveler',
    name: 'Force Tempo Traveler 4x4 Luxury',
    badge: 'Spacious Group Coach',
    image: '/images/taxis/tempo-traveler.jpg',
    seats: '12 + 1 Driver',
    luggage: '12 Large Bags Rooftop Waterproof Carrier',
    features: [
      '2x1 Pushback Luxury Reclining Seats',
      'Wide Panoramic High-Altitude Tinted Windows',
      'Microphone Tour Guide Public Address System',
      'Ample Legroom & Smooth Mountain Suspension'
    ],
    idealFor: 'Biking group backup, family reunions & corporate tours',
    startingRate: '₹5,500 / Day',
    type: 'tempo'
  }
];

export const ladakhTaxiRoutes = [
  {
    title: 'Leh to Nubra Valley via Khardung La (17,982 ft)',
    distance: '125 km (One-Way)',
    duration: '4.5 - 5 Hours',
    passes: 'Khardung La Pass (World Highest Motorable Road)',
    highlights: 'Diskit Monastery, 106ft Maitreya Buddha, Hunder Sand Dunes & Bactrian Camels',
    innovaPrice: 8500,
    scorpioPrice: 8000,
    tempoPrice: 12500
  },
  {
    title: 'Leh to Pangong Tso via Chang La Pass (17,688 ft)',
    distance: '160 km (One-Way)',
    duration: '5 - 6 Hours',
    passes: 'Chang La Pass',
    highlights: 'Shey Palace, Thiksey Monastery, Blue Pangong Lake 3 Idiots Point, Spangmik',
    innovaPrice: 9200,
    scorpioPrice: 8700,
    tempoPrice: 13800
  },
  {
    title: 'Nubra Valley to Pangong Tso Direct (via Shyok River)',
    distance: '165 km',
    duration: '5 Hours',
    passes: 'Agham - Shyok Circuit',
    highlights: 'Saves 1 full day by bypassing Leh! Scenic Shyok canyon riverbed drive',
    innovaPrice: 10500,
    scorpioPrice: 9800,
    tempoPrice: 15500
  },
  {
    title: 'Leh to Tso Moriri Lake via Chumathang Hot Springs',
    distance: '220 km (One-Way)',
    duration: '6.5 Hours',
    passes: 'Namshang La',
    highlights: 'Chumathang boiling sulfur springs, Korzok ancient village & pristine wild lake',
    innovaPrice: 13500,
    scorpioPrice: 12500,
    tempoPrice: 18500
  },
  {
    title: 'Leh to Hanle Dark Sky Reserve & Umling La Pass (19,024 ft)',
    distance: '275 km',
    duration: '7 - 8 Hours',
    passes: 'Umling La (World Highest Motorable Pass)',
    highlights: 'Indian Astronomical Observatory, crystal-clear Milky Way galaxy skies, Nyoma plain',
    innovaPrice: 16500,
    scorpioPrice: 15500,
    tempoPrice: 22000
  },
  {
    title: 'Sham Valley Sightseeing & Sangam River Confluence',
    distance: '80 km Round Trip',
    duration: 'Full Day (Day Tour)',
    passes: 'Leh - Srinagar Highway',
    highlights: 'Hall of Fame, Magnetic Hill, Gurudwara Pathar Sahib, Indus-Zanskar Sangam Confluence',
    innovaPrice: 4200,
    scorpioPrice: 3800,
    tempoPrice: 6200
  },
  {
    title: 'Leh Airport (IXL) Pick-Up / Drop Hotel Transfer',
    distance: '8 - 15 km',
    duration: '20 - 30 Mins',
    passes: 'Leh Town',
    highlights: 'Direct terminal meet & greet, luggage assistance, transfer to hotel or guest house',
    innovaPrice: 1200,
    scorpioPrice: 1100,
    tempoPrice: 1800
  }
];

export const driverTrustBadges = [
  {
    title: 'Oxygen Cylinder on Demand',
    desc: 'Every single cab is equipped with a fresh portable oxygen canister and oximeter for peace of mind at 17,000+ ft passes.'
  },
  {
    title: 'Ladakh Taxi Union Certified',
    desc: '100% compliant with Ladakh Autonomous Hill Development Council rates with transparent billing and zero surge pricing.'
  },
  {
    title: 'Winter & Snow Chain Trained',
    desc: 'Native drivers who understand Black Ice, rapid weather changes, and river crossing mechanics instinctively.'
  },
  {
    title: 'Punctual Hotel & Airport Pickups',
    desc: 'Guaranteed on-time arrival for early morning departures to beat pass traffic and catch flights.'
  }
];
