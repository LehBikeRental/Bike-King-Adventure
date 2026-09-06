# 🏍️ Biker King Adventure

<div align="center">
  <h3>Premier Leh Ladakh Motorbike Rentals, 4x4 Taxis & Himalayan Expeditions</h3>
  <p><strong>Where Every Turn Is An Adventure · Born & Headquartered in Leh, Ladakh (11,500 ft)</strong></p>
  
  [![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
  [![React 18](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
  [![CSS3](https://img.shields.io/badge/CSS-Modular%20Design%20System-blueviolet)](src/app/globals.css)
  [![Supabase](https://img.shields.io/badge/Supabase-Backend%20Ready-3ECF8E?logo=supabase)](src/lib/supabase.js)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

---

## 🌄 About Biker King Adventure

**Biker King Adventure** is Leh Ladakh’s trusted, native-operated motorcycle rental house, 4x4 mountain taxi fleet, and expedition planner. Operating out of **Malpax Complex, Leh Main Market**, our local team provides showroom-maintained machinery tuned specifically for thin high-altitude air (Khardung La 17,982 ft, Chang La 17,688 ft, and Umling La 19,024 ft), paired with genuine 24/7 mountain rescue support.

### What We Offer:
- 🏍️ **Showroom Royal Enfield Fleet** — Himalayan 450 (Liquid-Cooled), Himalayan 411, Scram 411, Meteor 350, Hunter 350, Classic 350 & Scooters.
- 🛞 **4x4 Mountain Taxis & Private Cabs** — Toyota Innova Crysta, Mahindra Scorpio 4x4, and Force Tempo Traveler (12+1 Seater) driven by certified native Ladakhi drivers.
- 🏕️ **Curated Himalayan Tour Packages** — All-inclusive 5 to 9-day expeditions with heated lakefront Swiss dome camps, buffets, inner line permits, and mechanic vans.
- 🛡️ **CE-Certified Riding Gear Hire** — Helmets, all-weather armored jackets, bionic knee guards, waterproof boots, and 60L duffel bags.
- 📜 **Fast-Track Inner Line Permits (ILP)** — Official digital DC office permit approvals for Nubra, Pangong, Hanle, and Tso Moriri.
- 🐆 **Winter Expeditions** — Frozen Pangong Lake road trips & Snow Leopard tracking in Hemis National Park.

---

## 🗺️ Dedicated Page Architecture

The platform is engineered into dedicated, independent page routes powered by lightweight controllers and isolated modular sub-components:

| Route | Page | Description | Core Sub-Components |
|:---|:---|:---|:---|
| `/` | **Home Landing Page** | High-impact hero, quick services, bike highlights, packages showcase, verified reviews, and booking modal. | `Hero`, `QuickServices`, `BikeAdvertisement`, `TourPackages`, `Reviews`, `CtaBanner` |
| `/bikes` | **Motorcycle Fleet** | Filterable 8-model showroom fleet, daily rental rates, specs, interactive riding gear hire calculator, and handover terms. | `BikeFleetList`, `RidingGearSection`, `RentalGuidelines` |
| `/taxis` | **4x4 Mountain Taxis** | 4x4 vehicle fleet showcase, interactive Ladakh circuit fare calculator, driver trust credentials, and WhatsApp booking. | `TaxiFleetList`, `TaxiRouteEstimator`, `TaxiDriverTrust` |
| `/packages` | **Curated Tour Packages** | 6 complete itineraries with 4K photos, interactive custom tour budget calculator, Swiss glamping spotlight, inclusions/exclusions, and AMS safety guide. | `PackagesHeroGlamping`, `PackagesList`, `CustomPackageCalculator`, `InclusionsExclusionsBox`, `AmsSafetyProtocol` |
| `/services` | **Expedition Directory** | 3 core portal bridges, 8 full-spectrum adventure support services with filter chips, and pre-trip checklist. | `ServicesPortalGrid`, `ServicesDirectoryList`, `ExpeditionChecklist` |
| `/about` | **About & Safety Hub** | 12+ year company stats, founding narrative, 2012–2024 milestone chronicles, and high-altitude medical/mechanical safety hub. | `AboutStatsBanner`, `AboutStoryNarrative`, `AboutMilestonesTimeline`, `AboutSafetyRules` |
| `/contact` | **Contact & Inquiries** | Direct phone channels, 5-minute WhatsApp desk, Leh HQ directions, interactive inquiry dispatch form with Supabase logging. | `ContactChannelsGrid`, `ContactInquiryForm`, `ContactMapLocation` |

---

## 🎨 Visual Design & Aesthetics

- **Atmospheric Mountain Headers (`.inner-hero`)**: Deep midnight blue gradient (`#070A12` → `#0F172A`) that flows seamlessly from the sticky navbar, featuring illuminated badges, bold display typography (`Outfit`), and glassmorphism breadcrumbs.
- **Crystalline Sky Blue Page Backdrop**: Soft, fresh Himalayan sky gradient (`--bg-page-skyblue`) on all content areas.
- **Pure White Cards (`#FFFFFF`)**: High-contrast slate typography (`#0F172A` headings, `#334155` body), crisp borders (`#E2E8F0`), and soft drop shadows.
- **Dark Sticky Navigation & Footer**: Preserved contrast with active route pill indicators and instant WhatsApp quick actions.
- **Title Case Typography**: Clean, readable, and modern typography linked with Google Fonts (`Plus Jakarta Sans` & `Outfit`).

---

## 📁 Codebase Structure

```
Bike-King-Adventure/
├── public/
│   ├── images/
│   │   ├── hero-khardungla.webp     # High-altitude mountain hero banner
│   │   ├── hero-pangong.webp        # Lakefront team & expedition scene
│   │   ├── bikes/                   # High-res motorcycle PNGs & WEBP
│   │   │   ├── himalayan-450.jpg
│   │   │   ├── himalayan-411.webp
│   │   │   ├── scram-411.webp
│   │   │   ├── meteor-350.webp
│   │   │   ├── hunter-350.webp
│   │   │   ├── classic-350.jpg
│   │   │   └── scooty.webp
│   │   ├── taxis/                   # 4K AI-Generated mountain vehicle photos
│   │   │   ├── innova-crysta.jpg
│   │   │   ├── scorpio-4x4.jpg
│   │   │   └── tempo-traveler.jpg
│   │   └── tours/                   # 4K AI-Generated curated tour photos
│   │       ├── tour-road-trip.webp
│   │       ├── tour-discovery.webp
│   │       ├── tour-expedition.webp
│   │       ├── tour-pangong.webp
│   │       ├── tour-turtuk.jpg
│   │       ├── tour-snow-leopard.jpg
│   │       └── expedition-camp.jpg
│
├── src/
│   ├── app/                         # Next.js 14 App Router Controllers (< 90 lines each)
│   │   ├── layout.jsx               # Global HTML head, Google Fonts, preconnect & metadata
│   │   ├── globals.css              # 5,000+ line custom design system
│   │   ├── page.jsx                 # Home Page Controller
│   │   ├── bikes/page.jsx           # Bike Fleet Controller
│   │   ├── taxis/page.jsx           # 4x4 Taxis Controller
│   │   ├── packages/page.jsx        # Tour Packages Controller
│   │   ├── services/page.jsx        # Services Directory Controller
│   │   ├── about/page.jsx           # About & Safety Controller
│   │   └── contact/page.jsx         # Contact Desk Controller
│   │
│   ├── data/                        # Centralized Single Source of Truth Data
│   │   ├── bikes.js                 # 8 Bike specs, rental rates, ground clearance & features
│   │   ├── taxis.js                 # 3 4x4 Taxi models, 7 Ladakh circuit tariffs & credentials
│   │   ├── packages.js              # 6 Curated itineraries with day-by-day routes & pricing
│   │   ├── services.js              # 8 Expedition support services & pre-trip checklist
│   │   ├── about.js                 # Milestones (2012-2024), stats & high-altitude safety rules
│   │   ├── contact.js               # Calling lines, WhatsApp URLs & handover requirements
│   │   ├── reviews.js               # Verified rider testimonials & advantages
│   │   └── faqs.js                  # Rental policies, security deposits & permit FAQs
│   │
│   ├── components/                  # Modular Sub-Component Architecture
│   │   ├── TopBar.jsx               # Live Leh desk hours, phone & announcement ticker
│   │   ├── Navbar.jsx               # Sticky header with active route pill indicator
│   │   ├── Footer.jsx               # 5-column footer with newsletter, links & copyright
│   │   ├── BookingModal.jsx         # Live rental calculation modal with direct WhatsApp dispatch
│   │   ├── PackageModal.jsx         # Itinerary breakdown & package inquiry modal
│   │   ├── FloatingWhatsApp.jsx     # Global floating WhatsApp trigger
│   │   ├── MobileStickyBar.jsx      # Sticky bottom bar for mobile quick-actions
│   │   ├── bikes/                   # /bikes modular subcomponents
│   │   │   ├── BikeFleetList.jsx
│   │   │   ├── RidingGearSection.jsx
│   │   │   └── RentalGuidelines.jsx
│   │   ├── taxis/                   # /taxis modular subcomponents
│   │   │   ├── TaxiFleetList.jsx
│   │   │   ├── TaxiRouteEstimator.jsx
│   │   │   └── TaxiDriverTrust.jsx
│   │   ├── packages/                # /packages modular subcomponents
│   │   │   ├── PackagesHeroGlamping.jsx
│   │   │   ├── PackagesList.jsx
│   │   │   ├── CustomPackageCalculator.jsx
│   │   │   ├── InclusionsExclusionsBox.jsx
│   │   │   └── AmsSafetyProtocol.jsx
│   │   ├── services/                # /services modular subcomponents
│   │   │   ├── ServicesPortalGrid.jsx
│   │   │   ├── ServicesDirectoryList.jsx
│   │   │   └── ExpeditionChecklist.jsx
│   │   ├── about/                   # /about modular subcomponents
│   │   │   ├── AboutStatsBanner.jsx
│   │   │   ├── AboutStoryNarrative.jsx
│   │   │   ├── AboutMilestonesTimeline.jsx
│   │   │   └── AboutSafetyRules.jsx
│   │   └── contact/                 # /contact modular subcomponents
│   │       ├── ContactChannelsGrid.jsx
│   │       ├── ContactInquiryForm.jsx
│   │       └── ContactMapLocation.jsx
│   │
│   └── lib/
│       └── supabase.js              # Supabase client for storing bookings & inquiries
│
├── next.config.mjs
└── package.json
```

---

## 🏍️ Motorcycle Rental Fleet

| Model | Engine | Type | Ground Clearance | Daily Rate |
|:---|:---|:---|:---|:---|
| **Himalayan 450** | 452cc Liquid-Cooled | Adventure | 230 mm | **₹2,500 / Day** |
| **Himalayan 411** | 411cc LS410 EFI | Adventure | 220 mm | **₹2,000 / Day** |
| **Himalayan 440** | 440cc Tuned | Adventure | 215 mm | **₹2,300 / Day** |
| **Scram 411** | 411cc Scrambler | Dual-Sport | 200 mm | **₹2,100 / Day** |
| **Meteor 350** | 349cc J-Series | Cruiser | 170 mm | **₹1,800 / Day** |
| **Hunter 350** | 349cc J-Series | Roadster | 150 mm | **₹1,700 / Day** |
| **Classic 350** | 349cc J-Series | Retro Classic | 170 mm | **₹1,600 / Day** |
| **Scooty 125** | 125cc Automatic | Scooter | 155 mm | **₹800 / Day** |

---

## 🛞 4x4 Mountain Taxis & Union Tariffs

| Circuit Destination | Distance (One-Way) | Duration | Innova Crysta | Scorpio 4x4 | Tempo (12+1) |
|:---|:---|:---|:---|:---|:---|
| **Nubra Valley** *(via Khardung La 17,982 ft)* | 125 km | 4.5 – 5 hrs | ₹8,500 | ₹8,000 | ₹12,000 |
| **Pangong Tso Lake** *(via Chang La 17,688 ft)* | 150 km | 5 – 6 hrs | ₹9,500 | ₹9,000 | ₹13,500 |
| **Nubra to Pangong** *(Direct via Shyok River)* | 165 km | 6 – 7 hrs | ₹11,000 | ₹10,500 | ₹15,500 |
| **Tso Moriri & Tsokar Lake** | 220 km | 7 – 8 hrs | ₹13,500 | ₹12,800 | ₹18,000 |
| **Leh Local Monasteries & Hall of Fame** | 50 km | Full Day | ₹3,800 | ₹3,600 | ₹5,500 |
| **Sham Valley** *(Magnetic Hill, Sangam, Alchi)* | 70 km | Full Day | ₹4,500 | ₹4,200 | ₹6,500 |
| **Zanskar Valley** *(Padum via Shinku La / Singe La)*| 240 km | 2 Days | ₹22,000 | ₹20,500 | ₹29,000 |

*All taxi rates conform to official Leh Ladakh Taxi Operators Union guidelines.*

---

## 🏔️ Curated Tour Expeditions

1. **Leh Ladakh Grand Road Trip** *(7 Days / 6 Nights)* — ₹24,999/person  
   *Route:* Leh → Sham Valley → Khardung La → Nubra Valley → Shyok → Pangong Tso → Chang La → Leh
2. **Ladakh Discovery & Cultural Trail** *(6 Days / 5 Nights)* — ₹21,999/person  
   *Route:* Leh → Alchi & Sangam → Nubra Hunder Sand Dunes → Pangong Lake → Leh
3. **Zanskar & High Passes Motorcycle Expedition** *(8 Days / 7 Nights)* — ₹29,999/person  
   *Route:* Leh → Kargil → Suru Valley → Padum Zanskar → Lingshed → Khardung La → Pangong
4. **Pangong Lakefront Swiss Dome Special** *(5 Days / 4 Nights)* — ₹16,999/person  
   *Route:* Leh → Thiksey Monastery → Chang La (17,688 ft) → Pangong Lake Sunset Glamping → Leh
5. **Nubra Valley & Turtuk Balti Border Trail** *(6 Days / 5 Nights)* — ₹23,500/person  
   *Route:* Leh → Khardung La → Diskit → Hunder → Turtuk (India-Pak Border) → Pangong → Leh
6. **Snow Leopard Winter Wildlife Expedition** *(6 Days / 5 Nights)* — ₹34,999/person  
   *Route:* Leh Acclimatization → Hemis National Park Tracking Camp → Rumbak Valley → Frozen Pangong

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18.17.0 or later
- **npm** v9.0.0 or later

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/zakisajjad9026/BikerKing-Adventure.git
cd Bike-King-Adventure

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional for Supabase)
cp .env.example .env.local
# Add your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Verification & Route Testing

Run our route verification suite to test all 7 application routes:

```bash
node -e "
const http = require('http');
['/', '/bikes', '/taxis', '/packages', '/services', '/about', '/contact'].forEach(p => {
  http.get('http://localhost:3000' + p, res => console.log(p, '->', res.statusCode));
});"
```

### Production Build

```bash
npm run build
npm run start
```

---

## 📞 Leh Desk & Emergency Contact

- **Primary Calling Line:** [+91 9797948265](tel:9797948265)
- **Backup Station Line:** [+91 9419178265](tel:9419178265)
- **WhatsApp Instant Desk:** [+91 9797948265](https://wa.me/919797948265) *(Avg response: < 5 mins)*
- **Email:** `bikerkingadventure98@gmail.com`
- **Headquarters:** Malpax Complex, Leh Main Market, Leh Ladakh, UT – 194101, India  
  *(Opposite Leh Main Post Office & State Bank of India)*
- **Operating Hours:** 7:00 AM – 10:00 PM (Monday – Sunday, All 365 Days)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  Crafted with ❤️ for Himalayan Explorers by <strong>Biker King Adventure</strong> · Leh Ladakh
</div>
