import hero from '@/assets/architecture-hero.jpg';
import apartment from '@/assets/apartment.jpg';
import interior from '@/assets/interior.jpg';
import villas from '@/assets/villas.jpg';
import serviceCommercial from '@/assets/service-commercial.jpg';
import serviceIndustrial from '@/assets/service-industrial.jpg';
import serviceCivil from '@/assets/service-civil.jpg';
import serviceBlueprint from '@/assets/service-blueprint.jpg';
import serviceManager from '@/assets/service-manager.jpg';
export const images = {
  hero,
  apartment,
  interior,
  villas,
  serviceCommercial,
  serviceIndustrial,
  serviceCivil,
  serviceBlueprint,
  serviceManager
};

export const company = {
  name: 'Jentora Builder Private Limited',
  shortName: 'Jentora',
  established: '2025',
  experience: '20+',
  experienceFull: '20 Years of Industry experience in Commercial, Residential, Industrial Buildings',
  completedProjects: 157,
  ongoingProjects: 2,
  totalProjects: 159,
  keyAreas: ['Chennai', 'Coimbatore'],
  address: {
    street: 'Plot No.85, 2nd Floor, 4th Avenue Road, Shanthi Colony, Anna Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600040',
    full: 'Plot No.85, 2nd Floor, 4th Avenue Road, Shanthi Colony, Anna Nagar, Chennai – 600040.'
  },
  phones: ['+91 9444434196'],
  primaryPhone: '+91 9444434196',
  secondaryPhone: '',
  email: 'admin@jentorabuilder.com',
  whatsapp: '+91 9444434196',
  whatsappUrl: 'https://wa.me/919444434196?text=Hi%20Jentora%20Builder,%20I%20would%20like%20to%20enquire%20about%20your%20construction%20services.',
  googleMapsUrl: 'https://maps.app.goo.gl/jhPACJxwpdF3Prdp6',
  operatingHours: 'Monday to Saturday – 10.00 am to 6.00 pm',
  introduction: 'Jentora Builder Pvt Ltd is a premier construction enterprise built on 20 years of industry experience delivering exceptional residential, commercial, and industrial developments across Chennai and Coimbatore. We believe a home or commercial landmark is someone’s dream, life savings, and trust—and we construct with that uncompromising responsibility. With 157 completed landmarks and landmark projects under construction, we bring passion, precision, and perfection to every project.'
};

export const leadership = [
  {
    name: 'Mr. SARAVANAN V',
    role: 'Managing Director',
    designation: 'Managing Director',
    bio: 'Leading Jentora Builder with 20+ years of deep industry expertise across commercial, residential, and industrial construction. Mr. Saravanan drives the organization with a focus on engineering precision, structural integrity, and enduring client trust.'
  },
  {
    name: 'Mrs. GIRIJA',
    role: 'Marketing Lead',
    designation: 'Marketing Lead',
    bio: 'Heading marketing, strategic partnerships, and client engagement for Jentora Builder. Mrs. Girija ensures every client receives transparent communication, tailored project consultation, and a seamless journey from inception to handover.'
  }
];

export const qualityAssurancePractices = [
  { title: 'Pre-Construction Quality Planning', desc: 'Comprehensive technical reviews, architectural detailing, and milestone planning before groundbreaking.' },
  { title: 'Material Testing & Verification', desc: 'Strict lab testing of cement, high-grade steel, aggregate, and finish fixtures for certified durability.' },
  { title: 'Regular Inspections & Audits', desc: 'Multi-tier structural inspections and rigorous QA stage gates at every critical construction stage.' },
  { title: 'Documentation & Communication', desc: 'Transparent logs, stage-wise photo updates, and detailed milestone reports for complete peace of mind.' },
  { title: 'Competency Development', desc: 'Continuous skill training, advanced engineering workshops, and certified trade craftsmanship.' },
  { title: 'Risk Management', desc: 'Proactive hazard identification, contingency planning, and structural safety mitigation.' },
  { title: 'Continuous Improvement', desc: 'Integration of modern construction methodologies, smart engineering, and client feedback mechanisms.' },
  { title: 'Compliance & Regulatory Adherence', desc: 'Strict compliance with municipal planning permissions, building authorities, and national building codes.' }
];

