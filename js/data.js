/* ============================================================
   Wayfarer — data layer
   Destinations, editorial blog posts, seeded reviews.
   Content is intentionally narrow & deep (16 researched spots).
   ============================================================ */

const IMG = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const INTERESTS = [
  { id: 'adventure', label: 'Adventure' },
  { id: 'relaxation', label: 'Relaxation' },
  { id: 'culture', label: 'Culture' },
  { id: 'food', label: 'Food' },
  { id: 'nightlife', label: 'Nightlife' },
  { id: 'nature', label: 'Nature' }
];

const REGIONS = [
  'Asia',
  'Europe',
  'Americas',
  'Africa',
  'Oceania',
  'Middle East'
];

const DESTINATIONS = [
  {
    id: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    tagline: 'Rice terraces, temple mornings and slow beach evenings.',
    description:
      'Bali rewards travellers who skip the airport taxi and stay a while. Mornings belong to the rice terraces of Tegallalang and the temples of Ubud; afternoons to the surf beaches of Canggu and Uluwatu; evenings to a warung meal that costs less than a coffee back home. It is one of the few places where a tight budget and a luxurious one both work extremely well.',
    interests: ['relaxation', 'nature', 'culture', 'food'],
    budgetLevel: 'budget',
    tripLength: 9,
    lengthNote: '7–12 days',
    budget: { budget: 35, mid: 85, luxury: 280 },
    bestTime: 'April – October (dry season)',
    currency: 'Indonesian Rupiah (IDR)',
    language: 'Balinese, Indonesian',
    visa: 'Visa on arrival, 30 days, most nationalities',
    coords: [-8.4095, 115.1889],
    images: [
      IMG('1537996194471-e657df975ab4'),
      IMG('1552465011-b4e21bf6e79a'),
      IMG('1518548419970-58e3b4079ab2')
    ],
    highlights: [
      'Sunrise walk through Tegallalang rice terraces before the tour buses arrive',
      'Traditional Kecak fire dance at Uluwatu Temple at sunset',
      'Snorkelling the US shipwreck off Tulamben',
      'Warung-hopping through Ubud for babi guling and nasi campur'
    ],
    thingsToDo: [
      { name: 'Tegallalang & Campuhan ridge walks', note: 'Free, best before 8am' },
      { name: 'Uluwatu Temple + Kecak dance', note: 'Book the sunset show' },
      { name: 'Diving at Tulamben wreck', note: 'Two-tank day ~$70' },
      { name: 'Mount Batur sunrise trek', note: 'Starts 2am, worth it' },
      { name: 'Sidemen valley cycling', note: 'Quieter than Ubud' },
      { name: 'Canggu surf lessons', note: '$12/hour group classes' }
    ],
    tips: [
      'Rent a scooter only if you are confident — traffic in Denpasar is not forgiving.',
      'Stay in Sidemen or Amed for a fraction of Ubud prices with better views.',
      'Carry small IDR notes; warungs rarely have change for 100,000 bills.'
    ],
    gettingAround:
      'Grab or Gojek apps for rides and deliveries. Scooter rental runs $5–7/day. Driver for a full day is $35–45 including petrol.',
    climate: { temp: [27, 27, 28, 28, 28, 27, 27, 27, 28, 28, 28, 27], rain: [300, 270, 220, 90, 70, 60, 40, 40, 50, 70, 160, 270] },
    crowd: [4, 4, 3, 3, 3, 4, 4, 5, 4, 3, 3, 5],
    ratingAvg: 4.7,
    ratingCount: 1284,
    related: ['chiang-mai', 'queenstown', 'lisbon'],
    reviews: [
      { name: 'Marta K.', avatar: 'i.pravatar.cc/80?img=32', rating: 5, date: '2026-05-14', text: 'Ten days split between Sidemen and Canggu. The rice terraces at 6am with nobody there is the memory I keep coming back to.' },
      { name: 'Tom A.', avatar: 'i.pravatar.cc/80?img=12', rating: 4, date: '2026-03-02', text: 'Incredible value. Scooter traffic is no joke though — I switched to a driver after day two and never looked back.' },
      { name: 'Priya S.', avatar: 'i.pravatar.cc/80?img=45', rating: 5, date: '2026-01-19', text: 'Did the Mount Batur sunrise trek and cried a little at the top. Book through a local guide, it supports the village directly.' }
    ]
  },
  {
    id: 'kyoto-japan',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    tagline: 'A thousand shrines, one perfect tea ceremony.',
    description:
      'Kyoto is the antidote to Tokyo: quieter, older, and endlessly rewarding on foot. Go early to Fushimi Inari before the crowds, spend an afternoon in the Arashiyama bamboo grove, and book one proper kaiseki dinner. Spring cherry blossom and autumn maple season are spectacular — and mobbed — so travel in between if you prefer the city to yourself.',
    interests: ['culture', 'food', 'nature'],
    budgetLevel: 'mid',
    tripLength: 5,
    lengthNote: '4–6 days',
    budget: { budget: 60, mid: 140, luxury: 400 },
    bestTime: 'Late March – April, mid-November – December',
    currency: 'Japanese Yen (JPY)',
    language: 'Japanese',
    visa: 'Visa-free 90 days for most Western nationalities',
    coords: [35.0116, 135.7681],
    images: [
      IMG('1493976040374-85c8e12f0c0e'),
      IMG('1528181304800-259b08848526'),
      IMG('1545569341-9eb8b30979d9')
    ],
    highlights: [
      'Fushimi Inari at 6am, alone under ten thousand torii gates',
      'Bamboo grove and monkey park in Arashiyama',
      'Kaiseki dinner in Pontochō alley',
      'Tea ceremony in a machiya townhouse'
    ],
    thingsToDo: [
      { name: 'Fushimi Inari shrine hike', note: 'Free, open 24h' },
      { name: 'Arashiyama bamboo grove', note: 'Go before 8am' },
      { name: 'Kinkaku-ji Golden Pavilion', note: '$3 entry' },
      { name: 'Nishiki Market food walk', note: 'Graze your way through' },
      { name: 'Gion evening stroll', note: 'Chance to spot geiko' },
      { name: 'Day trip to Nara deer park', note: '45 min by train' }
    ],
    tips: [
      'Get an IC card (ICOCA) — it works on buses, trains and convenience store tills.',
      'Luggage forwarding to your next city costs ~$15 and frees you from stairs.',
      'Vending machine onigiri is a legitimately great breakfast.'
    ],
    gettingAround:
      'Subway + buses covered by a daily bus pass ($5). IC card for everything else. Central Kyoto is very walkable.',
    climate: { temp: [5, 6, 10, 16, 21, 24, 28, 29, 25, 18, 12, 7], rain: [50, 65, 110, 135, 140, 210, 220, 140, 175, 120, 70, 55] },
    crowd: [2, 2, 3, 5, 4, 2, 3, 4, 3, 4, 5, 3],
    ratingAvg: 4.9,
    ratingCount: 963,
    related: ['tokyo-japan', 'lisbon', 'krakow'],
    reviews: [
      { name: 'Daniel R.', avatar: 'i.pravatar.cc/80?img=59', rating: 5, date: '2026-04-08', text: 'Fushimi Inari at sunrise was empty. By 9am there were hundreds of people. Set the alarm.' },
      { name: 'Ines G.', avatar: 'i.pravatar.cc/80?img=20', rating: 5, date: '2025-11-27', text: 'Autumn colours in Arashiyama were unreal. Skip the tourist bus and take the local bus 11.' },
      { name: 'Owen P.', avatar: 'i.pravatar.cc/80?img=15', rating: 4, date: '2026-02-11', text: 'Expensive in cherry blossom season, but a hostel + konbini food kept it under $70/day.' }
    ]
  },
  {
    id: 'lisbon-portugal',
    name: 'Lisbon',
    country: 'Portugal',
    region: 'Europe',
    tagline: 'Tiled facades, custard tarts and tram-line hills.',
    description:
      'Lisbon is Europe’s friendliest capital for a first-time visitor and one of its cheapest. Base yourself in Alfama or Graça, ride tram 28 before the queues, eat bifanas standing at a counter, and finish with sunset at Miradouro da Senhora do Monte. It is also the best launch pad in Europe for day trips — Sintra, Cascais and Arrábida are all under an hour.',
    interests: ['culture', 'food', 'nightlife'],
    budgetLevel: 'budget',
    tripLength: 5,
    lengthNote: '4–7 days',
    budget: { budget: 45, mid: 110, luxury: 300 },
    bestTime: 'March – June, September – October',
    currency: 'Euro (EUR)',
    language: 'Portuguese',
    visa: 'Schengen zone, visa-free 90 days for many nationalities',
    coords: [38.7223, -9.1393],
    images: [
      IMG('1555881400-74d7acaacd8b'),
      IMG('1585208798174-6cedd86e019a'),
      IMG('1513735492246-483525079686')
    ],
    highlights: [
      'Tram 28 at first light, before it becomes a rolling queue',
      'Pastéis de Belém straight from the oven',
      'Sunset from Miradouro da Senhora do Monte',
      'Day trip to the fairy-tale palaces of Sintra'
    ],
    thingsToDo: [
      { name: 'Ride tram 28 end to end', note: 'Start at Martim Moniz, 7am' },
      { name: 'Belém Tower & Jerónimos Monastery', note: '$12 combo' },
      { name: 'Sintra: Pena Palace day trip', note: 'Train 40 min, $5' },
      { name: 'Time Out Market lunch', note: 'Every chef under one roof' },
      { name: 'Fado in Alfama', note: 'Small houses, dinner + show' },
      { name: 'Surf at Costa da Caparica', note: '30 min by bus' }
    ],
    tips: [
      'Wear proper shoes — the calçada pavements are beautiful and lethal in rain.',
      'Viva Viagem card caps your daily transit spend automatically.',
      'Eat lunch as the main meal; menus do dias are half the dinner price.'
    ],
    gettingAround:
      'Metro from the airport ($2). Trams, buses and funiculars on the Viva Viagem card. Most of central Lisbon is walkable, if steep.',
    climate: { temp: [12, 13, 15, 17, 19, 22, 24, 25, 23, 19, 15, 13], rain: [100, 85, 55, 60, 45, 15, 5, 5, 35, 100, 130, 125] },
    crowd: [2, 2, 3, 4, 5, 5, 5, 5, 4, 4, 3, 3],
    ratingAvg: 4.8,
    ratingCount: 1571,
    related: ['krakow', 'istanbul', 'mexico-city'],
    reviews: [
      { name: 'Sofia M.', avatar: 'i.pravatar.cc/80?img=25', rating: 5, date: '2026-06-01', text: 'Ate my weight in pastéis de nata. Sintra by train was the highlight — go on a weekday.' },
      { name: 'Jake L.', avatar: 'i.pravatar.cc/80?img=33', rating: 5, date: '2026-04-22', text: 'Cheapest Western European capital I have found. $50 a day including a hostel and wine.' },
      { name: 'Amara D.', avatar: 'i.pravatar.cc/80?img=47', rating: 4, date: '2025-10-13', text: 'Tram 28 is chaos after 10am. At 7am it is pure joy. Also — bring grip for the hills.' }
    ]
  },
  {
    id: 'santorini-greece',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    tagline: 'Caldera cliffs, whitewashed villages and Aegean blue.',
    description:
      'Santorini is postcard Greece: villages clinging to a volcanic cliff, donkeys on staircases, and sunsets that stop traffic in Oia. It is not a budget island, but visiting in shoulder season — May, June or late September — cuts prices roughly in half and swaps the crowds for quiet terraces. Base in Pyrgos or Imerovigli for caldera views without Oia prices.',
    interests: ['relaxation', 'nature', 'food'],
    budgetLevel: 'luxury',
    tripLength: 4,
    lengthNote: '3–5 days',
    budget: { budget: 70, mid: 170, luxury: 520 },
    bestTime: 'May – June, September – October',
    currency: 'Euro (EUR)',
    language: 'Greek',
    visa: 'Schengen zone, visa-free 90 days for many nationalities',
    coords: [36.3932, 25.4615],
    images: [
      IMG('1570077188670-e3a8d69ac5ff'),
      IMG('1613395877344-13d4a8e0d49e'),
      IMG('1601581875309-fafbf2d3ed3a')
    ],
    highlights: [
      'Oia sunset from the castle ruins — arrive 45 minutes early',
      'Catamaran cruise around the volcanic hot springs',
      'Wine tasting of assyrtiko at a caldera-edge winery',
      'Red Beach and ancient Akrotiri ruins'
    ],
    thingsToDo: [
      { name: 'Sunset at Oia castle', note: 'Free, get there early' },
      { name: 'Caldera catamaran cruise', note: '$120 incl. BBQ' },
      { name: 'Akrotiri archaeological site', note: '$12, Bronze Age city' },
      { name: 'Wine tasting at Santo Wines', note: 'Caldera views included' },
      { name: 'Hike Fira to Oia', note: '10 km, 3 hours, free' },
      { name: 'Red Beach & Black Beach', note: 'Bus from Akrotiri' }
    ],
    tips: [
      'Skip the donkey stairs — the cable car is $6 and takes 3 minutes.',
      'Rental car beats buses if you want the south of the island.',
      'Stay in Pyrgos: same views, half the price, and no cruise-ship day trippers.'
    ],
    gettingAround:
      'KTEL buses connect Fira to all villages ($2). Rental car or ATV (~$30/day) gives you the beaches. Donkeys are a no from us.',
    climate: { temp: [10, 10, 12, 15, 19, 23, 26, 26, 22, 18, 14, 11], rain: [70, 60, 50, 25, 15, 5, 1, 1, 10, 40, 65, 75] },
    crowd: [1, 1, 2, 3, 4, 5, 5, 5, 4, 3, 2, 2],
    ratingAvg: 4.7,
    ratingCount: 842,
    related: ['lisbon', 'rome', 'reykjavik'],
    reviews: [
      { name: 'Chloe B.', avatar: 'i.pravatar.cc/80?img=44', rating: 5, date: '2025-09-30', text: 'Went in late September. Warm sea, empty restaurants, half the July prices. Perfect.' },
      { name: 'Rahul V.', avatar: 'i.pravatar.cc/80?img=68', rating: 4, date: '2026-05-20', text: 'The Fira–Oia hike is the best thing we did. Bring 2L of water, there is nothing on the trail.' },
      { name: 'Nina F.', avatar: 'i.pravatar.cc/80?img=29', rating: 4, date: '2026-06-12', text: 'Beautiful but pricey. Self-catering apartment in Pyrgos saved us a fortune.' }
    ]
  },
  {
    id: 'reykjavik-iceland',
    name: 'Reykjavík & the South Coast',
    country: 'Iceland',
    region: 'Europe',
    tagline: 'Waterfalls, black sand and the chance of an aurora.',
    description:
      'Iceland is a road trip, not a city break. Use Reykjavík as a base for the Golden Circle, then drive the south coast through Seljalandsfoss, the black sands of Reynisfjara and on to Jökulsárlón glacier lagoon. It is expensive — plan for supermarket dinners and a rental car — but the landscapes are genuinely unlike anywhere else in Europe.',
    interests: ['nature', 'adventure'],
    budgetLevel: 'luxury',
    tripLength: 7,
    lengthNote: '6–9 days',
    budget: { budget: 80, mid: 180, luxury: 450 },
    bestTime: 'June – August (midnight sun), September – March (aurora)',
    currency: 'Icelandic Króna (ISK)',
    language: 'Icelandic',
    visa: 'Schengen zone, visa-free 90 days for many nationalities',
    coords: [64.1466, -21.9426],
    images: [
      IMG('1476514525535-07fb3b4ae5f1'),
      IMG('1504829857797-ddff29c27927'),
      IMG('1531168556467-80aace0d0144')
    ],
    highlights: [
      'Golden Circle: Þingvellir, Geysir and Gullfoss in one loop',
      'Standing behind Seljalandsfoss waterfall',
      'Glacier lagoon icebergs at Jökulsárlón',
      'Northern lights hunting from September'
    ],
    thingsToDo: [
      { name: 'Golden Circle self-drive', note: '300 km loop, free sights' },
      { name: 'Reynisfjara black sand beach', note: 'Watch the sneaker waves' },
      { name: 'Jökulsárlón glacier lagoon', note: 'Zodiac tour ~$75' },
      { name: 'Sky Lagoon or Blue Lagoon', note: '$60 / $90, book ahead' },
      { name: 'Snæfellsnes peninsula', note: 'A "mini Iceland" in a day' },
      { name: 'Aurora hunting tour', note: 'Best Sept–March, $70' }
    ],
    tips: [
      'Buy alcohol at Vínbúðin, the state shop — bars are shockingly expensive.',
      'Download the SafeTravel app; wind closes roads without warning.',
      'A 4x4 is unnecessary in summer, but winter driving needs proper tyres.'
    ],
    gettingAround:
      'Rental car is the only realistic way to see the south coast (~$70/day). Ring Road is 1,332 km and takes 7–10 days properly.',
    climate: { temp: [1, 1, 3, 6, 9, 12, 13, 12, 9, 6, 3, 1], rain: [75, 70, 80, 60, 45, 55, 60, 70, 75, 90, 85, 80] },
    crowd: [2, 2, 2, 3, 4, 5, 5, 5, 4, 3, 2, 3],
    ratingAvg: 4.8,
    ratingCount: 671,
    related: ['queenstown', 'banff', 'santorini'],
    reviews: [
      { name: 'Erik H.', avatar: 'i.pravatar.cc/80?img=51', rating: 5, date: '2026-02-08', text: 'Saw the aurora on night three from a car park near Vík. Bring a tripod and a warm bum bag.' },
      { name: 'Lucy W.', avatar: 'i.pravatar.cc/80?img=36', rating: 5, date: '2025-07-15', text: 'Midnight sun means you can hike at 11pm. Wildly expensive food-wise — we shopped at Bónus daily.' },
      { name: 'Sam T.', avatar: 'i.pravatar.cc/80?img=60', rating: 4, date: '2025-10-02', text: 'South coast in October: fewer people, stormy skies, dramatic photos. Just check road.is every morning.' }
    ]
  },
  {
    id: 'chiang-mai',
    name: 'Chiang Mai',
    country: 'Thailand',
    region: 'Asia',
    tagline: 'Mountain temples, night markets and the digital-nomad capital.',
    description:
      'Chiang Mai is where backpackers stop rushing. Set among the hills of northern Thailand, it has the lowest cost of comfortable living anywhere in the region, an obsessive food scene, and enough coworking cafés to fund a month-long stay. Come for the temples and khao soi, stay for the slow mornings and $2 massages.',
    interests: ['culture', 'food', 'adventure'],
    budgetLevel: 'budget',
    tripLength: 6,
    lengthNote: '5–8 days',
    budget: { budget: 25, mid: 65, luxury: 200 },
    bestTime: 'November – February (cool, dry)',
    currency: 'Thai Baht (THB)',
    language: 'Thai',
    visa: 'Visa-free 30 days for most nationalities',
    coords: [18.7883, 98.9853],
    images: [
      IMG('1528181304800-259b08848526'),
      IMG('1552465011-b4e21bf6e79a'),
      IMG('1504457047772-27faf1c00561')
    ],
    highlights: [
      'Doi Suthep temple above the city at sunrise',
      'Khao soi at a street-side shop for $1.50',
      'Sunday Walking Market on Ratchadamnoen Road',
      'Ethical elephant sanctuary visit in the Mae Taeng valley'
    ],
    thingsToDo: [
      { name: 'Wat Phra That Doi Suthep', note: '306 steps, 30 min up' },
      { name: 'Thai cooking class', note: '$25, market tour included' },
      { name: 'Ethical elephant sanctuary', note: '$50, no riding, ever' },
      { name: 'Doi Inthanon national park', note: 'Thailand’s highest peak' },
      { name: 'Sunday Walking Market', note: 'Best night market in town' },
      { name: 'Muay Thai beginner class', note: '$10 a session' }
    ],
    tips: [
      'April is burning season — the air quality turns genuinely bad. Avoid if you can.',
      'Grab and InDrive both work; a red truck songthaew costs 30 baht in town.',
      'Nimmanhaemin road has the cafés; the old city has the temples.'
    ],
    gettingAround:
      'Old city is walkable. Songthaews (red trucks) $0.50 in town. Scooter rental $4/day. Intercity trains bookable online.',
    climate: { temp: [25, 28, 31, 33, 32, 31, 30, 30, 30, 29, 27, 25], rain: [10, 20, 40, 80, 180, 140, 160, 230, 220, 110, 30, 10] },
    crowd: [5, 5, 4, 2, 2, 3, 3, 3, 3, 4, 5, 5],
    ratingAvg: 4.8,
    ratingCount: 1402,
    related: ['bali-indonesia', 'hanoi-vietnam', 'lisbon'],
    reviews: [
      { name: 'Freya N.', avatar: 'i.pravatar.cc/80?img=41', rating: 5, date: '2026-01-05', text: 'Lived here for a month on $600. Khao soi every other day and a $2 massage after. No regrets.' },
      { name: 'Marco D.', avatar: 'i.pravatar.cc/80?img=11', rating: 5, date: '2025-12-19', text: 'The elephant sanctuary was the emotional high point of our whole trip. Ethical, no tricks.' },
      { name: 'Jess B.', avatar: 'i.pravatar.cc/80?img=23', rating: 4, date: '2026-03-30', text: 'Loved it, but visit in January not April — burning season haze is real.' }
    ]
  },
  {
    id: 'hanoi-vietnam',
    name: 'Hanoi & Ha Long Bay',
    country: 'Vietnam',
    region: 'Asia',
    tagline: 'Old-quarter chaos, egg coffee and limestone bays.',
    description:
      'Hanoi is Vietnam at its most alive: scooters in rivers, pho at dawn, and a lake in the middle of it all. Pair the city with two nights on a junk boat in Ha Long Bay or the quieter Lan Ha Bay. Street food here is among the best — and cheapest — on the planet, and a full day of eating costs less than a single restaurant mains back home.',
    interests: ['food', 'culture', 'adventure'],
    budgetLevel: 'budget',
    tripLength: 6,
    lengthNote: '5–8 days',
    budget: { budget: 30, mid: 75, luxury: 220 },
    bestTime: 'October – December (autumn), March – April',
    currency: 'Vietnamese Dong (VND)',
    language: 'Vietnamese',
    visa: 'E-visa, 90 days, most nationalities',
    coords: [21.0278, 105.8342],
    images: [
      IMG('1509114397022-ed747cca3f65'),
      IMG('1528127269322-539801943592'),
      IMG('1555921015-5532091f6026')
    ],
    highlights: [
      'Bun cha and egg coffee in the old quarter',
      'Two nights on a Ha Long Bay junk boat',
      'Train Street coffee, if you time it right',
      'Water puppet theatre at Thang Long'
    ],
    thingsToDo: [
      { name: 'Ha Long Bay overnight cruise', note: '$130 for 2 days' },
      { name: 'Old Quarter food walking tour', note: '$35, eats included' },
      { name: 'Hoàn Kiến Lake & Ngọc Sơn Temple', note: '$1 entry' },
      { name: 'Train Street', note: 'Go 5–5.30pm, buy a coffee' },
      { name: 'Hỏa Lò "Hanoi Hilton" museum', note: '$1.50' },
      { name: 'Ninh Bình day trip', note: 'Ha Long on land, 2h away' }
    ],
    tips: [
      'Cross the road slowly and steadily — the scooters flow around you.',
      'Carry small notes; street vendors rarely break large bills.',
      'Download Grab before you land; it settles most transport arguments.'
    ],
    gettingAround:
      'Walk the old quarter, Grab for everything else (rides from $1). Overnight train or 2-hour flight to Ho Chi Minh City.',
    climate: { temp: [17, 18, 21, 26, 30, 32, 33, 32, 31, 28, 24, 20], rain: [20, 25, 45, 90, 190, 240, 310, 330, 260, 130, 40, 20] },
    crowd: [3, 3, 3, 3, 3, 4, 5, 5, 4, 5, 4, 3],
    ratingAvg: 4.8,
    ratingCount: 1136,
    related: ['chiang-mai', 'bali-indonesia', 'mexico-city'],
    reviews: [
      { name: 'Hannah O.', avatar: 'i.pravatar.cc/80?img=16', rating: 5, date: '2026-04-17', text: 'The Ninh Bình day trip blew us away — and it costs $15 all in. Do not skip it.' },
      { name: 'Victor L.', avatar: 'i.pravatar.cc/80?img=53', rating: 5, date: '2025-11-08', text: 'Ate four times a day for $15 total. The bun cha place near the lake is legendary for a reason.' },
      { name: 'Aisha R.', avatar: 'i.pravatar.cc/80?img=39', rating: 4, date: '2026-01-24', text: 'Ha Long Bay is busy but still spectacular. Lan Ha Bay is the calmer, better choice.' }
    ]
  },
  {
    id: 'marrakech-morocco',
    name: 'Marrakech',
    country: 'Morocco',
    region: 'Africa',
    tagline: 'Souks, riads and mint tea on a rooftop at dusk.',
    description:
      'Marrakech hits the senses immediately: the call to prayer, the spice stalls, the snake charmers in Jemaa el-Fna. Stay in a traditional riad inside the medina, haggle with a smile in the souks, and take a day trip over the Atlas to the Atlas Mountains or the Agafay desert. It is an easy, cheap flight from Europe and a total change of scenery.',
    interests: ['culture', 'food', 'adventure'],
    budgetLevel: 'mid',
    tripLength: 4,
    lengthNote: '3–5 days',
    budget: { budget: 35, mid: 90, luxury: 320 },
    bestTime: 'March – May, September – November',
    currency: 'Moroccan Dirham (MAD)',
    language: 'Arabic, Berber, French',
    visa: 'Visa-free 90 days for many nationalities',
    coords: [31.6295, -7.9811],
    images: [
      IMG('1597212618440-806262de4f6b'),
      IMG('1539020140153-e479b8c22e70'),
      IMG('1489749798305-4fea3ae63d43')
    ],
    highlights: [
      'Losing an afternoon in the souks of the medina',
      'Jemaa el-Fna at night: food stalls, storytellers, musicians',
      'Sunrise hot-air balloon over the palmeraie',
      'Day trip to the Ourika Valley in the Atlas Mountains'
    ],
    thingsToDo: [
      { name: 'Jemaa el-Fna night market', note: 'Entry free, eat for $6' },
      { name: 'Bahia Palace & Saadian Tombs', note: '$8 combined' },
      { name: 'Jardin Majorelle + YSL museum', note: '$20, book online' },
      { name: 'Medina souk walking tour', note: '$25 with a guide' },
      { name: 'Atlas Mountains day trip', note: '$30, Berber villages' },
      { name: 'Agafay desert quad + dinner', note: '$60 half day' }
    ],
    tips: [
      'Agree on a taxi price before getting in, or insist on the meter.',
      'Bring a scarf — covering shoulders and knees gets you into everything.',
      'Riad doors are easy to miss. Save the host’s WhatsApp before you arrive.'
    ],
    gettingAround:
      'The medina is pedestrian-only and maze-like. Petit taxis are $2–4 across town. Grand taxis for airport and day trips.',
    climate: { temp: [13, 15, 18, 20, 24, 28, 31, 31, 27, 22, 17, 14], rain: [30, 30, 30, 25, 10, 5, 1, 3, 10, 25, 40, 30] },
    crowd: [3, 3, 4, 5, 5, 3, 2, 2, 4, 5, 4, 3],
    ratingAvg: 4.6,
    ratingCount: 918,
    related: ['istanbul', 'lisbon', 'cape-town'],
    reviews: [
      { name: 'Elena S.', avatar: 'i.pravatar.cc/80?img=5', rating: 5, date: '2026-03-14', text: 'Our riad had a rooftop with a view of the Atlas mountains. $40 a night. Still dream about it.' },
      { name: 'Ben C.', avatar: 'i.pravatar.cc/80?img=60', rating: 4, date: '2025-10-27', text: 'Haggling is exhausting but part of it. Smile, quote half, walk away — it works every time.' },
      { name: 'Yuki T.', avatar: 'i.pravatar.cc/80?img=48', rating: 5, date: '2026-05-03', text: 'Atlas Mountains day trip with a local guide was the best $30 we spent all year.' }
    ]
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    tagline: 'Table Mountain, penguin beaches and wine valleys.',
    description:
      'Cape Town stacks more into one city than almost anywhere: a flat-topped mountain, two oceans, penguin colonies, vineyards and a food scene punching far above its price. Table Mountain at sunrise, Chapman’s Peak Drive at golden hour, and Stellenbosch for a long lunch — it is a two-week trip compressed into five days.',
    interests: ['adventure', 'nature', 'food'],
    budgetLevel: 'mid',
    tripLength: 6,
    lengthNote: '5–8 days',
    budget: { budget: 40, mid: 100, luxury: 330 },
    bestTime: 'November – March (their summer)',
    currency: 'South African Rand (ZAR)',
    language: 'English, Afrikaans, Zulu',
    visa: 'Visa-free 90 days for many nationalities',
    coords: [-33.9249, 18.4241],
    images: [
      IMG('1580060839134-75a5edca2e99'),
      IMG('1516026672322-bc52d61a55d5'),
      IMG('1552152974-19b9caf99b5d')
    ],
    highlights: [
      'Table Mountain via the cable car or Platteklip Gorge hike',
      'Chapman’s Peak Drive, one of the world’s great coastal roads',
      'African penguins at Boulders Beach',
      'Wine tasting in Stellenbosch or Franschhoek'
    ],
    thingsToDo: [
      { name: 'Table Mountain summit', note: 'Cable car $25 or hike free' },
      { name: 'Cape of Good Hope & Cape Point', note: 'Full day, go early' },
      { name: 'Boulders Beach penguins', note: '$8 entry' },
      { name: 'Stellenbosch wine route', note: 'Hop-on wine tram $30' },
      { name: 'Kirstenbosch gardens', note: 'Summer sunset concerts' },
      { name: 'Robben Island', note: '$25, book weeks ahead' }
    ],
    tips: [
      'Do not walk alone at night in the city centre — Uber is $3 and everywhere.',
      'The "Cape Doctor" south-east wind is strong in summer; hold your hat.',
      'Load a virtual Metro card for MyCiTi buses to the airport.'
    ],
    gettingAround:
      'Uber/Didi are cheap and safe by day and night. Rental car is best for the peninsula. MyCiTi bus to the airport, ~$4.',
    climate: { temp: [21, 21, 20, 18, 16, 14, 14, 15, 16, 18, 20, 21], rain: [15, 15, 20, 40, 70, 95, 85, 70, 45, 30, 20, 15] },
    crowd: [5, 5, 4, 3, 2, 2, 2, 3, 3, 4, 5, 5],
    ratingAvg: 4.8,
    ratingCount: 1044,
    related: ['queenstown', 'marrakech-morocco', 'mexico-city'],
    reviews: [
      { name: 'Grace M.', avatar: 'i.pravatar.cc/80?img=9', rating: 5, date: '2026-02-16', text: 'Chapman’s Peak at sunset then fish and chips in Kalk Bay. Cape Town does golden hour better than anywhere.' },
      { name: 'Omar F.', avatar: 'i.pravatar.cc/80?img=68', rating: 5, date: '2025-12-05', text: 'Wine tram + penguins + Table Mountain in three days. So much value for money.' },
      { name: 'Katie J.', avatar: 'i.pravatar.cc/80?img=31', rating: 4, date: '2026-01-11', text: 'Just be sensible about where you walk after dark. Otherwise it is a joy.' }
    ]
  },
  {
    id: 'cusco-machu-picchu',
    name: 'Cusco & Machu Picchu',
    country: 'Peru',
    region: 'Americas',
    tagline: 'Inca stonework, Andean air and the lost city.',
    description:
      'Cusco is the best base in South America: a Inca-walled city at 3,400m with cobbled streets, market food and easy access to the Sacred Valley. Machu Picchu is the headline, but the rainbow mountains, the Maras salt pans and a bowl of causa in San Pedro market are what make the trip. Give yourself three days in Cusco to acclimatise before you climb anything.',
    interests: ['adventure', 'culture', 'nature'],
    budgetLevel: 'mid',
    tripLength: 7,
    lengthNote: '6–9 days',
    budget: { budget: 40, mid: 105, luxury: 300 },
    bestTime: 'May – September (dry season)',
    currency: 'Peruvian Sol (PEN)',
    language: 'Spanish, Quechua',
    visa: 'Visa-free up to 183 days for many nationalities',
    coords: [-13.5319, -71.9675],
    images: [
      IMG('1526392060635-9d6019884377'),
      IMG('1587595431973-160d0d94add1'),
      IMG('1531065215491-2ef1b1d4d4b0')
    ],
    highlights: [
      'First train-slot entry to Machu Picchu at 6am',
      'Sacsayhuamán’s megalithic walls above Cusco',
      'Rainbow Mountain at sunrise (if acclimatised)',
      'San Pedro market for juices and cuy'
    ],
    thingsToDo: [
      { name: 'Machu Picchu guided entry', note: 'From $75 + train ~$100' },
      { name: 'Sacred Valley day trip', note: 'Pisac, Ollantaytambo, $40' },
      { name: 'Rainbow Mountain trek', note: '$35 tour, 5,000m' },
      { name: 'Maras & Moray salt pans', note: 'Half day, $30' },
      { name: 'San Pedro market', note: 'Juices $0.50' },
      { name: 'Salkantay 5-day trek', note: 'Alternative to Inca Trail' }
    ],
    tips: [
      'Spend 2–3 days in Cusco doing nothing before any trek — altitude is real.',
      'Machu Picchu tickets sell out weeks ahead in high season. Book online.',
      'Coca tea helps; so does drinking twice the water you think you need.'
    ],
    gettingAround:
      'Walking in Cusco (steep!). Colectivo taxis cost $0.50. Train to Aguas Calientes is $70–100 return, book early.',
    climate: { temp: [13, 13, 13, 14, 13, 12, 12, 13, 14, 15, 15, 14], rain: [140, 130, 110, 40, 10, 5, 5, 10, 35, 75, 110, 130] },
    crowd: [3, 3, 4, 4, 5, 5, 5, 5, 4, 3, 3, 4],
    ratingAvg: 4.9,
    ratingCount: 887,
    related: ['mexico-city', 'queenstown', 'hanoi-vietnam'],
    reviews: [
      { name: 'Laura P.', avatar: 'i.pravatar.cc/80?img=24', rating: 5, date: '2026-06-20', text: 'Sunrise at Machu Picchu with the mist lifting. Book the 6am slot — you get it almost to yourself.' },
      { name: 'Tom H.', avatar: 'i.pravatar.cc/80?img=14', rating: 5, date: '2025-07-09', text: 'Day two at altitude was rough. Third day I felt fine and hiked Sacsayhuamán. Take it slow.' },
      { name: 'Mira J.', avatar: 'i.pravatar.cc/80?img=37', rating: 4, date: '2026-04-25', text: 'Rainbow Mountain is crowded but staggering. The Sacred Valley day trip was actually my favourite.' }
    ]
  },
  {
    id: 'mexico-city',
    name: 'Mexico City',
    country: 'Mexico',
    region: 'Americas',
    tagline: 'Tacos al pastor, murals and neighbourhood cafés.',
    description:
      'Mexico City is one of the great underrated capitals: world-class museums, a UNESCO historic centre, tacos at every corner, and neighbourhoods like Roma and Condesa that reward wandering for days. It is big, it is loud, and it is remarkably good value. Come hungry and give it at least four days — a week is better.',
    interests: ['food', 'culture', 'nightlife'],
    budgetLevel: 'budget',
    tripLength: 5,
    lengthNote: '4–6 days',
    budget: { budget: 35, mid: 95, luxury: 280 },
    bestTime: 'March – May, October – November',
    currency: 'Mexican Peso (MXN)',
    language: 'Spanish',
    visa: 'Visa-free 180 days for many nationalities',
    coords: [19.4326, -99.1332],
    images: [
      IMG('1518659526055-1a9a1d0b0f14'),
      IMG('1518105779142-d975f22f1b0a'),
      IMG('1585464231875-d9ef1f5ad396')
    ],
    highlights: [
      'Tacos al pastor from a Roma taquería at midnight',
      'Frida Kahlo’s Casa Azul in Coyoacán',
      'Xochimilco trajinera boats on a Sunday',
      'Ballet Folklórico at Palacio de Bellas Artes'
    ],
    thingsToDo: [
      { name: 'Teotihuacán pyramids', note: 'Bus from Autobuses del Norte, $4' },
      { name: 'Museo Frida Kahlo (Casa Azul)', note: '$12, timed entry' },
      { name: 'Bellas Artes + Palacio de Bellas Artes', note: 'Free Tue mornings' },
      { name: 'Xochimilco canals', note: '$25 per boat, Sundays best' },
      { name: 'Roma & Condesa food crawl', note: 'Taco crawl $10' },
      { name: 'Lucha libre at Arena México', note: '$10, Tuesday & Friday' }
    ],
    tips: [
      'Stay in Roma, Condesa or Juárez — they are walkable and well-lit at night.',
      'Use Uber rather than street taxis, especially after dark.',
      'The city sits at 2,240m: you may feel it the first day.'
    ],
    gettingAround:
      'Metro is $0.30 and extensive but crowded at rush hour. Uber rides average $3–5. Metrobús Line 1 crosses the centre.',
    climate: { temp: [16, 18, 20, 21, 21, 20, 19, 19, 19, 18, 17, 16], rain: [10, 10, 20, 50, 110, 160, 180, 170, 140, 60, 15, 10] },
    crowd: [3, 3, 4, 4, 4, 3, 3, 3, 3, 4, 5, 3],
    ratingAvg: 4.7,
    ratingCount: 1219,
    related: ['cusco-machu-picchu', 'lisbon', 'istanbul'],
    reviews: [
      { name: 'Diego R.', avatar: 'i.pravatar.cc/80?img=52', rating: 5, date: '2026-05-29', text: 'Ate four tacos for $3 and had the best meal of the trip. The city is generous like that.' },
      { name: 'Sara N.', avatar: 'i.pravatar.cc/80?img=26', rating: 5, date: '2025-11-14', text: 'Teotihuacán at opening, back for tacos by lunch. Uber everywhere made it easy.' },
      { name: 'Paul K.', avatar: 'i.pravatar.cc/80?img=57', rating: 4, date: '2026-02-27', text: 'Frida museum tickets sold out — book a week ahead. Roma is the neighbourhood to stay in.' }
    ]
  },
  {
    id: 'banff',
    name: 'Banff & Lake Louise',
    country: 'Canada',
    region: 'Americas',
    tagline: 'Turquoise lakes and Rocky Mountain highways.',
    description:
      'Banff is postcard Canada: glacier-fed lakes so blue they look photoshopped, elk wandering through town, and the Icefields Parkway, one of the great road trips on earth. Summer for hiking and canoeing, winter for skiing. It is not cheap, but a campervan or a hostel bunk keeps it manageable.',
    interests: ['nature', 'adventure'],
    budgetLevel: 'luxury',
    tripLength: 6,
    lengthNote: '5–8 days',
    budget: { budget: 70, mid: 170, luxury: 430 },
    bestTime: 'June – September, December – March (skiing)',
    currency: 'Canadian Dollar (CAD)',
    language: 'English, French',
    visa: 'eTA/visa required, easy online for most',
    coords: [51.1784, -115.5708],
    images: [
      IMG('1506905925346-21bda4d32df4'),
      IMG('1609825488217-e2e4f3f39d2e'),
      IMG('1441974231531-c6227db76b6e')
    ],
    highlights: [
      'Canoeing on Lake Louise at 7am before the day trippers',
      'Driving the Icefields Parkway to Jasper',
      'Sunrise at Moraine Lake (shuttle required)',
      'Grizzly spotting on the Bow Valley Parkway'
    ],
    thingsToDo: [
      { name: 'Lake Louise & Moraine Lake', note: 'Parks pass $10/day' },
      { name: 'Icefields Parkway drive', note: '230 km, plan a full day' },
      { name: 'Plain of Six Glaciers hike', note: '14 km loop, tea house' },
      { name: 'Banff Gondola', note: '$35, sunset is best' },
      { name: 'Johnston Canyon ice walk', note: 'Free, winter magic' },
      { name: 'Hot springs at Banff Upper', note: '$13, tired legs cure' }
    ],
    tips: [
      'Moraine Lake parking fills by 7am in summer — take Parks Canada shuttle.',
      'A wildlife pass and bear spray are not optional on trail.',
      'Groceries in Canmore are 30% cheaper than in Banff town.'
    ],
    gettingAround:
      'Rental car is essential for the Parkway. Roam Transit connects Banff and Lake Louise ($10). Shuttle to Moraine Lake in summer.',
    climate: { temp: [-9, -7, -2, 4, 9, 13, 16, 15, 10, 4, -3, -8], rain: [15, 15, 20, 30, 60, 90, 85, 75, 50, 30, 20, 15] },
    crowd: [2, 2, 2, 3, 4, 5, 5, 5, 5, 4, 3, 4],
    ratingAvg: 4.9,
    ratingCount: 765,
    related: ['reykjavik-iceland', 'queenstown', 'cape-town'],
    reviews: [
      { name: 'Amy T.', avatar: 'i.pravatar.cc/80?img=43', rating: 5, date: '2025-08-21', text: 'Moraine Lake before 7am with nobody else there is a core memory now. Take the first shuttle.' },
      { name: 'Greg S.', avatar: 'i.pravatar.cc/80?img=56', rating: 5, date: '2026-01-30', text: 'Winter Banff is a different world — frozen waterfalls and no crowds. Johnston Canyon was magic.' },
      { name: 'Nadia E.', avatar: 'i.pravatar.cc/80?img=21', rating: 4, date: '2026-07-04', text: 'Expensive, but Canmore base + self-catering saved us hundreds. Icefields Parkway is worth the fuel.' }
    ]
  },
  {
    id: 'queenstown',
    name: 'Queenstown',
    country: 'New Zealand',
    region: 'Oceania',
    tagline: 'The adventure capital of the southern hemisphere.',
    description:
      'Queenstown is where you go to do the thing you have been putting off: bungy, skydiving, jet boats, or a three-day Great Walk. Even if adrenaline is not your thing, the Remarkables reflected in Lake Wakatipu and the Milford Sound day trip justify the flight. It is peak-season expensive but endlessly scenic.',
    interests: ['adventure', 'nature'],
    budgetLevel: 'luxury',
    tripLength: 6,
    lengthNote: '5–8 days',
    budget: { budget: 65, mid: 165, luxury: 460 },
    bestTime: 'December – March (summer), June – August (ski)',
    currency: 'New Zealand Dollar (NZD)',
    language: 'English, Māori',
    visa: 'NZeTA required, easy online for many',
    coords: [-45.0312, 168.6626],
    images: [
      IMG('1507699622108-4be3abd695ad'),
      IMG('1469474968028-56623f02e42e'),
      IMG('1578662996442-48f60103fc96')
    ],
    highlights: [
      'The original Kawarau Bridge bungy jump',
      'Milford Sound cruise through fiord rain',
      'Sunrise hike up Ben Lomond',
      'Lake Wakatipu at golden hour from the TSS Earnslaw'
    ],
    thingsToDo: [
      { name: 'Milford Sound day trip', note: '8h drive — go by coach' },
      { name: 'Bungy at Kawarau Bridge', note: '$205, birthplace of it' },
      { name: 'Skydiving over Lake Wakatipu', note: 'From $300' },
      { name: 'Routeburn Track day hike', note: 'One of the Great Walks' },
      { name: 'Shotover Jet boat', note: '$160, 25 min of thrills' },
      { name: 'Gibbston Valley winery', note: 'Pinot noir, cellar door' }
    ],
    tips: [
      'A NZeTA in advance saves you a $100 fine at the airport.',
      'Hire a car rather than a campervan if you are not camping — vans are pricey.',
      'Do Milford in a tour; you will spend the drive otherwise, not the fiord.'
    ],
    gettingAround:
      'Central Queenstown is walkable. Rental car $45/day. InterCity buses link to Wanaka and Te Anau. Flights from Auckland, 2h.',
    climate: { temp: [16, 16, 14, 11, 8, 6, 6, 7, 9, 11, 13, 15], rain: [75, 65, 70, 70, 75, 70, 65, 75, 70, 85, 80, 80] },
    crowd: [5, 5, 4, 3, 3, 4, 5, 5, 3, 3, 4, 5],
    ratingAvg: 4.9,
    ratingCount: 702,
    related: ['banff', 'cape-town', 'reykjavik-iceland'],
    reviews: [
      { name: 'Jack W.', avatar: 'i.pravatar.cc/80?img=13', rating: 5, date: '2026-01-08', text: 'Skydiving here was terrifying and perfect. The Milford Sound cruise in the rain was equally good.' },
      { name: 'Petra H.', avatar: 'i.pravatar.cc/80?img=35', rating: 5, date: '2025-12-28', text: 'Spent 6 days and still wanted more. The Routeburn Track is world class and mostly empty.' },
      { name: 'Liam O.', avatar: 'i.pravatar.cc/80?img=62', rating: 4, date: '2026-03-17', text: 'Prices hurt — budget $160/day easily. The scenery makes it worth it.' }
    ]
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    tagline: 'Harbour swims, coastal walks and flat whites.',
    description:
      'Sydney is the easiest great city in the world to enjoy: a working harbour, surf beaches ten minutes from the centre, and a café culture that takes coffee seriously. The Bondi to Coogee coastal walk and a ferry to Manly beat most paid attractions. Visit October to April for warm weather and long evenings.',
    interests: ['relaxation', 'nature', 'nightlife', 'food'],
    budgetLevel: 'luxury',
    tripLength: 5,
    lengthNote: '4–6 days',
    budget: { budget: 60, mid: 150, luxury: 420 },
    bestTime: 'September – November, March – May',
    currency: 'Australian Dollar (AUD)',
    language: 'English',
    visa: 'ETA/eVisitor required, online for most',
    coords: [-33.8688, 151.2093],
    images: [
      IMG('1506973035872-a4ec16b8e8d0'),
      IMG('1524293581917-878a6d017c71'),
      IMG('1523482580672-f109ba8cb9be')
    ],
    highlights: [
      'Bondi to Coogee coastal walk at sunrise',
      'Ferry to Manly, best $6 view in Australia',
      'Harbour Bridge climb at dusk',
      'Sunday sessions in Watsons Bay'
    ],
    thingsToDo: [
      { name: 'Bondi to Coogee coastal walk', note: '6 km, free, 2 hours' },
      { name: 'Manly ferry', note: '$6.50 Opal, 30 min' },
      { name: 'Sydney Opera House tour', note: '$43 or see a show' },
      { name: 'Blue Mountains day trip', note: 'Train 2h, $15 return' },
      { name: 'Royal National Park', note: 'Australia’s second oldest' },
      { name: 'Barangaroo & Circular Quay eats', note: 'Harbour-side dining' }
    ],
    tips: [
      'Get an Opal card — contactless payment caps your weekly fares too.',
      'March to May is the sweet spot: warm water, fewer tourists, lower prices.',
      'Free swimming pools at Bronte and North Bondi beat the surf sometimes.'
    ],
    gettingAround:
      'Opal card on trains, buses and ferries. Airport train $17. Central to Bondi is 20 min by bus. Everything coastal is walkable.',
    climate: { temp: [23, 23, 22, 19, 16, 14, 13, 15, 17, 19, 21, 23], rain: [100, 110, 110, 120, 100, 110, 95, 80, 70, 75, 85, 80] },
    crowd: [5, 5, 4, 4, 3, 2, 2, 3, 3, 4, 5, 5],
    ratingAvg: 4.7,
    ratingCount: 998,
    related: ['queenstown', 'bali-indonesia', 'lisbon'],
    reviews: [
      { name: 'Ellie C.', avatar: 'i.pravatar.cc/80?img=49', rating: 5, date: '2026-04-30', text: 'Bondi to Coogee at 7am, swim at Bronte, flat white after. That was our whole morning every day.' },
      { name: 'Ravi M.', avatar: 'i.pravatar.cc/80?img=58', rating: 4, date: '2025-10-18', text: 'Blue Mountains day trip is easy by train. The city itself is pricey but the harbour is free.' },
      { name: 'Hanna L.', avatar: 'i.pravatar.cc/80?img=7', rating: 5, date: '2026-02-09', text: 'The Manly ferry might be the best value attraction anywhere. Sit on the right side going over.' }
    ]
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    tagline: 'Desert dunes, sky-high views and old-souk charm.',
    description:
      'Dubai is a city of extremes: the world’s tallest building, indoor skiing, and a traditional abra crossing for one dirham. It works as a stopover or a short city break, and it is far better value outside the mega-hotels — eat in Deira and Al Karama, and save the Burj Khalifa for a free view from the Frame instead.',
    interests: ['culture', 'nightlife', 'adventure'],
    budgetLevel: 'luxury',
    tripLength: 4,
    lengthNote: '3–5 days',
    budget: { budget: 55, mid: 150, luxury: 600 },
    bestTime: 'November – March (pleasant, dry)',
    currency: 'UAE Dirham (AED)',
    language: 'Arabic, English widely spoken',
    visa: 'Visa on arrival / free for 30–60 days, nationality dependent',
    coords: [25.2048, 55.2708],
    images: [
      IMG('1512453979798-5ea266f8880c'),
      IMG('1518684079-3c830dcef090'),
      IMG('1526495124232-a04e1849168c')
    ],
    highlights: [
      'Desert safari with dune bashing and a bedouin-style dinner',
      'Burj Khalifa at sunset — or the Frame for free',
      'Gold and spice souks of old Deira',
      'Abra crossing Dubai Creek for one dirham'
    ],
    thingsToDo: [
      { name: 'Desert safari + BBQ dinner', note: '$50 half day' },
      { name: 'Burj Khalifa At The Top', note: '$40, book sunset slot' },
      { name: 'Dubai Frame & Old Dubai abra', note: '$15 / $0.27' },
      { name: 'Miracle Garden (winter only)', note: '$15' },
      { name: 'Jumeirah Beach & Burj Al Arab view', note: 'Free' },
      { name: 'Dubai Mall fountain show', note: 'Free, every 30 min' }
    ],
    tips: [
      'Metro covers the airport to downtown for $2 — taxis are $15+.',
      'Visit between November and March; June to August is dangerously hot.',
      'Dress modestly in mosques and old Dubai; swimwear stays at the beach.'
    ],
    gettingAround:
      'Metro Red and Green lines, taxis ($4 minimum), and the water taxi. Ride-hailing (Careem) works well. Traffic is heavy 4–7pm.',
    climate: { temp: [19, 21, 24, 29, 34, 36, 37, 37, 35, 30, 25, 21], rain: [10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 5, 15] },
    crowd: [5, 5, 4, 3, 2, 1, 1, 2, 2, 3, 4, 5],
    ratingAvg: 4.5,
    ratingCount: 1352,
    related: ['istanbul', 'marrakech-morocco', 'sydney'],
    reviews: [
      { name: 'Chris D.', avatar: 'i.pravatar.cc/80?img=17', rating: 5, date: '2025-12-12', text: 'Desert safari was the surprise hit. The old souk side of the city was far more interesting than the malls.' },
      { name: 'Mina K.', avatar: 'i.pravatar.cc/80?img=46', rating: 4, date: '2026-02-20', text: 'Great stopover. Metro is cheap and air-conditioned — the whole city is connected by it.' },
      { name: 'Andre B.', avatar: 'i.pravatar.cc/80?img=61', rating: 4, date: '2026-06-05', text: 'Went in June. Do NOT. Every outdoor activity is off. Come in January like everyone else.' }
    ]
  },
  {
    id: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    region: 'Europe',
    tagline: 'Where Europe meets Asia across the Bosphorus.',
    description:
      'Istanbul is a city that eats trip itineraries for breakfast. Hagia Sophia and the Blue Mosque a ten-minute walk apart, a Grand Bazaar that has traded for 500 years, and ferry rides across the Bosphorus for less than a coffee. Cross to Kadıköy on the Asian side for the real local food scene and a fraction of the tourist mark-up.',
    interests: ['culture', 'food', 'nightlife'],
    budgetLevel: 'budget',
    tripLength: 5,
    lengthNote: '4–6 days',
    budget: { budget: 35, mid: 90, luxury: 260 },
    bestTime: 'April – June, September – November',
    currency: 'Turkish Lira (TRY)',
    language: 'Turkish',
    visa: 'e-Visa for many nationalities, apply online',
    coords: [41.0082, 28.9784],
    images: [
      IMG('1541432901042-2d8bd64b4a9b'),
      IMG('1524231757912-21f4fe3a7200'),
      IMG('1527838832700-5059252407fa')
    ],
    highlights: [
      'Sunrise at the Blue Mosque, empty and blue-lit',
      'Hagia Sophia’s 1,500-year-old dome',
      'Bosphorus ferry from Eminönü to Anadolu Kavağı',
      'Spice Bazaar and a Turkish breakfast that lasts two hours'
    ],
    thingsToDo: [
      { name: 'Hagia Sophia & Blue Mosque', note: 'Free / donation' },
      { name: 'Topkapı Palace + Harem', note: '$20 combined' },
      { name: 'Grand & Spice Bazaars', note: 'Haggle politely' },
      { name: 'Bosphorus public ferry', note: '$2, 90 min return' },
      { name: 'Kadıköy food crawl (Asian side)', note: '$12 eats' },
      { name: 'Hammam bath experience', note: '$25–60' }
    ],
    tips: [
      'Get an Istanbulkart for metro, tram and ferries — it pays for itself in a day.',
      'Museums pass (Müzekart) is worth it for two or more sites.',
      'Kadıköy on a Sunday is the best market day in the city.'
    ],
    gettingAround:
      'Tram T1, metro and ferries on the Istanbulkart ($0.35/ride). Taxi drivers use the meter — insist on it. Airport metro line runs 24h.',
    climate: { temp: [6, 7, 9, 14, 19, 24, 27, 27, 23, 18, 13, 9], rain: [100, 80, 70, 50, 40, 30, 30, 40, 50, 80, 100, 110] },
    crowd: [2, 2, 3, 4, 4, 5, 5, 5, 5, 4, 3, 2],
    ratingAvg: 4.8,
    ratingCount: 1489,
    related: ['marrakech-morocco', 'lisbon', 'rome'],
    reviews: [
      { name: 'Zoe A.', avatar: 'i.pravatar.cc/80?img=28', rating: 5, date: '2026-04-05', text: 'The ferry to Anadolu Kavağı with a fish sandwich was the best $3 I have ever spent.' },
      { name: 'Henrik J.', avatar: 'i.pravatar.cc/80?img=54', rating: 5, date: '2025-10-31', text: 'Hagia Sophia at opening time — the light through the dome is unreal. Go early, go twice.' },
      { name: 'Mai P.', avatar: 'i.pravatar.cc/80?img=9', rating: 4, date: '2026-05-22', text: 'Get off the tram and walk the back streets of Kadıköy. The tourist restaurants by the mosque are overpriced.' }
    ]
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    region: 'Europe',
    tagline: 'Ancient stones, carbonara and evening passeggiata.',
    description:
      'Rome is not a city you sightsee — it is a city you wander. The Colosseum and Pantheon are non-negotiable, but the real magic is between them: a cacio e pepe at a counter, a fountain you did not plan for, gelato at 11pm. Four full days lets you see the big three without turning it into a checklist.',
    interests: ['culture', 'food'],
    budgetLevel: 'mid',
    tripLength: 4,
    lengthNote: '4–5 days',
    budget: { budget: 55, mid: 130, luxury: 380 },
    bestTime: 'April – June, late September – October',
    currency: 'Euro (EUR)',
    language: 'Italian',
    visa: 'Schengen zone, visa-free 90 days for many nationalities',
    coords: [41.9028, 12.4964],
    images: [
      IMG('1552832230-c0197dd311b5'),
      IMG('1531572753322-ad063cecc140'),
      IMG('1533676802871-eca1ae998cd8')
    ],
    highlights: [
      'The Colosseum underground level, booked in advance',
      'Trevi Fountain at 6am, before the crowds',
      'Trastevere for dinner and evening strolls',
      'Gianicolo hill for the best free panorama'
    ],
    thingsToDo: [
      { name: 'Colosseum + Roman Forum', note: '$22 combo, timed entry' },
      { name: 'Vatican Museums & Sistine Chapel', note: '$20, go Wednesday' },
      { name: 'Pantheon (free entry)', note: 'Book the free slot online' },
      { name: 'Trastevere food walk', note: '$45 guided crawl' },
      { name: 'Villa Borghese gardens', note: 'Gallery $15, book ahead' },
      { name: 'Day trip to Tivoli (Villa d’Este)', note: 'Train 50 min, $5' }
    ],
    tips: [
      'Book Vatican and Colosseum tickets weeks ahead or queue for hours.',
      'Avoid restaurants directly beside the Trevi Fountain — tourist menus, poor pasta.',
      'Azzurro Colosseum; Blu Roma: drink from the fountains, they are clean.'
    ],
    gettingAround:
      'Metro A and B plus buses on a 24/48h pass ($8). Centro storico is best walked. Taxis are metered and reasonable from fixed ranks.',
    climate: { temp: [8, 9, 12, 16, 21, 25, 28, 28, 24, 19, 13, 9], rain: [70, 65, 60, 65, 50, 35, 20, 30, 70, 100, 110, 90] },
    crowd: [2, 2, 3, 5, 5, 5, 4, 4, 5, 5, 3, 3],
    ratingAvg: 4.8,
    ratingCount: 1663,
    related: ['lisbon', 'santorini-greece', 'istanbul'],
    reviews: [
      { name: 'Isabel F.', avatar: 'i.pravatar.cc/80?img=38', rating: 5, date: '2026-05-11', text: 'Trevi at dawn, empty and lit gold. Trastevere at night, full of life. The perfect day.' },
      { name: 'Nathan R.', avatar: 'i.pravatar.cc/80?img=18', rating: 4, date: '2025-09-24', text: 'Book Colosseum underground tickets a month out — we did not and regretted it badly.' },
      { name: 'Clara V.', avatar: 'i.pravatar.cc/80?img=30', rating: 5, date: '2026-03-08', text: 'Ate in Testaccio instead of the centre: half the price, twice the quality. Go where the Romans go.' }
    ]
  },
  {
    id: 'krakow',
    name: 'Kraków',
    country: 'Poland',
    region: 'Europe',
    tagline: 'Medieval squares, pierogi and absurdly good value.',
    description:
      'Kraków is Europe’s best-kept budget secret: a perfectly preserved old town, a castle on a hill, and dinners for €10 that would cost €35 in Berlin. Base yourself in Kazimierz, the old Jewish quarter, now full of bars, vinyl shops and street food. It is also the gateway to Auschwitz and the Wieliczka salt mine.',
    interests: ['culture', 'food', 'nightlife'],
    budgetLevel: 'budget',
    tripLength: 3,
    lengthNote: '3–4 days',
    budget: { budget: 30, mid: 75, luxury: 210 },
    bestTime: 'May – June, September – October',
    currency: 'Polish Złoty (PLN)',
    language: 'Polish',
    visa: 'Schengen zone, visa-free 90 days for many nationalities',
    coords: [50.0647, 19.9450],
    images: [
      IMG('1519197924294-4ba991a11128'),
      IMG('1607427293702-03575c13e0b4'),
      IMG('1559564484-e48b3907608d')
    ],
    highlights: [
      'Main Market Square at sunrise, the largest in Europe',
      'Wawel Castle overlooking the Vistula',
      'Pierogi crawl through Kazimierz',
      'Wieliczka salt mine, 100m underground'
    ],
    thingsToDo: [
      { name: 'Main Market Square & Cloth Hall', note: 'Free' },
      { name: 'Wawel Royal Castle', note: 'Free courtyard, paid rooms' },
      { name: 'Wieliczka Salt Mine', note: '$30 guided, 90 min' },
      { name: 'Auschwitz-Birkenau day trip', note: 'Free entry, book ahead' },
      { name: 'Kazimierz bar hop', note: 'Bars from $3' },
      { name: 'Vistula riverbank cycling', note: 'Bike hire $6/day' }
    ],
    tips: [
      'Auschwitz tickets are free but sell out months ahead — book the moment you plan.',
      'Eat at milk bars (bar mleczny) for €3 traditional lunches.',
      'Kazimierz is where to stay: walkable, lively, cheaper than the old town.'
    ],
    gettingAround:
      'The old town is compact and walkable. Trams and buses on a 24h ticket ($2). Airport tram takes 20 minutes, $1.50.',
    climate: { temp: [1, 3, 8, 14, 19, 22, 24, 24, 19, 13, 7, 3], rain: [40, 35, 40, 45, 70, 80, 80, 65, 55, 45, 45, 40] },
    crowd: [2, 2, 2, 3, 4, 5, 5, 5, 4, 3, 2, 4],
    ratingAvg: 4.8,
    ratingCount: 812,
    related: ['lisbon', 'istanbul', 'rome'],
    reviews: [
      { name: 'Marta Z.', avatar: 'i.pravatar.cc/80?img=40', rating: 5, date: '2026-06-08', text: 'Dinner for two with wine, €19. Kazimierz at night is such a good vibe. Bring an appetite.' },
      { name: 'Peter G.', avatar: 'i.pravatar.cc/80?img=64', rating: 5, date: '2025-09-12', text: 'Salt mine was genuinely surreal — 100m down and there is a cathedral carved from rock.' },
      { name: 'Amelie R.', avatar: 'i.pravatar.cc/80?img=27', rating: 4, date: '2026-01-17', text: 'Winter Kraków is magical and half the price of summer. Just dress properly.' }
    ]
  }
];

