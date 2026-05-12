export type Category =
  | 'signature-bouquets'
  | 'roses'
  | 'proteas-natives'
  | 'lilies-exotics'
  | 'sympathy-tributes'
  | 'weddings-events'
  | 'gift-collections'
  | 'chrysanthemums'
  | 'carnations'
  | 'ranunculus'
  | 'celosia'
  | 'fillers'
  | 'tulips'
  | 'curiosities';

export type CategoryGroup = 'collections' | 'flowers';

export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  categoryName: string;
  tagline: string;
  description: string;
  story?: string;
  basePrice: number;
  sizes?: ProductSize[];
  image: string;
  gallery?: string[];
  palette: string[];
  ingredients: string[];
  care?: string;
  badge?: 'Signature' | 'Bestseller' | 'New' | 'Limited';
  featured?: boolean;
}

export const CATEGORIES: {
  id: Category;
  name: string;
  description: string;
  group: CategoryGroup;
  short?: string;
}[] = [
  // Collections (themed)
  { id: 'signature-bouquets', name: 'Signature Bouquets', short: 'Couture hand-tied', description: 'Hand-tied couture arrangements composed by our floral atelier.', group: 'collections' },
  { id: 'sympathy-tributes', name: 'Sympathy & Tributes', short: 'Reverent, dignified', description: 'Quiet, dignified arrangements composed with reverence.', group: 'collections' },
  { id: 'weddings-events', name: 'Weddings & Events', short: 'Bespoke design', description: 'Bespoke floral design from intimate ceremonies to grand affairs.', group: 'collections' },
  { id: 'gift-collections', name: 'Gift Collections', short: 'Curated boxes', description: 'Curated boxes pairing florals with thoughtful keepsakes.', group: 'collections' },

  // Flower types (sourced varietals)
  { id: 'roses', name: 'Roses', short: 'The Rose Library', description: 'Premium grade roses sourced at first light and arranged the same day.', group: 'flowers' },
  { id: 'proteas-natives', name: 'Proteas & Natives', short: 'Indigenous sculptures', description: 'Sculptural indigenous blooms — bold, architectural, unmistakably African.', group: 'flowers' },
  { id: 'lilies-exotics', name: 'Lilies & Exotics', short: 'Fragrant & rare', description: 'Sensual, fragrant lilies and rare exotics for moments of stillness.', group: 'flowers' },
  { id: 'chrysanthemums', name: 'Chrysanthemums', short: 'Layered & enduring', description: 'Layered, abundant chrysanthemums — long-lasting and quietly luxurious.', group: 'flowers' },
  { id: 'carnations', name: 'Carnations', short: 'Ruffled classics', description: 'An underrated classic — ruffled, fragrant, available in every imaginable hue.', group: 'flowers' },
  { id: 'ranunculus', name: 'Ranunculus', short: 'Petal-on-petal romance', description: 'Petal-on-petal romance — the wedding florist\'s secret weapon.', group: 'flowers' },
  { id: 'celosia', name: 'Celosia', short: 'Velvet flames', description: 'Velvet flames and cockscomb plumes — bold, textural and unmistakable.', group: 'flowers' },
  { id: 'fillers', name: 'Fillers & Foliage', short: 'Soft architecture', description: 'The soft architecture of every bouquet — eucalyptus, waxflower and ruscus.', group: 'flowers' },
  { id: 'tulips', name: 'Tulips', short: 'Seasonal sculptures', description: 'Sculptural, joyful and only with us in the cooler months.', group: 'flowers' },
  { id: 'curiosities', name: 'Curiosities', short: 'The unusual', description: 'Orchids, anthuriums and dried heirlooms — the stems we cannot leave behind.', group: 'flowers' },
];