export const safetyStandards = [
  { title: 'Risk Assessment', desc: 'Systematic job-hazard analysis and mitigation protocols prior to every construction activity.' },
  { title: 'Work-at-Height Safety', desc: 'Engineered scaffolding, dual-lanyard safety harnesses, edge barricades, and certified lifelines.' },
  { title: 'Equipment & Machinery Safety', desc: 'Mandatory daily inspections, licensed heavy equipment operators, and preventive machinery maintenance.' },
  { title: 'Excavation & Structural Work', desc: 'Engineered trench shoring, slope stabilization, and structural foundation safety controls.' },
  { title: 'Electrical Safety', desc: 'Weatherproof distribution panels, ELCB circuit breakers, and industrial-grade insulated temporary wiring.' },
  { title: 'PPE & Welfare', desc: '100% mandatory Personal Protective Equipment, on-site first aid stations, and hygienic worker welfare facilities.' }
];

export const uniqueSellingPoints = [
  {
    number: '01',
    title: 'Client-Centric Approach',
    desc: 'Your aspirations are our guiding blueprint. We prioritize transparent consultation, flexible modifications, and dedicated project managers throughout your building journey.'
  },
  {
    number: '02',
    title: 'Strategic Market Positioning',
    desc: 'Uncompromising standard of premium quality, transparent pricing, and unmatched engineering precision that deliver enduring capital appreciation.'
  },
  {
    number: '03',
    title: 'Innovation & Adaptability',
    desc: 'Modern construction practices, green building techniques, energy-efficient designs, and future-ready architectural methodologies.'
  },
  {
    number: '04',
    title: 'Community Integration',
    desc: 'Creating iconic developments that harmonize with their environment, enrich neighborhood value, and foster vibrant, connected communities.'
  },
  {
    number: '05',
    title: 'Flexible Payment Plans',
    desc: 'Transparent, stage-linked construction payment schedules tailored to help you plan your finances smoothly without hidden costs.'
  }
];

export const socialLinks = {
  facebook: 'https://www.facebook.com/profile.php?id=61591720892721',
  instagram: 'https://www.instagram.com/jentorabuilderofficial/',
  linkedin: 'https://www.linkedin.com/in/jentora-builder-private-limited-257b233a7/',
  youtube: 'https://www.youtube.com/@JentoraBuilder'
};

export const navigation = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'MISSION & VISION', to: '/vision-mission' },
  { label: 'SERVICES', to: '/services' },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'CONTACT', to: '/contact' }
] as const;
export interface Project {
  id: string;
  number: string;
  name: string;
  location: string;
  category: string;
  units?: number | string;
  floors?: number | string;
  year?: string;
  status: 'Completed' | 'Under Construction' | 'Upcoming' | string;
  image: string;
  gallery: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  desc: string;
  exploredContent?: string;
  image: string;
  features?: string[];
  active?: boolean;
}

export interface FooterConfig {
  serviceListStyle: 'numbers' | 'bullets' | 'arrows' | 'plain' | 'pills';
  navListStyle: 'numbers' | 'bullets' | 'arrows' | 'plain' | 'pills';
  brandHeadline: string;
  brandTagline: string;
  brandAboutText: string;
  turnkeyTitle: string;
  turnkeyText: string;
  operatingRegionsTitle: string;
  operatingRegionsText: string;
  showProjectsInFooter?: boolean;
}

export interface ServicesPageConfig {
  heroSubtitle: string;
  heroTitle: string;
  heroDescription: string;
  commitmentSubtitle: string;
  commitmentTitle: string;
  zigzagLabel: string;
  zigzagMainHeading: string;
  zigzagSubheading: string;
  ctaSubtitle: string;
  ctaTitle: string;
  ctaButtonText: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  category: 'Services' | 'Projects' | 'Branding' | 'Elevations' | 'General';
  url: string;
  size?: string;
  uploadedAt: string;
}

export const footerConfig: FooterConfig = {
  serviceListStyle: 'numbers',
  navListStyle: 'numbers',
  brandHeadline: 'START YOUR PROJECT',
  brandTagline: 'PASSION · PRECISION · PERFECTION',
  brandAboutText: '20 Years of industry experience delivering premium residential, commercial, and industrial landmarks built on trust and superior craftsmanship.',
  turnkeyTitle: 'TURNKEY ASSURANCE',
  turnkeyText: 'End-to-end structural engineering, architectural blueprints, and handover guarantee across Tamil Nadu.',
  operatingRegionsTitle: 'OPERATING REGIONS',
  operatingRegionsText: 'Chennai · Coimbatore',
  showProjectsInFooter: false
};

