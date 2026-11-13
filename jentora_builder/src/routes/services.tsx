import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { pageHead, serviceItems, images, servicesPageConfig, type ServiceItem } from '@/data/company';
import { Reveal } from '@/components/site/reveal';
import { LuxuryTrustStrip, VipConsultationBanner } from '@/components/site/sections';
import { openStartConversation } from '@/components/site/start-conversation-modal';
import { Pointer3DCard } from '@/components/site/pointer-3d-card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  ArrowRight, 
  ArrowUpRight,
  ShieldCheck, 
  Compass, 
  Lightbulb, 
  FileText, 
  Leaf, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  PhoneCall,
  X
} from 'lucide-react';
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
  const [exploredService, setExploredService] = useState<ServiceItem | null>(null);

  const activeServices = serviceItems.filter((s) => s.active !== false);

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
            <span className="services-hero-subtitle">{servicesPageConfig.heroSubtitle || 'OUR SERVICES'}</span>
            <h1 className="services-hero-title">{servicesPageConfig.heroTitle || 'WHAT WE BUILD.'}</h1>
            <p className="services-hero-description">
              {servicesPageConfig.heroDescription || 'Comprehensive construction and design solutions for residential, commercial and industrial spaces.'}
            </p>
          </div>
          <div className="services-hero-counter">
            <span>01 — {activeServices.length < 10 ? `0${activeServices.length}` : activeServices.length}</span>
          </div>
        </div>
      </section>

      {/* LUXURY TRUST STRIP */}
      <LuxuryTrustStrip />

      {/* WHY CHOOSE JENTORA / COMMITMENT SECTION */}
      <section className="commitment-section">
        <div className="container commitment-container">
          <div className="commitment-left-image luxury-framed">
            <img src={images.villas} alt="Modern concrete architecture villa" />
          </div>

          <div className="commitment-right-content">
            <Reveal>
              <span className="commitment-subtitle">{servicesPageConfig.commitmentSubtitle || 'WHY CHOOSE JENTORA'}</span>
              <h2 className="commitment-title" style={{ color: '#ffffff' }}>
                {servicesPageConfig.commitmentTitle || 'More Than Construction. It’s a Commitment.'}
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
                        <h4 style={{ color: '#ffffff' }}>{item.title}</h4>
                        <p style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ZIGZAG SERVICES SECTION */}
      <section className="services-zigzag-section" id="services-list">
        <div className="container">
          <div className="services-zigzag-header">
            <Reveal>
              <span className="sidebar-label">{servicesPageConfig.zigzagLabel || 'OUR CAPABILITIES'}</span>
              <h2 className="services-zigzag-main-heading" style={{ whiteSpace: 'normal' }}>
                {servicesPageConfig.zigzagMainHeading || 'Tailored solutions for lasting impact.'}
              </h2>
              <p className="services-zigzag-subheading">
                {servicesPageConfig.zigzagSubheading || 'From luxurious homes to large-scale commercial and industrial spaces, our services are designed to bring your vision to life with precision, quality and integrity.'}
              </p>
            </Reveal>
          </div>

          <div className="services-zigzag-list">
            {activeServices.map((item, index) => {
              const isEven = index % 2 === 1;
              return (
                <Reveal key={item.id || item.number || item.title}>
                  <div className={`service-zigzag-row ${isEven ? 'is-reverse' : ''}`}>
                    <div className="service-zigzag-image-wrap luxury-framed">
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <span className="service-zigzag-badge">✦ {item.number}</span>
                    </div>

                    <Pointer3DCard 
                      className="service-zigzag-content luxury-framed light-sweep"
                      maxTilt={10}
                      maxMove={12}
                    >
                      <span className="service-zigzag-num">{item.number}</span>
                      <h3 className="service-zigzag-title">{item.title}</h3>
                      <p className="service-zigzag-desc text-justify" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
                        {item.desc}
                      </p>
                      
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => setExploredService(item)}
                          className="service-zigzag-link hover-wobble cursor-pointer bg-transparent border-0 p-0 text-left"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.08em', color: 'var(--accent)' }}
                        >
                          EXPLORE SERVICE <ArrowRight size={14} className="text-accent" />
                        </button>
                        <span style={{ color: 'var(--border)' }}>|</span>
                        <button
                          type="button"
                          onClick={() => openStartConversation(item.title)}
                          className="hover:underline cursor-pointer bg-transparent border-0 p-0 text-left text-xs text-muted-foreground font-semibold"
                        >
                          Quick Inquiry ↗
                        </button>
                      </div>
                    </Pointer3DCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPLORED SERVICE DETAILS DIALOG */}
      <Dialog open={Boolean(exploredService)} onOpenChange={(open) => !open && setExploredService(null)}>
        <DialogContent
          className="luxury-modal-content"
          style={{
            maxWidth: '750px',
            width: '95vw',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--card, #0f172a)',
            color: 'var(--foreground, #f8fafc)',
            border: '1.5px solid rgba(212, 175, 55, 0.45)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)'
          }}
        >
          {exploredService && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span className="footer-num-badge" style={{ fontSize: '12px', padding: '4px 10px', background: 'rgba(212, 175, 55, 0.2)', color: '#d4af37', fontWeight: '700' }}>
                  SERVICE {exploredService.number}
                </span>
                <span style={{ fontSize: '12px', letterSpacing: '0.12em', color: '#c9a063', textTransform: 'uppercase', fontWeight: '600' }}>
                  ✦ JENTORA ENGINEERING & CRAFTSMANSHIP
                </span>
              </div>

              <DialogTitle style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontFamily: 'var(--font-display)', lineHeight: '1.2', margin: '4px 0 16px', color: 'var(--foreground)' }}>
                {exploredService.title}
              </DialogTitle>

              {/* SERVICE IMAGE PREVIEW */}
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '220px', width: '100%', marginBottom: '20px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                <img
                  src={exploredService.image}
                  alt={exploredService.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* OVERVIEW SUMMARY */}
              <DialogDescription style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--foreground)', marginBottom: '18px', textAlign: 'justify' }}>
                {exploredService.exploredContent || exploredService.desc}
              </DialogDescription>

              {/* KEY FEATURES & DELIVERABLES */}
              {exploredService.features && exploredService.features.length > 0 && (
                <div style={{ marginTop: '20px', padding: '18px', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                  <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#c9a063', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={15} /> Key Engineering Deliverables & Standards
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                    {exploredService.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--foreground)' }}>
                        <CheckCircle2 size={16} style={{ color: '#25D366', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTIONS */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '28px', paddingTop: '18px', borderTop: '1px solid var(--border)' }}>
                <Button
                  variant="editorial"
                  onClick={() => {
                    setExploredService(null);
                    openStartConversation(exploredService.title);
                  }}
                  className="light-sweep cursor-pointer"
                  style={{ height: '50px', padding: '0 24px', fontSize: '13px' }}
                >
                  START INQUIRY FOR THIS SERVICE <ArrowUpRight size={16} className="ml-1.5" />
                </Button>

                <Link
                  to="/contact"
                  onClick={() => setExploredService(null)}
                  className="line-button"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0 22px', height: '50px', fontSize: '13px', textDecoration: 'none' }}
                >
                  VISIT CONTACT DESK <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
            <span className="service-cta-subtitle">{servicesPageConfig.ctaSubtitle || 'READY TO GET STARTED?'}</span>
            <h2 className="service-cta-title" style={{ color: '#ffffff' }}>
              {servicesPageConfig.ctaTitle || 'LET’S BUILD SOMETHING EXCEPTIONAL.'}
            </h2>
          </Reveal>
          <Reveal>
            <button 
              type="button" 
              onClick={() => openStartConversation('Comprehensive Construction')}
              className="service-cta-btn light-sweep cursor-pointer border-0"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              {servicesPageConfig.ctaButtonText || 'START A CONVERSATION'} <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

