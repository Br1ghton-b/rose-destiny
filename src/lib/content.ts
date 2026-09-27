import {
  BedDouble,
  Briefcase,
  Building,
  Building2,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  Church,
  ClipboardList,
  Droplets,
  FileText,
  GraduationCap,
  HeartHandshake,
  House,
  KeyRound,
  Leaf,
  type LucideIcon,
  Rocket,
  Scissors,
  Search,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Trees,
  BadgeCheck,
  Repeat,
  Warehouse,
} from 'lucide-react';

export const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'process', label: 'Process' },
  { id: 'partners', label: 'Partners' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const HIGHLIGHTS: { icon: LucideIcon; label: string }[] = [
  { icon: House, label: 'Residential Cleaning' },
  { icon: Building2, label: 'Commercial Cleaning' },
  { icon: Sparkles, label: 'Deep Cleaning' },
  { icon: ShieldCheck, label: 'Trusted & Reliable' },
  { icon: Leaf, label: 'Eco-Friendly Products' },
];

export type ServiceCategory = {
  icon: LucideIcon;
  title: string;
  intro: string;
  items: string[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    icon: Building2,
    title: 'Office & Commercial Cleaning',
    intro: 'Consistent daily care for workplaces that need to look their best, from the reception desk to the boardroom.',
    items: [
      'General office cleaning',
      'Sweeping, mopping and vacuuming',
      'Dusting and surface cleaning',
      'Reception and common-area cleaning',
      'Kitchen and staff-area cleaning',
      'Boardroom cleaning',
      'Waste removal',
    ],
  },
  {
    icon: Droplets,
    title: 'Washroom & Hygiene Cleaning',
    intro: 'Hygienic, fresh and well-kept washrooms that protect your staff and make the right impression on visitors.',
    items: [
      'Toilet and bathroom cleaning',
      'Sanitising high-touch surfaces',
      'Basin and mirror cleaning',
      'Floor cleaning',
      'Restocking of client-supplied hygiene products',
    ],
  },
  {
    icon: Building,
    title: 'Property & Facility Cleaning',
    intro: 'Well-presented shared spaces for buildings, complexes and managed properties of every size.',
    items: [
      'Commercial buildings',
      'Residential complexes',
      'Property management facilities',
      'Common areas',
      'Staircases and passageways',
      'Building entrances',
    ],
  },
  {
    icon: BedDouble,
    title: 'Guesthouse & Hospitality Cleaning',
    intro: 'Guest-ready rooms and welcoming communal spaces, cared for to hospitality standards.',
    items: ['Guest rooms', 'Bathrooms', 'Reception areas', 'Common areas', 'Kitchen and dining areas'],
  },
  {
    icon: Sparkles,
    title: 'Deep & Once-Off Cleaning',
    intro: 'A detailed reset for moves, events, seasons and spaces that need extra attention.',
    items: [
      'Deep office cleaning',
      'Move-in and move-out cleaning',
      'Post-event cleaning',
      'Spring/deep cleaning',
      'Special cleaning requirements',
    ],
  },
];

export const SERVICE_OPTIONS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: CalendarDays,
    title: 'Daily Cleaning',
    text: 'Ideal for offices, medical practices, busy commercial premises and facilities requiring regular maintenance.',
  },
  {
    icon: Repeat,
    title: 'Weekly Cleaning',
    text: 'Suitable for smaller offices and businesses requiring scheduled professional cleaning.',
  },
  {
    icon: CalendarRange,
    title: 'Custom Cleaning Schedule',
    text: 'A cleaning programme designed around your business hours and specific requirements.',
  },
  {
    icon: Sparkles,
    title: 'Once-Off / Deep Cleaning',
    text: 'Suitable for special occasions, relocations, renovations, seasonal cleaning and premises requiring additional attention.',
  },
];

export const REASONS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Briefcase, title: 'Professional Service', text: 'We maintain a professional approach from initial consultation through to service delivery.' },
  { icon: ShieldCheck, title: 'Reliable & Consistent', text: 'We understand that businesses need cleaning services they can depend on.' },
  { icon: ClipboardList, title: 'Tailored Solutions', text: 'Every workplace is different. We assess your premises and develop a cleaning schedule around your requirements.' },
  { icon: BadgeCheck, title: 'Quality Focused', text: 'Our objective is to maintain a clean, hygienic and presentable environment.' },
  { icon: CalendarCheck, title: 'Flexible Schedules', text: 'Daily, weekly, scheduled or once-off cleaning arrangements, depending on your business requirements.' },
  { icon: Shirt, title: 'Professional Appearance', text: 'Our team can operate in branded workwear, creating a professional and identifiable presence at your premises.' },
];

export const PROCESS: { icon: LucideIcon; phase: string; title: string; text: string }[] = [
  { icon: HeartHandshake, phase: 'Discover', title: 'Initial Consultation', text: 'We discuss your cleaning requirements, preferred schedule and the specific areas that need attention.' },
  { icon: Search, phase: 'Discover', title: 'Site Assessment', text: 'We assess the premises to understand the size, cleaning requirements and frequency needed.' },
  { icon: ClipboardList, phase: 'Plan', title: 'Cleaning Plan', text: 'We prepare a customised cleaning schedule based on your requirements.' },
  { icon: FileText, phase: 'Plan', title: 'Quotation', text: 'A formal quotation is provided based on the agreed scope of work.' },
  { icon: Rocket, phase: 'Deliver', title: 'Service Commencement', text: 'Once approved, we agree on a start date and cleaning schedule.' },
  { icon: BadgeCheck, phase: 'Deliver', title: 'Quality Monitoring', text: 'We maintain consistent standards and welcome your feedback to continuously improve our service.' },
];

export const PARTNERS: { icon: LucideIcon; label: string }[] = [
  { icon: Building2, label: 'Corporate offices' },
  { icon: Briefcase, label: 'Small & medium-sized businesses' },
  { icon: Trees, label: 'Office parks' },
  { icon: KeyRound, label: 'Property management companies' },
  { icon: Stethoscope, label: 'Medical practices' },
  { icon: GraduationCap, label: 'Schools & educational facilities' },
  { icon: BedDouble, label: 'Guesthouses' },
  { icon: ShoppingBag, label: 'Retail businesses' },
  { icon: Scissors, label: 'Salons & beauty establishments' },
  { icon: Church, label: 'Churches & community organisations' },
  { icon: House, label: 'Residential complexes' },
  { icon: Warehouse, label: 'Warehouses & commercial facilities' },
];

export const TESTIMONIALS = [
  {
    quote: 'Rose Destiny Cleaning Services is amazing! My home has never been this clean. The team is professional, friendly and trustworthy.',
    name: 'Nomsa M.',
    detail: 'Residential client',
  },
  {
    quote: "We've been using their commercial cleaning services for our office and the difference is incredible. Highly recommend them!",
    name: 'Thabo K.',
    detail: 'Commercial client',
  },
  {
    quote: "Reliable, efficient and affordable. They always go the extra mile. I'm so happy with their service!",
    name: 'Lerato S.',
    detail: 'Residential client',
  },
];
