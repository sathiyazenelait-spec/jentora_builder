import { createFileRoute } from '@tanstack/react-router';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { company, images, pageHead } from '@/data/company';
import { 
  InnerHero, 
  SectionLabel, 
  Stats, 
  Philosophy, 
  Approach, 
  TextLink,
  LeadershipSection,
  QualityAndSafetySection,
  UniqueSellingPointsSection,
  LuxuryTrustStrip,
  LuxuryTestimonialsSection,
  VipConsultationBanner
} from '@/components/site/sections';
import { Reveal } from '@/components/site/reveal';

export const Route = createFileRoute('/about')({
  head: () =>
    pageHead(
      'Our Story — Jentora Builder',
      '17 Years of industry experience in Commercial, Residential, and Industrial buildings across Chennai, Thiruvallur, and Coimbatore.'
    ),
  component: About,
});

function About() {
  return (
    <>
      <InnerHero
        label="ABOUT JENTORA"
        title="WHO WE ARE."
        text="17 Years of industry experience in commercial, residential, and industrial construction across Tamil Nadu."
        counter="01 — 17"
        image={images.apartment}
      />

      {/* LUXURY ACCREDITATION & CONTACT ANNOUNCEMENT BAR */}
      <div className="border-b border-accent/20 bg-gradient-to-r from-[#05080e] via-[#0e1626] to-[#05080e] py-3 text-xs relative z-10 shadow-lg">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="sparkle rounded border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-accent uppercase">
              ✦ ISO 9001:2015 CERTIFIED
            </span>
            <span className="text-foreground font-medium">17 Years of Engineering & Architectural Excellence</span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span className="text-muted-foreground">Operating Hubs: <strong className="text-foreground font-semibold">Chennai · Thiruvallur · Coimbatore</strong></span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="tel:+919444484625" className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors font-medium">
              <Phone size={12} className="text-accent" /> +91 94444 84625
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
            <h2>
              New beginnings.<br />
              <em>Lasting foundations.</em>
            </h2>
            <p className="text-justify" style={{ textAlign: 'justify', textJustify: 'inter-word', lineHeight: '1.8' }}>
              {company.introduction}
            </p>
            <Stats />
          </Reveal>
          <Reveal className="intro-image luxury-framed light-sweep">
            <img src={images.interior} alt="Architectural interior, illustrative concept" loading="lazy" className="rounded-2xl" />
            <span className="vertical-note">17 YEARS OF INDUSTRY EXPERIENCE · CHENNAI · THIRUVALLUR · COIMBATORE</span>
          </Reveal>
        </div>
      </section>

      {/* UNIQUE SELLING POINTS */}
      <UniqueSellingPointsSection />

      {/* LEADERSHIP */}
      <LeadershipSection />

      {/* QUALITY & SAFETY STANDARDS */}
      <QualityAndSafetySection />

      {/* PHILOSOPHY */}
      <Philosophy />

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

      {/* CLIENT TESTIMONIALS */}
      <LuxuryTestimonialsSection />

      {/* VIP CONSULTATION CTA */}
      <VipConsultationBanner />

      {/* CLOSING STATEMENT */}
      <section className="statement">
        <Reveal>
          <h2>
            Building with Precision.<br />
            Delivering with Trust.<br />
            <em className="gold-shimmer-text">Creating Landmarks of Excellence.</em>
          </h2>
        </Reveal>
      </section>
    </>
  );
}
