import { Link } from '@tanstack/react-router';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Award, 
  Building2, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight,
  Clock, 
  FileCheck, 
  HardHat, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  UserCheck 
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { 
  images, 
  philosophies, 
  services, 
  leadership, 
  qualityAssurancePractices, 
  safetyStandards, 
  uniqueSellingPoints, 
  company,
  type Project 
} from '@/data/company';
import { Reveal } from './reveal';

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="eyebrow flip-in">{children}</div>;
}

export function ContactLink({ light = false }: { light?: boolean }) {
  return (
    <Button asChild variant={light ? 'line' : 'editorial'} className="light-sweep">
      <Link to="/contact" className="hover-wobble">
        START A CONVERSATION <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </Button>
  );
}

const philosophyDetails = [
  {
    num: '01',
    title: 'Passion',
    tagline: 'Passion in every idea.',
    desc: 'Every landmark begins with an inspired idea. We channel relentless passion into bespoke architectural concepts, structural innovation, and functional aesthetics tailored for modern luxury living.',
    points: ['Bespoke Architectural Concepts', 'Client-Centric Design Innovation', 'Sustainable Material Selection'],
    linkTo: '/about',
    linkText: 'DISCOVER OUR PASSION',
  },
  {
    num: '02',
    title: 'Precision',
    tagline: 'Precision in every detail.',
    desc: 'Civil engineering demands millimeter accuracy. We implement rigorous DTCP/CMDA approvals, multi-tier soil & structural testing, and laser-calibrated execution to guarantee generational stability.',
    points: ['100% CMDA & DTCP Compliance', 'Multi-Tier Structural Audits', 'Calibrated Civil Engineering'],
    linkTo: '/services',
    linkText: 'EXPLORE OUR PRECISION',
  },
  {
    num: '03',
    title: 'Perfection',
    tagline: 'Perfection in every project.',
    desc: 'Uncompromising dedication from ground-breaking through turnkey key handover. We combine transparent stage-linked milestone governance, artisan finishes, and lifetime client trust.',
    points: ['Turnkey Milestone Governance', 'Master Artisan Finishes', 'Generational Structural Warranty'],
    linkTo: '/projects',
    linkText: 'VIEW COMPLETED LANDMARKS',
  },
];