export const servicesPageConfig: ServicesPageConfig = {
  heroSubtitle: 'OUR SERVICES',
  heroTitle: 'WHAT WE BUILD.',
  heroDescription: 'Comprehensive construction and design solutions for residential, commercial and industrial spaces.',
  commitmentSubtitle: 'WHY CHOOSE JENTORA',
  commitmentTitle: 'More Than Construction. It’s a Commitment.',
  zigzagLabel: 'OUR CAPABILITIES',
  zigzagMainHeading: 'Tailored solutions for lasting impact.',
  zigzagSubheading: 'From luxurious homes to large-scale commercial and industrial spaces, our services are designed to bring your vision to life with precision, quality and integrity.',
  ctaSubtitle: 'READY TO GET STARTED?',
  ctaTitle: 'LET’S BUILD SOMETHING EXCEPTIONAL.',
  ctaButtonText: 'START A CONVERSATION'
};

export const defaultMediaAssets: MediaAsset[] = [
  {
    id: 'asset-villas',
    title: 'Luxury Villas & Residential',
    category: 'Services',
    url: villas,
    size: '331 KB',
    uploadedAt: '2026-11-13',
  },
  {
    id: 'asset-comm',
    title: 'Commercial Construction Highrise',
    category: 'Services',
    url: serviceCommercial,
    size: '964 KB',
    uploadedAt: '2026-11-13',
  },
  {
    id: 'asset-ind',
    title: 'Industrial Warehouse & PEB Plant',
    category: 'Services',
    url: serviceIndustrial,
    size: '748 KB',
    uploadedAt: '2026-11-13',
  },
  {
    id: 'asset-apt',
    title: 'Turnkey Apartment Complex',
    category: 'Projects',
    url: apartment,
    size: '329 KB',
    uploadedAt: '2026-11-13',
  },
  {
    id: 'asset-interior',
    title: 'Interior Design & Luxury Woodwork',
    category: 'Services',
    url: interior,
    size: '278 KB',
    uploadedAt: '2026-11-13',
  },
  {
    id: 'asset-civil',
    title: 'Civil Engineering & Foundation Works',
    category: 'Services',
    url: serviceCivil,
    size: '970 KB',
    uploadedAt: '2026-11-13',
  },
  {
    id: 'asset-blueprint',
    title: 'Architectural Blueprint & Planning',
    category: 'Services',
    url: serviceBlueprint,
    size: '789 KB',
    uploadedAt: '2026-11-13',
  },
  {
    id: 'asset-manager',
    title: 'Construction Project Management',
    category: 'Services',
    url: serviceManager,
    size: '927 KB',
    uploadedAt: '2026-11-13',
  },
  {
    id: 'asset-vadapalani-1',
    title: 'Jentora Vadapalani Landmark Facade',
    category: 'Projects',
    url: '/site-photos/vadapalani/vadapalani-1.jpg',
    size: '420 KB',
    uploadedAt: '2026-11-13',
  },
  {
    id: 'asset-thiruvallur-1',
    title: 'Jentora Thiruvallur Elevation Render',
    category: 'Projects',
    url: '/site-photos/thiruvallur/thiruvallur-1.png',
    size: '512 KB',
    uploadedAt: '2026-11-13',
  },
  {
    id: 'asset-choolaimedu-1',
    title: 'Jentora Edone Choolaimedu Project',
    category: 'Projects',
    url: '/site-photos/choolaimedu/choolaimedu-1.jpg',
    size: '390 KB',
    uploadedAt: '2026-11-13',
  },
  {
    id: 'asset-madukkarai-1',
    title: 'Jentora Highland Prive Coimbatore Villas',
    category: 'Projects',
    url: '/site-photos/madukkarai/madukkarai-1.jpg',
    size: '480 KB',
    uploadedAt: '2026-11-13',
  },
];

