import { createFileRoute, Link } from '@tanstack/react-router';
import { pageHead, serviceItems, images } from '@/data/company';
import { Reveal } from '@/components/site/reveal';
import { LuxuryTrustStrip, VipConsultationBanner } from '@/components/site/sections';
import { ArrowRight, ShieldCheck, Compass, Lightbulb, FileText, Leaf, TrendingUp } from 'lucide-react';
import heroBg from '@/assets/service-hero-bg.jpg';
import ctaBg from '@/assets/service-cta-bg.jpg';

export const Route = createFileRoute('/services')({
  head: () =>
    pageHead(
      'Our Services — Jentora Builder',
      'Comprehensive construction and design solutions for residential, commercial and industrial spaces.'
    ),
  component: Services,
});

function Services() {
  const commitments = [
    {
      icon: ShieldCheck,
      title: 'Superior Quality',
      desc: 'Built to last, crafted with care.',
    },
    {
      icon: Compass,
      title: 'Thoughtful Design',
      desc: 'Spaces that inspire and function.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      desc: 'Modern solutions for a better future.',
    },
    {
      icon: FileText,
      title: 'Transparency',
      desc: 'Clear process, open communication.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      desc: 'Building a greener tomorrow.',
    },
    {
      icon: TrendingUp,
      title: 'Long-Term Value',
      desc: 'Investments that grow with you.',
    },
  ];

  return (
    <div className="services-page-wrapper">
      {/* HERO SECTION */}
      <section
        className="services-hero-section"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="services-hero-overlay" />
        <div className="container services-hero-container">
          <div className="services-hero-content">
            <span className="services-hero-subtitle">OUR SERVICES</span>
            <h1 className="services-hero-title">WHAT WE BUILD.</h1>
            <p className="services-hero-description">
              Comprehensive construction and design solutions for residential, commercial and industrial spaces.
            </p>
          </div>
          <div className="services-hero-counter">
            <span>01 — 09</span>
          </div>
        </div>
      </section>

      {/* LUXURY TRUST STRIP */}
      <LuxuryTrustStrip />

      {/* ZIGZAG SERVICES SECTION */}
      <section className="services-zigzag-section" id="services-list">
        <div className="container">
          <div className="services-zigzag-header">
            <Reveal>
              <span className="sidebar-label">OUR CAPABILITIES</span>
              <h2 className="services-zigzag-main-heading">
                Tailored solutions for lasting impact.
              </h2>
              <p className="services-zigzag-subheading">
                From luxurious homes to large-scale commercial and industrial spaces, our services are designed to bring your vision to life with precision, quality and integrity.
              </p>
            </Reveal>
          </div>

          <div className="services-zigzag-list">
            {serviceItems.map((item, index) => {
              const isEven = index % 2 === 1;
              return (
                <Reveal key={item.number}>
                  <div className={`service-zigzag-row ${isEven ? 'is-reverse' : ''}`}>
                    <div className="service-zigzag-image-wrap luxury-framed">
                      <img src={item.image} alt={item.title} />
                      <span className="service-zigzag-badge">✦ {item.number}</span>
                    </div>

                    <div className="service-zigzag-content">
                      <span className="service-zigzag-num">{item.number}</span>
                      <h3 className="service-zigzag-title">{item.title}</h3>
                      <p className="service-zigzag-desc">{item.desc}</p>
                      <Link to="/contact" className="service-zigzag-link hover-wobble">
                        EXPLORE SERVICE <ArrowRight size={14} className="text-accent" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE JENTORA / COMMITMENT SECTION */}
      <section className="commitment-section">
        <div className="container commitment-container">
          <div className="commitment-left-image luxury-framed">
            <img src={images.villas} alt="Modern concrete architecture villa" />
          </div>

          <div className="commitment-right-content">
            <Reveal>
              <span className="commitment-subtitle">WHY CHOOSE JENTORA</span>
              <h2 className="commitment-title">
                More Than Construction.<br />It’s a <span className="gold-shimmer-text">Commitment.</span>
              </h2>

              <div className="commitment-grid">
                {commitments.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="commitment-card luxury-framed" key={item.title}>
                      <div className="commitment-icon-wrapper">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <div className="commitment-card-text">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VIP CONSULTATION BANNER */}
      <VipConsultationBanner />

      {/* CALL TO ACTION BANNER */}
      <section
        className="service-cta-banner"
        style={{ backgroundImage: `url(${ctaBg})` }}
      >
        <div className="service-cta-overlay" />
        <div className="container service-cta-container">
          <Reveal>
            <span className="service-cta-subtitle">READY TO GET STARTED?</span>
            <h2 className="service-cta-title">
              LET’S BUILD SOMETHING<br /><span className="gold-shimmer-text">EXCEPTIONAL.</span>
            </h2>
          </Reveal>
          <Reveal>
            <Link to="/contact" className="service-cta-btn light-sweep">
              START A CONVERSATION <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

