export const servicesList = [
  {
    id: "bike-rental",
    category: "bikes",
    badge: "DEDICATED PAGE AVAILABLE",
    title: "Royal Enfield Motorbike Rentals",
    shortTitle: "Royal Enfield Bikes",
    iconName: "Bike",
    desc: "Conquer the highest mountain passes on showroom-tuned Royal Enfields. Fitted with luggage racks, crash guards, and puncture-resistant tyres.",
    media: "/images/bikes/himalayan-450.jpg",
    dedicatedUrl: "/bikes",
    features: [
      "Royal Enfield Himalayan 450, 411, Scram, Meteor & Classic 350",
      "Complimentary ISI-certified helmets for rider & pillion",
      "Heavy-duty luggage carrier racks & bungee cords installed",
      "Comprehensive toolkit, spare tube & puncture repair kit included",
      "Clear security deposit terms & instant refund upon return"
    ],
    price: "From ₹800 / Day",
    ctaText: "Open Bike Fleet Page",
    bookingType: "bike"
  },
  {
    id: "taxi-service",
    category: "taxis",
    badge: "DEDICATED PAGE AVAILABLE",
    title: "Leh Ladakh Taxi & 4x4 Mountain Cab Service",
    shortTitle: "4x4 Mountain Taxis",
    iconName: "Car",
    desc: "Explore Ladakh with absolute peace of mind. Toyota Innova Crysta, Scorpio 4x4, and Tempo Travelers driven by certified local mountain pilots.",
    media: "/images/taxis/innova-crysta.jpg",
    dedicatedUrl: "/taxis",
    features: [
      "Toyota Innova Crysta, Mahindra Scorpio 4x4 & Tempo Travelers",
      "Airport pick-and-drop from Kushok Bakula Rimpochee Airport (IXL)",
      "Scenic circuits: Nubra Valley, Pangong Tso, Tso Moriri & Hanle",
      "Highest motorable roads: Khardung La (17,982 ft) & Umling La (19,024 ft)",
      "Official Leh union approved transparent taxi fare tariffs"
    ],
    price: "Union Approved Rates",
    ctaText: "Open 4x4 Taxis Page",
    bookingType: "service"
  },
  {
    id: "packages-service",
    category: "expeditions",
    badge: "DEDICATED PAGE AVAILABLE",
    title: "Guided & Self-Ride Tour Packages",
    shortTitle: "Tour Packages",
    iconName: "Compass",
    desc: "All-inclusive, fully supported group and customized private expeditions. Ride freely while our back-end crew handles luggage, mechanics, permits, and stays.",
    media: "/images/tours/expedition-camp.jpg",
    dedicatedUrl: "/packages",
    features: [
      "5 to 9-day curated fixed departures across Ladakh & Zanskar Valley",
      "Dedicated backup support truck carrying luggage & spare bikes",
      "Accompanying certified mechanic & experienced road marshal",
      "Medical first-aid kit & high-altitude oxygen cylinders on board",
      "Comfortable boutique hotel stays and lakeside swiss dome camps"
    ],
    price: "From ₹16,999 / Person",
    ctaText: "Explore Tour Packages",
    bookingType: "package"
  },
  {
    id: "hotels",
    category: "taxis",
    badge: "CURATED STAYS",
    title: "Hotels & Luxury Swiss Dome Camps",
    shortTitle: "Hotels & Swiss Camps",
    iconName: "Building2",
    desc: "Rest comfortably after hours of mountain riding. We arrange guaranteed bookings at hand-picked boutique hotels in Leh town and luxury swiss camps beside Pangong Lake.",
    media: "/images/services/luxury-camps.jpg",
    features: [
      "3-Star & 4-Star boutique hotels in Leh with guaranteed heating",
      "Luxury lakeside Swiss cottage dome tents with attached washrooms",
      "Running hot water, generator power backup & warm bedding",
      "Organic local Ladakhi, Indian, and Continental buffet dining",
      "Stunning balcony mountain views & warm Ladakhi hospitality"
    ],
    price: "Best Seasonal Rates",
    ctaText: "Reserve Stay on WhatsApp",
    bookingType: "service"
  },
  {
    id: "snow-leopard",
    category: "expeditions",
    badge: "WINTER EXPEDITION",
    title: "Snow Leopard Tracking in Hemis National Park",
    shortTitle: "Snow Leopard Trek",
    iconName: "Snowflake",
    desc: "A thrilling once-in-a-lifetime winter wildlife expedition (January to March) into Hemis National Park to track the elusive 'Ghost of the Mountains'.",
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
    category: "expeditions",
    badge: "MAGICAL ICE LAKE",
    title: "Frozen Pangong Lake Winter Tour",
    shortTitle: "Frozen Pangong Lake",
    iconName: "Flame",
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
    category: "bikes",
    badge: "RIDER SAFETY",
    title: "Riding Gear & Camping Equipment Hire",
    shortTitle: "Riding & Camp Gear",
    iconName: "ShieldCheck",
    desc: "Travel light without hauling heavy gear on flights. Rent certified protective motorcycle riding apparel, warm waterproof layers, and camping gear in Leh.",
    media: "/images/services/riding-gear.jpg",
    dedicatedUrl: "/bikes#gear-rental",
    features: [
      "CE Level 2 armored all-weather riding jackets & riding pants",
      "High-altitude waterproof thermal winter riding gloves",
      "Impact-resistant knee guards, elbow guards & boots",
      "60L waterproof saddlebags, tank bags & heavy bungee cords",
      "High-altitude 4-season camping tents & -10°C sleeping bags"
    ],
    price: "From ₹80 / Item / Day",
    ctaText: "Check Gear Calculator",
    bookingType: "service"
  },
  {
    id: "permits",
    category: "expeditions",
    badge: "LEGAL CLEARANCE",
    title: "Inner Line Permits & Environmental Fee Clearance",
    shortTitle: "Permits & Fees",
    iconName: "FileCheck",
    desc: "Hassle-free online issuance of Ladakh Inner Line Permits (ILP), Wildlife Protection Fees, and Red Cross contributions before your arrival.",
    media: "/images/services/permits.jpg",
    features: [
      "Permits covering Nubra, Pangong, Tso Moriri, Hanle, Chushul & Umling La",
      "Clearance for Indian nationals and foreign nationals (PAP)",
      "Zero queue waiting — printed stamped copies ready at our Leh office",
      "Includes Ladakh Ecology Fee & District Red Cross donation receipts",
      "Assistance with restricted border checkpost regulations"
    ],
    price: "Official Govt Fee + Admin",
    ctaText: "Apply For Permits",
    bookingType: "service"
  }
];

export const preTripChecklistData = [
  {
    title: "Valid Driving License",
    desc: "Original physical driving license (with gear) is mandatory for renting any motorcycle or self-drive vehicle in Ladakh."
  },
  {
    title: "High-Altitude Acclimatization",
    desc: "Mandatory 24 to 48 hours rest in Leh (11,500 ft) before attempting Khardung La (17,982 ft) or Chang La (17,688 ft)."
  },
  {
    title: "Warm Weatherproof Layers",
    desc: "Even in peak summer, high pass temperatures can plummet below freezing. Thermal innerwear, windproof jackets & gloves are essential."
  },
  {
    title: "Medical & Oxygen Precautions",
    desc: "Carry basic altitude sickness medication (Diamox/Garlic soup), stay thoroughly hydrated (4L water/day), and avoid alcohol in the first 2 days."
  }
];