export const projects: Project[] = [
  {
    id: 'jentora-vadapalani',
    number: '01',
    name: 'Jentora Vadapalani',
    location: 'Vadapalani, Chennai',
    category: 'Apartment',
    units: 6,
    floors: 3,
    year: '2025',
    status: 'Completed',
    image: '/site-photos/vadapalani/vadapalani-1.jpg',
    gallery: [
      '/site-photos/vadapalani/vadapalani-1.jpg',
      '/site-photos/vadapalani/vadapalani-2.jpg',
      '/site-photos/vadapalani/vadapalani-3.jpg',
      '/site-photos/vadapalani/vadapalani-4.jpg',
      '/site-photos/vadapalani/vadapalani-5.jpg',
      '/site-photos/vadapalani/vadapalani-6.jpg',
      '/site-photos/vadapalani/vadapalani-7.jpg',
      '/site-photos/vadapalani/vadapalani-8.jpg',
      '/site-photos/vadapalani/vadapalani-9.jpg'
    ]
  },
  {
    id: 'jentora-thiruvallur',
    number: '02',
    name: 'Jentora Thiruvallur',
    location: 'Thiruvallur',
    category: 'Apartment',
    units: 3,
    floors: 3,
    year: '2026',
    status: 'Completed',
    image: '/site-photos/thiruvallur/thiruvallur-1.png',
    gallery: [
      '/site-photos/thiruvallur/thiruvallur-1.png',
      '/site-photos/thiruvallur/thiruvallur-2.png',
      '/site-photos/thiruvallur/thiruvallur-3.jpg',
      '/site-photos/thiruvallur/thiruvallur-4.jpg',
      '/site-photos/thiruvallur/thiruvallur-5.jpg',
      '/site-photos/thiruvallur/thiruvallur-6.jpg',
      '/site-photos/thiruvallur/thiruvallur-7.jpg'
    ]
  },
  {
    id: 'jentora-edone',
    number: '03',
    name: 'Jentora Edone',
    location: 'Choolaimedu, Chennai',
    category: 'Apartment',
    units: 6,
    floors: 3,
    year: undefined,
    status: 'Under Construction',
    image: '/site-photos/choolaimedu/choolaimedu-1.jpg',
    gallery: [
      '/site-photos/choolaimedu/choolaimedu-1.jpg',
      '/site-photos/choolaimedu/choolaimedu-2.jpg',
      '/site-photos/choolaimedu/choolaimedu-3.jpg',
      '/site-photos/choolaimedu/choolaimedu-4.jpg'
    ]
  },
  {
    id: 'jentora-highland-prive',
    number: '04',
    name: 'Jentora Highland Prive',
    location: 'Madukkarai, Coimbatore',
    category: 'Individual Villas',
    units: 100,
    floors: 2,
    year: undefined,
    status: 'Under Construction',
    image: '/site-photos/madukkarai/madukkarai-1.jpg',
    gallery: [
      '/site-photos/madukkarai/madukkarai-1.jpg',
      '/site-photos/madukkarai/madukkarai-2.jpg'
    ]
  }
];

