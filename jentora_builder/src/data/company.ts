import hero from '@/assets/architecture-hero.jpg';
import apartment from '@/assets/apartment.jpg';
import interior from '@/assets/interior.jpg';
import villas from '@/assets/villas.jpg';
import serviceCommercial from '@/assets/service-commercial.jpg';
import serviceIndustrial from '@/assets/service-industrial.jpg';
import serviceCivil from '@/assets/service-civil.jpg';
import serviceBlueprint from '@/assets/service-blueprint.jpg';
import serviceManager from '@/assets/service-manager.jpg';
export const images = { hero, apartment, interior, villas };

export const company = { 
  name: 'Jentora Builder Private Limited', 
  shortName: 'Jentora',
  established: '2025', 
  experience: '17+', 
  experienceFull: '17 Years of Industry experience in Commercial, Residential, Industrial Buildings',
  completedProjects: 2,
  ongoingProjects: 2,
  totalProjects: 4,
  keyAreas: ['Chennai', 'Thiruvallur', 'Coimbatore'],
  address: {
    street: 'Plot No.85, 2nd Floor, 4th Avenue Road, Shanthi Colony, Anna Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600040',
    full: 'Plot No.85, 2nd Floor, 4th Avenue Road, Shanthi Colony, Anna Nagar, Chennai – 600040.'
  },
  phones: ['+91 9444484625', '+91 9444434196'],
  primaryPhone: '+91 9444484625',
  secondaryPhone: '+91 9444434196',
  email: 'info@jentora.co.in',
  whatsapp: '+91 9444484625',
  whatsappUrl: 'https://wa.me/919444484625?text=Hi%20Jentora%20Builder,%20I%20would%20like%20to%20enquire%20about%20your%20construction%20services.',
  googleMapsUrl: 'https://maps.app.goo.gl/jhPACJxwpdF3Prdp6',
  operatingHours: 'Monday to Saturday – 10.00 am to 6.00 pm',
  introduction: 'Jentora Builder Pvt Ltd is a premier construction enterprise built on 17 years of industry experience delivering exceptional residential, commercial, and industrial developments across Chennai, Thiruvallur, and Coimbatore. We believe a home or commercial landmark is someone’s dream, life savings, and trust—and we construct with that uncompromising responsibility. With 2 completed landmarks and landmark projects under construction, we bring passion, precision, and perfection to every project.'
};

