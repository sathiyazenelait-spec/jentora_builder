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
  MessageCircle,
  PhoneCall, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  UserCheck 
} from 'lucide-react';
import { useState, useEffect, type ReactNode } from 'react';
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
import { Pointer3DCard } from './pointer-3d-card';
import { openStartConversation } from './start-conversation-modal';

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="eyebrow flip-in">{children}</div>;
}

export function ContactLink({ light = false }: { light?: boolean }) {
  return (
    <Button 
      type="button" 
      variant={light ? 'line' : 'editorial'} 
      className="light-sweep cursor-pointer"
      onClick={() => openStartConversation()}
    >
      <span className="hover-wobble flex items-center gap-1.5">
        START A CONVERSATION <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </span>
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
    desc: 'Civil engineering demands millimeter accuracy. We implement rigorous statutory compliance, multi-tier soil & structural testing, and laser-calibrated execution to guarantee generational stability.',
    points: ['100% Regulatory Compliance', 'Multi-Tier Structural Audits', 'Calibrated Civil Engineering'],
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
        <div className="philosophy-list" style={{ perspective: '1200px' }}>
          {philosophyDetails.map((item, i) => (
            <Reveal key={item.title} className={`philosophy-card-reveal delay-${(i + 1) * 100}`}>
              <Pointer3DCard
                className="philosophy-item luxury-framed light-sweep philosophy-card-3d"
                maxTilt={12}
                maxMove={10}
              >
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
              </Pointer3DCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <div className="stats-3d-grid">
      <Pointer3DCard
        className="stat-card-3d luxury-framed"
        maxTilt={14}
        maxMove={12}
      >
        <div className="stat-card-content">
          <strong className="stat-card-number">
            20<span className="stat-card-plus">+</span>
          </strong>
          <span className="stat-card-label">
            YEARS INDUSTRY EXPERIENCE
          </span>
        </div>
      </Pointer3DCard>

      <Pointer3DCard
        className="stat-card-3d luxury-framed"
        maxTilt={14}
        maxMove={12}
      >
        <div className="stat-card-content">
          <strong className="stat-card-number">
            157
          </strong>
          <span className="stat-card-label">
            COMPLETED LANDMARKS
          </span>
        </div>
      </Pointer3DCard>

      <Pointer3DCard
        className="stat-card-3d luxury-framed"
        maxTilt={14}
        maxMove={12}
      >
        <div className="stat-card-content">
          <strong className="stat-card-number">
            02
          </strong>
          <span className="stat-card-label">
            ACTIVE REGIONS (CHENNAI · COIMBATORE)
          </span>
        </div>
      </Pointer3DCard>
    </div>
  );
}

export function LeadershipSection() {
  return (
    <section className="section leadership-section">
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
              Our executive leadership brings over 20 years of hands-on construction acumen, ensuring every development adheres to the highest standards of safety, precision, and client satisfaction.
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
    <section className="section unique-value-section">
      <div className="container">
        <div className="section-heading">
          <Reveal>
            <SectionLabel>OUR UNIQUE VALUE</SectionLabel>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', lineHeight: '1.1' }}>
              Why discerning clients<br />
              <em>choose Jentora.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="subtle" style={{ maxWidth: '480px', fontSize: '15px', lineHeight: '1.75' }}>
              From initial architectural schematics to transparent milestone-linked payment schedules, we merge personalized luxury craftsmanship with rigorous civil structural engineering across Chennai & Coimbatore.
            </p>
          </Reveal>
        </div>

        {/* MERGED IMAGE-GRID BENTO SHOWCASE */}
        <div className="unique-value-merged-grid" style={{ marginTop: '45px' }}>
          {/* CARD 01 - HERO SHOWCASE (VILLAS / CLIENT-CENTRIC) */}
          <div className="usp-bento-hero">
            <Reveal style={{ width: '100%', height: '100%' }}>
              <div
                className="usp-merged-card luxury-framed light-sweep group"
                style={{
                  minHeight: '480px',
                }}
              >
                {/* FULL BLEED BACKGROUND IMAGE */}
                <img
                  src={images.villas}
                  alt="Client-Centric Architectural Living"
                  className="usp-merged-bg-img"
                />
                <div className="usp-merged-overlay" />

                <div className="usp-merged-content">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <span className="morph inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-accent border border-accent/40 bg-black/60 backdrop-blur-md rounded-full">
                      <Sparkles size={13} /> 01 / CLIENT-CENTRIC LUXURY
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold text-white/90 bg-accent/20 border border-accent/30 rounded-full backdrop-blur-md">
                      20+ Years Trust
                    </span>
                  </div>

                  <h3 style={{ fontSize: 'clamp(26px, 3.2vw, 36px)', fontFamily: 'var(--font-sans)', fontWeight: 700, margin: '0 0 12px', color: '#ffffff', lineHeight: '1.15' }}>
                    Client-Centric Approach
                  </h3>
                  <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#e2e8f0', maxWidth: '620px', marginBottom: '20px' }}>
                    Your aspirations are our guiding blueprint. We prioritize transparent consultation, flexible modifications, and dedicated project managers throughout your entire building journey.
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '22px' }}>
                    {['Dedicated Project Director', 'Tailored Architectural Blueprints', 'Daily Milestone Photo Logs'].map((tag) => (
                      <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#ffffff', background: 'rgba(0, 0, 0, 0.65)', border: '1px solid rgba(212, 175, 55, 0.4)', padding: '6px 12px', borderRadius: '8px', backdropFilter: 'blur(8px)' }}>
                        <CheckCircle2 size={13} style={{ color: 'var(--accent)' }} /> {tag}
                      </span>
                    ))}
                  </div>

                  <div>
                    <Button
                      type="button"
                      variant="editorial"
                      className="light-sweep cursor-pointer"
                      onClick={() => openStartConversation('Luxury Villa')}
                      style={{ fontSize: '12px', padding: '0 24px', height: '46px' }}
                    >
                      START A CONVERSATION <ArrowUpRight size={15} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* CARD 02 - STRATEGIC POSITIONING (COMMERCIAL LANDMARK) */}
          <div className="usp-bento-side">
            <Reveal style={{ width: '100%', height: '100%' }}>
              <div
                className="usp-merged-card luxury-framed light-sweep group"
                style={{
                  minHeight: '480px',
                }}
              >
                <img
                  src={images.serviceCommercial}
                  alt="Strategic Market Commercial Landmark"
                  className="usp-merged-bg-img"
                />
                <div className="usp-merged-overlay" />

                <div className="usp-merged-content">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span className="morph inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-accent border border-accent/40 bg-black/60 backdrop-blur-md rounded-full">
                      <Building2 size={13} /> 02 / CAPITAL APPRECIATION
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/30 rounded-full bg-black/60">
                      Grade-A
                    </span>
                  </div>

                  <h3 style={{ fontSize: 'clamp(24px, 2.6vw, 30px)', fontFamily: 'var(--font-sans)', fontWeight: 700, margin: '0 0 10px', color: '#ffffff', lineHeight: '1.2' }}>
                    Strategic Market Positioning
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#e2e8f0', marginBottom: '20px' }}>
                    Uncompromising standard of premium quality, transparent pricing, and unmatched engineering precision that deliver enduring capital appreciation.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#ffffff', fontWeight: 500 }}>
                      <ShieldCheck size={16} style={{ color: 'var(--accent)' }} /> 100% Structural Quality Assurance
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#ffffff', fontWeight: 500 }}>
                      <Award size={16} style={{ color: 'var(--accent)' }} /> ISO-Standard Construction Practices
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* CARD 03 - INNOVATION & ADAPTABILITY (BLUEPRINT / ENGINEERING) */}
          <div className="usp-bento-third">
            <Reveal style={{ width: '100%', height: '100%' }}>
              <div
                className="usp-merged-card luxury-framed light-sweep group"
                style={{
                  minHeight: '450px',
                }}
              >
                <img
                  src={images.serviceBlueprint}
                  alt="Architectural Innovation and Blueprint Engineering"
                  className="usp-merged-bg-img"
                />
                <div className="usp-merged-overlay" />

                <div className="usp-merged-content">
                  <span className="morph inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-accent border border-accent/40 bg-black/60 backdrop-blur-md rounded-full mb-3">
                    <Sparkles size={13} /> 03 / FUTURE-READY TECH
                  </span>
                  <h3 style={{ fontSize: '23px', fontFamily: 'var(--font-sans)', fontWeight: 700, margin: '0 0 10px', color: '#ffffff' }}>
                    Innovation & Adaptability
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.65', color: '#e2e8f0', marginBottom: '16px' }}>
                    Modern construction practices, green building techniques, energy-efficient designs, and future-ready architectural methodologies.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(212, 175, 55, 0.4)', padding: '5px 10px', borderRadius: '6px', color: '#ffffff', fontWeight: 500 }}>
                      3D BIM Planning
                    </span>
                    <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(212, 175, 55, 0.4)', padding: '5px 10px', borderRadius: '6px', color: '#ffffff', fontWeight: 500 }}>
                      Green Building Standards
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* CARD 04 - COMMUNITY INTEGRATION (APARTMENT RESIDENTIAL) */}
          <div className="usp-bento-third">
            <Reveal style={{ width: '100%', height: '100%' }}>
              <div
                className="usp-merged-card luxury-framed light-sweep group"
                style={{
                  minHeight: '450px',
                }}
              >
                <img
                  src={images.apartment}
                  alt="Community Integration and Iconic Landmarks"
                  className="usp-merged-bg-img"
                />
                <div className="usp-merged-overlay" />

                <div className="usp-merged-content">
                  <span className="morph inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-accent border border-accent/40 bg-black/60 backdrop-blur-md rounded-full mb-3">
                    <Building2 size={13} /> 04 / CIVIC HARMONY
                  </span>
                  <h3 style={{ fontSize: '23px', fontFamily: 'var(--font-sans)', fontWeight: 700, margin: '0 0 10px', color: '#ffffff' }}>
                    Community Integration
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.65', color: '#e2e8f0', marginBottom: '16px' }}>
                    Creating iconic developments that harmonize with their environment, enrich neighborhood value, and foster vibrant, connected communities.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(212, 175, 55, 0.4)', padding: '5px 10px', borderRadius: '6px', color: '#ffffff', fontWeight: 500 }}>
                      Neighborhood Landmarks
                    </span>
                    <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(212, 175, 55, 0.4)', padding: '5px 10px', borderRadius: '6px', color: '#ffffff', fontWeight: 500 }}>
                      Environmental Synergy
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* CARD 05 - FLEXIBLE PAYMENT PLANS (INTERIOR & TRANSPARENCY) */}
          <div className="usp-bento-third">
            <Reveal style={{ width: '100%', height: '100%' }}>
              <div
                className="usp-merged-card luxury-framed light-sweep group"
                style={{
                  minHeight: '450px',
                }}
              >
                <img
                  src={images.interior}
                  alt="Flexible Milestone Payment Plans"
                  className="usp-merged-bg-img"
                />
                <div className="usp-merged-overlay" />

                <div className="usp-merged-content">
                  <span className="morph inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-accent border border-accent/40 bg-black/60 backdrop-blur-md rounded-full mb-3">
                    <FileCheck size={13} /> 05 / FINANCIAL PEACE
                  </span>
                  <h3 style={{ fontSize: '23px', fontFamily: 'var(--font-sans)', fontWeight: 700, margin: '0 0 10px', color: '#ffffff' }}>
                    Flexible Payment Plans
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.65', color: '#e2e8f0', marginBottom: '16px' }}>
                    Transparent, stage-linked construction payment schedules tailored to help you plan finances smoothly without hidden costs.
                  </p>

                  {/* VISUAL STAGE MILESTONE BAR */}
                  <div style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(212, 175, 55, 0.45)', borderRadius: '10px', padding: '10px 14px', backdropFilter: 'blur(10px)' }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', fontWeight: 700, marginBottom: '6px' }}>
                      Stage-Linked Transparency
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#f1f5f9', fontWeight: 600 }}>
                      <span>Plinth</span>
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      <span>Structure</span>
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      <span>Brickwork</span>
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      <span>Finish</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function QualitySafetyCard({ item, index }: { item: { title: string; desc: string }; index: number }) {
  return (
    <Pointer3DCard
      className="qa-card luxury-framed light-sweep"
      maxTilt={14}
      maxMove={14}
      style={{
        padding: '30px 24px',
        borderRadius: '16px',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', transform: 'translateZ(24px)' }}>
          <span className="morph inline-block px-2.5 py-0.5 text-xs text-accent border border-accent/40 font-semibold rounded-full">
            0{index + 1}
          </span>
          <CheckCircle2 size={20} className="text-accent hover-wobble" />
        </div>
        <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-display)', marginBottom: '12px', textAlign: 'center', transform: 'translateZ(30px)' }}>
          {item.title}
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.75', color: 'var(--muted-foreground)', textAlign: 'center', transform: 'translateZ(18px)' }}>
          {item.desc}
        </p>
      </div>
    </Pointer3DCard>
  );
}

export function QualityAndSafetySection() {
  const [tab, setTab] = useState<'qa' | 'safety'>('qa');

  return (
    <section className="section quality-safety-section">
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

        {/* TAB CONTENT WITH VERY SMOOTH FADE FLOATING TO CENTER TRANSITION */}
        <div
          key={tab}
          className="fade-float-center"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginTop: '40px',
            perspective: '1200px'
          }}
        >
          {(tab === 'qa' ? qualityAssurancePractices : safetyStandards).map((item, i) => (
            <div
              key={`${tab}-${item.title}`}
              className="fade-float-center"
              style={{
                height: '100%',
                animationDelay: `${(i % 4) * 0.09}s`,
                animationFillMode: 'both'
              }}
            >
              <QualitySafetyCard item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LuxuryTrustStrip() {
  const badges = [
    { icon: <Award size={20} />, title: '20+ Years Pedigree', sub: 'Commercial & Residential Mastery' },
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
      id: 'vadapalani-residential',
      quote: 'Jentora Builder delivered our luxury apartment complex in Vadapalani with exquisite craftsmanship and complete transparency at every milestone stage. Truly world-class builder.',
      author: 'Residential Landmark Client',
      role: 'Project Patron',
      location: 'Vadapalani, Chennai',
      projectType: 'Luxury Residential',
      rating: 5,
      monogram: 'RL',
      year: '2025 Handover',
      stats: '18 Months Completion • Zero Defect',
    },
    {
      id: 'coimbatore-commercial',
      quote: 'From soil testing to architectural precision and interior handover, Mr. Saravanan and the Jentora engineering team maintained uncompromising safety and structural integrity.',
      author: 'Commercial & Turnkey Investor',
      role: 'Institutional Investor',
      location: 'Coimbatore Hub',
      projectType: 'Industrial & Commercial',
      rating: 5,
      monogram: 'CI',
      year: '2024 Handover',
      stats: '45,000 Sq.Ft • Multi-Span Precast',
    },
    {
      id: 'annanagar-villa',
      quote: 'The milestone-linked payment structure gave us total peace of mind. Every material batch was certified, and handover was executed flawlessly.',
      author: 'Private Villa Owner',
      role: 'Estate Owner',
      location: 'Anna Nagar, Chennai',
      projectType: 'Bespoke Luxury Villa',
      rating: 5,
      monogram: 'PV',
      year: '2025 Handover',
      stats: 'Custom Italian Marble • LEED Rated',
    },
    {
      id: 'ecr-coastal-residence',
      quote: 'Constructing our sea-facing villa required specialized saline-resistant civil engineering. Jentora’s deep foundation work, lab-verified steel, and finish craftsmanship surpassed all expectations.',
      author: 'Dr. Arvind Sridhar & Family',
      role: 'Private Coastal Client',
      location: 'ECR, Chennai',
      projectType: 'Coastal Luxury Villa',
      rating: 5,
      monogram: 'AS',
      year: '2025 Handover',
      stats: '7,400 Sq.Ft • Saline-Resistant RCC',
    },
    {
      id: 'saravanampatti-commercial',
      quote: 'Jentora managed the turnkey structural expansion of our commercial corporate facility in Coimbatore. Strict adherence to statutory norms, zero-incident safety, and precision delivery from day one.',
      author: 'Karthik Ranganathan',
      role: 'Infrastructure Director',
      location: 'Saravanampatti, Coimbatore',
      projectType: 'Commercial Turnkey',
      rating: 5,
      monogram: 'KR',
      year: '2024 Handover',
      stats: '34,000 Sq.Ft • Structural Steel & Glass',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance every 6.5 seconds unless paused by mouse hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      className="section testimonials-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <SectionLabel>CLIENT TESTIMONIALS & TRUST</SectionLabel>
                <span className="testimonial-verified-pill">
                  <span className="testimonial-beacon-dot" />
                  AUTHENTICATED MILESTONES
                </span>
              </div>
              <h2 style={{ fontSize: '52px', margin: '14px 0 0 0' }}>
                Endorsed by clients.<br />
                <em>Defined by excellence.</em>
              </h2>
            </Reveal>
            <Reveal>
              <p className="subtle" style={{ maxWidth: '540px', fontSize: '16px', lineHeight: '1.75', marginTop: '16px' }}>
                Hear from property owners and investors who have partnered with Jentora for landmark residential, commercial, and turnkey industrial projects.
              </p>
            </Reveal>
          </div>

          {/* QUICK CATEGORY SWITCHER PILLS */}
          <Reveal>
            <div className="testimonial-category-pills" role="tablist" aria-label="Testimonial Categories">
              {testimonials.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`testimonial-cat-btn ${activeIndex === idx ? 'is-active' : ''}`}
                >
                  <span className="cat-num">0{idx + 1}</span>
                  <span className="cat-name">{t.projectType}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* UNIQUE 3D TESTIMONIAL CARDS STAGE WITH > BUTTON */}
        <div className="luxury-testimonial-stage" style={{ marginTop: '40px', position: 'relative' }}>
          
          {/* FLOATING PREV / NEXT BUTTONS AT STAGE SIDES */}
          <button
            type="button"
            onClick={handlePrev}
            className="testimonial-stage-nav-btn prev-btn light-sweep"
            aria-label="Previous Testimonial Card"
            title="Previous Testimonial Card"
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 30,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid rgba(212, 175, 55, 0.7)',
              color: '#090d16',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="testimonial-stage-nav-btn next-btn light-sweep"
            aria-label="Next Testimonial Card"
            title="Next Testimonial Card"
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 30,
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4af37 0%, #e5c07b 50%, #b8860b 100%)',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              color: '#090d16',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(212, 175, 55, 0.5)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* ACTIVE TESTIMONIAL CARD DISPLAY WITH > BUTTON */}
          <div key={activeIndex} className="fade-float-center" style={{ maxWidth: '880px', margin: '0 auto' }}>
            {(() => {
              const item = testimonials[activeIndex];
              if (!item) return null;
              return (
                <Pointer3DCard 
                  className="luxury-testimonial-card is-active luxury-framed light-sweep"
                  maxTilt={8}
                  maxMove={10}
                  style={{
                    padding: '44px 38px',
                    borderRadius: '20px',
                    position: 'relative',
                    minHeight: '360px',
                  }}
                >
                  <div>
                    {/* Top Row: Stars + Project Type + NEXT CARD > BUTTON */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '22px', transform: 'translateZ(20px)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div className="star-rating" style={{ margin: 0 }}>
                          {[...Array(item.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={18} 
                              fill="currentColor" 
                              stroke="none" 
                              className="star-shimmer"
                              style={{ animationDelay: `${i * 0.12}s`, color: '#d4af37' }}
                            />
                          ))}
                        </div>
                        <span className="testimonial-type-badge">
                          {item.projectType}
                        </span>
                      </div>

                      {/* EXPLICIT NEXT CARD > BUTTON */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="card-next-pill-btn light-sweep"
                        aria-label="Next Testimonial Card"
                        title="Click to view next testimonial card"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 18px',
                          borderRadius: '50px',
                          background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
                          color: '#090d16',
                          fontWeight: '700',
                          fontSize: '12px',
                          letterSpacing: '0.08em',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 4px 15px rgba(212, 175, 55, 0.45)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <span>NEXT CARD</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Watermark Quote Character */}
                    <div className="quote-mark-watermark" aria-hidden="true" style={{ top: '30px', right: '40px' }}>“</div>

                    {/* Quote Text */}
                    <p className="testimonial-quote-body" style={{ fontSize: '20px', lineHeight: '1.75', fontStyle: 'italic', transform: 'translateZ(22px)', marginBottom: '32px' }}>
                      “{item.quote}”
                    </p>
                  </div>

                  {/* Footer Row: Monogram Avatar + Author Info + Stats */}
                  <div className="testimonial-footer-modern" style={{ transform: 'translateZ(24px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid rgba(212, 175, 55, 0.3)', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div className="client-avatar-monogram" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4af37 0%, #996515 100%)', color: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '16px' }}>
                        <span>{item.monogram}</span>
                      </div>
                      <div>
                        <strong className="client-author-name" style={{ fontSize: '18px', display: 'block', color: 'var(--foreground)' }}>
                          {item.author}
                        </strong>
                        <span className="client-role-location" style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>
                          {item.location} • {item.year}
                        </span>
                      </div>
                    </div>
                    <div className="client-stats-chip" style={{ padding: '6px 14px', borderRadius: '50px', background: 'rgba(212, 175, 55, 0.15)', border: '1px solid rgba(212, 175, 55, 0.4)', fontSize: '13px', color: '#92400e', fontWeight: '600' }}>
                      {item.stats}
                    </div>
                  </div>
                </Pointer3DCard>
              );
            })()}
          </div>
        </div>

        {/* CONTROLS BAR: ARROW LEFT + DOT INDICATORS + COUNTER + ARROW RIGHT */}
        <Reveal>
          <div className="testimonial-controls-bar" aria-label="Testimonials Navigation">
            <button 
              type="button" 
              onClick={handlePrev} 
              className="testimonial-nav-btn light-sweep" 
              aria-label="Previous Testimonial"
              title="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="testimonial-dots-track">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`testimonial-dot ${activeIndex === idx ? 'is-active' : ''}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                >
                  <span className="dot-inner" />
                </button>
              ))}
            </div>

            <button 
              type="button" 
              onClick={handleNext} 
              className="testimonial-nav-btn light-sweep" 
              aria-label="Next Testimonial"
              title="Next Testimonial"
            >
              <ChevronRight size={20} />
            </button>

            <span className="testimonial-counter-pill">
              0{activeIndex + 1} / 0{testimonials.length}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function VipConsultationBanner() {
  return (
    <section className="section" style={{ padding: '80px 0' }}>
      <div className="container">
        <Reveal>
          <Pointer3DCard className="luxury-vip-card luxury-framed light-sweep" maxTilt={10} maxMove={12}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div>
                <span className="eyebrow" style={{ color: 'var(--accent)', marginBottom: '12px', display: 'inline-block', transform: 'translateZ(22px)' }}>
                  ✦ PRIVATE ARCHITECTURAL CONSULTATION
                </span>
                <h2 style={{ fontSize: '46px', lineHeight: '1.1', color: '#ffffff', marginBottom: '16px', transform: 'translateZ(30px)' }}>
                  Ready to construct your next<br />
                  <em className="gold-shimmer-text">landmark development?</em>
                </h2>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', maxWidth: '520px', transform: 'translateZ(18px)' }}>
                  Speak directly with our Managing Director & Principal Engineers. We provide complimentary structural feasibility reviews, preliminary architectural estimates, and customized stage-linked payment planning.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', transform: 'translateZ(26px)' }}>
                <Button 
                  type="button" 
                  variant="editorial" 
                  className="light-sweep cursor-pointer" 
                  style={{ height: '56px', padding: '0 36px', fontSize: '13px', width: '100%', maxWidth: '420px', justifyContent: 'center' }}
                  onClick={() => openStartConversation()}
                >
                  START A CONVERSATION <ArrowUpRight className="ml-1.5" />
                </Button>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', width: '100%', flexWrap: 'wrap' }}>
                  <a 
                    href="tel:+919444434196" 
                    className="vip-consultation-phone hover:underline"
                  >
                    <PhoneCall size={18} /> +91 94444 34196
                  </a>
                  <span className="vip-consultation-divider">|</span>
                  <a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', fontSize: '15px', color: '#25D366', fontWeight: '700' }} className="hover:underline">
                    <MessageCircle size={18} /> WhatsApp Direct Line
                  </a>
                </div>
              </div>
            </div>
          </Pointer3DCard>
        </Reveal>
      </div>
    </section>
  );
}

export function ProjectItem({ project }: { project: Project }) {
  const isRotated = 'rotate' in project && project.rotate === 90;
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
          className={isRotated ? 'rotated-project-img' : ''}
          width={1536}
          height={1024}
        />
        <span className="project-status morph">✦ {project.status.toUpperCase()}</span>
      </Link>
      <div className="image-note">ILLUSTRATIVE ARCHITECTURAL CONCEPT · CERTIFIED SPECIFICATIONS</div>
      <div className="project-info">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="project-number">LANDMARK {project.number} / 04</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
            <Link to="/projects/$projectId" params={{ projectId: project.id }}>
              <h3 className="hover:text-accent font-display" style={{ margin: 0, whiteSpace: 'nowrap' }}>{project.name}</h3>
            </Link>
            <span style={{ color: 'var(--muted-foreground)', fontSize: '15px', whiteSpace: 'nowrap' }}>
              · {project.location}
            </span>
          </div>
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
                <div className="service-detail p-6 bg-secondary border border-accent/20 rounded-b-lg">
                  <p className="text-muted-foreground leading-relaxed text-justify" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{service[1]}</p>
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
    <div className="approach" style={{ perspective: '1200px' }}>
      {[
        ['01', 'A considered beginning', 'Architectural planning, feasibility analysis, regulatory approvals, and sustainable master planning.'],
        ['02', 'Precision in the process', 'Civil structural engineering, rigorous lab material testing, multi-tier QA audits, and milestone management.'],
        ['03', 'Perfection in the finish', 'High-end interior turnkey craftsmanship, rigorous final safety inspection, and guaranteed milestone handover.'],
      ].map(([n, t, d], i) => (
        <Reveal key={n} className={`delay-${(i + 1) * 100}`} style={{ height: '100%' }}>
          <Pointer3DCard
            className="approach-card luxury-framed light-sweep h-full"
            maxTilt={14}
            maxMove={14}
            style={{
              padding: '34px 28px',
              borderRadius: '16px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', transform: 'translateZ(24px)' }}>
                <span className="approach-number morph inline-block px-3 py-1 text-xs text-accent border border-accent/40 font-bold rounded-full">
                  {n}
                </span>
                <span style={{ fontSize: '12px', letterSpacing: '0.12em', color: 'var(--accent)', opacity: 0.8, fontWeight: 700 }}>
                  PHASE {n}
                </span>
              </div>
              <h3 className="approach-title text-2xl font-display text-foreground mb-3" style={{ transform: 'translateZ(30px)' }}>
                {t}
              </h3>
              <p className="approach-desc text-muted-foreground text-xs leading-relaxed" style={{ transform: 'translateZ(18px)' }}>
                {d}
              </p>
            </div>
          </Pointer3DCard>
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