export const serviceItems: ServiceItem[] = [
  {
    id: 'residential-construction',
    number: '01',
    title: 'Residential Construction',
    desc: 'From custom luxury villas to modern apartment complexes, we craft exceptional living environments tailored to your lifestyle. Combining architectural elegance with structural integrity, we manage every phase—from ground preparation to final luxury finishes—ensuring your home stands as a lasting legacy of quality and comfort.',
    exploredContent: 'Jentora Builder delivers bespoke luxury individual villas, duplexes, and multi-unit residential communities across Chennai and Coimbatore. Every residence is engineered with soil-tested RCC structures, Vastu alignment, optimal natural lighting, cross-ventilation, and premium-grade fittings. We offer transparent 3D architectural renders, stage-wise photo updates, and turnkey project delivery on committed timelines.',
    image: villas,
    features: ['Soil & Structural Lab Testing', 'Vastu-Compliant Space Planning', '3D Photorealistic Elevations', 'Turnkey Luxury Fittings & Handover', 'Complete Municipal Approvals'],
    active: true
  },
  {
    id: 'commercial-construction',
    number: '02',
    title: 'Commercial Construction',
    desc: 'We design and construct iconic commercial buildings, corporate headquarters, and vibrant retail spaces engineered for growth and efficiency. Our commercial projects focus on optimized spatial planning, modern facade architecture, sustainable energy integration, and timely delivery to empower your business operations.',
    exploredContent: 'From modern corporate office headquarters to retail complexes and mixed-use commercial developments, Jentora specializes in functional, high-footfall structural engineering. We deliver expansive floor plates, modern glass facade systems, energy-efficient HVAC conduit integrations, high-load foundations, and complete municipal compliance certification.',
    image: serviceCommercial,
    features: ['High-Grade Facade & Steel Structures', 'Zoning & Municipal Fire Clearance', 'Energy-Efficient Architectural Design', 'High-Load Flooring & Escalator Wells', 'Dedicated Commercial Project Managers'],
    active: true
  },
  {
    id: 'industrial-construction',
    number: '03',
    title: 'Industrial Construction',
    desc: 'Engineering robust, scalable, and high-performance industrial facilities, warehouses, and logistics centers built for demanding operational needs. Utilizing heavy-duty materials, advanced structural systems, and strict safety compliance, we deliver industrial structures engineered for maximum productivity and long-term durability.',
    exploredContent: 'Engineered for high operational demands, our industrial construction solutions encompass pre-engineered building (PEB) sheds, heavy manufacturing plants, modern logistics warehouses, and distribution centers. We incorporate laser-screed concrete flooring, high-clearance crane gantries, robust fire suppression infrastructure, and national industrial safety codes.',
    image: serviceIndustrial,
    features: ['PEB Sheds & Heavy Structural Steel', 'Laser-Screed Heavy Industrial Flooring', 'Dock Leveler & Heavy Logistics Bays', 'Environmental & Pollution Compliance', 'High-Tension Power Substation Integration'],
    active: true
  },
  {
    id: 'turnkey-projects',
    number: '04',
    title: 'Turnkey Projects',
    desc: 'Comprehensive end-to-end project execution that takes your vision from initial concept to key handover without stress. We assume total single-point responsibility covering site acquisition, architectural design, structural engineering, procurement, construction management, and quality assurance.',
    exploredContent: 'Our turnkey construction service represents complete, single-point accountability. From initial architectural drawings and municipal permissions to structural foundation, MEP (mechanical, electrical, plumbing), interior finishes, and key handover—we handle everything while you enjoy milestone-driven peace of mind.',
    image: apartment,
    features: ['Single-Point Responsibility', 'Fixed Price & Milestone Guarantees', 'Full Authority & Plan Sanctions', 'Move-In Ready Handover', 'Dedicated Single Contact Desk'],
    active: true
  },
  {
    id: 'building-renovation',
    number: '05',
    title: 'Building Renovation',
    desc: 'Breathe new life and value into existing structures through comprehensive modern upgrades, structural retrofitting, and spatial redesigns. Whether restoring heritage properties or modernizing outdated commercial spaces, we preserve original structural character while integrating contemporary functionality.',
    exploredContent: 'Transform outdated buildings into modern architectural statements with Jentora renovation services. We conduct non-destructive structural audits, beam strengthening, facade remodeling, spatial reconfiguration, and contemporary plumbing and electrical modernization while maintaining safety and building codes.',
    image: interior,
    features: ['Non-Destructive Structural Health Audits', 'Exterior Facade & Elevation Modernization', 'Spatial Reconfiguration & Partitioning', 'Modern MEP Infrastructure Overhaul', 'Minimal Disruption Construction Planning'],
    active: true
  },
  {
    id: 'interior-design-and-fit-out',
    number: '06',
    title: 'Interior Design and Fit-Out',
    desc: 'Creating refined, bespoke interior environments that reflect your identity and purpose. Our interior team combines ergonomic planning, custom woodwork, lighting design, premium material selection, and detailed craftsmanship to deliver turnkey interiors for luxury homes and corporate spaces.',
    exploredContent: 'Our turnkey interior design and fit-out team transforms empty structures into luxurious, functional living and workspace sanctuaries. From bespoke Italian marble flooring and custom teak carpentry to architectural ambient lighting and sound acoustic treatments, every detail is crafted with perfection.',
    image: interior,
    features: ['Custom Modular Kitchens & Wardrobes', 'False Ceilings & Smart LED Automation', 'Premium Italian Marble & Granite Finishes', 'Acoustic & Thermal Insulation Systems', 'Turnkey Furniture & Decor Curation'],
    active: true
  },
  {
    id: 'civil-engineering',
    number: '07',
    title: 'Civil Engineering',
    desc: 'Delivering resilient foundational engineering and vital infrastructure solutions that underpin modern developments. From site grading, earthworks, and reinforced concrete structures to drainage systems and utility connections, our engineering guarantees safety, durability, and compliance.',
    exploredContent: 'Precision civil engineering forms the backbone of every landmark. Our licensed civil engineers oversee geo-technical investigation, pile foundations, retainment walls, earthquake-resistant framed structures, storm-water drainage channels, and heavy infrastructure earthworks.',
    image: serviceCivil,
    features: ['Geotechnical & Soil Bearing Audits', 'Deep Pile & Raft Foundation Engineering', 'Seismic Zone Compliant Structural Framing', 'Storm Water & Rainwater Harvesting Civil Works', 'Certified Structural Stability Certificates'],
    active: true
  },
  {
    id: 'architectural-planning',
    number: '08',
    title: 'Architectural Planning',
    desc: 'Thoughtful architectural design that balances aesthetic beauty, spatial utility, microclimate orientation, and environmental sustainability. Our architects create master plans, 3D visualizations, and detailed working drawings optimized for local zoning approvals and efficient construction.',
    exploredContent: 'Our architects unite artistic vision with pragmatic engineering. We develop master layouts, Vastu-oriented floor blueprints, realistic 3D exterior and interior walkthroughs, and sanction-ready working drawings compliant with CMDA and DTCP regulations.',
    image: serviceBlueprint,
    features: ['CMDA / DTCP Sanction Blueprints', '3D Virtual Walkthroughs & Renders', 'Passive Solar & Cross-Ventilation Design', 'Comprehensive Working & MEP Drawings', 'Landscape & Outdoor Integration'],
    active: true
  },
  {
    id: 'project-management',
    number: '09',
    title: 'Project Management',
    desc: 'Rigorous coordination, transparent financial controls, strict quality monitoring, and schedule management across the entire project lifecycle. Our project managers leverage modern software tracking to ensure safety compliance, resource optimization, transparent client reporting, and on-time completion.',
    exploredContent: 'Stay in complete control of your building journey with our professional construction project management. We provide stage-linked Gantt charts, weekly digital milestone updates, vendor quality audits, transparent procurement bills, and zero-compromise site safety management.',
    image: serviceManager,
    features: ['Digital Milestone & Photo Progress Reports', 'Strict Schedule & Gantt Chart Tracking', 'Vendor Quality Auditing & Procurement Logs', 'Site Safety & Zero-Accident Protocols', 'Transparent Financial Stage Gate Verification'],
    active: true
  }
];

