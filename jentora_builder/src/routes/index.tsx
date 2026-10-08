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
        <div className="hero-bottom">
          <a className="scroll hover-wobble" href="#introduction">
            <ArrowDown size={15} className="animate-bounce" /> SCROLL TO EXPLORE
          </a>
          <div className="signature">
            JENTORA BUILDER PRIVATE LIMITED
            <span>17 YEARS OF INDUSTRY MASTERY · CHENNAI · THIRUVALLUR · COIMBATORE</span>
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
              We don’t just build<br />
              structures.<br />
              <em>We create landmarks<br />of trust.</em>
            </h2>
            <p>
              Built on 17 years of industry experience, Jentora brings a considered approach to residential and commercial construction. Every space begins with purpose. Every detail matters.
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

      {/* EXPERTISE & SERVICES */}
      <section className="section">
        <div className="container services-layout">
          <Reveal>
            <SectionLabel>02 / OUR EXPERTISE</SectionLabel>
            <h2 className="flip-in">
              From vision<br />
              to <em>reality.</em>
            </h2>
            <p className="subtle mb-7">
              A thoughtful approach. A precise execution.<br />
              9 specialized capabilities that bring your vision to life.
            </p>
            <TextLink to="/services">VIEW ALL 9 SERVICES</TextLink>
          </Reveal>
          <Reveal className="delay-200">
            <ServiceList preview />
          </Reveal>
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

      {/* OUR STORY BAND */}
      <section className="story-band">
        <img src={images.villas} alt="Contemporary villas, illustrative concept" loading="lazy" className="transition-transform duration-1000 hover:scale-105" />
        <Reveal className="story-band-content light-sweep luxury-framed">
          <SectionLabel>04 / OUR STORY</SectionLabel>
          <h2 className="flip-in">
            Experience shapes us.<br />
            <em>Purpose moves us.</em>
          </h2>
          <p>
            2 Completed Landmarks. Projects underway in Vadapalani, Thiruvallur, Choolaimedu, and Madukkarai Coimbatore. Grounded in 17 years of construction mastery.
          </p>
          <TextLink to="/about">ABOUT JENTORA</TextLink>
        </Reveal>
      </section>

      {/* LOOKING AHEAD & VISION */}
      <div className="container vision-preview">
        <Reveal className="delay-100">
          <SectionLabel>05 / LOOKING AHEAD</SectionLabel>
          <h2 className="flip-in">
            Our <em>vision.</em>
          </h2>
          <p>
            To be a trusted and respected leader in the construction and real estate industry, recognised for creating exceptional residential and commercial spaces.
          </p>
          <TextLink to="/vision-mission">EXPLORE OUR VISION</TextLink>
        </Reveal>
        <Reveal className="delay-200">
          <SectionLabel>OUR MISSION</SectionLabel>
          <h2 className="flip-in">
            A commitment<br />
            in <em>every detail.</em>
          </h2>
          <p>
            Passion in every idea. Precision in every detail. Perfection in every project. Delivering superior quality and lasting trust.
          </p>
          <TextLink to="/vision-mission">EXPLORE OUR MISSION</TextLink>
        </Reveal>
      </div>
    </>
  );
}

