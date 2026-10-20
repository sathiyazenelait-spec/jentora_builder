import { createFileRoute } from '@tanstack/react-router';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { company, images, pageHead } from '@/data/company';
import { 
  InnerHero, 
  SectionLabel, 
  Stats, 
  Approach, 
  TextLink,
  QualityAndSafetySection,
  UniqueSellingPointsSection,
  LuxuryTrustStrip,
  VipConsultationBanner
} from '@/components/site/sections';
import { Reveal } from '@/components/site/reveal';

export const Route = createFileRoute('/about')({
  head: () =>
    pageHead(
      'Our Story — Jentora Builder',
      '20 Years of industry experience in Commercial, Residential, and Industrial buildings across Chennai and Coimbatore.'
    ),
  component: About,
});

function About() {
  return (
    <>
      <InnerHero
        label="ABOUT JENTORA"
        title="WHO WE ARE."
        text="20 Years of industry experience in commercial, residential, and industrial construction across Tamil Nadu."
        counter="01 — 20"
        image={images.apartment}
      />

      {/* LUXURY ACCREDITATION & CONTACT ANNOUNCEMENT BAR */}
      <div className="about-announcement-bar border-b border-accent/20 py-3 text-xs relative z-10 shadow-lg">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-foreground font-medium">20 Years of Engineering & Architectural Excellence</span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span className="text-muted-foreground"><strong className="text-foreground font-semibold">Chennai · Coimbatore</strong></span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="tel:+919444434196" className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors font-medium">
              <Phone size={12} className="text-accent" /> +91 94444 34196
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a href="mailto:info@jentora.co.in" className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors font-medium">
              <Mail size={12} className="text-accent" /> info@jentora.co.in
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline font-semibold">
              <MessageCircle size={12} /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>

      {/* LUXURY TRUST STRIP */}
      <LuxuryTrustStrip />

      {/* STORY & STATS */}
      <section className="section">
        <div className="container intro-grid">
          <Reveal>
            <SectionLabel>OUR STORY & PEDIGREE</SectionLabel>
            <h2 className="about-headline-single" style={{ fontSize: 'clamp(32px, 4.4vw, 64px)', lineHeight: '1.15', margin: '20px 0 24px 0' }}>
              New beginnings. <em>Lasting foundations.</em>
            </h2>
            <p className="text-justify" style={{ textAlign: 'justify', textJustify: 'inter-word', lineHeight: '1.8' }}>
              {company.introduction}
            </p>
            <Stats />
          </Reveal>
          <Reveal className="intro-image luxury-framed light-sweep">
            <img src={images.interior} alt="Architectural interior, illustrative concept" loading="lazy" className="rounded-2xl" />
            <span className="vertical-note">20 YEARS OF INDUSTRY EXPERIENCE · CHENNAI · COIMBATORE</span>
          </Reveal>
        </div>
      </section>

      {/* UNIQUE SELLING POINTS */}
      <UniqueSellingPointsSection />

      {/* QUALITY & SAFETY STANDARDS */}
      <QualityAndSafetySection />

      {/* HOW WE WORK */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <SectionLabel>HOW WE WORK</SectionLabel>
              <h2>
                A considered approach.<br />
                <em>From start to finish.</em>
              </h2>
            </div>
            <TextLink to="/services">OUR CAPABILITIES</TextLink>
          </div>
          <Approach />
        </div>
      </section>

      {/* VIP CONSULTATION CTA */}
      <VipConsultationBanner />

      {/* CLOSING STATEMENT WITH ARCHITECTURAL IMAGE BACKGROUND */}
      <section 
        className="statement statement-with-bg"
        style={{
          backgroundImage: `linear-gradient(rgba(7, 10, 18, 0.72), rgba(7, 10, 18, 0.82)), url(${images.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundAttachment: 'fixed',
          padding: '130px 24px',
          borderTop: '2px solid rgba(212, 175, 55, 0.5)',
          borderBottom: '2px solid rgba(212, 175, 55, 0.5)',
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.8)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Reveal>
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <span className="eyebrow" style={{ color: 'var(--accent)', letterSpacing: '0.18em', marginBottom: '18px', display: 'inline-block' }}>
              ✦ ARCHITECTURAL LEGACY & CRAFTSMANSHIP
            </span>
            <h2 style={{ fontSize: 'clamp(36px, 5.2vw, 68px)', lineHeight: '1.2', color: '#ffffff', textShadow: '0 4px 25px rgba(0, 0, 0, 0.85)' }}>
              Building with Precision.<br />
              Delivering with Trust.<br />
              <em className="gold-shimmer-text" style={{ fontStyle: 'italic', display: 'inline-block', marginTop: '8px' }}>
                Creating Landmarks of Excellence.
              </em>
            </h2>
          </div>
        </Reveal>
      </section>
    </>
  );
}
