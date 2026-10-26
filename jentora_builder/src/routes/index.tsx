import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images, projects, company, pageHead, type Project } from '@/data/company';
import { 
  SectionLabel, 
  Philosophy, 
  Stats, 
  ServiceList, 
  TextLink,
  UniqueSellingPointsSection,
  QualityAndSafetySection,
  LuxuryTrustStrip,
  LuxuryTestimonialsSection,
  VipConsultationBanner
} from '@/components/site/sections';
import { Reveal } from '@/components/site/reveal';
import { Pointer3DCard } from '@/components/site/pointer-3d-card';
import { openStartConversation } from '@/components/site/start-conversation-modal';
import jentoraLogo from '@/assets/jentora-logo.png';

export const Route = createFileRoute('/')({
  head: () =>
    pageHead(
      'Jentora — Building with Precision — Jentora Builder',
      'Premium residential, commercial and industrial construction in Chennai and Coimbatore. 20 years of industry experience, united by passion, precision and perfection.'
    ),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="home-hero">
        <video
          className="hero-image hero-video"
          src="/hero_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster={images.hero}
          aria-hidden="true"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          {/* HERO BRAND LOGO EMBLEM ON TOP */}
          <div className="hero-top-brand luxury-smooth-logo">
            <img
              src={jentoraLogo}
              alt="Jentora Builder"
              className="hero-top-logo-img"
              width={280}
              height={175}
              loading="eager"
            />
          </div>

          <div className="mb-4 luxury-smooth-badge">
            <span className="luxury-hero-badge">
              <span className="luxury-hero-badge-dot" />
              20 YEARS OF ARCHITECTURAL EXCELLENCE · EST. 2006
            </span>
          </div>
          <h1 className="luxury-smooth-title">
            Building with precision.<br />
            Delivering with <em>enduring trust.</em>
          </h1>
          <p className="luxury-smooth-desc">
            Pioneering luxury residential, commercial, and turnkey industrial landmarks<br className="hidden sm:inline" /> across <strong>Chennai and Coimbatore</strong> with master engineering and unyielding integrity.
          </p>
          <div className="hero-actions luxury-smooth-actions">
            <Button asChild variant="editorial" className="light-sweep">
              <Link to="/projects" className="hover-wobble">
                EXPLORE OUR PROJECTS <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              type="button" 
              variant="line" 
              className="light-sweep cursor-pointer"
              onClick={() => openStartConversation()}
            >
              <span className="hover-wobble flex items-center gap-1.5">
                SCHEDULE CONSULTATION <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Button>
          </div>

          {/* FLOATING STATS BANNER */}
          <div className="hero-stats-banner luxury-smooth-stats">
            <div className="hero-stat-item">
              <strong>20+</strong>
              <span>Years Industry Mastery</span>
            </div>
            <div className="hero-stat-item">
              <strong>157</strong>
              <span>Completed Landmarks</span>
            </div>
            <div className="hero-stat-item">
              <strong>09</strong>
              <span>Construction Disciplines</span>
            </div>
          </div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 4, width: '100%', marginTop: 'auto' }}>
          <div className="hero-bottom">
            <a className="scroll hover-wobble" href="#introduction">
              <ArrowDown size={15} className="animate-bounce" /> SCROLL TO EXPLORE
            </a>
            <div className="signature">
              JENTORA BUILDER PRIVATE LIMITED
              <span>20 YEARS OF INDUSTRY MASTERY · CHENNAI · COIMBATORE</span>
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY TRUST STRIP */}
      <LuxuryTrustStrip />

      {/* INTRODUCTION & STATS */}
      <section id="introduction" className="section">
        <div className="container intro-grid">
          <Reveal>
            <SectionLabel>01 / THE JENTORA PROMISE</SectionLabel>
            <h2 className="flip-in jentora-promise-heading">
              We don’t just build structures. <em>We create landmarks of trust.</em>
            </h2>
            <p className="text-justify" style={{ textAlign: 'justify', textJustify: 'inter-word', lineHeight: '1.8' }}>
              {company.introduction}
            </p>
            <div style={{ marginTop: '26px', marginBottom: '10px' }}>
              <Button asChild className="discover-jentora-btn light-sweep">
                <Link to="/about">
                  DISCOVER JENTORA
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <Stats />
          </Reveal>
          <Reveal className="intro-image light-sweep luxury-framed">
            <img
              src={images.interior}
              alt="Sunlit stone and timber interior, illustrative concept"
              loading="lazy"
              width={1024}
              height={1024}
              className="rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-105"
            />
            <span className="vertical-note">CRAFTED WITH CARE. BUILT TO LAST.</span>
          </Reveal>
        </div>
      </section>

      {/* THE JENTORA PHILOSOPHY */}
      <Philosophy />

      {/* UNIQUE SELLING POINTS */}
      <UniqueSellingPointsSection />

      {/* SECTION 02: EXPERTISE & SERVICES */}
      <section className="section expertise-section">
        <div className="container">
          <div className="intro-grid" style={{ alignItems: 'flex-start', gap: '56px' }}>
            {/* LEFT STICKY OVERVIEW COLUMN */}
            <div style={{ position: 'sticky', top: '110px' }}>
              <Reveal>
                <SectionLabel>02 / OUR EXPERTISE & DISCIPLINES</SectionLabel>
                <h2 className="flip-in expertise-headline" style={{ fontSize: 'clamp(32px, 3.6vw, 56px)', lineHeight: '1.1', margin: '20px 0' }}>
                  From vision to <em>reality.</em>
                </h2>
                <p className="expertise-intro-desc" style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '28px' }}>
                  A thoughtful approach. A precise execution. We unite 20 years of civil engineering mastery, rigorous lab-tested materials, and end-to-end transparency to construct landmarks that stand the test of time.
                </p>

                {/* TRUST PILLS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <div className="expertise-trust-pill" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', letterSpacing: '0.04em' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '16px' }}>✦</span> 100% Statutory & Regulatory Compliance
                  </div>
                  <div className="expertise-trust-pill" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', letterSpacing: '0.04em' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '16px' }}>✦</span> Transparent Stage-Linked Milestone Schedules
                  </div>
                  <div className="expertise-trust-pill" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', letterSpacing: '0.04em' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '16px' }}>✦</span> Multi-Tier Quality Audits & Structural Warranty
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button asChild variant="editorial" className="light-sweep">
                    <Link to="/services" className="hover-wobble">
                      VIEW ALL 9 SERVICES <ArrowRight />
                    </Link>
                  </Button>
                  <Button 
                    type="button" 
                    className="get-a-quote-btn light-sweep cursor-pointer"
                    onClick={() => openStartConversation()}
                  >
                    <span className="get-a-quote-inner">
                      <span>GET A QUOTE</span>
                      <ArrowUpRight size={15} className="quote-arrow-icon" />
                    </span>
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* RIGHT SERVICES CARDS COLUMN (INSIDE SCROLLABLE WITH CHAINLESS HOME SCROLL) */}
            <div 
              className="expertise-scroll-panel"
              onWheel={(e) => {
                const el = e.currentTarget;
                const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 2;
                const atTop = el.scrollTop <= 0;
                if ((atBottom && e.deltaY > 0) || (atTop && e.deltaY < 0)) {
                  el.style.overscrollBehaviorY = 'auto';
                } else {
                  el.style.overscrollBehaviorY = 'contain';
                }
              }}
            >
              <div className="expertise-scroll-indicator">
                <span>✦ ALL 9 ARCHITECTURAL DISCIPLINES</span>
                <span>SCROLL TO EXPLORE ↓</span>
              </div>

              {[
                {
                  num: '01',
                  title: 'Residential Construction',
                  desc: 'From custom luxury villas to modern apartment complexes, we craft exceptional living environments tailored to your lifestyle. Combining architectural elegance with structural integrity, we manage every phase—from ground preparation to final luxury finishes—ensuring your home stands as a lasting legacy of quality and comfort.',
                  tag: 'Villas · Apartments · Independent Homes',
                },
                {
                  num: '02',
                  title: 'Commercial Construction',
                  desc: 'Corporate office headquarters, shopping plazas, and retail complexes engineered for high footfall, optimized functional zoning, smart energy integration, and maximum long-term capital yield.',
                  tag: 'Offices · Retail Centers · Mixed-Use',
                },
                {
                  num: '03',
                  title: 'Turnkey Construction Projects',
                  desc: 'Comprehensive single-point accountability from architectural blueprints, soil exploration, and statutory approvals through construction, MEP execution, and final turnkey key handover.',
                  tag: 'End-to-End Delivery · Hassle-Free',
                },
                {
                  num: '04',
                  title: 'Industrial Construction',
                  desc: 'Heavy-duty industrial warehouses, manufacturing facilities, logistics hubs, and pre-engineered steel buildings executed with supreme structural rigor and factory-grade safety compliance.',
                  tag: 'Warehouses · PEB Structures · Factories',
                },
                {
                  num: '05',
                  title: 'Building Renovation & Restoration',
                  desc: 'Modern structural retrofitting, architectural expansions, facade modernizations, and spatial re-engineering to revitalize vintage properties while safeguarding structural character.',
                  tag: 'Structural Retrofit · Facade Modernization',
                },
                {
                  num: '06',
                  title: 'Interior Design & Fit-Out',
                  desc: 'Turnkey luxury interiors, bespoke modular joinery, precision false-ceiling lighting, acoustic treatments, and custom materials curated for refined residential and executive commercial spaces.',
                  tag: 'Luxury Interiors · Modular Woodwork',
                },
                {
                  num: '07',
                  title: 'Civil & Structural Engineering',
                  desc: 'Foundational soil stabilization, ultrasonic concrete testing, seismic compliance engineering, and multi-tier QA audits guaranteeing landmark strength built to endure for generations.',
                  tag: 'Foundations · Seismic Engineering · Lab QA',
                },
                {
                  num: '08',
                  title: 'Architectural Planning & 3D BIM',
                  desc: 'Master site planning, 3D structural modeling, solar & wind microclimate optimization, and full structural validation ensuring 100% compliance with government building norms.',
                  tag: '3D BIM · Master Planning · Approvals',
                },
                {
                  num: '09',
                  title: 'Project Management & Consultancy',
                  desc: 'Daily photographic progress logs, rigorous cost accounting, material lab-testing stage gates, and transparent milestone-linked scheduling providing total peace of mind.',
                  tag: 'Daily Photo Logs · Milestone Audits',
                },
              ].map((service, idx) => (
                <div key={service.num}>
                  <Pointer3DCard 
                    className="expertise-service-card luxury-framed light-sweep"
                    maxTilt={10}
                    maxMove={8}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', transform: 'translateZ(20px)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className="expertise-service-num" style={{ fontSize: '13px', fontWeight: '700', padding: '4px 12px', borderRadius: '50px' }}>
                          {service.num}
                        </span>
                        <span className="expertise-service-tag" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
                          {service.tag}
                        </span>
                      </div>
                      <Link to="/services" className="hover-wobble" aria-label={`Learn more about ${service.title}`}>
                        <ArrowUpRight size={20} className="text-accent transition-transform hover:scale-125" />
                      </Link>
                    </div>

                    <h3 className="expertise-service-title" style={{ fontSize: '26px', fontFamily: 'var(--font-sans)', fontWeight: 700, margin: '0 0 10px 0', transform: 'translateZ(26px)' }}>
                      {service.title}
                    </h3>

                    <p className="expertise-service-desc text-justify" style={{ fontSize: '15px', lineHeight: '1.75', margin: 0, textAlign: 'justify', textJustify: 'inter-word', transform: 'translateZ(16px)' }}>
                      {service.desc}
                    </p>
                  </Pointer3DCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 / ARCHITECTURAL LANDMARKS SHOWCASE (MODERN INTERACTIVE EDITORIAL LAYOUT) */}
      <HomeProjectsShowcase projects={projects} />

      {/* CLIENT TESTIMONIALS */}
      <LuxuryTestimonialsSection />

      {/* QUALITY ASSURANCE & SAFETY PROTOCOLS */}
      <QualityAndSafetySection />

      {/* VIP CONSULTATION CTA BANNER */}
      <VipConsultationBanner />

      {/* SECTION 04: OUR STORY & HERITAGE */}
      <section className="section story-showcase-section" style={{ background: 'var(--secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="intro-grid" style={{ alignItems: 'center' }}>
            <Reveal>
              <SectionLabel>04 / OUR STORY & HERITAGE</SectionLabel>
              <h2 className="flip-in" style={{ fontSize: '56px', marginBottom: '20px' }}>
                Experience shapes us.<br />
                <em>Purpose moves us.</em>
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--muted-foreground)', marginBottom: '24px' }}>
                At Jentora Builder, we believe constructing a home or commercial landmark represents a lifetime of trust, aspiration, and investment. Backed by 20 years of master construction acumen, we deliver turnkey residential villas, high-grade commercial hubs, and industrial developments across Chennai and Coimbatore with unwavering structural perfection.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                <span className="sparkle" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.35)', color: 'var(--accent)', padding: '6px 14px', borderRadius: '50px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  ✦ 20+ Years Pedigree
                </span>
                <span className="sparkle" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.35)', color: 'var(--accent)', padding: '6px 14px', borderRadius: '50px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', animationDelay: '0.3s' }}>
                  ✦ 157 Landmark Deliveries
                </span>
                <span className="sparkle" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.35)', color: 'var(--accent)', padding: '6px 14px', borderRadius: '50px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', animationDelay: '0.6s' }}>
                  ✦ 2 Regional Hubs
                </span>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Button asChild variant="editorial" className="light-sweep">
                  <Link to="/about" className="hover-wobble">
                    DISCOVER OUR HERITAGE <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="minimal">
                  <Link to="/contact">
                    CONTACT TEAM <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal className="intro-image light-sweep luxury-framed">
              <img
                src={images.villas}
                alt="Contemporary luxury villas by Jentora Builder"
                loading="lazy"
                width={1024}
                height={1024}
                className="rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-105"
              />
              <span className="vertical-note">ESTABLISHED MASTERY · CHENNAI · COIMBATORE</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 05: LOOKING AHEAD - VISION & MISSION DUAL SHOWCASE */}
      <section className="section looking-ahead-section" style={{ background: 'linear-gradient(180deg, #070a12 0%, #0c1424 50%, #070a12 100%)', padding: '120px 0' }}>
        <div className="container">
          <div className="section-heading" style={{ marginBottom: '64px' }}>
            <Reveal>
              <SectionLabel>05 / LOOKING AHEAD</SectionLabel>
              <h2 className="flip-in looking-ahead-title" style={{ fontSize: '56px' }}>
                The guiding principles of<br />
                <em>our architectural future.</em>
              </h2>
            </Reveal>
            <Reveal>
              <p className="subtle" style={{ maxWidth: '480px', fontSize: '16px', lineHeight: '1.75' }}>
                Every foundation we lay is governed by our long-term vision for sustainable excellence and an uncompromising daily commitment to craftsmanship.
              </p>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px', perspective: '1200px' }}>
            {/* VISION CARD */}
            <Reveal className="delay-100" style={{ height: '100%' }}>
              <Pointer3DCard
                className="vision-card luxury-framed light-sweep"
                maxTilt={12}
                maxMove={14}
                style={{
                  borderRadius: '16px',
                  padding: '48px 40px',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', transform: 'translateZ(20px)' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', background: 'rgba(212, 175, 55, 0.12)', padding: '6px 14px', borderRadius: '50px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                      PILLAR 01 / LONG-TERM GOAL
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--accent)', opacity: 0.8 }}>
                      01
                    </span>
                  </div>

                  <h3 style={{ fontSize: '40px', fontFamily: 'var(--font-display)', lineHeight: '1.1', marginBottom: '16px', transform: 'translateZ(26px)' }}>
                    Our <em>vision.</em>
                  </h3>

                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '28px', transform: 'translateZ(18px)' }}>
                    To be a trusted and respected leader in the construction and real estate industry, recognised for creating exceptional residential and commercial spaces that harmonize architectural elegance with generational durability.
                  </p>

                  <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.18)', paddingTop: '20px', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#94a3b8', transform: 'translateZ(16px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--accent)' }}>✦</span> Enduring Structural Integrity
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--accent)' }}>✦</span> Benchmark Client Trust Across Tamil Nadu
                    </div>
                  </div>
                </div>

                <div style={{ transform: 'translateZ(24px)' }}>
                  <Button asChild variant="minimal" className="vision-mission-explore-btn hover-wobble">
                    <Link to="/vision-mission" style={{ fontSize: '13px', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                      EXPLORE OUR VISION <ArrowRight size={15} className="text-accent" />
                    </Link>
                  </Button>
                </div>
              </Pointer3DCard>
            </Reveal>

            {/* MISSION CARD */}
            <Reveal className="delay-200" style={{ height: '100%' }}>
              <Pointer3DCard
                className="mission-card luxury-framed light-sweep"
                maxTilt={12}
                maxMove={14}
                style={{
                  borderRadius: '16px',
                  padding: '48px 40px',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', transform: 'translateZ(20px)' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', background: 'rgba(212, 175, 55, 0.12)', padding: '6px 14px', borderRadius: '50px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                      PILLAR 02 / DAILY COMMITMENT
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--accent)', opacity: 0.8 }}>
                      02
                    </span>
                  </div>

                  <h3 style={{ fontSize: '40px', fontFamily: 'var(--font-display)', lineHeight: '1.1', marginBottom: '16px', transform: 'translateZ(26px)' }}>
                    A commitment in<br />
                    <em>every detail.</em>
                  </h3>

                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '28px', transform: 'translateZ(18px)' }}>
                    Passion in every idea. Precision in every detail. Perfection in every project. Delivering superior quality, unyielding safety protocols, transparent milestone governance, and lasting trust for every client.
                  </p>

                  <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.18)', paddingTop: '20px', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#94a3b8', transform: 'translateZ(16px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--accent)' }}>✦</span> Rigorous Lab-Tested Material Quality
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--accent)' }}>✦</span> Guaranteed Milestone-Linked Delivery
                    </div>
                  </div>
                </div>

                <div style={{ transform: 'translateZ(24px)' }}>
                  <Button asChild variant="minimal" className="vision-mission-explore-btn hover-wobble">
                    <Link to="/vision-mission" style={{ fontSize: '13px', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                      EXPLORE OUR MISSION <ArrowRight size={15} className="text-accent" />
                    </Link>
                  </Button>
                </div>
              </Pointer3DCard>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function HomeProjectsShowcase({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Completed' | 'Under Construction'>('All');
  
  const filtered = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.status === activeCategory;
  });

  const spotlight = filtered.find(p => p.id === 'jentora-highland-prive') || filtered[0] || projects[0];
  const companions = filtered.filter(p => p.id !== spotlight?.id);

  return (
    <section className="section home-projects-section" style={{ position: 'relative' }}>
      <div className="container">
        {/* HEADER & FILTER BAR */}
        <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
          <div>
            <Reveal>
              <SectionLabel>03 / SELECTED LANDMARKS</SectionLabel>
              <h2 className="flip-in" style={{ fontSize: 'clamp(36px, 4.8vw, 62px)', margin: '12px 0 0' }}>
                Spaces that speak<br />
                <em>for themselves.</em>
              </h2>
            </Reveal>
            <Reveal>
              <p className="subtle" style={{ maxWidth: '540px', fontSize: '15px', lineHeight: '1.7', marginTop: '14px' }}>
                Explore our landmark residential complexes and gated communities across Chennai and Coimbatore.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {(['All', 'Completed', 'Under Construction'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '50px',
                    fontSize: '12px',
                    fontWeight: '700',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: activeCategory === cat ? 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)' : 'rgba(212, 175, 55, 0.08)',
                    color: activeCategory === cat ? '#090d16' : 'var(--foreground)',
                    border: activeCategory === cat ? '1px solid #d4af37' : '1px solid rgba(212, 175, 55, 0.35)',
                    boxShadow: activeCategory === cat ? '0 4px 15px rgba(212, 175, 55, 0.35)' : 'none',
                  }}
                  className="hover:scale-105"
                >
                  {cat === 'All' ? 'All Projects (04)' : cat === 'Completed' ? 'Completed (02)' : 'Under Construction (02)'}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* SPOTLIGHT HERO CARD */}
        {spotlight && (
          <Reveal>
            <div
              className="home-spotlight-card luxury-framed light-sweep"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1.5px solid rgba(212, 175, 55, 0.45)',
                background: 'var(--card)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
                marginBottom: '36px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
                alignItems: 'stretch',
              }}
            >
              {/* IMAGE WRAPPER */}
              <Link 
                to="/projects/$projectId" 
                params={{ projectId: spotlight.id }}
                className="group relative block overflow-hidden" 
                style={{ minHeight: '340px' }}
                aria-label={`View ${spotlight.name}`}
              >
                <img
                  src={spotlight.image}
                  alt={spotlight.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="group-hover:scale-105"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                <span
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: spotlight.status === 'Completed' ? 'rgba(34, 197, 94, 0.95)' : 'rgba(217, 119, 6, 0.95)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    padding: '6px 14px',
                    borderRadius: '50px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff' }} />
                  {spotlight.status.toUpperCase()}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    background: 'rgba(9, 13, 22, 0.85)',
                    backdropFilter: 'blur(10px)',
                    color: '#f8fafc',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '6px 14px',
                    borderRadius: '50px',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <MapPin size={13} style={{ color: 'var(--accent)' }} /> {spotlight.location}
                </span>
              </Link>

              {/* DETAILS PANEL */}
              <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)' }}>
                      FEATURED LANDMARK {spotlight.number} / 04
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: '600', background: 'rgba(212, 175, 55, 0.12)', color: 'var(--accent)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                      {spotlight.category.toUpperCase()}
                    </span>
                  </div>

                  <Link to="/projects/$projectId" params={{ projectId: spotlight.id }}>
                    <h3 style={{ fontSize: '36px', fontFamily: 'var(--font-display)', margin: '0 0 14px', color: 'var(--foreground)' }} className="hover:text-accent transition-colors">
                      {spotlight.name}
                    </h3>
                  </Link>

                  <p style={{ fontSize: '15px', lineHeight: '1.75', color: 'var(--muted-foreground)', marginBottom: '24px' }}>
                    {spotlight.id === 'jentora-highland-prive'
                      ? '100 bespoke luxury individual villas in Madukkarai, Coimbatore, blending architectural opulence, private landscaped grounds, and sustainable community master planning.'
                      : spotlight.id === 'jentora-vadapalani'
                      ? 'A signature 3-floor residential landmark in Vadapalani, Chennai. Features high-grade structural engineering, bespoke apartment layouts, and guaranteed handover excellence.'
                      : 'High-grade structural engineering with lab-verified cement and high-tensile steel, offering optimal cross-ventilation and luxurious finishes.'}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px', padding: '16px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>CAPACITY</span>
                      <strong style={{ display: 'block', fontSize: '16px', color: 'var(--foreground)', marginTop: '2px' }}>{spotlight.units} Units</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>ELEVATION</span>
                      <strong style={{ display: 'block', fontSize: '16px', color: 'var(--foreground)', marginTop: '2px' }}>{spotlight.floors} Floors</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>STATUS</span>
                      <strong style={{ display: 'block', fontSize: '16px', color: 'var(--foreground)', marginTop: '2px' }}>{spotlight.status}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button asChild variant="editorial" className="light-sweep">
                    <Link to="/projects/$projectId" params={{ projectId: spotlight.id }}>
                      EXPLORE BLUEPRINTS & SITE GALLERY <ArrowRight size={15} />
                    </Link>
                  </Button>
                  <Button asChild variant="minimal">
                    <Link to="/contact">
                      REQUEST BROCHURE <ArrowUpRight size={14} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* COMPANION LANDMARK CARDS GRID */}
        {companions.length > 0 && (
          <div
            className="home-projects-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '24px',
            }}
          >
            {companions.map((proj, idx) => (
              <Reveal key={proj.id} className={`delay-${(idx + 1) * 100}`}>
                <div
                  className="companion-project-card luxury-framed light-sweep"
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1.5px solid rgba(212, 175, 55, 0.4)',
                    background: 'var(--card)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {/* PHOTO CONTAINER */}
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: proj.id }}
                    className="group relative block overflow-hidden"
                    style={{ height: '220px', width: '100%' }}
                    aria-label={`View ${proj.name}`}
                  >
                    <img
                      src={proj.image}
                      alt={proj.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className="group-hover:scale-108"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
                    <span
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        background: proj.status === 'Completed' ? 'rgba(34, 197, 94, 0.95)' : 'rgba(217, 119, 6, 0.95)',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        padding: '4px 10px',
                        borderRadius: '50px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      }}
                    >
                      {proj.status.toUpperCase()}
                    </span>
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '14px',
                        background: 'rgba(9, 13, 22, 0.8)',
                        backdropFilter: 'blur(8px)',
                        color: '#f8fafc',
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: '50px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <MapPin size={11} style={{ color: 'var(--accent)' }} /> {proj.location}
                    </span>
                  </Link>

                  {/* CARD BODY */}
                  <div style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent)', letterSpacing: '0.1em' }}>
                          LANDMARK {proj.number} / 04
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: '600', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                          {proj.category.toUpperCase()}
                        </span>
                      </div>

                      <Link to="/projects/$projectId" params={{ projectId: proj.id }}>
                        <h4 style={{ fontSize: '24px', fontFamily: 'var(--font-display)', margin: '0 0 10px', color: 'var(--foreground)' }} className="hover:text-accent transition-colors">
                          {proj.name}
                        </h4>
                      </Link>

                      <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--muted-foreground)', marginBottom: '18px' }}>
                        <span><strong>{proj.units}</strong> Units</span>
                        <span>•</span>
                        <span><strong>{proj.floors}</strong> Floors</span>
                        {proj.year && (
                          <>
                            <span>•</span>
                            <span>{proj.year}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: proj.id }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        fontWeight: '700',
                        letterSpacing: '0.06em',
                        color: 'var(--accent)',
                        paddingTop: '14px',
                        borderTop: '1px solid var(--border)',
                        textDecoration: 'none',
                      }}
                      className="hover:underline group"
                    >
                      <span>VIEW PROJECT DETAILS</span>
                      <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* BOTTOM PORTFOLIO CTA BAR */}
        <Reveal>
          <div
            className="projects-cta-footer"
            style={{
              marginTop: '45px',
              padding: '24px 32px',
              borderRadius: '16px',
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1.5px solid rgba(212, 175, 55, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div>
              <h4 style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--foreground)', margin: 0 }}>
                Looking to build your own signature landmark?
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', marginTop: '4px', margin: 0 }}>
                Consult directly with our principal civil engineers for residential, commercial & turnkey developments.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button asChild variant="editorial" className="light-sweep">
                <Link to="/projects">
                  VIEW ALL PROJECTS <ArrowRight size={14} />
                </Link>
              </Button>
              <Button asChild variant="minimal">
                <Link to="/contact">
                  GET A PROJECT QUOTE <ArrowUpRight size={14} />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