export const services: [string, string][] = serviceItems.map((s) => [s.title, s.desc]);
export const visionData = {
  title: 'Our Vision',
  statement:
    'To be a trusted and respected leader in the construction and real estate industry, recognised for creating exceptional residential and commercial spaces that combine innovative design, superior quality, sustainable practices, and enduring value.',
  secondary:
    'We envision building developments that go beyond physical structures—creating distinctive landmarks that enrich communities and stand the test of time.',
  paragraphs: [
    'To be a trusted and respected leader in the construction and real estate industry, recognised for creating exceptional residential and commercial spaces that combine innovative design, superior quality, sustainable practices, and enduring value.',
    'We envision building developments that go beyond physical structures—creating distinctive landmarks that enrich communities and stand the test of time.'
  ]
};

export const missionData = {
  title: 'Our Mission',
  intro: 'At Jentora Builder Pvt Ltd, our mission is to:',
  points: [
    {
      title: 'Superior Quality',
      desc: 'Deliver superior quality in every project through meticulous planning, premium materials, skilled workmanship, and rigorous attention to detail.'
    },
    {
      title: 'Lasting Trust',
      desc: 'Build lasting trust through transparency, ethical practices, clear communication, and responsible project execution.'
    },
    {
      title: 'Thoughtful Design',
      desc: 'Transform aspirations into thoughtfully designed spaces that reflect the unique needs, lifestyles, and expectations of our customers.'
    },
    {
      title: 'Stage-wise Excellence',
      desc: 'Maintain excellence in every stage of construction, from concept and design to execution and final handover.'
    },
    {
      title: 'Innovation & Value',
      desc: 'Embrace innovation and modern construction practices to improve efficiency, functionality, safety, and long-term value.'
    },
    {
      title: 'Sustainability',
      desc: 'Create sustainable and future-ready developments that contribute positively to the environment and the communities we serve.'
    },
    {
      title: 'Enduring Relationships',
      desc: 'Build lasting relationships with customers, partners, employees, and stakeholders through professionalism, integrity, and consistent performance.'
    }
  ]
};