export function Philosophy() {
  return (
    <section className="philosophy">
      <div className="container">
        <SectionLabel>THE JENTORA PHILOSOPHY</SectionLabel>
        <div className="philosophy-list">
          {philosophyDetails.map((item, i) => (
            <Reveal key={item.title} className={`philosophy-card-reveal delay-${(i + 1) * 100}`}>
              <div className="philosophy-item luxury-framed light-sweep">
                <div className="philosophy-card-header">
                  <span className="philosophy-num-badge">
                    {item.num}
                  </span>
                  <span className="philosophy-pillar-label">
                    PILLAR {item.num}
                  </span>
                </div>

                <h3 className="philosophy-title flip-in">
                  {item.title}<em>.</em>
                </h3>

                <p className="philosophy-tagline">
                  {item.tagline}
                </p>

                {/* EXTENDED CONTENT THAT EXPANDS / EXTENDS ON HOVER */}
                <div className="philosophy-extended-content">
                  <p className="philosophy-desc">
                    {item.desc}
                  </p>

                  <div className="philosophy-points">
                    {item.points.map((pt) => (
                      <div key={pt} className="philosophy-point-item">
                        <span className="philosophy-point-bullet">✦</span> {pt}
                      </div>
                    ))}
                  </div>

                  <div className="philosophy-action-wrap">
                    <Link to={item.linkTo} className="philosophy-action-link hover-wobble">
                      {item.linkText} <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <div className="stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '28px', marginTop: '36px', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
      <div className="stat sparkle">
        <strong style={{ fontSize: '52px', fontFamily: 'var(--font-display)', fontWeight: '400', lineHeight: 1 }}>
          17<span style={{ color: 'var(--accent)' }}>+</span>
        </strong>
        <span style={{ fontSize: '13px', letterSpacing: '0.05em', color: 'var(--muted-foreground)', display: 'block', marginTop: '8px' }}>
          YEARS INDUSTRY EXPERIENCE
        </span>
      </div>
      <div className="stat sparkle" style={{ animationDelay: '0.4s' }}>
        <strong style={{ fontSize: '52px', fontFamily: 'var(--font-display)', fontWeight: '400', lineHeight: 1 }}>
          02
        </strong>
        <span style={{ fontSize: '13px', letterSpacing: '0.05em', color: 'var(--muted-foreground)', display: 'block', marginTop: '8px' }}>
          COMPLETED LANDMARKS
        </span>
      </div>
      <div className="stat sparkle" style={{ animationDelay: '0.8s' }}>
        <strong style={{ fontSize: '52px', fontFamily: 'var(--font-display)', fontWeight: '400', lineHeight: 1 }}>
          03
        </strong>
        <span style={{ fontSize: '13px', letterSpacing: '0.05em', color: 'var(--muted-foreground)', display: 'block', marginTop: '8px' }}>
          ACTIVE REGIONS (CHENNAI · THIRUVALLUR · COIMBATORE)
        </span>
      </div>
    </div>
  );
}

export function LeadershipSection() {
  return (
    <section className="section" style={{ background: 'var(--secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-heading">
          <Reveal>
            <SectionLabel>LEADERSHIP & MANAGEMENT</SectionLabel>
            <h2 style={{ fontSize: '52px' }}>
              Guided by experience.<br />
              <em>Driven by integrity.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="subtle" style={{ maxWidth: '440px', fontSize: '16px', lineHeight: '1.75' }}>
              Our executive leadership brings over 17 years of hands-on construction acumen, ensuring every development adheres to the highest standards of safety, precision, and client satisfaction.
            </p>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '40px' }}>
          {leadership.map((leader, i) => (
            <Reveal key={leader.name}>
              <div
                className="leadership-card luxury-framed"
                style={{
                  border: '1px solid var(--border)',
                  padding: '36px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '12px',
                }}
              >
                <div>
                  <span className="leader-role" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', fontWeight: '600' }}>
                    0{i + 1} / {leader.role}
                  </span>
                  <h3 style={{ fontSize: '32px', margin: '14px 0 10px', fontFamily: 'var(--font-display)' }}>
                    {leader.name}
                  </h3>
                  <div className="accent-bar" style={{ width: '32px', height: '1px', background: 'var(--accent)', marginBottom: '18px' }} />
                  <p style={{ fontSize: '16px', lineHeight: '1.75', color: 'var(--muted-foreground)' }}>
                    {leader.bio}
                  </p>
                </div>
                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.05em' }}>
                  <UserCheck size={16} style={{ color: 'var(--accent)' }} /> JENTORA EXECUTIVE LEADERSHIP
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UniqueSellingPointsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <Reveal>
            <SectionLabel>OUR UNIQUE VALUE</SectionLabel>
            <h2 style={{ fontSize: '52px' }}>
              Why discerning clients<br />
              <em>choose Jentora.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="subtle" style={{ maxWidth: '440px', fontSize: '16px', lineHeight: '1.75' }}>
              From initial architectural schematics to transparent milestone-linked payment schedules, we combine personalized client care with rigorous structural engineering.
            </p>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
          {uniqueSellingPoints.map((usp, i) => (
            <Reveal key={usp.title} className={`delay-${(i % 4 + 1) * 100}`}>
              <div
                className="usp-card luxury-framed light-sweep"
                style={{
                  border: '1px solid var(--border)',
                  padding: '30px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span className="morph inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-accent border border-accent/30 bg-accent/5">
                  {usp.number}
                </span>
                <h3 style={{ fontSize: '26px', fontFamily: 'var(--font-display)', margin: '14px 0 10px' }}>
                  {usp.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '1.75', color: 'var(--muted-foreground)' }}>
                  {usp.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QualityAndSafetySection() {
  const [tab, setTab] = useState<'qa' | 'safety'>('qa');

  return (
    <section className="section" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
      <div className="container">
        <div className="section-heading" style={{ color: 'var(--primary-foreground)' }}>
          <Reveal>
            <span className="eyebrow flip-in" style={{ color: 'var(--accent)' }}>STANDARDS & PROTOCOLS</span>
            <h2 style={{ fontSize: '52px', color: 'var(--primary-foreground)', marginTop: '16px' }}>
              Quality assurance &<br />
              <em>rigorous safety standards.</em>
            </h2>
          </Reveal>
          <Reveal>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button
                variant={tab === 'qa' ? 'editorial' : 'line'}
                onClick={() => setTab('qa')}
                className={tab === 'qa' ? 'glow-border' : ''}
                style={{
                  background: tab === 'qa' ? 'var(--accent)' : 'transparent',
                  color: tab === 'qa' ? 'var(--primary)' : 'var(--primary-foreground)',
                  borderColor: tab === 'qa' ? 'var(--accent)' : 'var(--light-line)',
                }}
              >
                <ShieldCheck size={16} className="hover-wobble" /> QUALITY ASSURANCE ({qualityAssurancePractices.length})
              </Button>
              <Button
                variant={tab === 'safety' ? 'editorial' : 'line'}
                onClick={() => setTab('safety')}
                className={tab === 'safety' ? 'glow-border' : ''}
                style={{
                  background: tab === 'safety' ? 'var(--accent)' : 'transparent',
                  color: tab === 'safety' ? 'var(--primary)' : 'var(--primary-foreground)',
                  borderColor: tab === 'safety' ? 'var(--accent)' : 'var(--light-line)',
                }}
              >
                <HardHat size={16} className="hover-wobble" /> SAFETY PROTOCOLS ({safetyStandards.length})
              </Button>
            </div>
          </Reveal>
        </div>

        {/* TAB CONTENT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '40px' }}>
          {(tab === 'qa' ? qualityAssurancePractices : safetyStandards).map((item, i) => (
            <Reveal key={item.title} className={`delay-${(i % 4 + 1) * 100}`}>
              <div
                className="qa-card luxury-framed light-sweep"
                style={{
                  padding: '24px',
                  border: '1px solid var(--light-line)',
                  borderRadius: '12px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="morph inline-block px-2.5 py-0.5 text-xs text-accent border border-accent/40 font-semibold">0{i + 1}</span>
                    <CheckCircle2 size={18} className="text-accent hover-wobble" />
                  </div>
                  <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '15px', lineHeight: '1.75', color: 'var(--muted-foreground)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LuxuryTrustStrip() {
  const badges = [
    { icon: <Award size={20} />, title: '17+ Years Pedigree', sub: 'Commercial & Residential Mastery' },
    { icon: <ShieldCheck size={20} />, title: 'ISO 9001:2015 Certified', sub: 'Audited Quality Systems' },
    { icon: <FileCheck size={20} />, title: '100% CMDA & DTCP', sub: 'Full Regulatory Adherence' },
    { icon: <Building2 size={20} />, title: '3 Operating Hubs', sub: 'Chennai · Thiruvallur · Coimbatore' },
    { icon: <Clock size={20} />, title: 'Milestone Delivery', sub: 'Zero Tolerance Delay Track Record' },
  ];

  return (
    <div className="luxury-trust-strip">
      <div className="container">
        <div className="luxury-trust-grid">
          {badges.map((b, i) => (
            <div key={b.title} className="trust-badge-pill sparkle" style={{ animationDelay: `${i * 0.3}s` }}>
              <div className="trust-badge-icon">{b.icon}</div>
              <div className="trust-badge-text">
                <strong>{b.title}</strong>
                <span>{b.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LuxuryTestimonialsSection() {
  const testimonials = [
    {
      quote: 'Jentora Builder delivered our luxury apartment complex in Vadapalani with exquisite craftsmanship and complete transparency at every milestone stage. Truly world-class builder.',
      author: 'Residential Landmark Client',
      location: 'Vadapalani, Chennai',
      projectType: 'Luxury Residential',
      rating: 5,
    },
    {
      quote: 'From soil testing to architectural precision and interior handover, Mr. Saravanan and the Jentora engineering team maintained uncompromising safety and structural integrity.',
      author: 'Commercial & Turnkey Investor',
      location: 'Thiruvallur & Coimbatore Hub',
      projectType: 'Industrial & Commercial',
      rating: 5,
    },
    {
      quote: 'The milestone-linked payment structure gave us total peace of mind. Every material batch was certified, and handover was executed flawlessly.',
      author: 'Private Villa Owner',
      location: 'Anna Nagar, Chennai',
      projectType: 'Bespoke Luxury Villa',
      rating: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, #070a12 0%, #0e1626 100%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <Reveal>
              <SectionLabel>CLIENT TESTIMONIALS & TRUST</SectionLabel>
              <h2 style={{ fontSize: '52px', margin: '14px 0 0 0' }}>
                Endorsed by clients.<br />
                <em>Defined by excellence.</em>
              </h2>
            </Reveal>
            <Reveal>
              <p className="subtle" style={{ maxWidth: '480px', fontSize: '16px', lineHeight: '1.75', marginTop: '16px' }}>
                Hear from property owners and investors who have partnered with Jentora for landmark residential, commercial, and turnkey industrial projects.
              </p>
            </Reveal>
          </div>

          {/* PREV / NEXT NAVIGATION CONTROLS (< > BUTTONS) */}
          <Reveal>
            <div className="testimonial-nav-controls" aria-label="Testimonial Navigation">
              <button 
                type="button" 
                onClick={handlePrev} 
                className="testimonial-nav-btn light-sweep" 
                aria-label="Previous Testimonial"
                title="Previous Testimonial"
              >
                <ChevronLeft size={22} />
              </button>
              <button 
                type="button" 
                onClick={handleNext} 
                className="testimonial-nav-btn light-sweep" 
                aria-label="Next Testimonial"
                title="Next Testimonial"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
          {testimonials.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <Reveal key={item.author} className={`delay-${(idx + 1) * 150}`}>
                <div 
                  onClick={() => setActiveIndex(idx)}
                  className={`luxury-testimonial-card luxury-framed ${isActive ? 'is-active' : ''}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }
                  }}
                  aria-pressed={isActive}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div className="star-rating" style={{ margin: 0 }}>
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" stroke="none" />
                        ))}
                      </div>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        letterSpacing: '0.08em', 
                        textTransform: 'uppercase',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        background: isActive ? 'rgba(180, 83, 9, 0.12)' : 'rgba(212, 175, 55, 0.12)',
                        border: `1px solid ${isActive ? 'rgba(180, 83, 9, 0.35)' : 'rgba(212, 175, 55, 0.35)'}`,
                        color: isActive ? '#92400e' : 'var(--accent)'
                      }}>
                        {item.projectType}
                      </span>
                    </div>

                    <div className="quote-mark-gold">“</div>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '24px' }}>
                      {item.quote}
                    </p>
                  </div>
                  <div className="testimonial-footer" style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '16px' }}>
                    <strong style={{ display: 'block', fontSize: '16px', fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
                      {item.author}
                    </strong>
                    <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {item.location}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* PAGINATION DOTS */}
        <div className="testimonial-dots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`testimonial-dot ${activeIndex === idx ? 'is-active' : ''}`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function VipConsultationBanner() {
  return (
    <section className="section" style={{ padding: '80px 0' }}>
      <div className="container">
        <Reveal>
          <div className="luxury-vip-card luxury-framed">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div>
                <span className="eyebrow" style={{ color: 'var(--accent)', marginBottom: '12px' }}>
                  ✦ PRIVATE ARCHITECTURAL CONSULTATION
                </span>
                <h2 style={{ fontSize: '46px', lineHeight: '1.1', color: '#ffffff', marginBottom: '16px' }}>
                  Ready to construct your next<br />
                  <em className="gold-shimmer-text">landmark development?</em>
                </h2>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', maxWidth: '520px' }}>
                  Speak directly with our Managing Director & Principal Engineers. We provide complimentary structural feasibility reviews, preliminary architectural estimates, and customized stage-linked payment planning.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                <Button asChild variant="editorial" className="light-sweep" style={{ height: '56px', padding: '0 36px', fontSize: '12px' }}>
                  <Link to="/contact">
                    REQUEST DIRECT PROJECT CONSULTATION <ArrowUpRight />
                  </Link>
                </Button>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '8px' }}>
                  <a href="tel:+919444484625" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--accent)', fontWeight: '600' }} className="hover:underline">
                    <PhoneCall size={15} /> +91 94444 84625
                  </a>
                  <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
                  <a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#25D366', fontWeight: '600' }} className="hover:underline">
                    WhatsApp Direct Line
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProjectItem({ project }: { project: Project }) {
  return (
    <Reveal className="project-item">
      <Link
        className="project-image light-sweep luxury-framed"
        to="/projects/$projectId"
        params={{ projectId: project.id }}
        aria-label={`View ${project.name}, ${project.location}`}
      >
        <img
          src={project.image}
          alt={`Architectural concept for ${project.category.toLowerCase()}`}
          loading="lazy"
          width={1536}
          height={1024}
        />
        <span className="project-status morph">✦ {project.status.toUpperCase()}</span>
      </Link>
      <div className="image-note">ILLUSTRATIVE ARCHITECTURAL CONCEPT · CERTIFIED SPECIFICATIONS</div>
      <div className="project-info">
        <div>
          <div className="project-number">LANDMARK {project.number} / 04</div>
          <Link to="/projects/$projectId" params={{ projectId: project.id }}>
            <h3 className="hover:text-accent font-display">{project.name}</h3>
          </Link>
          <p>{project.location}</p>
        </div>
        <Button variant="minimal" size="icon" asChild className="hover-wobble">
          <Link to="/projects/$projectId" params={{ projectId: project.id }} aria-label={`Open project ${project.number}`}>
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
      <div className="project-meta">
        <span className="glow-border px-2 py-0.5 rounded text-[9px] font-bold text-accent">{project.category.toUpperCase()}</span>
        <span>{project.units} UNITS</span>
        <span>{project.floors} FLOORS</span>
        {project.year && <span>{project.year}</span>}
      </div>
    </Reveal>
  );
}

export function ServiceList({ preview = false }: { preview?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const list = preview ? [services[0], services[1], services[3], services[5], services[7]] : services;
  return (
    <div className="service-list">
      {list.map(
        (service, i) =>
          service && (
            <div key={service[0]} className="luxury-framed mb-3">
              <Button
                variant="minimal"
                className="service-row w-full justify-between"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <span className="number text-accent font-bold">0{i + 1}</span>
                  <h3>{service[0]}</h3>
                </div>
                <ArrowUpRight className="text-accent" />
              </Button>
              {open === i && (
                <div className="service-detail p-6 bg-[#0c1424] border border-accent/20 rounded-b-lg">
                  <p className="text-muted-foreground leading-relaxed">{service[1]}</p>
                  {!preview && (
                    <img
                      className="service-visual rounded-lg mt-4 border border-accent/20"
                      src={i === 5 ? images.interior : i === 0 ? images.villas : images.apartment}
                      alt="Illustrative architectural concept"
                      loading="lazy"
                    />
                  )}
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
}

export function InnerHero({
  label,
  title,
  text,
  counter,
  image = images.hero,
}: {
  label: string;
  title: ReactNode;
  text?: string;
  counter?: string;
  image?: string;
}) {
  return (
    <section
      className="services-hero-section page-hero-section"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="services-hero-overlay page-hero-overlay" />
      <div className="container services-hero-container page-hero-container">
        <div className="services-hero-content">
          <span className="services-hero-subtitle page-hero-subtitle">{label}</span>
          <h1 className="services-hero-title page-hero-title">{title}</h1>
          {text && (
            <p className="services-hero-description page-hero-description">
              {text}
            </p>
          )}
        </div>
        {counter && (
          <div className="services-hero-counter page-hero-counter">
            <span>{counter}</span>
          </div>
        )}
      </div>
    </section>
  );
}

export function Approach() {
  return (
    <div className="approach">
      {[
        ['01', 'A considered beginning', 'Architectural planning, feasibility analysis, DTCP/CMDA approvals, and sustainable master planning.'],
        ['02', 'Precision in the process', 'Civil structural engineering, rigorous lab material testing, multi-tier QA audits, and milestone management.'],
        ['03', 'Perfection in the finish', 'High-end interior turnkey craftsmanship, rigorous final safety inspection, and guaranteed milestone handover.'],
      ].map(([n, t, d]) => (
        <Reveal key={n}>
          <div className="approach-card luxury-framed h-full" style={{ background: 'rgba(14, 22, 38, 0.7)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '16px', padding: '32px' }}>
            <span className="text-accent font-bold text-lg font-display mb-2">{n}</span>
            <h3 className="text-2xl font-display text-foreground mb-3">{t}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">{d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function TextLink({
  to,
  children,
}: {
  to: '/about' | '/projects' | '/services' | '/vision-mission';
  children: ReactNode;
}) {
  return (
    <Button asChild variant="minimal" className="hover:text-accent transition-colors">
      <Link to={to} className="inline-flex items-center gap-2">
        {children}
        <ArrowRight size={14} className="text-accent" />
      </Link>
    </Button>
  );
}