export const leadership = [
  {
    name: 'Mr. SARAVANAN V',
    role: 'Managing Director',
    designation: 'Managing Director',
    bio: 'Leading Jentora Builder with 17+ years of deep industry expertise across commercial, residential, and industrial construction. Mr. Saravanan drives the organization with a focus on engineering precision, structural integrity, and enduring client trust.'
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
  { title: 'Compliance & Regulatory Adherence', desc: 'Strict compliance with CMDA, DTCP, municipal planning permissions, and national building codes.' }
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
  {label:'HOME',to:'/'},
  {label:'ABOUT',to:'/about'},
  {label:'MISSION & VISION',to:'/vision-mission'},
  {label:'SERVICES',to:'/services'},
  {label:'PROJECTS',to:'/projects'},
  {label:'CONTACT',to:'/contact'}
] as const;
export const projects = [
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
    image: '/site-photos/thiruvallur/thiruvallur-1.jpg',
    rotate: 90,
    gallery: [
      '/site-photos/thiruvallur/thiruvallur-1.jpg',
      '/site-photos/thiruvallur/thiruvallur-2.jpg',
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
export type Project = typeof projects[number];
export const services = [
 ['Residential Construction','From custom luxury villas to modern apartment complexes, we craft exceptional living environments tailored to your lifestyle. Combining architectural elegance with structural integrity, we manage every phase—from ground preparation to final luxury finishes—ensuring your home stands as a lasting legacy of quality and comfort.'],
 ['Commercial Construction','Construction for commercial spaces, guided by quality and trust.'],
 ['Industrial Construction','Industrial construction with a focus on precision and execution.'],
 ['Turnkey Projects','A complete approach to bringing your construction project together.'],
 ['Building Renovation','A considered approach to transforming existing buildings.'],
 ['Interior Design and Fit-Out','Interior spaces shaped through design and craftsmanship.'],
 ['Civil Engineering','Engineering expertise at the foundation of every structure.'],
 ['Architectural Planning','Thoughtful planning that brings purpose and precision together.'],
 ['Project Management','Coordinating the details that bring a project to life.']
];
export const serviceItems = [
  {
    number: '01',
    title: 'Residential Construction',
    desc: 'From custom luxury villas to modern apartment complexes, we craft exceptional living environments tailored to your lifestyle. Combining architectural elegance with structural integrity, we manage every phase—from ground preparation to final luxury finishes—ensuring your home stands as a lasting legacy of quality and comfort.',
    image: villas
  },
  {
    number: '02',
    title: 'Commercial Construction',
    desc: 'We design and construct iconic commercial buildings, corporate headquarters, and vibrant retail spaces engineered for growth and efficiency. Our commercial projects focus on optimized spatial planning, modern facade architecture, sustainable energy integration, and timely delivery to empower your business operations.',
    image: serviceCommercial
  },
  {
    number: '03',
    title: 'Industrial Construction',
    desc: 'Engineering robust, scalable, and high-performance industrial facilities, warehouses, and logistics centers built for demanding operational needs. Utilizing heavy-duty materials, advanced structural systems, and strict safety compliance, we deliver industrial structures engineered for maximum productivity and long-term durability.',
    image: serviceIndustrial
  },
  {
    number: '04',
    title: 'Turnkey Projects',
    desc: 'Comprehensive end-to-end project execution that takes your vision from initial concept to key handover without stress. We assume total single-point responsibility covering site acquisition, architectural design, structural engineering, procurement, construction management, and quality assurance.',
    image: apartment
  },
  {
    number: '05',
    title: 'Building Renovation',
    desc: 'Breathe new life and value into existing structures through comprehensive modern upgrades, structural retrofitting, and spatial redesigns. Whether restoring heritage properties or modernizing outdated commercial spaces, we preserve original structural character while integrating contemporary functionality.',
    image: interior
  },
  {
    number: '06',
    title: 'Interior Design and Fit-Out',
    desc: 'Creating refined, bespoke interior environments that reflect your identity and purpose. Our interior team combines ergonomic planning, custom woodwork, lighting design, premium material selection, and detailed craftsmanship to deliver turnkey interiors for luxury homes and corporate spaces.',
    image: interior
  },
  {
    number: '07',
    title: 'Civil Engineering',
    desc: 'Delivering resilient foundational engineering and vital infrastructure solutions that underpin modern developments. From site grading, earthworks, and reinforced concrete structures to drainage systems and utility connections, our engineering guarantees safety, durability, and compliance.',
    image: serviceCivil
  },
  {
    number: '08',
    title: 'Architectural Planning',
    desc: 'Thoughtful architectural design that balances aesthetic beauty, spatial utility, microclimate orientation, and environmental sustainability. Our architects create master plans, 3D visualizations, and detailed working drawings optimized for local zoning approvals and efficient construction.',
    image: serviceBlueprint
  },
  {
    number: '09',
    title: 'Project Management',
    desc: 'Rigorous coordination, transparent financial controls, strict quality monitoring, and schedule management across the entire project lifecycle. Our project managers leverage modern software tracking to ensure safety compliance, resource optimization, transparent client reporting, and on-time completion.',
    image: serviceManager
  }
];
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

export const philosophies = [['Passion','Passion in every idea.'],['Precision','Precision in every detail.'],['Perfection','Perfection in every project.']];
export const missionThemes = ['Quality','Trust','Design','Excellence','Innovation','Sustainability','Relationships'];
export function pageHead(title:string,description:string) { return {meta:[{title:`${title} — Jentora Builder`},{name:'description',content:description},{property:'og:title',content:`${title} — Jentora Builder`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}; }