export const missionPoints = missionData.points;

export const companyCommitment = {
  tagline: 'Passion in every idea. Precision in every detail. Perfection in every project.',
  statement: 'At Jentora, our mission is not simply to construct buildings, but to create spaces, relationships, and landmarks built on trust and excellence.'
};

export const philosophies = [['Passion', 'Passion in every idea.'], ['Precision', 'Precision in every detail.'], ['Perfection', 'Perfection in every project.']];
export const missionThemes = ['Quality', 'Trust', 'Design', 'Excellence', 'Innovation', 'Sustainability', 'Relationships'];
export function pageHead(title: string, description: string) { return { meta: [{ title: `${title} — Jentora Builder` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — Jentora Builder` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }; }

/**
 * Dynamically applies and syncs website content updated from the Spring Boot CMS
 */
export function applyDynamicContent(contentMap: Record<string, any>): boolean {
  if (!contentMap || typeof contentMap !== 'object') return false;

  let hasUpdates = false;

  // 1. SERVICES LIST
  if (contentMap.services_list) {
    let raw = contentMap.services_list;
    if (typeof raw === 'string') {
      try { raw = JSON.parse(raw); } catch {}
    }
    if (Array.isArray(raw) && raw.length > 0) {
      serviceItems.length = 0;
      raw.forEach((item, index) => {
        serviceItems.push({
          id: item.id || `service-${index + 1}`,
          number: item.number || (index < 9 ? `0${index + 1}` : `${index + 1}`),
          title: String(item.title || ''),
          desc: String(item.desc || ''),
          exploredContent: item.exploredContent ? String(item.exploredContent) : undefined,
          image: item.image || villas,
          features: Array.isArray(item.features) ? item.features : [],
          active: item.active !== false,
        });
      });

      // Synchronize services array
      services.length = 0;
      serviceItems
        .filter((s) => s.active !== false)
        .forEach((s) => {
          services.push([s.title, s.desc]);
        });
      hasUpdates = true;
    }
  }

  // 2. PROJECTS LIST
  if (contentMap.projects_list) {
    let raw = contentMap.projects_list;
    if (typeof raw === 'string') {
      try { raw = JSON.parse(raw); } catch {}
    }
    if (Array.isArray(raw) && raw.length > 0) {
      projects.length = 0;
      raw.forEach((p, index) => {
        projects.push({
          id: p.id || `project-${index + 1}`,
          number: p.number || (index < 9 ? `0${index + 1}` : `${index + 1}`),
          name: String(p.name || ''),
          location: String(p.location || ''),
          category: String(p.category || 'Apartment'),
          units: p.units,
          floors: p.floors,
          year: p.year ? String(p.year) : undefined,
          status: String(p.status || 'Completed'),
          image: String(p.image || '/site-photos/vadapalani/vadapalani-1.jpg'),
          gallery: Array.isArray(p.gallery) ? p.gallery : [p.image || '/site-photos/vadapalani/vadapalani-1.jpg'],
        });
      });
      hasUpdates = true;
    }
  }

  // 2.5. MEDIA ASSETS
  if (contentMap.media_assets) {
    let raw = contentMap.media_assets;
    if (typeof raw === 'string') {
      try { raw = JSON.parse(raw); } catch {}
    }
    if (Array.isArray(raw) && raw.length > 0) {
      defaultMediaAssets.length = 0;
      raw.forEach((a) => {
        defaultMediaAssets.push({
          id: String(a.id),
          title: String(a.title || ''),
          category: a.category || 'General',
          url: String(a.url || ''),
          size: a.size,
          uploadedAt: a.uploadedAt,
        });
      });
      hasUpdates = true;
    }
  }

  // 3. FOOTER CONFIG
  if (contentMap.footer_config) {
    let raw = contentMap.footer_config;
    if (typeof raw === 'string') {
      try { raw = JSON.parse(raw); } catch {}
    }
    if (raw && typeof raw === 'object') {
      Object.assign(footerConfig, raw);
      hasUpdates = true;
    }
  }

  // 4. SERVICES PAGE CONFIG
  if (contentMap.services_page_config) {
    let raw = contentMap.services_page_config;
    if (typeof raw === 'string') {
      try { raw = JSON.parse(raw); } catch {}
    }
    if (raw && typeof raw === 'object') {
      Object.assign(servicesPageConfig, raw);
      hasUpdates = true;
    }
  }

  // 5. COMPANY PROFILE & INFO
  let profile: any = contentMap.company_profile;
  if (typeof profile === 'string') {
    try { profile = JSON.parse(profile); } catch {}
  }
  let info: any = contentMap.company_info;
  if (typeof info === 'string') {
    try { info = JSON.parse(info); } catch {}
  }

  const p: Record<string, any> = { ...(info || {}), ...(profile || {}) };
  if (Object.keys(p).length > 0) {
    hasUpdates = true;
    if (p.companyName || p.name) {
      company.name = String(p.companyName || p.name);
    }
    if (p.tagline) {
      companyCommitment.tagline = String(p.tagline);
    }
    if (p.yearsExperience || p.experience) {
      const expNum = parseInt(String(p.yearsExperience || p.experience)) || 20;
      company.experience = `${expNum}+`;
      company.experienceFull = `${expNum} Years of Industry experience in Commercial, Residential, Industrial Buildings`;
    }
    if (p.projectsCompleted || p.completedProjects) {
      const projNum = parseInt(String(p.projectsCompleted || p.completedProjects)) || 157;
      company.completedProjects = projNum;
    }
    company.introduction = `${company.name} is a premier construction enterprise built on ${company.experience} of industry experience delivering exceptional residential, commercial, and industrial developments across Chennai and Coimbatore. We believe a home or commercial landmark is someone’s dream, life savings, and trust—and we construct with that uncompromising responsibility. With ${company.completedProjects} completed landmarks and landmark projects under construction, we bring passion, precision, and perfection to every project.`;
    if (p.primaryPhone) {
      const cleanPhone = String(p.primaryPhone);
      company.primaryPhone = cleanPhone;
      company.phones = [cleanPhone];
      company.whatsapp = cleanPhone;
      company.whatsappUrl = `https://wa.me/${cleanPhone.replace(/[^0-9]/g, '')}?text=Hi%20Jentora%20Builder,%20I%20would%20like%20to%20enquire%20about%20your%20construction%20services.`;
    }
    if (p.secondaryPhone !== undefined) {
      company.secondaryPhone = String(p.secondaryPhone);
    }
    if (p.email) {
      company.email = String(p.email);
    }
    if (p.operatingHours) {
      company.operatingHours = String(p.operatingHours);
    }
    if (p.addressFull || p.address) {
      const fullAddr = String(p.addressFull || p.address);
      company.address.full = fullAddr;
      company.address.street = fullAddr;
    }
    if (p.googleMapsUrl) {
      company.googleMapsUrl = String(p.googleMapsUrl);
    }
    if (p.whatsappUrl) {
      company.whatsappUrl = String(p.whatsappUrl);
    }

    if (p.managingDirector && leadership[0]) {
      leadership[0].name = String(p.managingDirector);
    }
    if (p.marketingLead && leadership[1]) {
      leadership[1].name = String(p.marketingLead);
    }

    if (p.visionP1) {
      visionData.statement = String(p.visionP1);
      if (visionData.paragraphs && visionData.paragraphs.length > 0) {
        visionData.paragraphs[0] = String(p.visionP1);
      }
    }
    if (p.visionP2) {
      visionData.secondary = String(p.visionP2);
      if (visionData.paragraphs && visionData.paragraphs.length > 1) {
        visionData.paragraphs[1] = String(p.visionP2);
      }
    }

    if (p.commitmentP1) {
      companyCommitment.tagline = String(p.commitmentP1);
    }
    if (p.commitmentP2) {
      companyCommitment.statement = String(p.commitmentP2);
    }

    if (p.facebook) socialLinks.facebook = String(p.facebook);
    if (p.instagram) socialLinks.instagram = String(p.instagram);
    if (p.linkedin) socialLinks.linkedin = String(p.linkedin);
    if (p.youtube) socialLinks.youtube = String(p.youtube);
  }

  if (hasUpdates) {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('jentora_public_content', JSON.stringify(contentMap));
        window.dispatchEvent(new CustomEvent('jentora-content-updated', { detail: contentMap }));
      }
    } catch {}
  }

  return hasUpdates;
}

// Initial client hydration from storage cache to eliminate layout shifts
try {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('jentora_public_content');
    if (cached) {
      applyDynamicContent(JSON.parse(cached));
    }
  }
} catch {}

