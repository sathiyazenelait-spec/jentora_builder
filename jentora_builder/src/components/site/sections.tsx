import { Link } from '@tanstack/react-router';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Award, 
  Building2, 
  CheckCircle2, 
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

export function Philosophy() {
  return (
    <section className="philosophy">
      <div className="container">
        <SectionLabel>THE JENTORA PHILOSOPHY</SectionLabel>
        <div className="philosophy-list">
          {philosophies.map(([title, text], i) => (
            <Reveal key={title} className={`philosophy-item delay-${(i + 1) * 100}`}>
              <span className="morph inline-block px-2 py-0.5 border border-accent/40">0{i + 1}</span>
              <h3 className="flip-in">{title}.</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <div className="stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '28px', marginTop: '36px', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
      <div className="stat sparkle">
        <strong style={{ fontSize: '52px', fontFamily: 'var(--font-display)', fontWeight: '400', lineHeight: 1 }}>
          17<span style={{ color: 'var(--accent)' }}>+</span>
        </strong>
        <span style={{ fontSize: '9px', letterSpacing: '0.05em', color: 'var(--muted-foreground)', display: 'block', marginTop: '6px' }}>
          YEARS INDUSTRY EXPERIENCE
        </span>
      </div>
      <div className="stat sparkle" style={{ animationDelay: '0.4s' }}>
        <strong style={{ fontSize: '52px', fontFamily: 'var(--font-display)', fontWeight: '400', lineHeight: 1 }}>
          02
        </strong>
        <span style={{ fontSize: '9px', letterSpacing: '0.05em', color: 'var(--muted-foreground)', display: 'block', marginTop: '6px' }}>
          COMPLETED LANDMARKS
        </span>
      </div>
      <div className="stat sparkle" style={{ animationDelay: '0.8s' }}>
        <strong style={{ fontSize: '52px', fontFamily: 'var(--font-display)', fontWeight: '400', lineHeight: 1 }}>
          03
        </strong>
        <span style={{ fontSize: '9px', letterSpacing: '0.05em', color: 'var(--muted-foreground)', display: 'block', marginTop: '6px' }}>
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
            <p className="subtle" style={{ maxWidth: '420px', fontSize: '13px', lineHeight: '1.7' }}>
              Our executive leadership brings over 17 years of hands-on construction acumen, ensuring every development adheres to the highest standards of safety, precision, and client satisfaction.
            </p>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '40px' }}>
          {leadership.map((leader, i) => (
            <Reveal key={leader.name}>
              <div
                style={{
                  background: 'var(--background)',
                  border: '1px solid var(--border)',
                  padding: '36px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', fontWeight: '600' }}>
                    0{i + 1} / {leader.role}
                  </span>
                  <h3 style={{ fontSize: '32px', margin: '14px 0 10px', fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
                    {leader.name}
                  </h3>
                  <div style={{ width: '32px', height: '1px', background: 'var(--accent)', marginBottom: '18px' }} />
                  <p style={{ fontSize: '13px', lineHeight: '1.75', color: 'var(--muted-foreground)' }}>
                    {leader.bio}
                  </p>
                </div>
                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', color: 'var(--foreground)', fontWeight: '600', letterSpacing: '0.05em' }}>
                  <UserCheck size={14} style={{ color: 'var(--accent)' }} /> JENTORA EXECUTIVE LEADERSHIP
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
            <p className="subtle" style={{ maxWidth: '420px', fontSize: '13px', lineHeight: '1.7' }}>
              From initial architectural schematics to transparent milestone-linked payment schedules, we combine personalized client care with rigorous structural engineering.
            </p>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
          {uniqueSellingPoints.map((usp, i) => (
            <Reveal key={usp.title} className={`delay-${(i % 4 + 1) * 100}`}>
              <div
                style={{
                  border: '1px solid var(--border)',
                  padding: '30px',
                  background: 'var(--background)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="hover:border-accent hover:-translate-y-2 hover:shadow-xl light-sweep"
              >
                <span className="morph inline-flex items-center justify-center w-8 h-8 text-xs font-semibold text-accent border border-accent/30 bg-accent/5">
                  {usp.number}
                </span>
                <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', margin: '14px 0 10px', color: 'var(--foreground)' }}>
                  {usp.title}
                </h3>
                <p style={{ fontSize: '12px', lineHeight: '1.7', color: 'var(--muted-foreground)' }}>
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
                <ShieldCheck size={14} className="hover-wobble" /> QUALITY ASSURANCE ({qualityAssurancePractices.length})
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
                <HardHat size={14} className="hover-wobble" /> SAFETY PROTOCOLS ({safetyStandards.length})
              </Button>
            </div>
          </Reveal>
        </div>

        {/* TAB CONTENT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '40px' }}>
          {(tab === 'qa' ? qualityAssurancePractices : safetyStandards).map((item, i) => (
            <Reveal key={item.title} className={`delay-${(i % 4 + 1) * 100}`}>
              <div
                style={{
                  padding: '24px',
                  border: '1px solid var(--light-line)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                className="hover:border-accent hover:-translate-y-1 light-sweep"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="morph inline-block px-2 py-0.5 text-xs text-accent border border-accent/40 font-semibold">0{i + 1}</span>
                    <CheckCircle2 size={16} className="text-accent hover-wobble" />
                  </div>
                  <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--primary-foreground)', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '12px', lineHeight: '1.65', color: 'var(--secondary)' }}>
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
    { icon: <Award size={18} />, title: '17+ Years Pedigree', sub: 'Commercial & Residential Mastery' },
    { icon: <ShieldCheck size={18} />, title: 'ISO 9001:2015 Certified', sub: 'Audited Quality Systems' },
    { icon: <FileCheck size={18} />, title: '100% CMDA & DTCP', sub: 'Full Regulatory Adherence' },
    { icon: <Building2 size={18} />, title: '3 Operating Hubs', sub: 'Chennai · Thiruvallur · Coimbatore' },
    { icon: <Clock size={18} />, title: 'Milestone Delivery', sub: 'Zero Tolerance Delay Track Record' },
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
      rating: 5,
    },
    {
      quote: 'From soil testing to architectural precision and interior handover, Mr. Saravanan and the Jentora engineering team maintained uncompromising safety and structural integrity.',
      author: 'Commercial & Turnkey Investor',
      location: 'Thiruvallur & Coimbatore Hub',
      rating: 5,
    },
    {
      quote: 'The milestone-linked payment structure gave us total peace of mind. Every material batch was certified, and handover was executed flawlessly.',
      author: 'Private Villa Owner',
      location: 'Anna Nagar, Chennai',
      rating: 5,
    },
  ];

  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, #070a12 0%, #0e1626 100%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-heading">
          <Reveal>
            <SectionLabel>CLIENT TESTIMONIALS & TRUST</SectionLabel>
            <h2 style={{ fontSize: '52px' }}>
              Endorsed by clients.<br />
              <em>Defined by excellence.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="subtle" style={{ maxWidth: '420px', fontSize: '13px', lineHeight: '1.7' }}>
              Hear from property owners and investors who have partnered with Jentora for landmark residential, commercial, and turnkey industrial projects.
            </p>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
          {testimonials.map((item, idx) => (
            <Reveal key={item.author} className={`delay-${(idx + 1) * 150}`}>
              <div className="luxury-testimonial-card luxury-framed">
                <div>
                  <div className="star-rating">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <div className="quote-mark-gold">“</div>
                  <p style={{ fontSize: '13px', lineHeight: '1.8', color: '#e2e8f0', fontStyle: 'italic', marginBottom: '24px' }}>
                    {item.quote}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '16px' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--foreground)', fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
                    {item.author}
                  </strong>
                  <span style={{ fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {item.location}
                  </span>
                </div>
              </div>
            </Reveal>
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
  image = images.hero,
}: {
  label: string;
  title: ReactNode;
  text?: string;
  image?: string;
}) {
  return (
    <section className="inner-hero">
      <img className="hero-image" src={image} alt="Contemporary architecture, illustrative concept" />
      <div className="hero-shade" />
      <div className="container inner-hero-content">
        <div className="mb-4">
          <span className="luxury-hero-badge">
            <span className="luxury-hero-badge-dot" />
            {label}
          </span>
        </div>
        <h1>{title}</h1>
        {text && <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.7', maxWidth: '540px' }}>{text}</p>}
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
          <div className="luxury-testimonial-card luxury-framed h-full">
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

