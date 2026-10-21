import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images, visionData, missionData, missionPoints, companyCommitment, pageHead } from '@/data/company';
import { InnerHero, SectionLabel, Philosophy, ContactLink } from '@/components/site/sections';
import { Reveal } from '@/components/site/reveal';
import { Pointer3DCard } from '@/components/site/pointer-3d-card';

export const Route = createFileRoute('/vision-mission')({
  head: () =>
    pageHead(
      'Vision & Mission — Jentora Builder',
      'Passion in every idea. Precision in every detail. Perfection in every project. Explore the Jentora vision, mission, and core values.'
    ),
  component: Vision,
});

function Vision() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <InnerHero
        label="VISION & MISSION"
        title="WHY WE BUILD."
        text="Passion in every idea. Precision in every detail. Perfection in every project. Building generational trust across Tamil Nadu."
        counter="01 — 03"
        image={images.hero}
      />

      {/* OUR VISION */}
      <section className="section">
        <div className="container intro-grid">
          <Reveal>
            <SectionLabel>01 / OUR VISION</SectionLabel>
            <h2 className="flip-in text-2xl">Creating landmarks <em>that stand the test of time.</em></h2>
            <div className="vision-full-text" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--foreground)' }} className="p-4 rounded-lg bg-background border border-border light-sweep">
                {visionData.statement}
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--muted-foreground)' }} className="p-4 rounded-lg bg-background border border-border">
                {visionData.secondary}
              </p>
            </div>
          </Reveal>
          <Reveal className="intro-image light-sweep">
            <img src={images.villas} alt="Jentora Architectural Villa" loading="lazy" className="rounded-lg shadow-2xl transition-transform duration-700 hover:scale-105" />
          </Reveal>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="section projects-section">
        <div className="container mission-grid">
          <div className="mission-left-col">
            <Reveal>
              <SectionLabel>02 / OUR MISSION</SectionLabel>
              <h2 className="flip-in">Our mission.<br /><em>In action.</em></h2>
              <p className="subtle" style={{ fontSize: '15px', lineHeight: '1.7', marginTop: '16px', color: 'var(--foreground)' }}>
                {missionData.intro}
              </p>

              <Pointer3DCard 
                className="mission-image-card luxury-framed light-sweep" 
                maxTilt={8} 
                maxMove={10}
              >
                <div className="mission-image-container">
                  <img 
                    src={images.apartment} 
                    alt="Jentora Architectural Landmark" 
                    loading="lazy" 
                    className="mission-image" 
                  />
                  <div className="mission-image-badge">
                    <span className="mission-badge-dot">✦</span>
                    <span>20+ YEARS OF EXCELLENCE</span>
                  </div>
                </div>
              </Pointer3DCard>
            </Reveal>
          </div>
          <div className="mission-points-list">
            {missionPoints.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.title}
                  className={`mission-point-item ${isOpen ? 'is-open' : ''} fade-float-center`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <button
                    type="button"
                    className="mission-point-btn"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <div className="mission-point-header">
                      <span className="mission-point-number">0{i + 1}</span>
                      <h3 className="mission-point-title">{item.title}</h3>
                    </div>
                    <div className="mission-point-icon-wrap">
                      <ArrowUpRight size={22} />
                    </div>
                  </button>

                  <div className={`mission-point-collapse ${isOpen ? 'is-expanded' : ''}`}>
                    <div className="mission-point-collapse-inner">
                      <p className="mission-point-desc">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 / OUR COMMITMENT WITH ARCHITECTURAL IMAGE BACKGROUND */}
      <section 
        className="commitment-bg-section relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(7, 10, 18, 0.78), rgba(9, 14, 26, 0.88)), url(${images.villas})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          padding: '130px 0',
          borderTop: '2px solid rgba(212, 175, 55, 0.45)',
          borderBottom: '2px solid rgba(212, 175, 55, 0.45)',
          color: '#ffffff',
          boxShadow: 'inset 0 0 90px rgba(0, 0, 0, 0.8)',
          position: 'relative',
        }}
      >
        <div className="container relative z-10">
          <SectionLabel>03 / OUR COMMITMENT</SectionLabel>
          <Reveal>
            <h2 className="flip-in" style={{ fontSize: 'clamp(36px, 4.8vw, 62px)', lineHeight: '1.2', marginTop: '28px', color: '#ffffff', textShadow: '0 4px 25px rgba(0,0,0,0.7)' }}>
              <span className="commitment-white-line" style={{ color: '#ffffff' }}>Passion in every idea.</span><br />
              <em className="gold-shimmer-text" style={{ fontStyle: 'italic', display: 'inline-block' }}>Precision in every detail.</em><br />
              <span className="commitment-white-line" style={{ color: '#ffffff' }}>Perfection in every project.</span>
            </h2>
            <div 
              className="commitment-statement-box light-sweep" 
              style={{ 
                marginTop: '32px', 
                fontSize: '17px', 
                color: '#e2e8f0', 
                maxWidth: '840px', 
                lineHeight: '1.8',
                background: 'rgba(10, 16, 29, 0.75)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(212, 175, 55, 0.45)',
                borderRadius: '16px',
                padding: '32px 36px',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
              }}
            >
              {companyCommitment.statement}
            </div>
          </Reveal>
        </div>
      </section>

      <Philosophy />

      {/* CTA SECTION BETWEEN PHILOSOPHY & FOOTER */}
      <section className="section" style={{ background: 'var(--secondary)', padding: '100px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <Reveal>
            <SectionLabel>START YOUR PROJECT</SectionLabel>
            <h2 style={{ fontSize: '48px', marginTop: '16px', color: 'var(--foreground)' }}>
              Ready to bring your <em>vision to life?</em>
            </h2>
            <p style={{ color: 'var(--muted-foreground)', marginTop: '12px', maxWidth: '520px', fontSize: '14px', lineHeight: '1.7' }}>
              From initial architectural planning to precision construction, partner with Jentora Builder Private Limited for your next landmark project.
            </p>
          </Reveal>
          <Reveal>
            <ContactLink light={false} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

