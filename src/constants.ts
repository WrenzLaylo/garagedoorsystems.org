export const CONTACT = {
  phone: "03 8789 9377",
  phoneTel: "tel:0387899377",
  emergencyPhone: "03 8789 9378",
  emergencyTel: "tel:0387899378",
  email: "enquiries@aggdoors.com.au",
  address: "Greater Melbourne, VIC",
  hours: "Mon–Fri 8:00am–5:00pm | Emergency 24/7",
} as const;

export const BUSINESS = {
  name: "Garage Door Systems",
  tagline: "Your complete garage door partner — supply, install, repair, automate",
  parenBrand: "AGG Doors",
  parentBrandUrl: "https://aggdoors.com.au",
  founded: 1999,
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const STATS = [
  { value: "25+", label: "Years in Business" },
  { value: "600+", label: "5-Star Reviews" },
  { value: "24/7", label: "Emergency Support" },
  { value: "100%", label: "Safety Certified" },
] as const;

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  features: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "supply-install",
    icon: "PackagePlus",
    title: "New Door Supply & Install",
    desc: "Complete garage door systems for new builds, replacements and upgrades. We supply and professionally install panel doors, roller doors, and tilt doors in steel and timber.",
    features: [
      "All major brands — B&D, Dominator, Merlin, Gliderol",
      "Steel, Colorbond and timber options",
      "Professional measurement and quote",
      "Full installation with warranty",
    ],
  },
  {
    id: "repairs",
    icon: "Wrench",
    title: "Garage Door Repairs",
    desc: "Stuck, noisy, off-track or damaged doors — we diagnose the problem fast and restore smooth, safe operation. Repairs for all door types and brands.",
    features: [
      "Same-day repairs across Melbourne",
      "Panel damage and realignment",
      "Cable, spring and roller replacements",
      "No-fix no-fee on diagnosis",
    ],
  },
  {
    id: "motors-automation",
    icon: "Zap",
    title: "Motors & Automation",
    desc: "New motor installs, motor replacements, and automation upgrades. Add electric opening to any existing door or upgrade your old motor to a modern smart-opener.",
    features: [
      "New motor installation",
      "Motor replacement and upgrades",
      "Smart opener integration",
      "Battery backup installation",
    ],
  },
  {
    id: "springs-cables",
    icon: "RefreshCw",
    title: "Springs, Cables & Tracks",
    desc: "Broken springs and frayed cables are the most common cause of door failure and a serious safety risk. We replace and tension all spring types safely.",
    features: [
      "Torsion and extension springs",
      "Cable replacement and re-termination",
      "Track realignment and replacement",
      "Safety inspection included",
    ],
  },
  {
    id: "remotes-controls",
    icon: "Key",
    title: "Remotes & Wall Controls",
    desc: "Programming, repairing or replacing remotes and wall switches. We carry a full range of compatible remotes and can usually sort same-day issues.",
    features: [
      "All major brand remotes in stock",
      "Remote programming and pairing",
      "Wall button and control panel repair",
      "Keypad and PIN code setup",
    ],
  },
  {
    id: "emergency",
    icon: "AlertTriangle",
    title: "Emergency Repairs",
    desc: "Door stuck open, off track or posing a safety risk? We run 24/7 emergency call-outs across Melbourne. Don't force it — call us immediately.",
    features: [
      "24 hours a day, 7 days a week",
      "Doors stuck open or closed",
      "Off-track and misaligned doors",
      "Spring snap emergency response",
    ],
  },
  {
    id: "maintenance",
    icon: "ShieldCheck",
    title: "Preventative Maintenance",
    desc: "Annual servicing prevents costly breakdowns and extends the life of your door system. We inspect, lubricate, adjust and report on every component.",
    features: [
      "Full door and motor inspection",
      "Lubrication of all moving parts",
      "Hardware tightening and adjustment",
      "Service report and recommendations",
    ],
  },
];

export const STEPS = [
  {
    num: "01",
    title: "Get in Touch",
    desc: "Call us or fill out the contact form. Describe the issue or tell us what you need — we'll give you a clear picture of what to expect.",
  },
  {
    num: "02",
    title: "We Assess & Quote",
    desc: "A technician inspects the door, motor and hardware to identify the root cause. You get an upfront quote before any work begins — no surprises.",
  },
  {
    num: "03",
    title: "We Complete the Work",
    desc: "Professional repair, installation or maintenance carried out using quality parts. We test everything before leaving the site.",
  },
  {
    num: "04",
    title: "You Enjoy Peace of Mind",
    desc: "Your door performs reliably, your family is safe, and you have a full work history with AGG Doors for future reference.",
  },
] as const;

export const SERVICE_AREAS = [
  "Melbourne CBD",
  "Eastern Suburbs",
  "South Eastern Suburbs",
  "Northern Suburbs",
  "Western Suburbs",
  "Bayside",
  "Mornington Peninsula",
  "Greater Melbourne",
] as const;

export interface TestimonialItem {
  name: string;
  suburb: string;
  rating: number;
  text: string;
  date: string;
  serviceType?: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Sarah M.",
    suburb: "Balwyn",
    rating: 5,
    text: "Very honest customer service. Professional recommendations saved me thousands. Very respectful towards customers and attended on time. Real down-to-earth Aussie customer service.",
    date: "Mar 2026",
    serviceType: "New Garage Door Install",
  },
  {
    name: "Darren E.",
    suburb: "Point Cook",
    rating: 5,
    text: "Nick came out to our home and was very professional. He popped a few dents out from the door and was on his way quickly. Will definitely recommend.",
    date: "Mar 2026",
    serviceType: "Door Panel Repair",
  },
  {
    name: "Katie H.",
    suburb: "Richmond",
    rating: 5,
    text: "Really appreciate the quick response from the team. Got my garage door back working in no time. I know how busy AGG Doors are and they still made time for us.",
    date: "Feb 2026",
    serviceType: "Motor Replacement",
  },
] as const;

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: "Do you supply and install new garage doors?",
    a: "Yes. We supply and professionally install a full range of garage doors — panel lift, roller, and tilt — in steel, Colorbond and timber. We work with all major brands and provide a full warranty on both the door and installation.",
  },
  {
    q: "What brands do you work with?",
    a: "We work with all major garage door brands including B&D, Dominator, Merlin, Gliderol, Centurion, and more. We're brand-agnostic — we'll service and repair whatever door or opener you have.",
  },
  {
    q: "How much does a garage door repair cost?",
    a: "Simple repairs like remote replacement or minor adjustments typically start from $120. More significant work like spring replacement or motor repair is quoted after inspection. We always provide an upfront quote before starting any work.",
  },
  {
    q: "Do you offer emergency garage door services?",
    a: "Yes. We run 24/7 emergency call-outs across Melbourne. If your door is stuck open, off track, or poses a safety risk, call us immediately and we'll dispatch the fastest available technician.",
  },
  {
    q: "Can you automate my existing manual garage door?",
    a: "Absolutely. We install motors and automatic openers on most existing manual doors. We can assess your door on-site to confirm compatibility and provide a quote for the automation upgrade.",
  },
  {
    q: "Do you provide a warranty on repairs?",
    a: "Yes. All repairs are backed by a workmanship warranty. Parts come with manufacturer warranties where applicable. We provide a clear service report after every job.",
  },
] as const;