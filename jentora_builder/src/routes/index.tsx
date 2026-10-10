import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images, projects, company, pageHead } from '@/data/company';
import { 
  SectionLabel, 
  Philosophy, 
  Stats, 
  ProjectItem, 
  ServiceList, 
  TextLink,
  UniqueSellingPointsSection,
  LeadershipSection,
  QualityAndSafetySection,
  LuxuryTrustStrip,
  LuxuryTestimonialsSection,
  VipConsultationBanner
} from '@/components/site/sections';
import { Reveal } from '@/components/site/reveal';

export const Route = createFileRoute('/')({
  head: () =>
    pageHead(
      'Jentora — Building with Precision — Jentora Builder',
      'Premium residential, commercial and industrial construction in Chennai, Thiruvallur, and Coimbatore. 17 years of industry experience, united by passion, precision and perfection.'
    ),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="home-hero">
        <img
          className="hero-image"
          src={images.hero}
          alt="Contemporary villa architecture, illustrative concept"
          width={1920}
          height={1088}
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="mb-4 luxury-smooth-badge">
            <span className="luxury-hero-badge">
              <span className="luxury-hero-badge-dot" />
              17 YEARS OF ARCHITECTURAL EXCELLENCE · EST. 2009
            </span>
          </div>
          <h1 className="luxury-smooth-title">
            Building with precision.<br />
            Delivering with <em>enduring trust.</em>
          </h1>
          <p className="luxury-smooth-desc">
            Pioneering luxury residential, commercial, and turnkey industrial landmarks across <strong>Chennai, Thiruvallur, and Coimbatore</strong> with master engineering and unyielding integrity.
          </p>
          <div className="hero-actions luxury-smooth-actions">
            <Button asChild variant="editorial" className="light-sweep">
              <Link to="/projects" className="hover-wobble">
                EXPLORE OUR PROJECTS <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="line" className="light-sweep">
              <Link to="/contact" className="hover-wobble">
                SCHEDULE CONSULTATION <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Button>
          </div>

          {/* FLOATING STATS BANNER */}
          <div className="hero-stats-banner luxury-smooth-stats">
            <div className="hero-stat-item">
              <strong>17+</strong>
              <span>Years Industry Mastery</span>
            </div>
            <div className="hero-stat-item">
              <strong>02</strong>
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
              <span>17 YEARS OF INDUSTRY MASTERY · CHENNAI · THIRUVALLUR · COIMBATORE</span>
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
            <h2 className="flip-in">
              We don’t just build structures.<br />
              <em>We create landmarks of trust.</em>
            </h2>
            <p className="text-justify" style={{ textAlign: 'justify', textJustify: 'inter-word', lineHeight: '1.8' }}>
              {company.introduction}
            </p>
            <TextLink to="/about">DISCOVER JENTORA</TextLink>
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
      <section className="section expertise-section" style={{ background: 'linear-gradient(180deg, #070a12 0%, #090e18 50%, #070a12 100%)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="intro-grid" style={{ alignItems: 'flex-start', gap: '56px' }}>
            {/* LEFT STICKY OVERVIEW COLUMN */}
            <div style={{ position: 'sticky', top: '110px' }}>
              <Reveal>
                <SectionLabel>02 / OUR EXPERTISE & DISCIPLINES</SectionLabel>
                <h2 className="flip-in" style={{ fontSize: '56px', lineHeight: '1.05', margin: '20px 0' }}>
                  From vision<br />
                  to <em>reality.</em>
                </h2>
                <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--muted-foreground)', marginBottom: '28px' }}>
                  A thoughtful approach. A precise execution. We unite 17 years of civil engineering mastery, rigorous lab-tested materials, and end-to-end transparency to construct landmarks that stand the test of time.
                </p>

                {/* TRUST PILLS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#cbd5e1', letterSpacing: '0.04em' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '16px' }}>✦</span> 100% CMDA & DTCP Regulatory Compliance
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#cbd5e1', letterSpacing: '0.04em' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '16px' }}>✦</span> Transparent Stage-Linked Milestone Schedules
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#cbd5e1', letterSpacing: '0.04em' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '16px' }}>✦</span> Multi-Tier Quality Audits & Structural Warranty
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <Button asChild variant="editorial" className="light-sweep">
                    <Link to="/services" className="hover-wobble">
                      VIEW ALL 9 SERVICES <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="minimal">
                    <Link to="/contact">
                      GET A QUOTE <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* RIGHT SERVICES CARDS COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                  title: 'Interior Design & Fit-Out',
                  desc: 'Turnkey luxury interiors, bespoke modular joinery, precision false-ceiling lighting, acoustic treatments, and custom materials curated for refined residential and executive commercial spaces.',
                  tag: 'Luxury Interiors · Modular Woodwork',
                },
                {
                  num: '05',
                  title: 'Architectural Planning & Engineering',
                  desc: 'Master site planning, 3D structural modeling, solar & wind microclimate optimization, and full structural validation ensuring 100% compliance with government building norms.',
                  tag: '3D BIM · Structural Engineering · CMDA Approvals',
                },
              ].map((service, idx) => (
                <Reveal key={service.num} className={`delay-${(idx + 1) * 100}`}>
                  <div
                    className="expertise-service-card luxury-framed light-sweep"
                    style={{
                      background: 'rgba(14, 22, 38, 0.75)',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      borderRadius: '16px',
                      padding: '32px 36px',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      backdropFilter: 'blur(14px)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent)', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.35)', padding: '4px 12px', borderRadius: '50px' }}>
                          {service.num}
                        </span>
                        <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: '600' }}>
                          {service.tag}
                        </span>
                      </div>
                      <Link to="/services" className="hover-wobble" aria-label={`Learn more about ${service.title}`}>
                        <ArrowUpRight size={20} className="text-accent transition-transform hover:scale-125" />
                      </Link>
                    </div>

                    <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-display)', margin: '0 0 10px 0', color: '#ffffff' }}>
                      {service.title}
                    </h3>

                    <p className="text-justify" style={{ fontSize: '16px', lineHeight: '1.75', color: '#cbd5e1', margin: 0, textAlign: 'justify', textJustify: 'inter-word' }}>
                      {service.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED PROJECTS PORTFOLIO */}
      <section className="section projects-section">
        <div className="container">
          <div className="section-heading">
            <Reveal>
              <SectionLabel>03 / SELECTED PROJECTS</SectionLabel>
              <h2 className="flip-in">
                Spaces that speak<br />
                <em>for themselves.</em>
              </h2>
            </Reveal>
            <TextLink to="/projects">VIEW ALL PROJECTS</TextLink>
          </div>
          <div className="portfolio">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <LuxuryTestimonialsSection />

      {/* LEADERSHIP & GOVERNANCE */}
      <LeadershipSection />

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
                At Jentora Builder, we believe constructing a home or commercial landmark represents a lifetime of trust, aspiration, and investment. Backed by 17 years of master construction acumen, we deliver turnkey residential villas, high-grade commercial hubs, and industrial developments across Chennai, Thiruvallur, and Coimbatore with unwavering structural perfection.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                <span className="sparkle" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.35)', color: 'var(--accent)', padding: '6px 14px', borderRadius: '50px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  ✦ 17+ Years Pedigree
                </span>
                <span className="sparkle" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.35)', color: 'var(--accent)', padding: '6px 14px', borderRadius: '50px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', animationDelay: '0.3s' }}>
                  ✦ 2 Landmark Deliveries
                </span>
                <span className="sparkle" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.35)', color: 'var(--accent)', padding: '6px 14px', borderRadius: '50px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', animationDelay: '0.6s' }}>
                  ✦ 3 Regional Hubs
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
              <span className="vertical-note">ESTABLISHED MASTERY · CHENNAI · THIRUVALLUR · COIMBATORE</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 05: LOOKING AHEAD - VISION & MISSION DUAL SHOWCASE */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #070a12 0%, #0c1424 50%, #070a12 100%)', padding: '120px 0' }}>
        <div className="container">
          <div className="section-heading" style={{ marginBottom: '64px' }}>
            <Reveal>
              <SectionLabel>05 / LOOKING AHEAD</SectionLabel>
              <h2 className="flip-in" style={{ fontSize: '56px' }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px' }}>
            {/* VISION CARD */}
            <Reveal className="delay-100">
              <div
                className="vision-card luxury-framed light-sweep"
                style={{
                  background: 'rgba(14, 22, 38, 0.75)',
                  border: '1px solid rgba(212, 175, 55, 0.28)',
                  borderRadius: '16px',
                  padding: '48px 40px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(16px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', background: 'rgba(212, 175, 55, 0.12)', padding: '6px 14px', borderRadius: '50px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                      PILLAR 01 / LONG-TERM GOAL
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--accent)', opacity: 0.8 }}>
                      01
                    </span>
                  </div>

                  <h3 style={{ fontSize: '40px', fontFamily: 'var(--font-display)', lineHeight: '1.1', marginBottom: '16px' }}>
                    Our <em>vision.</em>
                  </h3>

                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '28px' }}>
                    To be a trusted and respected leader in the construction and real estate industry, recognised for creating exceptional residential and commercial spaces that harmonize architectural elegance with generational durability.
                  </p>

                  <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.18)', paddingTop: '20px', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#94a3b8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--accent)' }}>✦</span> Enduring Structural Integrity
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--accent)' }}>✦</span> Benchmark Client Trust Across Tamil Nadu
                    </div>
                  </div>
                </div>

                <div>
                  <Button asChild variant="minimal" className="hover-wobble">
                    <Link to="/vision-mission" style={{ fontSize: '13px', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                      EXPLORE OUR VISION <ArrowRight size={15} className="text-accent" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* MISSION CARD */}
            <Reveal className="delay-200">
              <div
                className="mission-card luxury-framed light-sweep"
                style={{
                  background: 'rgba(14, 22, 38, 0.75)',
                  border: '1px solid rgba(212, 175, 55, 0.28)',
                  borderRadius: '16px',
                  padding: '48px 40px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(16px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', background: 'rgba(212, 175, 55, 0.12)', padding: '6px 14px', borderRadius: '50px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                      PILLAR 02 / DAILY COMMITMENT
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--accent)', opacity: 0.8 }}>
                      02
                    </span>
                  </div>

                  <h3 style={{ fontSize: '40px', fontFamily: 'var(--font-display)', lineHeight: '1.1', marginBottom: '16px' }}>
                    A commitment in<br />
                    <em>every detail.</em>
                  </h3>

                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '28px' }}>
                    Passion in every idea. Precision in every detail. Perfection in every project. Delivering superior quality, unyielding safety protocols, transparent milestone governance, and lasting trust for every client.
                  </p>

                  <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.18)', paddingTop: '20px', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#94a3b8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--accent)' }}>✦</span> Rigorous Lab-Tested Material Quality
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--accent)' }}>✦</span> Guaranteed Milestone-Linked Delivery
                    </div>
                  </div>
                </div>

                <div>
                  <Button asChild variant="minimal" className="hover-wobble">
                    <Link to="/vision-mission" style={{ fontSize: '13px', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                      EXPLORE OUR MISSION <ArrowRight size={15} className="text-accent" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}