/* ============================================================
   Editorial blog / guides
   ============================================================ */

const POSTS = [
  {
    slug: '5-days-in-kyoto',
    title: '5 Days in Kyoto: A Slow, Sensible Itinerary',
    excerpt:
      'A day-by-day plan that gets you to Fushimi Inari at sunrise, eats you through Nishiki Market, and still leaves room for doing nothing.',
    cover: IMG('1493976040374-85c8e12f0c0e'),
    tags: ['itineraries', 'japan', 'culture'],
    date: '2026-06-14',
    readTime: 9,
    destination: 'kyoto-japan',
    body: [
      'Kyoto is the rare city where the classic sights and the quiet corners exist a fifteen-minute walk apart. The mistake most people make is treating it like a checklist — five days is genuinely enough, but only if you resist the urge to see everything and instead pick one district per morning.',
      '## Day 1 — Higashiyama on foot\nStart at Kiyomizu-dera before 8am, then walk down Sannenzaka and Ninenzaka while the shops are still shuttered. The lanes are photogenic in a way that no photo does justice. Afternoon: Gion, ending at Yasaka Shrine as the lanterns come on.',
      '## Day 2 — Fushimi Inari, properly\nEveryone photographs the first hundred torii gates. The hike to the summit takes about 90 minutes and after gate 400 you will have the mountain to yourself. Bring water; there is a small shrine and a vending machine at the top, and nothing else.',
      '## Day 3 — Arashiyama and the river\nBamboo grove at opening, then keep walking north to Ōkōchi Sansō villa, which most tours skip. Rent a boat on the Hozugawa river, and finish at Tenryū-ji’s garden. Skip the monkey park if you are short on time.',
      '## Day 4 — Nishiki and the machiya\nSpend the morning grazing Nishiki Market — pickles, tamagoyaki, matcha everything. Afternoon: book a tea ceremony in a machiya townhouse (about $35) and then wander Pontocho alley for dinner.',
      '## Day 5 — Nara or nowhere\nThe 45-minute train to Nara gets you bowing deer, a giant bronze Buddha and an easy afternoon. Or stay in Kyoto, revisit your favourite street, and buy the snack you meant to buy on day two.',
      '**Budget note:** with a hostel, a bus pass and konbini breakfasts, $65/day covers you. Kaiseki dinner once, at $70, is the splurge worth making.'
    ]
  },
  {
    slug: 'budget-backpacking-vietnam',
    title: 'Budget Backpacking Vietnam: What a $30 Day Actually Looks Like',
    excerpt:
      'Real numbers from three weeks in Hanoi, Hue, Hoi An and the Mekong — where the money goes and where it should.',
    cover: IMG('1509114397022-ed747cca3f65'),
    tags: ['budget', 'vietnam', 'food'],
    date: '2026-05-28',
    readTime: 11,
    destination: 'hanoi-vietnam',
    body: [
      'Vietnam remains one of the best value countries on earth for independent travellers, but the "$20 a day" claims you see online are dated. Here is what it actually costs, with real receipts.',
      '## Accommodation: $8–14\nA private room with AC in a decent guesthouse runs $10–14 in the north, $8–11 in the Mekong. Hostel dorms are $5–7. Book the first night only and negotiate on arrival — walk-ins get 10–15% off.',
      '## Food: $6–10\nBreakfast pho or banh mi: $1.20. A bowl of bun cha at a street stall: $1.50. A restaurant sit-down with a beer: $4. Egg coffee: $0.80. The best food in Hanoi is on a tiny plastic stool, and it is the cheapest item on this list.',
      '## Transport: $3–6\nGrab across town is $2–3. Sleeper buses between cities are $15–25 for 6–8 hours. The Reunification Express is slower and pricier but genuinely worth doing once.',
      '## Activities: $5–10\nHa Long Bay is the outlier: a legitimate two-day cruise with a cabin starts around $110. Everything else — caves, temples, rice paddy cycles — is $5 or free.',
      '**Total: $25–35/day**, or about $60 with a cruise day thrown in. Bring a card that has no foreign transaction fee, and always keep a small amount of cash for street vendors.'
    ]
  },
  {
    slug: 'first-solo-trip-woman',
    title: 'Planning Your First Solo Trip as a Woman',
    excerpt:
      'Practical, unpatronising advice on choosing a destination, booking accommodation, and handling the parts people do not talk about.',
    cover: IMG('1488646953014-85cb44e25828'),
    tags: ['solo', 'planning', 'tips'],
    date: '2026-05-09',
    readTime: 8,
    destination: null,
    body: [
      'The most useful thing anyone told me before my first solo trip was this: nobody is paying as much attention to you as you think they are. Here is what actually helps.',
      '## Pick the destination, not the bravery\nStart somewhere with reliable transport, good mobile data and a reputation for being straightforward: Portugal, Japan, Taiwan, New Zealand, Georgia. You do not earn anything by suffering through a place you are anxious about.',
      '## Book the first two nights in advance\nArriving somewhere new at 11pm without a bed is the single biggest source of avoidable stress. Two nights buys you time to look around properly before committing.',
      '## Accommodation signals\nWomen-only dorms exist in most hostels and are worth the small premium. Private rooms in guesthouses with female hosts are another good option. Read recent reviews mentioning "felt safe" rather than star ratings.',
      '## The boring safety stuff\nShare your live location with someone at home. Photocopy your passport. Know where the embassy is. Avoid unlicensed taxis late at night. Trust the instinct that says "leave" — it costs you nothing to act on it.',
      '## Loneliness is normal, not a red flag\nDay three is usually the trough. Join a walking tour, a cooking class or a hostel family dinner. Solo travel is not the absence of company; it is the freedom to choose it.'
    ]
  },
  {
    slug: 'shoulder-season-europe',
    title: 'Why Shoulder Season Beats Summer in Europe',
    excerpt:
      'Fewer crowds, half the hotel rates and weather you will still enjoy — the case for travelling in May, June, September and October.',
    cover: IMG('1502602898657-3e91760cbb34'),
    tags: ['europe', 'planning', 'budget'],
    date: '2026-04-21',
    readTime: 7,
    destination: null,
    body: [
      'Everything good about a European summer — long days, warm sea, open terraces — exists in late June and early September too, without the two weeks of gridlock.',
      '## The price gap is real\nFlights to southern Europe drop 20–35% between June 25 and September 5. Santorini villas and Amalfi hotels follow the same curve. In our data, a shoulder-season week in Lisbon costs roughly 40% less than the same week in August.',
      '## The queues disappear\nThe Vatican in August is a crush. The Vatican on a Tuesday in late September is a museum. You see more by going when fewer people are seeing it.',
      '## You can actually get a table\nIn peak season, the 8pm dinner reservation becomes a logistical problem. In May and October, you walk in.',
      '## What you give up\nNorthern beaches are swimmable only from late June. Some island ferries thin out in October. Alpine huts open mid-June and close mid-September. Check the specific seasonality chart on any destination page before booking.',
      '**Rule of thumb:** for southern Europe, aim for the last two weeks of May, or the first three weeks of September.'
    ]
  },
  {
    slug: 'carry-on-packing-formula',
    title: 'The Carry-On Packing Formula That Actually Works',
    excerpt:
      'Twelve items, one bag, any climate. A repeatable system instead of a checklist you will ignore.',
    cover: IMG('1553062407-98eeb64c6a62'),
    tags: ['packing', 'tips'],
    date: '2026-04-02',
    readTime: 6,
    destination: null,
    body: [
      'Packing lists fail because they are static. This is a method instead: three layers, one colour family, and a rule for everything else.',
      '## The base\nTwo tops, one bottom, one mid-layer, one shell, five sets of socks and underwear, one sleep layer. Everything in one colour family so it all matches. Merino where you can — it does not smell after a day.',
      '## The one-per-rule\nOne hat, one pair of shoes worn plus one packed, one towel (microfibre), one adapter, one power bank. If you need a second of something, you probably do not need the first.',
      '## What people always forget\nA dry bag for wet swimwear. A spare tote that packs flat. Photocopies of documents in two separate bags. Motion sickness tablets. A marker pen for labelling shared power banks.',
      '## The test\nPack three days before you leave. Then live out of the bag for a day. If you never opened a pocket, remove it. Nobody has ever regretted packing less.',
      'Use the packing list generator on any destination page — it adjusts for climate, season and trip type, then you trim from there.'
    ]
  },
  {
    slug: 'overnight-bus-survival-guide',
    title: 'How to Survive (Actually Enjoy) an Overnight Bus',
    excerpt:
      'Seat choice, sleep setup, valuables strategy, and the two things to buy before boarding.',
    cover: IMG('1544620347-c4fd4a3d5957'),
    tags: ['transport', 'tips', 'budget'],
    date: '2026-03-16',
    readTime: 6,
    destination: null,
    body: [
      'Sleeper buses and trains save a hotel night and a daylight of travel. Done badly they cost you a day of exhaustion. The difference is preparation.',
      '## Seat strategy\nOn a bus, pick the row over the axle — rear and middle bounce less than the very back. On trains, lower bunk is quieter; upper bunk is cleaner. Always take the forward-facing seat if you get motion sick.',
      '## The sleep kit\nNeck pillow, eye mask, earplugs plus a phone with downloaded audio, and a light long-sleeve layer. Buses are cold; they are always cold.',
      '## Valuables\nMoney belt or hidden pouch worn under clothes, passport and card on your body, daypack in the seat pocket in front of you — never in the hold and never in the overhead behind your head.',
      '## Before boarding\nEat properly, go to the toilet, fill your bottle, and buy snacks. Coach station food is overpriced and mediocre. Download everything you want to watch: WiFi will not save you.',
      '**The payoff:** you wake up in a new city with a full day ahead of you and one night already spent.'
    ]
  },
  {
    slug: 'eat-like-a-local-lisbon',
    title: 'Eating Like a Local in Lisbon: 9 Dishes, 9 Addresses',
    excerpt:
      'Skip the tourist menus. These are the plates — and the neighbourhood counters — worth crossing the city for.',
    cover: IMG('1555881400-74d7acaacd8b'),
    tags: ['food', 'portugal', 'lisbon'],
    date: '2026-02-27',
    readTime: 8,
    destination: 'lisbon-portugal',
    body: [
      'Lisbon food is unfussy, seasonal and stubbornly cheap if you know where to stand while eating it. Here is the short list.',
      '## Pastéis de nata — Belém\nThe original bakery, queue and all. Eat them warm with cinnamon at the counter. Everything else is an imitation.',
      '## Bifana — Alcântara\nA pork sandwich marinated overnight in wine and garlic, served on a paper plate. Under €3. The benchmark for whether a tasca knows what it is doing.',
      '## Bacalhau à Brás — Mouraria\nShredded salt cod with egg and matchstick potatoes. Ordered by the plate, eaten with bread and wine.',
      '## Grilled sardines — any tasca, June\nIn June they are in season everywhere. Outside season, order the mackerel instead and do not let anyone sell you frozen.',
      '## Ginjinha — Rossio\nSour cherry liqueur, a shot for €1.50, drunk standing on the pavement. Two max before lunch.',
      '**How to find them:** look for chalkboards written in Portuguese, plastic chairs, and no photographs of the food in the window.'
    ]
  },
  {
    slug: 'when-to-visit-iceland',
    title: 'Iceland in Every Season: When to Actually Go',
    excerpt:
      'Midnight sun versus northern lights, green valleys versus ice caves — a month-by-month honest guide.',
    cover: IMG('1476514525535-07fb3b4ae5f1'),
    tags: ['iceland', 'nature', 'planning'],
    date: '2026-02-04',
    readTime: 7,
    destination: 'reykjavik-iceland',
    body: [
      'There is no bad month in Iceland, only wrong expectations. Here is what each season actually gives you.',
      '## June to August\nEverything is open: highland roads, puffins, whale watching, 20-hour daylight. It is also peak price and peak crowd. Hiking season is now — the Laugavegur trail runs late June to early September.',
      '## September to March\nNorthern lights, ice caves, and prices that drop by a third. You trade some daylight (as little as four hours in December) for a completely different country. Many roads, including the highland ones, are closed.',
      '## April, May, October, November\nThe shoulder months nobody talks about. Waterfalls still dramatic, some snow still on the peaks, half the visitors. November is aurora season and low season pricing at the same time — the sweet spot if you do not need to hike.',
      '**The honest caveat:** weather closes roads year-round. Build a buffer day into any itinerary and check road.is each morning.',
      'See the month-by-month seasonality chart on the destination page for temperatures, rainfall and crowd levels side by side.'
    ]
  }
];