export const CATEGORY_GROUPS: { id: CategoryGroup; label: string; tagline: string }[] = [
  { id: 'collections', label: 'By Collection', tagline: 'Composed and ready' },
  { id: 'flowers', label: 'By Flower', tagline: 'Sourced varietals' },
];

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const PRODUCTS: Product[] = [
  // SIGNATURE BOUQUETS
  {
    id: 'sb-01',
    slug: 'the-velvet-sovereign',
    name: 'The Velvet Sovereign',
    category: 'signature-bouquets',
    categoryName: 'Signature Bouquets',
    tagline: 'A regal cascade of crimson and burgundy roses',
    description:
      'Twenty-four long-stem roses in deepest velvet red, gathered with eucalyptus and a single tie of black silk ribbon. Our most requested anniversary gesture.',
    story:
      'Composed in homage to slow, decisive love — the kind that does not waver. We hand-select each rose at dawn and let the bouquet breathe for an hour before tying.',
    basePrice: 540,
    sizes: [
      { label: 'Petite (12 stems)', price: 540 },
      { label: 'Classic (18 stems)', price: 810 },
      { label: 'Grand (24 stems)', price: 1080 },
      { label: 'Sovereign (36 stems)', price: 1620 },
    ],
    image: img('1487530811176-3780de880c2d'),
    palette: ['#8E1B2A', '#4D0D17', '#0A0A0A'],
    ingredients: ['Red garden roses', 'Burgundy spray roses', 'Seeded eucalyptus', 'Silk ribbon'],
    care: 'Trim stems at a 45° angle every two days. Change water daily. Keep away from direct sunlight and fruit bowls.',
    badge: 'Signature',
    featured: true,
  },
  {
    id: 'sb-02',
    slug: 'midnight-garden',
    name: 'Midnight Garden',
    category: 'signature-bouquets',
    categoryName: 'Signature Bouquets',
    tagline: 'Dark blooms, golden hour drama',
    description:
      'A moody composition of black baccara roses, deep plum ranunculus and trailing amaranthus. Wrapped in matte gold foil.',
    basePrice: 720,
    sizes: [
      { label: 'Classic', price: 720 },
      { label: 'Grand', price: 1080 },
      { label: 'Sovereign', price: 1620 },
    ],
    image: img('1561181286-d3fee7d55364'),
    palette: ['#1C1C1C', '#5E4A1E', '#8E1B2A'],
    ingredients: ['Black baccara roses', 'Plum ranunculus', 'Amaranthus', 'Smokebush'],
    badge: 'Bestseller',
    featured: true,
  },
  {
    id: 'sb-03',
    slug: 'golden-hour',
    name: 'Golden Hour',
    category: 'signature-bouquets',
    categoryName: 'Signature Bouquets',
    tagline: 'Champagne, peach and warm cream',
    description:
      'Soft as a summer dusk. Peach garden roses, cream lisianthus and butter-yellow ranunculus, finished with hints of palm and pampas.',
    basePrice: 612,
    sizes: [
      { label: 'Classic', price: 612 },
      { label: 'Grand', price: 918 },
      { label: 'Sovereign', price: 1485 },
    ],
    image: img('1502086223501-7ea6ecd79368'),
    palette: ['#EAD18C', '#F5E9C3', '#FAF7F0'],
    ingredients: ['Peach garden roses', 'Cream lisianthus', 'Butter ranunculus', 'Pampas grass'],
    badge: 'Bestseller',
    featured: true,
  },
  {
    id: 'sb-04',
    slug: 'eternal-romance',
    name: 'Eternal Romance',
    category: 'signature-bouquets',
    categoryName: 'Signature Bouquets',
    tagline: 'Blush and ivory roses with peony hearts',
    description:
      'The bouquet of soft declarations. Powder-pink avalanche roses cradle blooming ivory peonies and trailing jasmine.',
    basePrice: 486,
    sizes: [
      { label: 'Classic', price: 486 },
      { label: 'Grand', price: 810 },
      { label: 'Sovereign', price: 1296 },
    ],
    image: img('1455659817273-f96807779a8a'),
    palette: ['#F4D1D5', '#FAF7F0', '#C9A24C'],
    ingredients: ['Avalanche roses', 'Ivory peonies', 'Jasmine vine', 'Dusty miller'],
  },
  {
    id: 'sb-05',
    slug: 'the-whisper',
    name: 'The Whisper',
    category: 'signature-bouquets',
    categoryName: 'Signature Bouquets',
    tagline: 'A soft pastel posy for everyday tenderness',
    description:
      'Small but considered. A handheld posy of pastel roses, scabiosa and waxflower. Perfect bedside companion.',
    basePrice: 405,
    sizes: [
      { label: 'Posy', price: 405 },
      { label: 'Bedside', price: 567 },
      { label: 'Studio', price: 864 },
    ],
    image: img('1518895949257-7621c3c786d7'),
    palette: ['#FAF7F0', '#F4D1D5', '#EAD18C'],
    ingredients: ['Pastel garden roses', 'Scabiosa', 'Waxflower', 'Italian ruscus'],
  },
  {
    id: 'sb-06',
    slug: 'wild-ovation',
    name: 'Wild Ovation',
    category: 'signature-bouquets',
    categoryName: 'Signature Bouquets',
    tagline: 'Untamed seasonal abundance',
    description:
      'For the unscripted moments. A loose, garden-style gathering of seasonal blooms — never the same twice.',
    basePrice: 675,
    sizes: [
      { label: 'Classic', price: 675 },
      { label: 'Grand', price: 1080 },
      { label: 'Sovereign', price: 1620 },
    ],
    image: img('1490750967868-88aa4486c946'),
    palette: ['#C9A24C', '#8E1B2A', '#F4D1D5'],
    ingredients: ['Seasonal garden roses', 'Snapdragons', 'Delphinium', 'Foraged greenery'],
    badge: 'New',
  },

  // ROSES
  {
    id: 'rs-01',
    slug: 'crimson-reverie',
    name: 'Crimson Reverie',
    category: 'roses',
    categoryName: 'The Rose Library',
    tagline: 'A bunch of long-stem red roses, 60cm',
    description:
      'Classic, uncompromising red. Twelve long-stem roses, ethically grown and graded for petal count and stem length.',
    basePrice: 432,
    sizes: [
      { label: '12 stems', price: 432 },
      { label: '24 stems', price: 810 },
      { label: '50 stems', price: 1620 },
      { label: '100 stems', price: 2970 },
    ],
    image: img('1614113489855-66422ad300a4'),
    palette: ['#8E1B2A', '#4D0D17'],
    ingredients: ['Long-stem red roses', 'Optional wrap'],
    badge: 'Signature',
    featured: true,
  },
  {
    id: 'rs-02',
    slug: 'blush-sonata',
    name: 'Blush Sonata',
    category: 'roses',
    categoryName: 'The Rose Library',
    tagline: 'Soft pink roses, hand-tied',
    description: 'Delicate, blushing roses for first dates, new beginnings and quiet joys.',
    basePrice: 432,
    sizes: [
      { label: '12 stems', price: 432 },
      { label: '24 stems', price: 810 },
      { label: '50 stems', price: 1620 },
    ],
    image: img('1455717974081-0436a066bb96'),
    palette: ['#F4D1D5', '#E69BA3'],
    ingredients: ['Long-stem pink roses', 'Ribbon'],
  },
  {
    id: 'rs-03',
    slug: 'champagne-muse',
    name: 'Champagne Muse',
    category: 'roses',
    categoryName: 'The Rose Library',
    tagline: 'Cream and toffee-toned roses',
    description: 'Refined and unexpected. Toffee-cream roses with golden undertones.',
    basePrice: 486,
    sizes: [
      { label: '12 stems', price: 486 },
      { label: '24 stems', price: 864 },
      { label: '50 stems', price: 1755 },
    ],
    image: img('1542838686-37da4a9fd1b3'),
    palette: ['#EAD18C', '#F5E9C3'],
    ingredients: ['Cappuccino roses', 'Quicksand roses'],
    badge: 'Limited',
  },
  {
    id: 'rs-04',
    slug: 'velvet-noir',
    name: 'Velvet Noir',
    category: 'roses',
    categoryName: 'The Rose Library',
    tagline: 'Deep burgundy, near-black roses',
    description: 'The darkest red we stock — a bouquet for grand gestures and gothic romance.',
    basePrice: 504,
    sizes: [
      { label: '12 stems', price: 504 },
      { label: '24 stems', price: 945 },
      { label: '50 stems', price: 1890 },
    ],
    image: img('1518709779341-56cf4535e94b'),
    palette: ['#4D0D17', '#1C1C1C'],
    ingredients: ['Black baccara roses', 'Hearts roses'],
    featured: true,
  },
  {
    id: 'rs-05',
    slug: 'ivory-confession',
    name: 'Ivory Confession',
    category: 'roses',
    categoryName: 'The Rose Library',
    tagline: 'Pure white roses, long-stem',
    description: 'Crisp white roses for weddings, congratulations and elegant sympathies.',
    basePrice: 432,
    sizes: [
      { label: '12 stems', price: 432 },
      { label: '24 stems', price: 810 },
      { label: '50 stems', price: 1620 },
    ],
    image: img('1518895949257-7621c3c786d7'),
    palette: ['#FAF7F0', '#F3EEE2'],
    ingredients: ['White avalanche roses'],
  },
  {
    id: 'rs-06',
    slug: 'sunset-vow',
    name: 'Sunset Vow',
    category: 'roses',
    categoryName: 'The Rose Library',
    tagline: 'Peach and apricot roses',
    description: 'Warm, late-afternoon hues. A romantic alternative to classic pink.',
    basePrice: 486,
    sizes: [
      { label: '12 stems', price: 486 },
      { label: '24 stems', price: 864 },
      { label: '50 stems', price: 1755 },
    ],
    image: img('1496062031456-07b8f162a322'),
    palette: ['#EAD18C', '#F4D1D5'],
    ingredients: ['Peach roses', 'Free spirit roses'],
  },

  // PROTEAS & NATIVES
  {
    id: 'pr-01',
    slug: 'royal-king-protea',
    name: 'Royal King Protea',
    category: 'proteas-natives',
    categoryName: 'Proteas & Natives',
    tagline: 'A single, sculptural king protea',
    description:
      'South Africa\'s national flower, presented as a single architectural stem. A statement on its own or the heart of a larger arrangement.',
    basePrice: 324,
    sizes: [
      { label: 'Single stem', price: 324 },
      { label: 'Trio', price: 810 },
      { label: 'Cluster of 5', price: 1296 },
    ],
    image: img('1518709779341-56cf4535e94b'),
    palette: ['#D26370', '#86692A'],
    ingredients: ['King protea', 'Native foliage'],
    badge: 'Signature',
    featured: true,
  },
  {
    id: 'pr-02',
    slug: 'pincushion-bloom',
    name: 'Pincushion Bloom',
    category: 'proteas-natives',
    categoryName: 'Proteas & Natives',
    tagline: 'Vivid pincushion proteas in firework form',
    description: 'A small celebration of native colour. Five vivid pincushion proteas with restios.',
    basePrice: 270,
    sizes: [
      { label: 'Posy of 5', price: 270 },
      { label: 'Bouquet of 10', price: 504 },
    ],
    image: img('1502086223501-7ea6ecd79368'),
    palette: ['#C9A24C', '#8E1B2A'],
    ingredients: ['Pincushion protea', 'Restio grass', 'Bush greens'],
  },
  {
    id: 'pr-03',
    slug: 'strelitzia-stride',
    name: 'Strelitzia Stride',
    category: 'proteas-natives',
    categoryName: 'Proteas & Natives',
    tagline: 'Three bird-of-paradise stems',
    description: 'Architectural, exotic and unmistakably ours. Three crane flowers, sleeved.',
    basePrice: 234,
    sizes: [
      { label: 'Trio', price: 234 },
      { label: 'Sextet', price: 432 },
    ],
    image: img('1582719471384-894fbb16e074'),
    palette: ['#C9A24C', '#A98538'],
    ingredients: ['Strelitzia reginae'],
  },
  {
    id: 'pr-04',
    slug: 'indigenous-trio',
    name: 'Indigenous Trio',
    category: 'proteas-natives',
    categoryName: 'Proteas & Natives',
    tagline: 'A composed bouquet of native blooms',
    description:
      'King protea, pincushions and waratah arranged with eucalyptus and restio. A taste of our hillsides in a single vase.',
    basePrice: 720,
    sizes: [
      { label: 'Classic', price: 720 },
      { label: 'Grand', price: 1080 },
    ],
    image: img('1518709779341-56cf4535e94b'),
    palette: ['#D26370', '#86692A', '#5E4A1E'],
    ingredients: ['King protea', 'Pincushion proteas', 'Waratah', 'Silver tree leaf'],
    badge: 'New',
  },

  // LILIES & EXOTICS
  {
    id: 'li-01',
    slug: 'casablanca-lily-trio',
    name: 'Casablanca Lily Trio',
    category: 'lilies-exotics',
    categoryName: 'Lilies & Exotics',
    tagline: 'Three stems of fragrant white oriental lilies',
    description: 'Pure white, intoxicating perfume. Three full stems, each bearing up to five blooms.',
    basePrice: 540,
    image: img('1502672023488-70e25813eb80'),
    palette: ['#FAF7F0', '#F3EEE2'],
    ingredients: ['Casablanca oriental lilies', 'Foliage'],
  },
  {
    id: 'li-02',
    slug: 'stargazer-embrace',
    name: 'Stargazer Embrace',
    category: 'lilies-exotics',
    categoryName: 'Lilies & Exotics',
    tagline: 'Crimson-flecked stargazer lilies',
    description: 'Saturated pink stargazers paired with garden roses and trailing ivy.',
    basePrice: 486,
    image: img('1561181286-d3fee7d55364'),
    palette: ['#D26370', '#8E1B2A'],
    ingredients: ['Stargazer lilies', 'Pink garden roses', 'Ivy trail'],
  },
  {
    id: 'li-03',
    slug: 'calla-crown',
    name: 'Calla Crown',
    category: 'lilies-exotics',
    categoryName: 'Lilies & Exotics',
    tagline: 'A monochrome composition of calla lilies',
    description: 'Sculpted black or ivory callas in a glass vessel. Architectural and meditative.',
    basePrice: 675,
    sizes: [
      { label: 'Classic', price: 675 },
      { label: 'Grand', price: 990 },
    ],
    image: img('1487530811176-3780de880c2d'),
    palette: ['#1C1C1C', '#FAF7F0'],
    ingredients: ['Calla lilies', 'Aspidistra leaves'],
    badge: 'Limited',
  },

  // SYMPATHY & TRIBUTES
  {
    id: 'sy-01',
    slug: 'tribute-wreath-classic',
    name: 'Classic Tribute Wreath',
    category: 'sympathy-tributes',
    categoryName: 'Sympathy & Tributes',
    tagline: 'A circular wreath in cream and white',
    description: 'A composed circle of roses, chrysanthemums and lilies — dignified and serene.',
    basePrice: 360,
    sizes: [
      { label: 'Medium', price: 360 },
      { label: 'Large', price: 810 },
      { label: 'Extra Large', price: 1350 },
    ],
    image: img('1518709779341-56cf4535e94b'),
    palette: ['#FAF7F0', '#F3EEE2', '#C9A24C'],
    ingredients: ['White chrysanthemums', 'Cream roses', 'White lilies', 'Foliage'],
  },
  {
    id: 'sy-02',
    slug: 'cross-arrangement-of-roses',
    name: 'Cross Arrangement of Roses',
    category: 'sympathy-tributes',
    categoryName: 'Sympathy & Tributes',
    tagline: 'A standing cross of roses and foliage',
    description: 'Built on a cross frame, fully covered with roses and chrysanthemums.',
    basePrice: 810,
    sizes: [
      { label: 'Medium', price: 810 },
      { label: 'Large', price: 1485 },
    ],
    image: img('1455659817273-f96807779a8a'),
    palette: ['#FAF7F0', '#8E1B2A'],
    ingredients: ['Roses', 'Chrysanthemums', 'Foliage'],
  },
  {
    id: 'sy-03',
    slug: 'posy-of-remembrance',
    name: 'Posy of Remembrance',
    category: 'sympathy-tributes',
    categoryName: 'Sympathy & Tributes',
    tagline: 'A handheld posy for the family',
    description: 'A small, tender posy to leave at a service or carry in remembrance.',
    basePrice: 225,
    sizes: [
      { label: 'Posy', price: 225 },
      { label: 'Larger Posy', price: 405 },
    ],
    image: img('1518895949257-7621c3c786d7'),
    palette: ['#FAF7F0', '#F4D1D5'],
    ingredients: ['Spray roses', 'Waxflower', 'Foliage'],
  },
  {
    id: 'sy-04',
    slug: 'standing-heart-tribute',
    name: 'Standing Heart Tribute',
    category: 'sympathy-tributes',
    categoryName: 'Sympathy & Tributes',
    tagline: 'A heart-shaped tribute on an easel',
    description: 'A heart frame fully covered in roses and chrysanthemums with personalised sash.',
    basePrice: 1080,
    sizes: [
      { label: 'Standard', price: 1080 },
      { label: 'Grand', price: 1620 },
    ],
    image: img('1487530811176-3780de880c2d'),
    palette: ['#8E1B2A', '#FAF7F0'],
    ingredients: ['Red roses', 'White chrysanthemums', 'Sash with custom message'],
  },

  // WEDDINGS & EVENTS
  {
    id: 'we-01',
    slug: 'bridal-cascade',
    name: 'The Bridal Cascade',
    category: 'weddings-events',
    categoryName: 'Weddings & Events',
    tagline: 'A cascading bridal bouquet, bespoke to your day',
    description:
      'A trailing composition of garden roses, peonies, sweet peas and trailing greenery. Designed in consultation with the atelier.',
    basePrice: 1750,
    image: img('1455659817273-f96807779a8a'),
    palette: ['#FAF7F0', '#F4D1D5', '#C9A24C'],
    ingredients: ['Bespoke selection'],
    badge: 'Signature',
  },
  {
    id: 'we-02',
    slug: 'bridesmaid-posy',
    name: 'Bridesmaid Posy',
    category: 'weddings-events',
    categoryName: 'Weddings & Events',
    tagline: 'A complementary posy for your party',
    description: 'A smaller-scale posy designed to harmonise with the bridal bouquet.',
    basePrice: 650,
    image: img('1518895949257-7621c3c786d7'),
    palette: ['#F4D1D5', '#FAF7F0'],
    ingredients: ['Bespoke selection'],
  },
  {
    id: 'we-03',
    slug: 'boutonniere',
    name: 'Buttonhole & Boutonnière',
    category: 'weddings-events',
    categoryName: 'Weddings & Events',
    tagline: 'A delicate lapel composition',
    description: 'A single bloom and foliage moment for groom, groomsmen and fathers.',
    basePrice: 85,
    image: img('1518709779341-56cf4535e94b'),
    palette: ['#C9A24C', '#FAF7F0'],
    ingredients: ['Single rose or seasonal focal', 'Foliage', 'Silk ribbon'],
  },

  // GIFT COLLECTIONS
  {
    id: 'gc-01',
    slug: 'anniversary-indulgence-box',
    name: 'Anniversary Indulgence Box',
    category: 'gift-collections',
    categoryName: 'Gift Collections',
    tagline: 'Roses, fine chocolate and a candle in a keepsake box',
    description:
      'A hand-tied bunch of twelve red roses, a 70% dark artisanal chocolate bar, a soy candle and a handwritten card, presented in a black-and-gold keepsake box.',
    basePrice: 1080,
    image: img('1487530811176-3780de880c2d'),
    palette: ['#8E1B2A', '#0A0A0A', '#C9A24C'],
    ingredients: ['12 red roses', 'Artisanal dark chocolate', 'Soy candle', 'Handwritten card'],
    badge: 'Bestseller',
    featured: true,
  },
  {
    id: 'gc-02',
    slug: 'birthday-joy-bundle',
    name: 'Birthday Joy Bundle',
    category: 'gift-collections',
    categoryName: 'Gift Collections',
    tagline: 'A bright posy with a sparkling celebration',
    description: 'A vibrant posy paired with a small bottle of MCC sparkling wine and two macarons.',
    basePrice: 675,
    image: img('1490750967868-88aa4486c946'),
    palette: ['#EAD18C', '#F4D1D5'],
    ingredients: ['Posy of seasonal blooms', 'MCC 200ml', 'Two macarons'],
  },
  {
    id: 'gc-03',
    slug: 'sympathy-sentiment-package',
    name: 'Sympathy Sentiment Package',
    category: 'gift-collections',
    categoryName: 'Gift Collections',
    tagline: 'A gentle posy with rooibos tea and shortbread',
    description:
      'A soft white-and-cream posy with loose-leaf rooibos and butter shortbread, presented in a linen-lined box.',
    basePrice: 900,
    image: img('1518895949257-7621c3c786d7'),
    palette: ['#FAF7F0', '#F3EEE2'],
    ingredients: ['Cream & white posy', 'Loose-leaf rooibos tin', 'Butter shortbread', 'Linen-lined box'],
  },
  {
    id: 'gc-04',
    slug: 'just-because-surprise',
    name: 'Just Because Surprise',
    category: 'gift-collections',
    categoryName: 'Gift Collections',
    tagline: 'A florist\'s choice, hand-tied for the everyday',
    description:
      'You choose the palette — bright, soft, romantic or wild — and we surprise the recipient with a hand-tied seasonal bouquet of equivalent value.',
    basePrice: 540,
    sizes: [
      { label: 'Petite', price: 540 },
      { label: 'Classic', price: 810 },
      { label: 'Grand', price: 1260 },
    ],
    image: img('1455717974081-0436a066bb96'),
    palette: ['#C9A24C', '#F4D1D5', '#8E1B2A'],
    ingredients: ['Florist\'s seasonal selection in your chosen palette'],
    badge: 'New',
  },

  // CHRYSANTHEMUMS
  {
    id: 'ch-01',
    slug: 'cloud-chrysanthemum',
    name: 'Cloud Chrysanthemum',
    category: 'chrysanthemums',
    categoryName: 'Chrysanthemums',
    tagline: 'Pure white spider chrysanthemums, gathered',
    description:
      'Five generous spider chrysanthemum heads, all in white, arranged with silver ruscus. Long-lasting and softly luminous.',
    basePrice: 288,
    sizes: [
      { label: 'Posy', price: 288 },
      { label: 'Bouquet', price: 432 },
    ],
    image: img('1518895949257-7621c3c786d7'),
    palette: ['#FAF7F0', '#F3EEE2'],
    ingredients: ['White spider chrysanthemums', 'Silver ruscus'],
  },
  {
    id: 'ch-02',
    slug: 'sunlit-spray-chrysanthemums',
    name: 'Sunlit Spray Chrysanthemums',
    category: 'chrysanthemums',
    categoryName: 'Chrysanthemums',
    tagline: 'A sunshine bunch of yellow sprays',
    description:
      'Bright, cheerful and almost impossible not to smile at. Yellow spray chrysanthemums with a little eucalyptus.',
    basePrice: 234,
    image: img('1496062031456-07b8f162a322'),
    palette: ['#EAD18C', '#F5E9C3'],
    ingredients: ['Yellow spray chrysanthemums', 'Eucalyptus'],
  },
  {
    id: 'ch-03',
    slug: 'burgundy-anastasia',
    name: 'Burgundy Anastasia',
    category: 'chrysanthemums',
    categoryName: 'Chrysanthemums',
    tagline: 'Deep burgundy spider chrysanthemums',
    description:
      'Theatrical, moody and full of texture. Wine-red Anastasia-style chrysanthemums with smokebush.',
    basePrice: 342,
    image: img('1561181286-d3fee7d55364'),
    palette: ['#4D0D17', '#8E1B2A'],
    ingredients: ['Burgundy chrysanthemums', 'Smokebush', 'Eucalyptus'],
    badge: 'New',
  },

  // CARNATIONS
  {
    id: 'ca-01',
    slug: 'antique-carnation-posy',
    name: 'Antique Carnation Posy',
    category: 'carnations',
    categoryName: 'Carnations',
    tagline: 'Dusty pink ruffled carnations',
    description:
      'A return to the underrated classic. Antique pink carnations, gently fragrant and elegantly imperfect.',
    basePrice: 225,
    sizes: [
      { label: 'Posy', price: 225 },
      { label: 'Bouquet', price: 405 },
    ],
    image: img('1455717974081-0436a066bb96'),
    palette: ['#F4D1D5', '#E69BA3'],
    ingredients: ['Antique pink carnations', 'Italian ruscus'],
  },
  {
    id: 'ca-02',
    slug: 'carnation-confetti',
    name: 'Carnation Confetti',
    category: 'carnations',
    categoryName: 'Carnations',
    tagline: 'A multicolour celebration of frills',
    description:
      'A handful of mixed carnations in soft pinks, cream and coral — a tiny party, in flower form.',
    basePrice: 270,
    image: img('1490750967868-88aa4486c946'),
    palette: ['#F4D1D5', '#EAD18C', '#D26370'],
    ingredients: ['Mixed-colour carnations'],
  },
  {
    id: 'ca-03',
    slug: 'ivory-carnation-trio',
    name: 'Ivory Carnation Trio',
    category: 'carnations',
    categoryName: 'Carnations',
    tagline: 'Three single white carnation stems',
    description:
      'A minimalist gesture for a desk, a bedside or a quiet sympathy gift.',
    basePrice: 189,
    image: img('1518895949257-7621c3c786d7'),
    palette: ['#FAF7F0', '#F3EEE2'],
    ingredients: ['Three white carnation stems'],
  },

  // RANUNCULUS
  {
    id: 'ra-01',
    slug: 'peony-ranunculus-posy',
    name: 'Peony Ranunculus Posy',
    category: 'ranunculus',
    categoryName: 'Ranunculus',
    tagline: 'Peach and cream petal-on-petal posy',
    description:
      'A handheld dream of ranunculus heads — peach, cream and the softest blush. Wedding favourite.',
    basePrice: 450,
    sizes: [
      { label: 'Posy', price: 450 },
      { label: 'Bouquet', price: 720 },
    ],
    image: img('1502086223501-7ea6ecd79368'),
    palette: ['#EAD18C', '#F4D1D5', '#FAF7F0'],
    ingredients: ['Peach ranunculus', 'Cream ranunculus', 'Wax flower'],
    badge: 'Bestseller',
  },
  {
    id: 'ra-02',
    slug: 'cloni-crimson',
    name: 'Cloni Crimson',
    category: 'ranunculus',
    categoryName: 'Ranunculus',
    tagline: 'Deep red Italian ranunculus',
    description:
      'Cloni-style ranunculus in saturated, near-velvet crimson. Bigger blooms, richer colour, longer vase life.',
    basePrice: 540,
    image: img('1487530811176-3780de880c2d'),
    palette: ['#8E1B2A', '#4D0D17'],
    ingredients: ['Cloni crimson ranunculus'],
    badge: 'Limited',
  },
  {
    id: 'ra-03',
    slug: 'butterfly-ranunculus',
    name: 'Butterfly Ranunculus',
    category: 'ranunculus',
    categoryName: 'Ranunculus',
    tagline: 'Delicate, smaller-headed ranunculus on long stems',
    description:
      'Airy, almost wildflower-like. Butterfly-variety ranunculus in mixed pastels.',
    basePrice: 504,
    image: img('1518895949257-7621c3c786d7'),
    palette: ['#F4D1D5', '#EAD18C'],
    ingredients: ['Butterfly ranunculus, mixed pastel'],
  },

  // CELOSIA
  {
    id: 'ce-01',
    slug: 'velvet-flame-celosia',
    name: 'Velvet Flame Celosia',
    category: 'celosia',
    categoryName: 'Celosia',
    tagline: 'Coral cockscomb celosia stems',
    description:
      'The flower that looks like coral and feels like velvet. Cockscomb celosia in deep coral.',
    basePrice: 234,
    image: img('1561181286-d3fee7d55364'),
    palette: ['#D26370', '#8E1B2A'],
    ingredients: ['Cockscomb celosia'],
  },
  {
    id: 'ce-02',
    slug: 'plume-sunset',
    name: 'Plume Sunset',
    category: 'celosia',
    categoryName: 'Celosia',
    tagline: 'Feathery celosia plumes in warm tones',
    description:
      'Soft-edged, flame-shaped plumes in apricot, rust and gold. Texture for days.',
    basePrice: 270,
    image: img('1502086223501-7ea6ecd79368'),
    palette: ['#EAD18C', '#C9A24C', '#A98538'],
    ingredients: ['Plumed celosia, mixed warm tones'],
  },

  // FILLERS
  {
    id: 'fi-01',
    slug: 'seeded-eucalyptus-bundle',
    name: 'Seeded Eucalyptus Bundle',
    category: 'fillers',
    categoryName: 'Fillers & Foliage',
    tagline: 'A fragrant bundle of silver eucalyptus',
    description:
      'For arranging, for wreaths, for the bath. Cut and conditioned, a generous bundle.',
    basePrice: 162,
    image: img('1518709779341-56cf4535e94b'),
    palette: ['#86692A', '#A98538'],
    ingredients: ['Seeded silver eucalyptus'],
  },
  {
    id: 'fi-02',
    slug: 'waxflower-cloud',
    name: 'Waxflower Cloud',
    category: 'fillers',
    categoryName: 'Fillers & Foliage',
    tagline: 'A delicate, blushing filler bundle',
    description:
      'Tiny waxflower blooms on slender stems. The bouquet whisper that softens every other flower.',
    basePrice: 189,
    image: img('1518895949257-7621c3c786d7'),
    palette: ['#F4D1D5', '#FAF7F0'],
    ingredients: ['Pink waxflower'],
  },
  {
    id: 'fi-03',
    slug: 'italian-ruscus-bundle',
    name: 'Italian Ruscus Bundle',
    category: 'fillers',
    categoryName: 'Fillers & Foliage',
    tagline: 'Glossy ribbon foliage for arrangement work',
    description:
      'Dark green, ribbon-shaped ruscus. The everyday workhorse of considered floral design.',
    basePrice: 144,
    image: img('1518709779341-56cf4535e94b'),
    palette: ['#5E4A1E', '#86692A'],
    ingredients: ['Italian ruscus'],
  },
  {
    id: 'fi-04',
    slug: 'gypsophila-cloud',
    name: 'Gypsophila Cloud',
    category: 'fillers',
    categoryName: 'Fillers & Foliage',
    tagline: 'A dreamy white cloud of baby\'s breath',
    description:
      'The classic, used well. A generous cloud of gypsophila — alone in a vase or scattered through a bouquet.',
    basePrice: 162,
    image: img('1518895949257-7621c3c786d7'),
    palette: ['#FAF7F0', '#F3EEE2'],
    ingredients: ['Gypsophila / Baby\'s breath'],
  },

  // TULIPS (seasonal)
  {
    id: 'tu-01',
    slug: 'french-tulip-bunch',
    name: 'French Tulip Bunch',
    category: 'tulips',
    categoryName: 'Tulips',
    tagline: 'Long-stem French tulips, in season',
    description:
      'Tall, elegant French tulips with a slight curve. Available in our cooler months only — book ahead.',
    basePrice: 432,
    sizes: [
      { label: '10 stems', price: 432 },
      { label: '20 stems', price: 810 },
    ],
    image: img('1496062031456-07b8f162a322'),
    palette: ['#F4D1D5', '#FAF7F0'],
    ingredients: ['French tulips, colour of the day'],
    badge: 'Limited',
  },
  {
    id: 'tu-02',
    slug: 'parrot-tulip-pose',
    name: 'Parrot Tulip Pose',
    category: 'tulips',
    categoryName: 'Tulips',
    tagline: 'Frilled, painterly parrot tulips',
    description:
      'The unmistakable cousins — frilled, streaked and full of personality. Painted by hand, almost.',
    basePrice: 486,
    image: img('1502086223501-7ea6ecd79368'),
    palette: ['#D26370', '#EAD18C'],
    ingredients: ['Parrot tulips, mixed'],
  },

  // CURIOSITIES (misc)
  {
    id: 'cu-01',
    slug: 'phalaenopsis-orchid-stem',
    name: 'Phalaenopsis Orchid Stem',
    category: 'curiosities',
    categoryName: 'Curiosities',
    tagline: 'A single white moth orchid stem',
    description:
      'Sculpted, sculptural, serene. A single white phalaenopsis stem, sleeved in matte black.',
    basePrice: 324,
    image: img('1502672023488-70e25813eb80'),
    palette: ['#FAF7F0', '#F3EEE2'],
    ingredients: ['White phalaenopsis orchid stem'],
  },
  {
    id: 'cu-02',
    slug: 'anthurium-heart',
    name: 'Anthurium Heart',
    category: 'curiosities',
    categoryName: 'Curiosities',
    tagline: 'A modern red anthurium trio',
    description:
      'Glossy, heart-shaped and unapologetically modern. Three red anthurium stems with monstera leaf.',
    basePrice: 234,
    image: img('1487530811176-3780de880c2d'),
    palette: ['#8E1B2A', '#5E4A1E'],
    ingredients: ['Red anthurium', 'Monstera leaf'],
  },
  {
    id: 'cu-03',
    slug: 'dried-heirloom-bundle',
    name: 'Dried Heirloom Bundle',
    category: 'curiosities',
    categoryName: 'Curiosities',
    tagline: 'A keepsake bouquet of preserved blooms',
    description:
      'For people who do not throw flowers away. Preserved roses, statice, pampas and bunny tails.',
    basePrice: 450,
    sizes: [
      { label: 'Posy', price: 450 },
      { label: 'Bouquet', price: 720 },
    ],
    image: img('1542838686-37da4a9fd1b3'),
    palette: ['#EAD18C', '#A98538', '#FAF7F0'],
    ingredients: ['Preserved roses', 'Statice', 'Mini pampas', 'Bunny tails'],
    badge: 'New',
  },
];

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getProductsByCategory = (category: Category | undefined) =>
  category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;

export const getFeaturedProducts = () => PRODUCTS.filter((p) => p.featured);

export const getRelatedProducts = (product: Product, count = 4) =>
  PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, count);