/* ============================================================
   Seed reviews by destination id (used to prefill counts)
   ============================================================ */

const TESTIMONIALS = [
  {
    quote:
      'The quiz matched us with Chiang Mai in about twenty seconds. We booked flights that week and it was the best trip we have taken.',
    name: 'Anna R.',
    role: 'Verified traveller',
    avatar: 'i.pravatar.cc/100?img=47'
  },
  {
    quote:
      'I stopped using the big travel sites. The budget breakdowns here were accurate to within a couple of dollars a day.',
    name: 'Marcus T.',
    role: 'Slow travel blogger',
    avatar: 'i.pravatar.cc/100?img=12'
  },
  {
    quote:
      'Built a two-week itinerary on the train, exported the link, and my friend could open it without an account. Perfect.',
    name: 'Priya S.',
    role: 'Verified traveller',
    avatar: 'i.pravatar.cc/100?img=45'
  }
];

const FAQS = [
  {
    q: 'How are destinations chosen and scored?',
    a: 'Everything on Wayfarer is written by people who have been there. Destinations are scored by tag overlap with your quiz answers, interests and season fit — a simple, transparent rule system rather than a black box. We show you why a place matched.'
  },
  {
    q: 'Is Wayfarer free to use?',
    a: 'Yes. All destination pages, guides, the quiz, the itinerary builder and the budget calculator are free. We earn affiliate commissions when you book flights, hotels or tours through links on some pages — this never changes the price you pay or the ranking of a destination.'
  },
  {
    q: 'Do you accept payment for destination placement?',
    a: 'No. Destinations are never ranked by payment. If we ever run a clearly labelled sponsored placement, it will sit outside the organic results and be marked as an advertisement.'
  },
  {
    q: 'Can I use the site without an account?',
    a: 'Yes — the quiz, filters, budget calculator and packing list generator all work without signing in. An account only adds the wishlist, your travel passport and saving itineraries across devices.'
  },
  {
    q: 'How accurate are the budget estimates?',
    a: 'Costs are updated at least twice a year from traveller reports and our own trips, then split into budget, mid-range and luxury daily averages. Treat them as a planning baseline: local inflation and season will move the number.'
  },
  {
    q: 'Are visa requirements reliable?',
    a: 'The visa checker is a planning aid based on common nationalities and general rules. Requirements change without notice — always confirm with the destination country’s embassy before booking.'
  },
  {
    q: 'How do I submit a review or a photo?',
    a: 'Create an account, open any destination page and scroll to the reviews section. Photos are optional. All submissions are moderated before they appear.'
  },
  {
    q: 'Does it work offline?',
    a: 'The app installs as a PWA. Your saved itinerary, wishlist and packing list remain available with no signal — handy when you are actually on the road.'
  }
];

const PACKING_BASE = [
  'Passport + photocopy',
  'Travel insurance documents',
  'Debit/credit card (no FX fee)',
  'Power bank + charging cable',
  'Universal power adapter',
  'Earplugs + eye mask',
  'Reusable water bottle',
  'Packing cubes'
];

const PACKING_ADDONS = {
  beach: ['Reef-safe sunscreen', 'Rash guard', 'Dry bag', 'Flip flops', 'Snorkel mask'],
  cold: ['Thermal base layer', 'Beanie + gloves', 'Wool socks', 'Hand warmers', 'Buff/neck gaiter'],
  city: ['Comfortable walking shoes', 'Day backpack', 'Foldable tote', 'Rain jacket'],
  hiking: ['Broken-in trail shoes', '2L hydration bladder', 'Blister plasters', 'Trekking poles', 'Headlamp'],
  culture: ['Scarf/shoulder cover', 'Modest long trousers', 'Slip-on shoes for temples'],
  rain: ['Packable rain shell', 'Umbrella', 'Waterproof phone pouch']
};

const VISA_MATRIX = {
  'United States': ['bali-indonesia', 'kyoto-japan', 'lisbon-portugal', 'santorini-greece', 'reykjavik-iceland', 'chiang-mai', 'hanoi-vietnam', 'marrakech-morocco', 'cape-town', 'cusco-machu-picchu', 'mexico-city', 'banff', 'queenstown', 'sydney', 'rome', 'krakow'],
  'United Kingdom': ['bali-indonesia', 'kyoto-japan', 'lisbon-portugal', 'santorini-greece', 'reykjavik-iceland', 'chiang-mai', 'hanoi-vietnam', 'marrakech-morocco', 'cape-town', 'cusco-machu-picchu', 'mexico-city', 'banff', 'queenstown', 'sydney', 'rome', 'krakow'],
  'India': ['bali-indonesia', 'chiang-mai', 'hanoi-vietnam', 'marrakech-morocco', 'cape-town', 'mexico-city'],
  'Germany': ['bali-indonesia', 'kyoto-japan', 'lisbon-portugal', 'santorini-greece', 'reykjavik-iceland', 'chiang-mai', 'hanoi-vietnam', 'marrakech-morocco', 'cape-town', 'cusco-machu-picchu', 'mexico-city', 'banff', 'queenstown', 'sydney', 'rome', 'krakow'],
  'Brazil': ['bali-indonesia', 'kyoto-japan', 'lisbon-portugal', 'santorini-greece', 'reykjavik-iceland', 'chiang-mai', 'hanoi-vietnam', 'marrakech-morocco', 'cape-town', 'cusco-machu-picchu', 'mexico-city', 'krakow']
};

const NATIONALITIES = Object.keys(VISA_MATRIX);
